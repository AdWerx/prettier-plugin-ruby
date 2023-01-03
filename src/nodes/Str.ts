import { nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { doc } from "prettier";
import {
  parentsWithImplicitStringChildren,
  NodePrinter,
  quote,
} from "../printer";
import { sourceFromLocation } from "../diagnostics";
const { builders: b } = doc;

const printStr: NodePrinter<nodes.Str> = (path, options, print) => {
  const node = path.getValue();
  const parent = path.getParentNode();
  const asAuthored = sourceFromLocation(options, node.expression_l);
  let string: string;

  if (node.begin_l && node.end_l) {
    string = asAuthored.slice(1, -1);
  } else {
    string = asAuthored;
  }

  if (parent && parentsWithImplicitStringChildren.has(parent)) {
    // if we're the immediate child of an array and the array has a %w or %W modifier,
    // we do not need quotes
    return string;
  } else {
    return quote(options, string);
  }
};

export default printStr;
