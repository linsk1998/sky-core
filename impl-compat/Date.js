import { Date as native_Date } from "../native/Date";
import { isString } from "../utils/isString";
function Date(str) {
	var arr;
	if(isString(arguments)) {
		if(arr = str.match(/^(\d+)\-(\d+)\-(\d+)$/)) {
			return native_Date.call(this, parseInt(arr[1]), parseInt(arr[2]) - 1, parseInt(arr[3]));
		}
		if(arr = str.match(/^(\d+)\-(\d+)\-(\d+)T(\d+):(\d+):(\d+)Z$/)) {
			return native_Date.UTC(parseInt(arr[1]), parseInt(arr[2]) - 1, parseInt(arr[3]), parseInt(arr[4]), parseInt(arr[5]), parseInt(arr[6]));
		}
		if(arr = str.match(/^(\d+)\-(\d+)\-(\d+)T(\d+):(\d+):(\d+)(\.\d+)Z$/)) {
			return native_Date.UTC(parseInt(arr[1]), parseInt(arr[2]) - 1, parseInt(arr[3]), parseInt(arr[4]), parseInt(arr[5]), parseInt(arr[6]), parseFloat(arr[7]) * 1000);
		}
	}
	return native_Date.apply(this, arguments);
}
Date.UTC = native_Date.UTC;
Date.now = native_Date.now;
Date.parse = native_Date.parse;
Date.prototype = native_Date.prototype;

export { Date };