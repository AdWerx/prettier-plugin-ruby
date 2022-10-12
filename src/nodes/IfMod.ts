import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printIfMod: NodePrinter<nodes.IfMod> = (path, options, print) => {
  const node = path.getValue();
  const cond = path.call(print, "cond");
  const body = node.if_true
    ? path.call(print, "if_true")
    : path.call(print, "if_false");
  const ifUnless = node.if_true ? "if" : "unless";
  return b.group([
    b.ifBreak(
      [ifUnless, " ", cond, b.indent([b.line, body]), b.line, "end"],
      [body, " ", ifUnless, " ", cond]
    ),
  ]);
};

export default printIfMod;
