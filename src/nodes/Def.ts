// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printDef: NodePrinter<nodes.Def> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-Def-`);
  return `❗️Def`;
}

export default printDef;
