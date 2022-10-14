import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printKwBegin: NodePrinter<nodes.KwBegin> = (path, options, print) => {
  const node = path.getValue();
  return [
    "begin",
    node.statements.length
      ? b.indent([
          b.hardline,
          b.join(b.hardline, path.map(print, "statements")),
        ])
      : "",
    b.hardline,
    "end",
  ];
};

export default printKwBegin;
