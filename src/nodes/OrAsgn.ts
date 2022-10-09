// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printOrAsgn: NodePrinter<nodes.OrAsgn> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-OrAsgn-`);
  return `❗️OrAsgn`;
}

export default printOrAsgn;
