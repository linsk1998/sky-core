import { toString } from "../native/Object/prototype/toString";

export function isString(obj) {
	return toString.call(obj) === '[object String]';
};