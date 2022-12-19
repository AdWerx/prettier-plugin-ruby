import { nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
import printLvasgn from "./Lvasgn";
const { builders: b } = doc;

const printCvasgn: NodePrinter<nodes.Cvasgn> = (...args) => {
  return printLvasgn(...args);
};

export default printCvasgn;
