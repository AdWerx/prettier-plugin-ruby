import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printAnd: NodePrinter<nodes.And> = (path, options, print) => {
  return b.group([
    path.call(print, "lhs"),
    " &&",
    b.indent([b.line, path.call(print, "rhs")]),
  ]);
};

export default printAnd;
