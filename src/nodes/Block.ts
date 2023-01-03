import { Node, nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { AstPath, Doc, doc } from "prettier";
import { RubyParserOptions } from "../parser";
import { NodePrinter } from "../printer";
import { isSend, blockShouldBreak, isCSend, isSendOrCSend } from "../queries";
const { builders: b } = doc;

const makeBlockPrinter = ({
  delegateToSendCall,
}: {
  delegateToSendCall: boolean;
  shouldBreak?: boolean;
}): NodePrinter<nodes.Block> => {
  return (path, options, print) => {
    const node = path.getValue();

    if (isSendOrCSend(node.call) && delegateToSendCall) {
      return path.call(print, "call");
    }
    const { open, args, body, end } = getBlockDocs(path, options, print);

    if (node.call instanceof nodes.Lambda) {
      return [
        path.call(print, "call"),
        args ? [args, " "] : " ",
        b.group([open, body, end], {
          shouldBreak: blockShouldBreak(path, options),
        }),
      ];
    } else {
      // all blocks with a Send caller that reside _within_ a chain format here
      return [open, args ? [" ", args] : "", body, end];
    }
  };
};

export type BlockDocs = {
  open: Doc;
  args: Doc;
  body: Doc;
  end: Doc;
};

export const getBlockDocs = (
  path: AstPath<nodes.Block>,
  options: RubyParserOptions<Node | null>,
  print: (path: AstPath<Node | null>) => Doc
): BlockDocs => {
  const node = path.getValue();
  let body: Doc = "";
  const open = b.ifBreak("do", "{");
  const end = b.ifBreak("end", "}");
  const args = path.call(print, "args");

  if (node.body) {
    body = [b.indent([b.line, path.call(print, "body")]), b.line];
  }

  return {
    open,
    args,
    body,
    end,
  };
};

export const printBlock = makeBlockPrinter({ delegateToSendCall: true });
export const printBlockWithoutCall = makeBlockPrinter({
  delegateToSendCall: false,
});

export default printBlock;
