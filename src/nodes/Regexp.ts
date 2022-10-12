import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter, parentsWithImplicitStringChildren } from "../";
const { builders: b } = doc;

const printRegexp: NodePrinter<nodes.Regexp> = (path, options, print) => {
  const node = path.getValue();
  parentsWithImplicitStringChildren.set(node, node);
  return ["/", path.map(print, "parts"), "/", path.call(print, "options")];
};

export default printRegexp;
