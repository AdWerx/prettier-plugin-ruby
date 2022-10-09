// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printLambda: NodePrinter<nodes.Lambda> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-Lambda-`);
  return `❗️Lambda`;
}

export default printLambda;
