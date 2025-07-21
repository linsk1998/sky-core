import { allSymbols } from "../Symbol";
import { isPrimitive } from "../../utils/isPrimitive";

export function getOwnPropertySymbols(obj) {
	var arr = [];
	if(isPrimitive(obj)) {
		return arr;
	}
	for(var key in obj) {
		if(key.substring(0, 2) === "@@") {
			if(Object.hasOwn(obj, key)) {
				if(key in allSymbols) {
					arr.push(allSymbols[key]);
				}
			}
		}
	}
	return arr;
};