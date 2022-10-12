import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printCvasgn: NodePrinter<nodes.Cvasgn> = (path, options, print) => {
  const node = path.getValue();
  return b.group([
    node.name,
    " =",
    b.indent([b.line, path.call(print, "value")]),
  ]);
};

export default printCvasgn;
