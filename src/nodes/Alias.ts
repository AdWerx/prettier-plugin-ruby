import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter, parentsWithImplicitSymbolChildren } from "../printer";
const { builders: b } = doc;

const printAlias: NodePrinter<nodes.Alias> = (path, options, print) => {
  const node = path.getValue();
  parentsWithImplicitSymbolChildren.set(node, node);
  return b.group([
    "alias",
    b.indent([
      b.line,
      path.call(print, "to"),
      b.line,
      path.call(print, "from"),
    ]),
  ]);
};

export default printAlias;
