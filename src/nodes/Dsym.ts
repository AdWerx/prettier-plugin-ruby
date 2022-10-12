import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter, parentsWithImplicitSymbolChildren } from "../";
const { builders: b } = doc;

const printDsym: NodePrinter<nodes.Dsym> = (path, options, print) => {
  let prefix = ":";
  const parent = path.getParentNode();
  // if we're the immediate child of an array and the array has a %w or %W modifier,
  // we do not need quotes
  if (parent && parentsWithImplicitSymbolChildren.has(parent)) {
    prefix = "";
  }
  // lossy
  return b.group([prefix, "#{", ...path.map(print, "parts"), "}"]);
};

export default printDsym;
