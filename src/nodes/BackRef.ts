import { nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

const printBackRef: NodePrinter<nodes.BackRef> = (path, options, print) => {
  const node = path.getValue();
  return node.name;
};

export default printBackRef;
