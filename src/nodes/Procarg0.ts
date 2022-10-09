// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printProcarg0: NodePrinter<nodes.Procarg0> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-Procarg0-`);
  return `❗️Procarg0`;
}

export default printProcarg0;
