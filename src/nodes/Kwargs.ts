// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printKwargs: NodePrinter<nodes.Kwargs> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-Kwargs-`);
  return `❗️Kwargs`;
}

export default printKwargs;
