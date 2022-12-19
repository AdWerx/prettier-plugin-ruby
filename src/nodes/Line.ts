import { nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

const printLine: NodePrinter<nodes.Line> = (path, options, print) => {
  return "__LINE__";
};

export default printLine;
