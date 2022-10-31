import { Node, nodes } from "lib-ruby-parser";
import { AstPath, Doc, doc, format } from "prettier";
import { sourceFromLocation } from "../diagnostics";
import { NodePrinter } from "../printer";
import {
  isArray,
  isBegin,
  isBlock,
  isCSend,
  isHash,
  isKwargs,
  isSend,
  receiverIsWrapped,
} from "../queries";
import { printBlockWithoutCall, printBrokenBlockWithoutCall } from "./Block";
const { builders: b } = doc;

const unaryOperators = ["~", "-@", "+@"];
const operatorMethods = [
  "&",
  "|",
  "^",
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
];
const exponentiation = "**";
const negation = "!";

// const printSendLinear: NodePrinter<nodes.Send> = (path, options, print) => {
//   const parent = node.getParentNode();
//   const grandParent = node.getParentNode(1);
//   let printedNodes = [];
//   const unwrap = (path) => {
//     const node = path.getValue();
//   };

//   return "";
// };

// const unwrap = (path: AstPath<Node | null>) => {
//   if (isSend(node) || isCSend(node)) {
//     return [node, ...unwrap(node.recv)];
//   } else if (isBlock(node) && isSend(node.call)) {
//     return [];
//   } else {
//     return [];
//   }
// };

