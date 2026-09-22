import { definePrototype } from "sky-core/utils/definePrototype";
import { Element } from "../../../native/Element";
import { slice } from "../../../native/Array/prototype/slice";
import { dispatchEvent } from "../../../utils-compat/dispatchEvent";

if(Element) {
	definePrototype(Element, 'dispatchEvent', function() {
		var args = slice.call(arguments);
		args.unshift(this);
		dispatchEvent.apply(this, args);
	});
}