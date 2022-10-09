// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printMatchAlt: NodePrinter<nodes.MatchAlt> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-MatchAlt-`);
  return `❗️MatchAlt`;
}

export default printMatchAlt;
