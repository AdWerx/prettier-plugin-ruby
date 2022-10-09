// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printWhilePost: NodePrinter<nodes.WhilePost> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-WhilePost-`);
  return `❗️WhilePost`;
}

export default printWhilePost;
