import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printMatchCurrentLine: NodePrinter<nodes.MatchCurrentLine> = (
  path,
  options,
  print
) => {
  return path.call(print, "re");
};

export default printMatchCurrentLine;
