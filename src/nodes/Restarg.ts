// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printRestarg: NodePrinter<nodes.Restarg> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-Restarg-`);
  return `❗️Restarg`;
}

export default printRestarg;
