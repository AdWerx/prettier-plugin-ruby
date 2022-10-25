import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

const printWhilePost: NodePrinter<nodes.WhilePost> = (path, options, print) => {
  return [path.call(print, "body"), " while ", path.call(print, "cond")];
};

export default printWhilePost;
