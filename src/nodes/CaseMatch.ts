import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printCaseMatch: NodePrinter<nodes.CaseMatch> = (path, options, print) => {
  const node = path.getValue();
  return [
    "case ",
    path.call(print, "expr"),
    b.hardline,
    b.join(b.hardline, path.map(print, "in_bodies")),
    node.else_l
      ? [
          b.hardline,
          b.group(["else", b.indent([b.line, path.call(print, "else_body")])]),
        ]
      : "",
    b.hardline,
    "end",
  ];
};

export default printCaseMatch;