import { describe, expect, test } from "@jest/globals";
import { formatOptions } from "./test-helper";
import prettier from "prettier";

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
      const formatted = prettier.format(source, {
        ...formatOptions,
      });
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
