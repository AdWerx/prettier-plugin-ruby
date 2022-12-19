import { nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

const printCvar: NodePrinter<nodes.Cvar> = (path, options, print) => {
  const node = path.getValue();
  return node.name;
};

export default printCvar;
