import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printAlias: NodePrinter<nodes.Alias> = (path, options, print) => {
  const node = path.getValue();

  path.call(print, "to");
  path.call(print, "from");
  console.log("-Alias-");
  return b.group(["alias "]);
};

export default printAlias;
