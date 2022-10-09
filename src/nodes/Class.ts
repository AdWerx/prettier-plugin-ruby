import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printClass: NodePrinter<nodes.Class> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-Class-`);
  path.call(print, "name");
  path.call(print, "superclass");
  path.call(print, "body");

  return `❗️Class`;
};

export default printClass;
