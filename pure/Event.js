import { Event as native_Event } from "../native/Event";
import { isFunction } from "../utils/isFunction";
import { Event$ff } from "../impl/event/Event$ff";
import { Event$ie } from "../impl/event/Event$ie";

var Event = native_Event;
if(isFunction(Event)) {
	try {
		new Event();
	} catch(e) {
		Event = Event$ff;
	}
} else {
	if(document.createEvent) {
		Event = Event$ff;
	} else {
		Event = Event$ie;
	}
}

export default Event;
