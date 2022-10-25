import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
import { sourceFromLocation } from "../diagnostics";
const { builders: b } = doc;

const printHash: NodePrinter<nodes.Hash> = (path, options, print) => {
  const node = path.getValue();
  const containsNewline = sourceFromLocation(
    options,
    node.expression_l
  ).includes("\n");
  return b.group([
    "{",
    containsNewline ? b.breakParent : "",
    node.pairs.length
      ? [
          b.indent([b.line, b.join([",", b.line], path.map(print, "pairs"))]),
          b.line,
        ]
      : "",
    "}",
  ]);
};

export default printHash;
