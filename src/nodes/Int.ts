import { nodes } from "@adwerx/lib-ruby-parser-wasm-bindings";
import { doc } from "prettier";
import { NodePrinter } from "../printer";

const printInt: NodePrinter<nodes.Int> = (path, options, print) => {
  const node = path.getValue();
  const chars = node.value.replace(/_/, "").split("").reverse();
  if (/_/.test(node.value) || !options.formatNumbers) {
    return node.value;
  } else {
    let current = "";
    let final = "";
    for (let index = 0; index < chars.length; index++) {
      current += chars[index];
      if (current.length === 3 && chars[index + 1] && /\d/.test(current[2])) {
        final += `${current}_`;
        current = "";
      }
    }
    if (current.length > 0) {
      final += `${current}`;
    }
    return final.split("").reverse();
  }
};

export default printInt;
