// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printIndex: NodePrinter<nodes.Index> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-Index-`);
  return `❗️Index`;
}

export default printIndex;
