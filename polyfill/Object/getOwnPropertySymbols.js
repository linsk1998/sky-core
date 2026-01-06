import { Object } from "../../native/Object";
import { getOwnPropertySymbols as native_getOwnPropertySymbols } from "../../native/Object/getOwnPropertySymbols";
import { getOwnPropertyNames } from "../../native/Object/getOwnPropertyNames";
import { isPrimitive } from "../../utils/isPrimitive";
import { getOwnPropertySymbols as getOwnPropertySymbols$enum, getOwnPropertySymbols$property } from "../../impl/Object/getOwnPropertySymbols";

if(native_getOwnPropertySymbols) {
	try {
		native_getOwnPropertySymbols(0);
	} catch(e) {
		Object.getOwnPropertySymbols = function(obj) {
			if(isPrimitive(obj)) {
				return [];
			}
			return native_getOwnPropertySymbols(obj);
		};
	}
} else if(getOwnPropertyNames) {
	Object.getOwnPropertySymbols = getOwnPropertySymbols$property;
} else {
	Object.getOwnPropertySymbols = getOwnPropertySymbols$enum;
}