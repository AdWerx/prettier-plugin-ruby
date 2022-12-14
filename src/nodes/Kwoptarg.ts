import { nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

const printKwoptarg: NodePrinter<nodes.Kwoptarg> = (path, options, print) => {
  const node = path.getValue();
  return [node.name, ": ", path.call(print, "default_")];
};

export default printKwoptarg;
