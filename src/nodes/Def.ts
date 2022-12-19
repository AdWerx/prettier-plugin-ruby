import { nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

const printDef: NodePrinter<nodes.Def> = (path, options, print) => {
  const node = path.getValue();
  const body = path.call(print, "body");
  const args = path.call(print, "args");
  const preamble = ["def ", node.name, args];

  if (node.assignment_l) {
    // endless method def
    return ["def ", node.name, args || "()", " = ", body];
  } else {
    return b.group([
      ...preamble,
      node.body ? b.indent([b.hardline, body]) : b.ifBreak("", ";"),
      b.line,
      "end",
    ]);
  }
};

export default printDef;
