import { nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

const printKwBegin: NodePrinter<nodes.KwBegin> = (path, options, print) => {
  const node = path.getValue();
  return [
    "begin",
    node.statements.length
      ? b.indent([
          b.hardline,
          b.join(b.hardline, path.map(print, "statements")),
        ])
      : "",
    b.hardline,
    "end",
  ];
};

export default printKwBegin;
