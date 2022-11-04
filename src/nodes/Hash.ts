import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
import { primitiveShouldBreak } from "../queries";

const { builders: b } = doc;

const printHash: NodePrinter<nodes.Hash> = (path, options, print) => {
  const node = path.getValue();
  const parent = path.getParentNode();

  return b.group(
    [
      "{",
      node.pairs.length
        ? [
            b.indent([b.line, b.join([",", b.line], path.map(print, "pairs"))]),
            b.line,
          ]
        : "",
      "}",
    ],
    { shouldBreak: primitiveShouldBreak(path, options) }
  );
};

export default printHash;
