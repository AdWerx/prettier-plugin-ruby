import {
  nodes,
  Node,
  Loc,
  ParserResult,
  Comment,
} from "@adwerx/lib-ruby-parser-wasm-bindings";
import { Printer, Doc, AstPath, util } from "prettier";
import { sourceFromLocation } from "./diagnostics";
import { CommentWithValue, RubyParserOptions } from "./parser";
import { isHeredoc, isSend } from "./queries";

export type NodePrinter<T> = (
  path: AstPath<T>,
  options: RubyParserOptions<Node | null>,
  print: (path: AstPath<Node | null>) => Doc
) => Doc;

export const parentsWithImplicitStringChildren = new WeakMap<
  Node,
  nodes.Array | nodes.Regexp | nodes.Heredoc | nodes.Xstr | nodes.Dstr
>();
export const parentsWithImplicitSymbolChildren = new WeakMap<
  Node,
  nodes.Array | nodes.Alias | nodes.Pair
>();
export const printedHeredocEndLocations: Loc[] = [];

export const sends: WeakMap<Node, symbol> = new WeakMap();

export const nodePrinters: { [name: string]: NodePrinter<Node | null> } = {};

Object.keys(nodes).forEach((name) => {
  nodePrinters[name] = require(`./nodes/${name}`).default;
});

export const printer: Printer<ParserResult | Node | CommentWithValue | null> = {
  print(path, options: RubyParserOptions<Node | null>, print) {
    let node = path.getValue();
    if (!node) return "";
    if (node instanceof ParserResult) {
      return path.call(print, "ast");
    } else if (node instanceof Loc) {
      return sourceFromLocation(options, node);
    }

    const type = node.constructor.name;
    if (!(type in nodePrinters)) {
      throw new Error(`unrecognized node type: ${type}`);
    }
    const printed = nodePrinters[type].call(null, path, options, print);

    return printed;
  },
  printComment(path, options) {
    const comment = path.getValue() as CommentWithValue;
    if (comment.placement === "ownLine" || comment.placement === "remaining")
      return comment.value.trim();
    return comment.value;
  },
  // @TODO
  // insertPragma(text: string): string {
  //   return "# @format";
  // },
  isBlockComment(node) {
    return node instanceof Comment && node.kind == "document";
  },
  canAttachComment(node) {
    return node instanceof Node;
  },
  insertPragma(text: string): string {
    return `# @format
${text}`;
  },
  handleComments: {
    remaining(comment, text, options) {
      const { precedingNode } = comment;
      if (
        (isHeredoc(precedingNode) || isSend(precedingNode)) &&
        !sourceFromLocation(
          { originalText: text },
          {
            begin: precedingNode.expression_l.end,
            end: comment.loc.begin,
          }
        ).includes("\n")
      ) {
        // comment trails a block, technically inside the block, but the comment
        // pertains to the send. It should be moved out of the block
        util.addLeadingComment(precedingNode, comment);
        return true;
      }
      return false;
    },
  },
};

export default printer;
