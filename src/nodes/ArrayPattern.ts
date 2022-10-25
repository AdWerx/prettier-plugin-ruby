import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
import printArray from "./Array";
const { builders: b } = doc;

const printArrayPattern: NodePrinter<nodes.ArrayPattern> = (...args) => {
  return printArray(...args);
};

export default printArrayPattern;
