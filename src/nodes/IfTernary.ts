import { nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
import printIf, { makePrintIf } from "./If";
const { builders: b } = doc;

const printIfMultiline = makePrintIf(b.line);

const printIfTernary: NodePrinter<nodes.IfTernary> = (path, options, print) => {
  const node = path.getValue();
  const tbody = path.call(print, "if_true");
  const fbody = path.call(print, "if_false");
  return b.group([
    b.ifBreak(printIfMultiline(path, options, print), [
      path.call(print, "cond"),
      " ? ",
      tbody,
      " : ",
      fbody,
    ]),
  ]);
};

export default printIfTernary;
