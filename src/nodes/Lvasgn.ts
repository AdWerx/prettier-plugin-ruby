import { nodes } from "lib-ruby-parser";
import { Doc, doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printLvasgn: NodePrinter<nodes.Lvasgn> = (path, options, print) => {
  const node = path.getValue();
  const parent = path.getParentNode();
  let assignOperator: Doc = [" ", "="];
  if (parent instanceof nodes.RescueBody || parent instanceof nodes.Mlhs) {
    assignOperator = "";
  } else if (parent instanceof nodes.OpAsgn) {
    assignOperator = [" ", parent.operator, "="];
  }
  return b.group([
    node.name,
    assignOperator,
    // will not have a value if its part of an OpAsgn or Mlhs
    node.value ? b.indent([b.line, path.call(print, "value")]) : "",
  ]);
};

export default printLvasgn;
