import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

const printWhile: NodePrinter<nodes.While> = (path, options, print) => {
  return b.group([
    "while ",
    path.call(print, "cond"),
    b.ifBreak(" do", " {"),
    b.indent([b.line, path.call(print, "body")]),
    b.hardline, // disallow oneline while for now
    b.ifBreak("end", "}"),
  ]);
};

export default printWhile;
