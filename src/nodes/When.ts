import { nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

const printWhen: NodePrinter<nodes.When> = (path, options, print) => {
  return b.group([
    "when ",
    b.group([
      b.indent(b.join([",", b.line], path.map(print, "patterns"))),
      b.ifBreak([b.line, "then"], ""),
    ]),
    b.indent([b.line, b.ifBreak("", ["then "]), path.call(print, "body")]),
  ]);
};

export default printWhen;
