import { nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
import printLvasgn from "./Lvasgn";
const { builders: b } = doc;

const printCasgn: NodePrinter<nodes.Casgn> = (path, options, print) => {
  const node = path.getValue();
  return b.group([
    node.scope ? [path.call(print, "scope"), "::"] : "",
    printLvasgn(path, options, print),
  ]);
};

export default printCasgn;
