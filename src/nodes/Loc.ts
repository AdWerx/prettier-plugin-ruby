import { Loc } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { NodePrinter } from "../printer";
import { sourceFromLocation } from "../diagnostics";

const printLoc: NodePrinter<Loc> = (path, options, print) => {
  const node = path.getValue();
  const name = path.getName();
  const text = sourceFromLocation(options, node);
  if (name === "dot_l" && text === "::") {
    return ".";
  }
  return text;
};

export default printLoc;
