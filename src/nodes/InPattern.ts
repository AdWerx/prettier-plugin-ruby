import { nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

const printInPattern: NodePrinter<nodes.InPattern> = (path, options, print) => {
  const node = path.getValue();
  return b.group([
    "in ",
    path.call(print, "pattern"),
    node.guard ? [" ", path.call(print, "guard")] : "",
    node.body
      ? b.indent([b.line, b.ifBreak("", ["then "]), path.call(print, "body")])
      : "",
  ]);
};

export default printInPattern;
