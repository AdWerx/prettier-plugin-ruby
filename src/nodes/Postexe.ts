// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

const printPostexe: NodePrinter<nodes.Postexe> = (path, options, print) => {
  const node = path.getValue();
  return b.group([
    "END ",
    "{",
    node.body ? [b.indent([b.line, path.call(print, "body")]), b.line] : "",
    "}",
  ]);
};

export default printPostexe;
