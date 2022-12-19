import { nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

const printMatchNilPattern: NodePrinter<nodes.MatchNilPattern> = (
  path,
  options,
  print
) => {
  return "**nil";
};

export default printMatchNilPattern;
