import { nodes } from "lib-ruby-parser";
import { Doc, doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printIf: NodePrinter<nodes.If> = (path, options, print) => {
  const node = path.getValue();
  const parts: Doc[] = [];
  const keyword = options.originalText.substring(
    node.keyword_l.begin,
    node.keyword_l.end
  );
  parts.push(keyword, " ");
  parts.push(b.group([path.call(print, "cond"), b.ifBreak([b.line, "then"])]));
  if (node.if_true) {
    parts.push(b.indent([b.hardline, path.call(print, "if_true")]));
  }
  if (node.else_l) {
    const if_false = [b.hardline, path.call(print, "if_false")];
    parts.push([
      node.if_false instanceof nodes.If
        ? if_false
        : [b.hardline, "else ", b.indent(if_false)],
    ]);
  }
  // only add an "end" if we're the outermost if
  if (keyword == "if") parts.push(b.hardline, "end");
  return parts;
};

export default printIf;
