import { defineProperty } from '../native/Object/defineProperty';

export function definePrototype(target, property, value) {
	var prototype = target.prototype;
	if(!(property in prototype)) {
		if(defineProperty) {
			defineProperty(prototype, property, {
				configurable: true,
				writable: true,
				enumerable: false,
				value: value
			});
		} else {
			prototype[property] = value;
		}
	}
}