// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printNumblock: NodePrinter<nodes.Numblock> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-Numblock-`);
  return `❗️Numblock`;
}

export default printNumblock;
