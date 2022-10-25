import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

const printAndAsgn: NodePrinter<nodes.AndAsgn> = (path, options, print) => {
  return b.group([
    path.call(print, "recv"),
    " &&=",
    b.indent([b.line, path.call(print, "value")]),
  ]);
};

export default printAndAsgn;
