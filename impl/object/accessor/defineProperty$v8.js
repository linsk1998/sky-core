import { defineProperty } from "../../../native/Object/defineProperty";

export function defineProperty$v8(obj, prop, descriptor) {
	if(descriptor.configurable && descriptor.writable && 'value' in descriptor) {
		var value = descriptor.value;
		return defineProperty(obj, prop, {
			get: function() {
				return value;
			},
			set: function(v) {
				value = v;
			},
			enumerable: descriptor.enumerable,
			configurable: true
		});
	}
	return defineProperty(obj, prop, descriptor);
};
