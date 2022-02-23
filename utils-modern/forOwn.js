
export function forOwn(obj, fn, thisArg) {
	if(obj) {
		thisArg = thisArg || undefined;
		for(var key in obj) {
			if(!key.startsWith("@@") && Object.prototype.hasOwnProperty.call(obj, key)) {
				if(fn.call(thisArg, obj[key], key) === false) {
					return false;
				}
			}
		}
		return true;
	}
	return false;
};