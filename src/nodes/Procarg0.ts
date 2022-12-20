import { nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

const printProcarg0: NodePrinter<nodes.Procarg0> = (path, options, print) => {
  const node = path.getValue();
  if (!node.args.length) return "";

  return [
    path.call(print, "begin_l"),
    b.join([",", b.line], path.map(print, "args")),
    path.call(print, "end_l"),
  ];
};

export default printProcarg0;
