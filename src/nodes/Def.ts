import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printDef: NodePrinter<nodes.Def> = (path, options, print) => {
  const node = path.getValue();
  const body = path.call(print, "body");
  const args = path.call(print, "args");
  const preamble = ["def ", node.name, args];

  if (node.assignment_l) {
    // endless method def
    return [preamble, " = ", body];
  } else {
    return b.group([
      b.group([preamble]),
      node.body ? b.indent([b.hardline, body]) : ";",
      b.line,
      "end",
    ]);
  }
};

export default printDef;
