// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printFalse: NodePrinter<nodes.False> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-False-`);
  return `❗️False`;
}

export default printFalse;
