import { Symbol as native_Symbol } from "../native/Symbol";
import { Symbol as SymbolConstructor } from "../impl/Symbol/constructor";
var Symbol;
if(native_Symbol) {
	var descs = Object.create(null);
	Symbol = function Symbol() {
		var desc = arguments[0];
		if(desc !== undefined) {
			desc = String(desc);
		}
		var s = native_Symbol(desc);
		descs[s] = desc;
		return s;
	};
	Object.setPrototypeOf(Symbol, native_Symbol);
	Object.defineProperty(native_Symbol.prototype, 'description', {
		configurable: true,
		enumerable: false,
		get: function() {
			if(this in descs) {
				return descs[this];
			}
			return String(this).slice(7, -1);
		}
	});
} else {
	Symbol = function Symbol(desc) {
		return new SymbolConstructor(desc);
	};
	Symbol.sham = true;
}
export default Symbol;