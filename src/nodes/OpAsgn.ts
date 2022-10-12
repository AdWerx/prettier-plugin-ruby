import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printOpAsgn: NodePrinter<nodes.OpAsgn> = (path, options, print) => {
  return b.group([
    path.call(print, "recv"),
    b.indent([b.line, path.call(print, "value")]),
  ]);
};

export default printOpAsgn;
