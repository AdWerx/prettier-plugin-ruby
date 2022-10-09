// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printKwarg: NodePrinter<nodes.Kwarg> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-Kwarg-`);
  return `❗️Kwarg`;
}

export default printKwarg;
