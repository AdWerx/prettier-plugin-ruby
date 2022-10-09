// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printKwsplat: NodePrinter<nodes.Kwsplat> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-Kwsplat-`);
  return `❗️Kwsplat`;
}

export default printKwsplat;
