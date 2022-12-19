import { nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

const printMatchAlt: NodePrinter<nodes.MatchAlt> = (path, options, print) => {
  const node = path.getValue();
  return b.group([path.call(print, "lhs"), " | ", path.call(print, "rhs")]);
};

export default printMatchAlt;
