import { nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

const printRegOpt: NodePrinter<nodes.RegOpt> = (path, options, print) => {
  const node = path.getValue();
  return node.options || "";
};

export default printRegOpt;
