// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printMatchWithLvasgn: NodePrinter<nodes.MatchWithLvasgn> = (
  path,
  options,
  print
) => {
  const node = path.getValue();
  console.log(`-MatchWithLvasgn-`);
  return `❗️MatchWithLvasgn`;
};

export default printMatchWithLvasgn;