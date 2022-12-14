import { nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

const printEncoding: NodePrinter<nodes.Encoding> = (path, options, print) => {
  return "__ENCODING__";
};

export default printEncoding;
