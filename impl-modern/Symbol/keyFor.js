import { key_cache } from "./for";
export function keyFor(symbol) {
	if(typeof symbol !== "symbol") {
		throw new TypeError(symbol + " is not a symbol");
	}
	return key_cache[symbol];
};