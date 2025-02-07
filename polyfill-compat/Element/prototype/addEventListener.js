import { definePrototype } from "sky-core/utils/definePrototype";
import { Element } from "../../../native/Element";
import { slice } from "../../../native/Array/prototype/slice";
import { addEvent } from "../../../utils-compat/addEvent";

if(Element) {
	definePrototype(Element, 'addEventListener', function() {
		var args = slice.call(arguments);
		args.unshift(this);
		addEvent.apply(this, args);
	});
}