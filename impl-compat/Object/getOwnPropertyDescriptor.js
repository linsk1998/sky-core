import { getOwnPropertyDescriptor as native_getOwnPropertyDescriptor } from "../../native/Object/getOwnPropertyDescriptor";

export function getOwnPropertyDescriptor(obj, prop) {
	var key = '@@desc:' + prop;
	if(Object.prototype.hasOwnProperty.call(obj, key)) {
		return obj[key];
	}
	if(Object.prototype.hasOwnProperty.call(obj, prop)) {
		return { value: obj[prop], writable: true, enumerable: true, configurable: true };
	}
};
export function ie8_getOwnPropertyDescriptor(obj, prop) {
	if(obj instanceof Object) {
		return getOwnPropertyDescriptor.apply(Object, arguments);
	} else {
		return native_getOwnPropertyDescriptor.apply(Object, arguments);
	}
};