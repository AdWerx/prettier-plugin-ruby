import { nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
import { primitiveShouldBreak } from "../queries";

const { builders: b } = doc;

const printHash: NodePrinter<nodes.Hash> = (path, options, print) => {
  const node = path.getValue();
  const beg = path.call(print, "begin_l");
  const end = path.call(print, "end_l");
  return b.group(
    [
      beg,
      node.pairs.length
        ? [
            b.indent([
              beg ? b.line : "",
              b.join([",", b.line], path.map(print, "pairs")),
            ]),
            end ? b.line : "",
          ]
        : "",
      end,
    ],
    { shouldBreak: primitiveShouldBreak(path, options) }
  );
};

export default printHash;
