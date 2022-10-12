import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printIfTernary: NodePrinter<nodes.IfTernary> = (path, options, print) => {
  const node = path.getValue();
  const tbody = path.call(print, "if_true");
  const fbody = path.call(print, "if_false");
  return b.group([
    b.ifBreak("if"),
    path.call(print, "cond"),
    b.line,
    b.ifBreak("", "?"),
    b.indent([b.line, tbody]),
    b.line,
    b.ifBreak("else", ":"),
    b.indent([b.line, fbody]),
  ]);
};

export default printIfTernary;
