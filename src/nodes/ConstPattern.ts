import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printConstPattern: NodePrinter<nodes.ConstPattern> = (
  path,
  options,
  print
) => {
  const node = path.getValue();
  console.log(`-ConstPattern-`);
  path.call(print, "const_");
  path.call(print, "pattern");

  return `❗️ConstPattern`;
};

export default printConstPattern;
