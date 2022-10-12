import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printFile: NodePrinter<nodes.File> = (path, options, print) => {
  return "__FILE__";
};

export default printFile;
