import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { parentsWithImplicitStringChildren } from "../printer";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

const printDstr: NodePrinter<nodes.Dstr> = (path, options, print) => {
  const node = path.getValue();
  const parent = path.getParentNode();
  parentsWithImplicitStringChildren.set(node, node);

  if (parent && parentsWithImplicitStringChildren.has(parent)) {
    return path.map(print, "parts");
  } else {
    return ['"', path.map(print, "parts"), '"'];
  }
};

export default printDstr;
