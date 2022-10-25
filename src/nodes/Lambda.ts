import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
import { sourceFromLocation } from "../diagnostics";
const { builders: b } = doc;

const printLambda: NodePrinter<nodes.Lambda> = (path, options, print) => {
  const node = path.getValue();
  return "->";
};

export default printLambda;
