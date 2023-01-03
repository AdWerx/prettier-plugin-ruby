import { sourceFromLocation } from "../diagnostics";
import { AnnotatedComment, NodePrinter } from "../printer";

const printComment: NodePrinter<AnnotatedComment> = (path, options, print) => {
  const node = path.getValue();
  node.printed = true;
  return sourceFromLocation(options, node.loc).trim();
};

export default printComment;
