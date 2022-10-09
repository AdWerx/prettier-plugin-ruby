// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printMatchRest: NodePrinter<nodes.MatchRest> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-MatchRest-`);
  return `❗️MatchRest`;
}

export default printMatchRest;
