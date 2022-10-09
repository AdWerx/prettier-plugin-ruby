import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printAndAsgn: NodePrinter<nodes.AndAsgn> = (path, options, print) => {
  const node = path.getValue();

  path.call(print, "recv");
  path.call(print, "value");
  console.log("-AndAsgn-");
  return `❗️AndAsgn`;
};

export default printAndAsgn;
