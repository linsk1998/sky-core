import { isString } from "../../utils/isString";
import { isArrayLike } from "../../utils/isArrayLike";
export function from(arrayLike, mapFn, thisArg) {
	var arr;
	if(isString(arrayLike)) {
		arr = new Array();
		for(var i = 0; i < arrayLike.length; i++) {
			arr.push(arrayLike.charAt(i));
		}
	} else if(isArrayLike(arrayLike)) {
		try {
			arr = Array.prototype.slice.call(arrayLike);
		} catch(e) {
			arr = new Array();
			for(var i = 0; i < arrayLike.length; i++) {
				arr.push(arrayLike[i]);
			}
		}
	} else {
		arr = new Array();
		var entries = arrayLike[Symbol.iterator];
		if(entries) {
			var it = entries.call(arrayLike);
			while(true) {
				var next = it.next();
				if(next.done) break;
				arr.push(next.value);
			}
		}
	}
	if(mapFn) {
		arr = arr.map(mapFn, thisArg);
	}
	return arr;
};