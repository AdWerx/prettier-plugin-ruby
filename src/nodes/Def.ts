import { nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { doc, util } from "prettier";
import { NodePrinter, NodeWithComments } from "../printer";
import { sourceFromLocation } from "../diagnostics";
const { builders: b } = doc;

const printDef: NodePrinter<nodes.Def & NodeWithComments> = (
  path,
  options,
  print
) => {
  const node = path.getValue();
  let body = path.call(print, "body");
  const args = path.call(print, "args");
  const preamble = ["def ", node.name, args];
  const bodyComments = node.comments?.filter(
    (c) => !c.leading && !c.trailing && c.placement == "ownLine"
  );
  if (!node.body && bodyComments?.length) {
    body = b.join(
      b.hardline,
      bodyComments.map((comment) => {
        comment.printed = true;
        return sourceFromLocation(options, comment.loc).trim();
      })
    );
  }

  if (node.assignment_l) {
    // endless method def
    return ["def ", node.name, args || "()", " = ", body];
  } else {
    return b.group([
      ...preamble,
      body ? b.indent([b.hardline, body]) : b.ifBreak("", ";"),
      b.line,
      "end",
    ]);
  }
};

export default printDef;
