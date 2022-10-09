// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printHash: NodePrinter<nodes.Hash> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-Hash-`);
  return `❗️Hash`;
}

export default printHash;
