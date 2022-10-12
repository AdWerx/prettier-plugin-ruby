import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
import printLvasgn from "./Lvasgn";
const { builders: b } = doc;

const printGvasgn: NodePrinter<nodes.Gvasgn> = (...args) => {
  return printLvasgn(...args);
};

export default printGvasgn;
