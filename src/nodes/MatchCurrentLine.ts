// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printMatchCurrentLine: NodePrinter<nodes.MatchCurrentLine> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-MatchCurrentLine-`);
  return `❗️MatchCurrentLine`;
}

export default printMatchCurrentLine;
