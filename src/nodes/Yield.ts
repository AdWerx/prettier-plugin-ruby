// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printYield: NodePrinter<nodes.Yield> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-Yield-`);
  return `❗️Yield`;
}

export default printYield;
