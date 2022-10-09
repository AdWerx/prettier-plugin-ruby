import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printCbase: NodePrinter<nodes.Cbase> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-Cbase-`);

  return `❗️Cbase`;
};

export default printCbase;
