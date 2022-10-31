import { nodes } from "lib-ruby-parser";
import { Doc, doc } from "prettier";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

const printBlock: NodePrinter<nodes.Block> = (path, options, print) => {
  const node = path.getValue();
  const parent = path.getParentNode();
  let args: Doc = "";
  let body: Doc = "";
  const open = b.ifBreak("do", "{");
  const end = b.ifBreak("end", "}");
  const parts: Doc[] = [];

  if (node.args instanceof nodes.Args && node.args.args.length) {
    args = path.call(print, "args");
  }
  if (node.body) {
    body = [b.indent([b.line, path.call(print, "body")]), b.line];
  }

  if (node.call instanceof nodes.Lambda) {
    args = args ? [args, " "] : " ";
    parts.push(path.call(print, "call"), args, b.group([open, body, end]));
  } else if (node.call instanceof nodes.Send) {
    const callId = Symbol("call");
    args = args ? [" ", args] : args;
    body = body ? b.indentIfBreak(body, { groupId: callId }) : body;
    parts.push([
      b.group(path.call(print, "call"), { id: callId }),
      " ",
      b.group([open, args, body, end]),
    ]);
  }

  // @TODO maybe the block can be added to a weakmap and allow the Send to find it
  // and print it itself?

  // let args: Doc = "";
  // if (node.args instanceof nodes.Args && node.args.args.length) {
  //   args = [isLambda ? "" : " ", path.call(print, "args")];
  // }
  // const hasIntentionalBreak = sourceFromLocation(
  //   options,
  //   node.expression_l
  // ).includes("\n");

  return parts;

  // const callId = Symbol("call");
  // if (parent instanceof nodes.Send) {
  //   // when this block is in a send chain, we try to keep the send+block on
  //   // the same line and let the "call" break first, so it cannot be grouped
  //   return [
  //     path.call(print, "call"),
  //     isLambda ? args : "",
  //     " ",
  //     b.group([
  //       b.ifBreak("do", "{"),
  //       !isLambda ? args : "",
  //       b.indent([b.line, path.call(print, "body")]),
  //       b.line,
  //       b.ifBreak("end", "}"),
  //     ]),
  //   ];
  // } else {
  //   return [
  //     b.group(path.call(print, "call"), { id: callId }),
  //     isLambda ? args : "",
  //     " ",
  //     b.group([
  //       b.ifBreak("do", "{"),
  //       !isLambda ? args : "",
  //       node.body
  //         ? b.indentIfBreak(
  //             [b.indent([b.line, path.call(print, "body")]), b.line],
  //             { groupId: callId }
  //           )
  //         : "",
  //       b.ifBreak("end", "}"),
  //     ]),
  //   ];
  // }
};

export default printBlock;
