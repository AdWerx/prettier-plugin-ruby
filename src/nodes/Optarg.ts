// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printOptarg: NodePrinter<nodes.Optarg> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-Optarg-`);
  return `❗️Optarg`;
}

export default printOptarg;
