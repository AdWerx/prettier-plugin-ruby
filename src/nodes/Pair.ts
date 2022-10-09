// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printPair: NodePrinter<nodes.Pair> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-Pair-`);
  return `❗️Pair`;
}

export default printPair;
