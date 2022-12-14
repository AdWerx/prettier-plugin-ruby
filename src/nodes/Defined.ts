import { nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { Doc, doc } from "prettier";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

const printDefined: NodePrinter<nodes.Defined> = (path, options, print) => {
  const node = path.getValue();
  let argWraps: [Doc, Doc];
  argWraps = node.begin_l ? ["(", ")"] : [b.line, ""];
  return b.group([
    "defined?",
    b.ifBreak("(", argWraps[0]),
    b.indent([b.softline, path.call(print, "value")]),
    b.softline,
    b.ifBreak(")", argWraps[1]),
  ]);
};

export default printDefined;
