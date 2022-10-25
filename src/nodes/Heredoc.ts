import { nodes } from "lib-ruby-parser";
import { Doc, doc } from "prettier";
import { sourceFromLocation } from "../diagnostics";
import { NodePrinter, printedHeredocEndLocations } from "../printer";
const { builders: b } = doc;

const printHeredoc: NodePrinter<nodes.Heredoc> = (path, options, print) => {
  const node = path.getValue();
  const opener = sourceFromLocation(options, node.expression_l);
  // unused
  // const closer = sourceFromLocation(options, node.heredoc_end_l);
  // unused
  // const indentAware = opener[2] == "~" || opener[2] == "-";

  const body_l = node.heredoc_body_l;
  let { begin } = body_l;
  const { end } = node.heredoc_end_l;

  // the parser cumulatively includes overlapping heredoc bodies
  // so we keep track of which ones have already been printed and remove that
  // content from this heredoc and print the rest
  for (const loc of printedHeredocEndLocations) {
    if (loc.end > body_l.begin && loc.end < body_l.end) {
      // console.log(loc, "overlaps", body_l);
      begin = Math.max(begin, loc.end + 1);
      // console.log(`updated to: begin: ${begin}, end: ${end}`);
    }
  }
  const body = sourceFromLocation(options, { begin, end });
  let trailer: Doc = "";
  const trailerCharacters = sourceFromLocation(options, {
    begin: end,
    end: end + 2,
  });
  if (trailerCharacters == "\n\n") {
    trailer = [b.hardline];
  }

  printedHeredocEndLocations.push(node.heredoc_end_l);
  return [
    opener,
    b.lineSuffix([b.literallineWithoutBreakParent, body]),
    trailer,
  ];
};

export default printHeredoc;
