// gen:mayoverwrite
import { nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

const printNil: NodePrinter<nodes.Nil> = (path, options, print) => {
  return "nil";
};

export default printNil;
