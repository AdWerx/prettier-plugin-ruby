// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printLine: NodePrinter<nodes.Line> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-Line-`);
  return `❗️Line`;
}

export default printLine;
