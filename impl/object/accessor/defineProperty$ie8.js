import { defineProperty } from "../../../native/Object/defineProperty";
import { NullProtoObject } from "sky-core/utils/NullProtoObject";
import { defineProperty$es3 } from "./defineProperty$es3";

export function defineProperty$ie8(obj, prop, descriptor) {
	if(obj instanceof Object || obj instanceof NullProtoObject) {
		defineProperty$es3.apply(Object, arguments);
	} else if(window == obj || obj instanceof Element || obj instanceof HTMLDocument) {
		if('value' in descriptor) {
			defineProperty.call(Object, prop, {
				configurable: true,
				enumerable: true,
				writable: true,
				value: descriptor.value
			});
		} else {
			defineProperty.call(Object, prop, {
				configurable: true,
				get: descriptor.get,
				set: descriptor.set
			});
		}
	} else {
		defineProperty$es3.apply(Object, arguments);
	}
	return obj;
};
defineProperty$ie8.sham = true;
