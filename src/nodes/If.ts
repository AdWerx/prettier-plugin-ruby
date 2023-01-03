import { Loc, Node, nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { Doc, doc } from "prettier";
import { sourceFromLocation } from "../diagnostics";
import { NodePrinter, NodeWithComments } from "../printer";
import { isIf } from "../queries";
const { builders: b } = doc;

export interface GenericIf {
  cond: Node;
  if_true: Node | null;
  if_false: Node | null;
  keyword_l?: Loc;
}

export const makePrintIf: (
  line: Doc
) => NodePrinter<GenericIf & NodeWithComments> =
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
    if (
      isIf(secondaryNode) &&
      sourceFromLocation(options, secondaryNode.keyword_l) === "elsif"
    ) {
      parts.push([line, secondaryBody]);
    } else if (secondaryNode) {
      parts.push([b.line, "else", b.indent([b.line, secondaryBody])]);
    }
    if (keyword == "if" || keyword == "unless") {
      // only add an "end" if we're the outermost if/unless
      parts.push(line, "end");
    }
    return parts;
  };

export default makePrintIf(b.hardline);
