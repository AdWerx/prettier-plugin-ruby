import { nodes } from "lib-ruby-parser";
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
    return [preamble, " = ", body];
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
