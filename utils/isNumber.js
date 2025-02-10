import { toString } from "../native/Object/prototype/toString";

export function isNumber(obj) {
	return toString.call(obj) === '[object Number]';
};