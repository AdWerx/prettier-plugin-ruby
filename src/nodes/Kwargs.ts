import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printKwargs: NodePrinter<nodes.Kwargs> = (path, options, print) => {
  const node = path.getValue();
  return path.map(print, "pairs");
};

export default printKwargs;
