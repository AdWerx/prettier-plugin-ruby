import {
  parse,
  Comment,
  MagicComment,
  Loc,
  CommentKind,
  Node,
  ParserResult,
} from "lib-ruby-parser";
import { TextDecoder } from "util";
import { ParserOptions } from "prettier";
import { printDiagnostics, sourceFromLocation } from "./diagnostics";
import { printedHeredocEndLocations } from "./printer";

export const name = "ruby";
export const astFormat = "lib-ruby-parser";

export interface RubyParserOptions<T> extends ParserOptions<T> {
  magicComments?: MagicComment[];
  formatNumbers: boolean;
  trailingDot: boolean;
}

export interface LocatedNode extends Node {
  expression_l: Loc;
}

export interface PossiblyLocatedNode extends Partial<LocatedNode> {}

export class CommentWithValue extends Comment {
  value: string;
  placement?: string;
  trailing?: boolean;
  leading?: boolean;
  encodingNode?: Node;
  precedingNode?: Node;
  followingNode?: Node;
  constructor(loc: Loc, kind: CommentKind, value: string) {
    super(loc, kind);
    this.value = value;
  }
}

export const parser = {
  parse(text: string, parsers: {}, options: ParserOptions<ParserResult>) {
    const result = parse(text, options.filepath || "(eval)", (_, b) => b);
    const originalText = new TextDecoder().decode(result.input.bytes);

    printedHeredocEndLocations.splice(0, printedHeredocEndLocations.length);

    printDiagnostics(result);

    result.comments = result.comments.map((comment) => {
      return new CommentWithValue(
        comment.loc,
        comment.kind,
        sourceFromLocation({ originalText }, comment.loc)
      );
    });

    if (!result.ast) throw new Error("Failed to parse AST");

    return result;
  },
  astFormat,
  locStart(node: PossiblyLocatedNode | Comment) {
    if (node instanceof Comment) {
      return node.loc.begin;
    } else {
      return node.expression_l?.begin || 0;
    }
  },
  locEnd(node: PossiblyLocatedNode | Comment) {
    if (node instanceof Comment) {
      return node.loc.end;
    } else {
      return node.expression_l?.end || 0;
    }
  },
};

export default parser;
