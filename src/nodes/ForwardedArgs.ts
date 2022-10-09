// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const printForwardedArgs: NodePrinter<nodes.ForwardedArgs> = (path, options, print) => {
  const node = path.getValue();
  console.log(`-ForwardedArgs-`);
  return `❗️ForwardedArgs`;
}

export default printForwardedArgs;
