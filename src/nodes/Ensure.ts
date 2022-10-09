// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printEnsure: NodePrinter<nodes.Ensure> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-Ensure-`);
  return `❗️Ensure`;
}

export default printEnsure;
