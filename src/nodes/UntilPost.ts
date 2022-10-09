// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printUntilPost: NodePrinter<nodes.UntilPost> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-UntilPost-`);
  return `❗️UntilPost`;
}

export default printUntilPost;
