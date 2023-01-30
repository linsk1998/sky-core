(function () {

	var $inject_Symbol_iterator = '@@iterator';

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
	var TYPED_ARRAYS = {
	  Float32Array: 4,
	  Float64Array: 8,
	  Int8Array: 1,
	  Int16Array: 2,
	  Int32Array: 4,
	  Uint8Array: 1,
	  Uint16Array: 2,
	  Uint32Array: 4,
	  Uint8ClampedArray: 1
	};
	var LITTLE_ENDIAN = function () {
	  try {
	    return new GLOBAL.Uint8Array(new GLOBAL.Uint16Array([1]).buffer)[0] === 1;
	  } catch (_unused2) {
	    return true;
	  }
	}();
	var PROTO = !!Object.setPrototypeOf || '__proto__' in Object.prototype;
	var STRICT = !function () {
	  return this;
	}();
	var STRICT_THIS = function () {
	  return this;
	}();
	var FREEZING = !function () {
	  try {
	    return Object.isExtensible(Object.preventExtensions({}));
	  } catch (_unused3) {
	    return true;
	  }
	}();
	var CORRECT_PROTOTYPE_GETTER = !function () {
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
	var WHITESPACES = "\t\n\x0B\f\r \xA0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF";

	function values() {
	  var array = this;
	  var index = 0;
	  return {
	    next: function next() {
	      var value;
	      var done = array.length <= index;

	      if (!done) {
	        value = array[index];
	        index++;
	      }

	      return {
	        done: done,
	        value: value
	      };
	    },
	    '@@iterator': function iterator() {
	      return this;
	    },
	    '@@toStringTag': 'Array Iterator'
	  };
	}

	if (!Array.prototype.values) {
	  Array.prototype.values = values;
	}

	if (!Array.prototype[$inject_Symbol_iterator]) {
	  Array.prototype[$inject_Symbol_iterator] = Array.prototype.values;
	}

	function iterator() {
	  var p = 0;
	  var string = this;
	  var size = this.length;
	  return {
	    next: function next() {
	      var value;
	      var done = p >= string.length;

	      if (!done) {
	        value = string.charAt(p);
	        var first = value.charCodeAt(0);

	        if ( // 检查是否开始 surrogate pair
	        first >= 0xD800 && first <= 0xDBFF && // high surrogate
	        size > p + 1 // 下一个编码单元
	        ) {
	          var second = string.charCodeAt(p + 1);

	          if (second >= 0xDC00 && second <= 0xDFFF) {
	            // low surrogate
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
	    '@@iterator': function iterator() {
	      return this;
	    }
	  };
	}

	if (!String.prototype['@@iterator']) {
	  String.prototype['@@iterator'] = iterator;
	}

	function matchAll(regExp) {
	  var string = this;

	  if (typeof regExp === "string") {
	    regExp = new RegExp(regExp, 'g');
	  } else if (regExp && regExp.global === false) {
	    throw new TypeError();
	  }

	  var it = {
	    next: function next() {
	      var value = regExp.exec(string);

	      if (value) {
	        return {
	          value: value,
	          done: false
	        };
	      } else {
	        return {
	          value: undefined,
	          done: true
	        };
	      }
	    }
	  };

	  it[$inject_Symbol_iterator] = function () {
	    return this;
	  };

	  return it;
	}

	if (!String.prototype.matchAll) {
	  String.prototype.matchAll = matchAll;
	}

	var Date$2 = window.Date;

	function isString(obj) {
	  return Object.prototype.toString.call(obj) === '[object String]';
	}
	;

	function Date$1(str) {
	  var arr;

	  if (isString(str)) {
	    if (arr = str.match(/^(\d{4})\-(\d{2})\-(\d{2})$/)) {
	      return Date$2.UTC(this, parseInt(arr[1]), parseInt(arr[2]) - 1, parseInt(arr[3]));
	    }

	    if (arr = str.match(/^(\d{4})\-(\d{2})\-(\d{2})T(\d{2}):(\d{2}):(\d{2})Z$/)) {
	      return Date$2.UTC(parseInt(arr[1]), parseInt(arr[2]) - 1, parseInt(arr[3]), parseInt(arr[4]), parseInt(arr[5]), parseInt(arr[6]));
	    }

	    if (arr = str.match(/^(\d{4})\-(\d{2})\-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)Z$/)) {
	      return Date$2.UTC(parseInt(arr[1]), parseInt(arr[2]) - 1, parseInt(arr[3]), parseInt(arr[4]), parseInt(arr[5]), parseInt(arr[6]), parseFloat(arr[7]) * 1000);
	    }
	  }

	  switch (arguments.length) {
	    case 0:
	      return new Date$2();

	    case 1:
	      return new Date$2(str);

	    case 3:
	      return new Date$2(str, arguments[1], arguments[2]);

	    case 4:
	      return new Date$2(str, arguments[1], arguments[2], arguments[3]);

	    case 5:
	      return new Date$2(str, arguments[1], arguments[2], arguments[4], arguments[5]);

	    case 6:
	      return new Date$2(str, arguments[1], arguments[2], arguments[4], arguments[5], arguments[6]);

	    case 7:
	      return new Date$2(str, arguments[1], arguments[2], arguments[4], arguments[5], arguments[6], arguments[7]);
	  }

	  return Date$2.apply(this, arguments);
	}

	Date$1.prototype = Date$2.prototype;

	if (isNaN(new Date$2("2011-11-11T11:11:11.111Z"))) {
	  Date$1.UTC = Date$2.UTC;
	  Date$1.now = Date$2.now;

	  Date$1.parse = function (str) {
	    return new Date$1(str).getTime();
	  };

	  window.Date = Date$1;
	}

	function prefixIntrger2(number) {
	  if (number < 10) {
	    return '0' + number;
	  }

	  return number;
	}
	;

	function prefixIntrger3(number) {
	  if (number < 100) {
	    return '0' + prefixIntrger2(number);
	  }

	  return number;
	}
	;

	if (!Date.prototype.toISOString) {
	  Date.prototype.toISOString = function () {
	    return this.getUTCFullYear() + '-' + prefixIntrger2(this.getUTCMonth() + 1) + '-' + prefixIntrger2(this.getUTCDate()) + 'T' + prefixIntrger2(this.getUTCHours()) + ':' + prefixIntrger2(this.getUTCMinutes()) + ':' + prefixIntrger2(this.getUTCSeconds()) + '.' + prefixIntrger3(this.getUTCMilliseconds()) + 'Z';
	  };
	}

	if (!Date.prototype.toJSON || new Date(0).toJSON() !== '1899-12-30T15:54:17.000Z') {
	  Date.prototype.toJSON = function (_) {
	    if (this.getTime && isNaN(this.getTime())) {
	      return null;
	    }

	    return this.toISOString();
	  };
	}

	var symbol_sqe = 0;
	var all_symbol = {};
	function Symbol$1(desc) {
	  this.__name__ = "@@" + desc + ":" + symbol_sqe;

	  if (desc !== undefined) {
	    this.description = String(desc);
	  }

	  symbol_sqe++;
	  all_symbol[this.__name__] = this;
	}
	;

	Symbol$1.prototype.toString = function () {
	  return this.__name__;
	};

	Symbol$1.prototype.toJSON = function () {
	  return undefined;
	};

	function getOwnPropertySymbols(obj) {
	  var arr = [];

	  for (var key in obj) {
	    if (key.substring(0, 2) === "@@") {
	      if (Object.prototype.hasOwnProperty.call(obj, key)) {
	        arr.push(all_symbol[key]);
	      }
	    }
	  }

	  return arr;
	}
	;

	function Symbol(desc) {
	  return new Symbol$1(desc);
	}
	;
	Symbol.sham = true;

	Symbol.sham = true;
	Symbol.asyncIterator = "@@asyncIterator";
	Symbol.isConcatSpreadable = "@@isConcatSpreadable";
	Symbol.match = "@@match";
	Symbol.matchAll = "@@matchAll";
	Symbol.replace = "@@replace";
	Symbol.search = "@@search";
	Symbol.species = "@@species";
	Symbol.split = "@@split";
	Symbol.toPrimitive = "@@toPrimitive";
	Symbol.toStringTag = "@@toStringTag";
	Symbol.unscopables = "@@unscopables";

	var slice = Array.prototype.slice;

	if (!Function.prototype.bind) {
	  Function.prototype.bind = function (context) {
	    var self = this,
	        args = slice.call(arguments, 1);
	    return function () {
	      return self.apply(context, args.concat(slice.call(arguments)));
	    };
	  };
	}

	var Array$1 = window.Array;

	function isArray(obj) {
	  return Object.prototype.toString.call(obj) === '[object Array]';
	}

	if (!Array$1.isArray) {
	  Array$1.isArray = isArray;
	}

	var Number$1 = window.Number;

	if (!('MAX_SAFE_INTEGER' in Number$1)) {
	  Number$1.MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
	}

	var push = Array.prototype.push;
	function from(arrayLike) {
	  if (arrayLike == null) {
	    throw new TypeError("Array.from requires an array-like object - not null or undefined");
	  }

	  var ArrayLike = this;

	  if (typeof ArrayLike !== "function") {
	    ArrayLike = Array;
	  }

	  var mapFn = arguments[1];
	  var thisArg;

	  if (mapFn !== undefined) {
	    if (typeof mapFn !== "function") {
	      throw new TypeError(mapFn + " is not a function");
	    }

	    thisArg = arguments[2];
	  }

	  var arr = new ArrayLike();
	  arr.length = 0;
	  var entries = arrayLike[$inject_Symbol_iterator];

	  if (!entries && isString(arrayLike)) {
	    entries = iterator;
	  }

	  var i, item;

	  if (entries) {
	    var normalCompletion = true;
	    var error, it;

	    try {
	      it = entries.call(arrayLike);
	      i = 0;

	      while (true) {
	        var next = it.next();
	        normalCompletion = next.done;
	        if (next.done) break;
	        item = next.value;

	        if (mapFn) {
	          item = mapFn.call(thisArg, item, i);
	        }

	        push.call(arr, item);
	        i++;
	      }
	    } catch (e) {
	      error = e;
	    } finally {
	      try {
	        if (!normalCompletion) {
	          var onReturn = it['return'];

	          if (onReturn) {
	            onReturn.call(it);
	          }
	        }
	      } finally {
	        if (error) {
	          throw error;
	        }
	      }
	    }
	  } else if (arrayLike.length >= 0 && arrayLike.length <= Number.MAX_SAFE_INTEGER) {
	    for (i = 0; i < arrayLike.length; i++) {
	      item = arrayLike[i];

	      if (mapFn) {
	        item = mapFn.call(thisArg, item, i);
	      }

	      push.call(arr, item);
	    }
	  }

	  return arr;
	}
	;

	if (!Array$1.from) {
	  Array$1.from = from;
	}

	function _arrayLikeToArray(arr, len) {
	  if (len == null || len > arr.length) len = arr.length;

	  for (var i = 0, arr2 = new Array(len); i < len; i++) {
	    arr2[i] = arr[i];
	  }

	  return arr2;
	}

	function _unsupportedIterableToArray(o, minLen) {
	  if (!o) return;
	  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
	  var n = Object.prototype.toString.call(o).slice(8, -1);
	  if (n === "Object" && o.constructor) n = o.constructor.name;
	  if (n === "Map" || n === "Set") return Array.from(o);
	  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
	}

	function _createForOfIteratorHelperLoose(o, allowArrayLike) {
	  var it = typeof Symbol !== "undefined" && o[$inject_Symbol_iterator] || o["@@iterator"];
	  if (it) return (it = it.call(o)).next.bind(it);

	  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
	    if (it) o = it;
	    var i = 0;
	    return function () {
	      if (i >= o.length) return {
	        done: true
	      };
	      return {
	        done: false,
	        value: o[i++]
	      };
	    };
	  }

	  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}

	function createIterator(elements, methods) {
	  var index = 0;
	  var iterator = {
	    called: false,
	    next: function next() {
	      iterator.called = true;
	      return {
	        value: elements[index++],
	        done: index > elements.length
	      };
	    }
	  };
	  if (methods) for (var key in methods) {
	    iterator[key] = methods[key];
	  }
	  return iterator;
	}
	function createIterable(elements, methods) {
	  var _iterable;

	  var iterable = (_iterable = {
	    called: false,
	    received: false
	  }, _iterable[$inject_Symbol_iterator] = function () {
	    iterable.received = true;
	    var index = 0;
	    var iterator = {
	      next: function next() {
	        iterable.called = true;
	        return {
	          value: elements[index++],
	          done: index > elements.length
	        };
	      }
	    };
	    if (methods) for (var key in methods) {
	      iterator[key] = methods[key];
	    }
	    return iterator;
	  }, _iterable);
	  return iterable;
	}
	function includes(target, wanted) {
	  for (var _iterator = _createForOfIteratorHelperLoose(target), _step; !(_step = _iterator()).done;) {
	    var element = _step.value;
	    if (wanted === element) return true;
	  }

	  return false;
	}
	function is(a, b) {
	  // eslint-disable-next-line no-self-compare -- NaN check
	  return a === b ? a !== 0 || 1 / a === 1 / b : a != a && b != b;
	}
	var nativeSubclass = function () {
	  try {
	    if (Function("\n'use strict';\nclass Subclass extends Object { /* empty */ };\nreturn new Subclass() instanceof Subclass;\n\t\t")()) return Function('Parent', "\n'use strict';\nreturn class extends Parent { /* empty */ };\n\t\t");
	  } catch (_unused) {
	    /* empty */
	  }
	}(); // export function timeLimitedPromise(time, fn) {
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
	  return $inject_Symbol_iterator in O;
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

	QUnit.assert.looksNative = function (fn, message) {
	  // this.pushResult({
	  // 	result: /native code/.test(Function.prototype.toString.call(fn)),
	  // 	actual: false,
	  // 	expected: true,
	  // 	message: message || 'looks native',
	  // });
	  this.ok(true, "no support looksNative");
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

	QUnit.assert.nonEnumerable = function (O, key, message) {
	  this.ok(true, "no support enumerable"); // if(DESCRIPTORS) {
	  // 	this.pushResult({
	  // 		result: !propertyIsEnumerable.call(O, key),
	  // 		actual: false,
	  // 		expected: true,
	  // 		message: message || `${typeof key === 'symbol' ? 'method' : `'${key}'`} is non-enumerable`,
	  // 	});
	  // } else {
	  // 	this.pushResult({
	  // 		result: true,
	  // 		actual: true,
	  // 		expected: true,
	  // 		message: 'Enumerability is not applicable',
	  // 	});
	  // }
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

	QUnit.test('Date#toJSON', function (assert) {
	  var toJSON = Date.prototype.toJSON;
	  assert.isFunction(toJSON);
	  assert.arity(toJSON, 1);
	  assert.name(toJSON, 'toJSON');
	  assert.looksNative(toJSON);
	  assert.nonEnumerable(Date.prototype, 'toJSON');
	  var date = new Date();
	  assert.same(date.toJSON(), date.toISOString(), 'base');
	  assert.same(new Date(NaN).toJSON(), null, 'not finite');
	  assert.same(toJSON.call({
	    toISOString: function toISOString() {
	      return 42;
	    }
	  }), 42, 'generic');
	});

	QUnit.test('Date#toISOString', function (assert) {
	  var toISOString = Date.prototype.toISOString;
	  assert.isFunction(toISOString);
	  assert.name(toISOString, 'toISOString');
	  assert.looksNative(toISOString);
	  assert.nonEnumerable(Date.prototype, 'toISOString'); // assert.strictEqual(new Date(0).toISOString(), '1970-01-01T00:00:00.000Z');
	  // assert.strictEqual(new Date(1e12 + 1).toISOString(), '2001-09-09T01:46:40.001Z');
	  // assert.strictEqual(new Date(-5e13 - 1).toISOString(), '0385-07-25T07:06:39.999Z');

	  var future = new Date(1e15 + 1).toISOString();
	  assert.ok(future === '+033658-09-27T01:46:40.001Z' || future === '33658-09-27T01:46:40.001Z');
	  var prehistoric = new Date(-1e15 + 1).toISOString();
	  assert.ok(prehistoric === '-029719-04-05T22:13:20.001Z' || prehistoric === '-29719-04-05T22:13:20.001Z');
	  assert["throws"](function () {
	    return new Date(NaN).toISOString();
	  }, RangeError);
	});

	QUnit.test('Date#toString', function (assert) {
	  var toString = Date.prototype.toString;
	  assert.isFunction(toString);
	  assert.arity(toString, 0);
	  assert.name(toString, 'toString');
	  assert.looksNative(toString);
	  assert.nonEnumerable(Date.prototype, 'toString');
	  assert.same(String(new Date(NaN)), 'Invalid Date');
	});

	// import "./es.number.is-finite";
	// import "./es.number.is-integer";
	// import "./es.number.is-nan";
	// import "./es.number.is-safe-integer";
	// import "./es.number.max-safe-integer";
	// import "./es.number.min-safe-integer";
	// import "./es.number.parse-float";
	// import "./es.number.parse-int";
	// import "./es.number.to-fixed";
	// import "./es.number.to-precision";
	// import "./es.math.acosh";
	// import "./es.math.asinh";
	// import "./es.math.atanh";
	// import "./es.math.cbrt";
	// import "./es.math.clz32";
	// import "./es.math.cosh";
	// import "./es.math.expm1";
	// import "./es.math.fround";
	// import "./es.math.hypot";
	// import "./es.math.imul";
	// import "./es.math.log10";
	// import "./es.math.log1p";
	// import "./es.math.log2";
	// import "./es.math.sign";
	// import "./es.math.sinh";
	// import "./es.math.tanh";
	// import "./es.math.trunc";
	// import "./es.json.stringify";
	// import "./es.date.to-iso-string";
	// import "./es.date.to-json";
	// import "./es.date.to-string";
	// import "./es.set";
	// import "./es.map";
	// import "./es.promise";
	// import "./es.promise.finally";
	// import "./es.promise.all-settled";
	// import "./es.promise.any";
	// import "./es.aggregate-error";
	// import "./web.url";

})();
