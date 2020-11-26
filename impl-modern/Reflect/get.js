import { getOwnPropertyDescriptor } from "sky-core/pure/Object/getOwnPropertyDescriptor";
import { getPrototypeOf } from "sky-core/pure/Object/getPrototypeOf";
export function get(target, propertyKey, receiver) {
	if(receiver === void 0) { receiver = target; }
	var o = target, attributes;
	do {
		attributes = getOwnPropertyDescriptor(o, propertyKey);
		if(attributes) {
			if(attributes.get) {
				return attributes.get.call(receiver);
			}
			return attributes.value;
		}
		o = getPrototypeOf(o);
	} while(o && o !== Object.prototype);
	return target[propertyKey];
};