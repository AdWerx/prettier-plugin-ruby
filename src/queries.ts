import { Node, nodes } from "lib-ruby-parser";
import { AstPath } from "prettier";
import { sourceFromLocation } from "./diagnostics";
import { RubyParserOptions } from "./parser";

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
export const isCSend: NodeQuery<nodes.CSend> = makeQuery(nodes.CSend);
export const isBlock: NodeQuery<nodes.Block> = makeQuery(nodes.Block);
export const isKwargs: NodeQuery<nodes.Kwargs> = makeQuery(nodes.Kwargs);
export const isBegin: NodeQuery<nodes.Begin> = makeQuery(nodes.Begin);

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
