import { nodes } from "lib-ruby-parser";
import { Doc, doc } from "prettier";
import { NodePrinter } from "../printer";
import { sourceFromLocation } from "../diagnostics";
const { builders: b } = doc;

const printRescue: NodePrinter<nodes.Rescue> = (path, options, print) => {
  const node = path.getValue();
  const parent = path.getParentNode();
  const body = path.call(print, "body");
  const rescueBodies = path.map(print, "rescue_bodies");
  const else_ = path.call(print, "else_");
  // its a modifier when the neither the parent nor body are begins
  if (
    parent instanceof nodes.Def ||
    parent instanceof nodes.KwBegin ||
    parent instanceof nodes.Block ||
    parent instanceof nodes.Ensure
  ) {
    return [
      body,
      b.dedent([b.hardline, b.join(b.hardline, rescueBodies)]),
      node.else_l
        ? [
            b.dedent([b.hardline, "else"]),
            b.hardline,
            path.call(print, "else_"),
          ]
        : "",
    ];
  } else if (node.rescue_bodies.length == 1) {
    // rescue modifier
    return [body, " ", b.group(path.call(print, "rescue_bodies", 0))];
  } else {
    throw new Error("unexpected rescue format—refusing to continue.");
  }
};

export default printRescue;
