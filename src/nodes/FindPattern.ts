import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printFindPattern: NodePrinter<nodes.FindPattern> = (
  path,
  options,
  print
) => {
  return b.group(["[", b.join(", ", path.map(print, "elements")), "]"]);
};

export default printFindPattern;
