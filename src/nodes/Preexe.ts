// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printPreexe: NodePrinter<nodes.Preexe> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-Preexe-`);
  return `❗️Preexe`;
}

export default printPreexe;
