import { isFunction } from "./isFunction";
export function aFunction(it) {
	if(!isFunction(it)) {
		throw TypeError(String(it) + ' is not a function');
	} return it;
}