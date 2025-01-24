import { isNotNullObject } from "../utils/isNotNullObject";
import { detachEvent } from "./detachEvent";

export function removeEvent(el, ev, cb, options) {
	var bubble;
	if(isNotNullObject(options)) {
		bubble = !options.capture;
	} else {
		bubble = !options;
	}
	var listeners = el.__listeners;
	var i, listener;
	if(listeners) {
		i = listeners.length;
		while(i--) {
			listener = listeners[i];
			if(listener[1] === ev && listener[2] === cb && listener[3] === bubble) {
				detachEvent(el, ev, listener[0]);
				listeners.splice(i, 1);
			}
		}
	}
}