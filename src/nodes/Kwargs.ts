import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
import { sourceFromLocation } from "../diagnostics";
const { builders: b } = doc;

const printKwargs: NodePrinter<nodes.Kwargs> = (path, options, print) => {
  const node = path.getValue();
  const forceBreak = sourceFromLocation(options, node.expression_l).includes(
    "\n"
  );
  return [
    b.join([",", forceBreak ? b.hardline : b.line], path.map(print, "pairs")),
  ];
};

export default printKwargs;
