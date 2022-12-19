import { nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

const printOrAsgn: NodePrinter<nodes.OrAsgn> = (path, options, print) => {
  return b.group([
    path.call(print, "recv"),
    " ||= ",
    path.call(print, "value"),
  ]);
};

export default printOrAsgn;
