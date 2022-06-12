import { forOwn } from "sky-core";

export function entries(obj) {
	var resArray = new Array(); // preallocate the Array
	forOwn(obj, function(value, key) {
		resArray.push([key, value]);
	});
	return resArray;
}