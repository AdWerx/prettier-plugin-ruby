// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printWhen: NodePrinter<nodes.When> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-When-`);
  return `❗️When`;
}

export default printWhen;
