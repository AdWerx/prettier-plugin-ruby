import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printBlockPass: NodePrinter<nodes.BlockPass> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-BlockPass-`);
  path.call(print, "value");
  return `❗️BlockPass`;
};

export default printBlockPass;
