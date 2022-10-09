// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printNil: NodePrinter<nodes.Nil> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-Nil-`);
  return `❗️Nil`;
}

export default printNil;
