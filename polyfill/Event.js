import { Event } from "../native/Event";
import { isFunction } from "../utils/isFunction";
import { Event$ff } from "../impl/event/Event$ff";
import { Event$ie } from "../impl/event/Event$ie";

if(isFunction(Event)) {
	try {
		new Event();
	} catch(e) {
		window.Event = Event$ff;
	}
} else {
	if(document.createEvent) {
		window.Event = Event$ff;
	} else {
		window.Event = Event$ie;
	}
}
