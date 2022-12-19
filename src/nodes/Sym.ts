import { nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { doc } from "prettier";
import { TextDecoder } from "util";
import {
  NodePrinter,
  parentsWithImplicitSymbolChildren,
  quote,
} from "../printer";
import { sourceFromLocation } from "../diagnostics";
const { builders: b } = doc;

export const RUBY_ID_PATTERN =
  /^(?![A-Z0-9])(?:[\p{L}\p{Nl}\p{Nd}_]|[^\p{ASCII}])+$/u;

const printSym: NodePrinter<nodes.Sym> = (path, options, print) => {
  const node = path.getValue();
  const parent = path.getParentNode();
  const original = sourceFromLocation(options, node.expression_l);
  const decoded = new TextDecoder().decode(node.name);
  const implicitSymbol =
    parent && parentsWithImplicitSymbolChildren.has(parent);
  const prefix = implicitSymbol ? "" : ":";
  let undecoded = original.replace(/(^(:|%s)?[{"']?|["'}]$)/g, "");
  const canBePrintedLiterally = RUBY_ID_PATTERN.test(undecoded);

  // ends with quote, might be a hint it cannot be printed as a literal (has escaped characters)
  if (/["']$/.test(original) && !canBePrintedLiterally) {
    return [prefix, quote(options, undecoded)];
  } else {
    return [prefix, decoded];
  }
};

export default printSym;
