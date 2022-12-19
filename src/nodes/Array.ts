import { nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { doc } from "prettier";
import {
  NodePrinter,
  parentsWithImplicitStringChildren,
  parentsWithImplicitSymbolChildren,
} from "../printer";
import { primitiveShouldBreak } from "../queries";
const { builders: b } = doc;

const printArray: NodePrinter<nodes.Array> = (path, options, print) => {
  const node = path.getValue();
  const parent = path.getParentNode();
  let brackets: [string, string] = ["", ""];
  let delimiter = ",";
  // array modifiers don't have their own node type, but we can collect the
  // from the original text
  if (node.begin_l && node.end_l) {
    brackets = [
      options.originalText.substring(node.begin_l.begin, node.begin_l.end),
      options.originalText.substring(node.end_l.begin, node.end_l.end),
    ];
  }
  // a string/symbol inside of %w, %i and the like should know they do not need
  // to quote themselves or prefix with ":"
  if (brackets[0].match(/^%i/i)) {
    delimiter = "";
    parentsWithImplicitSymbolChildren.set(node, node);
    parentsWithImplicitStringChildren.set(node, node);
  }
  if (brackets[0].match(/^%w/i)) {
    delimiter = "";
    parentsWithImplicitStringChildren.set(node, node);
  }

  return b.group(
    [
      brackets[0],
      b.indent([
        b.softline,
        b.join([delimiter, b.line], path.map(print, "elements")),
      ]),
      b.softline,
      brackets[1],
    ],
    { shouldBreak: primitiveShouldBreak(path, options) }
  );
};

export default printArray;
