import { nonEnumerable } from "../support/nonEnumerable";
import { defineProperty } from "../native/Object/defineProperty";

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
	allSymbols[key] = this;
};
Symbol.prototype.toString = function() {
	return this.__name__;
};
Symbol.prototype.toJSON = function() {
	return undefined;
};
