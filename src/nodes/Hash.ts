import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printHash: NodePrinter<nodes.Hash> = (path, options, print) => {
  const node = path.getValue();
  return b.group(["{ ", b.join([",", b.line], path.map(print, "pairs")), " }"]);
};

export default printHash;
