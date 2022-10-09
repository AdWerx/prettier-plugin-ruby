import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printArrayPatternWithTail: NodePrinter<nodes.ArrayPatternWithTail> = (
  path,
  options,
  print
) => {
  const node = path.getValue();
  path.map(print, "elements");
  console.log(`-ArrayPatternWithTail-`);
  return `❗️ArrayPatternWithTail`;
};

export default printArrayPatternWithTail;
