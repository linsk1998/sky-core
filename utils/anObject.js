import { isNotNullObject } from "./isNotNullObject";
export function anObject(it) {
	if(!isNotNullObject(it)) {
		throw TypeError(String(it) + ' is not a object');
	} return it;
}