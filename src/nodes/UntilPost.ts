import { nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

const printUntilPost: NodePrinter<nodes.UntilPost> = (path, options, print) => {
  return [path.call(print, "body"), " until ", path.call(print, "cond")];
};

export default printUntilPost;
