// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printFor: NodePrinter<nodes.For> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-For-`);
  return `❗️For`;
}

export default printFor;
