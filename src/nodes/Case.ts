import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printCase: NodePrinter<nodes.Case> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-Case-`);
  path.call(print, "expr");
  path.map(print, "when_bodies");
  path.call(print, "else_body");
  return `❗️Case`;
};

export default printCase;
