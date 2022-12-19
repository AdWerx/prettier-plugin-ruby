import { nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { doc } from "prettier";
import { sourceFromLocation } from "../diagnostics";
import { parentsWithImplicitStringChildren } from "../printer";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

const printRegexp: NodePrinter<nodes.Regexp> = (path, options, print) => {
  const node = path.getValue();
  const [beg, end] = [
    sourceFromLocation(options, node.begin_l),
    sourceFromLocation(options, node.end_l),
  ];
  parentsWithImplicitStringChildren.set(node, node);
  return [beg, path.map(print, "parts"), end, path.call(print, "options")];
};

export default printRegexp;
