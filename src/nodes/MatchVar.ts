import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

const printMatchVar: NodePrinter<nodes.MatchVar> = (path, options, print) => {
  const node = path.getValue();
  return node.name;
};

export default printMatchVar;
