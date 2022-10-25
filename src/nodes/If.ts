import { Loc, Node, nodes } from "lib-ruby-parser";
import { Doc, doc } from "prettier";
import { sourceFromLocation } from "../diagnostics";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

export interface GenericIf {
  cond: Node;
  if_true: Node | null;
  if_false: Node | null;
  keyword_l?: Loc;
}

export const makePrintIf: (line: Doc) => NodePrinter<GenericIf> =
  (line) => (path, options, print) => {
    const node = path.getValue();
    const parts: Doc[] = [];
    let keyword = "";
    if (node.keyword_l) {
      keyword = sourceFromLocation(options, node.keyword_l);
    } else {
      // a ternary that's converted to multiline if may end up here
      keyword = "if";
    }
    parts.push(
      b.group([
        keyword,
        " ",
        path.call(print, "cond"),
        b.ifBreak([b.line, "then"]),
      ])
    );

    let primaryBody: Doc = "";
    let primaryNode: Node | null = null;
    let secondaryBody: Doc = "";
    let secondaryNode: Node | null = null;
    if (keyword.endsWith("if")) {
      primaryBody = path.call(print, "if_true");
      primaryNode = node.if_true;
      secondaryBody = path.call(print, "if_false");
      secondaryNode = node.if_false;
    } else {
      primaryBody = path.call(print, "if_false");
      primaryNode = node.if_false;
      secondaryBody = path.call(print, "if_true");
      secondaryNode = node.if_true;
    }
    if (primaryNode) {
      parts.push(b.indent([line, primaryBody]));
    }
    if (secondaryNode) {
      parts.push(
        secondaryNode instanceof nodes.If
          ? [line, secondaryBody]
          : [b.line, "else", b.indent([b.line, secondaryBody])]
      );
    }
    if (keyword == "if" || keyword == "unless") {
      // only add an "end" if we're the outermost if/unless
      parts.push(line, "end");
    }
    return parts;
  };

export default makePrintIf(b.hardline);
