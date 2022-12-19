import { nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

const printUnlessGuard: NodePrinter<nodes.UnlessGuard> = (
  path,
  options,
  print
) => {
  return b.group(["unless ", path.call(print, "cond")]);
};

export default printUnlessGuard;
