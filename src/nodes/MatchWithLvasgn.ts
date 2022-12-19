// gen:mayoverwrite
import { nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
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
