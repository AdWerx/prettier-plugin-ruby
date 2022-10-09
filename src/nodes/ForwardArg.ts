// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printForwardArg: NodePrinter<nodes.ForwardArg> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-ForwardArg-`);
  return `❗️ForwardArg`;
}

export default printForwardArg;
