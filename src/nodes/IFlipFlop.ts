import { nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

const printIFlipFlop: NodePrinter<nodes.IFlipFlop> = (path, options, print) => {
  return b.group([path.call(print, "left"), "..", path.call(print, "right")]);
};

export default printIFlipFlop;
