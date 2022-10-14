import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printZSuper: NodePrinter<nodes.ZSuper> = (path, options, print) => {
  return "super";
};

export default printZSuper;
