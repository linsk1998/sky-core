var symbol_sqe = 0;
export var allSymbols = {};

export function symbol(desc) {
	if(this instanceof symbol) {
		throw new TypeError("Symbol is not a constructor");
	}
	return new Symbol(desc);
};
symbol.sham = true;
export function Symbol(desc) {
	if(desc !== undefined) {
		this.description = String(desc);
	}
	this.__name__ = "@@" + desc + ":" + symbol_sqe;
	symbol_sqe++;
	allSymbols[this.__name__] = this;
}
Symbol.prototype.toString = function() {
	return this.__name__;
};
Symbol.prototype.toJSON = function() {
	return undefined;
};