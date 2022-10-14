import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printNthRef: NodePrinter<nodes.NthRef> = (path, options, print) => {
  const node = path.getValue();
  return ["$", node.name];
};

export default printNthRef;