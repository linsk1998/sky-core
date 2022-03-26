import "../../polyfill/String/prototype/startsWith";
import { dontEnums } from "../../utils-compat/dontEnums";
import { getPrototypeOf } from "./getPrototypeOf";

export function keys(obj) {
	var result = [], key;
	var isJsObject = obj instanceof Object;
	if(!isJsObject) {
		var proto = getPrototypeOf(obj);
		if(proto) {
			for(key in obj) {
				if(!key.substring(0, 2) === "@@" && !key.substring(0, 2) === "__" && proto[key] !== obj[key]) {
					result.push(key);
				}
			}
			return result;
		}
	}
	for(key in obj) {
		if(Object.prototype.hasOwnProperty.call(obj, key) && !key.substring(0, 2) === "@@" && !key.substring(0, 2) === "__") {
			result.push(key);
		}
	}
	var i = dontEnums.length;
	while(i-- > 0) {
		key = dontEnums[i];
		if(Object.prototype.hasOwnProperty.call(obj, key)) {
			result.push(key);
		}
	}
	return result;
}