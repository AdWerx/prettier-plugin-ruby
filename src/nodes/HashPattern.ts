// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printHashPattern: NodePrinter<nodes.HashPattern> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-HashPattern-`);
  return `❗️HashPattern`;
}

export default printHashPattern;
