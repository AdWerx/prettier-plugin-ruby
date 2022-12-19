import { nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

const printEmptyElse: NodePrinter<nodes.EmptyElse> = (path, options, print) => {
  const node = path.getValue();
  return "";
};

export default printEmptyElse;
