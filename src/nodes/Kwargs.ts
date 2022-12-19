import { nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
import { sourceFromLocation } from "../diagnostics";
const { builders: b } = doc;

const printKwargs: NodePrinter<nodes.Kwargs> = (path, options, print) => {
  const node = path.getValue();
  return [b.join([",", b.line], path.map(print, "pairs"))];
};

export default printKwargs;
