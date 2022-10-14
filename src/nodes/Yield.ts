import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printYield: NodePrinter<nodes.Yield> = (path, options, print) => {
  const node = path.getValue();
  return b.group([
    "yield",
    node.args.length ? " " : "",
    b.join([",", b.line], path.map(print, "args")),
  ]);
};

export default printYield;
