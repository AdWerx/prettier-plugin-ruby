// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printInPattern: NodePrinter<nodes.InPattern> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-InPattern-`);
  return `❗️InPattern`;
}

export default printInPattern;
