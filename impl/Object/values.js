import { forOwn } from "sky-core/utils/forOwn";
import { isString } from "../../utils/isString";
export function values(obj) {
	var r = [], key;
	if(isString(obj)) {
		for(key = 0; key < obj.length; key++) {
			r.push(obj.substr(key, 1));
		}
	} else if(Array.isArray(obj)) {
		for(key = 0; key < obj.length; key++) {
			r.push(obj[key]);
		}
	} else {
		forOwn(obj, function(value, key) {
			r.push(value);
		});
	}
	return r;
}