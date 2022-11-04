import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

const printDefs: NodePrinter<nodes.Defs> = (path, options, print) => {
  const node = path.getValue();
  const args = path.call(print, "args");
  const body = path.call(print, "body");
  const preamble = ["def ", "self.", node.name, args];

  if (node.assignment_l) {
    // endless method def
    return ["def ", "self.", node.name, args || "()", " = ", body];
  } else {
    return b.group([
      b.group([preamble]),
      node.body ? b.indent([b.hardline, body]) : ";",
      b.line,
      "end",
    ]);
  }
};

export default printDefs;
