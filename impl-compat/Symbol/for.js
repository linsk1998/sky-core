import { Symbol } from "./Symbol";
var symbol_cache = {};
export default function(desc) {
	if(Object.prototype.hasOwnProperty.call(symbol_cache, desc)) {
		return symbol_cache[desc];
	}
	var s = Symbol(desc);
	s.__key__ = desc;
	symbol_cache[desc] = s;
	return s;
};