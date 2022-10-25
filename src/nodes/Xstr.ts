import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { sourceFromLocation } from "../diagnostics";
import { NodePrinter, parentsWithImplicitStringChildren } from "../printer";
const { builders: b } = doc;

const printXstr: NodePrinter<nodes.Xstr> = (path, options, print) => {
  const node = path.getValue();
  const tags = [
    sourceFromLocation(options, node.begin_l),
    sourceFromLocation(options, node.end_l),
  ];
  parentsWithImplicitStringChildren.set(node, node);
  return [tags[0], path.map(print, "parts"), tags[1]];
};

export default printXstr;
