// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printIf: NodePrinter<nodes.If> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-If-`);
  return `❗️If`;
}

export default printIf;
