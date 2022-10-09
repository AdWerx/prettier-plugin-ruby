// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printDstr: NodePrinter<nodes.Dstr> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-Dstr-`);
  return `❗️Dstr`;
}

export default printDstr;
