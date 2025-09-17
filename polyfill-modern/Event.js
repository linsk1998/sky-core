import { Event } from "../native/Event";
import { isFunction } from "../utils/isFunction";

var supportEvent = isFunction(Event);
if(supportEvent) {
	try {
		new Event("");
	} catch(e) {
		supportEvent = false;
	}
}

if(!supportEvent) {
	if(document.createEvent) {
		window.Event = function(type, init) {
			var e = document.createEvent('Event');
			e.isTrusted = false;
			if(init) {
				e.initEvent(type, init.bubbles, init.cancelable);
			} else {
				e.initEvent(type, false, false);
			}
			return e;
		};
	}
}