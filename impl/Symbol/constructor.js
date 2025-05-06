import { isPrimitive } from "../../utils/isPrimitive";
import { nonEnumerable } from "../../support/nonEnumerable";
import { defineProperty } from "../../native/Object/defineProperty";
import { getOwnPropertyNames } from "../../native/Object/getOwnPropertyNames";

var symbol_sqe = 0;
var all_symbol = {};

function Symbol(desc) {
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
var getOwnPropertySymbols = nonEnumerable ?
	function(obj) {
		var arr = [];
		if(isPrimitive(obj)) {
			return arr;
		}
		var keys = getOwnPropertyNames(obj);
		var i = keys.length;
		while(i-- > 0) {
			var key = keys[i];
			if(key.substring(0, 2) === "@@") {
				if(Object.hasOwn(all_symbol, key)) {
					arr.push(all_symbol[key]);
				}
			}
		}
		return arr;
	} : function(obj) {
		var arr = [];
		if(isPrimitive(obj)) {
			return arr;
		}
		for(var key in obj) {
			if(key.substring(0, 2) === "@@") {
				if(Object.hasOwn(obj, key)) {
					arr.push(all_symbol[key]);
				}
			}
		}
		return arr;
	};
export { Symbol, getOwnPropertySymbols };