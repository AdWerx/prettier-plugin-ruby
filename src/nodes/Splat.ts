import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printSplat: NodePrinter<nodes.Splat> = (path, options, print) => {
  return ["*", path.call(print, "value")];
};

export default printSplat;
