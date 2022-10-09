// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printFile: NodePrinter<nodes.File> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-File-`);
  return `❗️File`;
}

export default printFile;
