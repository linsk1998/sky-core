import { nonEnumerable } from "../../support/nonEnumerable";
import { defineProperty } from "../../native/Object/defineProperty";
var symbol_sqe = 0;
var all_symbol = {};
export function Symbol(desc) {
	var key = "@@" + desc + ":" + symbol_sqe;
	this.__name__ = key;
	if(nonEnumerable) {
		defineProperty(Object.prototype, key, {
			enumerable: false, configurable: true,
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
	var keys = Object.getOwnPropertyNames(obj);
	var i = keys.length;
	while(i-- > 0) {
		var key = keys[i];
		if(key.substring(0, 2) === "@@") {
			arr.push(all_symbol[key]);
		}
	}
	return arr;
};