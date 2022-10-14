import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printMatchRest: NodePrinter<nodes.MatchRest> = (path, options, print) => {
  return ["*", path.call(print, "name")];
};

export default printMatchRest;
