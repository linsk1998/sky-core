import { slice } from "../../../native/Array/prototype/slice";
import { removeEvent } from "../../../utils-compat/removeEvent";

export function removeEventListener(el, ev, cb, options) {
	if(el.removeEventListener) {
		var args = slice.call(arguments, 1);
		el.removeEventListener.apply(el, args);
	} else {
		removeEvent(el, ev, cb, options);
	}
}