import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printPreexe: NodePrinter<nodes.Preexe> = (path, options, print) => {
  return b.group([
    "BEGIN ",
    "{",
    b.indent([b.line, path.call(print, "body")]),
    b.line,
    "}",
  ]);
};

export default printPreexe;
