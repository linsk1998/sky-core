import { forOwn } from "sky-core/utils/forOwn";
import { isString } from "../../utils/isString";

export function assign(target, varArgs) {
	if(target == null) {
		throw new TypeError('Cannot convert undefined or null to object');
	}
	var to = Object(target);
	for(var i = 1; i < arguments.length; i++) {
		var obj = arguments[i];
		if(obj != null) {
			var j;
			if(isString(obj)) {
				for(j = 0; j < obj.length; j++) {
					to[j] = obj.charAt(j);
				}
			} else {
				forOwn(obj, function(value, key) {
					to[key] = value;
				});
				var ownKeys = Object.getOwnPropertySymbols(obj);
				for(j = 0; j < ownKeys.length; j++) {
					var key = ownKeys[j];
					to[key] = obj[key];
				}
			}
		}
	}
	return to;
}