// gen:mayoverwrite
import { nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

const printTrue: NodePrinter<nodes.True> = (path, options, print) => {
  return "true";
};

export default printTrue;
