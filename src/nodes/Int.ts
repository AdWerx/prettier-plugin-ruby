import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printInt: NodePrinter<nodes.Int> = (path, options, print) => {
  const node = path.getValue();
  return node.value;
};

export default printInt;
