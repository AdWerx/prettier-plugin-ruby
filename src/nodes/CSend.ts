import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printCSend: NodePrinter<nodes.CSend> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-CSend-`);
  path.call(print, "recv");
  path.map(print, "args");
  return `❗️CSend`;
};

export default printCSend;
