import { defineProperty } from "../../../native/Object/defineProperty";

export function defineProperty$v8(obj, prop, descriptor) {
	if(descriptor.configurable && descriptor.writable && 'value' in descriptor) {
		defineProperty(obj, {
			configurable: true,
			enumerable: false,
			writable: false,
			value: descriptor
		}, descriptor);
		// var value = descriptor.value;
		// return defineProperty(obj, prop, {
		// 	get: function() { return value; },
		// 	set: function(v) { value = v; },
		// 	enumerable: false,
		// 	configurable: true
		// });
	}
	return defineProperty(obj, prop, descriptor);
};