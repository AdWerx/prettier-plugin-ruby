import { nodes } from "lib-ruby-parser";
import { Doc, doc } from "prettier";
import { sourceFromLocation } from "../diagnostics";
import { LocatedNode, PossiblyLocatedNode } from "../parser";
import { NodePrinter } from "../printer";
import { beginShouldBreak } from "../queries";
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
    let trailer: Doc[] = [];
    if (snode.expression_l && i !== value.length - 1) {
      trailer.push(b.hardline);
      const trailingCharacters = sourceFromLocation(options, {
        begin: snode.expression_l.end,
        end: snode.expression_l.end + 2,
      });
      if (trailingCharacters[1] === "\n") {
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
