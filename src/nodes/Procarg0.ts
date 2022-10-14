import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printProcarg0: NodePrinter<nodes.Procarg0> = (path, options, print) => {
  const node = path.getValue();
  if (!node.args.length) return "";

  return [b.join([",", b.line], path.map(print, "args"))];
};

export default printProcarg0;