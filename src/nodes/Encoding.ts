import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printEncoding: NodePrinter<nodes.Encoding> = (path, options, print) => {
  return "__ENCODING__";
};

export default printEncoding;
