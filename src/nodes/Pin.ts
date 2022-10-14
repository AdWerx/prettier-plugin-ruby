import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printPin: NodePrinter<nodes.Pin> = (path, options, print) => {
  const node = path.getValue();
  return ["^", path.call(print, "var_")];
};

export default printPin;
