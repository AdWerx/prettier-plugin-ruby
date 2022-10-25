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
    !(node.body instanceof nodes.Begin) &&
    !(node.body instanceof nodes.KwBegin) &&
    !(parent instanceof nodes.Begin) &&
    !(parent instanceof nodes.KwBegin)
  ) {
    return [body, " ", rescueBodies, node.else_l ? [" ", else_] : ""];
  } else {
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
  }
};

export default printRescue;
