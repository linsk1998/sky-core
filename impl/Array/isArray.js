import { toString } from "../../native/Object/prototype/toString";

export function isArray(obj) {
	return toString.call(obj) === '[object Array]';
}