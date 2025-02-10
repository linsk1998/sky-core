import { toString } from "../native/Object/prototype/toString";

export function isRegExp(obj) {
	return toString.call(obj) === '[object RegExp]';
};