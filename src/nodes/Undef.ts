import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printUndef: NodePrinter<nodes.Undef> = (path, options, print) => {
  const node = path.getValue();
  return b.group([
    "undef ",
    b.indent(b.join([",", b.line], path.map(print, "names"))),
  ]);
};

export default printUndef;