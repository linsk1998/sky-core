import { isPrimitive } from "../../../utils/isPrimitive";
import { allSymbols } from "../../Symbol/Symbol";

export function getOwnPropertySymbols(obj) {
	var arr = [];
	if(isPrimitive(obj)) {
		return arr;
	}
	for(var key in obj) {
		if(key.slice(0, 2) === "@@") {
			if(Object.hasOwn(obj, key) && key in allSymbols) {
				arr.push(allSymbols[key]);
			}
		}
	}
	return arr;
}
