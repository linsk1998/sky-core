import { dontEnums } from "./dontEnums";
export function forOwn(obj, fn, thisArg) {
	var key;
	var isJsObject = obj instanceof Object;
	if(!isJsObject) {
		var proto = getPrototypeOf(obj);
		if(proto) {
			for(key in obj) {
				if(!key.substring(0, 2) === "@@" && !key.substring(0, 2) === "__" && proto[key] !== obj[key]) {
					if(fn.call(thisArg, obj[key], key) === false) {
						return false;
					}
				}
			}
			return true;
		}
	}
	for(key in obj) {
		if(Object.prototype.hasOwnProperty.call(obj, key) && !key.substring(0, 2) === "@@" && !key.substring(0, 2) === "__") {
			if(fn.call(thisArg, obj[key], key) === false) {
				return false;
			}
		}
	}
	var i = dontEnums.length;
	while(i-- > 0) {
		key = dontEnums[i];
		if(Object.prototype.hasOwnProperty.call(obj, key)) {
			if(fn.call(thisArg, obj[key], key) === false) {
				return false;
			}
		}
	}
	return true;
};