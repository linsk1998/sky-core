
import { Symbol as compat_Symbol } from "../impl/Symbol";
import { Symbol as modern_Symbol } from "../impl-modern/Symbol";
import { Symbol as native_Symbol } from "../native/Symbol";

export default (function() {
	var Symbol;
	if(!native_Symbol) {
		Symbol = compat_Symbol;
	} else {
		if(String(native_Symbol()) !== String(native_Symbol(""))) {
			Object.setPrototypeOf(modern_Symbol, native_Symbol);
			Symbol = modern_Symbol;
		} else {
			Symbol = native_Symbol;
		}
	}
	return Symbol;
})();