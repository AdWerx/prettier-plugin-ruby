// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printMatchPattern: NodePrinter<nodes.MatchPattern> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-MatchPattern-`);
  return `❗️MatchPattern`;
}

export default printMatchPattern;
