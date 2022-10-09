// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printErange: NodePrinter<nodes.Erange> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-Erange-`);
  return `❗️Erange`;
}

export default printErange;
