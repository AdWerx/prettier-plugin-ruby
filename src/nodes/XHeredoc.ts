import { nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
import printHeredoc from "./Heredoc";
const { builders: b } = doc;

const printXHeredoc: NodePrinter<nodes.XHeredoc> = (...args) => {
  return printHeredoc(...args);
};

export default printXHeredoc;
