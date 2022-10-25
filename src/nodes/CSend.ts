import { doc } from "prettier";
import { makeSendPrinter } from "./Send";
const { builders: b } = doc;

const printCSend = makeSendPrinter("&.");

export default printCSend;
