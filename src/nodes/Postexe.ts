// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printPostexe: NodePrinter<nodes.Postexe> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-Postexe-`);
  return `❗️Postexe`;
}

export default printPostexe;
