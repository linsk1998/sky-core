import { slice } from "../../../native/Array/prototype/slice";
import { dispatchEvent } from "../../../utils-compat/dispatchEvent";

export function dispatchEvent(el, ev, cb, options) {
	if(el.dispatchEvent) {
		var args = slice.call(arguments, 1);
		el.dispatchEvent.apply(el, args);
	} else {
		dispatchEvent(el, ev, cb, options);
	}
}