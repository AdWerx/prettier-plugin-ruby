import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter, parentsWithImplicitSymbolChildren } from "../printer";
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
  const key = path.call(print, "key");
  parentsWithImplicitSymbolChildren.delete(node);
  return [key, separator, path.call(print, "value")];
};

export default printPair;
