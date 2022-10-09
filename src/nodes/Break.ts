import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printBreak: NodePrinter<nodes.Break> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-Break-`);
  path.map(print, "args");
  return `❗️Break`;
};

export default printBreak;
