// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printSClass: NodePrinter<nodes.SClass> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-SClass-`);
  return `❗️SClass`;
}

export default printSClass;
