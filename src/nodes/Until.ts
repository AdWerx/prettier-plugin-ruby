// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printUntil: NodePrinter<nodes.Until> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-Until-`);
  return `❗️Until`;
}

export default printUntil;
