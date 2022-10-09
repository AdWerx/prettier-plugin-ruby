import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printSym: NodePrinter<nodes.Sym> = (path, options, print) => {
  const node = path.getValue();
  let prefix = ":";
  const parent = path.getParentNode();
  // if we're the immediate child of an array and the array has a %w or %W modifier,
  // we do not need quotes
  if (
    options.enclosingArrayNodeWithModifier === parent &&
    options.enclosingArrayNodeWithModifierBrackets?.[0]?.match(/i/i)
  ) {
    prefix = "";
  }
  // lossy
  return [prefix, new TextDecoder().decode(node.name)];
};

export default printSym;
