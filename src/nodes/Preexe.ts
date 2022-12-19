import { nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

const printPreexe: NodePrinter<nodes.Preexe> = (path, options, print) => {
  const node = path.getValue();
  return b.group([
    "BEGIN ",
    "{",
    node.body ? [b.indent([b.line, path.call(print, "body")]), b.line] : "",
    "}",
  ]);
};

export default printPreexe;
