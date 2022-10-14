import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printMatchNilPattern: NodePrinter<nodes.MatchNilPattern> = (
  path,
  options,
  print
) => {
  return "**nil";
};

export default printMatchNilPattern;
