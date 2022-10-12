import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printEnsure: NodePrinter<nodes.Ensure> = (path, options, print) => {
  console.log(path.getValue());
  return [
    path.call(print, "body"),
    b.dedent([b.hardline, "ensure"]),
    b.hardline,
    path.call(print, "ensure"),
  ];
};

export default printEnsure;
