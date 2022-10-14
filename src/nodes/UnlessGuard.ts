import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printUnlessGuard: NodePrinter<nodes.UnlessGuard> = (
  path,
  options,
  print
) => {
  return b.group(["unless ", path.call(print, "cond")]);
};

export default printUnlessGuard;
