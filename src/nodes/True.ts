// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printTrue: NodePrinter<nodes.True> = (path, options, print) => {
  return "true";
};

export default printTrue;
