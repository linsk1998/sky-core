import "sky-core/polyfill/Array/prototype/map";
import { flat } from "./flat";

export function flatMap(fn) {
	return flat.call(this.map(fn, arguments[1]), 1);
}