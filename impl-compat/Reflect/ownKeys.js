import { allSymbols } from "../Symbol";

export function ownKeys(obj) {
	var r = [];
	for(var key in obj) {
		if(Object.hasOwn(obj, key)) {
			if(key.slice(0, 2) == "@@") {
				if(key in allSymbols) {
					r.push(allSymbols[key]);
				}
			} else {
				r.push(key);
			}
		}
	}
	return r;
};