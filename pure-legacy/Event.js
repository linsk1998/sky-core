import { Event as native_Event } from "../native/Event";
import { isFunction } from "../utils/isFunction";
import { Event$ff } from "../impl/event/Event$ff";

var Event = native_Event;
if(isFunction(Event)) {
	try {
		new Event();
	} catch(e) {
		Event = Event$ff;
	}
} else {
	Event = Event$ff;
}

export default Event;
