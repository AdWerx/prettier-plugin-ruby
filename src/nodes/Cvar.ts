import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

const printCvar: NodePrinter<nodes.Cvar> = (path, options, print) => {
  const node = path.getValue();
  return node.name;
};

export default printCvar;
