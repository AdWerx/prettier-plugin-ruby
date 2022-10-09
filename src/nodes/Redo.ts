// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printRedo: NodePrinter<nodes.Redo> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-Redo-`);
  return `❗️Redo`;
}

export default printRedo;
