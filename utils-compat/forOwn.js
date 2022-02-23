import { dontEnums } from "./dontEnums";
export function forOwn(obj, fn, thisArg) {
	var key;
	var isJsObject = obj instanceof Object;
	if(!isJsObject) {
		var proto = getPrototypeOf(obj);
		if(proto) {
			for(key in obj) {
				if(!key.startsWith("@@") && !key.startsWith("__") && proto[key] !== obj[key]) {
					if(fn.call(thisArg, obj[key], key) === false) {
						return false;
					}
				}
			}
			return true;
		}
	}
	for(key in obj) {
		if(Object.prototype.hasOwnProperty.call(obj, key) && !key.startsWith("@@") && !key.startsWith("__")) {
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