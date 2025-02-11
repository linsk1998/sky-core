import { slice } from "../../../native/Array/prototype/slice";
import { addEvent } from "../../../utils-compat/addEvent";

export function addEventListener(el, ev, cb, options) {
	if(el.addEventListener) {
		var args = slice.call(arguments, 1);
		el.addEventListener.apply(el, args);
	} else {
		addEvent(el, ev, cb, options);
	}
}