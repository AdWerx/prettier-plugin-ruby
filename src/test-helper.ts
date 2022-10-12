import { describe, expect, test } from "@jest/globals";
import path from "path";
import prettier from "prettier";
import { readFileSync } from "fs";
import { marked } from "marked";
import * as plugin from "./";

export type TestCase = {
  title: string;
  before: string;
  after: string;
};

enum ParserState {
  idle = "idle",
  sawtitle = "sawtitle",
  sawbefore = "sawbefore",
  sawafter = "sawafter",
}

type Token = {
  type: string;
  raw: string;
  text?: string;
  depth?: number;
  lang?: string;
  tokens?: Token[];
};

export const formatOptions: prettier.Options = {
  parser: plugin.RUBY,
  printWidth: 80,
  plugins: [plugin],
};

export const runNodeFixtureTests = (name: string) => {
  describe(`${name} fixtures`, () => {
    test.each(
      loadFixtures(path.resolve(__dirname, `./nodes/${name}.fixtures.md`))
    )("$title", ({ before, after }) => {
      const formatted = prettier.format(before, formatOptions);
      expect(formatted).toBe(after);
      const formattedAgain = prettier.format(formatted, formatOptions);
      expect(formattedAgain).toBe(formatted);
    });
  });
};

export const loadFixtures = (
  path: string,
  { encoding }: { encoding?: BufferEncoding } = {}
): TestCase[] => {
  const tokens = marked.lexer(readFileSync(path, encoding || "utf8"));
  return parseExamples(tokens);
};

export const parseExamples = (tokens: Token[]): TestCase[] => {
  let testCase: Partial<TestCase> = {};
  let allExamples: TestCase[] = [];
  let parserState: ParserState = ParserState.idle;
  tokens.forEach((token: Token) => {
    switch (parserState) {
      case ParserState.idle:
        if (token.type == "heading" && (token.raw || "").startsWith("## ")) {
          testCase.title = token.text;
          parserState = ParserState.sawtitle;
        }
        break;
      case ParserState.sawtitle:
        if (token.type == "code" && token.lang == "ruby") {
          testCase.before = token.text;
          parserState = ParserState.sawbefore;
        }
        break;
      case ParserState.sawbefore:
        if (token.type == "code" && token.lang == "ruby") {
          testCase.after = token.text;
          parserState = ParserState.idle;
          allExamples.push({
            title: "Untitled",
            before: "",
            after: "",
            ...testCase,
          });
          testCase = {};
        }
        break;
      default:
        throw new Error(
          `ERROR: Aborting test fixtures parsing. Invalid state: ${parserState}`
        );
    }
  });
  if (parserState != ParserState.idle) {
    throw new Error(
      `Parser was not idle after parsing fixtures. Did something go wrong? The current test case being parsed is ${JSON.stringify(
        testCase,
        null,
        2
      )}`
    );
  }
  return allExamples;
};
