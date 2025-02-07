import { isFunction } from "../utils/isFunction";
import { Event } from "../native/Event";

// IE 有个全局对象 Event
if(!isFunction(Event)) {
	if(document.createEventObject) {
		window.Event = function(type, init) {
			var e = document.createEventObject();
			e.type = type;
			e.isTrusted = false;
			if(init) {
				e.bubbles = init.bubbles;
				e.cancelable = init.cancelable;
			} else {
				e.bubbles = false;
				e.cancelable = false;
			}
			return e;
		};
	}
}