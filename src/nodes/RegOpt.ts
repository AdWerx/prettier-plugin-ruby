// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printRegOpt: NodePrinter<nodes.RegOpt> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-RegOpt-`);
  return `❗️RegOpt`;
}

export default printRegOpt;
