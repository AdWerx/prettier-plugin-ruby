import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

const printRescueBody: NodePrinter<nodes.RescueBody> = (
  path,
  options,
  print
) => {
  const node = path.getValue();
  return [
    "rescue",
    node.exc_list ? [" ", b.group(path.call(print, "exc_list"))] : "",
    node.exc_var ? [" => ", path.call(print, "exc_var")] : "",
    node.body ? b.indent([b.line, path.call(print, "body")]) : "",
  ];
};

export default printRescueBody;
