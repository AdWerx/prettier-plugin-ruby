import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printIndexAsgn: NodePrinter<nodes.IndexAsgn> = (path, options, print) => {
  return b.group([
    path.call(print, "recv"),
    "[",
    b.indent([b.softline, b.join([",", b.line], path.map(print, "indexes"))]),
    b.softline,
    "] = ",
    path.call(print, "value"),
  ]);
};

export default printIndexAsgn;
