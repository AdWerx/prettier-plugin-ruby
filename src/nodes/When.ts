import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

const printWhen: NodePrinter<nodes.When> = (path, options, print) => {
  return b.group([
    "when ",
    path.map(print, "patterns"),
    b.indent([b.line, b.ifBreak("", ["then "]), path.call(print, "body")]),
  ]);
};

export default printWhen;
