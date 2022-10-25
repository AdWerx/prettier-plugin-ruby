import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

const printRedo: NodePrinter<nodes.Redo> = (path, options, print) => {
  return "redo";
};

export default printRedo;
