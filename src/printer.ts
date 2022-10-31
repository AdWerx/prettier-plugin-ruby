import { nodes, Node, Loc, ParserResult, Comment } from "lib-ruby-parser";
import { Printer, doc, Doc, AstPath } from "prettier";
import { sourceFromLocation } from "./diagnostics";
import { CommentWithValue, RubyParserOptions } from "./parser";

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
    // guard against nulls since we all those to be printed
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
    // console.log(require("util").inspect(printed, { depth: null }));
    return printed;
  },
  printComment(path, options) {
    const node = path.getValue();
    if (!(node instanceof CommentWithValue)) return "";
    // if (node.placement == "remaining" && node.leading) {
    //   // CommentWithValue {
    //   //   loc: Loc { begin: 1914, end: 1932 },
    //   //   kind: 'inline',
    //   //   value: '# note: inclusive\n',
    //   //   placement: 'remaining',
    //   //   leading: true,
    //   //   trailing: false,
    //   //   printed: true,
    //   //   nodeDescription: '(unknown type)'
    //   // }
    //   return [" ", node.value.trim()];
    // } else if (node.placement == "endOfLine" && node.leading) {
    //   return [node.value.trim(), doc.builders.hardline];
    // }
    return node.value.trim();
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
  // // isBlockComment,
  // // printComment,
  // handleComments: {
  //   // ownLine(comment, text) {
  //   //   console.log(comment);
  //   //   return false;
  //   // },
  //   endOfLine(comment, text, options) {
  //     console.log(comment);
  //     return false;
  //   },
  //   // remaining(comment, text) {
  //   //   console.log(comment);
  //   //   return false;
  //   // },
  // },
};

export default printer;
