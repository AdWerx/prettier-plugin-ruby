import { nodes } from "lib-ruby-parser";
import { Doc, doc } from "prettier";
import { sourceFromLocation } from "../diagnostics";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

const makeBlockPrinter = ({
  delegateToSendCall,
  shouldBreak = false,
}: {
  delegateToSendCall: boolean;
  shouldBreak?: boolean;
}): NodePrinter<nodes.Block> => {
  return (path, options, print) => {
    const node = path.getValue();

    if (node.call instanceof nodes.Send && delegateToSendCall) {
      return path.call(print, "call");
    }

    const hasExistingBreak = sourceFromLocation(
      options,
      node.expression_l
    ).includes("\n");
    let body: Doc = "";
    const open = b.ifBreak("do", "{");
    const end = b.ifBreak("end", "}");

    const args = path.call(print, "args");

    if (node.body) {
      body = [b.indent([b.line, path.call(print, "body")]), b.line];
    }

    if (node.call instanceof nodes.Lambda) {
      return [
        path.call(print, "call"),
        args ? [args, " "] : " ",
        b.group([open, body, end], {
          shouldBreak: shouldBreak || hasExistingBreak,
        }),
      ];

      // const callId = Symbol("call");
      // body = body ? b.indentIfBreak(body, { groupId: callId }) : body;
      // parts.push([
      //   b.group(path.call(print, "call"), { id: callId }),
      //   " ",
      //   b.group([open, args ? [" ", args] : "", body, end]),
      // ]);
    } else {
      return [open, args ? [" ", args] : "", body, end];
    }

    //   return [
    //     b.group(path.call(print, "call"), { id: callId }),
    //     isLambda ? args : "",
    //     " ",
    //     b.group([
    //       b.ifBreak("do", "{"),
    //       !isLambda ? args : "",
    //       node.body
    //         ? b.indentIfBreak(
    //             [b.indent([b.line, path.call(print, "body")]), b.line],
    //             { groupId: callId }
    //           )
    //         : "",
    //       b.ifBreak("end", "}"),
    //     ]),
    //   ];
    // }
  };
};

export const printBlock = makeBlockPrinter({ delegateToSendCall: true });
export const printBlockWithoutCall = makeBlockPrinter({
  delegateToSendCall: false,
});
export const printBrokenBlockWithoutCall = makeBlockPrinter({
  delegateToSendCall: false,
  shouldBreak: true,
});

export default printBlock;
