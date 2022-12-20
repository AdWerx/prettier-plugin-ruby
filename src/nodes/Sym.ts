import { nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { doc } from "prettier";
import { TextDecoder } from "util";
import {
  NodePrinter,
  parentsWithImplicitSymbolChildren,
  quote,
} from "../printer";
import { sourceFromLocation } from "../diagnostics";
import { operatorMethods } from "./Send";
const { builders: b } = doc;

export const RUBY_IDENTIFIER_PATTERN =
  /^@?(?![A-Z0-9])(?:[\p{L}\p{Nl}\p{Nd}_]|[^\p{ASCII}])+$/u;

const printSym: NodePrinter<nodes.Sym> = (path, options, print) => {
  const node = path.getValue();
  const parent = path.getParentNode();
  const asAuthored = sourceFromLocation(options, node.expression_l);
  const decoded = new TextDecoder().decode(node.name);
  const implicitSymbol =
    parent && parentsWithImplicitSymbolChildren.has(parent);
  const undecoded = asAuthored.replace(/(^(:|%s)?[{"']?|["'}]$)/g, "");
  const canBePrintedLiterally =
    RUBY_IDENTIFIER_PATTERN.test(undecoded) ||
    operatorMethods.includes(decoded);
  const prefix = implicitSymbol ? "" : ":";

  // ends with quote or }, might be a hint it cannot be printed as
  // a literal (has escaped/non-identifier characters)
  // doesn't have quotes or } wrapping, so it likely can be printed
  // as a literal
  if (!/["'}]$/.test(asAuthored) || canBePrintedLiterally) {
    return [prefix, undecoded];
    // if possible, remove %s{} and replace with symbol literal
  } else if (asAuthored.endsWith("}") && !canBePrintedLiterally) {
    return [prefix, quote(options, decoded)];
    // print it as-authored
  } else {
    return asAuthored;
  }
};

export default printSym;
