// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printMasgn: NodePrinter<nodes.Masgn> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-Masgn-`);
  return `❗️Masgn`;
}

export default printMasgn;
