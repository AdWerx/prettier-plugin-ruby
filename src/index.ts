import { SupportOption } from "prettier";
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

export const options: Record<string, SupportOption> = {
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
};

export const defaultOptions = {
  tabWidth: 2,
};
