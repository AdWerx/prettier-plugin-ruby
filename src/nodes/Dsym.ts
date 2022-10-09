import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printDsym: NodePrinter<nodes.Dsym> = (path, options, print) => {
  let prefix = ":";
  const parent = path.getParentNode();
  // if we're the immediate child of an array and the array has a %w or %W modifier,
  // we do not need quotes
  if (options.parentWithImplicitSymbolChildren === parent) {
    prefix = "";
  }
  // lossy
  return [prefix, "#{", ...path.map(print, "parts"), "}"];
};

export default printDsym;
