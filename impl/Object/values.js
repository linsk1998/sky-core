import { forOwn } from "sky-core/utils/forOwn";
export function values(obj) {
	var r = [];
	forOwn(obj, function(value, key) {
		r.push(value);
	});
	return r;
}