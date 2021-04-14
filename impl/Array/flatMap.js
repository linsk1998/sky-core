import { flat } from "./flat";
import "sky-core/polyfill/Array/prototype/map";
export function flatMap(array, fn, thisArg) {
	return flat(array.map(fn, thisArg), 1);
}