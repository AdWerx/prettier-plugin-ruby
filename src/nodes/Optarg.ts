import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter, sourceFromLocation } from "../";
const { builders: b } = doc;

const printOptarg: NodePrinter<nodes.Optarg> = (path, options, print) => {
  const node = path.getValue();
  return b.group([
    node.name,
    " ",
    sourceFromLocation(options, node.operator_l),
    " ",
    path.call(print, "default_"),
  ]);
};

export default printOptarg;
