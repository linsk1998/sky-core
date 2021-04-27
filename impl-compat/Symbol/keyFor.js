export function keyFor(symbol) {
	var s = String(symbol);
	if(s.indexOf("@@") !== 0) {
		throw new TypeError(s + " is not a symbol");
	}
	return symbol.__key__;
};