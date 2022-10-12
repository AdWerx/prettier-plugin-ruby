import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printRational: NodePrinter<nodes.Rational> = (path, options, print) => {
  const node = path.getValue();
  return node.value;
};

export default printRational;
