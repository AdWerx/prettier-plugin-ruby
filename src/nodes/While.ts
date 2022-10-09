// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printWhile: NodePrinter<nodes.While> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-While-`);
  return `❗️While`;
}

export default printWhile;
