
var symbol_sqe = 0;
var all_symbol = {};
export function Symbol(desc) {
	this.__name__ = "@@" + desc + ":" + symbol_sqe;
	this.description = desc;
	symbol_sqe++;
	all_symbol[this.__name__] = this;
};
Symbol.prototype.toString = function() {
	return this.__name__;
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