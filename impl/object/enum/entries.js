import { forOwn, isString } from "sky-core";

export function entries(obj) {
	var resArray = new Array(); // preallocate the Array
	if(isString(obj)) {
		for(var i = 0; i < obj.length; i++) {
			resArray.push([String(i), obj.substr(i, 1)]);
		}
	} else {
		forOwn(obj, pushKeyValue, resArray);
	}
	return resArray;
}

function pushKeyValue(value, key) {
	this.push([key, value]);
}