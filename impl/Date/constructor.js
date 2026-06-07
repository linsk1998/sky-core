import { Date as native_Date } from "../../native/Date";
import { slice } from "../../native/Array/prototype/slice";
import { isString } from "../../utils/isString";

function Date(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
	if(!(this instanceof Date)) return native_Date();
	var arr;
	if(isString(arg0)) {
		if(arr = arg0.match(/^(\d{4})\-(\d{2})\-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|([+-])(\d{2}):(\d{2}))?$/)) {
			var t = slice(arr, 1, 8);
			t[1] = t[1] - 1; // 月份转0起始
			t[6] = t[6] ? Math.floor(t[6] * 1000) : 0;
			var zone = arr[8];
			if(!zone) {
				return new native_Date(t[0], t[1], t[2], t[3], t[4], t[5], t[6]);
			}
			var base = native_Date.UTC.apply(native_Date.UTC, t);
			if(zone !== 'Z') {
				base += (arr[9] === '+' ? -1 : 1) * (arr[10] * 60 + arr[11] * 1) * 60000;
			}
			return new native_Date(base);
		}
	}
	switch(arguments.length) {
		case 0: return new native_Date();
		case 1: return new native_Date(arg0);
		case 2: return new native_Date(arg0, arg1);
		case 3: return new native_Date(arg0, arg1, arg2);
		case 4: return new native_Date(arg0, arg1, arg2, arg3);
		case 5: return new native_Date(arg0, arg1, arg2, arg3, arg4);
		case 6: return new native_Date(arg0, arg1, arg2, arg3, arg4, arg5);
	}
	return new native_Date(arg0, arg1, arg2, arg3, arg4, arg5, arg6);
}
Date.prototype = native_Date.prototype;
Date.parse = function(str) {
	return new Date(str).getTime();
};

export { Date };