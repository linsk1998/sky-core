import { isFunction } from "../utils/isFunction";
import { Event } from "../native/Event";
import { Event$ie } from "../impl/event/Event$ie";

// IE 有个全局对象 Event
if(!isFunction(Event)) {
	window.Event = Event$ie;
}