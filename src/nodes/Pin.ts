// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printPin: NodePrinter<nodes.Pin> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-Pin-`);
  return `❗️Pin`;
}

export default printPin;
