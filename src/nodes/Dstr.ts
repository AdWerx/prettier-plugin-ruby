import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter, parentsWithImplicitStringChildren } from "../";
const { builders: b } = doc;

const printDstr: NodePrinter<nodes.Dstr> = (path, options, print) => {
  const node = path.getValue();
  const parent = path.getParentNode();
  let quote = options.singleQuote ? "'" : '"';
  parentsWithImplicitStringChildren.set(node, node);

  if (parent && parentsWithImplicitStringChildren.has(parent)) {
    return path.map(print, "parts");
  } else {
    return ['"', path.map(print, "parts"), '"'];
  }
};

export default printDstr;
