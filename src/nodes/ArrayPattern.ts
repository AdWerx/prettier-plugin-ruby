import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printArrayPattern: NodePrinter<nodes.ArrayPattern> = (
  path,
  options,
  print
) => {
  const node = path.getValue();
  path.map(print, "elements");
  console.log("ArrayPattern");
  return `❗️ArrayPattern`;
};

export default printArrayPattern;
