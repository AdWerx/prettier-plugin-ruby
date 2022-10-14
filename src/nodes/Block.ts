import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printBlock: NodePrinter<nodes.Block> = (path, options, print) => {
  const node = path.getValue();

  return b.group([
    path.call(print, "call"),
    " ",
    b.ifBreak("do", "{"),
    node.args && (node.args as nodes.Args).args.length
      ? [" ", path.call(print, "args")]
      : "",
    node.body ? [b.indent([b.line, path.call(print, "body")]), b.line] : "",
    b.ifBreak("end", "}"),
  ]);
};

export default printBlock;
