import { Symbol as native_Symbol } from "../native/Symbol";
import { symbol as impl_Symbol } from "../impl/Symbol/Symbol";
import { Symbol as es6_Symbol, getSymbolDescription } from "../impl/Symbol/Symbol$es6";

var Symbol;
if(native_Symbol) {
	Symbol = es6_Symbol;
	Object.defineProperty(native_Symbol.prototype, 'description', {
		configurable: true,
		enumerable: false,
		get: getSymbolDescription
	});
} else {
	Symbol = impl_Symbol;
}
export default Symbol;
