import { nodes } from "lib-ruby-parser";
import { Doc, doc } from "prettier";
import { NodePrinter } from "../printer";
import { sourceFromLocation } from "../diagnostics";
const { builders: b } = doc;

const printIndexAsgn: NodePrinter<nodes.IndexAsgn> = (path, options, print) => {
  const node = path.getValue();
  let operator: Doc = "";
  if (node.operator_l) {
    operator = [" ", sourceFromLocation(options, node.operator_l)];
  }
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
      operator,
    ]),
    node.value ? [" ", path.call(print, "value")] : "",
  ]);
};

export default printIndexAsgn;
