import { nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

const printFindPattern: NodePrinter<nodes.FindPattern> = (
  path,
  options,
  print
) => {
  return b.group(["[", b.join(", ", path.map(print, "elements")), "]"]);
};

export default printFindPattern;
