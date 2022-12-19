import { nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
import { sourceFromLocation } from "../diagnostics";
const { builders: b } = doc;

const printSuper: NodePrinter<nodes.Super> = (path, options, print) => {
  const node = path.getValue();
  const parens = [
    node.begin_l ? sourceFromLocation(options, node.begin_l) : " ",
    node.end_l ? sourceFromLocation(options, node.end_l) : "",
  ];
  const expression = sourceFromLocation(options, node.expression_l);
  if (expression == "super()") {
    return expression;
  }
  return b.group([
    "super",
    b.ifBreak("(", parens[0]),
    node.args.length
      ? [
          b.indent([
            b.softline,
            b.join([",", b.line], path.map(print, "args")),
          ]),
          b.softline,
        ]
      : "",
    b.ifBreak(")", parens[1]),
  ]);
};

export default printSuper;
