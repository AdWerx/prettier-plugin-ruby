import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printOpAsgn: NodePrinter<nodes.OpAsgn> = (path, options, print) => {
  const node = path.getValue();
  return b.group([
    path.call(print, "recv"),
    " ",
    node.operator,
    "=",
    b.indent([b.line, path.call(print, "value")]),
  ]);
};

export default printOpAsgn;