import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printCaseMatch: NodePrinter<nodes.CaseMatch> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-CaseMatch-`);
  path.call(print, "expr");
  path.map(print, "in_bodies");
  path.call(print, "else_body");
  return `❗️CaseMatch`;
};

export default printCaseMatch;
