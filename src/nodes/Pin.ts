import { nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

const printPin: NodePrinter<nodes.Pin> = (path, options, print) => {
  const node = path.getValue();
  return ["^", path.call(print, "var_")];
};

export default printPin;
