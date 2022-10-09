// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printRational: NodePrinter<nodes.Rational> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-Rational-`);
  return `❗️Rational`;
}

export default printRational;
