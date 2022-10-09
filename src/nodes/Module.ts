// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printModule: NodePrinter<nodes.Module> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-Module-`);
  return `❗️Module`;
}

export default printModule;
