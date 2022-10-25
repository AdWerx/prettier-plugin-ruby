import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
import printHeredoc from "./Heredoc";
const { builders: b } = doc;

const printXHeredoc: NodePrinter<nodes.XHeredoc> = (...args) => {
  return printHeredoc(...args);
};

export default printXHeredoc;
