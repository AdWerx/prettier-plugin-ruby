import { nodes } from "lib-ruby-parser";
import { Doc, doc } from "prettier";
import { sourceFromLocation } from "../diagnostics";
import { NodePrinter } from "../printer";
const { builders: b } = doc;

const unaryOperators: string[] = ["~", "-@", "+@"];
const exponentiation: string = "**";
const negation: string = "!";

export const makeSendPrinter = (dot = "."): NodePrinter<nodes.Send> => {
  return (path, options, print) => {
    const node = path.getValue();
    const defaultWraps = node.begin_l ? ["(", ")"] : [" ", ""];
    let argsDoc: Doc = "";
    let operator: Doc = "";
    let selector: Doc = "";
    let dot: Doc = " ";

    if (node.dot_l) {
      dot = sourceFromLocation(options, node.dot_l);
    }
    if (node.selector_l) {
      selector = sourceFromLocation(options, node.selector_l);
    }
    if (node.operator_l) {
      operator = [" ", sourceFromLocation(options, node.operator_l), " "];
    }

    const rawArgs = path.map(print, "args");

    if (node.args.length) {
      if (operator) {
        // indicates its a setter
        argsDoc = rawArgs;
      } else if (!node.dot_l && !node.begin_l && node.args.length == 1) {
        // no dot, no parens, one arg, we want the arg to start on the same line
        argsDoc = [" ", ...rawArgs];
      } else if (!node.dot_l && !node.begin_l && node.args.length < 3) {
        argsDoc = [" ", b.join(", ", rawArgs)];
      } else {
        // other
        argsDoc = b.group([
          b.ifBreak("(", defaultWraps[0]),
          b.indent([b.softline, b.join([",", b.line], rawArgs)]),
          b.softline,
          b.ifBreak(")", defaultWraps[1]),
        ]);
      }
    }

    const dotMethod = [dot, selector, operator];
    let receiver = path.call(print, "recv");
    const parent = path.getParentNode();

    const wrappedWithParens =
      node.recv instanceof nodes.Begin &&
      node.recv.begin_l &&
      sourceFromLocation(options, node.recv.begin_l) != "#{";
    const recvIsArray = node.recv instanceof nodes.Array;
    const recvIsHash = node.recv instanceof nodes.Hash;
    const recvIsBlock = node.recv instanceof nodes.Block;
    const grandparent = path.stack[path.stack.length - 5];

    if (unaryOperators.includes(node.method_name)) {
      return [selector, receiver];
    } else if (node.method_name == negation) {
      return ["!", receiver];
    } else if (node.method_name == exponentiation) {
      return [receiver, node.method_name, rawArgs];
    } else if (node.recv) {
      const breakableRecvDotMethod = [
        receiver,
        node.dot_l ? b.indent([b.softline, dotMethod]) : dotMethod,
      ];
      if (wrappedWithParens || recvIsArray || recvIsHash) {
        // cases in which we will chain right onto the end of the recv
        return [receiver, dotMethod, argsDoc];
      } else if (
        parent instanceof nodes.Send &&
        node.dot_l &&
        !parent.args.includes(node)
      ) {
        // when this send is part of a chain, we don't create a new group
        return [breakableRecvDotMethod, b.indent(argsDoc)];
      } else if (
        parent instanceof nodes.CSend &&
        node.dot_l &&
        !parent.args.includes(node)
      ) {
        // same as above, but I don't know how to make typescript happy
        // when this send is part of a chain, we don't create a new group
        return [breakableRecvDotMethod, b.indent(argsDoc)];
      } else if (
        parent instanceof nodes.Block &&
        grandparent instanceof nodes.Send &&
        path.getName() == "call"
      ) {
        // same as above, but I don't know how to make typescript happy
        // when this block(send) is part of a chain, we don't create a new group
        return [breakableRecvDotMethod, b.indent(argsDoc)];
      } else {
        const id = Symbol("topsend");
        return b.label("topsend", [
          b.group(breakableRecvDotMethod, { id }),
          b.indentIfBreak(argsDoc, { groupId: id }),
        ]);
      }
    } else {
      return [node.method_name, argsDoc];
    }
  };
};

const printSend = makeSendPrinter(".");

export default printSend;
