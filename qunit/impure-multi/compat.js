(function () {

	var DESCRIPTORS = !!function () {
	  try {
	    return Object.defineProperty({}, 'a', {
	      get: function get() {
	        return 7;
	      }
	    }).a === 7;
	  } catch (_unused) {
	    /* empty */
	  }
	}();
	var GLOBAL = Function('return this')();
	var NATIVE = GLOBAL.NATIVE || false;
	(function () {
	  try {
	    return new GLOBAL.Uint8Array(new GLOBAL.Uint16Array([1]).buffer)[0] === 1;
	  } catch (_unused2) {
	    return true;
	  }
	})();
	!function () {
	  try {
	    return Object.isExtensible(Object.preventExtensions({}));
	  } catch (_unused3) {
	    return true;
	  }
	}();
	!function () {
	  try {
	    var F = function F() {
	      /* empty */
	    };

	    F.prototype.constructor = null;
	    return Object.getPrototypeOf(new F()) !== F.prototype;
	  } catch (_unused4) {
	    return true;
	  }
	}();

	function is(a, b) {
	  // eslint-disable-next-line no-self-compare -- NaN check
	  return a === b ? a !== 0 || 1 / a === 1 / b : a != a && b != b;
	}
	(function () {
	  try {
	    if (Function("\n'use strict';\nclass Subclass extends Object { /* empty */ };\nreturn new Subclass() instanceof Subclass;\n\t\t")()) return Function('Parent', "\n'use strict';\nreturn class extends Parent { /* empty */ };\n\t\t");
	  } catch (_unused) {
	    /* empty */
	  }
	})(); // export function timeLimitedPromise(time, fn) {
	// 	return Promise.race([
	// 		new Promise(fn), new Promise((resolve, reject) => {
	// 			setTimeout(reject, time);
	// 		}),
	// 	]);
	// }
	// // This function is used to force RegExp.prototype[Symbol.*] methods
	// // to not use the native implementation.
	// export function patchRegExp$exec(run) {
	// 	return assert => {
	// 		const originalExec = RegExp.prototype.exec;
	// 		// eslint-disable-next-line no-extend-native -- required for testing
	// 		RegExp.prototype.exec = function() {
	// 			return originalExec.apply(this, arguments);
	// 		};
	// 		try {
	// 			return run(assert);
	// 			// eslint-disable-next-line no-useless-catch -- in very old IE try / finally does not work without catch
	// 		} catch(error) {
	// 			throw error;
	// 		} finally {
	// 			// eslint-disable-next-line no-extend-native -- required for testing
	// 			RegExp.prototype.exec = originalExec;
	// 		}
	// 	};
	// }

	function isIterable(it) {
	  var O = Object(it);
	  return Symbol.iterator in O;
	}

	var _Object$prototype = Object.prototype,
	    toString = _Object$prototype.toString,
	    propertyIsEnumerable = _Object$prototype.propertyIsEnumerable;
	GLOBAL.USE_FUNCTION_CONSTRUCTOR = true;

	QUnit.assert.pushResult = function (options) {
	  return QUnit.push(options.result, options.actual, options.expected, options.message);
	};

	QUnit.assert.arity = function (fn, length, message) {
	  this.pushResult({
	    result: fn.length === length,
	    actual: fn.length,
	    expected: length,
	    message: message || "arity is " + length
	  });
	};

	QUnit.assert.arrayEqual = function (a, b, message) {
	  var result = true;

	  if (a.length !== b.length) {
	    result = false;
	  } else {
	    for (var i = 0, length = a.length; i < length; ++i) {
	      if (!is(a[i], b[i])) {
	        result = false;
	        break;
	      }
	    }
	  }

	  this.pushResult({
	    result: result,
	    actual: [].slice.call(a),
	    expected: [].slice.call(b),
	    message: message
	  });
	};

	QUnit.assert.epsilon = function (a, b, E, message) {
	  this.pushResult({
	    result: Math.abs(a - b) <= (E != null ? E : 1e-11),
	    actual: a,
	    expected: b,
	    message: message
	  });
	};

	QUnit.assert.isFunction = function (fn, message) {
	  this.pushResult({
	    result: typeof fn === 'function' || toString.call(fn).slice(8, -1) === 'Function',
	    actual: false,
	    expected: true,
	    message: message || 'is function'
	  });
	};

	QUnit.assert.isAsyncIterable = function (it, message) {// this.pushResult({
	  // 	result: typeof it == 'object' && typeof it[ASYNC_ITERATOR] == 'function',
	  // 	actual: false,
	  // 	expected: true,
	  // 	message: message || 'is async iterable',
	  // });
	};

	QUnit.assert.isIterable = function (it, message) {
	  this.pushResult({
	    result: isIterable(it),
	    actual: false,
	    expected: true,
	    message: message || 'is iterable'
	  });
	};

	QUnit.assert.isIterator = function (it, message) {
	  this.pushResult({
	    result: typeof it === 'object' && typeof it.next === 'function',
	    actual: false,
	    expected: true,
	    message: message || 'is iterator'
	  });
	};

	QUnit.assert.name = function (fn, name, message) {
	  if (typeof fn == 'function' && 'name' in fn) {
	    this.pushResult({
	      result: fn.name === name || fn.name.indexOf(name + "$") == 0,
	      actual: fn.name,
	      expected: name,
	      message: message || "name is '" + name + "'"
	    });
	  } else {
	    this.pushResult({
	      result: true,
	      actual: true,
	      expected: true,
	      message: 'Function#name property test makes no sense'
	    });
	  }
	};

	QUnit.assert.enumerable = function (O, key, message) {
	  if (DESCRIPTORS) {
	    this.pushResult({
	      result: propertyIsEnumerable.call(O, key),
	      actual: false,
	      expected: true,
	      message: message || (typeof key === 'symbol' ? 'method' : "'" + key + "'") + " is enumerable"
	    });
	  } else {
	    this.pushResult({
	      result: true,
	      actual: true,
	      expected: true,
	      message: 'Enumerability is not applicable'
	    });
	  }
	};

	QUnit.assert.notThrows = function (fn, message) {
	  var _throws, result, error;

	  try {
	    result = fn();
	    _throws = false;
	  } catch (err) {
	    _throws = true;
	    error = err;
	  }

	  this.pushResult({
	    result: !_throws && result,
	    actual: _throws ? error : result,
	    expected: _throws ? undefined : true,
	    message: message || 'does not throw'
	  });
	};

	QUnit.assert.same = function (a, b, message) {
	  this.pushResult({
	    result: is(a, b),
	    actual: a,
	    expected: b,
	    message: message
	  });
	};

	function prefixIntrger2(number) {
		if(number<10){
			return '0'+number;
		}
		return number;
	}

	function prefixIntrger3(number) {
		if(number<100){
			return '0'+prefixIntrger2(number);
		}
		return number;
	}

	if(!Date.prototype.toISOString){
		Date.prototype.toISOString = function() {
			return this.getUTCFullYear()+
				'-'+prefixIntrger2(this.getUTCMonth()+1)+
				'-'+prefixIntrger2(this.getUTCDate()) +
				'T'+prefixIntrger2(this.getUTCHours()) +
				':'+prefixIntrger2(this.getUTCMinutes()) +
				':'+prefixIntrger2(this.getUTCSeconds()) +
				'.'+prefixIntrger3(this.getUTCMilliseconds())+'Z';
		};
	}

	if(!Date.prototype.toJSON){
		Date.prototype.toJSON=Date.prototype.toISOString;
	}

	var Object$1 = window.Object;

	var symbol_sqe = 0;
	var all_symbol = {};
	function Symbol$5(desc) {
		this.__name__ = "@@" + desc + ":" + symbol_sqe;
		if(desc !== undefined) {
			this.description = String(desc);
		}
		symbol_sqe++;
		all_symbol[this.__name__] = this;
	}Symbol$5.prototype.toString = function() {
		return this.__name__;
	};
	Symbol$5.prototype.toJSON = function() {
		return undefined;
	};
	function getOwnPropertySymbols$1(obj) {
		var arr = [];
		for(var key in obj) {
			if(key.substring(0, 2) === "@@") {
				if(Object.prototype.hasOwnProperty.call(obj, key)) {
					arr.push(all_symbol[key]);
				}
			}
		}
		return arr;
	}

	if(!Object$1.getOwnPropertySymbols) {
		Object$1.getOwnPropertySymbols = getOwnPropertySymbols$1;
	}

	var Symbol$4 = window.Symbol;

	function Symbol$3(desc) {
		return new Symbol$5(desc);
	}Symbol$3.sham = true;

	if(!Symbol$4) {
		window.Symbol = Symbol$3;
		Symbol$3.sham = true;
		Symbol$3.asyncIterator = "@@asyncIterator";
		Symbol$3.hasInstance = "@@hasInstance";
		// Symbol.isConcatSpreadable = "@@isConcatSpreadable";
		Symbol$3.iterator = "@@iterator";
		// Symbol.match = "@@match";
		// Symbol.matchAll = "@@matchAll";
		// Symbol.replace = "@@replace";
		// Symbol.search = "@@search";
		// Symbol.species = "@@species";
		// Symbol.split = "@@split";
		// Symbol.toPrimitive = "@@toPrimitive";
		// Symbol.toStringTag = "@@toStringTag";
		// Symbol.unscopables = "@@unscopables";
	}

	var hasInstance = '@@hasInstance';

	if(!Function.prototype[hasInstance]) {
		Function.prototype[hasInstance] = function(instance) {
			return instance instanceof this;
		};
	}

	function values() {
		var array = this;
		var index = 0;
		return {
			next: function() {
				var value;
				var done = array.length <= index;
				if(!done) {
					value = array[index];
					index++;
				}
				return {
					done: done, value: value
				};
			},
			'@@iterator': function() {
				return this;
			},
			'@@toStringTag': 'Array Iterator'
		};
	}

	if(!Array.prototype.values) {
		Array.prototype.values = values;
	}

	var iterator$1 = '@@iterator';

	if(!Array.prototype[iterator$1]) {
		Array.prototype[iterator$1] = Array.prototype.values;
	}

	function iterator() {
		var p = 0;
		var string = this;
		var size = this.length;
		return {
			next: function() {
				var value;
				var done = p >= string.length;
				if(!done) {
					value = string.charAt(p);
					var first = value.charCodeAt(0);
					if( // 检查是否开始 surrogate pair
						first >= 0xD800 && first <= 0xDBFF && // high surrogate
						size > p + 1 // 下一个编码单元
					) {
						var second = string.charCodeAt(p + 1);
						if(second >= 0xDC00 && second <= 0xDFFF) { // low surrogate
							value = string.substr(p, 2);
							p++;
						}
					}
					p++;
				}
				return {
					value: value,
					done: done
				};
			},
			'@@iterator': function() {
				return this;
			}
		};
	}

	if(!String.prototype['@@iterator']) {
		String.prototype['@@iterator'] = iterator;
	}

	var symbol_cache = {};
	function compat_for(desc) {
		if(Object.prototype.hasOwnProperty.call(symbol_cache, desc)) {
			return symbol_cache[desc];
		}
		var s = Symbol(desc);
		s.__key__ = desc;
		symbol_cache[desc] = s;
		return s;
	}

	var Symbol$2 = window.Symbol;
	if(!('for' in Symbol$2)) {
		Symbol$2['for'] = compat_for;
	}

	function keyFor(symbol) {
		var s = String(symbol);
		if(s.indexOf("@@") !== 0) {
			throw new TypeError(s + " is not a symbol");
		}
		return symbol.__key__;
	}

	var Symbol$1 = window.Symbol;
	if(!Symbol$1.keyFor) {
		Symbol$1.keyFor = keyFor;
	}

	function parse(str) {
		return eval('(' + str + ')');
	}

	var dontEnums=[
		"toString",
		"toLocaleString",
		"valueOf",
		"hasOwnProperty",
		"isPrototypeOf",
		"propertyIsEnumerable"
	];

	function getPrototypeOf(obj){
		if(typeof obj!=="object"){
			obj=Object(obj);
		}
		if(!('constructor' in obj)){
			return null;
		}
		if(Object.prototype.hasOwnProperty.call(obj,'constructor')){
			if('__proto__' in obj.constructor){
				return obj.constructor.__proto__.prototype;
			}
		}
		return obj.constructor.prototype;
	}

	function keys$1(obj) {
		var result = [], key;
		var isJsObject = obj instanceof Object;
		if(!isJsObject) {
			var proto = getPrototypeOf(obj);
			if(proto) {
				for(key in obj) {
					if(!key.substring(0, 2) === "@@" && !key.substring(0, 2) === "__" && proto[key] !== obj[key]) {
						result.push(key);
					}
				}
				return result;
			}
		}
		for(key in obj) {
			if(Object.prototype.hasOwnProperty.call(obj, key) && !key.substring(0, 2) === "@@" && !key.substring(0, 2) === "__") {
				result.push(key);
			}
		}
		var i = dontEnums.length;
		while(i-- > 0) {
			key = dontEnums[i];
			if(Object.prototype.hasOwnProperty.call(obj, key)) {
				result.push(key);
			}
		}
		return result;
	}

	if(!Object$1.keys) {
		Object$1.keys = keys$1;
	}

	var rx_escapable = /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
	function escapeString(str){//from lodash
		rx_escapable.lastIndex = 0;
		return rx_escapable.test(str)
			? str.replace(rx_escapable, function(a) {
			var meta = {
				"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r": "\\r",	"\"": "\\\"","\\": "\\\\"
			};
			var c = meta[a];
			return typeof c === "string"
				? c
				: "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
		}): str;
	}

	function isFunction(obj) {
		return typeof obj === 'function';
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

	if(!window.JSON) {
		window.JSON = {
			stringify: stringify,
			parse: parse
		};
	}

	var defineProperty = Object.defineProperty,
	    defineProperties = Object.defineProperties,
	    getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor,
	    getOwnPropertyNames = Object.getOwnPropertyNames,
	    keys = Object.keys,
	    create = Object.create;
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;

	var _ref = GLOBAL.Reflect || {},
	    ownKeys = _ref.ownKeys;

	QUnit.test('Symbol', function (assert) {
	  assert.isFunction(Symbol);
	  if (NATIVE) assert.strictEqual(Symbol.length, 0, 'arity is 0');
	  assert.name(Symbol, 'Symbol');
	  var symbol1 = Symbol('symbol');
	  var symbol2 = Symbol('symbol');
	  assert.ok(symbol1 !== symbol2, 'Symbol("symbol") !== Symbol("symbol")');
	  var object = {};
	  object[symbol1] = 42;
	  assert.ok(object[symbol1] === 42, 'Symbol() work as key');
	  assert.ok(object[symbol2] !== 42, 'Various symbols from one description are various keys');

	  if (DESCRIPTORS) {
	    var count = 0; // eslint-disable-next-line no-unused-vars -- required for testing

	    for (var key in object) {
	      count++;
	    }

	    assert.ok(count === 0, 'object[Symbol()] is not enumerable');
	  }
	});
	QUnit.test('Well-known Symbols', function (assert) {
	  assert.ok(Symbol.hasInstance, "Symbol.hasInstance available");
	  assert.ok(Symbol.iterator, "Symbol.iterator available");
	  assert.ok(Symbol.asyncIterator, "Symbol.asyncIterator available");
	});
	QUnit.test('Global symbol registry', function (assert) {
	  assert.isFunction(Symbol["for"], 'Symbol.for is function');
	  assert.strictEqual(Symbol["for"].length, 1, 'Symbol.for arity is 1');
	  if (NATIVE) assert.strictEqual(Symbol["for"].name, 'for', 'Symbol.for.name is "for"');
	  assert.isFunction(Symbol.keyFor, 'Symbol.keyFor is function');
	  assert.strictEqual(Symbol.keyFor.length, 1, 'Symbol.keyFor arity is 1');
	  assert.name(Symbol.keyFor, 'keyFor');
	  var symbol = Symbol["for"]('foo');
	  assert.strictEqual(Symbol["for"]('foo'), symbol);
	  assert.strictEqual(Symbol.keyFor(symbol), 'foo');
	  assert["throws"](function () {
	    return Symbol.keyFor('foo');
	  }, 'throws on non-symbol');
	});
	QUnit.test('Object.getOwnPropertySymbols', function (assert) {
	  assert.isFunction(getOwnPropertySymbols);
	  assert.strictEqual(getOwnPropertySymbols.length, 1, 'arity is 1');
	  assert.name(getOwnPropertySymbols, 'getOwnPropertySymbols');
	  var prototype = {
	    q: 1,
	    w: 2,
	    e: 3
	  };
	  prototype[Symbol()] = 42;
	  prototype[Symbol()] = 43;
	  assert.deepEqual(getOwnPropertyNames(prototype).sort(), ['e', 'q', 'w']);
	  assert.strictEqual(getOwnPropertySymbols(prototype).length, 2);
	  var object = create(prototype);
	  object.a = 1;
	  object.s = 2;
	  object.d = 3;
	  object[Symbol()] = 44;
	  assert.deepEqual(getOwnPropertyNames(object).sort(), ['a', 'd', 's']);
	  assert.strictEqual(getOwnPropertySymbols(object).length, 1);
	  assert.strictEqual(getOwnPropertySymbols(Object.prototype).length, 0);
	  var primitives = [42, 'foo', false];

	  var _loop = function _loop() {
	    var value = _primitives[_i];
	    assert.notThrows(function () {
	      return getOwnPropertySymbols(value);
	    }, "accept " + typeof value);
	  };

	  for (var _i = 0, _primitives = primitives; _i < _primitives.length; _i++) {
	    _loop();
	  }
	});

	if (JSON) {
	  QUnit.test('Symbols & JSON.stringify', function (assert) {
	    assert.strictEqual(JSON.stringify([1, Symbol('foo'), false, Symbol('bar'), {}]), '[1,null,false,null,{}]', 'array value');
	    assert.strictEqual(JSON.stringify({
	      symbol: Symbol('symbol')
	    }), '{}', 'object value');

	    if (DESCRIPTORS) {
	      var object = {
	        bar: 2
	      };
	      object[Symbol('symbol')] = 1;
	      assert.strictEqual(JSON.stringify(object), '{"bar":2}', 'object key');
	    }

	    assert.strictEqual(JSON.stringify(Symbol('symbol')), undefined, 'symbol value');

	    if (typeof Symbol() === 'symbol') {
	      assert.strictEqual(JSON.stringify(Object(Symbol('symbol'))), '{}', 'boxed symbol');
	    }

	    assert.strictEqual(JSON.stringify(undefined, function () {
	      return 42;
	    }), '42', 'replacer works with top-level undefined');
	  });
	}

	if (DESCRIPTORS) {
	  QUnit.test('Symbols & descriptors', function (assert) {
	    var d = Symbol('d');
	    var e = Symbol('e');
	    var f = Symbol('f');
	    var i = Symbol('i');
	    var j = Symbol('j');
	    var prototype = {
	      g: 'g'
	    };
	    prototype[i] = 'i';
	    defineProperty(prototype, 'h', {
	      value: 'h'
	    });
	    defineProperty(prototype, 'j', {
	      value: 'j'
	    });
	    var object = create(prototype);
	    object.a = 'a';
	    object[d] = 'd';
	    defineProperty(object, 'b', {
	      value: 'b'
	    });
	    defineProperty(object, 'c', {
	      value: 'c',
	      enumerable: true
	    });
	    defineProperty(object, e, {
	      configurable: true,
	      writable: true,
	      value: 'e'
	    });
	    var descriptor = {
	      value: 'f',
	      enumerable: true
	    };
	    defineProperty(object, f, descriptor);
	    assert.strictEqual(descriptor.enumerable, true, 'defineProperty not changes descriptor object');
	    assert.deepEqual(getOwnPropertyDescriptor(object, 'a'), {
	      configurable: true,
	      writable: true,
	      enumerable: true,
	      value: 'a'
	    }, 'getOwnPropertyDescriptor a');
	    assert.deepEqual(getOwnPropertyDescriptor(object, 'b'), {
	      configurable: false,
	      writable: false,
	      enumerable: false,
	      value: 'b'
	    }, 'getOwnPropertyDescriptor b');
	    assert.deepEqual(getOwnPropertyDescriptor(object, 'c'), {
	      configurable: false,
	      writable: false,
	      enumerable: true,
	      value: 'c'
	    }, 'getOwnPropertyDescriptor c');
	    assert.deepEqual(getOwnPropertyDescriptor(object, d), {
	      configurable: true,
	      writable: true,
	      enumerable: true,
	      value: 'd'
	    }, 'getOwnPropertyDescriptor d');
	    assert.deepEqual(getOwnPropertyDescriptor(object, e), {
	      configurable: true,
	      writable: true,
	      enumerable: false,
	      value: 'e'
	    }, 'getOwnPropertyDescriptor e');
	    assert.deepEqual(getOwnPropertyDescriptor(object, f), {
	      configurable: false,
	      writable: false,
	      enumerable: true,
	      value: 'f'
	    }, 'getOwnPropertyDescriptor f');
	    assert.strictEqual(getOwnPropertyDescriptor(object, 'g'), undefined, 'getOwnPropertyDescriptor g');
	    assert.strictEqual(getOwnPropertyDescriptor(object, 'h'), undefined, 'getOwnPropertyDescriptor h');
	    assert.strictEqual(getOwnPropertyDescriptor(object, i), undefined, 'getOwnPropertyDescriptor i');
	    assert.strictEqual(getOwnPropertyDescriptor(object, j), undefined, 'getOwnPropertyDescriptor j');
	    assert.strictEqual(getOwnPropertyDescriptor(object, 'k'), undefined, 'getOwnPropertyDescriptor k');
	    assert.strictEqual(getOwnPropertyDescriptor(Object.prototype, 'toString').enumerable, false, 'getOwnPropertyDescriptor on Object.prototype');
	    assert.strictEqual(getOwnPropertyDescriptor(Object.prototype, d), undefined, 'getOwnPropertyDescriptor on Object.prototype missed symbol');
	    assert.strictEqual(keys(object).length, 2, 'Object.keys');
	    assert.strictEqual(getOwnPropertyNames(object).length, 3, 'Object.getOwnPropertyNames');
	    assert.strictEqual(getOwnPropertySymbols(object).length, 3, 'Object.getOwnPropertySymbols');
	    assert.strictEqual(ownKeys(object).length, 6, 'Reflect.ownKeys');
	    delete object[e];
	    object[e] = 'e';
	    assert.deepEqual(getOwnPropertyDescriptor(object, e), {
	      configurable: true,
	      writable: true,
	      enumerable: true,
	      value: 'e'
	    }, 'redefined non-enum key');
	  });
	  QUnit.test('Symbols & Object.defineProperties', function (assert) {
	    var c = Symbol('c');
	    var d = Symbol('d');
	    var descriptors = {
	      a: {
	        value: 'a'
	      }
	    };
	    descriptors[c] = {
	      value: 'c'
	    };
	    defineProperty(descriptors, 'b', {
	      value: {
	        value: 'b'
	      }
	    });
	    defineProperty(descriptors, d, {
	      value: {
	        value: 'd'
	      }
	    });
	    var object = defineProperties({}, descriptors);
	    assert.strictEqual(object.a, 'a', 'a');
	    assert.strictEqual(object.b, undefined, 'b');
	    assert.strictEqual(object[c], 'c', 'c');
	    assert.strictEqual(object[d], undefined, 'd');
	  });
	  QUnit.test('Symbols & Object.create', function (assert) {
	    var c = Symbol('c');
	    var d = Symbol('d');
	    var descriptors = {
	      a: {
	        value: 'a'
	      }
	    };
	    descriptors[c] = {
	      value: 'c'
	    };
	    defineProperty(descriptors, 'b', {
	      value: {
	        value: 'b'
	      }
	    });
	    defineProperty(descriptors, d, {
	      value: {
	        value: 'd'
	      }
	    });
	    var object = create(null, descriptors);
	    assert.strictEqual(object.a, 'a', 'a');
	    assert.strictEqual(object.b, undefined, 'b');
	    assert.strictEqual(object[c], 'c', 'c');
	    assert.strictEqual(object[d], undefined, 'd');
	  });
	  var constructors = ['Map', 'Set', 'Promise'];

	  var _loop2 = function _loop2() {
	    var name = _constructors[_i2];
	    QUnit.test(name + "@@species", function (assert) {
	      assert.strictEqual(GLOBAL[name][Symbol.species], GLOBAL[name], name + "@@species === " + name);
	      var Subclass = create(GLOBAL[name]);
	      assert.strictEqual(Subclass[Symbol.species], Subclass, name + " subclass");
	    });
	  };

	  for (var _i2 = 0, _constructors = constructors; _i2 < _constructors.length; _i2++) {
	    _loop2();
	  }

	  QUnit.test('Array@@species', function (assert) {
	    assert.strictEqual(Array[Symbol.species], Array, 'Array@@species === Array');
	    var Subclass = create(Array);
	    assert.strictEqual(Subclass[Symbol.species], Subclass, 'Array subclass');
	  });
	  QUnit.test('Symbol.sham flag', function (assert) {
	    assert.same(Symbol.sham, typeof Symbol() === 'symbol' ? undefined : true);
	  });
	}

}());
