import { toString } from "../native/Object/prototype/toString";

export function isDate(obj) {
	return toString.call(obj) === '[object Date]';
};