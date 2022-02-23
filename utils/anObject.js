import { isNotNullObject } from "sky-core";
export function anObject(it) {
	if(!isNotNullObject(it)) {
		throw TypeError(String(it) + ' is not a object');
	} return it;
}