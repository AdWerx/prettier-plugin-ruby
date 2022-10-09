import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter, withImplicitSymbolChildren } from "../";
const { builders: b } = doc;

const printAlias: NodePrinter<nodes.Alias> = (path, options, print) => {
  return withImplicitSymbolChildren(options, { node: path.getValue() }, () =>
    b.group([
      "alias",
      b.indent([
        b.line,
        path.call(print, "to"),
        b.line,
        path.call(print, "from"),
      ]),
    ])
  );
};

export default printAlias;
