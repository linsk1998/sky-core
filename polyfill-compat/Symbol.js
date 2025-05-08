import { Symbol as native_Symbol } from "../native/Symbol";
import Symbol from "sky-core/pure/Symbol";

if(native_Symbol !== Symbol) {
	Symbol.iterator = "@@iterator";
	Symbol.hasInstance = "@@hasInstance";
	Symbol.asyncIterator = "@@asyncIterator";
	window.Symbol = Symbol;
}
export { Symbol };