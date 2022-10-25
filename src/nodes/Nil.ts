// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

const printNil: NodePrinter<nodes.Nil> = (path, options, print) => {
  return "nil";
};

export default printNil;
