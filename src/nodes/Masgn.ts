import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printMasgn: NodePrinter<nodes.Masgn> = (path, options, print) => {
  return b.group([
    path.call(print, "lhs"),
    " =",
    b.indent([b.line, path.call(print, "rhs")]),
  ]);
};

export default printMasgn;
