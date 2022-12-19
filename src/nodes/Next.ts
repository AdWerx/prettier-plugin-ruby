import { nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

const printNext: NodePrinter<nodes.Next> = (path, options, print) => {
  const node = path.getValue();
  return b.group([
    "next",
    node.args.length ? " " : "",
    b.join([",", b.line], path.map(print, "args")),
  ]);
};

export default printNext;
