import { nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

const printArgs: NodePrinter<nodes.Args> = (path, options, print) => {
  const node = path.getValue();
  const parent = path.getParentNode();
  let wrappers: [string, string] = ["(", ")"];
  // prefer not to break pipe-enclosed args (inside a block / lambda)
  if (
    node.args[0] instanceof nodes.Procarg0 ||
    node.args[0] instanceof nodes.Shadowarg ||
    (parent instanceof nodes.Block && !(parent.call instanceof nodes.Lambda))
  ) {
    return ["|", b.join(", ", path.map(print, "args")), "|"];
  }
  if (!node.args.length) {
    return "";
  }
  return b.group([
    wrappers[0],
    b.indent([b.softline, b.join([",", b.line], path.map(print, "args"))]),
    b.softline,
    wrappers[1],
  ]);
};

export default printArgs;
