import { flat } from "./flat";
import map from "sky-core/pure/Array/prototype/map";
export function flatMap(fn) {
	return flat.call(map.call(this, fn, arguments[1]), 1);
}