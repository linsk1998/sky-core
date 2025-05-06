import { Symbol as native_Symbol } from "../native/Symbol";
import { Symbol as impl_Symbol } from "../impl/Symbol";
import { Symbol as modern_Symbol, getSymbolDescription } from "../impl-modern/Symbol";

var Symbol;
if(native_Symbol) {
	if('description' in native_Symbol.prototype) {
		Symbol = native_Symbol;
	} else {
		Symbol = modern_Symbol;
		Object.defineProperty(native_Symbol.prototype, 'description', {
			configurable: true,
			enumerable: false,
			get: getSymbolDescription
		});
	}
} else {
	Symbol = impl_Symbol;
}
export default Symbol;