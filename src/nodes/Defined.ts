// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printDefined: NodePrinter<nodes.Defined> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-Defined-`);
  return `❗️Defined`;
}

export default printDefined;
