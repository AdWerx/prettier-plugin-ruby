// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printRescue: NodePrinter<nodes.Rescue> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-Rescue-`);
  return `❗️Rescue`;
}

export default printRescue;
