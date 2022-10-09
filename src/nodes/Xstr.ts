// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printXstr: NodePrinter<nodes.Xstr> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-Xstr-`);
  return `❗️Xstr`;
}

export default printXstr;
