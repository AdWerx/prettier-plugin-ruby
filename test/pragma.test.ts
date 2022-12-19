import { describe, expect, test } from "@jest/globals";
import { formatOptions } from "./test-helper";
import prettier from "prettier";

describe("pragma", () => {
  describe("requirePragma: true", () => {
    describe("and pragma is present", () => {
      test("formats", () => {
        const source = `# @format

  class Thing
      attr_reader :name
        def initialize name
          @name = name
        end
      end
  `;
        const formatted = prettier.format(source, {
          ...formatOptions,
          requirePragma: true,
        });
        expect(formatted).toEqual(`# @format

class Thing
  attr_reader :name
  def initialize(name)
    @name = name
  end
end`);
      });
    });
    describe("and pragma is missing", () => {
      test("does no formatting", () => {
        const source = `
  class Thing
      attr_reader :name
        def initialize name
          @name = name
        end
      end
  `;
        const formatted = prettier.format(source, {
          ...formatOptions,
          requirePragma: true,
        });
        expect(formatted).toEqual(source);
      });
    });
  });

  describe("pragma", () => {
    describe("insertPragma: true", () => {
      test("adds the pragma", () => {
        const source = `# frozen_string_literal: true
    class Thing
        attr_reader :name
          def initialize name
            @name = name
          end
        end
    `;
        const formatted = prettier.format(source, {
          ...formatOptions,
          insertPragma: true,
        });
        expect(formatted).toEqual(`# @format
# frozen_string_literal: true
class Thing
  attr_reader :name
  def initialize(name)
    @name = name
  end
end`);
      });
    });
  });
});
