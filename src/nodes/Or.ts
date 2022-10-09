// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printOr: NodePrinter<nodes.Or> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-Or-`);
  return `❗️Or`;
}

export default printOr;
