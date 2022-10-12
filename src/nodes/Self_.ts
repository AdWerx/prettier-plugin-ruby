import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printSelf_: NodePrinter<nodes.Self_> = (path, options, print) => {
  return "self";
};

export default printSelf_;
