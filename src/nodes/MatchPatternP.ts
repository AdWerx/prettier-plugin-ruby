import { nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

const printMatchPatternP: NodePrinter<nodes.MatchPatternP> = (
  path,
  options,
  print
) => {
  const node = path.getValue();
  return b.group([
    path.call(print, "value"),
    " in ",
    path.call(print, "pattern"),
  ]);
};

export default printMatchPatternP;
