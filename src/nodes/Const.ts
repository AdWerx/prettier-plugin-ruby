import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printConst: NodePrinter<nodes.Const> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-Const-`);
  path.call(print, "scope");

  return `❗️Const`;
};

export default printConst;
