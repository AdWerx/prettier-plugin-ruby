import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import {
  NodePrinter,
  parentsWithImplicitStringChildren,
  parentsWithImplicitSymbolChildren,
} from "../";
const { builders: b } = doc;

const printArray: NodePrinter<nodes.Array> = (path, options, print) => {
  const node = path.getValue();
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
  }
  if (brackets[0].match(/^%w/i)) {
    delimiter = "";
    parentsWithImplicitStringChildren.set(node, node);
  }

  return b.group([
    brackets[0],
    b.indent([
      b.softline,
      b.join([delimiter, b.line], path.map(print, "elements")),
    ]),
    b.softline,
    brackets[1],
  ]);
};

export default printArray;
