import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
import printLvasgn from "./Lvasgn";
const { builders: b } = doc;

const printCasgn: NodePrinter<nodes.Casgn> = (...args) => {
  return printLvasgn(...args);
};

export default printCasgn;
