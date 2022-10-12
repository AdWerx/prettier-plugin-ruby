// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printPostexe: NodePrinter<nodes.Postexe> = (path, options, print) => {
  return b.group([
    "END ",
    "{",
    b.indent([b.line, path.call(print, "body")]),
    b.line,
    "}",
  ]);
};

export default printPostexe;
