import { nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

const printErange: NodePrinter<nodes.Erange> = (path, options, print) => {
  const node = path.getValue();
  return [path.call(print, "left"), "...", path.call(print, "right")];
};

export default printErange;
