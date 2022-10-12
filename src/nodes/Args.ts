import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printArgs: NodePrinter<nodes.Args> = (path, options, print) => {
  const node = path.getValue();
  return b.group([
    "(",
    b.indent([b.softline, b.join([",", b.line], path.map(print, "args"))]),
    b.softline,
    ")",
  ]);
};

export default printArgs;
