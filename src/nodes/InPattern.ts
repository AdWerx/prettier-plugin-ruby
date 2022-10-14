import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printInPattern: NodePrinter<nodes.InPattern> = (path, options, print) => {
  const node = path.getValue();
  return b.group([
    "in ",
    path.call(print, "pattern"),
    node.guard ? [" ", path.call(print, "guard")] : "",
    b.indent([b.line, b.ifBreak("", ["then "]), path.call(print, "body")]),
  ]);
};

export default printInPattern;
