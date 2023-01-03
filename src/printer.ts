import {
  nodes,
  Node,
  Loc,
  ParserResult,
  Comment,
  MagicComment,
} from "@adwerx/lib-ruby-parser-wasm-bindings";
import { Printer, Doc, doc, AstPath, util } from "prettier";
const { builders: b } = doc;
import { sourceFromLocation } from "./diagnostics";
import { RubyParserOptions } from "./parser";
import { isHeredoc, isIf, isSend } from "./queries";

export class AnnotatedComment extends Comment {
  placement?: string;
  trailing?: boolean;
  leading?: boolean;
  encodingNode?: Node;
  precedingNode?: Node;
  followingNode?: Node;
  printed?: boolean;
  value?: string;
}
export interface NodeWithComments {
  comments?: AnnotatedComment[];
}

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
nodePrinters["MagicComment"] = require("./nodes/MagicComment").default;
nodePrinters["Comment"] = require("./nodes/Comment").default;
nodePrinters["Loc"] = require("./nodes/Loc").default;

export const printer: Printer<
  ParserResult | Node | AnnotatedComment | MagicComment | null
> = {
  print(path, options: RubyParserOptions<Node | null>, print) {
    let node = path.getValue();
    if (!node) return "";
    if (node instanceof ParserResult) {
      return [path.call(print, "ast"), options.eofNewline ? b.hardline : ""];
    }

    const type = node.constructor.name;
    if (!(type in nodePrinters)) {
      throw new Error(`unrecognized node type: ${type}`);
    }
    const printed = nodePrinters[type].call(null, path, options, print);

    return printed;
  },
  printComment(path, options) {
    const comment = path.getValue();
    if (!(comment instanceof Comment) || !comment.value) return "";

    // // detect when we are printing magic comments at the top of the file
    const grandparent = path.getParentNode(1);
    const comments = path.stack[path.stack.length - 3];
    const index = path.stack[path.stack.length - 2];

    // the last magic comment gets an extra newline to separate it from the body
    if (grandparent instanceof ParserResult && /:|@/.test(comment.value)) {
      if (
        Array.isArray(comments) &&
        typeof index === "number" &&
        comments.length - 1 === index
      )
        return comment.value;
    }

    // // if (comment.placement === "ownLine" || comment.placement === "remaining")
    // // return comment.value.trim();

    return comment.value.trim();
  },
  isBlockComment(node) {
    return node instanceof Comment && node.kind == "document";
  },
  canAttachComment(node) {
    return node instanceof Node;
  },
  insertPragma(text: string): string {
    return `# @format\n${text}`;
  },
  handleComments: {
    remaining(comment, text, options) {
      const { precedingNode, enclosingNode, followingNode } = comment;
      if (isHeredoc(precedingNode)) {
        util.addLeadingComment(precedingNode, comment);
        return true;
      }
      if (isSend(precedingNode) && precedingNode.args.some(isHeredoc)) {
        util.addLeadingComment(precedingNode, comment);
        return true;
      }
      if (!isIf(enclosingNode) && isSend(precedingNode)) {
        util.addTrailingComment(precedingNode, comment);
        return true;
      }
      return false;
    },
  },
};

export const quote = (
  options: { singleQuote: boolean },
  text: string
): string => {
  return `"${text.replace(/"/, `\\"`)}"`;
};

export default printer;
