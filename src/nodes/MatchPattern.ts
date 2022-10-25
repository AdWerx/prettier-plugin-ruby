// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

const printMatchPattern: NodePrinter<nodes.MatchPattern> = (
  path,
  options,
  print
) => {
  const node = path.getValue();
  return b.group([
    path.call(print, "value"),
    " => ",
    path.call(print, "pattern"),
  ]);
};

export default printMatchPattern;
