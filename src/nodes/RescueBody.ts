// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printRescueBody: NodePrinter<nodes.RescueBody> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-RescueBody-`);
  return `❗️RescueBody`;
}

export default printRescueBody;
