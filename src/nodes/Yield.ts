import { nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
import { printArgs } from "./Send";
const { builders: b } = doc;

const printYield: NodePrinter<nodes.Yield> = (path, options, print) => {
  return b.group(["yield", printArgs(path, options, print)]);
};

export default printYield;
