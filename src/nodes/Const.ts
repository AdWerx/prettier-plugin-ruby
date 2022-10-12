import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printConst: NodePrinter<nodes.Const> = (path, options, print) => {
  const node = path.getValue();
  return b.group([
    node.scope ? [path.call(print, "scope"), "::"] : "",
    b.indent([b.softline, node.name]),
  ]);
};

export default printConst;
