// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printIfMod: NodePrinter<nodes.IfMod> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-IfMod-`);
  return `❗️IfMod`;
}

export default printIfMod;