export const makeSendPrinter = (dot = "."): NodePrinter<nodes.Send> => {
  return (path, options, print) => {
    const node = path.getValue();
    const { args, method_name } = node;
    const parent = path.getParentNode();
    const grandparent = path.getParentNode(1);
    const receiver = path.call(print, "recv");
    const selector = path.call(print, "selector_l");
    const operator = path.call(print, "operator_l");
    const argBegin = path.call(print, "begin_l");
    const argEnd = path.call(print, "end_l");
    const dot = path.call(print, "dot_l");
    const printedArgs = path.map(print, "args");
    const amCallOfParentBlock = isBlock(parent) && path.getName() === "call";
    const hasBlock = amCallOfParentBlock;
    const hasArgs = args.length > 0;
    const topOfChain =
      !isSend(parent) &&
      !isCSend(parent) &&
      isSend(node.recv) &&
      isSend(node.recv.recv);
    let formattedBlock: Doc = "";
    let brokenBlock: Doc = "";
    let formattedArgs: Doc = "";
    let brokenArgs: Doc = "";

    let amPartOfChain =
      (parent &&
        dot &&
        (isSend(parent) || isCSend(parent)) &&
        !parent.args.includes(node) &&
        parent.dot_l) ||
      (amCallOfParentBlock && isSend(grandparent) && grandparent.dot_l);

    if (hasArgs) {
      if (!argBegin && args.length == 1 && !isKwargs(args[0])) {
        // no parens, one arg, we want the arg to start on the same line
        formattedArgs = brokenArgs = [" ", ...printedArgs];
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
        formattedArgs = brokenArgs = [
          " ",
          printedArgs[0],
          ", ",
          printedArgs[1],
        ];
      } else {
        // other
        let shouldBreak = false;
        const beginLoc = node.begin_l || node.selector_l;
        if (beginLoc) {
          shouldBreak =
            sourceFromLocation(options, {
              begin: beginLoc.end,
              end: node.expression_l.end,
            }).includes("\n") && args.length > 1;
        }
        formattedArgs = b.group([
          b.ifBreak("(", argBegin || " "),
          b.indent([b.softline, b.join([",", b.line], printedArgs)]),
          b.softline,
          b.ifBreak(")", argEnd),
        ]);
        brokenArgs = b.group(
          [
            b.ifBreak("(", argBegin || " "),
            b.indent([b.softline, b.join([",", b.line], printedArgs)]),
            b.softline,
            b.ifBreak(")", argEnd),
          ],
          { shouldBreak: true }
        );
      }
    }

    if (hasBlock) {
      formattedBlock = [
        " ",
        path.callParent((ppath) =>
          printBlockWithoutCall(
            ppath as unknown as AstPath<nodes.Block>,
            options,
            print
          )
        ),
      ];
      brokenBlock = [
        " ",
        path.callParent((ppath) =>
          printBrokenBlockWithoutCall(
            ppath as unknown as AstPath<nodes.Block>,
            options,
            print
          )
        ),
      ];
    }
    const formattedArgsAndBlock = b.group([formattedArgs, formattedBlock]);
    const dotMethod = [dot || " ", selector, operator ? [" ", operator] : ""];

    if (!receiver) {
      // simple method call with implicit receiver
      return [method_name, formattedArgsAndBlock];
    } else if (method_name === negation) {
      // !{something}
      return [negation, b.group(receiver)];
    } else if (method_name === exponentiation) {
      // 2**8
      return [receiver, exponentiation, ...printedArgs];
    } else if (unaryOperators.includes(method_name) && selector) {
      // unary method 1 & 2
      return [selector, receiver];
    } else if (operatorMethods.includes(method_name) && selector) {
      // method like >=
      // the >= should be grouped to its receiver
      return [b.group(receiver), " ", method_name, " ", ...printedArgs];
    } else if (operator && topOfChain) {
      // it's a setter
      // we're at the top of a chain, breaking after the `=` is not preferable
      // because chains are best broken uniformly
      return [receiver, b.indent([b.softline, dotMethod, " ", ...printedArgs])];
    } else if (
      operator &&
      (isArray(args[0]) || isHash(args[0]) || isBegin(args[0]))
    ) {
      // it's a setter
      // there's no chain, and the arg[0] can break
      const id = Symbol("recvdotequals");
      return [
        b.group([receiver, b.indent([b.softline, dotMethod])], { id }),
        " ",
        b.indentIfBreak(printedArgs, { groupId: id }),
      ];
    } else if (operator) {
      // it's a setter
      // there is no chain, we allow a line to break after the `=`
      return b.group([receiver, dotMethod, b.indent([b.line, ...printedArgs])]);
    } else if (
      receiverIsWrapped(path, options) ||
      isArray(node.recv) ||
      isHash(node.recv)
    ) {
      // objects which have wrappers look better when the method is
      // chained right onto the end wrapper of the recv because
      // the end wrappers are typically not indented to where the method
      // will be
      return [b.group(receiver), dotMethod, formattedArgsAndBlock];
    } else if (amPartOfChain) {
      // when this send is part of a chain, we don't create a new group
      return [
        [receiver, b.indent([b.softline, dotMethod, formattedArgsAndBlock])],
      ];
      // } else if (hasBlock) {
      //   const id = Symbol("recv");
      //   return [
      //     b.group([receiver, dotMethod, formattedArgs], { id }),
      //     b.indentIfBreak(formattedBlock, { groupId: id }),
      //   ];
    } else if (hasBlock) {
      const id = Symbol("recvdotmethodargs");
      const open = b.ifBreak("do", "{");
      const end = b.ifBreak("end", "}");
      const blockArgs = path.callParent(() =>
        (path as unknown as AstPath<nodes.Block>).call(print, "args")
      );
      const body = path.callParent(() =>
        (path as unknown as AstPath<nodes.Block>).call(print, "body")
      );
      return [
        b.group([receiver, b.indent([b.softline, dotMethod])], { id }),
        b.indentIfBreak(printedArgs, { groupId: id }),
        b.group(
          b.indentIfBreak(
            [
              " ",
              open,
              blockArgs ? [" ", blockArgs] : "",
              parent.body ? [b.indent([b.line, body]), b.line] : "",
              end,
            ],
            { groupId: id }
          )
        ),
      ];
      // } else if (args.length) {
      //   return b.group([
      //     b.group([receiver, b.indent([b.softline, dotMethod, formattedArgs])]),
      //   ]);
    } else {
      // top of chain
      // return [
      //   b.group([receiver], { id }),
      //   b.group([
      //     b.indent([b.softline, dotMethod, formattedArgs]),
      //     b.indentIfBreak(formattedBlock, { groupId: id }),
      //   ]),
      // ];
      const id = Symbol("recv");
      // return b.conditionalGroup([
      //   // fits on one line
      //   [receiver, dotMethod, formattedArgs],
      //   [receiver, dotMethod, brokenArgs],
      //   // [
      //   //   b.group([receiver, b.indent([b.softline, dotMethod])], { id }),
      //   //   b.indentIfBreak([formattedArgs], { groupId: id }),
      //   // ],
      //   // fits when args of the top send are broken
      //   // [
      //   //   b.group([receiver, b.indent([b.softline, dotMethod])], { id }),
      //   //   b.indentIfBreak([brokenArgs], { groupId: id }),
      //   // ],
      //   // [receiver, b.indent([b.softline, dotMethod, formattedArgs])],
      //   // [
      //   //   b.group([receiver, b.indent([b.softline, dotMethod])]),
      //   //   brokenArgs,
      //   //   formattedBlock,
      //   // ],
      //   //   [
      //   //     b.group([receiver, b.indent([b.softline, dotMethod])]),
      //   //     brokenArgs,
      //   //     brokenBlock,
      //   //   ],
      //   //   [receiver, b.indent([b.softline, dotMethod, formattedArgs])],
      //   //   // [receiver, b.softline, dotMethod, brokenArgs, brokenBlock],
      //   //   // [
      //   //   //   receiver,
      //   //   //   b.indent([b.softline, dotMethod, formattedArgs, formattedBlock]),
      //   //   // ],
      //   [receiver, b.indent([b.softline, dotMethod, formattedArgs])],
      // ]);

      return b.group([
        receiver,
        b.indent([b.softline, dotMethod, formattedArgs]),
      ]);
      // top of a send chain
      // return b.conditionalGroup([
      //   // fits on one line
      //   [receiver, dotMethod, formattedArgs, formattedBlock],
      //   // fits when the outermost block breaks
      //   [receiver, b.softline, dotMethod, formattedArgs, brokenBlock],
      //   // fits when args of the top send are broken
      //   [receiver, b.softline, dotMethod, brokenArgs, formattedBlock],

      //   [receiver, b.softline, dotMethod, brokenArgs, brokenBlock],
      //   [
      //     receiver,
      //     b.indent([b.softline, dotMethod, formattedArgs, formattedBlock]),
      //   ],
      // ]);
      // END: CHAINING
      // } else {
      //   // we are chained to some recv, but it's not a send
      //   return b.group([
      //     receiver,
      //     b.indent([b.softline, dotMethod, formattedArgsAndBlock]),
      //   ]);
    }
  };
};

const printSend = makeSendPrinter(".");

export default printSend;
