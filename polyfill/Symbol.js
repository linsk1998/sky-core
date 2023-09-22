import { Symbol as native_Symbol } from "../native/Symbol";
import { Symbol as compat_Symbol } from "../impl/Symbol";
import { Symbol as modern_Symbol } from "../impl-modern/Symbol";
var Symbol = native_Symbol;
if(!native_Symbol) {
	Symbol = window.Symbol = compat_Symbol;
	Symbol.sham = true;
	Symbol.iterator = "@@iterator";
	Symbol.hasInstance = "@@hasInstance";
	Symbol.asyncIterator = "@@asyncIterator";
} else {
	if(String(Symbol()) !== String(Symbol(""))) {
		Object.setPrototypeOf(modern_Symbol, Symbol);
		Symbol = window.Symbol = modern_Symbol;
	}
	if(!Symbol.iterator) { Symbol.iterator = Symbol("iterator"); }
	if(!Symbol.hasInstance) { Symbol.hasInstance = Symbol("hasInstance"); }
	if(!Symbol.asyncIterator) { Symbol.asyncIterator = Symbol("asyncIterator"); }
}
export { Symbol };