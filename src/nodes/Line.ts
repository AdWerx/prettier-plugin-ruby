import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printLine: NodePrinter<nodes.Line> = (path, options, print) => {
  return "__LINE__";
};

export default printLine;
