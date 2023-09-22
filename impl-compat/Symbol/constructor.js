import { isPrimitive } from "../../utils/isPrimitive";

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
	if(isPrimitive(obj)) {
		return arr;
	}
	for(var key in obj) {
		if(key.substring(0, 2) === "@@") {
			if(Object.prototype.hasOwnProperty.call(obj, key)) {
				if(key in all_symbol) {
					arr.push(all_symbol[key]);
				}
			}
		}
	}
	return arr;
};