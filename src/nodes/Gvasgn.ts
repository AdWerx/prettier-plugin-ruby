// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printGvasgn: NodePrinter<nodes.Gvasgn> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-Gvasgn-`);
  return `❗️Gvasgn`;
}

export default printGvasgn;
