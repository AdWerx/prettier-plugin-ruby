import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printKwsplat: NodePrinter<nodes.Kwsplat> = (path, options, print) => {
  return ["**", path.call(print, "value")];
};

export default printKwsplat;
