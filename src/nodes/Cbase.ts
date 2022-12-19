import { nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

const printCbase: NodePrinter<nodes.Cbase> = (path, options, print) => {
  return "";
};

export default printCbase;
