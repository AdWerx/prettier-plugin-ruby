import { nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

const printCase: NodePrinter<nodes.Case> = (path, options, print) => {
  const node = path.getValue();
  return [
    "case ",
    path.call(print, "expr"),
    b.hardline,
    b.join(b.hardline, path.map(print, "when_bodies")),
    node.else_body
      ? [
          b.hardline,
          b.group(["else", b.indent([b.line, path.call(print, "else_body")])]),
        ]
      : "",
    b.hardline,
    "end",
  ];
};

export default printCase;
