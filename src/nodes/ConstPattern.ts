import { nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
import { sourceFromLocation } from "../diagnostics";
const { builders: b } = doc;

const printConstPattern: NodePrinter<nodes.ConstPattern> = (
  path,
  options,
  print
) => {
  const node = path.getValue();
  const wrappers = [
    sourceFromLocation(options, node.begin_l),
    sourceFromLocation(options, node.end_l),
  ];
  return b.group([
    path.call(print, "const_"),
    wrappers[0],
    path.call(print, "pattern"),
    wrappers[1],
  ]);
};

export default printConstPattern;
