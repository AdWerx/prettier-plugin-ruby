import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
import printIf, { makePrintIf } from "./If";
const { builders: b } = doc;

const printIfModIntoIf = makePrintIf(b.line);

const printIfMod: NodePrinter<nodes.IfMod> = (path, options, print) => {
  const node = path.getValue();
  const cond = path.call(print, "cond");
  const body = node.if_true
    ? path.call(print, "if_true")
    : path.call(print, "if_false");
  const ifUnless = node.if_true ? "if" : "unless";
  return b.group([
    b.ifBreak(
      [printIfModIntoIf(path, options, print)],
      [body, " ", ifUnless, " ", cond]
    ),
  ]);
};

export default printIfMod;
