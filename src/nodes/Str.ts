import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter, parentsWithImplicitStringChildren } from "../";
const { builders: b } = doc;

const printStr: NodePrinter<nodes.Str> = (path, options, print) => {
  const node = path.getValue();
  const parent = path.getParentNode();
  let quote = options.singleQuote ? "'" : '"';
  const string = new TextDecoder().decode(node.value);
  // lossy
  // @TODO break it up?
  if (parent && parentsWithImplicitStringChildren.has(parent)) {
    // if we're the immediate child of an array and the array has a %w or %W modifier,
    // we do not need quotes
    return string;
  } else {
    return [quote, string, quote];
  }
};

export default printStr;
