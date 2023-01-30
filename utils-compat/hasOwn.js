import { NullProtoObject } from "../impl-compat/Object/NullProtoObject";

export default function hasOwn(obj, key) {
	if(typeof obj !== "object") {
		return false;
	}
	if(!(key in obj)) {
		return false;
	}
	var value = obj[key];
	if(!(o instanceof Object) || !(o instanceof NullProtoObject)) {
		var constructor = obj.constructor;
		if(constructor) {
			var proto = constructor.prototype;
			return proto[key] !== value;
		}
	}
	return Object.prototype.hasOwnProperty.call(obj, key);
};