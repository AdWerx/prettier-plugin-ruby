import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printKwnilarg: NodePrinter<nodes.Kwnilarg> = (path, options, print) => {
  return "**nil";
};

export default printKwnilarg;
