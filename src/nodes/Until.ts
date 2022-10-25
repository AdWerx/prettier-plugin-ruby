import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

const printUntil: NodePrinter<nodes.Until> = (path, options, print) => {
  return b.group([
    "until ",
    path.call(print, "cond"),
    b.ifBreak(" do", " {"),
    b.indent([b.line, path.call(print, "body")]),
    b.hardline, // disallow oneline while for now
    b.ifBreak("end", "}"),
  ]);
};

export default printUntil;
