// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printIfTernary: NodePrinter<nodes.IfTernary> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-IfTernary-`);
  return `❗️IfTernary`;
}

export default printIfTernary;
