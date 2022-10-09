import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printCasgn: NodePrinter<nodes.Casgn> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-Casgn-`);
  path.call(print, "scope");
  path.call(print, "value");
  return `❗️Casgn`;
};

export default printCasgn;
