// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printIfGuard: NodePrinter<nodes.IfGuard> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-IfGuard-`);
  return `❗️IfGuard`;
}

export default printIfGuard;
