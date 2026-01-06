import { getOwnPropertySymbols as native_getOwnPropertySymbols } from "../../native/Object/getOwnPropertySymbols";
import { getOwnPropertyNames } from "../../native/Object/getOwnPropertyNames";
import { isPrimitive } from "../../utils/isPrimitive";
import { getOwnPropertySymbols as getOwnPropertySymbols$enum, getOwnPropertySymbols$property } from "../../impl/Object/getOwnPropertySymbols";

var getOwnPropertySymbols;
if(native_getOwnPropertySymbols) {
	try {
		native_getOwnPropertySymbols(0);
		getOwnPropertySymbols = native_getOwnPropertySymbols;
	} catch(e) {
		getOwnPropertySymbols = function(obj) {
			if(isPrimitive(obj)) {
				return [];
			}
			return native_getOwnPropertySymbols(obj);
		};
	}
} else if(getOwnPropertyNames) {
	getOwnPropertySymbols = getOwnPropertySymbols$property;
} else {
	getOwnPropertySymbols = getOwnPropertySymbols$enum;
}
export default getOwnPropertySymbols;