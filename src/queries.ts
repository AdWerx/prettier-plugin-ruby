import { Loc, Node, nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { AstPath, doc, Doc } from "prettier";
import { TextDecoder } from "util";
import { sourceFromLocation } from "./diagnostics";
import { PossiblyLocatedNode, RubyParserOptions } from "./parser";
const {
  utils: { findInDoc },
} = doc;

type NodeQuery<T> = (node: any) => node is T;

const makeQuery =
  (nodeClass: any): NodeQuery<typeof nodeClass> =>
  (node): node is typeof nodeClass => {
    return node instanceof nodeClass;
  };

// type assertions
export const isArray: NodeQuery<nodes.Array> = makeQuery(nodes.Array);
export const isHash: NodeQuery<nodes.Hash> = makeQuery(nodes.Hash);
export const isSend: NodeQuery<nodes.Send> = makeQuery(nodes.Send);
export const isStr: NodeQuery<nodes.Str> = makeQuery(nodes.Str);
export const isDstr: NodeQuery<nodes.Dstr> = makeQuery(nodes.Dstr);
export const isSym: NodeQuery<nodes.Sym> = makeQuery(nodes.Sym);
export const isDsym: NodeQuery<nodes.Dsym> = makeQuery(nodes.Dsym);
export const isSelf: NodeQuery<nodes.Self_> = makeQuery(nodes.Self_);
export const isCSend: NodeQuery<nodes.CSend> = makeQuery(nodes.CSend);
export const isBlock: NodeQuery<nodes.Block> = makeQuery(nodes.Block);
export const isKwargs: NodeQuery<nodes.Kwargs> = makeQuery(nodes.Kwargs);
export const isBegin: NodeQuery<nodes.Begin> = makeQuery(nodes.Begin);
export const isConst: NodeQuery<nodes.Const> = makeQuery(nodes.Const);
export const isLvar: NodeQuery<nodes.Lvar> = makeQuery(nodes.Lvar);
export const isIf: NodeQuery<nodes.If> = makeQuery(nodes.If);
export const isAnd: NodeQuery<nodes.And> = makeQuery(nodes.And);
export const isOr: NodeQuery<nodes.Or> = makeQuery(nodes.Or);
export const isDef: NodeQuery<nodes.Def> = makeQuery(nodes.Def);
export const isKwBegin: NodeQuery<nodes.KwBegin> = makeQuery(nodes.KwBegin);
export const isEnsure: NodeQuery<nodes.Ensure> = makeQuery(nodes.Ensure);
export const isLvasgn: NodeQuery<nodes.Lvasgn> = makeQuery(nodes.Lvasgn);
export const isSplat: NodeQuery<nodes.Splat> = makeQuery(nodes.Splat);
export const isRegexp: NodeQuery<nodes.Regexp> = makeQuery(nodes.Regexp);
export const isRegOpt: NodeQuery<nodes.RegOpt> = makeQuery(nodes.RegOpt);
export const isHeredoc: NodeQuery<nodes.Heredoc> = makeQuery(nodes.Heredoc);
export const isXHeredoc: NodeQuery<nodes.XHeredoc> = makeQuery(nodes.XHeredoc);
export const isEmptyElse: NodeQuery<nodes.EmptyElse> = makeQuery(
  nodes.EmptyElse
);
export const isIndexAsgn: NodeQuery<nodes.IndexAsgn> = makeQuery(
  nodes.IndexAsgn
);

export const beginShouldBreak = (
  path: AstPath<nodes.Begin>,
  options: RubyParserOptions<nodes.Begin>
): boolean => {
  const node = path.getValue();

  return (
    sourceFromLocation(options, node.expression_l).includes("\n") &&
    (node.statements.length > 1 ||
      isAnd(node.statements[0]) ||
      isOr(node.statements[0]))
  );
};

export const blockShouldBreak = (
  path: AstPath<nodes.Block>,
  options: RubyParserOptions<nodes.Block>
): boolean => {
  const node = path.getValue();

  if (!node.body) return false;

  return (
    path.match((node) => isBlock(node)) &&
    sourceFromLocation(options, node.expression_l).includes("\n")
  );
};

export const primitiveShouldBreak = (
  path: AstPath<nodes.Array | nodes.Hash>,
  options: RubyParserOptions<nodes.Array | nodes.Hash>
): boolean => {
  const node = path.getValue();
  const parent = path.getParentNode();
  if (!parent) return false;

  return (
    (isLvasgn(parent) ||
      isIndexAsgn(parent) ||
      (isSend(parent) && !!parent.operator_l)) &&
    sourceFromLocation(options, node.expression_l).includes("\n")
  );
};

export const isSendChain = (value: Doc | doc.builders.DocCommand): boolean => {
  return (
    (typeof value === "object" &&
      "label" in value &&
      value["label"] == "send-chain") ||
    (Array.isArray(value) &&
      typeof value[0] === "object" &&
      "label" in value[0] &&
      value[0]["label"] == "send-chain")
  );
};

export const isSendLike = (node: any): boolean => {
  return (
    isSend(node) ||
    isCSend(node) ||
    (isBlock(node) && (isSend(node.call) || isCSend(node.call)))
  );
};

export const hasBlock = (path: AstPath<nodes.Send | nodes.CSend>): boolean => {
  const parent = path.getParentNode();
  return isBlock(parent) && path.getName() === "call";
};

export const receiverIsWrapped = (
  path: AstPath<nodes.Send | nodes.CSend>,
  options: RubyParserOptions<Node>
): boolean => {
  const node = path.getValue();
  return (
    isBegin(node.recv) &&
    !!node.recv.begin_l &&
    sourceFromLocation(options, node.recv.begin_l) != "#{"
  );
};

export const locationIsImmediatelyFollowedByNewline = (
  options: RubyParserOptions<PossiblyLocatedNode>,
  loc: Loc | undefined | null
): boolean => {
  if (!loc) return false;
  return (
    sourceFromLocation(options, { begin: loc.end, end: loc.end + 1 }) === "\n"
  );
};

export const willBreakExcludingHeredocs = (doc: any) => {
  return findInDoc(
    doc,
    (doc: any) => {
      if (doc.type === "group" && doc.break) return true;
      // && !doc.literal is how this differs from willBreak
      if (doc.type === "line" && doc.hard && !doc.literal) return true;
      if (doc.type === "break-parent") return true;
    },
    false
  );
};

export const canBreak = (doc: any) => {
  return findInDoc(
    doc,
    (doc: any) => {
      if (doc.type === "line") return true;
    },
    false
  );
};

export const canBreakIndex = (
  path: AstPath<nodes.IndexAsgn | nodes.Index>
): boolean => {
  const node = path.getValue();
  return (
    node.indexes.length > 1 ||
    (isSend(node.indexes[0]) && !!node.indexes[0].recv) ||
    isBlock(node.indexes[0]) ||
    isBegin(node.indexes[0])
  );
};

export const assignmentRhsShouldBreak = (
  printedValue: Doc,
  path: AstPath<
    | nodes.Lvasgn
    | nodes.IndexAsgn
    | nodes.Gvasgn
    | nodes.Casgn
    | nodes.OrAsgn
    | nodes.AndAsgn
  >,
  options: RubyParserOptions<Node>
) => {
  const node = path.getValue();
  // allow the user to decide if a break appears after the `=`
  if (locationIsImmediatelyFollowedByNewline(options, node.operator_l))
    return false;
  if (isRegexp(node.value))
    return (
      isStr(node.value.parts[0]) &&
      new TextDecoder().decode(node.value.parts[0].value).includes("\n")
    );
  return (
    canBreak(printedValue) ||
    (typeof printedValue === "object" &&
      "label" in printedValue &&
      printedValue["label"] === "send-chain") ||
    isStr(node.value) ||
    isDstr(node.value) ||
    isSym(node.value) ||
    isDsym(node.value)
  );
};
