import { nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

const printIfGuard: NodePrinter<nodes.IfGuard> = (path, options, print) => {
  return b.group(["if ", path.call(print, "cond")]);
};

export default printIfGuard;
