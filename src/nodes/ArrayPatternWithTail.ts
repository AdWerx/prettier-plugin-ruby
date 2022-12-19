import { nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

const printArrayPatternWithTail: NodePrinter<nodes.ArrayPatternWithTail> = (
  path,
  options,
  print
) => {
  return b.group([
    "[",
    b.indent([b.softline, b.join([",", b.line], path.map(print, "elements"))]),
    b.softline,
    ",",
    "]",
  ]);
};

export default printArrayPatternWithTail;
