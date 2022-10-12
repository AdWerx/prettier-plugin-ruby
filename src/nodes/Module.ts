import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printModule: NodePrinter<nodes.Module> = (path, options, print) => {
  const node = path.getValue();
  return b.group([
    "module ",
    path.call(print, "name"),
    node.body ? b.indent([b.hardline, path.call(print, "body")]) : ";",
    b.line,
    "end",
  ]);
};

export default printModule;
