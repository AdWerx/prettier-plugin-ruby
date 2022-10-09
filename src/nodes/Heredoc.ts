// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printHeredoc: NodePrinter<nodes.Heredoc> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-Heredoc-`);
  return `❗️Heredoc`;
}

export default printHeredoc;
