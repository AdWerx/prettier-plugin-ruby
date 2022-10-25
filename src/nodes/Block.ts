import { nodes } from "lib-ruby-parser";
import { Doc, doc } from "prettier";
import { sourceFromLocation } from "../diagnostics";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

const printBlock: NodePrinter<nodes.Block> = (path, options, print) => {
  const node = path.getValue();
  const parent = path.getParentNode();
  const isLambda = node.call instanceof nodes.Lambda;
  let args: Doc = "";
  if (node.args instanceof nodes.Args && node.args.args.length) {
    args = [isLambda ? "" : " ", path.call(print, "args")];
  }
  const hasIntentionalBreak = sourceFromLocation(
    options,
    node.expression_l
  ).includes("\n");

  const callId = Symbol("call");

  if (parent instanceof nodes.Send) {
    // when this block is in a send chain, we try to keep the send+block on
    // the same line and let the "call" break first, so it cannot be grouped
    return [
      path.call(print, "call"),
      isLambda ? args : "",
      " ",
      b.indent(
        b.group([
          b.ifBreak("do", "{"),
          !isLambda ? args : "",
          b.indent([b.line, path.call(print, "body")]),
          b.line,
          b.ifBreak("end", "}"),
        ])
      ),
    ];
  } else {
    return [
      b.group(path.call(print, "call"), { id: callId }),
      isLambda ? args : "",
      " ",
      b.group([
        b.ifBreak("do", "{"),
        !isLambda ? args : "",
        node.body
          ? b.indentIfBreak(
              [b.indent([b.line, path.call(print, "body")]), b.line],
              { groupId: callId }
            )
          : "",
        b.ifBreak("end", "}"),
      ]),
    ];
  }
};

export default printBlock;
