import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printBreak: NodePrinter<nodes.Break> = (path, options, print) => {
  const node = path.getValue();
  return b.group([
    "break",
    node.args.length ? " " : "",
    b.join([",", b.line], path.map(print, "args")),
  ]);
};

export default printBreak;
