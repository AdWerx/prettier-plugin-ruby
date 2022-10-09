import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printAnd: NodePrinter<nodes.And> = (path, options, print) => {
  const node = path.getValue();

  path.call(print, "lhs");
  path.call(print, "rhs");
  console.log("-And-");
  return `❗️And`;
};

export default printAnd;
