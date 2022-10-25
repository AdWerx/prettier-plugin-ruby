import { Loc, ParserResult } from "lib-ruby-parser";

export const sourceFromLocation = (
  options: { originalText: string },
  loc: Loc
) => {
  return options.originalText.substring(loc.begin, loc.end);
};

export const printDiagnostics = (result: ParserResult) => {
  result.diagnostics.forEach((diag) => {
    const originalText = new TextDecoder().decode(result.input.bytes);
    const message = `${diag.message.constructor.name} ${
      Object.keys(diag.message).length
        ? `(${Object.keys(diag.message)
            .map((key) => `${key}: ${(diag.message as any)[key]}`)
            .join(",")})`
        : ""
    }: \n\n${sourceFromLocation(
      { originalText },
      {
        begin: diag.loc.begin - 30,
        end: diag.loc.end + 30,
      }
    )}\n\n`;
    if (diag.level == "error") {
      throw new Error(message);
    } else if (diag.level == "warning") {
      console.warn(message);
    }
  });
};
