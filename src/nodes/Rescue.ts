import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printRescue: NodePrinter<nodes.Rescue> = (path, options, print) => {
  const node = path.getValue();
  return [
    path.call(print, "body"),
    path.map(print, "rescue_bodies"),
    node.else_l
      ? [b.dedent([b.hardline, "else"]), b.hardline, path.call(print, "else_")]
      : "",
  ];
};

export default printRescue;
