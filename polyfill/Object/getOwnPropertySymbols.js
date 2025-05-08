import { Object } from "../../native/Object";
import { isPrimitive } from "../../utils/isPrimitive";
import { getOwnPropertySymbols as symbol_getOwnPropertySymbols } from "../../impl/Symbol";

var getOwnPropertySymbols = Object.getOwnPropertySymbols;
if(getOwnPropertySymbols) {
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