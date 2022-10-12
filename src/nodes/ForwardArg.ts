import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printForwardArg: NodePrinter<nodes.ForwardArg> = (
  path,
  options,
  print
) => {
  return "...";
};

export default printForwardArg;
