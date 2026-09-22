import { slice } from "../native/Array/prototype/slice";
import { setInterval as native_setInterval } from "../native/setInterval";

export function setInterval(cb) {
	var ms = arguments[1];
	if(arguments.length <= 2) {
		return native_setInterval(cb, ms);
	}
	var args = slice.call(arguments, 2);
	var cba = function() {
		cb.apply(this, args);
	};
	return native_setInterval(cba, ms);
}