import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printMlhs: NodePrinter<nodes.Mlhs> = (path, options, print) => {
  return [
    "(",
    b.indent([b.softline, b.join([",", b.line], path.map(print, "items"))]),
    b.softline,
    ")",
  ];
};

export default printMlhs;
