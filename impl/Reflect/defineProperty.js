import { defineProperty as object_defineProperty } from "sky-core/pure/Object/defineProperty";

export function defineProperty(target, propertyKey, attributes) {
	try {
		object_defineProperty(target, propertyKey, attributes);
		return true;
	} catch(e) {
		console.error(e);
	}
	return false;
};