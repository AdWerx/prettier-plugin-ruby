// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printSend: NodePrinter<nodes.Send> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-Send-`);
  return `❗️Send`;
}

export default printSend;
