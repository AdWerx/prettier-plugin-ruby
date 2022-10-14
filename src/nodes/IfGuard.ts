import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printIfGuard: NodePrinter<nodes.IfGuard> = (path, options, print) => {
  return b.group(["if ", path.call(print, "cond")]);
};

export default printIfGuard;
