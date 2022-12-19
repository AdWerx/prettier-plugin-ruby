import { nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

const printFile: NodePrinter<nodes.File> = (path, options, print) => {
  return "__FILE__";
};

export default printFile;
