import { nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { Doc, doc } from "prettier";
import { NodePrinter } from "../printer";
import { assignmentRhsShouldBreak } from "../queries";
const { builders: b } = doc;

const printLvasgn: NodePrinter<nodes.Lvasgn> = (path, options, print) => {
  const node = path.getValue();
  const parent = path.getParentNode();
  let operator: Doc = " =";
  if (!node.operator_l) {
    operator = "";
  }
  // will not have a value if its part of an OpAsgn or Mlhs
  const value = path.call(print, "value");
  let valueDoc: Doc;
  if (assignmentRhsShouldBreak(value, path, options)) {
    valueDoc = node.value ? [" ", value] : "";
  } else {
    valueDoc = node.value ? b.indent([b.line, value]) : "";
  }
  return b.group([node.name, operator, valueDoc]);
};

export default printLvasgn;
