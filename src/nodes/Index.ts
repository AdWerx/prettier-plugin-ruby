import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

const printIndex: NodePrinter<nodes.Index> = (path, options, print) => {
  return b.group([
    path.call(print, "recv"),
    // its not pretty when the brackets break so we wrap them a second time
    // to isolate them from the receiver breaker, which is probably most often
    // breakable in a much prettier way
    b.group([
      "[",
      b.indent([b.softline, b.join([",", b.line], path.map(print, "indexes"))]),
      b.softline,
      "]",
    ]),
  ]);
};

export default printIndex;
