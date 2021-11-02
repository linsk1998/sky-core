import { nonEnumerable } from "../../support/nonEnumerable";
import { defineProperty } from "../../native/Object/defineProperty";
var symbol_sqe = 0;
var all_symbol = {};
export function Symbol(desc) {
	var key = "@@" + desc + ":" + symbol_sqe;
	this.__name__ = key;
	if(nonEnumerable) {
		defineProperty(Object.prototype, key, {
			enumerable: false, configurable: true, writable: true,
			set: function(value) {
				defineProperty(this, key, {
					enumerable: false, configurable: true, writable: true, value: value
				});
			}
		});
	}
	if(desc !== undefined) {
		this.description = String(desc);
	}
	symbol_sqe++;
	all_symbol[key] = this;
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