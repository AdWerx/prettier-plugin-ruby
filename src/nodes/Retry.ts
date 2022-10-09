// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printRetry: NodePrinter<nodes.Retry> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-Retry-`);
  return `❗️Retry`;
}

export default printRetry;
