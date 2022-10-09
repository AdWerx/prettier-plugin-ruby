// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printEFlipFlop: NodePrinter<nodes.EFlipFlop> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-EFlipFlop-`);
  return `❗️EFlipFlop`;
}

export default printEFlipFlop;
