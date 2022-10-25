import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

const printMatchAs: NodePrinter<nodes.MatchAs> = (path, options, print) => {
  const node = path.getValue();
  return b.group([path.call(print, "value"), " => ", path.call(print, "as")]);
};

export default printMatchAs;
