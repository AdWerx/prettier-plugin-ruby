import { nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

const printRational: NodePrinter<nodes.Rational> = (path, options, print) => {
  const node = path.getValue();
  return node.value;
};

export default printRational;
