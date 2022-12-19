import { nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

const printKwarg: NodePrinter<nodes.Kwarg> = (path, options, print) => {
  const node = path.getValue();
  return [node.name, ":"];
};

export default printKwarg;
