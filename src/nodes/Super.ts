import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printSuper: NodePrinter<nodes.Super> = (path, options, print) => {
  const node = path.getValue();
  return b.group([
    "super",
    b.ifBreak("(", node.args.length ? " " : ""),
    b.indent([b.softline, b.join([",", b.line], path.map(print, "args"))]),
    b.softline,
    b.ifBreak(")", ""),
  ]);
};

export default printSuper;
