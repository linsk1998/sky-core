(function() {
	if(typeof globalThis === "undefined") {
		this.globalThis = this;
	}

	if(!Number.isFinite) {
		Number.isFinite = function(value) {
			return typeof value === 'number' && isFinite(value);
		};
	}

	if(!Number.isNaN) {
		Number.isNaN = function(value) {
			return typeof value === "number" && isNaN(value);
		};
	}

	if(!Number.isInteger) {
		Number.isInteger = function(value) {
			return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
		};
	}

	if(!('MAX_SAFE_INTEGER' in Number)) {
		Number.MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
	}

	if(!('MIN_SAFE_INTEGER' in Number)) {
		Number.MIN_SAFE_INTEGER = -0x1FFFFFFFFFFFFF;
	}

	if(!Number.isSafeInteger) {
		Number.isSafeInteger = function(value) {
			return Number.isInteger(value) && Math.abs(value) <= Number.MAX_SAFE_INTEGER;
		};
	}

	if(!Number.parseFloat) Number.parseFloat = parseFloat;

	if(!Number.parseInt) Number.parseInt = parseInt;

	if(!String.prototype.trim) {
		String.prototype.trim = function trim() {
			return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
		};
	}

	if(!String.prototype.trimStart) {
		String.prototype.trimStart = function trimStart() {
			return this.replace(/^[\s\uFEFF\xA0]+/g, '');
		};
	}

	if(!String.prototype.trimEnd) {
		String.prototype.trimEnd = function trimEnd() {
			return this.replace(/[\s\uFEFF\xA0]+$/g, '');
		};
	}

	if(!String.prototype.endsWith) {
		String.prototype.endsWith = function endsWith(prefix, position) {
			var length = prefix.length;
			position = position < length ? position : this.length;
			return this.slice(position - length, position) === prefix;
		};
	}

	if(!String.prototype.startsWith) {
		String.prototype.startsWith = function startsWith(prefix, position) {
			if(prefix === null) { return false; }
			position = position ? position : 0;
			return this.slice(position, prefix.length) === prefix;
		};
	}

	if(!String.prototype.includes) {
		String.prototype.includes = function includes(search, start) {
			if(typeof start !== 'number') {
				start = 0;
			}
			if(start + search.length > this.length) {
				return false;
			} else {
				return this.indexOf(search, start) !== -1;
			}
		};
	}

	if(!String.prototype.repeat) {
		String.prototype.repeat = function repeat(count) {
			if(count < 0) {
				throw 'RangeError repeat count must be non-negative';
			}
			if(count == Number.POSITIVE_INFINITY) {
				throw 'RangeError repeat count must be less than infinity';
			}
			return new Array(count + 1).join(this);
		};
	}

	if(!String.prototype.padStart) {
		String.prototype.padStart = function padStart(targetLength, padString) {
			var x = targetLength - this.length;
			if(x < 0) return this + "";
			if(!padString) padString = " ";
			return padString.repeat(Math.ceil(x / padString.length)).substr(0, x) + this;
		};
	}

	if(!String.prototype.padEnd) {
		String.prototype.padEnd = function padEnd(targetLength, padString) {
			var x = targetLength - this.length;
			if(x < 0) return this + "";
			if(!padString) padString = " ";
			return this + padString.repeat(Math.ceil(x / padString.length)).substr(0, x);
		};
	}

	if(!Function.prototype.bind) {
		Function.prototype.bind = function(context) {
			var self = this, args = Array.prototype.slice.call(arguments, 1);
			return function() {
				return self.apply(context, args.concat(Array.prototype.slice.call(arguments)));
			};
		};
	}

	var symbol_sqe = 0;
	var all_symbol = {};
	function Symbol$1(desc) {
		this.__name__ = "@@" + desc + ":" + symbol_sqe;
		this.description = desc;
		symbol_sqe++;
		all_symbol[this.__name__] = this;
	} Symbol$1.prototype.toString = function() {
		return this.__name__;
	};
	function getOwnPropertySymbols(obj) {
		var arr = [];
		for(var key in obj) {
			if(key.startsWith("@@")) {
				if(Object.hasOwn(obj, key)) {
					arr.push(all_symbol[key]);
				}
			}
		}
		return arr;
	}

	function Symbol$2(desc) {
		return new Symbol$1(desc);
	} Symbol$2.sham = true;
	Symbol$2.asyncIterator = "@@asyncIterator";
	Symbol$2.hasInstance = "@@hasInstance";
	Symbol$2.isConcatSpreadable = "@@isConcatSpreadable";
	Symbol$2.iterator = "@@iterator";
	Symbol$2.match = "@@match";
	Symbol$2.matchAll = "@@matchAll";
	Symbol$2.replace = "@@replace";
	Symbol$2.search = "@@search";
	Symbol$2.species = "@@species";
	Symbol$2.split = "@@split";
	Symbol$2.toPrimitive = "@@toPrimitive";
	Symbol$2.toStringTag = "@@toStringTag";
	Symbol$2.unscopables = "@@unscopables";

	if(!globalThis.Symbol) {
		globalThis.Symbol = Symbol$2;
	}

	var symbol_cache = {};
	function compat_for(desc) {
		if(Object.hasOwn(symbol_cache, desc)) {
			return symbol_cache[desc];
		}
		var s = Symbol$2(desc);
		s.__key__ = desc;
		symbol_cache[desc] = s;
		return s;
	}

	if(!('for' in Symbol)) {
		Symbol['for'] = compat_for;
	}

	function keyFor(symbol) {
		return symbol.__key__;
	}

	if(!Symbol.keyFor) {
		Symbol.keyFor = keyFor;
	}

	if(!Object.getOwnPropertySymbols) {
		Object.getOwnPropertySymbols = getOwnPropertySymbols;
	}

	var dontEnums = [
		"toString",
		"toLocaleString",
		"valueOf",
		"hasOwnProperty",
		"isPrototypeOf",
		"propertyIsEnumerable"
	];

	function getPrototypeOf(obj) {
		if(typeof obj !== "object") {
			obj = Object(obj);
		}
		if(!('constructor' in obj)) {
			return null;
		}
		if(Object.hasOwn(obj, 'constructor')) {
			if('__proto__' in obj.constructor) {
				return obj.constructor.__proto__.prototype;
			}
		}
		return obj.constructor.prototype;
	}

	function keys(obj) {
		var result = [], key;
		var isJsObject = obj instanceof Object;
		if(!isJsObject) {
			var proto = getPrototypeOf(obj);
			if(proto) {
				for(key in obj) {
					if(!key.startsWith("@@") && !key.startsWith("__") && proto[key] !== obj[key]) {
						result.push(key);
					}
				}
				return result;
			}
		}
		for(key in obj) {
			if(Object.hasOwn(obj, key) && !key.startsWith("@@") && !key.startsWith("__")) {
				result.push(key);
			}
		}
		var i = dontEnums.length;
		while(i-- > 0) {
			key = dontEnums[i];
			if(Object.hasOwn(obj, key)) {
				result.push(key);
			}
		}
		return result;
	}

	if(!Object.keys) {
		Object.keys = keys;
	}

	var defineProperty = Object.defineProperty;

	function ie8_defineProperty(obj, prop, descriptor) {
		if(obj instanceof Object) {
			compat_defineProperty.apply(Object, arguments);
		} else {
			delete descriptor.enumerable;
			defineProperty.apply(Object, arguments);
		}
		return obj;
	}
	function compat_defineProperty(obj, prop, descriptor) {
		if('value' in descriptor) {
			obj[prop] = descriptor.value;
		} else {
			console.warn("ES3 do NOT support accessor.");
		}
		obj['@@desc:' + prop] = descriptor;
		return obj;
	}

	var $inject_Object_defineProperty = Object.defineProperty ? ie8_defineProperty : compat_defineProperty;

	function defineProperties(obj, properties) {
		var ownKeys = Object.keys(properties);
		var len = ownKeys.length;
		for(var i = 0; i < len; i++) {
			var key = ownKeys[i];
			$inject_Object_defineProperty(obj, key, properties[key]);
		}
	}

	var $inject_Object_defineProperties = Object.defineProperties || defineProperties;

	//var defineProperties = require("sky-core/pure/Object/defineProperties");
	function create$1(proto, properties) {
		function F() { }
		F.prototype = proto;
		var o = new F();
		if(properties) {
			$inject_Object_defineProperties(o, properties);
		}
		return o;
	}

	if(!Object.create) {
		Object.create = create;
	}

	if(!Object.getPrototypeOf) {
		Object.getPrototypeOf = getPrototypeOf;
	}

	var proto = !!Object.setPrototypeOf || !!Object.prototype.__proto__;

	function setPrototypeOf(obj, proto) {
		console.warn("ES3 do NOT support setPrototypeOf.");
		var o = create$1(proto);
		var key;
		for(key in obj) {
			if(Object.hasOwn(obj, key)) {
				o[key] = obj[key];
			}
		}
		var i = dontEnums.length;
		while(i-- > 0) {
			key = dontEnums[i];
			if(Object.hasOwn(obj, key)) {
				o[key] = obj[key];
			}
		}
		return o;
	}

	if(!proto) {
		Object.setPrototypeOf = setPrototypeOf;
	}

	function getOwnPropertyDescriptor(obj, prop) {
		var key = '@@desc:' + prop;
		if(Object.hasOwn(obj, key)) {
			return obj[key];
		}
		if(Object.hasOwn(obj, prop)) {
			return { value: obj[prop], writable: true, enumerable: true, configurable: true };
		}
	}

	if(!Object.getOwnPropertyDescriptor) {
		Object.getOwnPropertyDescriptor = getOwnPropertyDescriptor;
	}

	if(Object.defineProperty) {
		Object.defineProperty = ie8_defineProperty;
	} else {
		Object.defineProperty = compat_defineProperty;
	}
	Object.defineProperty.sham = true;

	function assign(target, varArgs) {
		if(target === null) {
			throw 'Cannot convert undefined or null to object';
		}
		var to = target;
		for(var i = 1; i < arguments.length; i++) {
			var obj = arguments[i];
			if(obj != null) {
				var ownKeys = Object.keys(obj);
				for(var j = 0; j < ownKeys.length; j++) {
					var key = ownKeys[j];
					to[key] = obj[key];
				}
			}
		}
		return to;
	}

	if(!Object.assign) {
		Object.assign = assign;
	}

	var defineProperties$1 = Object.defineProperties;

	if(!defineProperties$1) {
		if(Object.prototype.__defineSetter__) {
			Object.defineProperties = defineProperties;
		}
	}

	function is(x, y) {
		if(x === y) {// Steps 1-5, 7-10
			// Steps 6.b-6.e: +0 != -0
			return x !== 0 || 1 / x === 1 / y;
		} else {
			// Step 6.a: NaN == NaN
			return x !== x && y !== y;
		}
	}

	if(!Object.is) {
		Object.is = is;
	}

	function apply(target, thisArgument, argumentsList) {
		return Function.prototype.apply.call(target, thisArgument, argumentsList);
	}

	function construct(target, argumentsList, NewTarget) {
		var o = Object.create(target.prototype);
		if(!NewTarget) { NewTarget = o; }
		var o2 = apply(target, NewTarget, argumentsList);
		if(o2 !== void 0) {
			return o2;
		}
		return o;
	}

	function defineProperty$1(target, propertyKey, attributes) {
		try {
			$inject_Object_defineProperty(target, propertyKey, attributes);
			return true;
		} catch(e) {
			console.error(e);
		}
		return false;
	}

	function set(target, propertyKey, value, receiver) {
		if(receiver === void 0) { receiver = target; }
		var desc = target["@@desc:" + propertyKey];
		if(desc) {
			if(desc.set) {
				try {
					desc.set.call(receiver, value);
					return true;
				} catch(e) {
					return false;
				}
			}
			desc.value = value;
			return true;
		}
		target[propertyKey] = value;
		return true;
	}

	function get(target, propertyKey, receiver) {
		if(receiver === void 0) { receiver = target; }
		var desc = target["@@desc:" + propertyKey];
		if(desc) {
			if(desc.get) {
				return desc.get.call(receiver);
			}
			return desc.value;
		}
		return target[propertyKey];
	}

	function deleteProperty(target, prop) {
		delete target["@@desc:" + prop];
		delete target[prop];
	}

	if(!this.Reflect) {
		this.Reflect = {
			apply: apply,
			construct: construct,
			defineProperty: defineProperty$1,
			getPrototypeOf: getPrototypeOf,
			getOwnPropertyDescriptor: getOwnPropertyDescriptor,
			set: set,
			get: get,
			deleteProperty: deleteProperty
		};
	}

	if(!Array.prototype.indexOf) {
		Array.prototype.indexOf = function(e, fromIndex) {
			fromIndex = isNaN(fromIndex) ? 0 : fromIndex;
			for(var i = fromIndex, j; i < this.length; i++) {
				j = this[i];
				if(j === e) { return i; }
			}
			return -1;
		};
	}

	if(!Array.prototype.lastIndexOf) {
		Array.prototype.lastIndexOf = function(e, fromIndex) {
			var i = isNaN(fromIndex) ? this.length : fromIndex + 1;
			while(i--) {
				var j = this[i];
				if(j === e) { return i; }
			}
			return -1;
		};
	}

	if(!Array.prototype.forEach) {
		Array.prototype.forEach = function(callback, thisArg) {
			var len = this.length;
			for(var i = 0, j; i < len && i < this.length; i++) {
				j = this[i];
				callback.call(thisArg, j, i, this);
			}
		};
	}

	if(!Array.prototype.map) {
		Array.prototype.map = function(fn, context) {
			var arr = [];
			for(var k = 0, length = this.length; k < length; k++) {
				arr.push(fn.call(context, this[k], k, this));
			}
			return arr;
		};
	}

	if(!Array.prototype.filter) {
		Array.prototype.filter = function(fn, context) {
			var arr = [];
			for(var k = 0, length = this.length; k < length; k++) {
				fn.call(context, this[k], k, this) && arr.push(this[k]);
			}
			return arr;
		};
	}

	if(!Array.prototype.some) {
		Array.prototype.some = function(fn, context) {
			var passed = false;
			for(var k = 0, length = this.length; k < length; k++) {
				if(passed === true) break;
				passed = !!fn.call(context, this[k], k, this);
			}
			return passed;
		};
	}

	if(!Array.prototype.every) {
		Array.prototype.every = function(fn, context) {
			var passed = true;
			for(var k = 0, length = this.length; k < length; k++) {
				if(passed === false) break;
				passed = !!fn.call(context, this[k], k, this);
			}
			return passed;
		};
	}

	if(!Array.prototype.reduce) {
		Array.prototype.reduce = function(callback) {
			var i, value;
			if(arguments.length >= 2) {
				value = arguments[1];
				i = 0;
			} else if(this.length > 0) {
				value = this[0];
				i = 1;
			} else {
				throw new Error("Reduce of empty array with no initial value");
			}
			while(i < this.length) {
				if(i in this) {
					value = callback(value, this[i], i, this);
				}
				i++;
			}
			return value;
		};
	}

	function isString(obj) {
		return Object.prototype.toString.call(obj) === '[object String]';
	}

	function isArrayLike(obj) {
		var length = obj.length;
		if(typeof length != "number" || length < 0 || isNaN(length) || Math.ceil(length) != length) {
			return false;
		}
		return true;
	}

	function from(arrayLike, mapFn, thisArg) {
		var arr;
		if(isString(arrayLike)) {
			arr = new Array();
			for(var i = 0; i < arrayLike.length; i++) {
				arr.push(arrayLike.charAt(i));
			}
		} else if(isArrayLike(arrayLike)) {
			try {
				arr = Array.prototype.slice.call(arrayLike);
			} catch(e) {
				arr = new Array();
				for(var i = 0; i < arrayLike.length; i++) {
					arr.push(arrayLike[i]);
				}
			}
		} else {
			arr = new Array();
			var entries = arrayLike[Symbol$2.iterator];
			if(entries) {
				var it = entries.call(arrayLike);
				while(true) {
					var next = it.next();
					if(next.done) break;
					arr.push(next.value);
				}
			}
		}
		if(mapFn) {
			arr = arr.map(mapFn, thisArg);
		}
		return arr;
	}

	if(!Array.from) {
		Array.from = from;
	}

	function isArray(obj) {
		return Object.prototype.toString.call(obj) === '[object Array]';
	}

	if(!Array.isArray) {
		Array.isArray = isArray;
	}

	function of() {
		return Array.prototype.slice.call(arguments);
	}

	if(!Array.of) {
		Array.of = of;
	}

	if(!Array.prototype.includes) {
		Array.prototype.includes = function(search, start) {
			return this.indexOf(search, start) !== -1;
		};
	}

	if(!Array.prototype.findIndex) {
		Array.prototype.findIndex = function(callback, thisArg) {
			for(var i = 0, j; i < this.length; i++) {
				j = this[i];
				var r = callback.call(thisArg, j, i, this);
				if(r) {
					return i;
				}
			}
			return -1;
		};
	}

	if(!Array.prototype.find) {
		Array.prototype.find = function(callback, thisArg) {
			var i = this.findIndex(callback, thisArg);
			if(i >= 0) {
				return this[i];
			}
		};
	}

	function Iterator(arr) {
		this.array = arr;
		this.i = 0;
	}
	Iterator.prototype.next = function() {
		var result = {};
		result.done = this.array.length <= this.i;
		if(!result.done) {
			result.value = this.array[this.i];
			this.i++;
		}
		return result;
	};
	if(!Array.prototype.entries) {
		Array.prototype.entries = function() {
			return new Iterator(this);
		};
	}

	if(!Array.prototype[Symbol$2.iterator]) {
		Array.prototype[Symbol$2.iterator] = Array.prototype.entries;
	}

	var Date$1 = globalThis.Date;

	function Date$2(str) {
		var arr;
		if(isString(str)) {
			if(arr = str.match(/^(\d{4})\-(\d{2})\-(\d{2})$/)) {
				return Date$1.UTC(this, parseInt(arr[1]), parseInt(arr[2]) - 1, parseInt(arr[3]));
			}
			if(arr = str.match(/^(\d{4})\-(\d{2})\-(\d{2})T(\d{2}):(\d{2}):(\d{2})Z$/)) {
				return Date$1.UTC(parseInt(arr[1]), parseInt(arr[2]) - 1, parseInt(arr[3]), parseInt(arr[4]), parseInt(arr[5]), parseInt(arr[6]));
			}
			if(arr = str.match(/^(\d{4})\-(\d{2})\-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)Z$/)) {
				return Date$1.UTC(parseInt(arr[1]), parseInt(arr[2]) - 1, parseInt(arr[3]), parseInt(arr[4]), parseInt(arr[5]), parseInt(arr[6]), parseFloat(arr[7]) * 1000);
			}
		}
		switch(arguments.length) {
			case 0:
				return new Date$1();
			case 1:
				return new Date$1(str);
			case 3:
				return new Date$1(str, arguments[1], arguments[2]);
			case 4:
				return new Date$1(str, arguments[1], arguments[2], arguments[3]);
			case 5:
				return new Date$1(str, arguments[1], arguments[2], arguments[4], arguments[5]);
			case 6:
				return new Date$1(str, arguments[1], arguments[2], arguments[4], arguments[5], arguments[6]);
			case 7:
				return new Date$1(str, arguments[1], arguments[2], arguments[4], arguments[5], arguments[6], arguments[7]);
		}
		return Date$1.apply(this, arguments);
	}
	Date$2.prototype = Date$1.prototype;

	if(isNaN(new Date$1("2011-11-11T11:11:11.111Z"))) {
		Date$2.UTC = Date$1.UTC;
		Date$2.now = Date$1.now;
		Date$2.parse = function(str) {
			return new Date$2(str).getTime();
		};
		this.Date = Date$2;
	}

	function now() {
		return new Date().getTime();
	}

	if(!Date.now) {
		Date.now = now;
	}

	function prefixIntrger2(number) {
		if(number < 10) {
			return '0' + number;
		}
		return number;
	}

	function prefixIntrger3(number) {
		if(number < 100) {
			return '0' + prefixIntrger2(number);
		}
		return number;
	}

	if(!Date.prototype.toISOString) {
		Date.prototype.toISOString = function() {
			return this.getUTCFullYear() +
				'-' + prefixIntrger2(this.getUTCMonth() + 1) +
				'-' + prefixIntrger2(this.getUTCDate()) +
				'T' + prefixIntrger2(this.getUTCHours()) +
				':' + prefixIntrger2(this.getUTCMinutes()) +
				':' + prefixIntrger2(this.getUTCSeconds()) +
				'.' + prefixIntrger3(this.getUTCMilliseconds()) + 'Z';
		};
	}

	if(!Date.prototype.toJSON) {
		Date.prototype.toJSON = Date.prototype.toISOString;
	}

	function toLocaleFormat(date, format) {
		var Y = date.getFullYear();
		var M = prefixIntrger2(date.getMonth() + 1);
		var D = prefixIntrger2(date.getDate());
		var h = prefixIntrger2(date.getHours());
		var m = prefixIntrger2(date.getMinutes());
		var s = prefixIntrger2(date.getSeconds());
		var o = {
			"%x": Y + "/" + M + "/" + D,
			"%X": h + ":" + m + ":" + s,
			"%Y": Y,
			"%y": prefixIntrger2(date.getYear() % 100),
			"%m": M,
			"%e": date.getDate(),
			"%d": D,
			"%H": h,
			"%i": prefixIntrger2(date.getHours() % 12),
			"%M": m,
			"%S": s,
			"%p": date.getHours() % 12 > 1 ? "PM" : "AM",
			"%%": "%"
		};
		o["%T"] = o["%X"];
		return format.replace(/%[xXTYymedHiMSp%]/g, function(word) {
			for(var k in o) {
				if(k == word) {
					return o[k];
				}
			}
			return word;
		});
	}

	if(!Date.prototype.toLocaleFormat) {//部分浏览器支持
		Date.prototype.toLocaleFormat = toLocaleFormat;
	}

	var Set = this.Set;

	function createSet() {
		function Set(arr) {
			this.items = new Array();
			if(arr) {
				var entries = arr[Symbol$2.iterator];
				if(entries) {
					var it = entries.call(arr);
					while(true) {
						var next = it.next();
						if(next.done) break;
						this.add(next.value);
					}
				}
			}
			this.size = this.items.length;
		} Set.prototype.has = function(value) {
			return this.items.indexOf(value) >= 0;
		};
		Set.prototype.add = function(value) {
			if(!this.has(value)) {
				this.items.push(value);
				this.size = this.items.length;
			}
			return this;
		};
		Set.prototype['delete'] = function(value) {
			var i = this.items.indexOf(value);
			if(i >= 0) {
				this.items.splice(i, 1);
				this.size = this.items.length;
				return true;
			}
			return false;
		};
		Set.prototype.clear = function() {
			this.items.splice(0, this.items.length);
			this.size = 0;
		};
		Set.prototype.forEach = function(callback, thisArg) {
			for(var i = 0, j; i < this.size; i++) {
				j = this.items[i];
				callback.call(thisArg, j, j, this);
			}
		};
		Set.prototype.values = function() {
			return this.items[Symbol$2.iterator]();
		};
		Set.prototype[Symbol$2.iterator] = Set.prototype.values;
		return Set;
	}

	if(!Set) {
		this.Set = createSet();
	}

	var Map = this.Map;

	function find(arr, key, value) {
		for(var i = 0; i < arr.length; i++) {
			if(arr[i][key] === value) { return arr[i]; }
		}
	}

	function findIndex(arr, key, value) {
		for(var i = 0; i < arr.length; i++) {
			if(arr[i][key] === value) { return i; }
		}
		return -1;
	}

	function createMap() {
		function Map(arr) {
			this.items = new Array();
			if(arr) {
				var entries = arr[Symbol$2.iterator];
				if(entries) {
					var it = entries.call(arr);
					while(true) {
						var next = it.next();
						if(next.done) break;
						this.set(next.value[0], next.value[1]);
					}
				}
			}
			this.size = this.items.length;
		} Map.prototype.entries = function() {
			return this.items[Symbol$2.iterator]();
		};
		Map.prototype.clear = function() {
			this.items.splice(0, this.items.length);
			this.size = 0;
		};
		Map.prototype["delete"] = function(key) {
			var i = findIndex(this.items, 0, key);
			if(i >= 0) {
				var r = this.items[i];
				this.items.splice(i, 1);
				this.size = this.items.length;
				return r;
			}
			return false;
		};
		Map.prototype.forEach = function(callbackfn, thisArg) {
			var len = this.size;
			for(var i = 0, j; i < len; i++) {
				j = this.items[i];
				if(j) {
					callbackfn.call(thisArg, j[1], j[0], this);
				}
			}
		};
		Map.prototype.get = function(key) {
			var r = find(this.items, 0, key);
			if(r) {
				return r[1];
			}
		};
		Map.prototype.has = function(key) {
			return findIndex(this.items, 0, key) >= 0;
		};
		Map.prototype.set = function(key, value) {
			var r = find(this.items, 0, key);
			if(r) {
				r[1] = value;
			} else {
				this.items.push([key, value]);
			}
			this.size = this.items.length;
			return this;
		};
		Map.prototype[Symbol$2.iterator] = Map.prototype.entries;
		return Map;
	}

	if(!Map) {
		this.Map = createMap();
	}

	function parse(str) {
		return eval('(' + str + ')');
	}

	var rx_escapable = /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
	function escapeString(str) {//from lodash
		rx_escapable.lastIndex = 0;
		return rx_escapable.test(str)
			? str.replace(rx_escapable, function(a) {
				var meta = {
					"\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", "\"": "\\\"", "\\": "\\\\"
				};
				var c = meta[a];
				return typeof c === "string"
					? c
					: "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
			}) : str;
	}

	function isFunction(obj) {
		return Object.prototype.toString.call(obj) === '[object Function]';
	}

	function stringify(obj) {
		switch(obj) {
			case undefined:
			case null:
				return "null";
			case false:
			case true:
				return obj;
			default:
				var type = Object.prototype.toString.call(obj);
				switch(type) {
					case '[object String]':
						return '"' + escapeString(obj) + '"';
					case '[object Number]':
						return isNaN(obj) ? "null" : obj.toString();
					case '[object Array]':
						return "[" + obj.map(stringify).join(",") + "]";
					default:
						if(obj.toJSON && isFunction(obj.toJSON)) {
							return stringify(obj.toJSON());
						}
						var items = [];
						var ownKeys = Object.keys(obj);
						for(var i = 0; i < ownKeys.length; i++) {
							var key = ownKeys[i];
							var value = obj[key];
							if(value !== void 0) {
								if(!isFunction(value)) {
									items.push('"' + escapeString(key) + '":' + stringify(value));
								}
							}
						}
						return "{" + items.join(",") + "}";
				}
		}
	}

	if(!globalThis.JSON) {
		globalThis.JSON = {
			stringify: stringify,
			parse: parse
		};
	}

	var ticks = null;
	var nextTick = setTimeout;
	function next() {
		if(ticks && ticks.length) {
			for(var i = 0; i < ticks.length; i++) {
				var fn = ticks[i];
				try {
					fn();
				} catch(e) {
					console.error(e);
				}
			}
			ticks = null;
		}
	}
	function queueMicrotask$1(fn) {
		if(!ticks) {
			ticks = new Array();
			nextTick(next);
		}
		ticks.push(fn);
	}

	if(!this.queueMicrotask) {
		this.queueMicrotask = queueMicrotask$1;
	}

	function noop() { }

	var PENDING = Symbol$2("pending");
	var RESOLVED = Symbol$2("resolved");
	var REJECTED = Symbol$2("rejected");

	function Promise$1(executor) {
		this._resolveds = [];
		this._rejecteds = [];
		this._state = PENDING;//resolved | rejected

		var me = this;
		function resolve(value) {
			queueMicrotask(function() {
				if(me._state === PENDING) {
					me._value = value;
					me._state = RESOLVED;
					me._resolveds.forEach(callAll, me);
					me._resolveds = null;
				}
			});
		}
		function reject(reason) {
			queueMicrotask(function() {
				if(me._state === PENDING) {
					me._value = reason;
					me._state = REJECTED;
					me._rejecteds.forEach(callAll, me);
					me._rejecteds = null;
				}
			});
		}
		try {
			executor(resolve, reject);
		} catch(e) {
			reject(e);
		}
	}
	function callAll(fn) {
		fn.call(this, this._value);
	}
	function nextPromise(before, after, resolve, reject) {
		return function(value) {
			try {
				var x = before(value);
				if(x && (typeof x.then === "function")) {
					x.then(resolve, reject);
				} else {
					after(x);
				}
			} catch(r) {
				reject(r);
			}
		};
	}
	Promise$1.prototype.then = function(onResolved, onRejected) {
		var me = this;
		onResolved = onResolved || noop;
		onRejected = onRejected || noop;
		return new Promise$1(function(resolve, reject) {
			switch(me._state) {
				case RESOLVED:
					queueMicrotask(nextPromise(onResolved, resolve, resolve, reject), me._value);
					break;
				case REJECTED:
					queueMicrotask(nextPromise(onRejected, reject, resolve, reject), me._value);
					break;
				default:
					me._resolveds.push(nextPromise(onResolved, resolve, resolve, reject));
					me._rejecteds.push(nextPromise(onRejected, reject, resolve, reject));
			}
		});
	};
	Promise$1.prototype['catch'] = function(onRejected) {
		return this.then(undefined, onRejected);
	};
	Promise$1.all = function(promises) {
		if(!Array.isArray(promises)) {
			throw new TypeError('You must pass an array to all.');
		}
		if(promises.length == 0) return Promise$1.resolve();
		return new Promise$1(function(resolve, reject) {
			var result = new Array(promises.length);
			var c = 0;
			promises.forEach(function(one, index) {
				if(typeof one.then === "function") {
					one.then(function(data) {
						c++;
						result[index] = data;
						if(c >= promises.length) {
							resolve(result);
						}
					}, function(error) {
						reject(error);
					});
				} else {
					c++;
					if(c >= promises.length) {
						resolve();
					}
				}
			});
		});
	};
	Promise$1.race = function(promises) {
		if(!Array.isArray(promises)) {
			throw new TypeError('You must pass an array to all.');
		}
		return new Promise$1(function(resolve, reject) {
			promises.forEach(function(one) {
				one.then(function() {
					resolve();
				}, function() {
					reject();
				});
			});
		});
	};
	function ResolvePromise(value) {
		this._value = value;
		this._state = RESOLVED;
	}
	ResolvePromise.prototype = Promise$1.prototype;
	Promise$1.resolve = function(arg) {
		return new ResolvePromise(arg);
	};
	function RejectPromise(value) {
		this._value = value;
		this._state = REJECTED;
	}
	RejectPromise.prototype = Promise$1.prototype;
	Promise$1.reject = function(arg) {
		return new RejectPromise(arg);
	};

	if(!this.Promise) {
		this.Promise = Promise$1;
	}

	function promise_finally(onCompleted) {
		return this.then(onCompleted, onCompleted);
	}

	if(!Promise["finally"]) {
		Promise["finally"] = promise_finally;
	}

	function URLSearchParams$1(paramsString) {
		this._data = new Array();
		if(paramsString) {
			var i, pair;
			if(Array.isArray(paramsString)) {
				i = this._data.length = paramsString.length;
				while(i-- > 0) {
					pair = paramsString[i];
					this._data[i] = new Array(pairs[1], pairs[0]);
				}
			} else {
				var pairs = paramsString.split("&");
				i = this._data.length = pairs.length;
				while(i-- > 0) {
					pair = pairs[i];
					if(pair) {
						var id = pair.indexOf("=");
						this._data[i] = new Array(decodeURIComponent(pair.substring(id + 1, pair.length)), decodeURIComponent(pair.substring(0, id)));
					}
				}
			}
		}
	} URLSearchParams$1.prototype.append = function(key, value) {
		this._data.push([value, key]);
	};
	URLSearchParams$1.prototype.get = function(key) {
		var item = this._data.find(function(item) {
			return item[1] == key;
		});
		if(item) return item[0];
		return null;
	};
	URLSearchParams$1.prototype.getAll = function(key) {
		return this._data.filter(function(item) {
			return item[1] == key;
		}).map(function(item) {
			return item[0];
		});
	};
	URLSearchParams$1.prototype.set = function(key, value) {
		var item = this._data.find(function(item) {
			return item[1] == key;
		});
		if(item) {
			item[0] = value;
		} else {
			this.append(key, value);
		}
	};
	URLSearchParams$1.prototype['delete'] = function(key) {
		this._data = this._data.filter(function(item) {
			return item[1] != key;
		});
	};
	URLSearchParams$1.prototype.has = function(key) {
		return this._data.some(function(item) {
			return item[1] == key;
		});
	};
	URLSearchParams$1.prototype.toString = function() {
		return this._data.map(function(item) {
			return encodeURIComponent(item[1]) + "=" + encodeURIComponent(item[0]);
		}).join("&");
	};
	URLSearchParams$1.prototype.sort = function() {
		return this._data.sort(function(a, b) {
			return a[1] > b[1];
		});
	};
	URLSearchParams$1.prototype.forEach = function(fn, thisArg) {
		this._data.forEach.apply(this._data, arguments);
	};

	if(!this.URLSearchParams) {
		this.URLSearchParams = URLSearchParams$1;
	}

	function SearchParams(url) {
		this.url = url;
	} SearchParams.prototype = Object.create(URLSearchParams.prototype);
	["append", "set", "delete"].forEach(function(method) {
		SearchParams.prototype[method] = function(key, value) {
			var searchParams = new URLSearchParams(this.url.search.replace(/^\?/, ""));
			searchParams[method].apply(searchParams, arguments);
			this.url.search = "?" + searchParams.toString();
		};
	});
	["getAll", "get", "has", "toString", "forEach"].forEach(function(method) {
		SearchParams.prototype[method] = function(key, value) {
			var searchParams = new URLSearchParams(this.url.search.replace(/^\?/, ""));
			return searchParams[method].apply(searchParams, arguments);
		};
	});

	function URL(relativePath, absolutePath) {
		var path, arr;
		this.port = this.search = this.hash = this.username = this.password = "";
		this.searchParams = new SearchParams(this);
		var pattern = /^[a-zA-Z]+:/;
		if(arr = relativePath.match(pattern)) {
			this.protocol = arr[0];
			path = relativePath.replace(pattern, "");
			pattern = /^\/*([^\/]+)/;
			var host = path.match(pattern)[1];
			path = path.replace(pattern, "");
			arr = host.split("@");
			if(arr.length > 1) {
				this.host = arr[1];
				arr = arr[0].split(":");
				if(arr.length > 1) {
					this.username = arr[0];
					this.password = arr[1];
				} else {
					this.username = arr[0];
				}
			} else {
				this.host = host;
			}
		} else if(absolutePath) {
			var absInfo = absolutePath.indexOf ? new URL(absolutePath) : absolutePath;
			if(absInfo.hostname) {
				this.hostname = absInfo.hostname;
				this.port = absInfo.port;
			} else {
				this.host = absInfo.host;
			}
			this.protocol = absInfo.protocol;
			if(absInfo.username) this.username = absInfo.username;
			if(absInfo.password) this.password = absInfo.password;
			this.pathname = absInfo.pathname;
			if(relativePath.startsWith("#")) {
				this.search = absInfo.search;
				this.hash = relativePath;
				return this;
			} else if(relativePath.startsWith("?")) {
				var a = relativePath.indexOf("#");
				if(a < 0) {
					this.search = relativePath;
					this.hash = "";
				} else {
					this.search = relativePath.substr(0, a);
					this.hash = relativePath.substring(a, relativePath.length);
				}
				return this;
			} else if(relativePath.startsWith("/")) {
				path = relativePath;
			} else if(relativePath.startsWith("../")) {
				path = absInfo.pathname.replace(/\/[^\/]*$/, "/") + relativePath;
				pattern = /[^\/]+\/\.\.\//;
				while(pattern.test(path)) {
					path = path.replace(pattern, "");
				}
				path = path.replace(/^(\/\.\.)+/, "");
			} else {
				path = absInfo.pathname.replace(/[^\/]*$/, "") + relativePath.replace(/^\.\//, "");
			}
		} else {
			throw new TypeError("SYNTAX_ERROR");
		}
		pattern = /^[^#]*/;
		this.hash = path.replace(pattern, "");
		arr = path.match(pattern);
		path = arr[0];
		pattern = /^[^\?]*/;
		this.search = path.replace(pattern, "");
		arr = path.match(pattern);
		this.pathname = arr[0];
		return this;
	}
	var URLProperties = {
		host: {
			enumerable: true,
			get: function() {
				if(this.port) {
					return this.hostname + ":" + this.port;
				}
				return this.hostname;
			},
			set: function(value) {
				var pattern = /(.*):(\d+)$/;
				var arr = value.match(pattern);
				this.port = "";
				if(arr) {
					this.hostname = arr[1];
					this.port = arr[2];
				} else {
					this.hostname = value;
				}
			}
		},
		origin: {
			enumerable: true,
			get: function() {
				return this.protocol + "//" + this.host;
			}
		},
		href: {
			enumerable: true,
			get: function() {
				var user = this.username;
				if(user) {
					if(this.password) {
						user += ":" + this.password;
					}
					user += "@";
				}
				return this.protocol + "//" + user + this.host + this.pathname + this.search + this.hash;
			},
			set: function(value) {
				var url = new URL(value);
				if(url.hostname) {
					this.hostname = url.hostname;
					this.port = url.port;
				} else {
					this.host = url.host;
				}
				this.protocol = url.protocol;
				this.pathname = url.pathname;
				this.search = url.search;
				this.hash = url.hash;
				this.username = url.username;
				this.password = url.password;
			}
		}
	};

	function initURL() {
		try {
			window.execScript("var VBURLProperties;", "JScript");
			window.execScript([
				//'Dim VBURLProperties',
				'Class VBURL',
				'	Public [constructor]',
				'	Public [protocol]',
				'	Public [hostname]',
				'	Public [port]',
				'	Public [pathname]',
				'	Public [search]',
				'	Public [searchParams]',
				'	Public [hash]',
				'	Public [username]',
				'	Public [password]',
				'	Public Property Let [host](var)',
				'		Call VBURLProperties.host.set.call(Me,var)',
				'	End Property',
				'	Public Property Get [host]',
				'		[host]=VBURLProperties.host.get.call(Me)',
				'	End Property',
				'	Public Property Get [origin]',
				'		[origin]=VBURLProperties.origin.get.call(Me)',
				'	End Property',
				'	Public Property Let [href](var)',
				'		Call VBURLProperties.href.set.call(Me,var)',
				'	End Property',
				'	Public Property Get [href]',
				'		[href]=VBURLProperties.href.get.call(Me)',
				'	End Property',
				'End Class',
				'Function VBUrlFactory(url)',
				'	Set VBUrlFactory = New VBURL',
				'End Function'
			].join('\n'), 'VBScript');
			window.VBURLProperties = URLProperties;
		} catch(e) {
			window.VBUrlFactory = function(url) {
				if(url.host) {
					URLProperties.host.set.call(url, url.host);
				} else {
					url.host = URLProperties.host.get.call(url);
				}
				url.href = URLProperties.href.get.call(url);
				url.origin = URLProperties.origin.get.call(url);
				return url;
			};
		}
	}
	function URL$1(relativePath, absolutePath) {
		var url = new URL(relativePath, absolutePath);
		var o = VBUrlFactory(url);
		if(url.host) {
			o.host = url.host;
		} else {
			o.hostname = url.hostname;
			o.port = url.port;
		}
		o.protocol = url.protocol;
		o.pathname = url.pathname;
		o.search = url.search;
		o.hash = url.hash;
		o.username = url.username;
		o.password = url.password;
		o.searchParams = url.searchParams;
		o.searchParams.url = o;
		o.constructor = URL$1;
		return o;
	}

	if(!this.URL) {
		initURL();
		this.URL = URL$1;
	}

	if(!('origin' in location)) {
		location.origin = location.protocol + "//" + location.host;
	}

	if(!('head' in document)) document.head = document.getElementsByTagName("head")[0];

	function contains(ele) {
		var i, arr = document.all;
		for(i = 0; i < arr.length; i++) {
			if(arr[i] === ele) {
				return true;
			}
		}
		return false;
	}

	if(!document.contains && 'all' in document) {
		document.contains = contains;
	}

	if(this.Element) {
		if(!('previousElementSibling' in Element.prototype)) {
			Object.defineProperty(Element.prototype, "previousElementSibling", {
				get: function() {
					var e = this.previousSibling;
					while(e && 1 !== e.nodeType)
						e = e.previousSibling;
					return e;
				}
			});
		}
		if(!('nextElementSibling' in Element.prototype)) {
			Object.defineProperty(Element.prototype, "nextElementSibling", {
				get: function() {
					var e = this.nextSibling;
					while(e && 1 !== e.nodeType)
						e = e.nextSibling;
					return e;
				}
			});
		}
	}

	if(!this.console) {
		this.console = {};
		console.stack = [];
		console.log = console.info = console.error = console.warn = function(data) {
			if(window.Debug) {
				Debug.writeln(data);
			}
		};
		console.clear = noop;
	}

	if(!this.localStorage) {
		this.localStorage = new function() {
			var ele = document.createElement("localStorage");
			if(ele.addBehavior) {
				ele.addBehavior("#default#userData");
				document.head.appendChild(ele);
				this.getItem = function(key) {
					ele.load("localStorage");
					return ele.getAttribute(key);
				};
				this.setItem = function(key, value) {
					ele.setAttribute(key, new String(value));
					ele.save("localStorage");
				};
				this.removeItem = function(key) {
					ele.removeAttribute(key);
					ele.save("localStorage");
				};
				this.sham = true;
			}
		}();
	}

	function getCookie(name) {
		var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
		if(arr != null) return decodeURIComponent(arr[2]); return null;
	}

	function isNumber(obj) {
		return Object.prototype.toString.call(obj) === '[object Number]';
	}

	function setCookie(name, value) {
		var path = "/";
		var seconds;
		var domain;
		var expires;
		if(arguments.length > 2) {
			for(var i = 2; i < arguments.length; i++) {
				if(isNumber(arguments[i])) {
					seconds = arguments[i];
				} else if(isString(arguments[i])) {
					if(arguments[i].indexOf(".") >= 0) {
						domain = arguments[i];
					} else if(arguments[i].indexOf("/") >= 0) {
						path = arguments[i];
					}
				}
			}
		}
		if(value == null || seconds <= 0) {
			value = '';
			seconds = -2592000;
		}
		if(!isNaN(seconds)) {
			expires = new Date();
			expires.setTime(expires.getTime() + seconds * 1000);
		}
		document.cookie = name + '=' + encodeURIComponent(value)
			+ (expires ? '; expires=' + expires.toGMTString() : '')
			+ '; path=' + path
			+ (domain ? '; domain=' + domain : '');
	}

	if(!this.sessionStorage) {
		this.sessionStorage = new function() {
			var ele = document.createElement("sessionStorage");
			var sessionId = getCookie("JSESSIONID");
			if(!sessionId) {
				sessionId = Math.random().toString(16).replace("0.", "");
				setCookie("JSESSIONID", sessionId);
			}
			if(ele.addBehavior) {
				ele.addBehavior("#default#userData");
				document.head.appendChild(ele);
				this.getItem = function(key) {
					ele.load(sessionId);
					return ele.getAttribute(key);
				};
				this.setItem = function(key, value) {
					ele.setAttribute(key, new String(value));
					ele.save(sessionId);
				};
				this.removeItem = function(key) {
					ele.removeAttribute(key);
					ele.save(sessionId);
				};
				this.sham = true;
			}
		}();
	}

	if(typeof Event !== "function") {
		if(document.createEventObject) {
			this.Event = function(evt, init) {
				var e = document.createEventObject();
				e.type = evt;
				if(init) {
					e.bubbles = init.bubbles;
					e.cancelable = init.cancelable;
				} else {
					e.bubbles = false;
					e.cancelable = false;
				}
				return e;
			};
		}
	}

}());
