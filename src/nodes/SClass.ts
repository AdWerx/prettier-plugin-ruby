import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

const printSClass: NodePrinter<nodes.SClass> = (path, options, print) => {
  const node = path.getValue();
  return b.group([
    "class << ",
    path.call(print, "expr"),
    node.body ? b.indent([b.hardline, path.call(print, "body")]) : ";",
    b.line,
    "end",
  ]);
};

export default printSClass;
