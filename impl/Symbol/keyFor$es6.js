
import { key_cache } from "./for$es6";
export function keyFor(symbol) {
	if(typeof symbol !== "symbol") {
		throw new TypeError(symbol + " is not a symbol");
	}
	return key_cache[symbol];
};
