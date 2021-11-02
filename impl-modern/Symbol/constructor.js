
var symbol_sqe = 0;
var all_symbol = {};
export function Symbol(desc) {
	this.__name__ = "@@" + desc + ":" + symbol_sqe;
	if(desc !== undefined) {
		this.description = String(desc);
	}
	symbol_sqe++;
	all_symbol[this.__name__] = this;
};
Symbol.prototype.toString = function() {
	return this.__name__;
};
Symbol.prototype.toJSON = function() {
	return undefined;
};
export function getOwnPropertySymbols(obj) {
	var arr = [];
	for(var key in obj) {
		if(key.startsWith("@@")) {
			if(Object.prototype.hasOwnProperty.call(obj, key)) {
				arr.push(all_symbol[key]);
			}
		}
	}
	return arr;
};