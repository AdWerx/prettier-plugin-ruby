// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printMlhs: NodePrinter<nodes.Mlhs> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-Mlhs-`);
  return `❗️Mlhs`;
}

export default printMlhs;
