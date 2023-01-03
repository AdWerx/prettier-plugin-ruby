import { describe, expect, test } from "@jest/globals";
import { formatOptions } from "./test-helper";
import prettier from "prettier";
import { RubyParserOptions } from "../src/parser";
import { Node } from "@adwerx/lib-ruby-parser-wasm-bindings";

const options = {
  ...formatOptions,
  eofNewline: true,
} as prettier.RequiredOptions | RubyParserOptions<Node>;

describe("end-of-file newline", () => {
  describe("when no EOF NL is present", () => {
    test("adds a newline", () => {
      const source = `
require "securerandom"

  class Thing
      attr_reader :name
        def initialize name
          @name = name
        end
      end`;
      const formatted = prettier.format(source, options);
      expect(formatted).toEqual(`require "securerandom"

class Thing
  attr_reader :name
  def initialize(name)
    @name = name
  end
end
`);
    });
  });
});
