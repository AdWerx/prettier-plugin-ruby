import { nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { Doc, doc, util } from "prettier";
import { sourceFromLocation } from "../diagnostics";
import { NodePrinter, printedHeredocEndLocations } from "../printer";
import { locationIsImmediatelyFollowedByNewline } from "../queries";
const { builders: b } = doc;

const printHeredoc: NodePrinter<nodes.Heredoc> = (path, options, print) => {
  const node = path.getValue();
  const opener = sourceFromLocation(options, node.expression_l);
  const body_l = node.heredoc_body_l;
  let { begin } = body_l;
  const { end } = node.heredoc_end_l;

  // the parser cumulatively includes overlapping heredoc bodies
  // so we keep track of which ones have already been printed and remove that
  // content from this heredoc and print the rest
  for (const loc of printedHeredocEndLocations) {
    if (loc.end > body_l.begin && loc.end < body_l.end) {
      begin = Math.max(begin, loc.end + 1);
    }
  }
  const body = sourceFromLocation(options, { begin, end });
  let trailer: Doc = "";

  printedHeredocEndLocations.push(node.heredoc_end_l);
  return [
    opener,
    b.lineSuffix([b.literallineWithoutBreakParent, body, trailer]),
    locationIsImmediatelyFollowedByNewline(options, body_l) ? b.hardline : "",
  ];
};

export default printHeredoc;
