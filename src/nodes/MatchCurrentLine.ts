import { nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

const printMatchCurrentLine: NodePrinter<nodes.MatchCurrentLine> = (
  path,
  options,
  print
) => {
  return path.call(print, "re");
};

export default printMatchCurrentLine;
