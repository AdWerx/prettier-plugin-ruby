import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter, parentsWithImplicitSymbolChildren } from "../";
const { builders: b } = doc;

const printPair: NodePrinter<nodes.Pair> = (path, options, print) => {
  const node = path.getValue();
  let separator: string;
  if (node.key instanceof nodes.Sym) {
    parentsWithImplicitSymbolChildren.set(node, node);
    separator = ": ";
  } else {
    separator = " => ";
  }
  return b.group([
    path.call(print, "key"),
    separator,
    path.call(print, "value"),
  ]);
};

export default printPair;
