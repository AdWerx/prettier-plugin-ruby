import { nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

const printBlockPass: NodePrinter<nodes.BlockPass> = (path, options, print) => {
  return ["&", path.call(print, "value")];
};

export default printBlockPass;
