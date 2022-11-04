import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
import { canBreakIndex } from "../queries";
const { builders: b } = doc;

const printIndex: NodePrinter<nodes.Index> = (path, options, print) => {
  if (canBreakIndex(path)) {
    return b.group([
      path.call(print, "recv"),
      b.group([
        "[",
        b.indent([
          b.softline,
          b.join([",", b.line], path.map(print, "indexes")),
        ]),
        b.softline,
        "]",
      ]),
    ]);
  } else {
    return b.group([
      path.call(print, "recv"),
      "[",
      b.join(", ", path.map(print, "indexes")),
      "]",
    ]);
  }
};

export default printIndex;
