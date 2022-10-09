// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printMatchVar: NodePrinter<nodes.MatchVar> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-MatchVar-`);
  return `❗️MatchVar`;
}

export default printMatchVar;
