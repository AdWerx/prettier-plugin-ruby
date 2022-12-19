import { nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
import { sourceFromLocation } from "../diagnostics";
const { builders: b } = doc;

const printLambda: NodePrinter<nodes.Lambda> = (path, options, print) => {
  const node = path.getValue();
  return "->";
};

export default printLambda;
