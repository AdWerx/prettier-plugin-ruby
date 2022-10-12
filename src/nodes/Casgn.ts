import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printCasgn: NodePrinter<nodes.Casgn> = (path, options, print) => {
  const node = path.getValue();
  path.call(print, "scope");
  path.call(print, "value");
  return b.group([
    node.scope ? [path.call(print, "scope"), "::"] : "",
    node.name,
    " =",
    b.indent([b.line, path.call(print, "value")]),
  ]);
};

export default printCasgn;
