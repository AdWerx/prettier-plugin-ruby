import { Loc, parse, nodes, Node } from "lib-ruby-parser";
import { AstPath, Doc, Parser, ParserOptions, Printer } from "prettier";

export const RUBY = "ruby";
export const DEFAULT_QUOTE = '"';

export interface RubyParserOptions<T> extends ParserOptions<T> {
  enclosingArrayNodeWithModifier?: T;
  enclosingArrayNodeWithModifierBrackets?: [string, string];
}

export type NodePrinter<T> = (
  path: AstPath<T>,
  options: RubyParserOptions<T | null>,
  print: (path: AstPath<Node | null>) => Doc
) => Doc;

const nodePrinters: { [name: string]: NodePrinter<Node | null> } = {};

Object.keys(nodes).forEach((name) => {
  nodePrinters[name] = require(`./nodes/${name}`).default;
});

export const languages = [
  {
    extensions: [".rb"],
    name: "Ruby",
    parsers: [RUBY],
  },
];

export interface LocatedNode {
  begin_l: Loc;
  end_l: Loc;
}

const rubyParser: Parser<LocatedNode> = {
  parse(text, parsers, options) {
    const result = parse(text, options.filepath || "(eval)", (_, b) => b);
    if (!result.ast) throw new Error("could not parse AST");
    // options.tokens = result.tokens;
    // options.magic_comments = result.magic_comments;
    // options.comments = result.comments;
    // options.input = result.input;
    return result.ast as LocatedNode;
  },
  astFormat: RUBY,
  locStart(node) {
    return node.begin_l.begin;
  },
  locEnd(node) {
    return node.end_l.end;
  },
};

export const parsers = {
  [RUBY]: rubyParser,
};

const rubyPrinter: Printer<Node | null> = {
  print(path, options, print) {
    const node = path.getValue();
    // guard against nulls
    if (!node) return "";

    const type = node.constructor.name;
    if (!(type in nodePrinters)) {
      throw new Error(`unrecognized node type: ${type}`);
    }

    return nodePrinters[type].call(null, path, options, print);
  },
};

export const printers = {
  [RUBY]: rubyPrinter,
};
