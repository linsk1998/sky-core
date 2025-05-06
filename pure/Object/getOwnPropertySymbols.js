import { Object } from "../../native/Object";
import { getOwnPropertySymbols } from "../../impl/Symbol/constructor";
import { isPrimitive } from "../../utils/isPrimitive";
import { getOwnPropertySymbols as symbol_getOwnPropertySymbols } from "../../impl/Symbol/constructor";

var getOwnPropertySymbols = Object.getOwnPropertySymbols;
if(getOwnPropertySymbols) {
	try {
		getOwnPropertySymbols(0);
	} catch(e) {
		getOwnPropertySymbols = function(obj) {
			if(isPrimitive(obj)) {
				return [];
			}
			return getOwnPropertySymbols(obj);
		};
	}
} else {
	getOwnPropertySymbols = symbol_getOwnPropertySymbols;
}
export default getOwnPropertySymbols;