import { Date as native_Date } from "../native/Date";
import { isString } from "../utils/isString";
function Date(str) {
	var arr;
	if(isString(str)) {
		if(arr = str.match(/^(\d{4})\-(\d{2})\-(\d{2})$/)) {
			return native_Date.UTC(this, parseInt(arr[1]), parseInt(arr[2]) - 1, parseInt(arr[3]));
		}
		if(arr = str.match(/^(\d{4})\-(\d{2})\-(\d{2})T(\d{2}):(\d{2}):(\d{2})Z$/)) {
			return native_Date.UTC(parseInt(arr[1]), parseInt(arr[2]) - 1, parseInt(arr[3]), parseInt(arr[4]), parseInt(arr[5]), parseInt(arr[6]));
		}
		if(arr = str.match(/^(\d{4})\-(\d{2})\-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)Z$/)) {
			return native_Date.UTC(parseInt(arr[1]), parseInt(arr[2]) - 1, parseInt(arr[3]), parseInt(arr[4]), parseInt(arr[5]), parseInt(arr[6]), parseFloat(arr[7]) * 1000);
		}
	}
	switch(arguments.length){
		case 0:
			return new native_Date();
		case 1:
			return new native_Date(str);
		case 3:
			return new native_Date(str,arguments[1],arguments[2]);
		case 4:
			return new native_Date(str,arguments[1],arguments[2],arguments[3]);
		case 5:
			return new native_Date(str,arguments[1],arguments[2],arguments[4],arguments[5]);
		case 6:
			return new native_Date(str,arguments[1],arguments[2],arguments[4],arguments[5],arguments[6]);
		case 7:
			return new native_Date(str,arguments[1],arguments[2],arguments[4],arguments[5],arguments[6],arguments[7]);
	}
	return native_Date.apply(this, arguments);
}
Date.prototype = native_Date.prototype;

export { Date };