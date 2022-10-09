// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printUnlessGuard: NodePrinter<nodes.UnlessGuard> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-UnlessGuard-`);
  return `❗️UnlessGuard`;
}

export default printUnlessGuard;
