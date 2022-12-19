import { nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { Doc, doc } from "prettier";
import { NodePrinter } from "../printer";
import { sourceFromLocation } from "../diagnostics";
import {
  assignmentRhsShouldBreak,
  canBreak,
  canBreakIndex,
  isBegin,
  isBlock,
  isDstr,
  isDsym,
  isStr,
  isSym,
} from "../queries";
const { builders: b } = doc;

const printIndexAsgn: NodePrinter<nodes.IndexAsgn> = (path, options, print) => {
  const node = path.getValue();
  let operator: Doc = "";
  if (node.operator_l) {
    operator = [" ", sourceFromLocation(options, node.operator_l)];
  }
  const printedReceiver = path.call(print, "recv");
  const oneLineValue = node.value ? [" ", path.call(print, "value")] : "";
  const expandedValue = node.value
    ? b.indent([b.line, path.call(print, "value")])
    : "";

  if (canBreakIndex(path)) {
    return b.group([
      printedReceiver,
      "[",
      b.indent([b.softline, b.join([",", b.line], path.map(print, "indexes"))]),
      b.softline,
      "]",
      operator,
      oneLineValue,
    ]);
  } else if (!assignmentRhsShouldBreak(oneLineValue, path, options)) {
    // things that don't break nicely may break after the `=`
    return b.group([
      printedReceiver,
      "[",
      b.join([", "], path.map(print, "indexes")),
      "]",
      operator,
      expandedValue,
    ]);
  } else {
    return b.group([
      printedReceiver,
      "[",
      b.join([", "], path.map(print, "indexes")),
      "]",
      operator,
      oneLineValue,
    ]);
  }

  // return b.group([
  //   path.call(print, "recv"),
  //   b.group([
  //     "[",
  //     b.indent([b.softline, b.join([",", b.line], path.map(print, "indexes"))]),
  //     b.softline,
  //     "]",
  //     operator,
  //   ]),
  //   node.value ? [" ", path.call(print, "value")] : "",
  // ]);
};

export default printIndexAsgn;
