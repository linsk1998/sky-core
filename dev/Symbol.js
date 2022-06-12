var native_Symbol = this.Symbol;
this.Symbol = function Symbol() {
	return native_Symbol.apply(this, arguments);
};
Symbol.prototype = native_Symbol.prototype;
Symbol.iterator = native_Symbol.iterator;
Symbol.hasInstance = native_Symbol.hasInstance;
Symbol.asyncIterator = native_Symbol.asyncIterator;
// 其他目前不支持;
Object.defineProperties(Symbol, {
	species: {
		get() {
			throw new TypeError("Symbol.species is unsafe");
		},
		configurable: false
	},
	isConcatSpreadable: {
		get() {
			throw new TypeError("Symbol.isConcatSpreadable is unsafe");
		},
		configurable: false
	},
	match: {
		get() {
			throw new TypeError("Symbol.match is unsafe");
		},
		configurable: false
	},
	matchAll: {
		get() {
			throw new TypeError("Symbol.matchAll is unsafe");
		},
		configurable: false
	},
	replace: {
		get() {
			throw new TypeError("Symbol.replace is unsafe");
		},
		configurable: false
	},
	replace: {
		get() {
			throw new TypeError("Symbol.replace is unsafe");
		},
		configurable: false
	},
	search: {
		get() {
			throw new TypeError("Symbol.search is unsafe");
		},
		configurable: false
	},
	split: {
		get() {
			throw new TypeError("Symbol.split is unsafe");
		},
		configurable: false
	},
	toPrimitive: {
		get() {
			throw new TypeError("Symbol.toPrimitive is unsafe");
		},
		configurable: false
	},
	toStringTag: {
		get() {
			throw new TypeError("Symbol.toStringTag is unsafe");
		},
		configurable: false
	},
	unscopables: {
		get() {
			throw new TypeError("Symbol.unscopables is unsafe");
		},
		configurable: false
	},
});