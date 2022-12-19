import { nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

const printRetry: NodePrinter<nodes.Retry> = (path, options, print) => {
  return "retry";
};

export default printRetry;
