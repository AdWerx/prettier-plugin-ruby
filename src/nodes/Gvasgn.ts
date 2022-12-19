import { nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
import printLvasgn from "./Lvasgn";
const { builders: b } = doc;

const printGvasgn: NodePrinter<nodes.Gvasgn> = (...args) => {
  return printLvasgn(...args);
};

export default printGvasgn;
