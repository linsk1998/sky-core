import { Symbol as native_Symbol } from "../native/Symbol";
import { Symbol as es6_Symbol, getSymbolDescription } from "../impl/Symbol/Symbol$es6";
var Symbol;
if('description' in native_Symbol.prototype) {
	Symbol = native_Symbol;
} else {
	Symbol = es6_Symbol;
	Object.defineProperty(native_Symbol.prototype, 'description', {
		configurable: true,
		enumerable: false,
		get: getSymbolDescription
	});
}
export default Symbol;
