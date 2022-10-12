import { Loc, parse, nodes, Node, Comment } from "lib-ruby-parser";
import { AstPath, Doc, Parser, ParserOptions, Printer } from "prettier";

export const RUBY = "ruby";
export const DEFAULT_QUOTE = '"';

export interface RubyParserOptions extends ParserOptions<Node | null> {
  comments?: Comment[];
}

export const parentsWithImplicitStringChildren = new WeakMap<
  Node,
  nodes.Array | nodes.Regexp | nodes.Heredoc
>();
export const parentsWithImplicitSymbolChildren = new WeakMap<
  Node,
  nodes.Array | nodes.Alias | nodes.Pair
>();
export const printedHeredocEndLocations: Loc[] = [];

export type NodePrinter<T> = (
  path: AstPath<T>,
  options: RubyParserOptions,
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
  expression_l: Loc;
}

export const sourceFromLocation = (options: RubyParserOptions, loc: Loc) => {
  return options.originalText.substring(loc.begin, loc.end);
};

const rubyParser: Parser<LocatedNode> = {
  parse(text, parsers, options) {
    const result = parse(text, options.filepath || "(eval)", (_, b) => b);
    if (!result.ast) throw new Error("could not parse AST");
    printedHeredocEndLocations.splice(0, printedHeredocEndLocations.length);
    // options.tokens = result.tokens;
    // options.magic_comments = result.magic_comments;
    (options as RubyParserOptions).comments = result.comments;
    // options.input = result.input;
    return result.ast as LocatedNode;
  },
  astFormat: RUBY,
  locStart(node) {
    return node.expression_l.begin;
  },
  locEnd(node) {
    return node.expression_l.end;
  },
};

export const parsers = {
  [RUBY]: rubyParser,
};

const rubyPrinter: Printer<Node | null> = {
  print(path, options, print) {
    const node = path.getValue();
    // guard against nulls since we all those to be printed
    if (!node) return "";

    const type = node.constructor.name;
    if (!(type in nodePrinters)) {
      throw new Error(`unrecognized node type: ${type}`);
    }

    // console.log((options as RubyParserOptions).comments);
    // console.log(type, (path.getValue() as LocatedNode).expression_l);

    return nodePrinters[type].call(null, path, options, print);
  },
};

export const printers = {
  [RUBY]: rubyPrinter,
};
