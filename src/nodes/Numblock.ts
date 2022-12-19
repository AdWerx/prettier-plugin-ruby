import { nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

const printNumblock: NodePrinter<nodes.Numblock> = (path, options, print) => {
  const node = path.getValue();
  return b.group([
    path.call(print, "call"),
    " ",
    b.ifBreak("do", "{"),
    b.indent([b.line, path.call(print, "body")]),
    b.line,
    b.ifBreak("end", "}"),
  ]);
};

export default printNumblock;
