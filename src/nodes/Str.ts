import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { DEFAULT_QUOTE, NodePrinter } from "../";
const { builders: b } = doc;

const printStr: NodePrinter<nodes.Str> = (path, options, print) => {
  const node = path.getValue();
  let quote = DEFAULT_QUOTE;
  const parent = path.getParentNode();
  // if we're the immediate child of an array and the array has a %w or %W modifier,
  // we do not need quotes
  if (options.parentWithImplicitStringChildren === parent) {
    quote = "";
  }
  // lossy
  // @TODO break it up?
  return [quote, new TextDecoder().decode(node.value), quote];
};

export default printStr;
