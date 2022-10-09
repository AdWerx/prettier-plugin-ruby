// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printTrue: NodePrinter<nodes.True> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-True-`);
  return `❗️True`;
}

export default printTrue;
