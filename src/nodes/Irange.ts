import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printIrange: NodePrinter<nodes.Irange> = (path, options, print) => {
  const node = path.getValue();
  return [path.call(print, "left"), "..", path.call(print, "right")];
};

export default printIrange;
