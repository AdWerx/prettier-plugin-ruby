import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter, sourceFromLocation } from "../";
const { builders: b } = doc;

const printLambda: NodePrinter<nodes.Lambda> = (path, options, print) => {
  const node = path.getValue();
  return "->";
};

export default printLambda;
