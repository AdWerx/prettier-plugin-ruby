import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
import { sourceFromLocation } from "../diagnostics";
import util from "util";
import { isBlock, isDef, isEnsure, isKwBegin } from "../queries";
const { builders: b } = doc;

const printRescue: NodePrinter<nodes.Rescue> = (path, options, print) => {
  const node = path.getValue();
  const parent = path.getParentNode();
  const body = path.call(print, "body");
  const rescueBodies = path.map(print, "rescue_bodies");
  const else_ = path.call(print, "else_");
  if (
    isDef(parent) ||
    isKwBegin(parent) ||
    isBlock(parent) ||
    isEnsure(parent)
  ) {
    // these types of closures / blocks are rescuable at the dedent level
    return [
      body,
      b.dedent([b.hardline, b.join(b.hardline, rescueBodies)]),
      node.else_l ? [b.dedent([b.hardline, "else"]), b.hardline, else_] : "",
    ];
  } else if (node.rescue_bodies.length == 1) {
    // otherwise it's a rescue modifier
    return b.group([
      b.ifBreak("begin", ""),
      b.indent([b.softline, body]),
      b.line,
      path.call(print, "rescue_bodies", 0),
      b.softline,
      b.ifBreak("end", ""),
    ]);
  } else {
    throw new Error(`unexpected rescue format—refusing to continue.
Please open a bug report for this error with the following code sample:

\`\`\`
${sourceFromLocation(options, parent?.expression_l || node.expression_l)}
---
${util.inspect(node)}
\`\`\`
`);
  }
};

export default printRescue;
