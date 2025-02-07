import { definePrototype } from "sky-core/utils/definePrototype";
import { Element } from "../../../native/Element";
import { slice } from "../../../native/Array/prototype/slice";
import { removeEvent } from "../../../utils-compat/removeEvent";

if(Element) {
	definePrototype(Element, 'removeEventListener', function() {
		var args = slice.call(arguments);
		args.unshift(this);
		removeEvent.apply(this, args);
	});
}