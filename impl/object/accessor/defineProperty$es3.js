import { anObject } from "../../../utils/anObject";

export function defineProperty$es3(obj, prop, description) {
	anObject(obj);
	prop = String(prop);
	var descriptor = {
		configurable: true,
		enumerable: true,
		writable: true
	};
	if('value' in description) {
		obj[prop] = description.value;
		descriptor.value = description.value;
	} else {
		descriptor.get = description.get;
		descriptor.set = description.set;
	}
	obj['@@desc:' + prop] = descriptor;
	return obj;
};
defineProperty$es3.sham = true;
