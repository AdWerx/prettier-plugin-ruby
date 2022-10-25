import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
import { sourceFromLocation } from "../diagnostics";
const { builders: b } = doc;

const printOr: NodePrinter<nodes.Or> = (path, options, print) => {
  const node = path.getValue();
  const operator = sourceFromLocation(options, node.operator_l);
  return b.group([
    path.call(print, "lhs"),
    " ",
    b.group([operator, b.indent([b.line, path.call(print, "rhs")])]),
  ]);
};

export default printOr;
