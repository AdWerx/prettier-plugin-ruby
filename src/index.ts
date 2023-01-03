import { SupportOptions } from "prettier";
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

export const options: SupportOptions = {
  trailingDot: {
    type: "boolean",
    category: "Global",
    default: true,
    since: "v0.1.0",
    description: "",
  },
  formatNumbers: {
    type: "boolean",
    category: "Global",
    default: false,
    since: "v0.1.0",
    description: "",
  },
  eofNewline: {
    type: "boolean",
    category: "Global",
    default: true,
    since: "v0.1.0",
    description:
      "Enabling this rule with a true value will result in a newline added to the end of a formatted file",
  },
};

export const defaultOptions = {
  tabWidth: 2,
};
