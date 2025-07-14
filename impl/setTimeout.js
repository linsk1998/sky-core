import { slice } from "../native/Array/prototype/slice";
import { setTimeout as native_setTimeout } from "../native/setTimeout";

export function setTimeout(cb) {
	var ms = arguments[1];
	if(arguments.length <= 2) {
		return native_setTimeout(cb, ms);
	}
	var args = slice.call(arguments, 2);
	var cba = function() {
		cb.apply(this, args);
	};
	return native_setTimeout(cba, ms);
}