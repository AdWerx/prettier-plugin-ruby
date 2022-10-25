import { nodes } from "lib-ruby-parser";
import { Doc, doc } from "prettier";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

const printLvasgn: NodePrinter<nodes.Lvasgn> = (path, options, print) => {
  const node = path.getValue();
  const parent = path.getParentNode();
  let assignOperator: Doc = [" ", "="];
  if (!node.operator_l) {
    assignOperator = "";
  }

  const value = path.call(print, "value");
  let valueDoc: Doc;
  // if (node.value instanceof nodes.If) {
  //   valueDoc = b.indent([b.line, value]);
  // } else {
  //   valueDoc = [" ", value];
  // }
  return b.group([
    node.name,
    assignOperator,
    // will not have a value if its part of an OpAsgn or Mlhs
    node.value ? [" ", value] : "",
  ]);
};

export default printLvasgn;
