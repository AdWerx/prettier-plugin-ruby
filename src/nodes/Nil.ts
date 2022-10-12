// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printNil: NodePrinter<nodes.Nil> = (path, options, print) => {
  return "nil";
};

export default printNil;
