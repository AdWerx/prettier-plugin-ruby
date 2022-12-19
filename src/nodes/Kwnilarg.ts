import { nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

const printKwnilarg: NodePrinter<nodes.Kwnilarg> = (path, options, print) => {
  return "**nil";
};

export default printKwnilarg;
