import {
  parse,
  Comment,
  MagicComment,
  Loc,
  Node,
  ParserResult,
} from "@adwerx/lib-ruby-parser-wasm-bindings";
import { ParserOptions } from "prettier";
import { printDiagnostics, sourceFromLocation } from "./diagnostics";
import { AnnotatedComment, printedHeredocEndLocations } from "./printer";

export const name = "ruby";
export const astFormat = "lib-ruby-parser";

export interface RubyParserOptions<T> extends ParserOptions<T> {
  magicComments?: MagicComment[];
  formatNumbers: boolean;
  trailingDot: boolean;
  eofNewline: boolean;
}

export interface LocatedNode extends Node {
  expression_l: Loc;
}

export interface PossiblyLocatedNode extends Partial<LocatedNode> {}

export const parser = {
  parse(text: string, parsers: {}, options: ParserOptions<ParserResult>) {
    const result = parse(text, options.filepath || "(eval)", (_, b) => b);

    printedHeredocEndLocations.splice(0, printedHeredocEndLocations.length);

    printDiagnostics(result);

    result.comments.forEach(
      (comment) =>
        ((comment as AnnotatedComment).value = sourceFromLocation(
          { originalText: text },
          comment.loc
        ))
    );

    if (!result.ast) throw new Error("Failed to parse AST");

    return result;
  },
  astFormat,
  hasPragma(text: string): boolean {
    return /^#\s@format$/m.test(text);
  },
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
