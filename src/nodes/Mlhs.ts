import { nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { doc } from "prettier";
import { sourceFromLocation } from "../diagnostics";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

const printMlhs: NodePrinter<nodes.Mlhs> = (path, options, print) => {
  const node = path.getValue();
  return b.group([
    b.ifBreak("(", path.call(print, "begin_l")),
    b.indent([b.softline, b.join([",", b.line], path.map(print, "items"))]),
    b.softline,
    b.ifBreak(")", path.call(print, "end_l")),
  ]);
};

export default printMlhs;
