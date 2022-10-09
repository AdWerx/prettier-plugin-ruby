// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printDefs: NodePrinter<nodes.Defs> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-Defs-`);
  return `❗️Defs`;
}

export default printDefs;
