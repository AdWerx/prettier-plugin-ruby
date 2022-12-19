import { nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

const printEnsure: NodePrinter<nodes.Ensure> = (path, options, print) => {
  return [
    path.call(print, "body"),
    b.dedent([b.hardline, "ensure"]),
    b.hardline,
    path.call(print, "ensure"),
  ];
};

export default printEnsure;
