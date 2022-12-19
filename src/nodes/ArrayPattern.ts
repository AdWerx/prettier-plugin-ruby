import { nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
import printArray from "./Array";
const { builders: b } = doc;

const printArrayPattern: NodePrinter<nodes.ArrayPattern> = (...args) => {
  return printArray(...args);
};

export default printArrayPattern;
