import { nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { doc } from "prettier";
import {
  parentsWithImplicitStringChildren,
  parentsWithImplicitSymbolChildren,
  NodePrinter,
} from "../printer";
const { builders: b } = doc;

const printDsym: NodePrinter<nodes.Dsym> = (path, options, print) => {
  let prefix = ":";
  const node = path.getValue();
  const parent = path.getParentNode();
  let quote = options.singleQuote ? "'" : '"';
  parentsWithImplicitStringChildren.set(node, node);
  // if we're the immediate child of an array and the array has a %w or %W modifier,
  // we do not need quotes
  if (parent && parentsWithImplicitSymbolChildren.has(parent)) {
    prefix = "";
  }
  const parts = path.map(print, "parts");
  if (parent && parentsWithImplicitStringChildren.has(parent)) {
    // if we're the immediate child of an array and the array has a %w or %W modifier,
    // we do not need quotes
    return [prefix, ...parts];
  } else {
    return b.group([prefix, '"', parts, '"']);
  }
};

export default printDsym;
