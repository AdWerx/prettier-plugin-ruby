import { nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

const printFor: NodePrinter<nodes.For> = (path, options, print) => {
  const node = path.getValue();
  return [
    "for ",
    path.call(print, "iterator"),
    " in ",
    path.call(print, "iteratee"),
    " ",
    b.ifBreak("do", "{"),
    b.indent([b.line, path.call(print, "body")]),
    b.line,
    b.ifBreak("end", "}"),
  ];
};

export default printFor;
