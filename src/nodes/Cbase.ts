import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printCbase: NodePrinter<nodes.Cbase> = (path, options, print) => {
  return "";
};

export default printCbase;
