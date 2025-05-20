import { Object } from "../../native/Object";
import { Symbol } from "../../native/Symbol";
import { isPrimitive } from "../../utils/isPrimitive";
import { getOwnPropertySymbols as symbol_getOwnPropertySymbols } from "../../impl/Symbol";

if(Symbol) {
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	try {
		getOwnPropertySymbols(0);
	} catch(e) {
		Object.getOwnPropertySymbols = function(obj) {
			if(isPrimitive(obj)) {
				return [];
			}
			return getOwnPropertySymbols(obj);
		};
	}
} else {
	Object.getOwnPropertySymbols = symbol_getOwnPropertySymbols;
}