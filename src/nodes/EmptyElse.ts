import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printEmptyElse: NodePrinter<nodes.EmptyElse> = (path, options, print) => {
  const node = path.getValue();
  return "";
};

export default printEmptyElse;
