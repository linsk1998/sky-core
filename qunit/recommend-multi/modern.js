(function () {

	function ff_setPrototypeOf(obj, proto) {
	  obj.__proto__ = proto;
	  return obj;
	}
	function ie_setPrototypeOf(o, proto) {
	  o.__proto__ = proto;
	  for (var key in proto) {
	    if (Object.prototype.hasOwnProperty.call(proto, key)) {
	      o[key] = proto[key];
	    }
	  }
	  return o;
	}

	var Object$1 = window.Object;

	var setPrototypeOf = Object$1.setPrototypeOf;

	if (!setPrototypeOf) {
	  if (Object$1.prototype.__proto__) {
	    Object$1.setPrototypeOf = ff_setPrototypeOf;
	  } else {
	    Object$1.setPrototypeOf = ie_setPrototypeOf;
	  }
	}

	var Date = window.Date;

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
	    var time = this.getTime();
	    if (isNaN(time)) {
	      throw new RangeError("Invalid time value");
	    }
	    return this.getUTCFullYear() + '-' + prefixIntrger2(this.getUTCMonth() + 1) + '-' + prefixIntrger2(this.getUTCDate()) + 'T' + prefixIntrger2(this.getUTCHours()) + ':' + prefixIntrger2(this.getUTCMinutes()) + ':' + prefixIntrger2(this.getUTCSeconds()) + '.' + prefixIntrger3(this.getUTCMilliseconds()) + 'Z';
	  };
	}

	if (!Date.prototype.toJSON || new Date(0).toJSON() !== '1970-01-01T00:00:00.000Z') {
	  Date.prototype.toJSON = function (_) {
	    if (this.getTime && isNaN(this.getTime())) {
	      return null;
	    }
	    return this.toISOString();
	  };
	}

	var getOwnPropertyNames = Object$1.getOwnPropertyNames;

	var _Symbol$4 = window.Symbol;

	function isNotSymbolKey(key) {
	  return key.substring(0, 2) !== "@@";
	}

	function keys$3() {
	  var array = this;
	  var index = 0;
	  return {
	    next: function () {
	      var value;
	      var done = array.length <= index;
	      if (!done) {
	        value = index;
	        index++;
	      }
	      return {
	        done: done,
	        value: value
	      };
	    },
	    '@@iterator': function () {
	      return this;
	    },
	    '@@toStringTag': 'Array Iterator'
	  };
	}

	if (!Array.prototype.keys) {
	  Array.prototype.keys = keys$3;
	}

	var keys$2 = Object$1.keys;

	function ie_keys(obj) {
	  return keys$2.call(Object, obj).filter(isNotSymbolKey);
	}
	function nie_keys(obj) {
	  var result = [];
	  for (var key in obj) {
	    if (key.substring(0, 2) !== "@@" && Object.prototype.hasOwnProperty.call(obj, key)) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	function keys$1(obj) {
	  if (!keys$2) {
	    return nie_keys(obj);
	  } else if (_Symbol$4) {
	    return keys$2(obj);
	  } else {
	    return ie_keys(obj);
	  }
	}

	function ff_getOwnPropertyNames(obj) {
	  var keys = keys$1(obj);
	  var i = keys.length;
	  var names = [];
	  while (i-- > 0) {
	    var key = keys[i];
	    var set = obj.__lookupSetter__(key);
	    var get = obj.__lookupGetter__(key);
	    if (set || get) {
	      names.push(key);
	    }
	  }
	  return descs;
	}
	function ie_getOwnPropertyNames(obj) {
	  return getOwnPropertyNames(obj).filter(isNotSymbolKey);
	}

	if (getOwnPropertyNames) {
	  if (!_Symbol$4) {
	    Object.getOwnPropertyNames = ie_getOwnPropertyNames;
	  }
	} else {
	  if (Object.prototype.__defineSetter__) {
	    Object.getOwnPropertyNames = ff_getOwnPropertyNames;
	  }
	}

	var defineProperties$1 = Object$1.defineProperties;

	var nonEnumerable = !!defineProperties$1;

	var defineProperty$1 = Object$1.defineProperty;

	var symbol_sqe = 0;
	var all_symbol = {};
	function _Symbol$3(desc) {
	  var key = "@@" + desc + ":" + symbol_sqe;
	  this.__name__ = key;
	  if (nonEnumerable) {
	    defineProperty$1(Object.prototype, key, {
	      enumerable: false,
	      configurable: true,
	      set: function (value) {
	        defineProperty$1(this, key, {
	          enumerable: false,
	          configurable: true,
	          writable: true,
	          value: value
	        });
	      }
	    });
	  }
	  if (desc !== undefined) {
	    this.description = String(desc);
	  }
	  symbol_sqe++;
	  all_symbol[key] = this;
	}
	;
	_Symbol$3.prototype.toString = function () {
	  return this.__name__;
	};
	_Symbol$3.prototype.toJSON = function () {
	  return undefined;
	};
	function getOwnPropertySymbols(obj) {
	  var arr = [];
	  var keys = Object.getOwnPropertyNames(obj);
	  var i = keys.length;
	  while (i-- > 0) {
	    var key = keys[i];
	    if (key.substring(0, 2) === "@@") {
	      if (Object.prototype.hasOwnProperty.call(obj, key)) {
	        if (key in all_symbol) {
	          arr.push(all_symbol[key]);
	        }
	      }
	    }
	  }
	  return arr;
	}
	;

	function _Symbol$2(desc) {
	  return new _Symbol$3(desc);
	}
	;
	_Symbol$2.sham = true;

	function _Symbol$1(desc) {
	  if (desc == undefined) {
	    desc = "";
	  }
	  return _Symbol$4(desc);
	}
	;

	var _Symbol = (function () {
	  var _Symbol;
	  if (!_Symbol$4) {
	    _Symbol = _Symbol$2;
	  } else {
	    if (String(_Symbol$4()) !== String(_Symbol$4(""))) {
	      Object.setPrototypeOf(_Symbol$1, _Symbol$4);
	      _Symbol = _Symbol$1;
	    } else {
	      _Symbol = _Symbol$4;
	    }
	  }
	  return _Symbol;
	})();

	var $inject_Symbol_iterator = (function () {
	  if (!_Symbol$4) {
	    if (nonEnumerable) {
	      defineProperty$1(Object.prototype, '@@iterator', {
	        enumerable: false,
	        configurable: false,
	        writable: true
	      });
	    }
	    return '@@iterator';
	  } else {
	    return _Symbol$4.iterator || _Symbol$4('iterator');
	  }
	})();

	function _typeof(obj) {
	  "@babel/helpers - typeof";

	  return _typeof = "function" == typeof _Symbol && "symbol" == typeof $inject_Symbol_iterator ? function (obj) {
	    return typeof obj;
	  } : function (obj) {
	    return obj && "function" == typeof _Symbol && obj.constructor === _Symbol && obj !== _Symbol.prototype ? "symbol" : typeof obj;
	  }, _typeof(obj);
	}

	var DESCRIPTORS = !!function () {
	  try {
	    return Object.defineProperty({}, 'a', {
	      get: function () {
	        return 7;
	      }
	    }).a === 7;
	  } catch (_unused) {/* empty */}
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
	    function F() {/* empty */}
	    F.prototype.constructor = null;
	    return Object.getPrototypeOf(new F()) !== F.prototype;
	  } catch (_unused4) {
	    return true;
	  }
	}();
	var WHITESPACES = "\t\n\x0B\f\r \xA0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF";

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

	function isString(obj) {
	  return Object.prototype.toString.call(obj) === '[object String]';
	}
	;

	function iterator() {
	  var p = 0;
	  var string = this;
	  var size = this.length;
	  return {
	    next: function () {
	      var value;
	      var done = p >= string.length;
	      if (!done) {
	        value = string.charAt(p);
	        var first = value.charCodeAt(0);
	        if (
	        // 检查是否开始 surrogate pair
	        first >= 0xD800 && first <= 0xDBFF &&
	        // high surrogate
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
	    '@@iterator': function () {
	      return this;
	    }
	  };
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

	function values() {
	  var array = this;
	  var index = 0;
	  return {
	    next: function () {
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
	    '@@iterator': function () {
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

	function ES6Iterator(it, transform) {
	  this.iterator = it;
	  this.transform = transform;
	}
	ES6Iterator.prototype.next = function () {
	  var r = {};
	  try {
	    r.value = this.iterator.next();
	  } catch (e) {
	    r.done = true;
	    r.value = undefined;
	    return r;
	  }
	  r.done = false;
	  if (this.transform) {
	    r.value = this.transform(r.value);
	  }
	  return r;
	};
	//使用ff版iterator必然不支持Symbol，因此不使用Symbol.iterator，避免产生依赖
	ES6Iterator.prototype['@@iterator'] = function () {
	  return this;
	};
	function toES6Iterator(it) {
	  return new ES6Iterator(it);
	}
	;

	if (!_Symbol$4) {
	  if (!String.prototype['@@iterator']) {
	    String.prototype['@@iterator'] = iterator;
	  } else if (String.prototype.iterator) {
	    String.prototype['@@iterator'] = function () {
	      return toES6Iterator(this.iterator());
	    };
	  }
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
	  var it = typeof _Symbol !== "undefined" && o[$inject_Symbol_iterator] || o["@@iterator"];
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
	    next: function () {
	      iterator.called = true;
	      return {
	        value: elements[index++],
	        done: index > elements.length
	      };
	    }
	  };
	  if (methods) for (var key in methods) iterator[key] = methods[key];
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
	      next: function () {
	        iterable.called = true;
	        return {
	          value: elements[index++],
	          done: index > elements.length
	        };
	      }
	    };
	    if (methods) for (var key in methods) iterator[key] = methods[key];
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
	  } catch (_unused) {/* empty */}
	}();

	// export function timeLimitedPromise(time, fn) {
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
	QUnit.assert.isAsyncIterable = function (it, message) {
	  // this.pushResult({
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
	    result: _typeof(it) === 'object' && typeof it.next === 'function',
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
	      message: message || (_typeof(key) === 'symbol' ? 'method' : "'" + key + "'") + " is enumerable"
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
	  this.ok(true, "no support enumerable");
	  // if(DESCRIPTORS) {
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
	  var throws, result, error;
	  try {
	    result = fn();
	    throws = false;
	  } catch (err) {
	    throws = true;
	    error = err;
	  }
	  this.pushResult({
	    result: !throws && result,
	    actual: throws ? error : result,
	    expected: throws ? undefined : true,
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

	var $inject_Symbol_hasInstance = (function () {
	  if (!_Symbol$4) {
	    if (nonEnumerable) {
	      defineProperty$1(Object.prototype, '@@hasInstance', {
	        enumerable: false,
	        configurable: false,
	        writable: true
	      });
	    }
	    return '@@hasInstance';
	  } else {
	    return _Symbol$4.hasInstance || _Symbol$4('hasInstance');
	  }
	})();

	var $inject_Symbol_asyncIterator = (function () {
	  if (!_Symbol$4) {
	    if (nonEnumerable) {
	      defineProperty$1(Object.prototype, '@@asyncIterator', {
	        enumerable: false,
	        configurable: false,
	        writable: true
	      });
	    }
	    return '@@asyncIterator';
	  } else {
	    return _Symbol$4.asyncIterator || _Symbol$4('asyncIterator');
	  }
	})();

	//import { Symbol } from "./Symbol";
	var symbol_cache$1 = {};
	var key_cache = {};
	function modern_for (desc) {
	  if (Object.prototype.hasOwnProperty.call(symbol_cache$1, desc)) {
	    return symbol_cache$1[desc];
	  }
	  var s = _Symbol(desc);
	  key_cache[s] = desc;
	  symbol_cache$1[desc] = s;
	  return s;
	}
	;

	var symbol_cache = {};
	function compat_for (desc) {
	  if (Object.prototype.hasOwnProperty.call(symbol_cache, desc)) {
	    return symbol_cache[desc];
	  }
	  var s = _Symbol(desc);
	  s.__key__ = desc;
	  symbol_cache[desc] = s;
	  return s;
	}
	;

	var $inject_Symbol_for = _Symbol$4 ? _Symbol$4.for || modern_for : compat_for;

	function keyFor$1(symbol) {
	  if (_typeof(symbol) !== "symbol") {
	    throw new TypeError(symbol + " is not a symbol");
	  }
	  return key_cache[symbol];
	}
	;

	function keyFor(symbol) {
	  var s = String(symbol);
	  if (s.indexOf("@@") !== 0) {
	    throw new TypeError(s + " is not a symbol");
	  }
	  return symbol.__key__;
	}
	;

	var $inject_Symbol_keyFor = _Symbol$4 ? _Symbol$4.keyFor || keyFor$1 : keyFor;

	if (!Object$1.getOwnPropertySymbols) {
	  Object$1.getOwnPropertySymbols = getOwnPropertySymbols;
	}

	if (!Object$1.keys) {
	  Object$1.keys = nie_keys;
	} else if (!_Symbol$4) {
	  Object$1.keys = ie_keys;
	}

	function defineProperty(obj, prop, descriptor) {
	  if ('value' in descriptor) {
	    delete obj[prop];
	    obj[prop] = descriptor.value;
	  } else {
	    if (descriptor.get) obj.__defineGetter__(prop, descriptor.get);
	    if (descriptor.set) obj.__defineSetter__(prop, descriptor.set);
	  }
	  return obj;
	}
	;

	if (!Object$1.defineProperty) {
	  if (Object$1.prototype.__defineSetter__) {
	    Object$1.defineProperty = defineProperty;
	  }
	}

	function defineProperties(obj, properties) {
	  var ownKeys = Object.keys(properties);
	  var len = ownKeys.length;
	  for (var i = 0; i < len; i++) {
	    var key = ownKeys[i];
	    Object.defineProperty(obj, key, properties[key]);
	  }
	  return obj;
	}
	;
	defineProperties.sham = true;

	if (!defineProperties$1) {
	  Object$1.defineProperties = defineProperties;
	}

	var dontEnums = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable"];

	// from core-js
	var GT = '>';
	var LT = '<';
	var SCRIPT = 'script';
	function scriptTag(content) {
	  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
	}

	// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
	function NullProtoObjectViaActiveX(activeXDocument) {
	  activeXDocument.write(scriptTag(''));
	  activeXDocument.close();
	  var temp = activeXDocument.parentWindow.Object;
	  activeXDocument = null; // avoid memory leak
	  return temp;
	}
	;

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	function NullProtoObjectViaIFrame() {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = documentCreateElement('iframe');
	  var JS = 'java' + SCRIPT + ':';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  html.appendChild(iframe);
	  // https://github.com/zloirock/core-js/issues/475
	  iframe.src = String(JS);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(scriptTag('document.F=Object'));
	  iframeDocument.close();
	  return iframeDocument.F;
	}
	;

	// Check for document.domain and active x support
	// No need to use active x approach when document.domain is not set
	// see https://github.com/es-shims/es5-shim/issues/150
	// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
	// avoid IE GC bug
	var activeXDocument;
	var NullProtoObject = function () {
	  try {
	    /* global ActiveXObject -- old IE */
	    activeXDocument = document.domain && new ActiveXObject('htmlfile');
	  } catch (error) {/* ignore */}
	  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
	  var i = dontEnums.length;
	  while (i--) delete NullProtoObject.prototype[dontEnums[i]];
	  return NullProtoObject();
	};

	function F() {/* empty */}
	;
	function create$1(proto, properties) {
	  var o;
	  if (proto !== null) {
	    F.prototype = proto;
	    var o = new F();
	    F.prototype = null;
	  } else {
	    o = NullProtoObject();
	  }
	  o.__proto__ = proto;
	  if (properties) {
	    Object.defineProperties(o, properties);
	  }
	  return o;
	}
	;
	create$1.sham = true;

	if (!Object$1.create) {
	  if ('__proto__' in Object$1.prototype) {
	    Object$1.create = create$1;
	  }
	}

	function getOwnPropertyDescriptor(obj, key) {
	  if (Object.prototype.hasOwnProperty.call(obj, key)) {
	    var r = new Object();
	    r.enumerable = true;
	    r.configurable = true;
	    r.set = obj.__lookupSetter__(key);
	    r.get = obj.__lookupGetter__(key);
	    return r;
	  }
	}
	;

	if (!Object$1.getOwnPropertyDescriptor) {
	  if (Object$1.prototype.__defineSetter__) {
	    Object$1.getOwnPropertyDescriptor = getOwnPropertyDescriptor;
	  }
	}

	var _ref = GLOBAL.Reflect || {},
	  ownKeys = _ref.ownKeys;
	QUnit.test('Symbol', function (assert) {
	  assert.isFunction(_Symbol);
	  if (NATIVE) assert.strictEqual(_Symbol.length, 0, 'arity is 0');
	  assert.name(_Symbol, 'Symbol');
	  var symbol1 = _Symbol('symbol');
	  var symbol2 = _Symbol('symbol');
	  assert.ok(symbol1 !== symbol2, 'Symbol("symbol") !== Symbol("symbol")');
	  var object = {};
	  object[symbol1] = 42;
	  assert.ok(object[symbol1] === 42, 'Symbol() work as key');
	  assert.ok(object[symbol2] !== 42, 'Various symbols from one description are various keys');
	  if (DESCRIPTORS) {
	    var count = 0;
	    // eslint-disable-next-line no-unused-vars -- required for testing
	    for (var key in object) count++;
	    assert.ok(count === 0, 'object[Symbol()] is not enumerable');
	  }
	});
	QUnit.test('Well-known Symbols', function (assert) {
	  assert.ok($inject_Symbol_hasInstance, "Symbol.hasInstance available");
	  assert.ok($inject_Symbol_iterator, "Symbol.iterator available");
	  assert.ok($inject_Symbol_asyncIterator, "Symbol.asyncIterator available");
	});
	QUnit.test('Global symbol registry', function (assert) {
	  assert.isFunction($inject_Symbol_for, 'Symbol.for is function');
	  assert.strictEqual($inject_Symbol_for.length, 1, 'Symbol.for arity is 1');
	  if (NATIVE) assert.strictEqual($inject_Symbol_for.name, 'for', 'Symbol.for.name is "for"');
	  assert.isFunction($inject_Symbol_keyFor, 'Symbol.keyFor is function');
	  assert.strictEqual($inject_Symbol_keyFor.length, 1, 'Symbol.keyFor arity is 1');
	  assert.name($inject_Symbol_keyFor, 'keyFor');
	  var symbol = $inject_Symbol_for('foo');
	  assert.strictEqual($inject_Symbol_for('foo'), symbol);
	  assert.strictEqual($inject_Symbol_keyFor(symbol), 'foo');
	  assert.throws(function () {
	    return $inject_Symbol_keyFor('foo');
	  }, 'throws on non-symbol');
	});
	QUnit.test('Object.getOwnPropertySymbols', function (assert) {
	  assert.isFunction(Object.getOwnPropertySymbols);
	  assert.strictEqual(Object.getOwnPropertySymbols.length, 1, 'arity is 1');
	  assert.name(Object.getOwnPropertySymbols, 'getOwnPropertySymbols');
	  var prototype = {
	    q: 1,
	    w: 2,
	    e: 3
	  };
	  prototype[_Symbol()] = 42;
	  prototype[_Symbol()] = 43;
	  assert.deepEqual(Object.getOwnPropertyNames(prototype).sort(), ['e', 'q', 'w']);
	  assert.strictEqual(Object.getOwnPropertySymbols(prototype).length, 2);
	  var object = Object.create(prototype);
	  object.a = 1;
	  object.s = 2;
	  object.d = 3;
	  object[_Symbol()] = 44;
	  assert.deepEqual(Object.getOwnPropertyNames(object).sort(), ['a', 'd', 's']);
	  assert.strictEqual(Object.getOwnPropertySymbols(object).length, 1);
	  assert.strictEqual(Object.getOwnPropertySymbols(Object.prototype).length, 0);
	  var primitives = [42, 'foo', false];
	  var _loop = function (value) {
	    assert.notThrows(function () {
	      return Object.getOwnPropertySymbols(value);
	    }, "accept " + _typeof(value));
	  };
	  for (var _i = 0, _primitives = primitives; _i < _primitives.length; _i++) {
	    var value = _primitives[_i];
	    _loop(value);
	  }
	});
	if (JSON) {
	  QUnit.test('Symbols & JSON.stringify', function (assert) {
	    assert.strictEqual(JSON.stringify([1, _Symbol('foo'), false, _Symbol('bar'), {}]), '[1,null,false,null,{}]', 'array value');
	    assert.strictEqual(JSON.stringify({
	      symbol: _Symbol('symbol')
	    }), '{}', 'object value');
	    if (DESCRIPTORS) {
	      var object = {
	        bar: 2
	      };
	      object[_Symbol('symbol')] = 1;
	      assert.strictEqual(JSON.stringify(object), '{"bar":2}', 'object key');
	    }
	    // assert.strictEqual(JSON.stringify(Symbol('symbol')), undefined, 'symbol value');
	    if (_typeof(_Symbol()) === 'symbol') {
	      assert.strictEqual(JSON.stringify(Object(_Symbol('symbol'))), '{}', 'boxed symbol');
	    }
	    // assert.strictEqual(JSON.stringify(undefined, () => 42), '42', 'replacer works with top-level undefined');
	  });
	}

	if (DESCRIPTORS) {
	  QUnit.test('Symbols & descriptors', function (assert) {
	    var d = _Symbol('d');
	    var e = _Symbol('e');
	    var f = _Symbol('f');
	    var i = _Symbol('i');
	    var j = _Symbol('j');
	    var prototype = {
	      g: 'g'
	    };
	    prototype[i] = 'i';
	    Object.defineProperty(prototype, 'h', {
	      value: 'h'
	    });
	    Object.defineProperty(prototype, 'j', {
	      value: 'j'
	    });
	    var object = create(prototype);
	    object.a = 'a';
	    object[d] = 'd';
	    Object.defineProperty(object, 'b', {
	      value: 'b'
	    });
	    Object.defineProperty(object, 'c', {
	      value: 'c',
	      enumerable: true
	    });
	    Object.defineProperty(object, e, {
	      configurable: true,
	      writable: true,
	      value: 'e'
	    });
	    var descriptor = {
	      value: 'f',
	      enumerable: true
	    };
	    Object.defineProperty(object, f, descriptor);
	    assert.strictEqual(descriptor.enumerable, true, 'defineProperty not changes descriptor object');
	    assert.deepEqual(Object.getOwnPropertyDescriptor(object, 'a'), {
	      configurable: true,
	      writable: true,
	      enumerable: true,
	      value: 'a'
	    }, 'getOwnPropertyDescriptor a');
	    assert.deepEqual(Object.getOwnPropertyDescriptor(object, 'b'), {
	      configurable: false,
	      writable: false,
	      enumerable: false,
	      value: 'b'
	    }, 'getOwnPropertyDescriptor b');
	    assert.deepEqual(Object.getOwnPropertyDescriptor(object, 'c'), {
	      configurable: false,
	      writable: false,
	      enumerable: true,
	      value: 'c'
	    }, 'getOwnPropertyDescriptor c');
	    assert.deepEqual(Object.getOwnPropertyDescriptor(object, d), {
	      configurable: true,
	      writable: true,
	      enumerable: true,
	      value: 'd'
	    }, 'getOwnPropertyDescriptor d');
	    assert.deepEqual(Object.getOwnPropertyDescriptor(object, e), {
	      configurable: true,
	      writable: true,
	      enumerable: false,
	      value: 'e'
	    }, 'getOwnPropertyDescriptor e');
	    assert.deepEqual(Object.getOwnPropertyDescriptor(object, f), {
	      configurable: false,
	      writable: false,
	      enumerable: true,
	      value: 'f'
	    }, 'getOwnPropertyDescriptor f');
	    assert.strictEqual(Object.getOwnPropertyDescriptor(object, 'g'), undefined, 'getOwnPropertyDescriptor g');
	    assert.strictEqual(Object.getOwnPropertyDescriptor(object, 'h'), undefined, 'getOwnPropertyDescriptor h');
	    assert.strictEqual(Object.getOwnPropertyDescriptor(object, i), undefined, 'getOwnPropertyDescriptor i');
	    assert.strictEqual(Object.getOwnPropertyDescriptor(object, j), undefined, 'getOwnPropertyDescriptor j');
	    assert.strictEqual(Object.getOwnPropertyDescriptor(object, 'k'), undefined, 'getOwnPropertyDescriptor k');
	    assert.strictEqual(Object.getOwnPropertyDescriptor(Object.prototype, 'toString').enumerable, false, 'getOwnPropertyDescriptor on Object.prototype');
	    assert.strictEqual(Object.getOwnPropertyDescriptor(Object.prototype, d), undefined, 'getOwnPropertyDescriptor on Object.prototype missed symbol');
	    assert.strictEqual(keys(object).length, 2, 'Object.keys');
	    assert.strictEqual(Object.getOwnPropertyNames(object).length, 3, 'Object.getOwnPropertyNames');
	    assert.strictEqual(Object.getOwnPropertySymbols(object).length, 3, 'Object.getOwnPropertySymbols');
	    assert.strictEqual(ownKeys(object).length, 6, 'Reflect.ownKeys');
	    delete object[e];
	    object[e] = 'e';
	    assert.deepEqual(Object.getOwnPropertyDescriptor(object, e), {
	      configurable: true,
	      writable: true,
	      enumerable: true,
	      value: 'e'
	    }, 'redefined non-enum key');
	  });
	  QUnit.test('Symbols & Object.defineProperties', function (assert) {
	    var c = _Symbol('c');
	    var d = _Symbol('d');
	    var descriptors = {
	      a: {
	        value: 'a'
	      }
	    };
	    descriptors[c] = {
	      value: 'c'
	    };
	    Object.defineProperty(descriptors, 'b', {
	      value: {
	        value: 'b'
	      }
	    });
	    Object.defineProperty(descriptors, d, {
	      value: {
	        value: 'd'
	      }
	    });
	    var object = Object.defineProperties({}, descriptors);
	    assert.strictEqual(object.a, 'a', 'a');
	    assert.strictEqual(object.b, undefined, 'b');
	    assert.strictEqual(object[c], 'c', 'c');
	    assert.strictEqual(object[d], undefined, 'd');
	  });
	  QUnit.test('Symbols & Object.create', function (assert) {
	    var c = _Symbol('c');
	    var d = _Symbol('d');
	    var descriptors = {
	      a: {
	        value: 'a'
	      }
	    };
	    descriptors[c] = {
	      value: 'c'
	    };
	    Object.defineProperty(descriptors, 'b', {
	      value: {
	        value: 'b'
	      }
	    });
	    Object.defineProperty(descriptors, d, {
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
	  var _loop2 = function (name) {
	    QUnit.test(name + "@@species", function (assert) {
	      assert.strictEqual(GLOBAL[name][_Symbol.species], GLOBAL[name], name + "@@species === " + name);
	      var Subclass = create(GLOBAL[name]);
	      assert.strictEqual(Subclass[_Symbol.species], Subclass, name + " subclass");
	    });
	  };
	  for (var _i2 = 0, _constructors = constructors; _i2 < _constructors.length; _i2++) {
	    var name = _constructors[_i2];
	    _loop2(name);
	  }
	  QUnit.test('Array@@species', function (assert) {
	    assert.strictEqual(Array[_Symbol.species], Array, 'Array@@species === Array');
	    var Subclass = create(Array);
	    assert.strictEqual(Subclass[_Symbol.species], Subclass, 'Array subclass');
	  });
	  QUnit.test('Symbol.sham flag', function (assert) {
	    assert.same(_Symbol.sham, _typeof(_Symbol()) === 'symbol' ? undefined : true);
	  });
	}

	QUnit.test('Symbol#description', function (assert) {
	  assert.same(_Symbol('foo').description, 'foo');
	  assert.same(_Symbol('').description, '');
	  assert.same(_Symbol(')').description, ')');
	  assert.same(_Symbol({}).description, '[object Object]');
	  assert.same(_Symbol(null).description, 'null');
	  assert.same(_Symbol(undefined).description, undefined);
	  assert.same(_Symbol().description, undefined);
	  assert.same(Object(_Symbol('foo')).description, 'foo');
	  assert.same(Object(_Symbol()).description, undefined);
	  // if (DESCRIPTORS) {
	  //   assert.ok(!Object.prototype.hasOwnProperty.call(Symbol('foo'), 'description'));
	  //   const descriptor = Object.getOwnPropertyDescriptor(Symbol.prototype, 'description');
	  //   assert.same(descriptor.enumerable, false);
	  //   assert.same(descriptor.configurable, true);
	  //   assert.same(typeof descriptor.get, 'function');
	  // }
	  if (_typeof(_Symbol()) == 'symbol') {
	    assert.same(_Symbol('foo').toString(), 'Symbol(foo)');
	    assert.same(String(_Symbol('foo')), 'Symbol(foo)');
	    assert.same(_Symbol('').toString(), 'Symbol()');
	    assert.same(String(_Symbol('')), 'Symbol()');
	    assert.same(_Symbol().toString(), 'Symbol()');
	    assert.same(String(_Symbol()), 'Symbol()');
	  }
	});

	QUnit.test('Symbol.asyncIterator', function (assert) {
	  assert.ok('asyncIterator' in _Symbol, 'Symbol.asyncIterator available');
	  if (DESCRIPTORS) {
	    var descriptor = Object.getOwnPropertyDescriptor(_Symbol, 'asyncIterator');
	    assert.ok(!descriptor.enumerble, 'non-enumerable');
	    assert.ok(!descriptor.writable, 'non-writable');
	    assert.ok(!descriptor.configurable, 'non-configurable');
	  }
	});

	// import "./es.object.assign";
	// import "./es.object.create";
	// import "./es.object.define-properties";
	// import "./es.object.define-property";
	// import "./es.object.entries";
	// import "./es.object.from-entries";
	// import "./es.object.get-own-property-descriptor";
	// import "./es.object.get-own-property-descriptors";
	// import "./es.object.get-own-property-names";
	// import "./es.object.get-prototype-of";
	// import "./es.object.is";
	// import "./es.object.keys";
	// import "./es.object.set-prototype-of";
	// import "./es.object.values";

	// import "./es.global-this";

	// import "./es.function.bind";
	// import "./es.function.name";
	// import "./es.function.has-instance";

	// import "./es.date.to-json";
	// import "./es.date.to-iso-string";
	// import "./es.date.to-string";

	// import "./es.number.epsilon";
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

	// import "./es.date.to-iso-string";
	// import "./es.date.to-json";
	// import "./es.date.to-string";

	// import "./es.map";
	// import "./es.set";

	// import "./es.weak-map";
	// import "./es.weak-set";

	// import "./es.promise";
	// import "./es.promise.finally";
	// import "./es.promise.all-settled";
	// import "./es.promise.any";
	// import "./es.aggregate-error";

	// import "../web/web.url";

})();
