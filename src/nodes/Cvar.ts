// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printCvar: NodePrinter<nodes.Cvar> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-Cvar-`);
  return `❗️Cvar`;
}

export default printCvar;
