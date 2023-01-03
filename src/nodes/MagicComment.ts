import { MagicComment } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { NodePrinter } from "../printer";

const printMagicComment: NodePrinter<MagicComment> = (path, options, print) => {
  return ["# ", path.call(print, "key_l"), ": ", path.call(print, "value_l")];
};

export default printMagicComment;
