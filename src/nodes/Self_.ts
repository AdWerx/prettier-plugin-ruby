// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printSelf_: NodePrinter<nodes.Self_> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-Self_-`);
  return `❗️Self_`;
}

export default printSelf_;
