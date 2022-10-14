import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
import printLvasgn from "./Lvasgn";
const { builders: b } = doc;

const printCvasgn: NodePrinter<nodes.Cvasgn> = (...args) => {
  return printLvasgn(...args);
};

export default printCvasgn;
