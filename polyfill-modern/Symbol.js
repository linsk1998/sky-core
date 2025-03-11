import { Symbol as native_Symbol } from "../native/Symbol";
import { Symbol as compat_Symbol } from "../impl/Symbol";
import { Symbol as modern_Symbol, getSymbolDescription } from "../impl-modern/Symbol";
var Symbol = native_Symbol;
if(!native_Symbol) {
	Symbol = window.Symbol = compat_Symbol;
	Symbol.iterator = "@@iterator";
	Symbol.hasInstance = "@@hasInstance";
	Symbol.asyncIterator = "@@asyncIterator";
} else {
	if(!('description' in native_Symbol.prototype)) {
		Object.setPrototypeOf(modern_Symbol, Symbol);
		Symbol = window.Symbol = modern_Symbol;
		Object.defineProperty(native_Symbol.prototype, 'description', {
			configurable: true,
			enumerable: false,
			get: getSymbolDescription
		});
	}
	if(!Symbol.iterator) { Symbol.iterator = Symbol("iterator"); }
	if(!Symbol.hasInstance) { Symbol.hasInstance = Symbol("hasInstance"); }
	if(!Symbol.asyncIterator) { Symbol.asyncIterator = Symbol("asyncIterator"); }
}
export { Symbol };