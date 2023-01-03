import { nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { Doc, doc, util } from "prettier";
import { sourceFromLocation } from "../diagnostics";
import { LocatedNode, PossiblyLocatedNode } from "../parser";
import { NodePrinter } from "../printer";
import {
  beginShouldBreak,
  isBreak,
  isHeredoc,
  isIfMod,
  isNext,
  isReturn,
  isXHeredoc,
} from "../queries";
const { builders: b } = doc;

const printBegin: NodePrinter<nodes.Begin> = (path, options, print) => {
  let openCloseTokens: [string, string] = ["", ""];
  const node = path.getValue();
  if (node.begin_l && node.end_l) {
    const openToken = sourceFromLocation(options, node.begin_l);
    const closeToken = sourceFromLocation(options, node.end_l);
    openCloseTokens = [openToken, closeToken];
  }
  let opportunityToBreak: Doc = "";

  // inside a string interpolation is a decent place to break up a string
  if (openCloseTokens[0] == "#{") {
    opportunityToBreak = b.softline;
  } else if (openCloseTokens[0] == "(") {
    opportunityToBreak = b.softline;
  }

  const statements = path.map((path, i, value) => {
    const snode = path.getValue() as LocatedNode;
    const nextNode = value[i + 1];
    let trailer: Doc[] = [];
    if (snode.expression_l && nextNode) {
      // regardless of whether expressions were joined with `;`,
      // we're going to join them with lines
      trailer.push(b.hardline);
      if (
        isIfMod(snode) &&
        (isReturn(snode.if_false) ||
          isReturn(snode.if_true) ||
          isNext(snode.if_false) ||
          isNext(snode.if_true) ||
          isBreak(snode.if_false) ||
          isBreak(snode.if_true))
      ) {
        // guard clauses always get a newline after them
        trailer.push(b.hardline);
      } else if (
        // the heredoc ending token includes a newline so we don't need to add one
        !isHeredoc(snode) &&
        !isXHeredoc(snode) &&
        util.hasNewlineInRange(
          options.originalText,
          snode.expression_l.end + 1,
          nextNode.expression_l.begin
        )
      ) {
        // if theres a newline between the expression+1 and the begin of
        // the next expression, we'll add an additional hardline
        trailer.push(b.hardline);
      }
    }
    return [path.call(print), trailer];
  }, "statements");

  return b.group(
    [
      openCloseTokens[0],
      opportunityToBreak
        ? b.indent([opportunityToBreak, statements])
        : statements,
      opportunityToBreak,
      openCloseTokens[1],
    ],
    { shouldBreak: beginShouldBreak(path, options) }
  );
};

export default printBegin;
