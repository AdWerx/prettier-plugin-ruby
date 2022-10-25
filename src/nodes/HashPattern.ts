import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

const printHashPattern: NodePrinter<nodes.HashPattern> = (
  path,
  options,
  print
) => {
  const node = path.getValue();
  if (node.elements[0] instanceof nodes.MatchNilPattern) {
    return b.group(path.map(print, "elements"));
  } else {
    return b.group(["{", " ", path.map(print, "elements"), " ", "}"]);
  }
};

export default printHashPattern;
