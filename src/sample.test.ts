import { describe, expect, test } from "@jest/globals";
import path from "path";
import { readdirSync } from "fs";
import prettier from "prettier";
import { loadFixtures, formatOptions, parseExamples } from "./test-helper";

describe("Sample fixture tests", () => {
  readdirSync(path.resolve(__dirname, "../samples")).forEach((file) => {
    test.each(
      loadFixtures(path.resolve(__dirname, path.join("../samples", file)))
    )(`Sample: $title (${file})`, ({ before, after }) => {
      expect(prettier.format(before, formatOptions)).toBe(after);
    });
  });
});
