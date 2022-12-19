import { nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

const printMatchRest: NodePrinter<nodes.MatchRest> = (path, options, print) => {
  return ["*", path.call(print, "name")];
};

export default printMatchRest;
