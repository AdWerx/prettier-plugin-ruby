import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

const printComplex: NodePrinter<nodes.Complex> = (path, options, print) => {
  const node = path.getValue();
  return node.value;
};

export default printComplex;
