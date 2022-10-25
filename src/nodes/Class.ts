import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

const printClass: NodePrinter<nodes.Class> = (path, options, print) => {
  const node = path.getValue();
  return b.group([
    "class ",
    path.call(print, "name"),
    node.superclass ? [" < ", path.call(print, "superclass")] : "",
    node.body ? b.indent([b.hardline, path.call(print, "body")]) : ";",
    b.line,
    "end",
  ]);
};

export default printClass;
