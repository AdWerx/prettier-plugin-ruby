import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
import { sourceFromLocation } from "../diagnostics";
const { builders: b } = doc;

const printAnd: NodePrinter<nodes.And> = (path, options, print) => {
  const node = path.getValue();
  const operator = sourceFromLocation(options, node.operator_l);
  return b.group([
    path.call(print, "lhs"),
    " ",
    operator,
    b.indent([b.line, path.call(print, "rhs")]),
  ]);
};

export default printAnd;
