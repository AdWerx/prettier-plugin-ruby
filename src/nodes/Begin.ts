import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printBegin: NodePrinter<nodes.Begin> = (path, options, print) => {
  let openCloseTokens: [string, string] = ["", ""];
  const node = path.getValue();
  if (node.begin_l && node.end_l) {
    const openToken = options.originalText.substring(
      node.begin_l.begin,
      node.begin_l.end
    );
    const closeToken = options.originalText.substring(
      node.end_l.begin,
      node.end_l.end
    );
    openCloseTokens = [openToken, closeToken];
  }
  return b.group([
    openCloseTokens[0],
    b.join(b.hardline, path.map(print, "statements")),
    openCloseTokens[1],
  ]);
};

export default printBegin;
