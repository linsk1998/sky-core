import { Symbol as native_Symbol } from "../native/Symbol";
import { Symbol as es2015_Symbol, getSymbolDescription } from "../impl-es2015/Symbol";
var Symbol;
if('description' in native_Symbol.prototype) {
	Symbol = native_Symbol;
} else {
	Symbol = es2015_Symbol;
	Object.setPrototypeOf(Symbol, native_Symbol);
	Object.defineProperty(native_Symbol.prototype, 'description', {
		configurable: true,
		enumerable: false,
		get: getSymbolDescription
	});
}
export default Symbol;