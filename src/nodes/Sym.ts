import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter, parentsWithImplicitSymbolChildren } from "../";
const { builders: b } = doc;

const printSym: NodePrinter<nodes.Sym> = (path, options, print) => {
  const node = path.getValue();
  let prefix = ":";
  const parent = path.getParentNode();
  // if we're the immediate child of an array and the array has a %i or %I modifier,
  // we do not need a prefix
  if (parent && parentsWithImplicitSymbolChildren.has(parent)) {
    prefix = "";
  }
  // lossy
  return [prefix, new TextDecoder().decode(node.name)];
};

export default printSym;
