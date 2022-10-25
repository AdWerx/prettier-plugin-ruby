import { astFormat, name, parser } from "./parser";
import printer from "./printer";

export const languages = [
  {
    extensions: [".rb"],
    name: "Ruby",
    parsers: [name],
  },
];

export const parsers = {
  [name]: parser,
};

export const printers = {
  [astFormat]: printer,
};
