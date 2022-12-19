import { nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

const printSelf_: NodePrinter<nodes.Self_> = (path, options, print) => {
  return "self";
};

export default printSelf_;
