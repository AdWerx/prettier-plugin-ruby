import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printBlock: NodePrinter<nodes.Block> = (path, options, print) => {
  const node = path.getValue();
  path.call(print, "call");
  path.call(print, "args");
  path.call(print, "body");
  console.log(`-Block-`);
  return `❗️Block`;
};

export default printBlock;
