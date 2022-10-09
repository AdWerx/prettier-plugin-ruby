import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printArgs: NodePrinter<nodes.Args> = (path, options, print) => {
  const node = path.getValue();

  path.map(print, "args");

  console.log("-Args-");
  return `❗️Args`;
};

export default printArgs;
