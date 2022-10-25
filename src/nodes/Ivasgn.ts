import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
import printLvasgn from "./Lvasgn";
const { builders: b } = doc;

const printIvasgn: NodePrinter<nodes.Ivasgn> = (...args) => {
  return printLvasgn(...args);
};

export default printIvasgn;
