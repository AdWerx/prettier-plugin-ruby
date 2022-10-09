// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printShadowarg: NodePrinter<nodes.Shadowarg> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-Shadowarg-`);
  return `❗️Shadowarg`;
}

export default printShadowarg;
