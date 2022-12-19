import { Node, nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { AstPath, Doc, doc } from "prettier";
import { PossiblyLocatedNode } from "../parser";
import { NodePrinter } from "../printer";
import {
  canBreak,
  hasBlock,
  isArray,
  isBegin,
  isBlock,
  isCSend,
  isHash,
  isKwargs,
  isLvar,
  isSend,
  locationIsImmediatelyFollowedByNewline,
  willBreakExcludingHeredocs,
} from "../queries";
import { getBlockDocs, printBlockWithoutCall } from "./Block";
const { builders: b } = doc;

const unaryOperators = ["~", "-@", "+@"];
const operatorMethods = [
  "&",
  "|",
  "^",
  "!=",
  "!==",
  "==",
  "===",
  ">",
  ">=",
  "<=>",
  "<",
  "<=",
  "<<",
  ">>",
  "=~",
  "|=",
  "^=",
  "+",
  "-",
  "%",
  "*",
  "/",
];
const exponentiation = "**";
const negation = "!";

interface BlockWithSend extends nodes.Block {
  call: nodes.Send;
}

type Member = {
  node: PossiblyLocatedNode;
  printed: Doc;
  block?: Doc;
  expandedBlock?: Doc;
  args?: Doc;
  expandedArgs?: Doc;
  dot?: Doc;
};

const printSendLinear: NodePrinter<nodes.Send> = (path, options, print) => {
  const node = path.getValue();
  const { method_name: methodName, args } = node;
  const selector = path.call(print, "selector_l");
  const operator = path.call(print, "operator_l");
  const printableMethodName = [selector, operator]
    .filter((itself) => itself)
    .join(" ");
  const parent = path.getParentNode();

  // phase 1, linearize the send chain in Member tuples

  const members: Member[] = [];
  const visit = (path: AstPath<Node | null>) => {
    const node = path.getValue();
    if (!node) {
      return "";
    }
    if (isSend(node) || isCSend(node)) {
      const sendPath = path as AstPath<nodes.Send>;
      members.unshift({
        node,
        printed: [sendPath.call(print, "dot_l"), node.method_name],
        args: printArgs(sendPath, options, print),
        expandedArgs: printExpandedArgs(sendPath, options, print),
      });
      sendPath.call(visit, "recv");
    } else if (isBlock(node) && (isSend(node.call) || isCSend(node.call))) {
      const blockPath = path as AstPath<BlockWithSend>;
      members.unshift({
        node,
        printed: [
          blockPath.call(print, "call", "dot_l"),
          node.call.method_name,
          blockPath.call((p) => printArgs(p, options, print), "call"),
          " ",
          b.group(printBlockWithoutCall(blockPath, options, print)),
        ],
      });
      blockPath.call(visit, "call", "recv");
    } else {
      members.unshift({
        node,
        printed: print(path),
      });
    }
  };

  let block: Doc = "";
  let expandedBlock: Doc = "";

  if (hasBlock(path)) {
    let { open, args, body, end } = path.callParent((p) =>
      getBlockDocs(p as unknown as AstPath<nodes.Block>, options, print)
    );
    block = b.group([" ", open, args ? [" ", args] : "", body, end]);
    expandedBlock = b.group([" ", open, args ? [" ", args] : "", body, end], {
      shouldBreak: true,
    });
  }

  // Print non-chaining sends or linearize the send chain into an array.
  // All chains are made up of Send nodes, but not all Send nodes are chainable
  // for the simpler types of sends (===, !, unary, etc) we can just return the
  // printed form here
  if (!node.recv) {
    // simple method call with implicit receiver
    return [printableMethodName, printArgs(path, options, print), block];
  } else if (methodName === negation) {
    // !{something}
    return [negation, path.call(print, "recv")];
  } else if (methodName === exponentiation) {
    // 2**8
    return [
      path.call(print, "recv"),
      exponentiation,
      path.call(print, "args", 0),
    ];
  } else if (unaryOperators.includes(methodName) && selector) {
    // unary method ~2
    return [selector, path.call(print, "recv")];
  } else if (operatorMethods.includes(methodName) && selector) {
    // method like >=
    // the >= should be grouped to its receiver
    return [
      path.call(print, "recv"),
      " ",
      printableMethodName,
      printArgs(path, options, print),
    ];
  }

  // last method call in the chain or a recv+dot+send by itself (no chain)
  members.unshift({
    node,
    printed: [path.call(print, "dot_l"), printableMethodName],
    args: printArgs(path, options, print),
    expandedArgs: printExpandedArgs(path, options, print),
    block,
    expandedBlock,
  });

  if (node.recv) {
    // recursively prepend to the chain
    path.call(visit, "recv");
  }

  const printIndentedMembers = (members: Member[]): Doc => {
    if (members.length === 0) return "";

    return b.indent(
      b.group([b.hardline, b.join(b.hardline, members.map(printMember))])
    );
  };

  const printMember = (member: Member): Doc => [
    member.printed,
    member.args || "",
    member.block || "",
  ];

  const firstMemberIsMagnetic = (members: Member[]): boolean => {
    if (members.length >= 1) {
      const firstNode = members[0].node;
      return (
        !locationIsImmediatelyFollowedByNewline(
          options,
          firstNode.expression_l
        ) &&
        ((isSend(firstNode) && isShort(firstNode.method_name)) ||
          (isCSend(firstNode) && isShort(firstNode.method_name)) ||
          (isLvar(firstNode) && isShort(firstNode.name)) ||
          isArray(firstNode) ||
          isHash(firstNode) ||
          isBegin(firstNode))
      );
    }
    return false;
  };

  const isShort = (name: string) => {
    return name.length < options.tabWidth;
  };

  const bigBlockCount = members.filter(
    ({ node }) => isBlock(node) && node.body && isBegin(node.body)
  ).length;
  const keepFirstTwoMembersJoined =
    members.length >= 2 && firstMemberIsMagnetic(members);
  const printedGroups = members.map(printMember);
  const oneLine = printedGroups;

  // if (members.length < 2) {
  //   return b.group(oneLine);
  // }

  const expandedCandidates: Doc[] = [];
  const lastMember = members[members.length - 1];

  // construct some partially expanded documents of the send chain in order to
  // fit idiomatically on a single line with only _some_ expanded content
  // an example is a line with a block at the end:
  //   some.method_chain_that_exceeds_print_width.each do |item|
  //     ...
  //   end
  if (hasBlock(path)) {
    // when there's a block at the end of the chain, the expanded format is
    // to break the block and see if the chain fits
    expandedCandidates.push([
      b.group([members.slice(0, -1).map(printMember), lastMember.printed]),
      lastMember.args || "",
      lastMember.expandedBlock || "",
    ]);
  } else if (
    args.length > 0 &&
    !(path.stack as any).some((name: any) => name === "cond")
  ) {
    // else when args can break well, the next best expanded format is to break args,
    // and see if it fits
    // an example is a line with breakable args at the end:
    //   some.method_chain_that_exceeds_print_width.new(
    //     "this is an error message or something"
    //   )
    expandedCandidates.push([
      b.group([members.slice(0, -1).map(printMember), lastMember.printed]),
      lastMember.expandedArgs || "",
    ]);
  }

  const fullyExpanded = [
    printMember(members[0]),
    keepFirstTwoMembersJoined ? members.slice(1, 2).map(printMember) : "",
    printIndentedMembers(members.slice(keepFirstTwoMembersJoined ? 2 : 1)),
  ];

  expandedCandidates.push(fullyExpanded);

  let finalDoc: Doc;
  // conditions in which we prevent oneline printing altogether
  // - the chain has one or more blocks with multiple statements
  if (bigBlockCount >= 1) {
    finalDoc = b.group(fullyExpanded);
  } else {
    // try oneline, if it breaks, break the parent and try again,
    // else try expandedCandidates and ultimately use the most expandable
    finalDoc = [
      willBreakExcludingHeredocs(oneLine) ? b.breakParent : "",
      b.conditionalGroup([oneLine, ...expandedCandidates]),
    ];
  }

  return b.label("send-chain", finalDoc);
};

const makeArgPrinter =
  (
    { shouldBreak } = { shouldBreak: false }
  ): NodePrinter<nodes.Send | nodes.CSend> =>
  (path, options, print) => {
    const node = path.getValue();
    const { args } = node;

    if (!args?.length) {
      return "";
    }

    const argBegin = path.call(print, "begin_l");
    const argEnd = path.call(print, "end_l");
    const printedArgs = path.map(print, "args");

    if (!argBegin && args.length == 1 && !isKwargs(args[0])) {
      // no parens, one arg, we want the arg to start on the same line
      return [" ", ...printedArgs];
    } else if (
      !argBegin &&
      args.length == 2 &&
      isBlock(args[1]) &&
      args[1].body
    ) {
      // preserves formatting like
      // scope :active, -> do
      //   where()
      // end
      return [" ", printedArgs[0], ", ", printedArgs[1]];
    } else {
      // other
      return b.group(
        [
          b.ifBreak("(", argBegin || " "),
          b.indent([b.softline, b.join([",", b.line], printedArgs)]),
          b.softline,
          b.ifBreak(")", argEnd),
        ],
        { shouldBreak }
      );
    }
  };

const printArgs = makeArgPrinter();
const printExpandedArgs = makeArgPrinter({ shouldBreak: true });

export default printSendLinear;
