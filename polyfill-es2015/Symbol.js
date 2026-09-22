import { Symbol as native_Symbol } from "../native/Symbol";
import Symbol from "sky-core/pure/Symbol";

if(native_Symbol !== Symbol) {
	if(!Symbol.asyncIterator) { Symbol.asyncIterator = Symbol("asyncIterator"); }
	window.Symbol = Symbol;
}
export { Symbol };