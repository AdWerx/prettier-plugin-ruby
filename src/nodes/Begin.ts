import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printBegin: NodePrinter<nodes.Begin> = (path, options, print) => {
  return b.join(b.hardline, path.map(print, "statements"));
};

export default printBegin;
