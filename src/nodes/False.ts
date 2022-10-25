// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

const printFalse: NodePrinter<nodes.False> = (path, options, print) => {
  return "false";
};

export default printFalse;
