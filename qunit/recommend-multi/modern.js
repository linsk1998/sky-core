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

	var setPrototypeOf$1 = Object$1.setPrototypeOf;

	if (!setPrototypeOf$1) {
	  if (Object$1.prototype.__proto__) {
	    Object$1.setPrototypeOf = ff_setPrototypeOf;
	  } else {
	    Object$1.setPrototypeOf = ie_setPrototypeOf;
	  }
	}

	var Date$1 = window.Date;

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

	if (!Date$1.prototype.toISOString) {
	  Date$1.prototype.toISOString = function () {
	    var time = this.getTime();
	    if (isNaN(time)) {
	      throw new RangeError("Invalid time value");
	    }
	    return this.getUTCFullYear() + '-' + prefixIntrger2(this.getUTCMonth() + 1) + '-' + prefixIntrger2(this.getUTCDate()) + 'T' + prefixIntrger2(this.getUTCHours()) + ':' + prefixIntrger2(this.getUTCMinutes()) + ':' + prefixIntrger2(this.getUTCSeconds()) + '.' + prefixIntrger3(this.getUTCMilliseconds()) + 'Z';
	  };
	}

	if (!Date$1.prototype.toJSON || new Date$1(0).toJSON() !== '1970-01-01T00:00:00.000Z') {
	  Date$1.prototype.toJSON = function (_) {
	    if (this.getTime && isNaN(this.getTime())) {
	      return null;
	    }
	    return this.toISOString();
	  };
	}

	function isPrimitive(value) {
	  return typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean';
	}

	var defineProperties$1 = Object$1.defineProperties;

	var nonEnumerable = !!defineProperties$1;

	var defineProperty$1 = Object$1.defineProperty;

	var getOwnPropertyNames = Object$1.getOwnPropertyNames;

	var symbol_sqe = 0;
	var all_symbol = {};
	function _Symbol$8(desc) {
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
	_Symbol$8.prototype.toString = function () {
	  return this.__name__;
	};
	_Symbol$8.prototype.toJSON = function () {
	  return undefined;
	};
	var getOwnPropertySymbols = nonEnumerable ? function (obj) {
	  var arr = [];
	  if (isPrimitive(obj)) {
	    return arr;
	  }
	  var keys = getOwnPropertyNames(obj);
	  var i = keys.length;
	  while (i-- > 0) {
	    var key = keys[i];
	    if (key.substring(0, 2) === "@@") {
	      if (Object.prototype.hasOwnProperty.call(all_symbol, key)) {
	        arr.push(all_symbol[key]);
	      }
	    }
	  }
	  return arr;
	} : function (obj) {
	  var arr = [];
	  if (isPrimitive(obj)) {
	    return arr;
	  }
	  for (var key in obj) {
	    if (key.substring(0, 2) === "@@") {
	      if (Object.prototype.hasOwnProperty.call(obj, key)) {
	        arr.push(all_symbol[key]);
	      }
	    }
	  }
	  return arr;
	};

	function _Symbol$7(desc) {
	  return new _Symbol$8(desc);
	}
	;
	_Symbol$7.sham = true;

	var _Symbol$6 = window.Symbol;

	function _Symbol$5(desc) {
	  if (desc == undefined) {
	    desc = "";
	  }
	  return _Symbol$6(desc);
	}
	;

	var _Symbol$4 = (function () {
	  var _Symbol;
	  if (!_Symbol$6) {
	    _Symbol = _Symbol$7;
	  } else {
	    if (String(_Symbol$6()) !== String(_Symbol$6(""))) {
	      Object.setPrototypeOf(_Symbol$5, _Symbol$6);
	      _Symbol = _Symbol$5;
	    } else {
	      _Symbol = _Symbol$6;
	    }
	  }
	  return _Symbol;
	})();

	var $inject_Symbol_iterator = (function () {
	  if (!_Symbol$6) {
	    if (nonEnumerable) {
	      defineProperty$1(Object.prototype, '@@iterator', {
	        enumerable: false,
	        configurable: false,
	        writable: true
	      });
	    }
	    return '@@iterator';
	  } else {
	    return _Symbol$6.iterator || _Symbol$6('iterator');
	  }
	})();

	function _typeof(obj) {
	  "@babel/helpers - typeof";

	  return _typeof = "function" == typeof _Symbol$4 && "symbol" == typeof $inject_Symbol_iterator ? function (obj) {
	    return typeof obj;
	  } : function (obj) {
	    return obj && "function" == typeof _Symbol$4 && obj.constructor === _Symbol$4 && obj !== _Symbol$4.prototype ? "symbol" : typeof obj;
	  }, _typeof(obj);
	}

	var DESCRIPTORS = !!function () {
	  return !!Object.defineProperties || !!Object.prototype.__defineSetter__;
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
	  } catch (_unused) {
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
	  } catch (_unused2) {
	    return true;
	  }
	}();
	var CORRECT_PROTOTYPE_GETTER = !function () {
	  try {
	    function F() {/* empty */}
	    F.prototype.constructor = null;
	    return Object.getPrototypeOf(new F()) !== F.prototype;
	  } catch (_unused3) {
	    return true;
	  }
	}();
	var WHITESPACES = "\t\n\x0B\f\r \xA0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF";

	var slice = Array.prototype.slice;

	function bind(context) {
	  var self = this,
	    args = slice.call(arguments, 1);
	  return function () {
	    return self.apply(context, args.concat(slice.call(arguments)));
	  };
	}

	if (!Function.prototype.bind) {
	  Function.prototype.bind = bind;
	}

	var Array$1 = window.Array;

	function isArray(obj) {
	  return Object.prototype.toString.call(obj) === '[object Array]';
	}

	if (!Array$1.isArray) {
	  Array$1.isArray = isArray;
	}

	function defineProperty(obj, prop, descriptor) {
	  if (_typeof(obj) !== "object" && typeof obj !== "function") {
	    throw new TypeError("Object.defineProperty called on non-object");
	  }
	  prop = String(prop);
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

	var accessor = !!defineProperties$1 || !!Object.prototype.__defineSetter__;

	if (accessor) {
	  if (!('name' in Function.prototype)) {
	    Object.defineProperty(Function.prototype, 'name', {
	      enumerable: false,
	      configurable: true,
	      get: function () {
	        return Function.prototype.toString.call(this).match(/function\s*([^(]*)\(/)[1];
	      }
	    });
	  }
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

	function values$2() {
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
	  Array.prototype.values = values$2;
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

	if (!_Symbol$6) {
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
	  var it = typeof _Symbol$4 !== "undefined" && o[$inject_Symbol_iterator] || o["@@iterator"];
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
	function createIterable$1(elements, methods) {
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
	function includes$2(target, wanted) {
	  for (var _iterator = _createForOfIteratorHelperLoose(target), _step; !(_step = _iterator()).done;) {
	    var element = _step.value;
	    if (wanted === element) return true;
	  }
	  return false;
	}
	function is$1(a, b) {
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
	      if (!is$1(a[i], b[i])) {
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
	    result: is$1(a, b),
	    actual: a,
	    expected: b,
	    message: message
	  });
	};

	var parseInt$1 = window.parseInt;

	function trimStart() {
	  return this.replace(/^[\s\u2006\u3000\xA0]+/g, '');
	}

	if (parseInt$1("010") === 8) {
	  window.parseInt = function (number, radix) {
	    if (!radix && typeof number === 'string') {
	      number = trimStart.call(number);
	      if (number.charCodeAt(0) === 48 && number.charCodeAt(1) !== 120) {
	        return parseInt$1(number, 10);
	      }
	    }
	    return parseInt$1(number, radix);
	  };
	}

	function repeat$1(count) {
	  if (count < 0) {
	    throw new RangeError("RangeError repeat count must be non-negative");
	  }
	  if (count == Number.POSITIVE_INFINITY) {
	    throw new RangeError("RangeError repeat count must be less than infinity");
	  }
	  return new Array(parseInt(count + 1)).join(this);
	}

	function toInteger(n) {
	  return isNaN(n = +n) ? 0 : (n > 0 ? Math.floor : Math.ceil)(n);
	}

	// from core-js
	if (0.00008.toFixed(3) !== '0.000' || 0.9.toFixed(0) !== '1' || 1.255.toFixed(2) !== '1.25' || 1000000000000000128.0.toFixed(0) !== '1000000000000000128') {
	  var pow$1 = function (x, n, acc) {
	    return n === 0 ? acc : n % 2 === 1 ? pow$1(x, n - 1, acc * x) : pow$1(x * x, n / 2, acc);
	  };
	  var log$1 = function (x) {
	    var n = 0;
	    var x2 = x;
	    while (x2 >= 4096) {
	      n += 12;
	      x2 /= 4096;
	    }
	    while (x2 >= 2) {
	      n += 1;
	      x2 /= 2;
	    }
	    return n;
	  };
	  var multiply = function (data, n, c) {
	    var index = -1;
	    var c2 = c;
	    while (++index < 6) {
	      c2 += n * data[index];
	      data[index] = c2 % 1e7;
	      c2 = Math.floor(c2 / 1e7);
	    }
	  };
	  var divide = function (data, n) {
	    var index = 6;
	    var c = 0;
	    while (--index >= 0) {
	      c += data[index];
	      data[index] = Math.floor(c / n);
	      c = c % n * 1e7;
	    }
	  };
	  var dataToString = function (data) {
	    var index = 6;
	    var s = '';
	    while (--index >= 0) {
	      if (s !== '' || index === 0 || data[index] !== 0) {
	        var t = String(data[index]);
	        s = s === '' ? t : s + repeat$1.call('0', 7 - t.length) + t;
	      }
	    }
	    return s;
	  };
	  Number.prototype.toFixed = function (fractionDigits) {
	    var number = this;
	    var fractDigits = toInteger(fractionDigits);
	    var data = [0, 0, 0, 0, 0, 0];
	    var sign = '';
	    var result = '0';
	    var e, z, j, k;
	    if (fractDigits < 0 || fractDigits > 20) throw RangeError('Incorrect fraction digits');
	    // eslint-disable-next-line no-self-compare -- NaN check
	    if (isNaN(number)) return 'NaN';
	    if (number <= -1e21 || number >= 1e21) return String(number);
	    if (number < 0) {
	      sign = '-';
	      number = -number;
	    }
	    if (number > 1e-21) {
	      e = log$1(number * pow$1(2, 69, 1)) - 69;
	      z = e < 0 ? number * pow$1(2, -e, 1) : number / pow$1(2, e, 1);
	      z *= 0x10000000000000;
	      e = 52 - e;
	      if (e > 0) {
	        multiply(data, 0, z);
	        j = fractDigits;
	        while (j >= 7) {
	          multiply(data, 1e7, 0);
	          j -= 7;
	        }
	        multiply(data, pow$1(10, j, 1), 0);
	        j = e - 1;
	        while (j >= 23) {
	          divide(data, 1 << 23);
	          j -= 23;
	        }
	        divide(data, 1 << j);
	        multiply(data, 1, 1);
	        divide(data, 2);
	        result = dataToString(data);
	      } else {
	        multiply(data, 0, z);
	        multiply(data, 1 << -e, 0);
	        result = dataToString(data) + repeat$1.call('0', fractDigits);
	      }
	    }
	    if (fractDigits > 0) {
	      k = result.length;
	      result = sign + (k <= fractDigits ? '0.' + repeat$1.call('0', fractDigits - k) + result : result.slice(0, k - fractDigits) + '.' + result.slice(k - fractDigits));
	    } else {
	      result = sign + result;
	    }
	    return result;
	  };
	}

	QUnit.test('Number#toFixed', function (assert) {
	  var toFixed = Number.prototype.toFixed;
	  assert.isFunction(toFixed);
	  // assert.name(toFixed, 'toFixed');
	  assert.arity(toFixed, 1);
	  assert.looksNative(toFixed);
	  assert.nonEnumerable(Number.prototype, 'toFixed');
	  assert.same(0.00008.toFixed(3), '0.000');
	  assert.same(0.9.toFixed(0), '1');
	  assert.same(1.255.toFixed(2), '1.25');
	  assert.same(1843654265.0774949.toFixed(5), '1843654265.07749');
	  assert.same(1000000000000000128.0.toFixed(0), '1000000000000000128');
	  assert.same(1 .toFixed(), '1');
	  assert.same(1 .toFixed(0), '1');
	  assert.same(1 .toFixed(1), '1.0');
	  assert.same(1 .toFixed(1.1), '1.0');
	  assert.same(1 .toFixed(0.9), '1');
	  assert.same(1 .toFixed('0'), '1');
	  assert.same(1 .toFixed('1'), '1.0');
	  assert.same(1 .toFixed('1.1'), '1.0');
	  assert.same(1 .toFixed('0.9'), '1');
	  assert.same(1 .toFixed(NaN), '1');
	  assert.same(1 .toFixed('some string'), '1');
	  assert.notThrows(function () {
	    return toFixed.call(1, -0.1) === '1';
	  });
	  assert.same(new Number(1).toFixed(), '1');
	  assert.same(new Number(1).toFixed(0), '1');
	  assert.same(new Number(1).toFixed(1), '1.0');
	  assert.same(new Number(1).toFixed(1.1), '1.0');
	  assert.same(new Number(1).toFixed(0.9), '1');
	  assert.same(new Number(1).toFixed('0'), '1');
	  assert.same(new Number(1).toFixed('1'), '1.0');
	  assert.same(new Number(1).toFixed('1.1'), '1.0');
	  assert.same(new Number(1).toFixed('0.9'), '1');
	  assert.same(new Number(1).toFixed(NaN), '1');
	  assert.same(new Number(1).toFixed('some string'), '1');
	  assert.notThrows(function () {
	    return new Number(1).toFixed(-0.1) === '1';
	  });
	  assert.same(NaN.toFixed(), 'NaN', 'NaN');
	  assert.same(NaN.toFixed(0), 'NaN');
	  assert.same(NaN.toFixed(1), 'NaN');
	  assert.same(NaN.toFixed(1.1), 'NaN');
	  assert.same(NaN.toFixed(0.9), 'NaN');
	  assert.same(NaN.toFixed('0'), 'NaN');
	  assert.same(NaN.toFixed('1'), 'NaN');
	  assert.same(NaN.toFixed('1.1'), 'NaN');
	  assert.same(NaN.toFixed('0.9'), 'NaN');
	  assert.same(NaN.toFixed(NaN), 'NaN');
	  assert.same(NaN.toFixed('some string'), 'NaN');
	  assert.notThrows(function () {
	    return NaN.toFixed(-0.1) === 'NaN';
	  });
	  assert.same(new Number(1e21).toFixed(), String(1e21));
	  assert.same(new Number(1e21).toFixed(0), String(1e21));
	  assert.same(new Number(1e21).toFixed(1), String(1e21));
	  assert.same(new Number(1e21).toFixed(1.1), String(1e21));
	  assert.same(new Number(1e21).toFixed(0.9), String(1e21));
	  assert.same(new Number(1e21).toFixed('0'), String(1e21));
	  assert.same(new Number(1e21).toFixed('1'), String(1e21));
	  assert.same(new Number(1e21).toFixed('1.1'), String(1e21));
	  assert.same(new Number(1e21).toFixed('0.9'), String(1e21));
	  assert.same(new Number(1e21).toFixed(NaN), String(1e21));
	  assert.same(new Number(1e21).toFixed('some string'), String(1e21));
	  assert.notThrows(function () {
	    return new Number(1e21).toFixed(-0.1) === String(1e21);
	  });
	  assert.throws(function () {
	    return 1.0.toFixed(-101);
	  }, RangeError, 'If f < 0 or f > 20, throw a RangeError exception.');
	  assert.throws(function () {
	    return 1.0.toFixed(101);
	  }, RangeError, 'If f < 0 or f > 20, throw a RangeError exception.');
	  assert.throws(function () {
	    return NaN.toFixed(Infinity);
	  }, RangeError, 'If f < 0 or f > 20, throw a RangeError exception.');
	  // assert.throws(() => toFixed.call({}, 1), TypeError, '? thisNumberValue(this value)');
	  // assert.throws(() => toFixed.call('123', 1), TypeError, '? thisNumberValue(this value)');
	  // assert.throws(() => toFixed.call(false, 1), TypeError, '? thisNumberValue(this value)');
	  // assert.throws(() => toFixed.call(null, 1), TypeError, '? thisNumberValue(this value)');
	  // assert.throws(() => toFixed.call(undefined, 1), TypeError, '? thisNumberValue(this value)');
	});

	QUnit.test('Number#toPrecision', function (assert) {
	  var toPrecision = Number.prototype.toPrecision;
	  assert.isFunction(toPrecision);
	  assert.name(toPrecision, 'toPrecision');
	  assert.arity(toPrecision, 1);
	  assert.looksNative(toPrecision);
	  assert.nonEnumerable(Number.prototype, 'toPrecision');
	  assert.same(0.00008.toPrecision(3), '0.0000800', '0.00008.toPrecision(3)');
	  assert.same(1.255.toPrecision(2), '1.3', '1.255.toPrecision(2)');
	  assert.same(1843654265.0774949.toPrecision(13), '1843654265.077', '1843654265.0774949.toPrecision(13)');
	  assert.same(NaN.toPrecision(1), 'NaN', 'If x is NaN, return the String "NaN".');
	  assert.same(123.456.toPrecision(), '123.456', 'If precision is undefined, return ! ToString(x).');
	  // assert.same(123.456.toPrecision(undefined), '123.456', 'If precision is undefined, return ! ToString(x).');
	  assert.throws(function () {
	    return 0.9.toPrecision(0);
	  }, RangeError, 'If p < 1 or p > 21, throw a RangeError exception.');
	  assert.throws(function () {
	    return 0.9.toPrecision(101);
	  }, RangeError, 'If p < 1 or p > 21, throw a RangeError exception.');
	  assert.throws(function () {
	    return toPrecision.call({}, 1);
	  }, TypeError, '? thisNumberValue(this value)');
	  assert.throws(function () {
	    return toPrecision.call('123', 1);
	  }, TypeError, '? thisNumberValue(this value)');
	  assert.throws(function () {
	    return toPrecision.call(false, 1);
	  }, TypeError, '? thisNumberValue(this value)');
	  assert.throws(function () {
	    return toPrecision.call(null, 1);
	  }, TypeError, '? thisNumberValue(this value)');
	  assert.throws(function () {
	    return toPrecision.call(undefined, 1);
	  }, TypeError, '? thisNumberValue(this value)');
	});

	QUnit.test('Date#toJSON', function (assert) {
	  var toJSON = Date.prototype.toJSON;
	  assert.isFunction(toJSON);
	  // assert.arity(toJSON, 1);
	  assert.name(toJSON, 'toJSON');
	  assert.looksNative(toJSON);
	  assert.nonEnumerable(Date.prototype, 'toJSON');
	  var date = new Date();
	  assert.same(date.toJSON(), date.toISOString(), 'base');
	  assert.same(new Date(NaN).toJSON(), null, 'not finite');
	  assert.same(toJSON.call({
	    toISOString: function () {
	      return 42;
	    }
	  }), 42, 'generic');
	});

	QUnit.test('Date#toISOString', function (assert) {
	  var toISOString = Date.prototype.toISOString;
	  assert.isFunction(toISOString);
	  assert.name(toISOString, 'toISOString');
	  assert.looksNative(toISOString);
	  assert.nonEnumerable(Date.prototype, 'toISOString');
	  // assert.strictEqual(new Date(0).toISOString(), '1970-01-01T00:00:00.000Z');
	  // assert.strictEqual(new Date(1e12 + 1).toISOString(), '2001-09-09T01:46:40.001Z');
	  // assert.strictEqual(new Date(-5e13 - 1).toISOString(), '0385-07-25T07:06:39.999Z');
	  var future = new Date(1e15 + 1).toISOString();
	  assert.ok(future === '+033658-09-27T01:46:40.001Z' || future === '33658-09-27T01:46:40.001Z');
	  var prehistoric = new Date(-1e15 + 1).toISOString();
	  assert.ok(prehistoric === '-029719-04-05T22:13:20.001Z' || prehistoric === '-29719-04-05T22:13:20.001Z');
	  // assert.throws(() => new Date(NaN).toISOString(), RangeError);
	});

	QUnit.test('Date#toString', function (assert) {
	  var toString = Date.prototype.toString;
	  assert.isFunction(toString);
	  assert.arity(toString, 0);
	  assert.name(toString, 'toString');
	  assert.looksNative(toString);
	  assert.nonEnumerable(Date.prototype, 'toString');
	  // assert.same(String(new Date(NaN)), 'Invalid Date');
	});

	QUnit.test('Array#indexOf', function (assert) {
	  var indexOf = Array.prototype.indexOf;
	  assert.isFunction(indexOf);
	  assert.arity(indexOf, 1);
	  assert.name(indexOf, 'indexOf');
	  assert.same(0, [1, 1, 1].indexOf(1));
	  assert.same(-1, [1, 2, 3].indexOf(1, 1));
	  assert.same(1, [1, 2, 3].indexOf(2, 1));
	  assert.same(-1, [1, 2, 3].indexOf(2, -1));
	  assert.same(1, [1, 2, 3].indexOf(2, -2));
	  assert.same(-1, [NaN].indexOf(NaN));
	  assert.same(3, Array(2).concat([1, 2, 3]).indexOf(2));
	  assert.same(-1, Array(1).indexOf(undefined));
	  assert.same(0, [1].indexOf(1, -0), "shouldn't return negative zero");
	  if (STRICT) {
	    assert.throws(function () {
	      return indexOf.call(null, 0);
	    }, TypeError);
	    assert.throws(function () {
	      return indexOf.call(undefined, 0);
	    }, TypeError);
	  }
	});

	QUnit.test('Array#lastIndexOf', function (assert) {
	  var lastIndexOf = Array.prototype.lastIndexOf;
	  assert.isFunction(lastIndexOf);
	  assert.arity(lastIndexOf, 1);
	  assert.name(lastIndexOf, 'lastIndexOf');
	  assert.same(2, [1, 1, 1].lastIndexOf(1));
	  assert.same(-1, [1, 2, 3].lastIndexOf(3, 1));
	  assert.same(1, [1, 2, 3].lastIndexOf(2, 1));
	  assert.same(-1, [1, 2, 3].lastIndexOf(2, -3));
	  assert.same(-1, [1, 2, 3].lastIndexOf(1, -4));
	  assert.same(1, [1, 2, 3].lastIndexOf(2, -2));
	  assert.same(-1, [NaN].lastIndexOf(NaN));
	  assert.same(1, [1, 2, 3].concat(Array(2)).lastIndexOf(2));
	  assert.same(0, [1].lastIndexOf(1, -0), "shouldn't return negative zero");
	  if (STRICT) {
	    assert.throws(function () {
	      return lastIndexOf.call(null, 0);
	    }, TypeError);
	    assert.throws(function () {
	      return lastIndexOf.call(undefined, 0);
	    }, TypeError);
	  }
	});

	QUnit.test('Array#forEach', function (assert) {
	  var forEach = Array.prototype.forEach;
	  assert.isFunction(forEach);
	  assert.arity(forEach, 1);
	  assert.name(forEach, 'forEach');
	  var array = [1];
	  var context = {};
	  array.forEach(function (value, key, that) {
	    assert.same(arguments.length, 3, 'correct number of callback arguments');
	    assert.same(value, 1, 'correct value in callback');
	    assert.same(key, 0, 'correct index in callback');
	    assert.same(that, array, 'correct link to array in callback');
	    assert.same(this, context, 'correct callback context');
	  }, context);
	  var result = '';
	  [1, 2, 3].forEach(function (value) {
	    result += value;
	  });
	  assert.ok(result === '123');
	  result = '';
	  [1, 2, 3].forEach(function (value, key) {
	    result += key;
	  });
	  assert.ok(result === '012');
	  result = '';
	  [1, 2, 3].forEach(function (value, key, that) {
	    result += that;
	  });
	  assert.ok(result === '1,2,31,2,31,2,3');
	  result = '';
	  [1, 2, 3].forEach(function () {
	    result += this;
	  }, 1);
	  assert.ok(result === '111');
	  result = '';
	  array = [];
	  array[5] = '';
	  array.forEach(function (value, key) {
	    result += key;
	  });
	  assert.ok(result === '5');
	  if (STRICT) {
	    assert.throws(function () {
	      forEach.call(null, function () {/* empty */});
	    }, TypeError);
	    assert.throws(function () {
	      forEach.call(undefined, function () {/* empty */});
	    }, TypeError);
	  }
	});

	QUnit.test('Array#filter', function (assert) {
	  var filter = Array.prototype.filter;
	  assert.isFunction(filter);
	  assert.arity(filter, 1);
	  assert.name(filter, 'filter');
	  var array = [1];
	  var context = {};
	  array.filter(function (value, key, that) {
	    assert.same(arguments.length, 3, 'correct number of callback arguments');
	    assert.same(value, 1, 'correct value in callback');
	    assert.same(key, 0, 'correct index in callback');
	    assert.same(that, array, 'correct link to array in callback');
	    assert.same(this, context, 'correct callback context');
	  }, context);
	  assert.deepEqual([1, 2, 3, 4, 5], [1, 2, 3, 'q', {}, 4, true, 5].filter(function (it) {
	    return typeof it === 'number';
	  }));
	  if (STRICT) {
	    assert.throws(function () {
	      return filter.call(null, function () {/* empty */});
	    }, TypeError);
	    assert.throws(function () {
	      return filter.call(undefined, function () {/* empty */});
	    }, TypeError);
	  }
	});

	QUnit.test('Array#map', function (assert) {
	  var map = Array.prototype.map;
	  assert.isFunction(map);
	  assert.arity(map, 1);
	  assert.name(map, 'map');
	  var array = [1];
	  var context = {};
	  array.map(function (value, key, that) {
	    assert.same(arguments.length, 3, 'correct number of callback arguments');
	    assert.same(value, 1, 'correct value in callback');
	    assert.same(key, 0, 'correct index in callback');
	    assert.same(that, array, 'correct link to array in callback');
	    assert.same(this, context, 'correct callback context');
	  }, context);
	  assert.deepEqual([2, 3, 4], [1, 2, 3].map(function (value) {
	    return value + 1;
	  }));
	  assert.deepEqual([1, 3, 5], [1, 2, 3].map(function (value, key) {
	    return value + key;
	  }));
	  assert.deepEqual([2, 2, 2], [1, 2, 3].map(function () {
	    return +this;
	  }, 2));
	  if (STRICT) {
	    assert.throws(function () {
	      return map.call(null, function () {/* empty */});
	    }, TypeError);
	    assert.throws(function () {
	      return map.call(undefined, function () {/* empty */});
	    }, TypeError);
	  }
	});

	QUnit.test('Array#some', function (assert) {
	  var some = Array.prototype.some;
	  assert.isFunction(some);
	  assert.arity(some, 1);
	  assert.name(some, 'some');
	  var array = [1];
	  var context = {};
	  array.some(function (value, key, that) {
	    assert.same(arguments.length, 3, 'correct number of callback arguments');
	    assert.same(value, 1, 'correct value in callback');
	    assert.same(key, 0, 'correct index in callback');
	    assert.same(that, array, 'correct link to array in callback');
	    assert.same(this, context, 'correct callback context');
	  }, context);
	  assert.ok([1, '2', 3].some(function (value) {
	    return typeof value === 'number';
	  }));
	  assert.ok([1, 2, 3].some(function (value) {
	    return value < 3;
	  }));
	  assert.ok(![1, 2, 3].some(function (value) {
	    return value < 0;
	  }));
	  assert.ok(![1, 2, 3].some(function (value) {
	    return typeof value === 'string';
	  }));
	  assert.ok(![1, 2, 3].some(function () {
	    return +this !== 1;
	  }, 1));
	  var result = '';
	  [1, 2, 3].some(function (value, key) {
	    result += key;
	    return false;
	  });
	  assert.ok(result === '012');
	  array = [1, 2, 3];
	  assert.ok(!array.some(function (value, key, that) {
	    return that !== array;
	  }));
	  if (STRICT) {
	    assert.throws(function () {
	      return some.call(null, function () {/* empty */});
	    }, TypeError);
	    assert.throws(function () {
	      return some.call(undefined, function () {/* empty */});
	    }, TypeError);
	  }
	});

	QUnit.test('Array#every', function (assert) {
	  var every = Array.prototype.every;
	  assert.isFunction(every);
	  assert.arity(every, 1);
	  assert.name(every, 'every');
	  var array = [1];
	  var context = {};
	  array.every(function (value, key, that) {
	    assert.same(arguments.length, 3, 'correct number of callback arguments');
	    assert.same(value, 1, 'correct value in callback');
	    assert.same(key, 0, 'correct index in callback');
	    assert.same(that, array, 'correct link to array in callback');
	    assert.same(this, context, 'correct callback context');
	  }, context);
	  assert.ok([1, 2, 3].every(function (it) {
	    return typeof it === 'number';
	  }));
	  assert.ok([1, 2, 3].every(function (it) {
	    return it < 4;
	  }));
	  assert.ok(![1, 2, 3].every(function (it) {
	    return it < 3;
	  }));
	  assert.ok(![1, 2, 3].every(function (it) {
	    return typeof it === 'string';
	  }));
	  assert.ok([1, 2, 3].every(function () {
	    return +this === 1;
	  }, 1));
	  var result = '';
	  [1, 2, 3].every(function (value, key) {
	    return result += key;
	  });
	  assert.ok(result === '012');
	  array = [1, 2, 3];
	  assert.ok(array.every(function (value, key, that) {
	    return that === array;
	  }));
	  if (STRICT) {
	    assert.throws(function () {
	      return every.call(null, function () {/* empty */});
	    }, TypeError);
	    assert.throws(function () {
	      return every.call(undefined, function () {/* empty */});
	    }, TypeError);
	  }
	});

	QUnit.test('Array#reduce', function (assert) {
	  var reduce = Array.prototype.reduce;
	  assert.isFunction(reduce);
	  assert.arity(reduce, 1);
	  assert.name(reduce, 'reduce');
	  var array = [1];
	  var accumulator = {};
	  array.reduce(function (memo, value, key, that) {
	    assert.same(arguments.length, 4, 'correct number of callback arguments');
	    assert.same(memo, accumulator, 'correct callback accumulator');
	    assert.same(value, 1, 'correct value in callback');
	    assert.same(key, 0, 'correct index in callback');
	    assert.same(that, array, 'correct link to array in callback');
	  }, accumulator);
	  assert.same([1, 2, 3].reduce(function (a, b) {
	    return a + b;
	  }, 1), 7, 'works with initial accumulator');
	  [1, 2].reduce(function (memo, value, key) {
	    assert.same(memo, 1, 'correct default accumulator');
	    assert.same(value, 2, 'correct start value without initial accumulator');
	    assert.same(key, 1, 'correct start index without initial accumulator');
	  });
	  assert.same([1, 2, 3].reduce(function (a, b) {
	    return a + b;
	  }), 6, 'works without initial accumulator');
	  var values = '';
	  var keys = '';
	  [1, 2, 3].reduce(function (memo, value, key) {
	    values += value;
	    keys += key;
	  }, 0);
	  assert.same(values, '123', 'correct order #1');
	  assert.same(keys, '012', 'correct order #2');
	  assert.same(reduce.call({
	    0: 1,
	    1: 2,
	    length: 2
	  }, function (a, b) {
	    return a + b;
	  }), 3, 'generic');
	  if (STRICT) {
	    assert.throws(function () {
	      return reduce.call(null, function () {/* empty */}, 1);
	    }, TypeError);
	    assert.throws(function () {
	      return reduce.call(undefined, function () {/* empty */}, 1);
	    }, TypeError);
	  }
	});

	QUnit.test('Array#reduceRight', function (assert) {
	  var reduceRight = Array.prototype.reduceRight;
	  assert.isFunction(reduceRight);
	  assert.arity(reduceRight, 1);
	  assert.name(reduceRight, 'reduceRight');
	  var array = [1];
	  var accumulator = {};
	  array.reduceRight(function (memo, value, key, that) {
	    assert.same(arguments.length, 4, 'correct number of callback arguments');
	    assert.same(memo, accumulator, 'correct callback accumulator');
	    assert.same(value, 1, 'correct value in callback');
	    assert.same(key, 0, 'correct index in callback');
	    assert.same(that, array, 'correct link to array in callback');
	  }, accumulator);
	  assert.same([1, 2, 3].reduceRight(function (a, b) {
	    return a + b;
	  }, 1), 7, 'works with initial accumulator');
	  [1, 2].reduceRight(function (memo, value, key) {
	    assert.same(memo, 2, 'correct default accumulator');
	    assert.same(value, 1, 'correct start value without initial accumulator');
	    assert.same(key, 0, 'correct start index without initial accumulator');
	  });
	  assert.same([1, 2, 3].reduceRight(function (a, b) {
	    return a + b;
	  }), 6, 'works without initial accumulator');
	  var values = '';
	  var keys = '';
	  [1, 2, 3].reduceRight(function (memo, value, key) {
	    values += value;
	    keys += key;
	  }, 0);
	  assert.same(values, '321', 'correct order #1');
	  assert.same(keys, '210', 'correct order #2');
	  assert.same(reduceRight.call({
	    0: 1,
	    1: 2,
	    length: 2
	  }, function (a, b) {
	    return a + b;
	  }), 3, 'generic');
	  if (STRICT) {
	    assert.throws(function () {
	      return reduceRight.call(null, function () {/* empty */}, 1);
	    }, TypeError);
	    assert.throws(function () {
	      return reduceRight.call(undefined, function () {/* empty */}, 1);
	    }, TypeError);
	  }
	});

	function trim() {
	  return this.replace(/^[\s\u3000\xA0]+|[\s\u3000\xA0]+$/g, '');
	}

	if (!String.prototype.trim) {
	  String.prototype.trim = trim;
	}

	QUnit.test('String#trim', function (assert) {
	  var trim = String.prototype.trim;
	  assert.isFunction(trim);
	  assert.arity(trim, 0);
	  assert.name(trim, 'trim');
	  assert.strictEqual(' \n  q w e \n  '.trim(), 'q w e', 'removes whitespaces at left & right side of string');
	  assert.strictEqual("\t".trim(), '', "\\u0009");
	  assert.strictEqual("\n".trim(), '', "\\u000A");
	  assert.strictEqual("\x0B".trim(), '', "\\u000B");
	  assert.strictEqual("\f".trim(), '', "\\u000C");
	  assert.strictEqual("\r".trim(), '', "\\u000D");
	  assert.strictEqual(" ".trim(), '', "\\u0020");
	  // assert.strictEqual("\u0085".trim(), '\u0085', "\\u0085 shouldn't remove");
	  assert.strictEqual("\xA0".trim(), '', "\\u00A0");
	  // assert.strictEqual("\u1680".trim(), '', '\\u1680');
	  // assert.strictEqual("\u2000".trim(), '', '\\u2000');
	  // assert.strictEqual("\u2001".trim(), '', '\\u2001');
	  // assert.strictEqual("\u2002".trim(), '', '\\u2002');
	  // assert.strictEqual("\u2003".trim(), '', '\\u2003');
	  // assert.strictEqual("\u2004".trim(), '', '\\u2004');
	  // assert.strictEqual("\u2005".trim(), '', '\\u2005');
	  // assert.strictEqual("\u2006".trim(), '', '\\u2006');
	  // assert.strictEqual("\u2007".trim(), '', '\\u2007');
	  // assert.strictEqual("\u2008".trim(), '', '\\u2008');
	  // assert.strictEqual("\u2009".trim(), '', '\\u2009');
	  // assert.strictEqual("\u200A".trim(), '', '\\u200A');
	  // assert.strictEqual("\u200B".trim(), '\u200B', "\\u200B shouldn't remove");
	  // assert.strictEqual("\u2028".trim(), '', '\\u2028');
	  // assert.strictEqual("\u2029".trim(), '', '\\u2029');
	  // assert.strictEqual("\u202F".trim(), '', '\\u202F');
	  // assert.strictEqual("\u205F".trim(), '', '\\u205F');
	  assert.strictEqual("\u3000".trim(), '', "\\u3000");
	  // assert.strictEqual("\uFEFF".trim(), '', '\\uFEFF');
	  if (STRICT) {
	    assert.throws(function () {
	      return trim.call(null, 0);
	    }, TypeError);
	    assert.throws(function () {
	      return trim.call(undefined, 0);
	    }, TypeError);
	  }
	});

	var getPrototypeOf = Object$1.getPrototypeOf;

	function ff_getPrototypeOf(object) {
	  return object.__proto__;
	}
	;
	function ie_getPrototypeOf(object) {
	  if ('__proto__' in object) {
	    return object.__proto__;
	  }
	  return getPrototypeOf(object);
	}
	;

	if (!getPrototypeOf) {
	  if ('__proto__' in Object$1.prototype) {
	    Object$1.getPrototypeOf = ff_getPrototypeOf;
	  }
	} else if (!setPrototypeOf$1) {
	  Object$1.getPrototypeOf = ie_getPrototypeOf;
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

	function isNotSymbolKey(key) {
	  return key.substring(0, 2) !== "@@";
	}

	function ie_keys(obj) {
	  return keys$2.call(Object, obj).filter(isNotSymbolKey);
	}
	function nie_keys(obj) {
	  if (obj == null) {
	    throw new TypeError("Cannot convert undefined or null to object");
	  }
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
	  } else if (_Symbol$6) {
	    return keys$2(obj);
	  } else {
	    return ie_keys(obj);
	  }
	}

	if (!Object$1.keys) {
	  Object$1.keys = nie_keys;
	} else if (!_Symbol$6) {
	  Object$1.keys = ie_keys;
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

	function create$1(proto, properties) {
	  var o = {};
	  Object.setPrototypeOf(o, proto);
	  if (properties) {
	    Object.defineProperties(o, properties);
	  }
	  return o;
	}
	;

	if (!Object$1.create) {
	  if ('__proto__' in Object$1.prototype) {
	    Object$1.create = create$1;
	  }
	}

	QUnit.test('Object.getPrototypeOf', function (assert) {
	  assert.isFunction(Object.getPrototypeOf);
	  assert.arity(Object.getPrototypeOf, 1);
	  // assert.name(Object.getPrototypeOf, 'getPrototypeOf');
	  assert.looksNative(Object.getPrototypeOf);
	  assert.nonEnumerable(Object, 'getPrototypeOf');
	  assert.ok(Object.getPrototypeOf({}) === Object.prototype);
	  assert.ok(Object.getPrototypeOf([]) === Array.prototype);
	  function F() {/* empty */}
	  assert.ok(Object.getPrototypeOf(new F()) === F.prototype);
	  var object = {
	    q: 1
	  };
	  assert.ok(Object.getPrototypeOf(Object.create(object)) === object);
	  assert.ok(Object.getPrototypeOf(Object.create(null)) === null);
	  assert.ok(Object.getPrototypeOf(Object.getPrototypeOf({})) === null);
	  function Foo() {/* empty */}
	  Foo.prototype.foo = 'foo';
	  function Bar() {/* empty */}
	  Bar.prototype = Object.create(Foo.prototype);
	  Bar.prototype.constructor = Bar;
	  assert.strictEqual(Object.getPrototypeOf(Bar.prototype).foo, 'foo');
	  // const primitives = [42, 'foo', false];
	  // for(const value of primitives) {
	  //   assert.notThrows(() => Object.getPrototypeOf(value), `accept ${typeof value} 不支持`);
	  // }
	  assert.throws(function () {
	    return Object.getPrototypeOf(null);
	  }, TypeError, 'throws on null');
	  assert.throws(function () {
	    return Object.getPrototypeOf(undefined);
	  }, TypeError, 'throws on undefined');
	  assert.strictEqual(Object.getPrototypeOf(Object('foo')), String.prototype);
	});
	QUnit.test('Object.getPrototypeOf.sham flag', function (assert) {
	  assert.same(Object.getPrototypeOf.sham, CORRECT_PROTOTYPE_GETTER ? undefined : true);
	});

	var length = 'length';
	function ff_getOwnPropertyNames(obj) {
	  var keys = keys$1(obj);
	  if (keys.indexOf(length) < 0) {
	    if (Object.prototype.hasOwnProperty.call(obj, length)) {
	      keys.push(length);
	    }
	  }
	  return keys;
	}
	function ie_getOwnPropertyNames(obj) {
	  return getOwnPropertyNames(obj).filter(isNotSymbolKey);
	}

	if (getOwnPropertyNames) {
	  if (!_Symbol$6) {
	    Object$1.getOwnPropertyNames = ie_getOwnPropertyNames;
	  }
	} else {
	  if (Object$1.prototype.__defineSetter__) {
	    Object$1.getOwnPropertyNames = ff_getOwnPropertyNames;
	  }
	}

	QUnit.test('Object.create', function (assert) {
	  function getPropertyNames(object) {
	    var result = [];
	    do {
	      result = result.concat(Object.getOwnPropertyNames(object));
	    } while (object = Object.getPrototypeOf(object));
	    return result;
	  }
	  assert.isFunction(Object.create);
	  assert.arity(Object.create, 2);
	  assert.name(Object.create, 'create');
	  var object = {
	    q: 1
	  };
	  assert.ok({}.isPrototypeOf.call(object, Object.create(object)));
	  assert.ok(Object.create(object).q === 1);
	  function F() {
	    return this.a = 1;
	  }
	  assert.ok(Object.create(new F()) instanceof F, "Object.create(new F())");
	  assert.ok(F.prototype === Object.getPrototypeOf(Object.getPrototypeOf(Object.create(new F()))));
	  assert.ok(Object.create(new F()).a === 1);
	  assert.ok(Object.create({}, {
	    a: {
	      value: 42
	    }
	  }).a === 42);
	  object = Object.create(null, {
	    w: {
	      value: 2
	    }
	  });
	  assert.same(object, Object(object));
	  assert.ok(!('toString' in object), "toString");
	  assert.ok(object.w === 2);
	  assert.throws(function () {
	    return String(object);
	  }, "throws String({__proto__:null})");
	  assert.deepEqual(getPropertyNames(Object.create(null)), []);
	});
	QUnit.test('Object.create.sham flag', function (assert) {
	  assert.same(Object.create.sham, DESCRIPTORS ? undefined : true);
	});

	QUnit.test('Object.keys', function (assert) {
	  assert.isFunction(Object.keys);
	  assert.arity(Object.keys, 1);
	  // assert.name(Object.keys, 'keys');
	  assert.looksNative(Object.keys);
	  assert.nonEnumerable(Object, 'keys');
	  function F1() {
	    this.w = 1;
	  }
	  function F2() {
	    this.toString = 1;
	  }
	  F1.prototype.q = F2.prototype.q = 1;
	  assert.deepEqual(Object.keys([1, 2, 3]), ['0', '1', '2']);
	  assert.deepEqual(Object.keys(new F1()), ['w']);
	  assert.deepEqual(Object.keys(new F2()), ['toString']);
	  assert.ok(!includes$2(Object.keys(Array.prototype), 'push'));
	  // const primitives = [42, 'foo', false];
	  // for(const value of primitives) {
	  //   assert.notThrows(() => Object.keys(value), `accept ${typeof value} 不支持`);
	  // }
	  assert.throws(function () {
	    return Object.keys(null);
	  }, TypeError, 'throws on null');
	  assert.throws(function () {
	    return Object.keys(undefined);
	  }, TypeError, 'throws on undefined');
	});

	QUnit.test('Object.defineProperty', function (assert) {
	  assert.isFunction(Object.defineProperty);
	  assert.arity(Object.defineProperty, 3);
	  assert.name(Object.defineProperty, 'defineProperty');
	  var source = {};
	  var result = Object.defineProperty(source, 'q', {
	    value: 42
	  });
	  assert.same(result, source);
	  assert.same(result.q, 42);
	  assert.throws(function () {
	    return Object.defineProperty(42, 1, {});
	  });
	  assert.throws(function () {
	    return Object.defineProperty({}, Object.create(null), {});
	  });
	  assert.throws(function () {
	    return Object.defineProperty({}, 1, 1);
	  });
	});
	QUnit.test('Object.defineProperty.sham flag', function (assert) {
	  assert.same(Object.defineProperty.sham, DESCRIPTORS ? undefined : true);
	});

	function isNotNullObject(obj) {
	  return _typeof(obj) === 'object' ? obj !== null : typeof obj === 'function';
	}
	;

	function anObject(it) {
	  if (!isNotNullObject(it)) {
	    throw TypeError(String(it) + ' is not a object');
	  }
	  return it;
	}

	function getOwnPropertyDescriptor(obj, key) {
	  if (Object.prototype.hasOwnProperty.call(obj, key)) {
	    anObject(obj);
	    var r = new Object();
	    r.enumerable = true;
	    r.configurable = true;
	    var set = obj.__lookupSetter__(key);
	    var get = obj.__lookupGetter__(key);
	    if (set || get) {
	      r.writable = !!set;
	      r.set = set;
	      r.get = get;
	    } else {
	      r.writable = true;
	      r.value = obj[key];
	    }
	    return r;
	  }
	}
	;

	if (!Object$1.getOwnPropertyDescriptor) {
	  if (Object$1.prototype.__defineSetter__) {
	    Object$1.getOwnPropertyDescriptor = getOwnPropertyDescriptor;
	  }
	}

	QUnit.test('Object.getOwnPropertyDescriptor', function (assert) {
	  assert.isFunction(Object.getOwnPropertyDescriptor);
	  assert.arity(Object.getOwnPropertyDescriptor, 2);
	  assert.name(Object.getOwnPropertyDescriptor, 'getOwnPropertyDescriptor');
	  assert.deepEqual(Object.getOwnPropertyDescriptor({
	    q: 42
	  }, 'q'), {
	    writable: true,
	    enumerable: true,
	    configurable: true,
	    value: 42
	  });
	  assert.ok(Object.getOwnPropertyDescriptor({}, 'toString') === undefined);
	  // const primitives = [42, 'foo', false];
	  // for(const value of primitives) {
	  //   assert.notThrows(() => Object.getOwnPropertyDescriptor(value) || true);
	  // }
	  assert.throws(function () {
	    return Object.getOwnPropertyDescriptor(null);
	  }, TypeError, 'throws on null');
	  assert.throws(function () {
	    return Object.getOwnPropertyDescriptor(undefined);
	  }, TypeError, 'throws on undefined');
	});
	QUnit.test('Object.getOwnPropertyDescriptor.sham flag', function (assert) {
	  assert.same(Object.getOwnPropertyDescriptor.sham, DESCRIPTORS ? undefined : true);
	});

	QUnit.test('Object.getOwnPropertyNames', function (assert) {
	  assert.isFunction(Object.getOwnPropertyNames);
	  assert.arity(Object.getOwnPropertyNames, 1);
	  // assert.name(Object.getOwnPropertyNames, 'getOwnPropertyNames');
	  function F1() {
	    this.w = 1;
	  }
	  function F2() {
	    this.toString = 1;
	  }
	  F1.prototype.q = F2.prototype.q = 1;
	  var names = Object.getOwnPropertyNames([1, 2, 3]);
	  assert.strictEqual(names.length, 4);
	  assert.ok(includes$2(names, '0'));
	  assert.ok(includes$2(names, '1'));
	  assert.ok(includes$2(names, '2'));
	  assert.ok(includes$2(names, 'length'));
	  assert.deepEqual(Object.getOwnPropertyNames(new F1()), ['w']);
	  assert.deepEqual(Object.getOwnPropertyNames(new F2()), ['toString']);
	  // assert.ok(includes(Object.getOwnPropertyNames(Array.prototype), 'toString'));
	  // assert.ok(includes(Object.getOwnPropertyNames(Object.prototype), 'toString'));
	  // assert.ok(includes(Object.getOwnPropertyNames(Object.prototype), 'constructor'));
	  // const primitives = [42, 'foo', false];
	  // for(const value of primitives) {
	  //   assert.notThrows(() => Object.getOwnPropertyNames(value), `accept ${typeof value}`);
	  // }
	  assert.throws(function () {
	    Object.getOwnPropertyNames(null);
	  }, TypeError, 'throws on null');
	  assert.throws(function () {
	    Object.getOwnPropertyNames(undefined);
	  }, TypeError, 'throws on undefined');
	  // if(GLOBAL.document) {
	  //   assert.notThrows(() => {
	  //     const iframe = document.createElement('iframe');
	  //     iframe.src = 'http://example.com';
	  //     document.documentElement.appendChild(iframe);
	  //     const window = iframe.contentWindow;
	  //     document.documentElement.removeChild(iframe);
	  //     return Object.getOwnPropertyNames(window);
	  //   }, 'IE11 bug with iframe and window');
	  // }
	});

	QUnit.test('Object.defineProperties', function (assert) {
	  assert.isFunction(Object.defineProperties);
	  assert.arity(Object.defineProperties, 2);
	  assert.name(Object.defineProperties, 'defineProperties');
	  var source = {};
	  var result = Object.defineProperties(source, {
	    q: {
	      value: 42
	    },
	    w: {
	      value: 33
	    }
	  });
	  assert.same(result, source);
	  assert.same(result.q, 42);
	  assert.same(result.w, 33);
	});

	// QUnit.test('Object.defineProperties.sham flag', assert => {
	//   assert.same(Object.defineProperties.sham, DESCRIPTORS ? undefined : true);
	// });

	QUnit.test('Function#bind', function (assert) {
	  var bind = Function.prototype.bind;
	  assert.isFunction(bind);
	  assert.arity(bind, 1);
	  assert.name(bind, 'bind');
	  assert.looksNative(bind);
	  assert.nonEnumerable(Function.prototype, 'bind');
	  assert.same(function () {
	    return this.a;
	  }.bind({
	    a: 42
	  })(), 42);
	  assert.same(new function () {/* empty */}().a, undefined);
	  // new 用法MDN上说不建议使用，就不支持了，
	  // function A() {
	  // }
	  // const a = new A();
	  // const B = A.bind(a);
	  // assert.ok(B.call(a) === undefined, "not allow new");

	  // assert.same((it => it).bind(null, 42)(), 42);
	  // const regExpTest = RegExp.prototype.test.bind(/a/);
	  // assert.ok(regExpTest('a'));
	  // const Date2017 = Date.bind(null, 2017);
	  // const date = new Date2017(11);
	  // assert.ok(date instanceof Date);
	  // assert.strictEqual(date.getFullYear(), 2017);
	  // assert.strictEqual(date.getMonth(), 11);
	});

	QUnit.test('Array.isArray', function (assert) {
	  var isArray = Array.isArray;
	  assert.isFunction(isArray);
	  assert.arity(isArray, 1);
	  assert.name(isArray, 'isArray');
	  assert.ok(!isArray({}));
	  assert.ok(!isArray(function () {
	    return arguments;
	  }()));
	  assert.ok(isArray([]));
	});

	if (PROTO) QUnit.test('Object.setPrototypeOf', function (assert) {
	  assert.isFunction(Object.setPrototypeOf);
	  assert.arity(Object.setPrototypeOf, 2);
	  // assert.name(Object.setPrototypeOf, 'setPrototypeOf');
	  assert.looksNative(Object.setPrototypeOf);
	  assert.nonEnumerable(Object, 'setPrototypeOf');
	  // assert.ok('apply' in Object.setPrototypeOf({}, Function.prototype), 'Parent properties in target');
	  assert.strictEqual(Object.setPrototypeOf({
	    a: 2
	  }, {
	    b: function () {
	      return Math.pow(this.a, 2);
	    }
	  }).b(), 4, 'Child and parent properties in target');
	  var object = {};
	  assert.strictEqual(Object.setPrototypeOf(object, {
	    a: 1
	  }), object, 'setPrototypeOf return target');
	  // assert.ok(!('toString' in Object.setPrototypeOf({}, null)), 'Can set null as prototype');
	});

	function is(x, y) {
	  if (x === y) {
	    // Steps 1-5, 7-10
	    // Steps 6.b-6.e: +0 != -0
	    return x !== 0 || 1 / x === 1 / y;
	  } else {
	    // Step 6.a: NaN == NaN
	    return x !== x && y !== y;
	  }
	}

	if (!Object$1.is) {
	  Object$1.is = is;
	}

	QUnit.test('Object.is', function (assert) {
	  assert.isFunction(Object.is);
	  assert.arity(Object.is, 2);
	  assert.name(Object.is, 'is');
	  assert.looksNative(Object.is);
	  assert.nonEnumerable(Object, 'is');
	  assert.ok(Object.is(1, 1), '1 is 1');
	  assert.ok(Object.is(NaN, NaN), '1 is 1');
	  assert.ok(!Object.is(0, -0), '0 isnt -0');
	  assert.ok(!Object.is({}, {}), '{} isnt {}');
	});

	var Promise$3 = window.Promise;

	var queueMicrotask$2 = window.queueMicrotask;

	var ticks = null;
	var nextTick = setTimeout;
	function initQueueMicrotask(fn) {
	  nextTick = fn;
	  return queueMicrotask$1;
	}
	function next() {
	  if (ticks && ticks.length) {
	    for (var i = 0; i < ticks.length; i++) {
	      var args = ticks[i];
	      var fn = args[0];
	      args = Array.prototype.slice.call(args, 1);
	      try {
	        fn.apply(this, args);
	      } catch (e) {
	        console.error(e);
	      }
	    }
	    ticks = null;
	  }
	}
	function queueMicrotask$1() {
	  if (!ticks) {
	    ticks = new Array();
	    nextTick(next);
	  }
	  ticks.push(arguments);
	}
	;

	if (!queueMicrotask$2) {
	  window.queueMicrotask = initQueueMicrotask(Promise$3 ? Promise$3.prototype.then.bind(Promise$3.resolve(1)) : setTimeout);
	}

	function isObject(obj) {
	  var type = _typeof(obj);
	  if (type !== "object") {
	    return false;
	  }
	  type = Object.prototype.toString.call(obj);
	  switch (type) {
	    case '[object String]':
	    case '[object Number]':
	    case '[object Function]':
	    case '[object Boolean]':
	      return false;
	  }
	  if (typeof obj.toString === "function" && obj.toString().indexOf("@@") === 0) {
	    return false; //symbol polyfill
	  }

	  return true;
	}
	;

	var forEach$1 = Array.prototype.forEach;

	function isFunction(obj) {
	  return typeof obj === 'function';
	}
	;

	var PENDING = 1;
	var RESOLVED = 2;
	var REJECTED = 3;
	function Promise$2(executor) {
	  if (!executor) {
	    throw new TypeError("undefined is not a promise");
	  }
	  this._resolveds = [];
	  this._rejecteds = [];
	  this._state = PENDING; //resolved | rejected

	  var me = this;
	  function resolve(value) {
	    if (me._state === PENDING) {
	      if (value) {
	        try {
	          var then = value.then;
	          if (isFunction(then)) {
	            queueMicrotask(function () {
	              try {
	                value.then(resolve, reject);
	              } catch (e) {
	                reject(e);
	              }
	            });
	            return;
	          }
	        } catch (e) {
	          reject(e);
	          return;
	        }
	      }
	      me._value = value;
	      me._state = RESOLVED;
	      queueMicrotask(function () {
	        forEach$1.call(me._resolveds, callAll, me);
	        me._resolveds = null;
	      });
	    }
	  }
	  function reject(reason) {
	    if (me._state === PENDING) {
	      me._value = reason;
	      me._state = REJECTED;
	      queueMicrotask(function () {
	        forEach$1.call(me._rejecteds, callAll, me);
	        me._rejecteds = null;
	      });
	    }
	  }
	  try {
	    executor(resolve, reject);
	  } catch (e) {
	    reject(e);
	  }
	}
	function callAll(fn) {
	  fn.call(this, this._value);
	}
	function nextPromise(before, after, resolve, reject) {
	  return function (value) {
	    try {
	      var x = before(value);
	      if (x && typeof x.then === "function") {
	        x.then(resolve, reject);
	      } else {
	        after(x);
	      }
	    } catch (r) {
	      reject(r);
	    }
	  };
	}
	function returnArg1(arg1) {
	  return arg1;
	}
	Promise$2.prototype.then = function then(onResolved, onRejected) {
	  // var Class = speciesConstructor(this, Promise);
	  var me = this;
	  onResolved = onResolved || returnArg1;
	  onRejected = onRejected || returnArg1;
	  return new Promise$2(function (resolve, reject) {
	    switch (me._state) {
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
	Promise$2.prototype.catch = function (onRejected) {
	  return this.then(undefined, onRejected);
	};
	function ResolvePromise(value) {
	  this._value = value;
	  this._state = RESOLVED;
	}
	ResolvePromise.prototype = Promise$2.prototype;
	function RejectPromise(value) {
	  this._value = value;
	  this._state = REJECTED;
	}
	RejectPromise.prototype = Promise$2.prototype;
	Promise$2.resolve = function resolve(value) {
	  if (value && _typeof(value) === "object" && value.constructor === this) {
	    return value;
	  }
	  if (!this) {
	    throw TypeError("Promise.resolve called on non-object");
	  }
	  if (typeof this !== "function") {
	    throw TypeError(this + " is not a constructor");
	  }
	  return new ResolvePromise(value);
	  // var Class = this;
	  // if(Class === Promise) {
	  // }
	  // var promiseCapability = new PromiseCapability(Class);
	  // var resolve = promiseCapability.resolve;
	  // resolve(value);
	  // return promiseCapability.promise;
	};

	Promise$2.reject = function reject(value) {
	  if (value && _typeof(value) === "object" && value.constructor === this) {
	    return value;
	  }
	  if (!this) {
	    throw TypeError("Promise.resolve called on non-object");
	  }
	  if (typeof this !== "function") {
	    throw TypeError(this + " is not a constructor");
	  }
	  return new RejectPromise(value);
	};
	Promise$2.all = function (promises) {
	  if (!Array.isArray(promises)) {
	    throw new TypeError('You must pass an array to all.');
	  }
	  if (promises.length == 0) return Promise$2.resolve();
	  return new Promise$2(function (resolve, reject) {
	    var result = new Array(promises.length);
	    var c = 0;
	    forEach$1.call(promises, function (one, index) {
	      if (one && typeof one.then === "function") {
	        one.then(function (data) {
	          c++;
	          result[index] = data;
	          if (c >= promises.length) {
	            resolve(result);
	          }
	        }, function (error) {
	          reject(error);
	        });
	      } else {
	        c++;
	        if (c >= promises.length) {
	          resolve();
	        }
	      }
	    });
	  });
	};
	Promise$2.race = function (promises) {
	  if (!Array.isArray(promises)) {
	    throw new TypeError('You must pass an array to all.');
	  }
	  return new Promise$2(function (resolve, reject) {
	    forEach$1.call(promises, function (one) {
	      one.then(function () {
	        resolve();
	      }, function () {
	        reject();
	      });
	    });
	  });
	};

	var Promise$1 = Promise$3;
	if (!Promise$1) {
	  Promise$1 = window.Promise = Promise$2;
	}

	function promise_finally (onCompleted) {
	  return this.then(function (value) {
	    var r = onCompleted();
	    if (r === undefined) {
	      return value;
	    }
	    return r;
	  }, function (error) {
	    var r = onCompleted();
	    if (r === undefined) {
	      return error;
	    }
	    return r;
	  });
	}
	;

	if (!Promise$1.prototype.finally) {
	  Promise$1.prototype.finally = promise_finally;
	}

	var _Symbol$3 = GLOBAL.Symbol || {};
	var setPrototypeOf = Object.setPrototypeOf,
	  create = Object.create;
	QUnit.test('Promise', function (assert) {
	  assert.isFunction(Promise);
	  assert.arity(Promise, 1);
	  assert.name(Promise, 'Promise');
	  assert.looksNative(Promise);
	  assert.throws(function () {
	    Promise();
	  }, 'throws w/o `new`');
	  new Promise(function (resolve, reject) {
	    assert.isFunction(resolve, 'resolver is function');
	    assert.isFunction(reject, 'rejector is function');
	    if (STRICT) assert.same(this, undefined, 'correct executor context');
	  });
	});
	if (DESCRIPTORS) QUnit.asyncTest('Promise operations order', function (assert) {
	  var resolve, resolve2;
	  expect(1);
	  var EXPECTED_ORDER = 'DEHAFGBC';
	  var result = '';
	  var promise1 = new Promise(function (r) {
	    resolve = r;
	  });
	  resolve({
	    then: function () {
	      result += 'A';
	      throw Error();
	    }
	  });
	  promise1.catch(function () {
	    result += 'B';
	  });
	  promise1.catch(function () {
	    result += 'C';
	    assert.same(result, EXPECTED_ORDER);
	    start();
	  });
	  var promise2 = new Promise(function (r) {
	    resolve2 = r;
	  });
	  resolve2(Object.defineProperty({}, 'then', {
	    get: function () {
	      result += 'D';
	      throw Error();
	    }
	  }));
	  resolve2(Object.defineProperty({}, 'then', {
	    get: function () {
	      result += 'I';
	      return 1;
	    }
	  }));
	  result += 'E';
	  promise2.catch(function () {
	    result += 'F';
	  });
	  promise2.catch(function () {
	    result += 'G';
	  });
	  result += 'H';
	  setTimeout(function () {
	    if (!~result.indexOf('C')) {
	      assert.same(result, EXPECTED_ORDER);
	      start();
	    }
	  }, 1e3);
	});
	QUnit.test('Promise#then', function (assert) {
	  assert.isFunction(Promise.prototype.then);
	  if (NATIVE) assert.arity(Promise.prototype.then, 2);
	  assert.name(Promise.prototype.then, 'then');
	  assert.looksNative(Promise.prototype.then);
	  assert.nonEnumerable(Promise.prototype, 'then');
	  var promise = new Promise(function (resolve) {
	    resolve(42);
	  });
	  var FakePromise1 = promise.constructor = function (executor) {
	    executor(function () {/* empty */}, function () {/* empty */});
	  };
	  var FakePromise2 = FakePromise1[_Symbol$3.species] = function (executor) {
	    executor(function () {/* empty */}, function () {/* empty */});
	  };
	  // assert.ok(promise.then(() => { /* empty */ }) instanceof FakePromise2, 'subclassing, @@species pattern');
	  promise = new Promise(function (resolve) {
	    resolve(42);
	  });
	  promise.constructor = FakePromise1 = function (executor) {
	    executor(function () {/* empty */}, function () {/* empty */});
	  };
	  assert.ok(promise.then(function () {/* empty */}) instanceof Promise, 'subclassing, incorrect `this` pattern');
	  promise = new Promise(function (resolve) {
	    resolve(42);
	  });
	  // promise.constructor = FakePromise1 = function(executor) {
	  //   executor(() => { /* empty */ }, () => { /* empty */ });
	  // };
	  // FakePromise1[Symbol.species] = function() { /* empty */ };
	  // assert.throws(() => {
	  //   promise.then(() => { /* empty */ });
	  // }, 'NewPromiseCapability validations, #1');
	  // FakePromise1[Symbol.species] = function(executor) {
	  //   executor(null, () => { /* empty */ });
	  // };
	  // assert.throws(() => {
	  //   promise.then(() => { /* empty */ });
	  // }, 'NewPromiseCapability validations, #2');
	  // FakePromise1[Symbol.species] = function(executor) {
	  //   executor(() => { /* empty */ }, null);
	  // };
	  // assert.throws(() => {
	  //   promise.then(() => { /* empty */ });
	  // }, 'NewPromiseCapability validations, #3');
	});

	QUnit.test('Promise#catch', function (assert) {
	  assert.isFunction(Promise.prototype.catch);
	  if (NATIVE) assert.arity(Promise.prototype.catch, 1);
	  if (NATIVE) assert.name(Promise.prototype.catch, 'catch');
	  assert.looksNative(Promise.prototype.catch);
	  assert.nonEnumerable(Promise.prototype, 'catch');
	  var promise = new Promise(function (resolve) {
	    resolve(42);
	  });
	  var FakePromise1 = promise.constructor = function (executor) {
	    executor(function () {/* empty */}, function () {/* empty */});
	  };
	  promise = new Promise(function (resolve) {
	    resolve(42);
	  });
	  promise.constructor = FakePromise1 = function (executor) {
	    executor(function () {/* empty */}, function () {/* empty */});
	  };
	  assert.ok(promise.catch(function () {/* empty */}) instanceof Promise, 'subclassing, incorrect `this` pattern');
	  promise = new Promise(function (resolve) {
	    resolve(42);
	  });
	  promise.constructor = FakePromise1 = function (executor) {
	    executor(function () {/* empty */}, function () {/* empty */});
	  };
	  assert.same(Promise.prototype.catch.call({
	    then: function (x, y) {
	      return y;
	    }
	  }, 42), 42, 'calling `.then`');
	});
	QUnit.test('Promise.resolve', function (assert) {
	  var resolve = Promise.resolve;
	  assert.isFunction(resolve);
	  if (NATIVE) assert.arity(resolve, 1);
	  assert.name(resolve, 'resolve');
	  assert.looksNative(resolve);
	  assert.nonEnumerable(Promise, 'resolve');
	  assert.throws(function () {
	    resolve.call(null, 1).catch(function () {/* empty */});
	  }, TypeError, 'throws without context');
	  // function FakePromise1(executor) {
	  //   executor(() => { /* empty */ }, () => { /* empty */ });
	  // }
	  // FakePromise1[Symbol.species] = function(executor) {
	  //   executor(() => { /* empty */ }, () => { /* empty */ });
	  // };
	  // assert.ok(resolve.call(FakePromise1, 42) instanceof FakePromise1, 'subclassing, `this` pattern');
	  // assert.throws(() => {
	  //   resolve.call(() => { /* empty */ }, 42);
	  // }, 'NewPromiseCapability validations, #1');
	  // assert.throws(() => {
	  //   resolve.call(executor => {
	  //     executor(null, () => { /* empty */ });
	  //   }, 42);
	  // }, 'NewPromiseCapability validations, #2');
	  // assert.throws(() => {
	  //   resolve.call(executor => {
	  //     executor(() => { /* empty */ }, null);
	  //   }, 42);
	  // }, 'NewPromiseCapability validations, #3');
	});

	QUnit.test('Promise.reject', function (assert) {
	  var reject = Promise.reject;
	  assert.isFunction(reject);
	  if (NATIVE) assert.arity(reject, 1);
	  assert.name(reject, 'reject');
	  assert.looksNative(reject);
	  assert.nonEnumerable(Promise, 'reject');
	  assert.throws(function () {
	    reject.call(null, 1).catch(function () {/* empty */});
	  }, TypeError, 'throws without context');
	  // function FakePromise1(executor) {
	  //   executor(() => { /* empty */ }, () => { /* empty */ });
	  // }
	  // FakePromise1[Symbol.species] = function(executor) {
	  //   executor(() => { /* empty */ }, () => { /* empty */ });
	  // };
	  // assert.ok(reject.call(FakePromise1, 42) instanceof FakePromise1, 'subclassing, `this` pattern');
	  // assert.throws(() => {
	  //   reject.call(() => { /* empty */ }, 42);
	  // }, 'NewPromiseCapability validations, #1');
	  // assert.throws(() => {
	  //   reject.call(executor => {
	  //     executor(null, () => { /* empty */ });
	  //   }, 42);
	  // }, 'NewPromiseCapability validations, #2');
	  // assert.throws(() => {
	  //   reject.call(executor => {
	  //     executor(() => { /* empty */ }, null);
	  //   }, 42);
	  // }, 'NewPromiseCapability validations, #3');
	});

	QUnit.test('Promise.all', function (assert) {
	  var FakePromise1, FakePromise2;
	  var all = Promise.all,
	    resolve = Promise.resolve;
	  assert.isFunction(all);
	  assert.arity(all, 1);
	  // assert.name(all, 'all');
	  assert.looksNative(all);
	  assert.nonEnumerable(Promise, 'all');
	  // const iterable = createIterable([1, 2, 3]);
	  // Promise.all(iterable).catch(() => { /* empty */ });
	  // assert.ok(iterable.received, 'works with iterables: iterator received');
	  // assert.ok(iterable.called, 'works with iterables: next called');
	  // const array = [];
	  // let done = false;
	  // array['@@iterator'] = undefined;
	  // array[Symbol.iterator] = function() {
	  //   done = true;
	  //   return [][Symbol.iterator].call(this);
	  // };
	  // Promise.all(array);
	  // assert.ok(done);
	  // assert.throws(() => {
	  //   all.call(null, []).catch(() => { /* empty */ });
	  // }, TypeError, 'throws without context');
	  // done = false;
	  // try {
	  //   Promise.resolve = function() {
	  //     throw new Error();
	  //   };
	  //   Promise.all(createIterable([1, 2, 3], {
	  //     return() {
	  //       done = true;
	  //     },
	  //   })).catch(() => { /* empty */ });
	  // } catch(error) { /* empty */ }
	  // Promise.resolve = resolve;
	  // assert.ok(done, 'iteration closing');
	  // FakePromise1 = function(executor) {
	  //   executor(() => { /* empty */ }, () => { /* empty */ });
	  // };
	  // FakePromise2 = FakePromise1[Symbol.species] = function(executor) {
	  //   executor(() => { /* empty */ }, () => { /* empty */ });
	  // };
	  // FakePromise1.resolve = FakePromise2.resolve = resolve.bind(Promise);
	  // assert.ok(all.call(FakePromise1, [1, 2, 3]) instanceof FakePromise1, 'subclassing, `this` pattern');
	  // FakePromise1 = function() { /* empty */ };
	  // FakePromise2 = function(executor) {
	  //   executor(null, () => { /* empty */ });
	  // };
	  // const FakePromise3 = function(executor) {
	  //   executor(() => { /* empty */ }, null);
	  // };
	  // FakePromise1.resolve = FakePromise2.resolve = FakePromise3.resolve = resolve.bind(Promise);
	  // assert.throws(() => {
	  //   all.call(FakePromise1, [1, 2, 3]);
	  // }, 'NewPromiseCapability validations, #1');
	  // assert.throws(() => {
	  //   all.call(FakePromise2, [1, 2, 3]);
	  // }, 'NewPromiseCapability validations, #2');
	  // assert.throws(() => {
	  //   all.call(FakePromise3, [1, 2, 3]);
	  // }, 'NewPromiseCapability validations, #3');
	});

	QUnit.test('Promise.race', function (assert) {
	  var FakePromise1, FakePromise2;
	  var race = Promise.race,
	    resolve = Promise.resolve;
	  assert.isFunction(race);
	  assert.arity(race, 1);
	  // assert.name(race, 'race');
	  assert.looksNative(race);
	  assert.nonEnumerable(Promise, 'race');
	  // const iterable = createIterable([1, 2, 3]);
	  // Promise.race(iterable).catch(() => { /* empty */ });
	  // assert.ok(iterable.received, 'works with iterables: iterator received');
	  // assert.ok(iterable.called, 'works with iterables: next called');
	  // const array = [];
	  // let done = false;
	  // array['@@iterator'] = undefined;
	  // array[Symbol.iterator] = function() {
	  //   done = true;
	  //   return [][Symbol.iterator].call(this);
	  // };
	  // Promise.race(array);
	  // assert.ok(done);
	  // assert.throws(() => {
	  //   race.call(null, []).catch(() => { /* empty */ });
	  // }, TypeError, 'throws without context');
	  // done = false;
	  // try {
	  //   Promise.resolve = function() {
	  //     throw new Error();
	  //   };
	  //   Promise.race(createIterable([1, 2, 3], {
	  //     return() {
	  //       done = true;
	  //     },
	  //   })).catch(() => { /* empty */ });
	  // } catch(error) { /* empty */ }
	  // Promise.resolve = resolve;
	  // assert.ok(done, 'iteration closing');
	  // FakePromise1 = function(executor) {
	  //   executor(() => { /* empty */ }, () => { /* empty */ });
	  // };
	  // FakePromise2 = FakePromise1[Symbol.species] = function(executor) {
	  //   executor(() => { /* empty */ }, () => { /* empty */ });
	  // };
	  // FakePromise1.resolve = FakePromise2.resolve = resolve.bind(Promise);
	  // assert.ok(race.call(FakePromise1, [1, 2, 3]) instanceof FakePromise1, 'subclassing, `this` pattern');
	  // FakePromise1 = function() { /* empty */ };
	  // FakePromise2 = function(executor) {
	  //   executor(null, () => { /* empty */ });
	  // };
	  // const FakePromise3 = function(executor) {
	  //   executor(() => { /* empty */ }, null);
	  // };
	  // FakePromise1.resolve = FakePromise2.resolve = FakePromise3.resolve = resolve.bind(Promise);
	  // assert.throws(() => {
	  //   race.call(FakePromise1, [1, 2, 3]);
	  // }, 'NewPromiseCapability validations, #1');
	  // assert.throws(() => {
	  //   race.call(FakePromise2, [1, 2, 3]);
	  // }, 'NewPromiseCapability validations, #2');
	  // assert.throws(() => {
	  //   race.call(FakePromise3, [1, 2, 3]);
	  // }, 'NewPromiseCapability validations, #3');
	});

	// if(PROTO) QUnit.test('Promise subclassing', assert => {
	//   function SubPromise(executor) {
	//     const self = new Promise(executor);
	//     setPrototypeOf(self, SubPromise.prototype);
	//     self.mine = 'subclass';
	//     return self;
	//   }
	//   setPrototypeOf(SubPromise, Promise);
	//   SubPromise.prototype = create(Promise.prototype);
	//   SubPromise.prototype.constructor = SubPromise;
	//   let promise1 = SubPromise.resolve(5);
	//   assert.strictEqual(promise1.mine, 'subclass');
	//   promise1 = promise1.then(it => {
	//     assert.strictEqual(it, 5);
	//   });
	//   assert.strictEqual(promise1.mine, 'subclass');
	//   let promise2 = new SubPromise(resolve => {
	//     resolve(6);
	//   });
	//   assert.strictEqual(promise2.mine, 'subclass');
	//   promise2 = promise2.then(it => {
	//     assert.strictEqual(it, 6);
	//   });
	//   assert.strictEqual(promise2.mine, 'subclass');
	//   const promise3 = SubPromise.all([promise1, promise2]);
	//   assert.strictEqual(promise3.mine, 'subclass');
	//   assert.ok(promise3 instanceof Promise);
	//   assert.ok(promise3 instanceof SubPromise);
	//   promise3.then(assert.async(), error => {
	//     assert.ok(false, error);
	//   });
	// });

	var promise$1 = function () {
	  try {
	    return Function('return (async function () { /* empty */ })()')();
	  } catch (_unused) {/* empty */}
	}();
	if (promise$1 && promise$1.constructor !== Promise) QUnit.test('Native Promise, patched', function (assert) {
	  assert.isFunction(promise$1.then);
	  assert.arity(promise$1.then, 2);
	  assert.looksNative(promise$1.then);
	  assert.nonEnumerable(promise$1.constructor.prototype, 'then');
	  function empty() {/* empty */}
	  assert.ok(promise$1.then(empty) instanceof Promise, '`.then` returns `Promise` instance #1');
	  assert.ok(new promise$1.constructor(empty).then(empty) instanceof Promise, '`.then` returns `Promise` instance #2');
	  assert.ok(promise$1.catch(empty) instanceof Promise, '`.catch` returns `Promise` instance #1');
	  assert.ok(new promise$1.constructor(empty).catch(empty) instanceof Promise, '`.catch` returns `Promise` instance #2');
	  assert.ok(promise$1.finally(empty) instanceof Promise, '`.finally` returns `Promise` instance #1');
	  assert.ok(new promise$1.constructor(empty).finally(empty) instanceof Promise, '`.finally` returns `Promise` instance #2');
	});

	var isNaN$3 = window.isNaN;

	function isNaN$2(value) {
	  return typeof value === "number" && isNaN$3(value);
	}

	if (!Number$1.isNaN) {
	  Number$1.isNaN = isNaN$2;
	}

	QUnit.test('Number.isNaN', function (assert) {
	  var isNaN = Number.isNaN;
	  var create = Object.create;
	  assert.isFunction(isNaN);
	  assert.name(isNaN, 'isNaN');
	  assert.arity(isNaN, 1);
	  assert.looksNative(isNaN);
	  assert.nonEnumerable(Number, 'isNaN');
	  assert.ok(isNaN(NaN), 'Number.isNaN NaN');
	  var notNaNs = [1, 0.1, -1, Math.pow(2, 16), Math.pow(2, 16) - 1, Math.pow(2, 31), Math.pow(2, 31) - 1, Math.pow(2, 32), Math.pow(2, 32) - 1, -0, Infinity, 'NaN', '5', false, new Number(NaN), new Number(Infinity), new Number(5), new Number(0.1), undefined, null, {}, function () {/* empty */}];
	  for (var _i = 0, _notNaNs = notNaNs; _i < _notNaNs.length; _i++) {
	    var value = _notNaNs[_i];
	    assert.ok(!isNaN(value), "not Number.isNaN " + _typeof(value) + " " + value);
	  }
	  assert.ok(!isNaN(create(null)), 'Number.isNaN(Object.create(null)) -> false');
	});

	var isFinite$2 = window.isFinite;

	function isFinite$1(value) {
	  return typeof value === 'number' && isFinite$2(value);
	}

	if (!Number$1.isFinite) {
	  Number$1.isFinite = isFinite$1;
	}

	QUnit.test('Number.isFinite', function (assert) {
	  var isFinite = Number.isFinite;
	  var create = Object.create;
	  assert.isFunction(isFinite);
	  assert.name(isFinite, 'isFinite');
	  assert.arity(isFinite, 1);
	  assert.looksNative(isFinite);
	  assert.nonEnumerable(Number, 'isFinite');
	  var finite = [1, 0.1, -1, Math.pow(2, 16), Math.pow(2, 16) - 1, Math.pow(2, 31), Math.pow(2, 31) - 1, Math.pow(2, 32), Math.pow(2, 32) - 1, -0];
	  for (var _i = 0, _finite = finite; _i < _finite.length; _i++) {
	    var value = _finite[_i];
	    assert.ok(isFinite(value), "isFinite " + _typeof(value) + " " + value);
	  }
	  var notFinite = [NaN, Infinity, 'NaN', '5', false, new Number(NaN), new Number(Infinity), new Number(5), new Number(0.1), undefined, null, {}, function () {/* empty */}];
	  for (var _i2 = 0, _notFinite = notFinite; _i2 < _notFinite.length; _i2++) {
	    var _value = _notFinite[_i2];
	    assert.ok(!isFinite(_value), "not isFinite " + _typeof(_value) + " " + _value);
	  }
	  assert.ok(!isFinite(create(null)), 'Number.isFinite(Object.create(null)) -> false');
	});

	function isInteger(value) {
	  return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
	}

	if (!Number$1.isInteger) {
	  Number$1.isInteger = isInteger;
	}

	QUnit.test('Number.isInteger', function (assert) {
	  var isInteger = Number.isInteger;
	  var create = Object.create;
	  assert.isFunction(isInteger);
	  assert.name(isInteger, 'isInteger');
	  assert.arity(isInteger, 1);
	  assert.looksNative(isInteger);
	  assert.nonEnumerable(Number, 'isInteger');
	  var integers = [1, -1, Math.pow(2, 16), Math.pow(2, 16) - 1, Math.pow(2, 31), Math.pow(2, 31) - 1, Math.pow(2, 32), Math.pow(2, 32) - 1, -0];
	  for (var _i = 0, _integers = integers; _i < _integers.length; _i++) {
	    var value = _integers[_i];
	    assert.ok(isInteger(value), "isInteger " + _typeof(value) + " " + value);
	  }
	  var notIntegers = [NaN, 0.1, Infinity, 'NaN', '5', false, new Number(NaN), new Number(Infinity), new Number(5), new Number(0.1), undefined, null, {}, function () {/* empty */}];
	  for (var _i2 = 0, _notIntegers = notIntegers; _i2 < _notIntegers.length; _i2++) {
	    var _value = _notIntegers[_i2];
	    assert.ok(!isInteger(_value), "not isInteger " + _typeof(_value) + " " + _value);
	  }
	  assert.ok(!isInteger(create(null)), 'Number.isInteger(Object.create(null)) -> false');
	});

	if (Number$1.EPSILON === undefined) {
	  Number$1.EPSILON = Math.pow(2, -52);
	}

	QUnit.test('Number.EPSILON', function (assert) {
	  var EPSILON = Number.EPSILON;
	  assert.ok('EPSILON' in Number, 'EPSILON in Number');
	  assert.nonEnumerable(Number, 'EPSILON');
	  assert.strictEqual(EPSILON, Math.pow(2, -52), 'Is 2^-52');
	  assert.ok(1 !== 1 + EPSILON, '1 isnt 1 + EPSILON');
	  assert.strictEqual(1, 1 + EPSILON / 2, '1 is 1 + EPSILON / 2');
	});

	if (!Number$1.parseFloat) Number$1.parseFloat = parseFloat;

	QUnit.test('Number.parseFloat', function (assert) {
	  var parseFloat = Number.parseFloat;
	  assert.isFunction(parseFloat);
	  assert.name(parseFloat, 'parseFloat');
	  assert.arity(parseFloat, 1);
	  assert.looksNative(parseFloat);
	  assert.nonEnumerable(Number, 'parseFloat');
	  assert.same(parseFloat, GLOBAL.parseFloat);
	  assert.same(parseFloat('0'), 0);
	  assert.same(parseFloat(' 0'), 0);
	  assert.same(parseFloat('+0'), 0);
	  assert.same(parseFloat(' +0'), 0);
	  assert.same(parseFloat('-0'), -0);
	  assert.same(parseFloat(' -0'), -0);
	  // assert.same(parseFloat(`${WHITESPACES}+0`), 0);
	  // assert.same(parseFloat(`${WHITESPACES}-0`), -0);
	  assert.same(parseFloat(null), NaN);
	  assert.same(parseFloat(undefined), NaN);
	});

	if (!Number$1.parseInt) Number$1.parseInt = parseInt;

	QUnit.test('Number.parseInt', function (assert) {
	  var parseInt = Number.parseInt;
	  assert.isFunction(parseInt);
	  // assert.name(parseInt, 'parseInt');
	  assert.arity(parseInt, 2);
	  assert.looksNative(parseInt);
	  assert.nonEnumerable(Number, 'parseInt');
	  assert.same(parseInt, GLOBAL.parseInt);
	  for (var radix = 2; radix <= 36; ++radix) {
	    assert.same(parseInt('10', radix), radix, "radix " + radix);
	  }
	  var strings = ['01', '08', '10', '42'];
	  for (var _i = 0, _strings = strings; _i < _strings.length; _i++) {
	    var string = _strings[_i];
	    assert.same(parseInt(string), parseInt(string, 10), "default radix is 10: " + string);
	  }
	  assert.same(parseInt('0x16'), parseInt('0x16', 16), 'default radix is 16: 0x16');
	  assert.same(parseInt('  0x16'), parseInt('0x16', 16), 'ignores leading whitespace #1');
	  assert.same(parseInt('  42'), parseInt('42', 10), 'ignores leading whitespace #2');
	  assert.same(parseInt('  08'), parseInt('08', 10), 'ignores leading whitespace #3');
	  // assert.same(parseInt(`${WHITESPACES}08`), parseInt('08', 10), 'ignores leading whitespace #4');
	  // assert.same(parseInt(`${WHITESPACES}0x16`), parseInt('0x16', 16), 'ignores leading whitespace #5');
	  var fakeZero = {
	    valueOf: function () {
	      return 0;
	    }
	  };
	  // assert.same(parseInt('08', fakeZero), parseInt('08', 10), 'valueOf #1');
	  // assert.same(parseInt('0x16', fakeZero), parseInt('0x16', 16), 'valueOf #2');
	  assert.same(parseInt('-0xF'), -15, 'signed hex #1');
	  assert.same(parseInt('-0xF', 16), -15, 'signed hex #2');
	  assert.same(parseInt('+0xF'), 15, 'signed hex #3');
	  assert.same(parseInt('+0xF', 16), 15, 'signed hex #4');
	  assert.same(parseInt('10', -4294967294), 2, 'radix uses ToUint32');
	  assert.same(parseInt(null), NaN);
	  assert.same(parseInt(undefined), NaN);
	});

	if (!('MIN_SAFE_INTEGER' in Number$1)) {
	  Number$1.MIN_SAFE_INTEGER = -0x1FFFFFFFFFFFFF;
	}

	if (!Number$1.isSafeInteger) {
	  Number$1.isSafeInteger = function isSafeInteger(value) {
	    return Number$1.isInteger(value) && Math.abs(value) <= Number$1.MAX_SAFE_INTEGER;
	  };
	}

	QUnit.test('Number.isSafeInteger', function (assert) {
	  var isSafeInteger = Number.isSafeInteger;
	  var create = Object.create;
	  assert.isFunction(isSafeInteger);
	  assert.name(isSafeInteger, 'isSafeInteger');
	  assert.arity(isSafeInteger, 1);
	  assert.looksNative(isSafeInteger);
	  assert.nonEnumerable(Number, 'isSafeInteger');
	  var safeIntegers = [1, -1, Math.pow(2, 16), Math.pow(2, 16) - 1, Math.pow(2, 31), Math.pow(2, 31) - 1, Math.pow(2, 32), Math.pow(2, 32) - 1, -0, 9007199254740991, -9007199254740991];
	  for (var _i = 0, _safeIntegers = safeIntegers; _i < _safeIntegers.length; _i++) {
	    var value = _safeIntegers[_i];
	    assert.ok(isSafeInteger(value), "isSafeInteger " + _typeof(value) + " " + value);
	  }
	  var notSafeIntegers = [9007199254740992, -9007199254740992, NaN, 0.1, Infinity, 'NaN', '5', false, new Number(NaN), new Number(Infinity), new Number(5), new Number(0.1), undefined, null, {}, function () {/* empty */}];
	  for (var _i2 = 0, _notSafeIntegers = notSafeIntegers; _i2 < _notSafeIntegers.length; _i2++) {
	    var _value = _notSafeIntegers[_i2];
	    assert.ok(!isSafeInteger(_value), "not isSafeInteger " + _typeof(_value) + " " + _value);
	  }
	  assert.ok(!isSafeInteger(create(null)), 'Number.isSafeInteger(Object.create(null)) -> false');
	});

	QUnit.test('Number.MAX_SAFE_INTEGER', function (assert) {
	  assert.ok('MAX_SAFE_INTEGER' in Number);
	  assert.nonEnumerable(Number, 'MAX_SAFE_INTEGER');
	  assert.strictEqual(Number.MAX_SAFE_INTEGER, Math.pow(2, 53) - 1, 'Is 2^53 - 1');
	});

	QUnit.test('Number.MIN_SAFE_INTEGER', function (assert) {
	  assert.ok('MIN_SAFE_INTEGER' in Number);
	  assert.nonEnumerable(Number, 'MIN_SAFE_INTEGER');
	  assert.strictEqual(Number.MIN_SAFE_INTEGER, -Math.pow(2, 53) + 1, 'Is -2^53 + 1');
	});

	var WeakMap$2 = window.WeakMap;

	var KEY_WM = "@@WeakMap";
	var weakSeq = 0;
	function WeakMap$1() {
	  this.symbol = weakSeq++;
	  if (arguments.length) {
	    var iterable = arguments[0];
	    var entries = iterable[$inject_Symbol_iterator];
	    if (entries) {
	      var it = entries.call(iterable);
	      while (true) {
	        var next = it.next();
	        if (next.done) break;
	        try {
	          this.set(next.value[0], next.value[1]);
	        } catch (e) {
	          if (it.return) {
	            try {
	              it.return();
	            } catch (e) {}
	          }
	          throw e;
	        }
	      }
	    }
	  }
	}
	WeakMap$1.prototype.set = function (key, value) {
	  if (_typeof(key) !== "object" && typeof key !== "function") {
	    throw new TypeError("Invalid value used in weak");
	  }
	  var map = key[KEY_WM];
	  if (!map) {
	    map = {};
	    if (!nonEnumerable) {
	      key[KEY_WM] = map;
	    } else {
	      Object.defineProperty(key, KEY_WM, {
	        value: map,
	        enumerable: false,
	        configurable: true,
	        writable: true
	      });
	    }
	  }
	  map[this.symbol] = value;
	  return this;
	};
	WeakMap$1.prototype.get = function (key) {
	  var map = key[KEY_WM];
	  if (map) {
	    return map[this.symbol];
	  }
	};
	WeakMap$1.prototype.has = function (key) {
	  var map = key[KEY_WM];
	  if (map) {
	    return this.symbol in map;
	  }
	  return false;
	};
	WeakMap$1.prototype.delete = function (key) {
	  if (_typeof(key) !== "object" && typeof key !== "function") {
	    return false;
	  }
	  var map = key[KEY_WM];
	  if (map) {
	    if (this.symbol in map) {
	      delete map[this.symbol];
	      return false;
	    }
	  }
	  return false;
	};

	if (!WeakMap$2) {
	  if (nonEnumerable) {
	    Object.defineProperty(Object.prototype, KEY_WM, {
	      value: undefined,
	      enumerable: false,
	      configurable: true
	    });
	    // if(freeze) {
	    // 	Object.freeze = function(o) {
	    // 		if(!o[KEY_WM]) {
	    // 			Object.defineProperty(o, KEY_WM, {
	    // 				value: {},
	    // 				enumerable: false,
	    // 				configurable: true
	    // 			});
	    // 		}
	    // 		return freeze.call(Object, o);
	    // 	};
	    // }
	  }

	  window.WeakMap = WeakMap$1;
	}

	if (!Object$1.getOwnPropertySymbols) {
	  Object$1.getOwnPropertySymbols = getOwnPropertySymbols;
	}

	function freeze(o) {
	  return o;
	}

	if (!Object$1.freeze) {
	  Object$1.freeze = freeze;
	}

	var _ref$4 = GLOBAL.Reflect || {},
	  ownKeys$4 = _ref$4.ownKeys;
	QUnit.test('WeakMap', function (assert) {
	  assert.isFunction(WeakMap);
	  assert.name(WeakMap, 'WeakMap');
	  // assert.arity(WeakMap, 0);
	  assert.looksNative(WeakMap);
	  assert.ok('delete' in WeakMap.prototype, 'delete in WeakMap.prototype');
	  assert.ok('get' in WeakMap.prototype, 'get in WeakMap.prototype');
	  assert.ok('has' in WeakMap.prototype, 'has in WeakMap.prototype');
	  assert.ok('set' in WeakMap.prototype, 'set in WeakMap.prototype');
	  assert.ok(new WeakMap() instanceof WeakMap, 'new WeakMap instanceof WeakMap');
	  var object = {};
	  // assert.strictEqual(new WeakMap(createIterable([[object, 42]])).get(object), 42, 'Init from iterable');
	  // let weakmap = new WeakMap();
	  // const frozen = Object.freeze({});
	  // weakmap.set(frozen, 42);
	  // assert.strictEqual(weakmap.get(frozen), 42, 'Support frozen objects');
	  // weakmap = new WeakMap();
	  // weakmap.set(frozen, 42);
	  // assert.strictEqual(weakmap.has(frozen), true, 'works with frozen objects, #1');
	  // assert.strictEqual(weakmap.get(frozen), 42, 'works with frozen objects, #2');
	  // weakmap.delete(frozen);
	  // assert.strictEqual(weakmap.has(frozen), false, 'works with frozen objects, #3');
	  // assert.strictEqual(weakmap.get(frozen), undefined, 'works with frozen objects, #4');
	  // let done = false;
	  // try {
	  //   new WeakMap(createIterable([null, 1, 2], {
	  //     return() {
	  //       return done = true;
	  //     },
	  //   }));
	  // } catch { /* empty */ }
	  // assert.ok(done, '.return #throw');
	  // assert.ok(!('clear' in WeakMap.prototype), 'should not contains `.clear` method');
	  // const array = [];
	  // done = false;
	  // array['@@iterator'] = undefined;
	  // array[Symbol.iterator] = function() {
	  //   done = true;
	  //   return [][Symbol.iterator].call(this);
	  // };
	  // new WeakMap(array);
	  // assert.ok(done);
	  object = {};
	  new WeakMap().set(object, 1);
	  if (DESCRIPTORS) {
	    var results = [];
	    for (var key in object) results.push(key);
	    assert.arrayEqual(results, []);
	    assert.arrayEqual(Object.keys(object), []);
	  }
	  assert.arrayEqual(Object.getOwnPropertyNames(object), []);
	  if (Object.getOwnPropertySymbols) assert.arrayEqual(Object.getOwnPropertySymbols(object), []);
	  if (ownKeys$4) assert.arrayEqual(ownKeys$4(object), []);
	  if (nativeSubclass) {
	    var Subclass = nativeSubclass(WeakMap);
	    assert.ok(new Subclass() instanceof Subclass, 'correct subclassing with native classes #1');
	    assert.ok(new Subclass() instanceof WeakMap, 'correct subclassing with native classes #2');
	    object = {};
	    assert.same(new Subclass().set(object, 2).get(object), 2, 'correct subclassing with native classes #3');
	  }
	});
	QUnit.test('WeakMap#delete', function (assert) {
	  assert.isFunction(WeakMap.prototype.delete);
	  if (NATIVE) assert.name(WeakMap.prototype.delete, 'delete');
	  if (NATIVE) assert.arity(WeakMap.prototype.delete, 1);
	  assert.looksNative(WeakMap.prototype.delete);
	  assert.nonEnumerable(WeakMap.prototype, 'delete');
	  var a = {};
	  var b = {};
	  var weakmap = new WeakMap();
	  weakmap.set(a, 42);
	  weakmap.set(b, 21);
	  assert.ok(weakmap.has(a) && weakmap.has(b), 'WeakMap has values before .delete()');
	  weakmap.delete(a);
	  assert.ok(!weakmap.has(a) && weakmap.has(b), 'WeakMap hasn`t value after .delete()');
	  assert.notThrows(function () {
	    return !weakmap.delete(1);
	  }, 'return false on primitive');
	  var object = {};
	  weakmap.set(object, 42);
	  Object.freeze(object);
	  assert.ok(weakmap.has(object), 'works with frozen objects #1');
	  weakmap.delete(object);
	  assert.ok(!weakmap.has(object), 'works with frozen objects #2');
	});
	QUnit.test('WeakMap#get', function (assert) {
	  assert.isFunction(WeakMap.prototype.get);
	  if (NATIVE) assert.name(WeakMap.prototype.get, 'get');
	  if (NATIVE) assert.arity(WeakMap.prototype.get, 1);
	  assert.looksNative(WeakMap.prototype.get);
	  assert.nonEnumerable(WeakMap.prototype, 'get');
	  var weakmap = new WeakMap();
	  assert.strictEqual(weakmap.get({}), undefined, 'WeakMap .get() before .set() return undefined');
	  var object = {};
	  weakmap.set(object, 42);
	  assert.strictEqual(weakmap.get(object), 42, 'WeakMap .get() return value');
	  weakmap.delete(object);
	  assert.strictEqual(weakmap.get(object), undefined, 'WeakMap .get() after .delete() return undefined');
	  assert.notThrows(function () {
	    return weakmap.get(1) === undefined;
	  }, 'return undefined on primitive');
	  object = {};
	  weakmap.set(object, 42);
	  Object.freeze(object);
	  assert.same(weakmap.get(object), 42, 'works with frozen objects #1');
	  weakmap.delete(object);
	  assert.same(weakmap.get(object), undefined, 'works with frozen objects #2');
	});
	QUnit.test('WeakMap#has', function (assert) {
	  assert.isFunction(WeakMap.prototype.has);
	  if (NATIVE) assert.name(WeakMap.prototype.has, 'has');
	  if (NATIVE) assert.arity(WeakMap.prototype.has, 1);
	  assert.looksNative(WeakMap.prototype.has);
	  assert.nonEnumerable(WeakMap.prototype, 'has');
	  var weakmap = new WeakMap();
	  assert.ok(!weakmap.has({}), 'WeakMap .has() before .set() return false');
	  var object = {};
	  weakmap.set(object, 42);
	  assert.ok(weakmap.has(object), 'WeakMap .has() return true');
	  weakmap.delete(object);
	  assert.ok(!weakmap.has(object), 'WeakMap .has() after .delete() return false');
	  assert.notThrows(function () {
	    return !weakmap.has(1);
	  }, 'return false on primitive');
	  object = {};
	  weakmap.set(object, 42);
	  Object.freeze(object);
	  assert.ok(weakmap.has(object), 'works with frozen objects #1');
	  weakmap.delete(object);
	  assert.ok(!weakmap.has(object), 'works with frozen objects #2');
	});
	QUnit.test('WeakMap#set', function (assert) {
	  assert.isFunction(WeakMap.prototype.set);
	  if (NATIVE) assert.name(WeakMap.prototype.set, 'set');
	  assert.arity(WeakMap.prototype.set, 2);
	  assert.looksNative(WeakMap.prototype.set);
	  assert.nonEnumerable(WeakMap.prototype, 'set');
	  var weakmap = new WeakMap();
	  var object = {};
	  weakmap.set(object, 33);
	  assert.same(weakmap.get(object), 33, 'works with object as keys');
	  // assert.ok(weakmap.set({}, 42) === weakmap, 'chaining');
	  assert.throws(function () {
	    return new WeakMap().set(42, 42);
	  }, 'throws with primitive keys');
	  // const object1 = Object.freeze({});
	  // const object2 = {};
	  // weakmap.set(object1, 42);
	  // weakmap.set(object2, 42);
	  // Object.freeze(object2);
	  // assert.same(weakmap.get(object1), 42, 'works with frozen objects #1');
	  // assert.same(weakmap.get(object2), 42, 'works with frozen objects #2');
	  // weakmap.delete(object1);
	  // weakmap.delete(object2);
	  // assert.same(weakmap.get(object1), undefined, 'works with frozen objects #3');
	  // assert.same(weakmap.get(object2), undefined, 'works with frozen objects #4');
	});

	// QUnit.test('WeakMap#@@toStringTag', assert => {
	//   assert.strictEqual(WeakMap.prototype[Symbol.toStringTag], 'WeakMap', 'WeakMap::@@toStringTag is `WeakMap`');
	//   assert.strictEqual(String(new WeakMap()), '[object WeakMap]', 'correct stringification');
	// });

	var WeakSet$2 = window.WeakSet;

	function WeakSet$1() {
	  this.map = new WeakMap();
	  if (arguments.length) {
	    var iterable = arguments[0];
	    var entries = iterable[$inject_Symbol_iterator];
	    if (entries) {
	      var it = entries.call(iterable);
	      while (true) {
	        var next = it.next();
	        if (next.done) break;
	        try {
	          this.add(next.value);
	        } catch (e) {
	          if (it.return) {
	            try {
	              it.return();
	            } catch (e) {}
	          }
	          throw e;
	        }
	      }
	    }
	  }
	}
	WeakSet$1.prototype.add = function (key) {
	  this.map.set(key, true);
	  return this;
	};
	WeakSet$1.prototype.has = function (key) {
	  return this.map.has(key);
	};
	WeakSet$1.prototype.delete = function (key) {
	  return this.map.delete(key);
	};

	if (!WeakSet$2) {
	  window.WeakSet = WeakSet$1;
	}

	var _ref$3 = GLOBAL.Reflect || {},
	  ownKeys$3 = _ref$3.ownKeys;
	QUnit.test('WeakSet', function (assert) {
	  assert.isFunction(WeakSet);
	  assert.name(WeakSet, 'WeakSet');
	  assert.arity(WeakSet, 0);
	  assert.looksNative(WeakSet);
	  assert.ok('add' in WeakSet.prototype, 'add in WeakSet.prototype');
	  assert.ok('delete' in WeakSet.prototype, 'delete in WeakSet.prototype');
	  assert.ok('has' in WeakSet.prototype, 'has in WeakSet.prototype');
	  assert.ok(new WeakSet() instanceof WeakSet, 'new WeakSet instanceof WeakSet');
	  var object = {};
	  // assert.ok(new WeakSet(createIterable([object])).has(object), 'Init from iterable');
	  // const weakset = new WeakSet();
	  // const frozen = Object.freeze({});
	  // weakset.add(frozen);
	  // assert.strictEqual(weakset.has(frozen), true, 'works with frozen objects, #1');
	  // weakset.delete(frozen);
	  // assert.strictEqual(weakset.has(frozen), false, 'works with frozen objects, #2');
	  // let done = false;
	  // try {
	  //   new WeakSet(createIterable([null, 1, 2], {
	  //     return() {
	  //       return done = true;
	  //     },
	  //   }));
	  // } catch { /* empty */ }
	  // assert.ok(done, '.return #throw');
	  // assert.ok(!('clear' in WeakSet.prototype), 'should not contains `.clear` method');
	  // const array = [];
	  // done = false;
	  // array['@@iterator'] = undefined;
	  // array[Symbol.iterator] = function() {
	  //   done = true;
	  //   return [][Symbol.iterator].call(this);
	  // };
	  // new WeakSet(array);
	  // assert.ok(done);
	  object = {};
	  new WeakSet().add(object);
	  if (DESCRIPTORS) {
	    var results = [];
	    for (var key in object) results.push(key);
	    assert.arrayEqual(results, []);
	    assert.arrayEqual(Object.keys(object), []);
	  }
	  assert.arrayEqual(Object.getOwnPropertyNames(object), []);
	  if (Object.getOwnPropertySymbols) assert.arrayEqual(Object.getOwnPropertySymbols(object), []);
	  if (ownKeys$3) assert.arrayEqual(ownKeys$3(object), []);
	  if (nativeSubclass) {
	    var Subclass = nativeSubclass(WeakSet);
	    assert.ok(new Subclass() instanceof Subclass, 'correct subclassing with native classes #1');
	    assert.ok(new Subclass() instanceof WeakSet, 'correct subclassing with native classes #2');
	    object = {};
	    assert.ok(new Subclass().add(object).has(object), 'correct subclassing with native classes #3');
	  }
	});
	QUnit.test('WeakSet#add', function (assert) {
	  assert.isFunction(WeakSet.prototype.add);
	  // assert.name(WeakSet.prototype.add, 'add');
	  assert.arity(WeakSet.prototype.add, 1);
	  assert.looksNative(WeakSet.prototype.add);
	  assert.nonEnumerable(WeakSet.prototype, 'add');
	  var weakset = new WeakSet();
	  // assert.ok(weakset.add({}) === weakset, 'chaining');
	  assert.throws(function () {
	    return new WeakSet().add(42);
	  }, 'throws with primitive keys');
	});
	QUnit.test('WeakSet#delete', function (assert) {
	  assert.isFunction(WeakSet.prototype.delete);
	  if (NATIVE) assert.arity(WeakSet.prototype.delete, 1);
	  assert.looksNative(WeakSet.prototype.delete);
	  assert.nonEnumerable(WeakSet.prototype, 'delete');
	  var a = {};
	  var b = {};
	  var weakset = new WeakSet().add(a).add(b);
	  assert.ok(weakset.has(a) && weakset.has(b), 'WeakSet has values before .delete()');
	  weakset.delete(a);
	  assert.ok(!weakset.has(a) && weakset.has(b), 'WeakSet has`nt value after .delete()');
	  assert.notThrows(function () {
	    return !weakset.delete(1);
	  }, 'return false on primitive');
	});
	QUnit.test('WeakSet#has', function (assert) {
	  assert.isFunction(WeakSet.prototype.has);
	  // assert.name(WeakSet.prototype.has, 'has');
	  assert.arity(WeakSet.prototype.has, 1);
	  assert.looksNative(WeakSet.prototype.has);
	  assert.nonEnumerable(WeakSet.prototype, 'has');
	  var weakset = new WeakSet();
	  assert.ok(!weakset.has({}), 'WeakSet has`nt value');
	  var object = {};
	  weakset.add(object);
	  assert.ok(weakset.has(object), 'WeakSet has value after .add()');
	  weakset.delete(object);
	  assert.ok(!weakset.has(object), 'WeakSet hasn`t value after .delete()');
	  assert.notThrows(function () {
	    return !weakset.has(1);
	  }, 'return false on primitive');
	});

	// QUnit.test('WeakSet::@@toStringTag', assert => {
	//   assert.strictEqual(WeakSet.prototype[Symbol.toStringTag], 'WeakSet', 'WeakSet::@@toStringTag is `WeakSet`');
	//   assert.strictEqual(String(new WeakSet()), '[object WeakSet]', 'correct stringification');
	// });

	function entries$2() {
	  var array = this;
	  var index = 0;
	  return {
	    next: function () {
	      var value;
	      var done = array.length <= index;
	      if (!done) {
	        value = [index, array[index]];
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

	if (!Array.prototype.entries) {
	  Array.prototype.entries = entries$2;
	}

	var Map$1 = window.Map;

	function createSubMap() {
	  function Map() {
	    var args = arguments[0];
	    var map = new Map$1(args);
	    Object.setPrototypeOf(map, Object.getPrototypeOf(this));
	    return map;
	  }
	  Object.setPrototypeOf(Map, Map$1);
	  Map.prototype = Object.create(Map$1.prototype);
	  return Map;
	}
	function fixMap() {
	  var Map = createSubMap();
	  var m = new Map$1();
	  if (typeof m.size === "function") {
	    // firefox 18-
	    Object.defineProperty(Map.prototype, 'size', {
	      get: function () {
	        return Map$1.prototype.size.call(this);
	      },
	      enumerable: true
	    });
	  }
	  // ie11 not support iterator
	  if (Map.prototype.iterator) {
	    // firefox 17~26 iterator return firefox iterator
	    if (!Map.prototype.entries) {
	      // firefox 17~19
	      Map.prototype.entries = function () {
	        return toES6Iterator(this.iterator());
	      };
	    }
	    if (!Map.prototype.keys) {
	      Map.prototype.keys = function () {
	        return toES6Iterator(this.iterator(), getKey$1);
	      };
	    }
	    if (!Map.prototype.values) {
	      Map.prototype.values = function () {
	        return toES6Iterator(this.iterator(), getValue$1);
	      };
	    }
	    if (!Map.prototype.forEach) {
	      // firefox 17~24
	      // myMap.forEach(callback([value][, key][, map])[, thisArg])
	      Map.prototype.forEach = function (callbackfn, thisArg) {
	        var it = this.iterator();
	        while (true) {
	          try {
	            var next = it.next();
	          } catch (e) {
	            break;
	          }
	          callbackfn.call(thisArg, next[1], next[0], this);
	        }
	      };
	    }
	  }
	  if (!Map.prototype['@@iterator']) {
	    Map.prototype['@@iterator'] = Map.prototype.entries;
	  }
	  return Map;
	}
	function getKey$1(item) {
	  return item[0];
	}
	function getValue$1(item) {
	  return item[1];
	}

	var isNaN$1 = Number.isNaN || isNaN$2;

	function createMap() {
	  function Map() {
	    var arr = arguments[0];
	    this.size = 0;
	    this.head = null;
	    this.tail = null;
	    if (arr) {
	      var entries = arr['@@iterator'];
	      if (entries) {
	        var it = entries.call(arr);
	        while (true) {
	          var next = it.next();
	          if (next.done) break;
	          try {
	            this.set(next.value[0], next.value[1]);
	          } catch (e) {
	            if (it.return) {
	              try {
	                it.return();
	              } catch (e) {}
	            }
	            throw e;
	          }
	        }
	      }
	    }
	  }
	  Map.prototype.has = has;
	  Map.prototype.get = get;
	  Map.prototype.set = set;
	  Map.prototype.delete = remove;
	  Map.prototype.clear = clear;
	  Map.prototype.forEach = forEach;
	  Map.prototype.entries = entries$1;
	  Map.prototype.keys = keys;
	  Map.prototype.values = values$1;
	  Map.prototype['@@iterator'] = entries$1;
	  return Map;
	}
	;
	function has(key) {
	  if (this.size === 0) {
	    return false;
	  }
	  var item = this.head;
	  while (item) {
	    if (item.key === key || isNaN$1(key) && isNaN$1(item.key)) {
	      return true;
	    }
	    item = item.next;
	  }
	  return false;
	}
	;
	function get(key) {
	  if (this.size === 0) {
	    return undefined;
	  }
	  var item = this.head;
	  while (item) {
	    if (item.key === key || isNaN$1(key) && isNaN$1(item.key)) {
	      return item.value;
	    }
	    item = item.next;
	  }
	  return undefined;
	}
	;
	function set(key, value) {
	  if (key === 0) {
	    //-0 -> 0
	    key = 0;
	  }
	  if (this.size === 0) {
	    this.head = this.tail = {
	      key: key,
	      value: value,
	      prev: null,
	      next: null,
	      exist: true
	    };
	    this.size = 1;
	    return this;
	  }
	  var item = this.head;
	  while (item) {
	    if (item.key === key || isNaN$1(key) && isNaN$1(item.key)) {
	      item.value = value;
	      return this;
	    }
	    item = item.next;
	  }
	  var tail = this.tail;
	  var newTail = {
	    key: key,
	    value: value,
	    prev: tail,
	    next: null,
	    exist: true
	  };
	  tail.next = newTail;
	  this.tail = newTail;
	  this.size++;
	  return this;
	}
	;
	function remove(key) {
	  if (this.size === 0) {
	    return false;
	  }
	  var item = this.head;
	  while (item) {
	    if (item.key === key || isNaN$1(key) && isNaN$1(item.key)) {
	      var prev = item.prev;
	      var next = item.next;
	      if (prev) {
	        prev.next = next;
	      } else {
	        this.head = next;
	      }
	      if (next) {
	        next.prev = prev;
	      } else {
	        this.tail = prev;
	      }
	      item.exist = false;
	      this.size--;
	      return true;
	    }
	    item = item.next;
	  }
	  return false;
	}
	;
	function clear() {
	  this.size = 0;
	  this.head = null;
	  this.tail = null;
	}
	;
	function forEach(callbackfn) {
	  var thisArg = arguments[1];
	  var item = this.head;
	  while (item) {
	    callbackfn.call(thisArg, item.value, item.key, this);
	    var next = item.next;
	    if (item.exist || next && next.exist) {
	      item = next;
	    } else {
	      while (true) {
	        item = item.prev;
	        if (item) {
	          if (item.exist) {
	            item = item.next;
	            break;
	          }
	        } else {
	          item = this.head;
	          break;
	        }
	      }
	    }
	  }
	}
	;
	function createIterable(that, getValue) {
	  var done = false;
	  var current;
	  var it = {
	    next: function () {
	      var value;
	      if (done) {
	        return {
	          done: done,
	          value: value
	        };
	      }
	      if (!current) {
	        current = that.head;
	      } else {
	        var next = current.next;
	        if (current.exist || next && next.exist) {
	          current = next;
	        } else {
	          while (true) {
	            current = current.prev;
	            if (current) {
	              if (current.exist) {
	                current = current.next;
	                break;
	              }
	            } else {
	              current = that.head;
	              break;
	            }
	          }
	        }
	      }
	      if (current) {
	        done = false;
	        value = getValue(current);
	      } else {
	        done = true;
	      }
	      return {
	        done: done,
	        value: value
	      };
	    }
	  };
	  it['@@iterator'] = function () {
	    return createIterable(that, getValue);
	  };
	  return it;
	}
	function getKeyValue(item) {
	  return [item.key, item.value];
	}
	function entries$1() {
	  return createIterable(this, getKeyValue);
	}
	;
	function getKey(item) {
	  return item.key;
	}
	function keys() {
	  return createIterable(this, getKey);
	}
	;
	function getValue(item) {
	  return item.value;
	}
	function values$1() {
	  return createIterable(this, getValue);
	}
	;

	if (!_Symbol$6) {
	  if (Map$1 && (Map$1.prototype.iterator || Map$1.prototype['@@iterator'])) {
	    window.Map = fixMap();
	  } else {
	    window.Map = createMap();
	  }
	} else {
	  if (!_Symbol$6.iterator) {
	    _Symbol$6.iterator = _Symbol$6('iterator');
	  }
	  if (!Map$1.prototype[_Symbol$6.iterator]) {
	    Map$1.prototype[_Symbol$6.iterator] = Map$1.prototype.entries;
	  }
	}

	var _ref$2 = GLOBAL.Reflect || {},
	  ownKeys$2 = _ref$2.ownKeys;
	QUnit.test('Map', function (assert) {
	  assert.isFunction(Map);
	  assert.arity(Map, 0);
	  assert.name(Map, 'Map');
	  assert.looksNative(Map);
	  assert.ok('clear' in Map.prototype, 'clear in Map.prototype');
	  assert.ok('delete' in Map.prototype, 'delete in Map.prototype');
	  assert.ok('forEach' in Map.prototype, 'forEach in Map.prototype');
	  assert.ok('get' in Map.prototype, 'get in Map.prototype');
	  assert.ok('has' in Map.prototype, 'has in Map.prototype');
	  assert.ok('set' in Map.prototype, 'set in Map.prototype');
	  assert.ok(new Map() instanceof Map, 'new Map instanceof Map');
	  assert.strictEqual(new Map(createIterable$1([[1, 1], [2, 2], [3, 3]])).size, 3, 'Init from iterable');
	  assert.strictEqual(new Map([[Object.freeze({}), 1], [2, 3]]).size, 2, 'Support frozen objects');
	  var done = false;
	  try {
	    new Map(createIterable$1([null, 1, 2], {
	      return: function () {
	        return done = true;
	      }
	    }));
	  } catch (_unused) {/* empty */}
	  assert.ok(done, '.return #throw');
	  var array = [];
	  done = false;
	  array['@@iterator'] = undefined;
	  array[$inject_Symbol_iterator] = function () {
	    done = true;
	    return [][$inject_Symbol_iterator].call(this);
	  };
	  new Map(array);
	  assert.ok(done);
	  var object = {};
	  new Map().set(object, 1);
	  if (DESCRIPTORS) {
	    var results = [];
	    for (var key in object) results.push(key);
	    assert.arrayEqual(results, []);
	    assert.arrayEqual(Object.keys(object), []);
	  }
	  assert.arrayEqual(Object.getOwnPropertyNames(object), []);
	  if (Object.getOwnPropertySymbols) assert.arrayEqual(Object.getOwnPropertySymbols(object), []);
	  if (ownKeys$2) assert.arrayEqual(ownKeys$2(object), []);
	  if (nativeSubclass) {
	    var Subclass = nativeSubclass(Map);
	    assert.ok(new Subclass() instanceof Subclass, 'correct subclassing with native classes #1');
	    assert.ok(new Subclass() instanceof Map, 'correct subclassing with native classes #2');
	    assert.strictEqual(new Subclass().set(1, 2).get(1), 2, 'correct subclassing with native classes #3');
	  }
	});
	QUnit.test('Map#clear', function (assert) {
	  assert.isFunction(Map.prototype.clear);
	  assert.arity(Map.prototype.clear, 0);
	  assert.name(Map.prototype.clear, 'clear');
	  assert.looksNative(Map.prototype.clear);
	  assert.nonEnumerable(Map.prototype, 'clear');
	  var map = new Map();
	  map.clear();
	  assert.strictEqual(map.size, 0);
	  map = new Map();
	  map.set(1, 2);
	  map.set(2, 3);
	  map.set(1, 4);
	  map.clear();
	  assert.strictEqual(map.size, 0);
	  assert.ok(!map.has(1));
	  assert.ok(!map.has(2));
	  var frozen = Object.freeze({});
	  map = new Map();
	  map.set(1, 2);
	  map.set(frozen, 3);
	  map.clear();
	  assert.strictEqual(map.size, 0, 'Support frozen objects');
	  assert.ok(!map.has(1));
	  assert.ok(!map.has(frozen));
	});
	QUnit.test('Map#delete', function (assert) {
	  assert.isFunction(Map.prototype.delete);
	  assert.arity(Map.prototype.delete, 1);
	  if (NATIVE) assert.name(Map.prototype.delete, 'delete');
	  assert.looksNative(Map.prototype.delete);
	  assert.nonEnumerable(Map.prototype, 'delete');
	  var object = {};
	  var map = new Map();
	  map.set(NaN, 1);
	  map.set(2, 1);
	  map.set(3, 7);
	  map.set(2, 5);
	  map.set(1, 4);
	  map.set(object, 9);
	  assert.strictEqual(map.size, 5);
	  assert.ok(map.delete(NaN));
	  assert.strictEqual(map.size, 4);
	  assert.ok(!map.delete(4));
	  assert.strictEqual(map.size, 4);
	  map.delete([]);
	  assert.strictEqual(map.size, 4);
	  map.delete(object);
	  assert.strictEqual(map.size, 3);
	  var frozen = Object.freeze({});
	  map.set(frozen, 42);
	  assert.strictEqual(map.size, 4);
	  map.delete(frozen);
	  assert.strictEqual(map.size, 3);
	});
	QUnit.test('Map#forEach', function (assert) {
	  assert.isFunction(Map.prototype.forEach);
	  assert.arity(Map.prototype.forEach, 1);
	  assert.name(Map.prototype.forEach, 'forEach');
	  assert.looksNative(Map.prototype.forEach);
	  assert.nonEnumerable(Map.prototype, 'forEach');
	  var result = {};
	  var count = 0;
	  var object = {};
	  var map = new Map();
	  map.set(NaN, 1);
	  map.set(2, 1);
	  map.set(3, 7);
	  map.set(2, 5);
	  map.set(1, 4);
	  map.set(object, 9);
	  map.forEach(function (value, key) {
	    count++;
	    result[value] = key;
	  });
	  assert.strictEqual(count, 5);
	  assert.deepEqual(result, {
	    1: NaN,
	    7: 3,
	    5: 2,
	    4: 1,
	    9: object
	  });
	  map = new Map();
	  map.set('0', 9);
	  map.set('1', 9);
	  map.set('2', 9);
	  map.set('3', 9);
	  result = '';
	  map.forEach(function (value, key) {
	    result += key;
	    if (key === '2') {
	      map.delete('2');
	      map.delete('3');
	      map.delete('1');
	      map.set('4', 9);
	    }
	  });
	  assert.strictEqual(result, '0124');
	  map = new Map([['0', 1]]);
	  result = '';
	  map.forEach(function (it) {
	    map.delete('0');
	    if (result !== '') throw new Error();
	    result += it;
	  });
	  assert.strictEqual(result, '1');
	  // assert.throws(() => {
	  //   Map.prototype.forEach.call(new Set(), () => { /* empty */ });
	  // }, 'non-generic');
	});

	QUnit.test('Map#get', function (assert) {
	  assert.isFunction(Map.prototype.get);
	  assert.name(Map.prototype.get, 'get');
	  assert.arity(Map.prototype.get, 1);
	  assert.looksNative(Map.prototype.get);
	  assert.nonEnumerable(Map.prototype, 'get');
	  var object = {};
	  var frozen = Object.freeze({});
	  var map = new Map();
	  map.set(NaN, 1);
	  map.set(2, 1);
	  map.set(3, 1);
	  map.set(2, 5);
	  map.set(1, 4);
	  map.set(frozen, 42);
	  map.set(object, object);
	  assert.strictEqual(map.get(NaN), 1);
	  assert.strictEqual(map.get(4), undefined);
	  assert.strictEqual(map.get({}), undefined);
	  assert.strictEqual(map.get(object), object);
	  assert.strictEqual(map.get(frozen), 42);
	  assert.strictEqual(map.get(2), 5);
	});
	QUnit.test('Map#has', function (assert) {
	  assert.isFunction(Map.prototype.has);
	  assert.name(Map.prototype.has, 'has');
	  assert.arity(Map.prototype.has, 1);
	  assert.looksNative(Map.prototype.has);
	  assert.nonEnumerable(Map.prototype, 'has');
	  var object = {};
	  var frozen = Object.freeze({});
	  var map = new Map();
	  map.set(NaN, 1);
	  map.set(2, 1);
	  map.set(3, 1);
	  map.set(2, 5);
	  map.set(1, 4);
	  map.set(frozen, 42);
	  map.set(object, object);
	  assert.ok(map.has(NaN));
	  assert.ok(map.has(object));
	  assert.ok(map.has(2));
	  assert.ok(map.has(frozen));
	  assert.ok(!map.has(4));
	  assert.ok(!map.has({}));
	});
	QUnit.test('Map#set', function (assert) {
	  assert.isFunction(Map.prototype.set);
	  assert.name(Map.prototype.set, 'set');
	  assert.arity(Map.prototype.set, 2);
	  assert.looksNative(Map.prototype.set);
	  assert.nonEnumerable(Map.prototype, 'set');
	  var object = {};
	  var map = new Map();
	  map.set(NaN, 1);
	  map.set(2, 1);
	  map.set(3, 1);
	  map.set(2, 5);
	  map.set(1, 4);
	  map.set(object, object);
	  assert.ok(map.size === 5);
	  var chain = map.set(7, 2);
	  assert.strictEqual(chain, map);
	  map.set(7, 2);
	  assert.strictEqual(map.size, 6);
	  assert.strictEqual(map.get(7), 2);
	  assert.strictEqual(map.get(NaN), 1);
	  map.set(NaN, 42);
	  assert.strictEqual(map.size, 6);
	  assert.strictEqual(map.get(NaN), 42);
	  map.set({}, 11);
	  assert.strictEqual(map.size, 7);
	  assert.strictEqual(map.get(object), object);
	  map.set(object, 27);
	  assert.strictEqual(map.size, 7);
	  assert.strictEqual(map.get(object), 27);
	  map = new Map();
	  map.set(NaN, 2);
	  map.set(NaN, 3);
	  map.set(NaN, 4);
	  assert.strictEqual(map.size, 1);
	  var frozen = Object.freeze({});
	  map = new Map().set(frozen, 42);
	  assert.strictEqual(map.get(frozen), 42);
	});
	QUnit.test('Map#size', function (assert) {
	  assert.nonEnumerable(Map.prototype, 'size');
	  var map = new Map();
	  map.set(2, 1);
	  var size = map.size;
	  assert.strictEqual(_typeof(size), 'number', 'size is number');
	  assert.strictEqual(size, 1, 'size is correct');
	  // if(DESCRIPTORS) {
	  //   const sizeDescriptor = Object.getOwnPropertyDescriptor(Map.prototype, 'size');
	  //   assert.ok(sizeDescriptor && sizeDescriptor.get, 'size is getter');
	  //   assert.ok(sizeDescriptor && !sizeDescriptor.set, 'size isnt setter');
	  //   assert.throws(() => Map.prototype.size, TypeError);
	  // }
	});

	QUnit.test('Map & -0', function (assert) {
	  var map = new Map();
	  map.set(-0, 1);
	  assert.strictEqual(map.size, 1);
	  assert.ok(map.has(0));
	  assert.ok(map.has(-0));
	  assert.strictEqual(map.get(0), 1);
	  assert.strictEqual(map.get(-0), 1);
	  map.forEach(function (val, key) {
	    assert.ok(!is$1(key, -0));
	  });
	  map.delete(-0);
	  assert.strictEqual(map.size, 0);
	  map = new Map([[-0, 1]]);
	  map.forEach(function (val, key) {
	    assert.ok(!is$1(key, -0));
	  });
	  map = new Map();
	  map.set(4, 4);
	  map.set(3, 3);
	  map.set(2, 2);
	  map.set(1, 1);
	  map.set(0, 0);
	  assert.ok(map.has(-0));
	});

	// QUnit.test('Map#@@toStringTag', assert => {
	//   assert.strictEqual(Map.prototype[Symbol.toStringTag], 'Map', 'Map::@@toStringTag is `Map`');
	//   assert.strictEqual(String(new Map()), '[object Map]', 'correct stringification');
	// });

	QUnit.test('Map Iterator', function (assert) {
	  var map = new Map();
	  map.set('a', 1);
	  map.set('b', 2);
	  map.set('c', 3);
	  map.set('d', 4);
	  var results = [];
	  var iterator = map.keys();
	  assert.isIterator(iterator);
	  assert.isIterable(iterator);
	  assert.nonEnumerable(iterator, 'next');
	  assert.nonEnumerable(iterator, $inject_Symbol_iterator);
	  results.push(iterator.next().value);
	  assert.ok(map.delete('a'));
	  assert.ok(map.delete('b'));
	  assert.ok(map.delete('c'));
	  map.set('e');
	  results.push(iterator.next().value, iterator.next().value);
	  assert.ok(iterator.next().done);
	  map.set('f');
	  assert.ok(iterator.next().done);
	  assert.deepEqual(results, ['a', 'd', 'e']);
	});
	QUnit.test('Map#keys', function (assert) {
	  assert.isFunction(Map.prototype.keys);
	  assert.name(Map.prototype.keys, 'keys');
	  assert.arity(Map.prototype.keys, 0);
	  assert.looksNative(Map.prototype.keys);
	  assert.nonEnumerable(Map.prototype, 'keys');
	  var map = new Map();
	  map.set('a', 'q');
	  map.set('s', 'w');
	  map.set('d', 'e');
	  var iterator = map.keys();
	  assert.isIterator(iterator);
	  assert.isIterable(iterator);
	  // assert.strictEqual(iterator[Symbol.toStringTag], 'Map Iterator');
	  assert.deepEqual(iterator.next(), {
	    value: 'a',
	    done: false
	  });
	  assert.deepEqual(iterator.next(), {
	    value: 's',
	    done: false
	  });
	  assert.deepEqual(iterator.next(), {
	    value: 'd',
	    done: false
	  });
	  assert.deepEqual(iterator.next(), {
	    value: undefined,
	    done: true
	  });
	});
	QUnit.test('Map#values', function (assert) {
	  assert.isFunction(Map.prototype.values);
	  assert.name(Map.prototype.values, 'values');
	  assert.arity(Map.prototype.values, 0);
	  assert.looksNative(Map.prototype.values);
	  assert.nonEnumerable(Map.prototype, 'values');
	  var map = new Map();
	  map.set('a', 'q');
	  map.set('s', 'w');
	  map.set('d', 'e');
	  var iterator = map.values();
	  assert.isIterator(iterator);
	  assert.isIterable(iterator);
	  // assert.strictEqual(iterator[Symbol.toStringTag], 'Map Iterator');
	  assert.deepEqual(iterator.next(), {
	    value: 'q',
	    done: false
	  });
	  assert.deepEqual(iterator.next(), {
	    value: 'w',
	    done: false
	  });
	  assert.deepEqual(iterator.next(), {
	    value: 'e',
	    done: false
	  });
	  assert.deepEqual(iterator.next(), {
	    value: undefined,
	    done: true
	  });
	});
	QUnit.test('Map#entries', function (assert) {
	  assert.isFunction(Map.prototype.entries);
	  assert.name(Map.prototype.entries, 'entries');
	  assert.arity(Map.prototype.entries, 0);
	  assert.looksNative(Map.prototype.entries);
	  assert.nonEnumerable(Map.prototype, 'entries');
	  var map = new Map();
	  map.set('a', 'q');
	  map.set('s', 'w');
	  map.set('d', 'e');
	  var iterator = map.entries();
	  assert.isIterator(iterator);
	  assert.isIterable(iterator);
	  // assert.strictEqual(iterator[Symbol.toStringTag], 'Map Iterator');
	  assert.deepEqual(iterator.next(), {
	    value: ['a', 'q'],
	    done: false
	  });
	  assert.deepEqual(iterator.next(), {
	    value: ['s', 'w'],
	    done: false
	  });
	  assert.deepEqual(iterator.next(), {
	    value: ['d', 'e'],
	    done: false
	  });
	  assert.deepEqual(iterator.next(), {
	    value: undefined,
	    done: true
	  });
	});
	QUnit.test('Map#@@iterator', function (assert) {
	  assert.isIterable(Map.prototype);
	  assert.name(Map.prototype.entries, 'entries');
	  assert.arity(Map.prototype.entries, 0);
	  assert.looksNative(Map.prototype[$inject_Symbol_iterator]);
	  assert.strictEqual(Map.prototype[$inject_Symbol_iterator], Map.prototype.entries);
	  var map = new Map();
	  map.set('a', 'q');
	  map.set('s', 'w');
	  map.set('d', 'e');
	  var iterator = map[$inject_Symbol_iterator]();
	  assert.isIterator(iterator);
	  assert.isIterable(iterator);
	  // assert.strictEqual(iterator[Symbol.toStringTag], 'Map Iterator');
	  // assert.strictEqual(String(iterator), '[object Map Iterator]');
	  assert.deepEqual(iterator.next(), {
	    value: ['a', 'q'],
	    done: false
	  });
	  assert.deepEqual(iterator.next(), {
	    value: ['s', 'w'],
	    done: false
	  });
	  assert.deepEqual(iterator.next(), {
	    value: ['d', 'e'],
	    done: false
	  });
	  assert.deepEqual(iterator.next(), {
	    value: undefined,
	    done: true
	  });
	});

	var Set$1 = window.Set;

	function createSubSet() {
	  function Set() {
	    var args = arguments[0];
	    var set = new Set$1(args);
	    Object.setPrototypeOf(set, Object.getPrototypeOf(this));
	    return set;
	  }
	  Object.setPrototypeOf(Set, Set$1);
	  Set.prototype = Object.create(Set$1.prototype);
	  return Set;
	}
	function fixSet() {
	  var Set = createSubSet();
	  var s = new Set$1();
	  if (typeof s.size === "function") {
	    // firefox 18-
	    Object.defineProperty(Set.prototype, 'size', {
	      get: function () {
	        return Set$1.prototype.size.call(this);
	      },
	      enumerable: true
	    });
	  }
	  // ie11 not support iterator
	  if (Set.prototype.iterator) {
	    // firefox 17~26 iterator return firefox iterator
	    if (!Set.prototype.values) {
	      // firefox 17~23
	      Set.prototype.values = function () {
	        return toES6Iterator(this.iterator());
	      };
	    }
	    if (!Set.prototype.entries) {
	      // firefox 17~23
	      Set.prototype.entries = function () {
	        return toES6Iterator(this.iterator(), getValueX2);
	      };
	    }
	    if (!Set.prototype.forEach) {
	      // firefox 17~24
	      Set.prototype.forEach = function (callbackfn, thisArg) {
	        var it = this.iterator();
	        while (true) {
	          try {
	            var next = it.next();
	          } catch (e) {
	            break;
	          }
	          callbackfn.call(thisArg, next, next, this);
	        }
	      };
	    }
	  }
	  if (!Set.prototype['@@iterator']) {
	    Set.prototype['@@iterator'] = Set.prototype.values;
	  }
	  return Set;
	}
	;
	function getValueX2(item) {
	  return [item, item];
	}

	function createSet() {
	  function Set() {
	    var arr = arguments[0];
	    this.size = 0;
	    this.head = null;
	    this.tail = null;
	    if (arr) {
	      var entries = arr['@@iterator'];
	      if (entries) {
	        var it = entries.call(arr);
	        while (true) {
	          var next = it.next();
	          if (next.done) break;
	          try {
	            this.add(next.value);
	          } catch (e) {
	            if (it.return) {
	              try {
	                it.return();
	              } catch (e) {}
	            }
	            throw e;
	          }
	        }
	      }
	    }
	  }
	  Set.prototype.has = has;
	  Set.prototype.add = add;
	  Set.prototype.delete = remove;
	  Set.prototype.clear = clear;
	  Set.prototype.forEach = forEach;
	  Set.prototype.entries = entries$1;
	  Set.prototype.values = values$1;
	  Set.prototype.keys = values$1;
	  Set.prototype['@@iterator'] = values$1;
	  return Set;
	}
	;
	function add(value) {
	  if (value === 0) {
	    //-0 -> 0
	    value = 0;
	  }
	  set.call(this, value, value);
	  return this;
	}
	;

	if (!_Symbol$6) {
	  if (Set$1 && (Set$1.prototype.iterator || Set$1.prototype['@@iterator'])) {
	    window.Set = fixSet();
	  } else {
	    window.Set = createSet();
	  }
	} else {
	  if (!_Symbol$6.iterator) {
	    _Symbol$6.iterator = _Symbol$6('iterator');
	  }
	  if (!Set$1.prototype[_Symbol$6.iterator]) {
	    Set$1.prototype[_Symbol$6.iterator] = Set$1.prototype.values;
	  }
	}

	var _ref$1 = GLOBAL.Reflect || {},
	  ownKeys$1 = _ref$1.ownKeys;
	QUnit.test('Set', function (assert) {
	  assert.isFunction(Set);
	  assert.name(Set, 'Set');
	  assert.arity(Set, 0);
	  assert.looksNative(Set);
	  assert.ok('add' in Set.prototype, 'add in Set.prototype');
	  assert.ok('clear' in Set.prototype, 'clear in Set.prototype');
	  assert.ok('delete' in Set.prototype, 'delete in Set.prototype');
	  assert.ok('forEach' in Set.prototype, 'forEach in Set.prototype');
	  assert.ok('has' in Set.prototype, 'has in Set.prototype');
	  assert.ok(new Set() instanceof Set, 'new Set instanceof Set');
	  var set = new Set();
	  set.add(1);
	  set.add(2);
	  set.add(3);
	  set.add(2);
	  set.add(1);
	  assert.strictEqual(set.size, 3);
	  var result = [];
	  set.forEach(function (val) {
	    result.push(val);
	  });
	  assert.deepEqual(result, [1, 2, 3]);
	  assert.strictEqual(new Set(createIterable$1([1, 2, 3])).size, 3, 'Init from iterable');
	  assert.strictEqual(new Set([Object.freeze({}), 1]).size, 2, 'Support frozen objects');
	  assert.strictEqual(new Set([NaN, NaN, NaN]).size, 1);
	  assert.deepEqual(Array.from(new Set([3, 4]).add(2).add(1)), [3, 4, 2, 1]);
	  var done = false;
	  var add = Set.prototype.add;
	  // eslint-disable-next-line no-extend-native -- required for testing
	  Set.prototype.add = function () {
	    throw new Error();
	  };
	  try {
	    new Set(createIterable$1([null, 1, 2], {
	      return: function () {
	        return done = true;
	      }
	    }));
	  } catch (_unused) {/* empty */}
	  // eslint-disable-next-line no-extend-native -- required for testing
	  Set.prototype.add = add;
	  assert.ok(done, '.return #throw');
	  var array = [];
	  done = false;
	  array['@@iterator'] = undefined;
	  array[$inject_Symbol_iterator] = function () {
	    done = true;
	    return [][$inject_Symbol_iterator].call(this);
	  };
	  new Set(array);
	  assert.ok(done);
	  var object = {};
	  new Set().add(object);
	  if (DESCRIPTORS) {
	    var results = [];
	    for (var key in object) results.push(key);
	    assert.arrayEqual(results, []);
	    assert.arrayEqual(Object.keys(object), []);
	  }
	  assert.arrayEqual(Object.getOwnPropertyNames(object), []);
	  if (Object.getOwnPropertySymbols) assert.arrayEqual(Object.getOwnPropertySymbols(object), []);
	  if (ownKeys$1) assert.arrayEqual(ownKeys$1(object), []);
	  if (nativeSubclass) {
	    var Subclass = nativeSubclass(Set);
	    assert.ok(new Subclass() instanceof Subclass, 'correct subclassing with native classes #1');
	    assert.ok(new Subclass() instanceof Set, 'correct subclassing with native classes #2');
	    assert.ok(new Subclass().add(2).has(2), 'correct subclassing with native classes #3');
	  }
	});
	QUnit.test('Set#add', function (assert) {
	  assert.isFunction(Set.prototype.add);
	  assert.name(Set.prototype.add, 'add');
	  assert.arity(Set.prototype.add, 1);
	  assert.looksNative(Set.prototype.add);
	  assert.nonEnumerable(Set.prototype, 'add');
	  var array = [];
	  var set = new Set();
	  set.add(NaN);
	  set.add(2);
	  set.add(3);
	  set.add(2);
	  set.add(1);
	  set.add(array);
	  assert.strictEqual(set.size, 5);
	  var chain = set.add(NaN);
	  assert.strictEqual(chain, set);
	  assert.strictEqual(set.size, 5);
	  set.add(2);
	  assert.strictEqual(set.size, 5);
	  set.add(array);
	  assert.strictEqual(set.size, 5);
	  set.add([]);
	  assert.strictEqual(set.size, 6);
	  set.add(4);
	  assert.strictEqual(set.size, 7);
	  var frozen = Object.freeze({});
	  set = new Set();
	  set.add(frozen);
	  assert.ok(set.has(frozen));
	});
	QUnit.test('Set#clear', function (assert) {
	  assert.isFunction(Set.prototype.clear);
	  assert.name(Set.prototype.clear, 'clear');
	  assert.arity(Set.prototype.clear, 0);
	  assert.looksNative(Set.prototype.clear);
	  assert.nonEnumerable(Set.prototype, 'clear');
	  var set = new Set();
	  set.clear();
	  assert.strictEqual(set.size, 0);
	  set = new Set();
	  set.add(1);
	  set.add(2);
	  set.add(3);
	  set.add(2);
	  set.add(1);
	  set.clear();
	  assert.strictEqual(set.size, 0);
	  assert.ok(!set.has(1));
	  assert.ok(!set.has(2));
	  assert.ok(!set.has(3));
	  var frozen = Object.freeze({});
	  set = new Set();
	  set.add(1);
	  set.add(frozen);
	  set.clear();
	  assert.strictEqual(set.size, 0, 'Support frozen objects');
	  assert.ok(!set.has(1));
	  assert.ok(!set.has(frozen));
	});
	QUnit.test('Set#delete', function (assert) {
	  assert.isFunction(Set.prototype.delete);
	  if (NATIVE) assert.name(Set.prototype.delete, 'delete');
	  assert.arity(Set.prototype.delete, 1);
	  assert.looksNative(Set.prototype.delete);
	  assert.nonEnumerable(Set.prototype, 'delete');
	  var array = [];
	  var set = new Set();
	  set.add(NaN);
	  set.add(2);
	  set.add(3);
	  set.add(2);
	  set.add(1);
	  set.add(array);
	  assert.strictEqual(set.size, 5);
	  assert.strictEqual(set.delete(NaN), true);
	  assert.strictEqual(set.size, 4);
	  assert.strictEqual(set.delete(4), false);
	  assert.strictEqual(set.size, 4);
	  set.delete([]);
	  assert.strictEqual(set.size, 4);
	  set.delete(array);
	  assert.strictEqual(set.size, 3);
	  var frozen = Object.freeze({});
	  set.add(frozen);
	  assert.strictEqual(set.size, 4);
	  set.delete(frozen);
	  assert.strictEqual(set.size, 3);
	});
	QUnit.test('Set#forEach', function (assert) {
	  assert.isFunction(Set.prototype.forEach);
	  assert.name(Set.prototype.forEach, 'forEach');
	  assert.arity(Set.prototype.forEach, 1);
	  assert.looksNative(Set.prototype.forEach);
	  assert.nonEnumerable(Set.prototype, 'forEach');
	  var result = [];
	  var count = 0;
	  var set = new Set();
	  set.add(1);
	  set.add(2);
	  set.add(3);
	  set.add(2);
	  set.add(1);
	  set.forEach(function (value) {
	    count++;
	    result.push(value);
	  });
	  assert.strictEqual(count, 3);
	  assert.deepEqual(result, [1, 2, 3]);
	  set = new Set();
	  set.add('0');
	  set.add('1');
	  set.add('2');
	  set.add('3');
	  result = '';
	  set.forEach(function (it) {
	    result += it;
	    if (it === '2') {
	      set.delete('2');
	      set.delete('3');
	      set.delete('1');
	      set.add('4');
	    }
	  });
	  assert.strictEqual(result, '0124');
	  set = new Set();
	  set.add('0');
	  result = '';
	  set.forEach(function (it) {
	    set.delete('0');
	    if (result !== '') throw new Error();
	    result += it;
	  });
	  assert.strictEqual(result, '0');
	  // assert.throws(() => {
	  //   Set.prototype.forEach.call(new Map(), () => { /* empty */ });
	  // }, 'non-generic');
	});

	QUnit.test('Set#has', function (assert) {
	  assert.isFunction(Set.prototype.has);
	  assert.name(Set.prototype.has, 'has');
	  assert.arity(Set.prototype.has, 1);
	  assert.looksNative(Set.prototype.has);
	  assert.nonEnumerable(Set.prototype, 'has');
	  var array = [];
	  var frozen = Object.freeze({});
	  var set = new Set();
	  set.add(NaN);
	  set.add(2);
	  set.add(3);
	  set.add(2);
	  set.add(1);
	  set.add(frozen);
	  set.add(array);
	  assert.ok(set.has(NaN));
	  assert.ok(set.has(array));
	  assert.ok(set.has(frozen));
	  assert.ok(set.has(2));
	  assert.ok(!set.has(4));
	  assert.ok(!set.has([]));
	});
	QUnit.test('Set#size', function (assert) {
	  assert.nonEnumerable(Set.prototype, 'size');
	  var set = new Set();
	  set.add(1);
	  var size = set.size;
	  assert.strictEqual(_typeof(size), 'number', 'size is number');
	  assert.strictEqual(size, 1, 'size is correct');
	  // if(DESCRIPTORS) {
	  //   const sizeDescriptor = Object.getOwnPropertyDescriptor(Set.prototype, 'size');
	  //   assert.ok(sizeDescriptor && sizeDescriptor.get, 'size is getter');
	  //   assert.ok(sizeDescriptor && !sizeDescriptor.set, 'size isnt setter');
	  //   assert.throws(() => Set.prototype.size, TypeError);
	  // }
	});

	QUnit.test('Set & -0', function (assert) {
	  var set = new Set();
	  set.add(-0);
	  assert.strictEqual(set.size, 1);
	  assert.ok(set.has(0));
	  assert.ok(set.has(-0));
	  set.forEach(function (it) {
	    assert.ok(!is$1(it, -0));
	  });
	  set.delete(-0);
	  assert.strictEqual(set.size, 0);
	  set = new Set([-0]);
	  set.forEach(function (key) {
	    assert.ok(!is$1(key, -0));
	  });
	  set = new Set();
	  set.add(4);
	  set.add(3);
	  set.add(2);
	  set.add(1);
	  set.add(0);
	  assert.ok(set.has(-0));
	});

	// QUnit.test('Set#@@toStringTag', assert => {
	//   assert.strictEqual(Set.prototype[Symbol.toStringTag], 'Set', 'Set::@@toStringTag is `Set`');
	//   assert.strictEqual(String(new Set()), '[object Set]', 'correct stringification');
	// });

	QUnit.test('Set Iterator', function (assert) {
	  var set = new Set();
	  set.add('a');
	  set.add('b');
	  set.add('c');
	  set.add('d');
	  var results = [];
	  var iterator = set.keys();
	  results.push(iterator.next().value);
	  assert.ok(set.delete('a'));
	  assert.ok(set.delete('b'));
	  assert.ok(set.delete('c'));
	  set.add('e');
	  results.push(iterator.next().value, iterator.next().value);
	  assert.ok(iterator.next().done);
	  set.add('f');
	  assert.ok(iterator.next().done);
	  assert.deepEqual(results, ['a', 'd', 'e']);
	});
	QUnit.test('Set#keys', function (assert) {
	  assert.isFunction(Set.prototype.keys);
	  assert.name(Set.prototype.keys, 'values');
	  assert.arity(Set.prototype.keys, 0);
	  assert.looksNative(Set.prototype.keys);
	  assert.strictEqual(Set.prototype.keys, Set.prototype.values);
	  assert.nonEnumerable(Set.prototype, 'keys');
	  var set = new Set();
	  set.add('q');
	  set.add('w');
	  set.add('e');
	  var iterator = set.keys();
	  assert.isIterator(iterator);
	  assert.isIterable(iterator);
	  // assert.strictEqual(iterator[Symbol.toStringTag], 'Set Iterator');
	  assert.deepEqual(iterator.next(), {
	    value: 'q',
	    done: false
	  });
	  assert.deepEqual(iterator.next(), {
	    value: 'w',
	    done: false
	  });
	  assert.deepEqual(iterator.next(), {
	    value: 'e',
	    done: false
	  });
	  assert.deepEqual(iterator.next(), {
	    value: undefined,
	    done: true
	  });
	});
	QUnit.test('Set#values', function (assert) {
	  assert.isFunction(Set.prototype.values);
	  assert.name(Set.prototype.values, 'values');
	  assert.arity(Set.prototype.values, 0);
	  assert.looksNative(Set.prototype.values);
	  assert.nonEnumerable(Set.prototype, 'values');
	  var set = new Set();
	  set.add('q');
	  set.add('w');
	  set.add('e');
	  var iterator = set.values();
	  assert.isIterator(iterator);
	  assert.isIterable(iterator);
	  // assert.strictEqual(iterator[Symbol.toStringTag], 'Set Iterator');
	  assert.deepEqual(iterator.next(), {
	    value: 'q',
	    done: false
	  });
	  assert.deepEqual(iterator.next(), {
	    value: 'w',
	    done: false
	  });
	  assert.deepEqual(iterator.next(), {
	    value: 'e',
	    done: false
	  });
	  assert.deepEqual(iterator.next(), {
	    value: undefined,
	    done: true
	  });
	});
	QUnit.test('Set#entries', function (assert) {
	  assert.isFunction(Set.prototype.entries);
	  assert.name(Set.prototype.entries, 'entries');
	  assert.arity(Set.prototype.entries, 0);
	  assert.looksNative(Set.prototype.entries);
	  assert.nonEnumerable(Set.prototype, 'entries');
	  var set = new Set();
	  set.add('q');
	  set.add('w');
	  set.add('e');
	  var iterator = set.entries();
	  assert.isIterator(iterator);
	  assert.isIterable(iterator);
	  // assert.strictEqual(iterator[Symbol.toStringTag], 'Set Iterator');
	  assert.deepEqual(iterator.next(), {
	    value: ['q', 'q'],
	    done: false
	  });
	  assert.deepEqual(iterator.next(), {
	    value: ['w', 'w'],
	    done: false
	  });
	  assert.deepEqual(iterator.next(), {
	    value: ['e', 'e'],
	    done: false
	  });
	  assert.deepEqual(iterator.next(), {
	    value: undefined,
	    done: true
	  });
	});
	QUnit.test('Set#@@iterator', function (assert) {
	  assert.isIterable(Set.prototype);
	  assert.name(Set.prototype[$inject_Symbol_iterator], 'values');
	  assert.arity(Set.prototype[$inject_Symbol_iterator], 0);
	  assert.looksNative(Set.prototype[$inject_Symbol_iterator]);
	  assert.strictEqual(Set.prototype[$inject_Symbol_iterator], Set.prototype.values);
	  assert.nonEnumerable(Set.prototype, 'values');
	  var set = new Set();
	  set.add('q');
	  set.add('w');
	  set.add('e');
	  var iterator = set[$inject_Symbol_iterator]();
	  assert.isIterator(iterator);
	  assert.isIterable(iterator);
	  // assert.strictEqual(iterator[Symbol.toStringTag], 'Set Iterator');
	  // assert.strictEqual(String(iterator), '[object Set Iterator]');
	  assert.deepEqual(iterator.next(), {
	    value: 'q',
	    done: false
	  });
	  assert.deepEqual(iterator.next(), {
	    value: 'w',
	    done: false
	  });
	  assert.deepEqual(iterator.next(), {
	    value: 'e',
	    done: false
	  });
	  assert.deepEqual(iterator.next(), {
	    value: undefined,
	    done: true
	  });
	});

	QUnit.test('String#@@iterator', function (assert) {
	  assert.isIterable(String.prototype);
	  var iterator = 'qwe'[$inject_Symbol_iterator]();
	  assert.isIterator(iterator);
	  assert.isIterable(iterator);
	  assert.deepEqual(iterator.next(), {
	    value: 'q',
	    done: false
	  });
	  assert.deepEqual(iterator.next(), {
	    value: 'w',
	    done: false
	  });
	  assert.deepEqual(iterator.next(), {
	    value: 'e',
	    done: false
	  });
	  assert.deepEqual(iterator.next(), {
	    value: undefined,
	    done: true
	  });
	  assert.strictEqual(Array.from('𠮷𠮷𠮷').length, 3);
	  iterator = '𠮷𠮷𠮷'[$inject_Symbol_iterator]();
	  assert.deepEqual(iterator.next(), {
	    value: '𠮷',
	    done: false
	  });
	  assert.deepEqual(iterator.next(), {
	    value: '𠮷',
	    done: false
	  });
	  assert.deepEqual(iterator.next(), {
	    value: '𠮷',
	    done: false
	  });
	  assert.deepEqual(iterator.next(), {
	    value: undefined,
	    done: true
	  });
	});

	var _Symbol$2 = _Symbol$6;
	if (!_Symbol$6) {
	  _Symbol$2 = window.Symbol = _Symbol$7;
	  _Symbol$2.sham = true;
	  _Symbol$2.iterator = "@@iterator";
	  _Symbol$2.hasInstance = "@@hasInstance";
	  _Symbol$2.asyncIterator = "@@asyncIterator";
	} else {
	  if (String(_Symbol$2()) !== String(_Symbol$2(""))) {
	    Object.setPrototypeOf(_Symbol$5, _Symbol$2);
	    _Symbol$2 = window.Symbol = _Symbol$5;
	  }
	  if (!_Symbol$2.iterator) {
	    _Symbol$2.iterator = _Symbol$2("iterator");
	  }
	  if (!_Symbol$2.hasInstance) {
	    _Symbol$2.hasInstance = _Symbol$2("hasInstance");
	  }
	  if (!_Symbol$2.asyncIterator) {
	    _Symbol$2.asyncIterator = _Symbol$2("asyncIterator");
	  }
	}

	QUnit.test('Array#keys', function (assert) {
	  var keys = Array.prototype.keys;
	  assert.isFunction(keys);
	  assert.arity(keys, 0);
	  assert.name(keys, 'keys');
	  var iterator = ['q', 'w', 'e'].keys();
	  assert.isIterator(iterator);
	  assert.isIterable(iterator);
	  assert.deepEqual(iterator.next(), {
	    value: 0,
	    done: false
	  });
	  assert.deepEqual(iterator.next(), {
	    value: 1,
	    done: false
	  });
	  assert.deepEqual(iterator.next(), {
	    value: 2,
	    done: false
	  });
	  assert.deepEqual(iterator.next(), {
	    value: undefined,
	    done: true
	  });
	  assert.deepEqual(keys.call({
	    length: -1
	  }).next(), {
	    value: undefined,
	    done: true
	  }, 'uses ToLength');
	});
	QUnit.test('Array#values', function (assert) {
	  var values = Array.prototype.values;
	  assert.isFunction(values);
	  assert.arity(values, 0);
	  assert.name(values, 'values');
	  var iterator = ['q', 'w', 'e'].values();
	  assert.isIterator(iterator);
	  assert.isIterable(iterator);
	  assert.deepEqual(iterator.next(), {
	    value: 'q',
	    done: false
	  });
	  assert.deepEqual(iterator.next(), {
	    value: 'w',
	    done: false
	  });
	  assert.deepEqual(iterator.next(), {
	    value: 'e',
	    done: false
	  });
	  assert.deepEqual(iterator.next(), {
	    value: undefined,
	    done: true
	  });
	  assert.deepEqual(values.call({
	    length: -1
	  }).next(), {
	    value: undefined,
	    done: true
	  }, 'uses ToLength');
	});
	QUnit.test('Array#entries', function (assert) {
	  var entries = Array.prototype.entries;
	  assert.isFunction(entries);
	  assert.arity(entries, 0);
	  assert.name(entries, 'entries');
	  var iterator = ['q', 'w', 'e'].entries();
	  assert.isIterator(iterator);
	  assert.isIterable(iterator);
	  assert.deepEqual(iterator.next(), {
	    value: [0, 'q'],
	    done: false
	  });
	  assert.deepEqual(iterator.next(), {
	    value: [1, 'w'],
	    done: false
	  });
	  assert.deepEqual(iterator.next(), {
	    value: [2, 'e'],
	    done: false
	  });
	  assert.deepEqual(iterator.next(), {
	    value: undefined,
	    done: true
	  });
	  assert.deepEqual(entries.call({
	    length: -1
	  }).next(), {
	    value: undefined,
	    done: true
	  }, 'uses ToLength');
	});
	QUnit.test('Array#@@iterator', function (assert) {
	  assert.isIterable(Array.prototype);
	  assert.arity(Array.prototype[$inject_Symbol_iterator], 0);
	  assert.name(Array.prototype[$inject_Symbol_iterator], 'values');
	  assert.strictEqual(Array.prototype[$inject_Symbol_iterator], Array.prototype.values);
	  var iterator = ['q', 'w', 'e'][$inject_Symbol_iterator]();
	  assert.isIterator(iterator);
	  assert.isIterable(iterator);
	  assert.deepEqual(iterator.next(), {
	    value: 'q',
	    done: false
	  });
	  assert.deepEqual(iterator.next(), {
	    value: 'w',
	    done: false
	  });
	  assert.deepEqual(iterator.next(), {
	    value: 'e',
	    done: false
	  });
	  assert.deepEqual(iterator.next(), {
	    value: undefined,
	    done: true
	  });
	  assert.deepEqual(Array.prototype[$inject_Symbol_iterator].call({
	    length: -1
	  }).next(), {
	    value: undefined,
	    done: true
	  }, 'uses ToLength');
	});

	var $inject_Symbol_hasInstance = (function () {
	  if (!_Symbol$6) {
	    if (nonEnumerable) {
	      defineProperty$1(Object.prototype, '@@hasInstance', {
	        enumerable: false,
	        configurable: false,
	        writable: true
	      });
	    }
	    return '@@hasInstance';
	  } else {
	    return _Symbol$6.hasInstance || _Symbol$6('hasInstance');
	  }
	})();

	var $inject_Symbol_asyncIterator = (function () {
	  if (!_Symbol$6) {
	    if (nonEnumerable) {
	      defineProperty$1(Object.prototype, '@@asyncIterator', {
	        enumerable: false,
	        configurable: false,
	        writable: true
	      });
	    }
	    return '@@asyncIterator';
	  } else {
	    return _Symbol$6.asyncIterator || _Symbol$6('asyncIterator');
	  }
	})();

	//import { Symbol } from "./Symbol";
	var symbol_cache$1 = {};
	var key_cache = {};
	function modern_for (desc) {
	  if (Object.prototype.hasOwnProperty.call(symbol_cache$1, desc)) {
	    return symbol_cache$1[desc];
	  }
	  var s = _Symbol$4(desc);
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
	  var s = _Symbol$4(desc);
	  s.__key__ = desc;
	  symbol_cache[desc] = s;
	  return s;
	}
	;

	var $inject_Symbol_for = _Symbol$6 ? _Symbol$6.for || modern_for : compat_for;

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

	var $inject_Symbol_keyFor = _Symbol$6 ? _Symbol$6.keyFor || keyFor$1 : keyFor;

	var _ref = GLOBAL.Reflect || {},
	  ownKeys = _ref.ownKeys;
	QUnit.test('Symbol', function (assert) {
	  assert.isFunction(_Symbol$4);
	  if (NATIVE) assert.strictEqual(_Symbol$4.length, 0, 'arity is 0');
	  // assert.name(Symbol, 'Symbol');
	  var symbol1 = _Symbol$4('symbol');
	  var symbol2 = _Symbol$4('symbol');
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
	  // assert.name(Object.getOwnPropertySymbols, 'getOwnPropertySymbols');
	  var prototype = {
	    q: 1,
	    w: 2,
	    e: 3
	  };
	  prototype[_Symbol$4()] = 42;
	  prototype[_Symbol$4()] = 43;
	  assert.deepEqual(Object.getOwnPropertyNames(prototype).sort(), ['e', 'q', 'w']);
	  assert.strictEqual(Object.getOwnPropertySymbols(prototype).length, 2);
	  var object = Object.create(prototype);
	  object.a = 1;
	  object.s = 2;
	  object.d = 3;
	  object[_Symbol$4()] = 44;
	  assert.deepEqual(Object.getOwnPropertyNames(object).sort(), ['a', 'd', 's']);
	  assert.strictEqual(Object.getOwnPropertySymbols(object).length, 1);
	  // assert.strictEqual(Object.getOwnPropertySymbols(Object.prototype).length, 0);
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
	    assert.strictEqual(JSON.stringify([1, _Symbol$4('foo'), false, _Symbol$4('bar'), {}]), '[1,null,false,null,{}]', 'array value');
	    assert.strictEqual(JSON.stringify({
	      symbol: _Symbol$4('symbol')
	    }), '{}', 'object value');
	    if (DESCRIPTORS) {
	      var object = {
	        bar: 2
	      };
	      object[_Symbol$4('symbol')] = 1;
	      assert.strictEqual(JSON.stringify(object), '{"bar":2}', 'object key');
	    }
	    // assert.strictEqual(JSON.stringify(Symbol('symbol')), undefined, 'symbol value');
	    if (_typeof(_Symbol$4()) === 'symbol') {
	      assert.strictEqual(JSON.stringify(Object(_Symbol$4('symbol'))), '{}', 'boxed symbol');
	    }
	    // assert.strictEqual(JSON.stringify(undefined, () => 42), '42', 'replacer works with top-level undefined');
	  });
	}

	if (DESCRIPTORS) {
	  QUnit.test('Symbols & descriptors', function (assert) {
	    var d = _Symbol$4('d');
	    var e = _Symbol$4('e');
	    var f = _Symbol$4('f');
	    var i = _Symbol$4('i');
	    var j = _Symbol$4('j');
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
	    var object = Object.create(prototype);
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
	    // assert.deepEqual(Object.getOwnPropertyDescriptor(object, d), {
	    // 	configurable: true,
	    // 	writable: true,
	    // 	enumerable: true,
	    // 	value: 'd',
	    // }, 'getOwnPropertyDescriptor d');
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
	    // assert.strictEqual(Object.getOwnPropertyDescriptor(Object.prototype, d), undefined, 'getOwnPropertyDescriptor on Object.prototype missed symbol');
	    assert.strictEqual(Object.keys(object).length, 2, 'Object.keys');
	    assert.strictEqual(Object.getOwnPropertyNames(object).length, 3, 'Object.getOwnPropertyNames');
	    assert.strictEqual(Object.getOwnPropertySymbols(object).length, 3, 'Object.getOwnPropertySymbols');
	    // assert.strictEqual(ownKeys(object).length, 6, 'Reflect.ownKeys');
	    delete object[e];
	    object[e] = 'e';
	    // assert.deepEqual(Object.getOwnPropertyDescriptor(object, e), {
	    // 	configurable: true,
	    // 	writable: true,
	    // 	enumerable: true,
	    // 	value: 'e',
	    // }, 'redefined non-enum key');
	  });

	  QUnit.test('Symbols & Object.defineProperties', function (assert) {
	    var c = _Symbol$4('c');
	    var d = _Symbol$4('d');
	    var descriptors = {
	      a: {
	        configurable: true,
	        writable: true,
	        enumerable: true,
	        value: 'a'
	      }
	    };
	    descriptors[c] = {
	      configurable: true,
	      writable: true,
	      enumerable: false,
	      value: 'c'
	    };
	    Object.defineProperty(descriptors, 'b', {
	      configurable: true,
	      writable: true,
	      enumerable: true,
	      value: {
	        configurable: true,
	        writable: true,
	        enumerable: true,
	        value: 'b'
	      }
	    });
	    Object.defineProperty(descriptors, d, {
	      configurable: true,
	      writable: true,
	      enumerable: false,
	      value: {
	        configurable: true,
	        writable: true,
	        enumerable: false,
	        value: 'd'
	      }
	    });
	    var object = Object.defineProperties({}, descriptors);
	    assert.strictEqual(object.a, 'a', 'a');
	    // assert.strictEqual(object.b, undefined, 'b');
	    // assert.strictEqual(object[c], 'c', 'c');
	    assert.strictEqual(object[d], undefined, 'd');
	  });
	  QUnit.test('Symbols & Object.create', function (assert) {
	    var c = _Symbol$4('c');
	    var d = _Symbol$4('d');
	    var descriptors = {
	      a: {
	        configurable: true,
	        writable: true,
	        enumerable: true,
	        value: 'a'
	      }
	    };
	    descriptors[c] = {
	      configurable: true,
	      writable: true,
	      enumerable: false,
	      value: 'c'
	    };
	    Object.defineProperty(descriptors, 'b', {
	      configurable: true,
	      writable: true,
	      enumerable: true,
	      value: {
	        configurable: true,
	        writable: true,
	        enumerable: true,
	        value: 'b'
	      }
	    });
	    Object.defineProperty(descriptors, d, {
	      configurable: true,
	      writable: true,
	      enumerable: false,
	      value: {
	        configurable: true,
	        writable: true,
	        enumerable: false,
	        value: 'd'
	      }
	    });
	    var object = Object.create(null, descriptors);
	    assert.strictEqual(object.a, 'a', 'a');
	    // assert.strictEqual(object.b, undefined, 'b');
	    // assert.strictEqual(object[c], 'c', 'c');
	    assert.strictEqual(object[d], undefined, 'd');
	  });

	  // const constructors = ['Map', 'Set', 'Promise'];
	  // for(const name of constructors) {
	  // 	QUnit.test(`${name}@@species`, assert => {
	  // 		assert.strictEqual(GLOBAL[name][Symbol.species], GLOBAL[name], `${name}@@species === ${name}`);
	  // 		const Subclass = create(GLOBAL[name]);
	  // 		assert.strictEqual(Subclass[Symbol.species], Subclass, `${name} subclass`);
	  // 	});
	  // }

	  // QUnit.test('Array@@species', assert => {
	  // 	assert.strictEqual(Array[Symbol.species], Array, 'Array@@species === Array');
	  // 	const Subclass = create(Array);
	  // 	assert.strictEqual(Subclass[Symbol.species], Subclass, 'Array subclass');
	  // });

	  QUnit.test('Symbol.sham flag', function (assert) {
	    assert.same(_Symbol$4.sham, _typeof(_Symbol$4()) === 'symbol' ? undefined : true);
	  });
	}

	var Math$1 = window.Math;

	// from MDN
	function imul(opA, opB) {
	  opB |= 0; // ensure that opB is an integer. opA will automatically be coerced.
	  // floating points give us 53 bits of precision to work with plus 1 sign bit
	  // automatically handled for our convienence:
	  // 1. 0x003fffff /*opA & 0x000fffff*/ * 0x7fffffff /*opB*/ = 0x1fffff7fc00001
	  //    0x1fffff7fc00001 < Number.MAX_SAFE_INTEGER /*0x1fffffffffffff*/
	  var result = (opA & 0x003fffff) * opB;
	  // 2. We can remove an integer coersion from the statement above because:
	  //    0x1fffff7fc00001 + 0xffc00000 = 0x1fffffff800001
	  //    0x1fffffff800001 < Number.MAX_SAFE_INTEGER /*0x1fffffffffffff*/
	  if (opA & 0xffc00000 /*!== 0*/) result += (opA & 0xffc00000) * opB | 0;
	  return result | 0;
	}

	if (!Math$1.imul) {
	  Math$1.imul = imul;
	}

	QUnit.test('Math.imul', function (assert) {
	  assert.isFunction(Math.imul);
	  assert.name(Math.imul, 'imul');
	  assert.arity(Math.imul, 2);
	  assert.looksNative(Math.imul);
	  assert.nonEnumerable(Math, 'imul');
	  assert.same(Math.imul(0, 0), 0);
	  assert.strictEqual(Math.imul(123, 456), 56088);
	  assert.strictEqual(Math.imul(-123, 456), -56088);
	  assert.strictEqual(Math.imul(123, -456), -56088);
	  assert.strictEqual(Math.imul(19088743, 4275878552), 602016552);
	  assert.same(Math.imul(false, 7), 0);
	  assert.same(Math.imul(7, false), 0);
	  assert.same(Math.imul(false, false), 0);
	  assert.strictEqual(Math.imul(true, 7), 7);
	  assert.strictEqual(Math.imul(7, true), 7);
	  assert.strictEqual(Math.imul(true, true), 1);
	  assert.same(Math.imul(undefined, 7), 0);
	  assert.same(Math.imul(7, undefined), 0);
	  assert.same(Math.imul(undefined, undefined), 0);
	  assert.same(Math.imul('str', 7), 0);
	  assert.same(Math.imul(7, 'str'), 0);
	  assert.same(Math.imul({}, 7), 0);
	  assert.same(Math.imul(7, {}), 0);
	  assert.same(Math.imul([], 7), 0);
	  assert.same(Math.imul(7, []), 0);
	  assert.strictEqual(Math.imul(0xFFFFFFFF, 5), -5);
	  assert.strictEqual(Math.imul(0xFFFFFFFE, 5), -10);
	  assert.strictEqual(Math.imul(2, 4), 8);
	  assert.strictEqual(Math.imul(-1, 8), -8);
	  assert.strictEqual(Math.imul(-2, -2), 4);
	  assert.same(Math.imul(-0, 7), 0);
	  assert.same(Math.imul(7, -0), 0);
	  assert.same(Math.imul(0.1, 7), 0);
	  assert.same(Math.imul(7, 0.1), 0);
	  assert.same(Math.imul(0.9, 7), 0);
	  assert.same(Math.imul(7, 0.9), 0);
	  assert.strictEqual(Math.imul(1.1, 7), 7);
	  assert.strictEqual(Math.imul(7, 1.1), 7);
	  assert.strictEqual(Math.imul(1.9, 7), 7);
	  assert.strictEqual(Math.imul(7, 1.9), 7);
	});

	var log = Math.log;

	var sqrt = Math.sqrt;

	var LN2 = Math.LN2;

	// from core-js https://github.com/zloirock/core-js
	function log1p$1(x) {
	  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
	}
	;

	if (!Math$1.log1p) {
	  Math$1.log1p = log1p$1;
	}

	var log1p = Math.log1p || log1p$1;

	// from core-js https://github.com/zloirock/core-js
	function acosh(x) {
	  return (x = +x) < 1 ? NaN : x > 94906265.62425156 ? log(x) + LN2 : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
	}

	if (!Math$1.acosh) {
	  Math$1.acosh = acosh;
	}

	QUnit.test('Math.acosh', function (assert) {
	  assert.isFunction(Math.acosh);
	  assert.name(Math.acosh, 'acosh');
	  assert.arity(Math.acosh, 1);
	  assert.looksNative(Math.acosh);
	  assert.nonEnumerable(Math, 'acosh');
	  assert.same(Math.acosh(NaN), NaN);
	  assert.same(Math.acosh(0.5), NaN);
	  assert.same(Math.acosh(-1), NaN);
	  assert.same(Math.acosh(-1e300), NaN);
	  assert.same(Math.acosh(1), 0);
	  assert.strictEqual(Math.acosh(Infinity), Infinity);
	  assert.epsilon(Math.acosh(1234), 7.811163220849231);
	  assert.epsilon(Math.acosh(8.88), 2.8737631531629235);
	  assert.epsilon(Math.acosh(1e+160), 369.10676205960726);
	  assert.epsilon(Math.acosh(Number.MAX_VALUE), 710.475860073944);
	  assert.epsilon(Math.acosh(1 + Number.EPSILON), 2.1073424255447017e-8);
	});

	// from core-js https://github.com/zloirock/core-js
	function asinh(x) {
	  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : log(x + sqrt(x * x + 1));
	}

	if (!Math$1.asinh) {
	  Math$1.asinh = asinh;
	}

	QUnit.test('Math.asinh', function (assert) {
	  assert.isFunction(Math.asinh);
	  assert.name(Math.asinh, 'asinh');
	  assert.arity(Math.asinh, 1);
	  assert.looksNative(Math.asinh);
	  assert.nonEnumerable(Math, 'asinh');
	  assert.same(Math.asinh(NaN), NaN);
	  assert.same(Math.asinh(0), 0);
	  assert.same(Math.asinh(-0), -0);
	  assert.strictEqual(Math.asinh(Infinity), Infinity);
	  assert.strictEqual(Math.asinh(-Infinity), -Infinity);
	  assert.epsilon(Math.asinh(1234), 7.811163549201245);
	  assert.epsilon(Math.asinh(9.99), 2.997227420191335);
	  assert.epsilon(Math.asinh(1e150), 346.0809111296668);
	  assert.epsilon(Math.asinh(1e7), 16.811242831518268);
	  assert.epsilon(Math.asinh(-1e7), -16.811242831518268);
	});

	// from core-js https://github.com/zloirock/core-js
	function atanh(x) {
	  return (x = +x) == 0 ? x : log((1 + x) / (1 - x)) / 2;
	}

	if (!Math$1.atanh) {
	  Math$1.atanh = atanh;
	}

	QUnit.test('Math.atanh', function (assert) {
	  assert.isFunction(Math.atanh);
	  assert.name(Math.atanh, 'atanh');
	  assert.arity(Math.atanh, 1);
	  assert.looksNative(Math.atanh);
	  assert.nonEnumerable(Math, 'atanh');
	  assert.same(Math.atanh(NaN), NaN);
	  assert.same(Math.atanh(-2), NaN);
	  assert.same(Math.atanh(-1.5), NaN);
	  assert.same(Math.atanh(2), NaN);
	  assert.same(Math.atanh(1.5), NaN);
	  assert.strictEqual(Math.atanh(-1), -Infinity);
	  assert.strictEqual(Math.atanh(1), Infinity);
	  assert.same(Math.atanh(0), 0);
	  assert.same(Math.atanh(-0), -0);
	  assert.same(Math.atanh(-1e300), NaN);
	  assert.same(Math.atanh(1e300), NaN);
	  assert.epsilon(Math.atanh(0.5), 0.5493061443340549);
	  assert.epsilon(Math.atanh(-0.5), -0.5493061443340549);
	  assert.epsilon(Math.atanh(0.444), 0.47720201260109457);
	});

	var abs = Math.abs;

	var pow = Math.pow;

	// from core-js https://github.com/zloirock/core-js
	function sign$1(x) {
	  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
	}

	if (!Math$1.sign) {
	  Math$1.sign = sign$1;
	}

	var sign = Math.sign || sign$1;

	// from core-js https://github.com/zloirock/core-js
	function cbrt(x) {
	  return sign(x = +x) * pow(abs(x), 1 / 3);
	}

	if (!Math$1.cbrt) {
	  Math$1.cbrt = cbrt;
	}

	QUnit.test('Math.cbrt', function (assert) {
	  assert.isFunction(Math.cbrt);
	  assert.name(Math.cbrt, 'cbrt');
	  assert.arity(Math.cbrt, 1);
	  assert.looksNative(Math.cbrt);
	  assert.nonEnumerable(Math, 'cbrt');
	  assert.same(Math.cbrt(NaN), NaN);
	  assert.same(Math.cbrt(0), 0);
	  assert.same(Math.cbrt(-0), -0);
	  assert.strictEqual(Math.cbrt(Infinity), Infinity);
	  assert.strictEqual(Math.cbrt(-Infinity), -Infinity);
	  assert.strictEqual(Math.cbrt(-8), -2);
	  assert.strictEqual(Math.cbrt(8), 2);
	  assert.epsilon(Math.cbrt(-1000), -10);
	  assert.epsilon(Math.cbrt(1000), 10);
	});

	var E = Math.E;

	var exp = Math.exp;

	// from core-js https://github.com/zloirock/core-js
	function expm1$1(x) {
	  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : exp(x) - 1;
	}

	if (!Math$1.expm1) {
	  Math$1.expm1 = expm1$1;
	}

	var expm1 = Math.expm1 || expm1$1;

	// from core-js https://github.com/zloirock/core-js
	function cosh(x) {
	  var t = expm1(abs(x) - 1) + 1;
	  return (t + 1 / (t * E * E)) * (E / 2);
	}

	if (!Math$1.cosh) {
	  Math$1.cosh = cosh;
	}

	QUnit.test('Math.cosh', function (assert) {
	  assert.isFunction(Math.cosh);
	  assert.name(Math.cosh, 'cosh');
	  assert.arity(Math.cosh, 1);
	  assert.looksNative(Math.cosh);
	  assert.nonEnumerable(Math, 'cosh');
	  assert.same(Math.cosh(NaN), NaN);
	  assert.strictEqual(Math.cosh(0), 1);
	  assert.strictEqual(Math.cosh(-0), 1);
	  assert.strictEqual(Math.cosh(Infinity), Infinity);
	  assert.strictEqual(Math.cosh(-Infinity), Infinity);
	  assert.epsilon(Math.cosh(12), 81377.395712574, 1e-9);
	  assert.epsilon(Math.cosh(22), 1792456423.065795780980053377, 1e-5);
	  assert.epsilon(Math.cosh(-10), 11013.23292010332313972137);
	  assert.epsilon(Math.cosh(-23), 4872401723.1244513000, 1e-5);
	  assert.epsilon(Math.cosh(710), 1.1169973830808557e+308, 1e+295);
	});

	QUnit.test('Math.expm1', function (assert) {
	  assert.isFunction(Math.expm1);
	  assert.name(Math.expm1, 'expm1');
	  assert.arity(Math.expm1, 1);
	  assert.looksNative(Math.expm1);
	  assert.nonEnumerable(Math, 'expm1');
	  assert.same(Math.expm1(NaN), NaN);
	  assert.same(Math.expm1(0), 0);
	  assert.same(Math.expm1(-0), -0);
	  assert.strictEqual(Math.expm1(Infinity), Infinity);
	  assert.strictEqual(Math.expm1(-Infinity), -1);
	  assert.epsilon(Math.expm1(10), 22025.465794806718);
	  assert.epsilon(Math.expm1(-10), -0.9999546000702375);
	});

	var LOG10E = Math.LOG10E;

	// from core-js https://github.com/zloirock/core-js
	function log10(x) {
	  return log(x) * LOG10E;
	}

	if (!Math$1.log10) {
	  Math$1.log10 = log10;
	}

	QUnit.test('Math.log10', function (assert) {
	  assert.isFunction(Math.log10);
	  assert.name(Math.log10, 'log10');
	  assert.arity(Math.log10, 1);
	  assert.looksNative(Math.log10);
	  assert.nonEnumerable(Math, 'log10');
	  assert.same(Math.log10(''), Math.log10(0));
	  assert.same(Math.log10(NaN), NaN);
	  assert.same(Math.log10(-1), NaN);
	  assert.same(Math.log10(0), -Infinity);
	  assert.same(Math.log10(-0), -Infinity);
	  assert.same(Math.log10(1), 0);
	  assert.same(Math.log10(Infinity), Infinity);
	  assert.epsilon(Math.log10(0.1), -1);
	  assert.epsilon(Math.log10(0.5), -0.3010299956639812);
	  assert.epsilon(Math.log10(1.5), 0.17609125905568124);
	  assert.epsilon(Math.log10(5), 0.6989700043360189);
	  assert.epsilon(Math.log10(50), 1.6989700043360187);
	  assert.epsilon(Math.log10(1000), 3);
	});

	QUnit.test('Math.log1p', function (assert) {
	  assert.isFunction(Math.log1p);
	  assert.name(Math.log1p, 'log1p');
	  assert.arity(Math.log1p, 1);
	  assert.looksNative(Math.log1p);
	  assert.nonEnumerable(Math, 'log1p');
	  assert.same(Math.log1p(''), Math.log1p(0));
	  assert.same(Math.log1p(NaN), NaN);
	  assert.same(Math.log1p(-2), NaN);
	  assert.same(Math.log1p(-1), -Infinity);
	  assert.same(Math.log1p(0), 0);
	  assert.same(Math.log1p(-0), -0);
	  assert.same(Math.log1p(Infinity), Infinity);
	  assert.epsilon(Math.log1p(5), 1.791759469228055);
	  assert.epsilon(Math.log1p(50), 3.9318256327243257);
	});

	// from core-js https://github.com/zloirock/core-js
	function log2(x) {
	  return log(x) / LN2;
	}

	if (!Math$1.log2) {
	  Math$1.log2 = log2;
	}

	QUnit.test('Math.log2', function (assert) {
	  assert.isFunction(Math.log2);
	  assert.name(Math.log2, 'log2');
	  assert.arity(Math.log2, 1);
	  assert.looksNative(Math.log2);
	  assert.nonEnumerable(Math, 'log2');
	  assert.same(Math.log2(''), Math.log2(0));
	  assert.same(Math.log2(NaN), NaN);
	  assert.same(Math.log2(-1), NaN);
	  assert.same(Math.log2(0), -Infinity);
	  assert.same(Math.log2(-0), -Infinity);
	  assert.same(Math.log2(1), 0);
	  assert.same(Math.log2(Infinity), Infinity);
	  assert.same(Math.log2(0.5), -1);
	  assert.same(Math.log2(32), 5);
	  assert.epsilon(Math.log2(5), 2.321928094887362);
	});

	// from core-js https://github.com/zloirock/core-js
	function sinh(x) {
	  return abs(x = +x) < 1 ? (expm1(x) - expm1(-x)) / 2 : (exp(x - 1) - exp(-x - 1)) * (E / 2);
	}

	if (!Math$1.sinh) {
	  Math$1.sinh = sinh;
	}

	QUnit.test('Math.sinh', function (assert) {
	  assert.isFunction(Math.sinh);
	  assert.name(Math.sinh, 'sinh');
	  assert.arity(Math.sinh, 1);
	  assert.looksNative(Math.sinh);
	  assert.nonEnumerable(Math, 'sinh');
	  assert.same(Math.sinh(NaN), NaN);
	  assert.same(Math.sinh(0), 0);
	  assert.same(Math.sinh(-0), -0);
	  assert.strictEqual(Math.sinh(Infinity), Infinity);
	  assert.strictEqual(Math.sinh(-Infinity), -Infinity);
	  assert.epsilon(Math.sinh(-5), -74.20321057778875);
	  assert.epsilon(Math.sinh(2), 3.6268604078470186);
	  assert.strictEqual(Math.sinh(-2e-17), -2e-17);
	});

	// from core-js https://github.com/zloirock/core-js
	function tanh(x) {
	  var a = expm1(x = +x);
	  var b = expm1(-x);
	  return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
	}

	if (!Math$1.tanh) {
	  Math$1.tanh = tanh;
	}

	QUnit.test('Math.tanh', function (assert) {
	  assert.isFunction(Math.tanh);
	  assert.name(Math.tanh, 'tanh');
	  assert.arity(Math.tanh, 1);
	  assert.looksNative(Math.tanh);
	  assert.nonEnumerable(Math, 'tanh');
	  assert.same(Math.tanh(NaN), NaN);
	  assert.same(Math.tanh(0), 0);
	  assert.same(Math.tanh(-0), -0);
	  assert.strictEqual(Math.tanh(Infinity), 1);
	  assert.strictEqual(Math.tanh(90), 1);
	  assert.epsilon(Math.tanh(10), 0.9999999958776927);
	  if (NATIVE) assert.strictEqual(Math.tanh(710), 1);
	});

	var floor = Math.floor;

	var ceil = Math.ceil;

	// from core-js https://github.com/zloirock/core-js
	function trunc(it) {
	  return (it > 0 ? floor : ceil)(it);
	}

	if (!Math$1.trunc) {
	  Math$1.trunc = trunc;
	}

	QUnit.test('Math.trunc', function (assert) {
	  assert.isFunction(Math.trunc);
	  assert.name(Math.trunc, 'trunc');
	  assert.arity(Math.trunc, 1);
	  assert.looksNative(Math.trunc);
	  assert.nonEnumerable(Math, 'trunc');
	  assert.same(Math.trunc(NaN), NaN, 'NaN -> NaN');
	  assert.same(Math.trunc(-0), -0, '-0 -> -0');
	  assert.same(Math.trunc(0), 0, '0 -> 0');
	  assert.same(Math.trunc(Infinity), Infinity, 'Infinity -> Infinity');
	  assert.same(Math.trunc(-Infinity), -Infinity, '-Infinity -> -Infinity');
	  assert.same(Math.trunc(null), 0, 'null -> 0');
	  assert.same(Math.trunc({}), NaN, '{} -> NaN');
	  assert.strictEqual(Math.trunc([]), 0, '[] -> 0');
	  assert.strictEqual(Math.trunc(1.01), 1, '1.01 -> 0');
	  assert.strictEqual(Math.trunc(1.99), 1, '1.99 -> 0');
	  assert.strictEqual(Math.trunc(-1), -1, '-1 -> -1');
	  assert.strictEqual(Math.trunc(-1.99), -1, '-1.99 -> -1');
	  assert.strictEqual(Math.trunc(-555.555), -555, '-555.555 -> -555');
	  assert.strictEqual(Math.trunc(0x20000000000001), 0x20000000000001, '0x20000000000001 -> 0x20000000000001');
	  assert.strictEqual(Math.trunc(-0x20000000000001), -0x20000000000001, '-0x20000000000001 -> -0x20000000000001');
	});

	QUnit.test('Math.sign', function (assert) {
	  assert.isFunction(Math.sign);
	  assert.name(Math.sign, 'sign');
	  assert.arity(Math.sign, 1);
	  assert.looksNative(Math.sign);
	  assert.nonEnumerable(Math, 'sign');
	  assert.same(Math.sign(NaN), NaN);
	  assert.same(Math.sign(), NaN);
	  assert.same(Math.sign(-0), -0);
	  assert.same(Math.sign(0), 0);
	  assert.strictEqual(Math.sign(Infinity), 1);
	  assert.strictEqual(Math.sign(-Infinity), -1);
	  assert.strictEqual(Math.sign(13510798882111488), 1);
	  assert.strictEqual(Math.sign(-13510798882111488), -1);
	  assert.strictEqual(Math.sign(42.5), 1);
	  assert.strictEqual(Math.sign(-42.5), -1);
	});

	var EPSILON = pow(2, -52);
	var EPSILON32 = pow(2, -23);
	var MAX32 = pow(2, 127) * (2 - EPSILON32);
	var MIN32 = pow(2, -126);
	function roundTiesToEven(n) {
	  return n + 1 / EPSILON - 1 / EPSILON;
	}
	;

	// from core-js https://github.com/zloirock/core-js
	function fround(x) {
	  var $abs = abs(x);
	  var $sign = sign(x);
	  var a, result;
	  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
	  a = (1 + EPSILON32 / EPSILON) * $abs;
	  result = a - (a - $abs);
	  // eslint-disable-next-line no-self-compare -- NaN check
	  if (result > MAX32 || result != result) return $sign * Infinity;
	  return $sign * result;
	}

	if (!Math$1.fround) {
	  Math$1.fround = fround;
	}

	QUnit.test('Math.fround', function (assert) {
	  assert.isFunction(Math.fround);
	  assert.name(Math.fround, 'fround');
	  assert.arity(Math.fround, 1);
	  assert.looksNative(Math.fround);
	  assert.nonEnumerable(Math, 'fround');
	  assert.same(Math.fround(undefined), NaN);
	  assert.same(Math.fround(NaN), NaN);
	  assert.same(Math.fround(0), 0);
	  assert.same(Math.fround(-0), -0);
	  assert.same(Math.fround(Number.MIN_VALUE), 0);
	  assert.same(Math.fround(-Number.MIN_VALUE), -0);
	  assert.strictEqual(Math.fround(Infinity), Infinity);
	  assert.strictEqual(Math.fround(-Infinity), -Infinity);
	  assert.strictEqual(Math.fround(1.7976931348623157e+308), Infinity);
	  assert.strictEqual(Math.fround(-1.7976931348623157e+308), -Infinity);
	  assert.strictEqual(Math.fround(3.4028235677973366e+38), Infinity);
	  assert.strictEqual(Math.fround(3), 3);
	  assert.strictEqual(Math.fround(-3), -3);
	  var maxFloat32 = 3.4028234663852886e+38;
	  var minFloat32 = 1.401298464324817e-45;
	  assert.strictEqual(Math.fround(maxFloat32), maxFloat32);
	  assert.strictEqual(Math.fround(-maxFloat32), -maxFloat32);
	  assert.strictEqual(Math.fround(maxFloat32 + Math.pow(2, 102)), maxFloat32);
	  assert.strictEqual(Math.fround(minFloat32), minFloat32);
	  assert.strictEqual(Math.fround(-minFloat32), -minFloat32);
	  assert.same(Math.fround(minFloat32 / 2), 0);
	  assert.same(Math.fround(-minFloat32 / 2), -0);
	  assert.strictEqual(Math.fround(minFloat32 / 2 + Math.pow(2, -202)), minFloat32);
	  assert.strictEqual(Math.fround(-minFloat32 / 2 - Math.pow(2, -202)), -minFloat32);
	});

	// from core-js https://github.com/zloirock/core-js
	function hypot(x, y) {
	  var sum = 0;
	  var i = 0;
	  var aLen = arguments.length;
	  var larg = 0;
	  var arg, div;
	  while (i < aLen) {
	    arg = abs(arguments[i++]);
	    if (larg < arg) {
	      div = larg / arg;
	      sum = sum * div * div + 1;
	      larg = arg;
	    } else if (arg > 0) {
	      div = arg / larg;
	      sum += div * div;
	    } else sum += arg;
	  }
	  return larg === Infinity ? Infinity : larg * sqrt(sum);
	}

	if (!Math$1.hypot) {
	  Math$1.hypot = hypot;
	}

	QUnit.test('Math.hypot', function (assert) {
	  assert.isFunction(Math.hypot);
	  assert.name(Math.hypot, 'hypot');
	  assert.arity(Math.hypot, 2);
	  assert.looksNative(Math.hypot);
	  assert.nonEnumerable(Math, 'hypot');
	  assert.strictEqual(Math.hypot(), 0);
	  assert.strictEqual(Math.hypot(1), 1);
	  assert.same(Math.hypot('', 0), 0);
	  assert.same(Math.hypot(0, ''), 0);
	  assert.strictEqual(Math.hypot(Infinity, 0), Infinity, 'Infinity, 0');
	  assert.strictEqual(Math.hypot(-Infinity, 0), Infinity, '-Infinity, 0');
	  assert.strictEqual(Math.hypot(0, Infinity), Infinity, '0, Infinity');
	  assert.strictEqual(Math.hypot(0, -Infinity), Infinity, '0, -Infinity');
	  assert.strictEqual(Math.hypot(Infinity, NaN), Infinity, 'Infinity, NaN');
	  assert.strictEqual(Math.hypot(NaN, -Infinity), Infinity, 'NaN, -Infinity');
	  assert.same(Math.hypot(NaN, 0), NaN, 'NaN, 0');
	  assert.same(Math.hypot(0, NaN), NaN, '0, NaN');
	  assert.same(Math.hypot(0, -0), 0);
	  assert.same(Math.hypot(0, 0), 0);
	  assert.same(Math.hypot(-0, -0), 0);
	  assert.same(Math.hypot(-0, 0), 0);
	  assert.strictEqual(Math.hypot(0, 1), 1);
	  assert.strictEqual(Math.hypot(0, -1), 1);
	  assert.strictEqual(Math.hypot(-0, 1), 1);
	  assert.strictEqual(Math.hypot(-0, -1), 1);
	  assert.same(Math.hypot(0), 0);
	  assert.strictEqual(Math.hypot(1), 1);
	  assert.strictEqual(Math.hypot(2), 2);
	  assert.strictEqual(Math.hypot(0, 0, 1), 1);
	  assert.strictEqual(Math.hypot(0, 1, 0), 1);
	  assert.strictEqual(Math.hypot(1, 0, 0), 1);
	  assert.strictEqual(Math.hypot(2, 3, 4), Math.sqrt(2 * 2 + 3 * 3 + 4 * 4));
	  assert.strictEqual(Math.hypot(2, 3, 4, 5), Math.sqrt(2 * 2 + 3 * 3 + 4 * 4 + 5 * 5));
	  assert.epsilon(Math.hypot(66, 66), 93.33809511662427);
	  assert.epsilon(Math.hypot(0.1, 100), 100.0000499999875);
	  assert.strictEqual(Math.hypot(1e+300, 1e+300), 1.4142135623730952e+300);
	  assert.strictEqual(Math.floor(Math.hypot(1e-300, 1e-300) * 1e308), 141421356);
	  assert.strictEqual(Math.hypot(1e+300, 1e+300, 2, 3), 1.4142135623730952e+300);
	  assert.strictEqual(Math.hypot(-3, 4), 5);
	  assert.strictEqual(Math.hypot(3, -4), 5);
	});

	// from MDN
	function clz32(x) {
	  var asUint = x >>> 0; // 将x转换为Uint32类型
	  if (asUint === 0) {
	    return 32;
	  }
	  return 31 - (log(asUint) / LN2 | 0) | 0; // "| 0"相当于Math.floor
	}

	if (!Math$1.clz32) {
	  Math$1.clz32 = clz32;
	}

	QUnit.test('Math.clz32', function (assert) {
	  assert.isFunction(Math.clz32);
	  assert.name(Math.clz32, 'clz32');
	  assert.arity(Math.clz32, 1);
	  assert.looksNative(Math.clz32);
	  assert.nonEnumerable(Math, 'clz32');
	  assert.strictEqual(Math.clz32(0), 32);
	  assert.strictEqual(Math.clz32(1), 31);
	  assert.same(Math.clz32(-1), 0);
	  assert.strictEqual(Math.clz32(0.6), 32);
	  assert.same(Math.clz32(Math.pow(2, 32) - 1), 0);
	  assert.strictEqual(Math.clz32(Math.pow(2, 32)), 32);
	});

	function startsWith(search) {
	  if (search instanceof RegExp) {
	    throw new TypeError("First argument must not be a regular expression");
	  }
	  var pos = arguments[1];
	  pos = isNaN(pos) ? 0 : pos < 0 ? 0 : +pos;
	  search = String(search);
	  return this.substring(pos, pos + search.length) === search;
	}

	if (!String.prototype.startsWith) {
	  String.prototype.startsWith = startsWith;
	}

	var _Symbol$1 = GLOBAL.Symbol || {};
	QUnit.test('String#startsWith', function (assert) {
	  var startsWith = String.prototype.startsWith;
	  assert.isFunction(startsWith);
	  assert.arity(startsWith, 1);
	  assert.name(startsWith, 'startsWith');
	  assert.ok('undefined'.startsWith());
	  assert.ok(!'undefined'.startsWith(null));
	  assert.ok('abc'.startsWith(''));
	  assert.ok('abc'.startsWith('a'));
	  assert.ok('abc'.startsWith('ab'));
	  assert.ok(!'abc'.startsWith('bc'));
	  assert.ok('abc'.startsWith('', NaN));
	  assert.ok('abc'.startsWith('a', -1));
	  assert.ok(!'abc'.startsWith('a', 1));
	  assert.ok(!'abc'.startsWith('a', Infinity));
	  assert.ok('abc'.startsWith('b', true));
	  assert.ok('abc'.startsWith('a', 'x'));
	  if (STRICT) {
	    assert.throws(function () {
	      return startsWith.call(null, '.');
	    }, TypeError);
	    assert.throws(function () {
	      return startsWith.call(undefined, '.');
	    }, TypeError);
	  }
	  var regexp = /./;
	  assert.throws(function () {
	    return '/./'.startsWith(regexp);
	  }, TypeError);
	  var object = {};
	  assert.notThrows(function () {
	    return '[object Object]'.startsWith(object);
	  });
	});

	function endsWith(search) {
	  if (search instanceof RegExp) {
	    throw new TypeError("First argument must not be a regular expression");
	  }
	  var len = this.length;
	  var pos = arguments[1];
	  if (pos == null) {
	    pos = len;
	  } else if (isNaN(pos)) {
	    pos = 0;
	  } else {
	    pos = pos > len ? len : +pos;
	  }
	  search = String(search);
	  return this.substring(pos - search.length, pos) === search;
	}

	if (!String.prototype.endsWith) {
	  String.prototype.endsWith = endsWith;
	}

	var _Symbol = GLOBAL.Symbol || {};
	QUnit.test('String#endsWith', function (assert) {
	  var endsWith = String.prototype.endsWith;
	  assert.isFunction(endsWith);
	  assert.arity(endsWith, 1);
	  assert.name(endsWith, 'endsWith');
	  assert.ok('undefined'.endsWith());
	  assert.ok(!'undefined'.endsWith(null));
	  assert.ok('abc'.endsWith(''));
	  assert.ok('abc'.endsWith('c'));
	  assert.ok('abc'.endsWith('bc'));
	  assert.ok(!'abc'.endsWith('ab'));
	  assert.ok('abc'.endsWith('', NaN));
	  assert.ok(!'abc'.endsWith('c', -1));
	  assert.ok('abc'.endsWith('a', 1));
	  assert.ok('abc'.endsWith('c', Infinity));
	  assert.ok('abc'.endsWith('a', true));
	  assert.ok(!'abc'.endsWith('c', 'x'));
	  assert.ok(!'abc'.endsWith('a', 'x'));
	  if (STRICT) {
	    assert.throws(function () {
	      return endsWith.call(null, '.');
	    }, TypeError);
	    assert.throws(function () {
	      return endsWith.call(undefined, '.');
	    }, TypeError);
	  }
	  var regexp = /./;
	  assert.throws(function () {
	    return '/./'.endsWith(regexp);
	  }, TypeError);
	  var object = {};
	  assert.notThrows(function () {
	    return '[object Object]'.endsWith(object);
	  });
	});

	if (!String.prototype.repeat) {
	  String.prototype.repeat = repeat$1;
	}

	QUnit.test('String#repeat', function (assert) {
	  var repeat = String.prototype.repeat;
	  assert.isFunction(repeat);
	  assert.arity(repeat, 1);
	  assert.name(repeat, 'repeat');
	  assert.strictEqual('qwe'.repeat(3), 'qweqweqwe');
	  assert.strictEqual('qwe'.repeat(2.5), 'qweqwe');
	  assert.throws(function () {
	    return 'qwe'.repeat(-1);
	  }, RangeError);
	  assert.throws(function () {
	    return 'qwe'.repeat(Infinity);
	  }, RangeError);
	  if (STRICT) {
	    assert.throws(function () {
	      return repeat.call(null, 1);
	    }, TypeError);
	    assert.throws(function () {
	      return repeat.call(undefined, 1);
	    }, TypeError);
	  }
	});

	/*! http://mths.be/codepointat v0.1.0 by @mathias */
	function codePointAt(position) {
	  if (this == null) {
	    throw TypeError();
	  }
	  var string = String(this);
	  var size = string.length;
	  // 变成整数
	  var index = position ? Number(position) : 0;
	  if (index != index) {
	    // better `isNaN`
	    index = 0;
	  }
	  // 边界
	  if (index < 0 || index >= size) {
	    return undefined;
	  }
	  // 第一个编码单元
	  var first = string.charCodeAt(index);
	  var second;
	  if (
	  // 检查是否开始 surrogate pair
	  first >= 0xD800 && first <= 0xDBFF &&
	  // high surrogate
	  size > index + 1 // 下一个编码单元
	  ) {
	    second = string.charCodeAt(index + 1);
	    if (second >= 0xDC00 && second <= 0xDFFF) {
	      // low surrogate
	      // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
	      return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
	    }
	  }
	  return first;
	}

	if (!String.prototype.codePointAt) {
	  String.prototype.codePointAt = codePointAt;
	}

	QUnit.test('String#codePointAt', function (assert) {
	  var codePointAt = String.prototype.codePointAt;
	  assert.isFunction(codePointAt);
	  assert.arity(codePointAt, 1);
	  assert.name(codePointAt, 'codePointAt');
	  assert.strictEqual("abc\uD834\uDF06def".codePointAt(''), 0x61);
	  assert.strictEqual("abc\uD834\uDF06def".codePointAt('_'), 0x61);
	  assert.strictEqual("abc\uD834\uDF06def".codePointAt(), 0x61);
	  assert.strictEqual("abc\uD834\uDF06def".codePointAt(-Infinity), undefined);
	  assert.strictEqual("abc\uD834\uDF06def".codePointAt(-1), undefined);
	  assert.strictEqual("abc\uD834\uDF06def".codePointAt(-0), 0x61);
	  assert.strictEqual("abc\uD834\uDF06def".codePointAt(0), 0x61);
	  assert.strictEqual("abc\uD834\uDF06def".codePointAt(3), 0x1D306);
	  assert.strictEqual("abc\uD834\uDF06def".codePointAt(4), 0xDF06);
	  assert.strictEqual("abc\uD834\uDF06def".codePointAt(5), 0x64);
	  assert.strictEqual("abc\uD834\uDF06def".codePointAt(42), undefined);
	  assert.strictEqual("abc\uD834\uDF06def".codePointAt(Infinity), undefined);
	  assert.strictEqual("abc\uD834\uDF06def".codePointAt(Infinity), undefined);
	  assert.strictEqual("abc\uD834\uDF06def".codePointAt(NaN), 0x61);
	  assert.strictEqual("abc\uD834\uDF06def".codePointAt(false), 0x61);
	  assert.strictEqual("abc\uD834\uDF06def".codePointAt(null), 0x61);
	  assert.strictEqual("abc\uD834\uDF06def".codePointAt(undefined), 0x61);
	  assert.strictEqual("\uD834\uDF06def".codePointAt(''), 0x1D306);
	  assert.strictEqual("\uD834\uDF06def".codePointAt('1'), 0xDF06);
	  assert.strictEqual("\uD834\uDF06def".codePointAt('_'), 0x1D306);
	  assert.strictEqual("\uD834\uDF06def".codePointAt(), 0x1D306);
	  assert.strictEqual("\uD834\uDF06def".codePointAt(-1), undefined);
	  assert.strictEqual("\uD834\uDF06def".codePointAt(-0), 0x1D306);
	  assert.strictEqual("\uD834\uDF06def".codePointAt(0), 0x1D306);
	  assert.strictEqual("\uD834\uDF06def".codePointAt(1), 0xDF06);
	  assert.strictEqual("\uD834\uDF06def".codePointAt(42), undefined);
	  assert.strictEqual("\uD834\uDF06def".codePointAt(false), 0x1D306);
	  assert.strictEqual("\uD834\uDF06def".codePointAt(null), 0x1D306);
	  assert.strictEqual("\uD834\uDF06def".codePointAt(undefined), 0x1D306);
	  assert.strictEqual("\uD834abc".codePointAt(''), 0xD834);
	  assert.strictEqual("\uD834abc".codePointAt('_'), 0xD834);
	  assert.strictEqual("\uD834abc".codePointAt(), 0xD834);
	  assert.strictEqual("\uD834abc".codePointAt(-1), undefined);
	  assert.strictEqual("\uD834abc".codePointAt(-0), 0xD834);
	  assert.strictEqual("\uD834abc".codePointAt(0), 0xD834);
	  assert.strictEqual("\uD834abc".codePointAt(false), 0xD834);
	  assert.strictEqual("\uD834abc".codePointAt(NaN), 0xD834);
	  assert.strictEqual("\uD834abc".codePointAt(null), 0xD834);
	  assert.strictEqual("\uD834abc".codePointAt(undefined), 0xD834);
	  assert.strictEqual("\uDF06abc".codePointAt(''), 0xDF06);
	  assert.strictEqual("\uDF06abc".codePointAt('_'), 0xDF06);
	  assert.strictEqual("\uDF06abc".codePointAt(), 0xDF06);
	  assert.strictEqual("\uDF06abc".codePointAt(-1), undefined);
	  assert.strictEqual("\uDF06abc".codePointAt(-0), 0xDF06);
	  assert.strictEqual("\uDF06abc".codePointAt(0), 0xDF06);
	  assert.strictEqual("\uDF06abc".codePointAt(false), 0xDF06);
	  assert.strictEqual("\uDF06abc".codePointAt(NaN), 0xDF06);
	  assert.strictEqual("\uDF06abc".codePointAt(null), 0xDF06);
	  assert.strictEqual("\uDF06abc".codePointAt(undefined), 0xDF06);
	  if (STRICT) {
	    assert.throws(function () {
	      return codePointAt.call(null, 0);
	    }, TypeError);
	    assert.throws(function () {
	      return codePointAt.call(undefined, 0);
	    }, TypeError);
	  }
	});

	var String$1 = window.String;

	var stringFromCharCode = String.fromCharCode;
	function fromCodePoint(_) {
	  var codeUnits = [],
	    codeLen = 0,
	    result = "";
	  for (var index = 0, len = arguments.length; index !== len; ++index) {
	    var codePoint = +arguments[index];
	    // correctly handles all cases including `NaN`, `-Infinity`, `+Infinity`
	    // The surrounding `!(...)` is required to correctly handle `NaN` cases
	    // The (codePoint>>>0) === codePoint clause handles decimals and negatives
	    if (!(codePoint < 0x10FFFF && codePoint >>> 0 === codePoint)) throw RangeError("Invalid code point: " + codePoint);
	    if (codePoint <= 0xFFFF) {
	      // BMP code point
	      codeLen = codeUnits.push(codePoint);
	    } else {
	      // Astral code point; split in surrogate halves
	      // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
	      codePoint -= 0x10000;
	      codeLen = codeUnits.push((codePoint >> 10) + 0xD800,
	      // highSurrogate
	      codePoint % 0x400 + 0xDC00 // lowSurrogate
	      );
	    }

	    if (codeLen >= 0x3fff) {
	      result += stringFromCharCode.apply(null, codeUnits);
	      codeUnits.length = 0;
	    }
	  }
	  return result + stringFromCharCode.apply(null, codeUnits);
	}

	if (!String$1.fromCodePoint) {
	  String$1.fromCodePoint = fromCodePoint;
	}

	QUnit.test('String.fromCodePoint', function (assert) {
	  var fromCodePoint = String.fromCodePoint;
	  assert.isFunction(fromCodePoint);
	  assert.arity(fromCodePoint, 1);
	  assert.name(fromCodePoint, 'fromCodePoint');
	  assert.strictEqual(fromCodePoint(''), '\0');
	  assert.strictEqual(fromCodePoint(), '');
	  assert.strictEqual(fromCodePoint(-0), '\0');
	  assert.strictEqual(fromCodePoint(0), '\0');
	  assert.strictEqual(fromCodePoint(0x1D306), "\uD834\uDF06");
	  assert.strictEqual(fromCodePoint(0x1D306, 0x61, 0x1D307), "\uD834\uDF06a\uD834\uDF07");
	  assert.strictEqual(fromCodePoint(0x61, 0x62, 0x1D307), "ab\uD834\uDF07");
	  assert.strictEqual(fromCodePoint(false), '\0');
	  assert.strictEqual(fromCodePoint(null), '\0');
	  assert.throws(function () {
	    return fromCodePoint('_');
	  }, RangeError);
	  assert.throws(function () {
	    return fromCodePoint('+Infinity');
	  }, RangeError);
	  assert.throws(function () {
	    return fromCodePoint('-Infinity');
	  }, RangeError);
	  assert.throws(function () {
	    return fromCodePoint(-1);
	  }, RangeError);
	  assert.throws(function () {
	    return fromCodePoint(0x10FFFF + 1);
	  }, RangeError);
	  assert.throws(function () {
	    return fromCodePoint(3.14);
	  }, RangeError);
	  assert.throws(function () {
	    return fromCodePoint(3e-2);
	  }, RangeError);
	  assert.throws(function () {
	    return fromCodePoint(-Infinity);
	  }, RangeError);
	  assert.throws(function () {
	    return fromCodePoint(Infinity);
	  }, RangeError);
	  assert.throws(function () {
	    return fromCodePoint(NaN);
	  }, RangeError);
	  assert.throws(function () {
	    return fromCodePoint(undefined);
	  }, RangeError);
	  assert.throws(function () {
	    return fromCodePoint({});
	  }, RangeError);
	  assert.throws(function () {
	    return fromCodePoint(/./);
	  }, RangeError);
	  var number = 0x60;
	  assert.strictEqual(fromCodePoint({
	    valueOf: function () {
	      return ++number;
	    }
	  }), 'a');
	  assert.strictEqual(number, 0x61);
	  // one code unit per symbol
	  var counter = Math.pow(2, 15) * 3 / 2;
	  var result = [];
	  while (--counter >= 0) result.push(0);
	  // should not throw
	  fromCodePoint.apply(null, result);
	  counter = Math.pow(2, 15) * 3 / 2;
	  result = [];
	  while (--counter >= 0) result.push(0xFFFF + 1);
	  // should not throw
	  fromCodePoint.apply(null, result);
	});

	function raw(callSite) {
	  var raw = callSite.raw;
	  if (!raw) {
	    throw new TypeError();
	  }
	  var args = arguments;
	  return Array.from(raw, function (str, i) {
	    if (i > 0 && i < args.length) {
	      return args[i] + str;
	    }
	    return str;
	  }).join('');
	}

	if (!String$1.raw) {
	  String$1.raw = raw;
	}

	QUnit.test('String.raw', function (assert) {
	  var raw = String.raw;
	  assert.isFunction(raw);
	  assert.arity(raw, 1);
	  assert.name(raw, 'raw');
	  assert.strictEqual(raw({
	    raw: ['Hi\\n', '!']
	  }, 'Bob'), 'Hi\\nBob!', 'raw is array');
	  assert.strictEqual(raw({
	    raw: 'test'
	  }, 0, 1, 2), 't0e1s2t', 'raw is string');
	  assert.strictEqual(raw({
	    raw: 'test'
	  }, 0), 't0est', 'lacks substituting');
	  assert.throws(function () {
	    return raw({});
	  }, TypeError);
	  assert.throws(function () {
	    return raw({
	      raw: null
	    });
	  }, TypeError);
	});

	function includes$1(search) {
	  var i = this.length;
	  while (i-- > 0) {
	    var value = this[i];
	    if (value === search || isNaN$1(value) && isNaN$1(search)) {
	      return true;
	    }
	  }
	  return false;
	}

	if (!Array.prototype.includes) {
	  Array.prototype.includes = includes$1;
	}

	function includes(search) {
	  if (search instanceof RegExp) {
	    throw new TypeError("First argument must not be a regular expression");
	  }
	  var start = arguments[1];
	  if (typeof start !== 'number') {
	    start = 0;
	  }
	  return this.indexOf(search, start) !== -1;
	}

	if (!String.prototype.includes) {
	  String.prototype.includes = includes;
	}

	QUnit.test('String#includes', function (assert) {
	  var includes = String.prototype.includes;
	  assert.isFunction(includes);
	  assert.arity(includes, 1);
	  assert.name(includes, 'includes');
	  assert.ok(!'abc'.includes());
	  assert.ok('aundefinedb'.includes());
	  assert.ok('abcd'.includes('b', 1));
	  assert.ok(!'abcd'.includes('b', 2));
	  if (STRICT) {
	    assert.throws(function () {
	      return includes.call(null, '.');
	    }, TypeError);
	    assert.throws(function () {
	      return includes.call(undefined, '.');
	    }, TypeError);
	  }
	  var regexp = /./;
	  assert.throws(function () {
	    return '/./'.includes(regexp);
	  }, TypeError);
	  var object = {};
	  assert.notThrows(function () {
	    return '[object Object]'.includes(object);
	  });
	});

	function findIndex(callback) {
	  var thisArg = arguments[1];
	  if (this.length > 0) {
	    for (var i = 0, j; i < this.length; i++) {
	      j = this[i];
	      var r = callback.call(thisArg, j, i, this);
	      if (r) {
	        return i;
	      }
	    }
	  }
	  return -1;
	}

	if (!Array.prototype.findIndex) {
	  Array.prototype.findIndex = findIndex;
	}

	QUnit.test('Array#findIndex', function (assert) {
	  var findIndex = Array.prototype.findIndex;
	  assert.isFunction(findIndex);
	  assert.arity(findIndex, 1);
	  assert.name(findIndex, 'findIndex');
	  var array = [1];
	  var context = {};
	  array.findIndex(function (value, key, that) {
	    assert.same(arguments.length, 3, 'correct number of callback arguments');
	    assert.same(value, 1, 'correct value in callback');
	    assert.same(key, 0, 'correct index in callback');
	    assert.same(that, array, 'correct link to array in callback');
	    assert.same(this, context, 'correct callback context');
	  }, context);
	  // eslint-disable-next-line unicorn/prefer-array-index-of -- ignore
	  assert.same([1, 3, NaN, 42, {}].findIndex(function (it) {
	    return it === 42;
	  }), 3);
	  // eslint-disable-next-line unicorn/prefer-array-index-of -- ignore
	  assert.same([1, 3, NaN, 42, {}].findIndex(function (it) {
	    return it === 43;
	  }), -1);
	  if (STRICT) {
	    assert.throws(function () {
	      return findIndex.call(null, 0);
	    }, TypeError);
	    assert.throws(function () {
	      return findIndex.call(undefined, 0);
	    }, TypeError);
	  }
	  assert.notThrows(function () {
	    return findIndex.call({
	      length: -1,
	      0: 1
	    }, function () {
	      throw new Error();
	    }) === -1;
	  }, 'uses ToLength');
	});

	function find(callback) {
	  var thisArg = arguments[1];
	  var i = findIndex.call(this, callback, thisArg);
	  if (i >= 0) {
	    return this[i];
	  }
	}
	;

	if (!Array.prototype.find) {
	  Array.prototype.find = find;
	}

	QUnit.test('Array#find', function (assert) {
	  var find = Array.prototype.find;
	  assert.isFunction(find);
	  assert.arity(find, 1);
	  assert.name(find, 'find');
	  var array = [1];
	  var context = {};
	  array.find(function (value, key, that) {
	    assert.same(arguments.length, 3, 'correct number of callback arguments');
	    assert.same(value, 1, 'correct value in callback');
	    assert.same(key, 0, 'correct index in callback');
	    assert.same(that, array, 'correct link to array in callback');
	    assert.same(this, context, 'correct callback context');
	  }, context);
	  assert.same([1, 3, NaN, 42, {}].find(function (it) {
	    return it === 42;
	  }), 42);
	  assert.same([1, 3, NaN, 42, {}].find(function (it) {
	    return it === 43;
	  }), undefined);
	  if (STRICT) {
	    assert.throws(function () {
	      return find.call(null, 0);
	    }, TypeError);
	    assert.throws(function () {
	      return find.call(undefined, 0);
	    }, TypeError);
	  }
	  assert.notThrows(function () {
	    return find.call({
	      length: -1,
	      0: 1
	    }, function () {
	      throw new Error();
	    }) === undefined;
	  }, 'uses ToLength');
	});

	function of() {
	  return Array.from.call(this, arguments);
	}

	if (!Array$1.of) {
	  Array$1.of = of;
	}

	QUnit.test('Array.of', function (assert) {
	  var defineProperty = Object.defineProperty;
	  assert.isFunction(Array.of);
	  assert.arity(Array.of, 0);
	  assert.name(Array.of, 'of');
	  assert.deepEqual(Array.of(1), [1]);
	  assert.deepEqual(Array.of(1, 2, 3), [1, 2, 3]);
	  var C = function C() {};
	  var instance = Array.of.call(C, 1, 2);
	  assert.ok(instance instanceof C);
	  assert.strictEqual(instance[0], 1);
	  assert.strictEqual(instance[1], 2);
	  assert.strictEqual(instance.length, 2);
	  // if(DESCRIPTORS) {
	  // 	let called = false;
	  // 	defineProperty(C.prototype, 0, {
	  // 		set() {
	  // 			called = true;
	  // 		},
	  // 	});
	  // 	Array.of.call(C, 1, 2, 3);
	  // 	assert.ok(!called, 'Should not call prototype accessors');
	  // }
	});

	function fill(target) {
	  if (this.length <= 0) {
	    return this;
	  }
	  var len = this.length;
	  var start = arguments[1] || 0;
	  var end = arguments[2] || len;
	  if (start < 0) {
	    start += len;
	    if (start < 0) {
	      start = 0;
	    }
	  }
	  if (end < 0) {
	    end += len;
	  }
	  var i = Math.min(end, len);
	  while (i-- > start) {
	    this[i] = target;
	  }
	  return this;
	}
	;

	if (!Array.prototype.fill) {
	  Array.prototype.fill = fill;
	}

	QUnit.test('Array#fill', function (assert) {
	  var fill = Array.prototype.fill;
	  assert.isFunction(fill);
	  assert.arity(fill, 1);
	  assert.name(fill, 'fill');
	  var array = new Array(5);
	  assert.strictEqual(array.fill(5), array);
	  assert.deepEqual(Array(5).fill(5), [5, 5, 5, 5, 5]);
	  assert.deepEqual(Array(5).fill(5, 1), [undefined, 5, 5, 5, 5]);
	  assert.deepEqual(Array(5).fill(5, 1, 4), [undefined, 5, 5, 5, undefined]);
	  assert.deepEqual(Array(5).fill(5, 6, 1), [undefined, undefined, undefined, undefined, undefined]);
	  assert.deepEqual(Array(5).fill(5, -3, 4), [undefined, undefined, 5, 5, undefined]);
	  assert.arrayEqual(fill.call({
	    length: 5
	  }, 5), [5, 5, 5, 5, 5]);
	  if (STRICT) {
	    assert.throws(function () {
	      return fill.call(null, 0);
	    }, TypeError);
	    assert.throws(function () {
	      return fill.call(undefined, 0);
	    }, TypeError);
	  }
	  if (NATIVE && DESCRIPTORS) {
	    assert.notThrows(function () {
	      return fill.call(Object.defineProperty({
	        length: -1
	      }, 0, {
	        set: function () {
	          throw Error();
	        }
	      }));
	    }, 'uses ToLength');
	  }
	});

	QUnit.test('Array.from', function (assert) {
	  var from = Array.from;
	  var defineProperty = Object.defineProperty;
	  assert.isFunction(from);
	  assert.arity(from, 1);
	  assert.name(from, 'from');
	  var types = {
	    'array-like': {
	      length: '3',
	      0: '1',
	      1: '2',
	      2: '3'
	    },
	    arguments: function () {
	      return arguments;
	    }('1', '2', '3'),
	    array: ['1', '2', '3'],
	    iterable: createIterable$1(['1', '2', '3']),
	    string: '123'
	  };
	  for (var type in types) {
	    var data = types[type];
	    assert.arrayEqual(from(data), ['1', '2', '3'], "Works with " + type);
	    assert.arrayEqual(from(data, function (it) {
	      return Math.pow(it, 2);
	    }), [1, 4, 9], "Works with " + type + " + mapFn");
	  }
	  types = {
	    'array-like': {
	      length: 1,
	      0: 1
	    },
	    arguments: function () {
	      return arguments;
	    }(1),
	    array: [1],
	    iterable: createIterable$1([1]),
	    string: '1'
	  };
	  var _loop = function (type) {
	    var data = types[type];
	    var context = {};
	    assert.arrayEqual(from(data, function (value, key) {
	      assert.same(this, context, "Works with " + type + ", correct callback context");
	      assert.same(value, type === 'string' ? '1' : 1, "Works with " + type + ", correct callback key");
	      assert.same(key, 0, "Works with " + type + ", correct callback value");
	      assert.same(arguments.length, 2, "Works with " + type + ", correct callback arguments number");
	      return 42;
	    }, context), [42], "Works with " + type + ", correct result");
	  };
	  for (var _type in types) {
	    _loop(_type);
	  }
	  var primitives = [false, true, 0];
	  for (var _i = 0, _primitives = primitives; _i < _primitives.length; _i++) {
	    var primitive = _primitives[_i];
	    assert.arrayEqual(from(primitive), [], "Works with " + primitive);
	  }
	  assert.throws(function () {
	    return from(null);
	  }, TypeError, 'Throws on null');
	  assert.throws(function () {
	    return from(undefined);
	  }, TypeError, 'Throws on undefined');
	  assert.arrayEqual(from('𠮷𠮷𠮷'), ['𠮷', '𠮷', '𠮷'], 'Uses correct string iterator');
	  var done = true;
	  from(createIterable$1([1, 2, 3], {
	    return: function () {
	      return done = false;
	    }
	  }), function () {
	    return false;
	  });
	  assert.ok(done, '.return #default');
	  done = false;
	  try {
	    from(createIterable$1([1, 2, 3], {
	      return: function () {
	        return done = true;
	      }
	    }), function () {
	      throw new Error();
	    });
	  } catch (_unused) {/* empty */}
	  assert.ok(done, '.return #throw');
	  var C = function C() {};
	  var instance = from.call(C, createIterable$1([1, 2]));
	  assert.ok(instance instanceof C, 'generic, iterable case, instanceof');
	  assert.arrayEqual(instance, [1, 2], 'generic, iterable case, elements');
	  instance = from.call(C, {
	    0: 1,
	    1: 2,
	    length: 2
	  });
	  assert.ok(instance instanceof C, 'generic, array-like case, instanceof');
	  assert.arrayEqual(instance, [1, 2], 'generic, array-like case, elements');
	  var array = [1, 2, 3];
	  done = false;
	  array['@@iterator'] = undefined;
	  array[$inject_Symbol_iterator] = function () {
	    done = true;
	    return [][$inject_Symbol_iterator].call(this);
	  };
	  assert.arrayEqual(from(array), [1, 2, 3], 'Array with custom iterator, elements');
	  assert.ok(done, 'call @@iterator in Array with custom iterator');
	  array = [1, 2, 3];
	  delete array[1];
	  assert.arrayEqual(from(array, String), ['1', 'undefined', '3'], 'Ignores holes');
	  assert.notThrows(function () {
	    return from({
	      length: -1,
	      0: 1
	    }, function () {
	      throw new Error();
	    }).length === 0;
	  }, 'Uses ToLength');
	  assert.arrayEqual(from([], undefined), [], 'Works with undefined as asecond argument');
	  assert.throws(function () {
	    return from([], null);
	  }, TypeError, 'Throws with null as second argument');
	  assert.throws(function () {
	    return from([], 0);
	  }, TypeError, 'Throws with 0 as second argument');
	  assert.throws(function () {
	    return from([], '');
	  }, TypeError, 'Throws with "" as second argument');
	  assert.throws(function () {
	    return from([], false);
	  }, TypeError, 'Throws with false as second argument');
	  assert.throws(function () {
	    return from([], {});
	  }, TypeError, 'Throws with {} as second argument');
	  // if(DESCRIPTORS) {
	  // 	let called = false;
	  // 	defineProperty(C.prototype, 0, {
	  // 		set() {
	  // 			called = true;
	  // 		},
	  // 	});
	  // 	from.call(C, [1, 2, 3]);
	  // 	assert.ok(!called, 'Should not call prototype accessors');
	  // }
	});

	function copyWithin(target, start /*, end*/) {
	  var end = arguments[2];
	  var len = this.length || 0;
	  if (target < 0) {
	    target += len;
	    if (target < 0) {
	      target = 0;
	    }
	  }
	  start = start || 0;
	  if (start < 0) {
	    start += len;
	    if (start < 0) {
	      start = 0;
	    }
	  }
	  if (end === undefined) {
	    end = len;
	  }
	  if (end < 0) {
	    end += len;
	    if (end < 0) {
	      end = 0;
	    }
	  } else if (end - start + target > len) {
	    end = len - target + start;
	  }
	  var i;
	  for (i = start; i < end; i++) {
	    if (i in this) {
	      this[i - start + target] = this[i];
	    } else {
	      delete this[i];
	    }
	  }
	  return this;
	}

	if (!Array.prototype.copyWithin) {
	  Array.prototype.copyWithin = copyWithin;
	}

	QUnit.test('Array#copyWithin', function (assert) {
	  var copyWithin = Array.prototype.copyWithin;
	  assert.isFunction(copyWithin);
	  assert.arity(copyWithin, 2);
	  assert.name(copyWithin, 'copyWithin');
	  var array = [1];
	  assert.strictEqual(array.copyWithin(0), array);
	  assert.deepEqual([1, 2, 3, 4, 5].copyWithin(-2), [1, 2, 3, 1, 2]);
	  assert.deepEqual([1, 2, 3, 4, 5].copyWithin(0, 3), [4, 5, 3, 4, 5]);
	  assert.deepEqual([1, 2, 3, 4, 5].copyWithin(1, 3), [1, 4, 5, 4, 5]);
	  assert.deepEqual([1, 2, 3, 4, 5].copyWithin(1, 2), [1, 3, 4, 5, 5]);
	  assert.deepEqual([1, 2, 3, 4, 5].copyWithin(2, 2), [1, 2, 3, 4, 5]);
	  assert.deepEqual([1, 2, 3, 4, 5].copyWithin(0, 3, 4), [4, 2, 3, 4, 5]);
	  assert.deepEqual([1, 2, 3, 4, 5].copyWithin(1, 3, 4), [1, 4, 3, 4, 5]);
	  assert.deepEqual([1, 2, 3, 4, 5].copyWithin(1, 2, 4), [1, 3, 4, 4, 5]);
	  assert.deepEqual([1, 2, 3, 4, 5].copyWithin(0, -2), [4, 5, 3, 4, 5]);
	  assert.deepEqual([1, 2, 3, 4, 5].copyWithin(0, -2, -1), [4, 2, 3, 4, 5]);
	  assert.deepEqual([1, 2, 3, 4, 5].copyWithin(-4, -3, -2), [1, 3, 3, 4, 5]);
	  assert.deepEqual([1, 2, 3, 4, 5].copyWithin(-4, -3, -1), [1, 3, 4, 4, 5]);
	  assert.deepEqual([1, 2, 3, 4, 5].copyWithin(-4, -3), [1, 3, 4, 5, 5]);
	  if (STRICT) {
	    assert.throws(function () {
	      return copyWithin.call(null, 0);
	    }, TypeError);
	    assert.throws(function () {
	      return copyWithin.call(undefined, 0);
	    }, TypeError);
	  }
	});

	function forOwn(obj, fn, thisArg) {
	  if (obj) {
	    thisArg = thisArg || undefined;
	    for (var key in obj) {
	      if (key.substring(0, 2) !== "@@" && Object.prototype.hasOwnProperty.call(obj, key)) {
	        if (fn.call(thisArg, obj[key], key) === false) {
	          return false;
	        }
	      }
	    }
	    return true;
	  }
	  return false;
	}
	;

	function assign(target, varArgs) {
	  if (target == null) {
	    throw new TypeError('Cannot convert undefined or null to object');
	  }
	  var to = Object(target);
	  for (var i = 1; i < arguments.length; i++) {
	    var obj = arguments[i];
	    if (obj != null) {
	      var j;
	      if (isString(obj)) {
	        for (j = 0; j < obj.length; j++) {
	          to[j] = obj.charAt(j);
	        }
	      } else {
	        forOwn(obj, function (value, key) {
	          to[key] = value;
	        });
	        var ownKeys = Object.getOwnPropertySymbols(obj);
	        for (j = 0; j < ownKeys.length; j++) {
	          var key = ownKeys[j];
	          to[key] = obj[key];
	        }
	      }
	    }
	  }
	  return to;
	}

	if (!Object$1.assign) {
	  Object$1.assign = assign;
	}

	QUnit.test('Object.assign', function (assert) {
	  assert.isFunction(Object.assign);
	  assert.arity(Object.assign, 2);
	  assert.name(Object.assign, 'assign');
	  var object = {
	    q: 1
	  };
	  assert.strictEqual(object, Object.assign(object, {
	    bar: 2
	  }), 'assign return target');
	  assert.strictEqual(object.bar, 2, 'assign define properties');
	  assert.deepEqual(Object.assign({}, {
	    q: 1
	  }, {
	    w: 2
	  }), {
	    q: 1,
	    w: 2
	  });
	  assert.deepEqual(Object.assign({}, 'qwe'), {
	    0: 'q',
	    1: 'w',
	    2: 'e'
	  });
	  assert.throws(function () {
	    return Object.assign(null, {
	      q: 1
	    });
	  }, TypeError);
	  assert.throws(function () {
	    return Object.assign(undefined, {
	      q: 1
	    });
	  }, TypeError);
	  var string = Object.assign('qwe', {
	    q: 1
	  });
	  assert.strictEqual(_typeof(string), 'object');
	  assert.strictEqual(String(string), 'qwe');
	  assert.strictEqual(string.q, 1);
	  assert.same(Object.assign({}, {
	    valueOf: 42
	  }).valueOf, 42, 'IE enum keys bug');
	  if (DESCRIPTORS) {
	    object = {
	      baz: 1
	    };
	    Object.assign(object, Object.defineProperty({}, 'bar', {
	      get: function () {
	        return this.baz + 1;
	      }
	    }));
	    assert.ok(object.bar === undefined, "assign don't copy descriptors");
	    object = {
	      a: 'a'
	    };
	    var c = _Symbol$4('c');
	    var d = _Symbol$4('d');
	    object[c] = 'c';
	    Object.defineProperty(object, 'b', {
	      value: 'b'
	    });
	    Object.defineProperty(object, d, {
	      value: 'd'
	    });
	    var object2 = Object.assign({}, object);
	    assert.strictEqual(object2.a, 'a', 'a');
	    assert.strictEqual(object2.b, undefined, 'b');
	    assert.strictEqual(object2[c], 'c', 'c');
	    // assert.strictEqual(object2[d], undefined, 'defineProperty 不允许使用Symbol');
	    // try {
	    //   assert.strictEqual(Function('assign', `
	    //     return assign({ b: 1 }, { get a() {
	    //       delete this.b;
	    //     }, b: 2 });
	    //   `)(Object.assign).b, 1);
	    // } catch { /* empty */ }
	    // try {
	    //   assert.strictEqual(Function('assign', `
	    //     return assign({ b: 1 }, { get a() {
	    //       Object.defineProperty(this, "b", {
	    //         value: 3,
	    //         enumerable: false
	    //       });
	    //     }, b: 2 });
	    //   `)(Object.assign).b, 1);
	    // } catch { /* empty */ }
	  }

	  string = 'abcdefghijklmnopqrst';
	  var result = {};
	  for (var i = 0, _string = string, length = _string.length; i < length; ++i) {
	    var char = string.charAt(i);
	    result[char] = char;
	  }
	  assert.strictEqual(Object.keys(Object.assign({}, result)).join(''), string);
	});

	if (DESCRIPTORS) {
	  QUnit.test('Function#name', function (assert) {
	    assert.ok('name' in Function.prototype);
	    // assert.nonEnumerable(Function.prototype, 'name');
	    function foo() {/* empty */}
	    assert.same(foo.name, 'foo');
	    assert.same(function () {/* empty */}.name, '');
	    if (Object.freeze) {
	      assert.same(Object.freeze(function () {/* empty */}).name, '');
	    }
	    function bar() {/* empty */}
	    bar.toString = function () {
	      throw new Error();
	    };
	    assert.notThrows(function () {
	      return bar.name === 'bar';
	    }, 'works with redefined `.toString`');
	    var baz = Object(function () {/* empty */});
	    baz.toString = function () {
	      return '';
	    };
	    assert.same(baz.name, '');
	  });
	}

	QUnit.test('Array#includes', function (assert) {
	  var includes = Array.prototype.includes;
	  assert.isFunction(includes);
	  assert.name(includes, 'includes');
	  assert.arity(includes, 1);
	  var object = {};
	  var array = [1, 2, 3, -0, object];
	  assert.ok(array.includes(1));
	  assert.ok(array.includes(-0));
	  assert.ok(array.includes(0));
	  assert.ok(array.includes(object));
	  assert.ok(!array.includes(4));
	  assert.ok(!array.includes(-0.5));
	  assert.ok(!array.includes({}));
	  assert.ok(Array(1).includes(undefined));
	  assert.ok([NaN].includes(NaN));
	  if (STRICT) {
	    assert.throws(function () {
	      return includes.call(null, 0);
	    }, TypeError);
	    assert.throws(function () {
	      return includes.call(undefined, 0);
	    }, TypeError);
	  }
	});

	function entries(obj) {
	  var resArray = new Array(); // preallocate the Array
	  if (isString(obj)) {
	    for (var i = 0; i < obj.length; i++) {
	      resArray.push([String(i), obj.substr(i, 1)]);
	    }
	  } else {
	    forOwn(obj, pushKeyValue, resArray);
	  }
	  return resArray;
	}
	function pushKeyValue(value, key) {
	  this.push([key, value]);
	}

	if (!Object$1.entries) {
	  Object$1.entries = entries;
	}

	QUnit.test('Object.entries', function (assert) {
	  assert.isFunction(Object.entries);
	  assert.arity(Object.entries, 1);
	  assert.name(Object.entries, 'entries');
	  assert.deepEqual(Object.entries({
	    q: 1,
	    w: 2,
	    e: 3
	  }), [['q', 1], ['w', 2], ['e', 3]]);
	  assert.deepEqual(Object.entries(new String('qwe')), [['0', 'q'], ['1', 'w'], ['2', 'e']]);
	  assert.deepEqual(Object.entries(Object.assign(Object.create({
	    q: 1,
	    w: 2,
	    e: 3
	  }), {
	    a: 4,
	    s: 5,
	    d: 6
	  })), [['a', 4], ['s', 5], ['d', 6]]);
	  assert.deepEqual(Object.entries({
	    valueOf: 42
	  }), [['valueOf', 42]], 'IE enum keys bug');
	  // try {
	  //   assert.deepEqual(Function('entries', `
	  //     return entries({
	  //       a: 1,
	  //       get b() {
	  //         delete this.c;
	  //         return 2;
	  //       },
	  //       c: 3
	  //     });
	  //   `)(Object.entries), [['a', 1], ['b', 2]]);
	  // } catch { /* empty */ }
	  // try {
	  //   assert.deepEqual(Function('entries', `
	  //     return entries({
	  //       a: 1,
	  //       get b() {
	  //         Object.defineProperty(this, "c", {
	  //           value: 4,
	  //           enumerable: false
	  //         });
	  //         return 2;
	  //       },
	  //       c: 3
	  //     });
	  //   `)(Object.entries), [['a', 1], ['b', 2]]);
	  // } catch { /* empty */ }
	});

	function values(obj) {
	  var r = [],
	    key;
	  if (isString(obj)) {
	    for (key = 0; key < obj.length; key++) {
	      r.push(obj.substr(key, 1));
	    }
	  } else if (Array.isArray(obj)) {
	    for (key = 0; key < obj.length; key++) {
	      r.push(obj[key]);
	    }
	  } else {
	    forOwn(obj, function (value, key) {
	      r.push(value);
	    });
	  }
	  return r;
	}

	if (!Object$1.values) {
	  Object$1.values = values;
	}

	QUnit.test('Object.values', function (assert) {
	  assert.isFunction(Object.values);
	  assert.arity(Object.values, 1);
	  assert.name(Object.values, 'values');
	  assert.looksNative(Object.values);
	  assert.nonEnumerable(Object, 'values');
	  assert.deepEqual(Object.values({
	    q: 1,
	    w: 2,
	    e: 3
	  }), [1, 2, 3]);
	  assert.deepEqual(Object.values(new String('qwe')), ['q', 'w', 'e']);
	  assert.deepEqual(Object.values(Object.assign(Object.create({
	    q: 1,
	    w: 2,
	    e: 3
	  }), {
	    a: 4,
	    s: 5,
	    d: 6
	  })), [4, 5, 6]);
	  assert.deepEqual(Object.values({
	    valueOf: 42
	  }), [42], 'IE enum keys bug');
	  // try {
	  //   assert.deepEqual(Function('values', `
	  //     return values({ a: 1, get b() {
	  //       delete this.c;
	  //       return 2;
	  //     }, c: 3 });
	  //   `)(Object.values), [1, 2]);
	  // } catch { /* empty */ }
	  // try {
	  //   assert.deepEqual(Function('values', `
	  //     return values({ a: 1, get b() {
	  //       Object.defineProperty(this, "c", {
	  //         value: 4,
	  //         enumerable: false
	  //       });
	  //       return 2;
	  //     }, c: 3 });
	  //   `)(Object.values), [1, 2]);
	  // } catch { /* empty */ }
	});

	function ff_getOwnPropertyDescriptors(obj) {
	  var ownKeys = Object.keys(obj);
	  var i = ownKeys.length;
	  var descs = {};
	  while (i-- > 0) {
	    var key = ownKeys[i];
	    var set = obj.__lookupSetter__(key);
	    var get = obj.__lookupGetter__(key);
	    if (set || get) {
	      var desc = {
	        enumerable: true,
	        configurable: true
	      };
	      desc.set = set;
	      desc.get = get;
	      descs[key] = desc;
	    }
	  }
	  return descs;
	}
	function ie_getOwnPropertyDescriptors(obj) {
	  var ownKeys = getOwnPropertyNames(obj);
	  var i = ownKeys.length;
	  var descs = {};
	  while (i-- > 0) {
	    var key = ownKeys[i];
	    descs[key] = Object.getOwnPropertyDescriptor(obj, key);
	  }
	  return descs;
	}

	if (!Object$1.getOwnPropertyDescriptors) {
	  if (defineProperty$1) {
	    Object$1.getOwnPropertyDescriptors = ie_getOwnPropertyDescriptors;
	  } else if (Object$1.prototype.__defineSetter__) {
	    Object$1.getOwnPropertyDescriptors = ff_getOwnPropertyDescriptors;
	  }
	}

	QUnit.test('Object.getOwnPropertyDescriptors', function (assert) {
	  assert.isFunction(Object.getOwnPropertyDescriptors);
	  assert.arity(Object.getOwnPropertyDescriptors, 1);
	  // assert.name(Object.getOwnPropertyDescriptors, 'getOwnPropertyDescriptors');
	  var object = Object.create({
	    q: 1
	  }, {
	    e: {
	      value: 3
	    }
	  });
	  object.w = 2;
	  var symbol = _Symbol$4('4');
	  object[symbol] = 4;
	  var descriptors = Object.getOwnPropertyDescriptors(object);
	  assert.strictEqual(descriptors.q, undefined);
	  assert.deepEqual(descriptors.w, {
	    enumerable: true,
	    configurable: true,
	    writable: true,
	    value: 2
	  });
	  if (DESCRIPTORS) {
	    assert.deepEqual(descriptors.e, {
	      enumerable: false,
	      configurable: false,
	      writable: false,
	      value: 3
	    });
	  } else {
	    assert.deepEqual(descriptors.e, {
	      enumerable: true,
	      configurable: true,
	      writable: true,
	      value: 3
	    });
	  }
	  assert.strictEqual(descriptors[symbol].value, 4);
	});
	QUnit.test('Object.getOwnPropertyDescriptors.sham flag', function (assert) {
	  assert.same(Object.getOwnPropertyDescriptors.sham, DESCRIPTORS ? undefined : true);
	});

	var repeat = String.prototype.repeat || repeat$1;

	function padStart(targetLength) {
	  var x = targetLength - this.length;
	  if (x > 0) {
	    var padString = arguments[1];
	    if (padString == null) {
	      padString = " ";
	    }
	    var len = padString.length;
	    if (len) {
	      return repeat.call(padString, Math.ceil(x / len)).substr(0, x) + this;
	    }
	  }
	  return String(this);
	}

	if (!String.prototype.padStart) {
	  String.prototype.padStart = padStart;
	}

	QUnit.test('String#padStart', function (assert) {
	  var padStart = String.prototype.padStart;
	  assert.isFunction(padStart);
	  assert.arity(padStart, 1);
	  assert.name(padStart, 'padStart');
	  assert.strictEqual('abc'.padStart(5), '  abc');
	  assert.strictEqual('abc'.padStart(4, 'de'), 'dabc');
	  assert.strictEqual('abc'.padStart(), 'abc');
	  assert.strictEqual('abc'.padStart(5, '_'), '__abc');
	  assert.strictEqual(''.padStart(0), '');
	  assert.strictEqual('foo'.padStart(1), 'foo');
	  assert.strictEqual('foo'.padStart(5, ''), 'foo');
	  if (STRICT) {
	    assert.throws(function () {
	      return padStart.call(null, 0);
	    }, TypeError);
	    assert.throws(function () {
	      return padStart.call(undefined, 0);
	    }, TypeError);
	  }
	});

	function padEnd(targetLength) {
	  var x = targetLength - this.length;
	  if (x > 0) {
	    var padString = arguments[1];
	    if (padString == null) {
	      padString = " ";
	    }
	    var len = padString.length;
	    if (len) {
	      return this + repeat.call(padString, Math.ceil(x / len)).substr(0, x);
	    }
	  }
	  return String(this);
	}

	if (!String.prototype.padEnd) {
	  String.prototype.padEnd = padEnd;
	}

	QUnit.test('String#padEnd', function (assert) {
	  var padEnd = String.prototype.padEnd;
	  assert.isFunction(padEnd);
	  assert.arity(padEnd, 1);
	  assert.name(padEnd, 'padEnd');
	  assert.strictEqual('abc'.padEnd(5), 'abc  ');
	  assert.strictEqual('abc'.padEnd(4, 'de'), 'abcd');
	  assert.strictEqual('abc'.padEnd(), 'abc');
	  assert.strictEqual('abc'.padEnd(5, '_'), 'abc__');
	  assert.strictEqual(''.padEnd(0), '');
	  assert.strictEqual('foo'.padEnd(1), 'foo');
	  assert.strictEqual('foo'.padEnd(5, ''), 'foo');
	  if (STRICT) {
	    assert.throws(function () {
	      return padEnd.call(null, 0);
	    }, TypeError);
	    assert.throws(function () {
	      return padEnd.call(undefined, 0);
	    }, TypeError);
	  }
	});

	QUnit.test('Symbol.asyncIterator', function (assert) {
	  assert.ok(!!$inject_Symbol_asyncIterator, 'Symbol.asyncIterator available');
	});

	QUnit.test('Promise#finally', function (assert) {
	  assert.isFunction(Promise.prototype.finally);
	  assert.arity(Promise.prototype.finally, 1);
	  assert.looksNative(Promise.prototype.finally);
	  assert.nonEnumerable(Promise.prototype, 'finally');
	  assert.ok(Promise.resolve(42).finally(function () {/* empty */}) instanceof Promise, 'returns a promise');
	});
	QUnit.asyncTest('Promise#finally, resolved', function (assert) {
	  expect(3);
	  var called = 0;
	  var argument = null;
	  Promise.resolve(42).finally(function (it) {
	    called++;
	    argument = it;
	  }).then(function (it) {
	    assert.same(it, 42, 'resolved with a correct value');
	    assert.same(called, 1, 'onFinally function called one time');
	    assert.same(argument, undefined, 'onFinally function called with a correct argument');
	    start();
	  });
	});
	QUnit.asyncTest('Promise#finally, rejected', function (assert) {
	  expect(2);
	  var called = 0;
	  var argument = null;
	  Promise.reject(42).finally(function (it) {
	    called++;
	    argument = it;
	  }).catch(function () {
	    assert.same(called, 1, 'onFinally function called one time');
	    assert.same(argument, undefined, 'onFinally function called with a correct argument');
	    start();
	  });
	});
	var promise = function () {
	  try {
	    return Function('return (async function () { /* empty */ })()')();
	  } catch (_unused) {/* empty */}
	}();
	if (promise && promise.constructor !== Promise) QUnit.test('Native Promise, patched', function (assert) {
	  assert.isFunction(promise.finally);
	  assert.arity(promise.finally, 1);
	  assert.looksNative(promise.finally);
	  assert.nonEnumerable(promise.constructor.prototype, 'finally');
	  function empty() {/* empty */}
	  assert.ok(promise.finally(empty) instanceof Promise, '`.finally` returns `Promise` instance #1');
	  assert.ok(new promise.constructor(empty).finally(empty) instanceof Promise, '`.finally` returns `Promise` instance #2');
	});

	if (!String.prototype.trimStart) {
	  String.prototype.trimStart = trimStart;
	}

	// deprecated
	// QUnit.test('String#trimLeft', assert => {
	// 	const { trimStart, trimLeft } = String.prototype;
	// 	assert.same(trimStart, trimLeft, 'same #trimLeft');
	// });

	QUnit.test('String#trimStart', function (assert) {
	  var trimStart = String.prototype.trimStart;
	  assert.isFunction(trimStart);
	  assert.arity(trimStart, 0);
	  assert.name(trimStart, 'trimStart');
	  assert.strictEqual(' \n  q w e \n  '.trimStart(), 'q w e \n  ', 'removes whitespaces at left & right side of string');
	  assert.strictEqual("\t".trimStart(), '', "\\u0009");
	  assert.strictEqual("\n".trimStart(), '', "\\u000A");
	  assert.strictEqual("\x0B".trimStart(), '', "\\u000B");
	  assert.strictEqual("\f".trimStart(), '', "\\u000C");
	  assert.strictEqual("\r".trimStart(), '', "\\u000D");
	  assert.strictEqual(" ".trimStart(), '', "\\u0020");
	  // assert.strictEqual("\u0085".trimStart(), '\u0085', "\\u0085 shouldn't remove");
	  assert.strictEqual("\xA0".trimStart(), '', "\\u00A0");
	  // assert.strictEqual("\u1680".trimStart(), '', '\\u1680');
	  // assert.strictEqual("\u2000".trimStart(), '', '\\u2000');
	  // assert.strictEqual("\u2001".trimStart(), '', '\\u2001');
	  // assert.strictEqual("\u2002".trimStart(), '', '\\u2002');
	  // assert.strictEqual("\u2003".trimStart(), '', '\\u2003');
	  // assert.strictEqual("\u2004".trimStart(), '', '\\u2004');
	  // assert.strictEqual("\u2005".trimStart(), '', '\\u2005');
	  // assert.strictEqual("\u2006".trimStart(), '', '\\u2006');
	  // assert.strictEqual("\u2007".trimStart(), '', '\\u2007');
	  // assert.strictEqual("\u2008".trimStart(), '', '\\u2008');
	  // assert.strictEqual("\u2009".trimStart(), '', '\\u2009');
	  // assert.strictEqual("\u200A".trimStart(), '', '\\u200A');
	  // assert.strictEqual("\u200B".trimStart(), '\u200B', "\\u200B shouldn't remove");
	  // assert.strictEqual("\u2028".trimStart(), '', '\\u2028');
	  // assert.strictEqual("\u2029".trimStart(), '', '\\u2029');
	  // assert.strictEqual("\u202F".trimStart(), '', '\\u202F');
	  // assert.strictEqual("\u205F".trimStart(), '', '\\u205F');
	  assert.strictEqual("\u3000".trimStart(), '', "\\u3000");
	  // assert.strictEqual("\uFEFF".trimStart(), '', '\\uFEFF');
	  if (STRICT) {
	    assert.throws(function () {
	      return trimStart.call(null, 0);
	    }, TypeError);
	    assert.throws(function () {
	      return trimStart.call(undefined, 0);
	    }, TypeError);
	  }
	});

	function trimEnd() {
	  return this.replace(/[\s\u2006\u3000\xA0]+$/g, '');
	}

	if (!String.prototype.trimEnd) {
	  String.prototype.trimEnd = trimEnd;
	}

	// deprecated
	// QUnit.test('String#trimRight', assert => {
	// 	const { trimEnd, trimRight } = String.prototype;
	// 	assert.same(trimEnd, trimRight, 'same #trimRight');
	// });

	QUnit.test('String#trimEnd', function (assert) {
	  var trimEnd = String.prototype.trimEnd;
	  assert.isFunction(trimEnd);
	  assert.arity(trimEnd, 0);
	  assert.name(trimEnd, 'trimEnd');
	  assert.strictEqual(' \n  q w e \n  '.trimEnd(), ' \n  q w e', 'removes whitespaces at left & right side of string');
	  assert.strictEqual("\t".trimEnd(), '', "\\u0009");
	  assert.strictEqual("\n".trimEnd(), '', "\\u000A");
	  assert.strictEqual("\x0B".trimEnd(), '', "\\u000B");
	  assert.strictEqual("\f".trimEnd(), '', "\\u000C");
	  assert.strictEqual("\r".trimEnd(), '', "\\u000D");
	  assert.strictEqual(" ".trimEnd(), '', "\\u0020");
	  // assert.strictEqual("\u0085".trimEnd(), '\u0085', "\\u0085 shouldn't remove");
	  assert.strictEqual("\xA0".trimEnd(), '', "\\u00A0");
	  // assert.strictEqual("\u1680".trimEnd(), '', '\\u1680');
	  // assert.strictEqual("\u2000".trimEnd(), '', '\\u2000');
	  // assert.strictEqual("\u2001".trimEnd(), '', '\\u2001');
	  // assert.strictEqual("\u2002".trimEnd(), '', '\\u2002');
	  // assert.strictEqual("\u2003".trimEnd(), '', '\\u2003');
	  // assert.strictEqual("\u2004".trimEnd(), '', '\\u2004');
	  // assert.strictEqual("\u2005".trimEnd(), '', '\\u2005');
	  // assert.strictEqual("\u2006".trimEnd(), '', '\\u2006');
	  // assert.strictEqual("\u2007".trimEnd(), '', '\\u2007');
	  // assert.strictEqual("\u2008".trimEnd(), '', '\\u2008');
	  // assert.strictEqual("\u2009".trimEnd(), '', '\\u2009');
	  // assert.strictEqual("\u200A".trimEnd(), '', '\\u200A');
	  // assert.strictEqual("\u200B".trimEnd(), '\u200B', "\\u200B shouldn't remove");
	  // assert.strictEqual("\u2028".trimEnd(), '', '\\u2028');
	  // assert.strictEqual("\u2029".trimEnd(), '', '\\u2029');
	  // assert.strictEqual("\u202F".trimEnd(), '', '\\u202F');
	  // assert.strictEqual("\u205F".trimEnd(), '', '\\u205F');
	  assert.strictEqual("\u3000".trimEnd(), '', "\\u3000");
	  // assert.strictEqual("\uFEFF".trimEnd(), '', '\\uFEFF');
	  if (STRICT) {
	    assert.throws(function () {
	      return trimEnd.call(null, 0);
	    }, TypeError);
	    assert.throws(function () {
	      return trimEnd.call(undefined, 0);
	    }, TypeError);
	  }
	});

	function flat() {
	  var deep = arguments[0];
	  if (deep == null) deep = 1;
	  var arr = [];
	  for (var i = 0; i < this.length; i++) {
	    var item = this[i];
	    if (Array.isArray(item) && deep > 0) {
	      arr = arr.concat(flat.call(item, deep - 1));
	    } else {
	      arr.push(item);
	    }
	  }
	  return arr;
	}

	if (!Array.prototype.flat) {
	  Array.prototype.flat = flat;
	}

	QUnit.test('Array#flat', function (assert) {
	  var flat = Array.prototype.flat;
	  assert.isFunction(flat);
	  assert.name(flat, 'flat');
	  assert.arity(flat, 0);
	  assert.deepEqual([].flat(), []);
	  var array = [1, [2, 3], [4, [5, 6]]];
	  assert.deepEqual(array.flat(0), array);
	  assert.deepEqual(array.flat(1), [1, 2, 3, 4, [5, 6]]);
	  assert.deepEqual(array.flat(), [1, 2, 3, 4, [5, 6]]);
	  assert.deepEqual(array.flat(2), [1, 2, 3, 4, 5, 6]);
	  assert.deepEqual(array.flat(3), [1, 2, 3, 4, 5, 6]);
	  assert.deepEqual(array.flat(-1), array);
	  assert.deepEqual(array.flat(Infinity), [1, 2, 3, 4, 5, 6]);
	  if (STRICT) {
	    assert.throws(function () {
	      return flat.call(null);
	    }, TypeError);
	    assert.throws(function () {
	      return flat.call(undefined);
	    }, TypeError);
	  }
	  // if(DESCRIPTORS) {
	  // 	assert.notThrows(() => flat.call(defineProperty({ length: -1 }, 0, {
	  // 		enumerable: true,
	  // 		get() {
	  // 			throw new Error();
	  // 		},
	  // 	})).length === 0, 'uses ToLength');
	  // }
	});

	var map = Array.prototype.map;

	function flatMap(fn) {
	  return flat.call(map.call(this, fn, arguments[1]), 1);
	}

	if (!Array.prototype.flatMap) {
	  Array.prototype.flatMap = flatMap;
	}

	QUnit.test('Array#flatMap', function (assert) {
	  var flatMap = Array.prototype.flatMap;
	  assert.isFunction(flatMap);
	  assert.name(flatMap, 'flatMap');
	  assert.arity(flatMap, 1);
	  assert.deepEqual([].flatMap(function (it) {
	    return it;
	  }), []);
	  assert.deepEqual([1, 2, 3].flatMap(function (it) {
	    return it;
	  }), [1, 2, 3]);
	  assert.deepEqual([1, 2, 3].flatMap(function (it) {
	    return [it, it];
	  }), [1, 1, 2, 2, 3, 3]);
	  assert.deepEqual([1, 2, 3].flatMap(function (it) {
	    return [[it], [it]];
	  }), [[1], [1], [2], [2], [3], [3]]);
	  assert.deepEqual([1, [2, 3]].flatMap(function () {
	    return 1;
	  }), [1, 1]);
	  var array = [1];
	  var context = {};
	  array.flatMap(function (value, key, that) {
	    assert.same(value, 1);
	    assert.same(key, 0);
	    assert.same(that, array);
	    assert.same(this, context);
	    return value;
	  }, context);
	  if (STRICT) {
	    assert.throws(function () {
	      return flatMap.call(null, function (it) {
	        return it;
	      });
	    }, TypeError);
	    assert.throws(function () {
	      return flatMap.call(undefined, function (it) {
	        return it;
	      });
	    }, TypeError);
	  }
	  // assert.notThrows(() => flatMap.call({ length: -1 }, () => {
	  // 	throw new Error();
	  // }).length === 0, 'uses ToLength');
	});

	QUnit.test('Symbol#description', function (assert) {
	  assert.same(_Symbol$4('foo').description, 'foo');
	  assert.same(_Symbol$4('').description, '');
	  assert.same(_Symbol$4(')').description, ')');
	  assert.same(_Symbol$4({}).description, '[object Object]');
	  assert.same(_Symbol$4(null).description, 'null');
	  assert.same(_Symbol$4(undefined).description, undefined);
	  assert.same(_Symbol$4().description, undefined);
	  assert.same(Object(_Symbol$4('foo')).description, 'foo');
	  assert.same(Object(_Symbol$4()).description, undefined);
	  // if (DESCRIPTORS) {
	  //   assert.ok(!Object.prototype.hasOwnProperty.call(Symbol('foo'), 'description'));
	  //   const descriptor = Object.getOwnPropertyDescriptor(Symbol.prototype, 'description');
	  //   assert.same(descriptor.enumerable, false);
	  //   assert.same(descriptor.configurable, true);
	  //   assert.same(typeof descriptor.get, 'function');
	  // }
	  if (_typeof(_Symbol$4()) == 'symbol') {
	    assert.same(_Symbol$4('foo').toString(), 'Symbol(foo)');
	    assert.same(String(_Symbol$4('foo')), 'Symbol(foo)');
	    assert.same(_Symbol$4('').toString(), 'Symbol()');
	    assert.same(String(_Symbol$4('')), 'Symbol()');
	    assert.same(_Symbol$4().toString(), 'Symbol()');
	    assert.same(String(_Symbol$4()), 'Symbol()');
	  }
	});

	function fromEntries(obj) {
	  var arr = Array.from(obj);
	  var len = arr.length;
	  var o = {};
	  for (var i = 0; i < len; i++) {
	    var item = arr[i];
	    if (Array.isArray(item)) {
	      o[item[0]] = item[1];
	    } else {
	      throw new TypeError("Iterator value 1 is not an entry object");
	    }
	  }
	  return o;
	}

	if (!Object$1.fromEntries) {
	  Object$1.fromEntries = fromEntries;
	}

	QUnit.test('Object.fromEntries', function (assert) {
	  assert.isFunction(Object.fromEntries);
	  assert.arity(Object.fromEntries, 1);
	  assert.name(Object.fromEntries, 'fromEntries');
	  assert.ok(Object.fromEntries([]) instanceof Object);
	  assert.same(Object.fromEntries([['foo', 1]]).foo, 1);
	  assert.same(Object.fromEntries(createIterable$1([['bar', 2]])).bar, 2);
	  var Unit = /*#__PURE__*/function () {
	    function Unit(id) {
	      this.id = id;
	    }
	    var _proto = Unit.prototype;
	    _proto.toString = function toString() {
	      return "unit" + this.id;
	    };
	    return Unit;
	  }();
	  var units = new Set([new Unit(101), new Unit(102), new Unit(103)]);
	  var object = Object.fromEntries(units.entries());
	  assert.same(object.unit101.id, 101);
	  assert.same(object.unit102.id, 102);
	  assert.same(object.unit103.id, 103);
	});

	var globalThis$1 = window.globalThis;

	if (!globalThis$1) {
	  window.globalThis = window;
	}

	QUnit.test('globalThis', function (assert) {
	  assert.same(globalThis, Object(globalThis), 'is object');
	  assert.same(globalThis.Math, Math, 'contains globals');
	});

	function matchAll(regExp) {
	  var string = this;
	  if (typeof regExp === "string") {
	    regExp = new RegExp(regExp, 'g');
	  } else if (regExp && regExp.global === false) {
	    throw new TypeError();
	  }
	  var it = {
	    next: function () {
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

	QUnit.test('String#matchAll', function (assert) {
	  var matchAll = String.prototype.matchAll;
	  var assign = Object.assign;
	  assert.isFunction(matchAll);
	  assert.arity(matchAll, 1);
	  assert.name(matchAll, 'matchAll');
	  var data = ['aabc', {
	    toString: function () {
	      return 'aabc';
	    }
	  }];
	  for (var _i = 0, _data = data; _i < _data.length; _i++) {
	    var target = _data[_i];
	    var _iterator = matchAll.call(target, /[ac]/g);
	    assert.isIterator(_iterator);
	    assert.isIterable(_iterator);
	    assert.deepEqual(_iterator.next(), {
	      value: assign(['a'], {
	        input: 'aabc',
	        index: 0
	      }),
	      done: false
	    });
	    assert.deepEqual(_iterator.next(), {
	      value: assign(['a'], {
	        input: 'aabc',
	        index: 1
	      }),
	      done: false
	    });
	    assert.deepEqual(_iterator.next(), {
	      value: assign(['c'], {
	        input: 'aabc',
	        index: 3
	      }),
	      done: false
	    });
	    assert.deepEqual(_iterator.next(), {
	      value: undefined,
	      done: true
	    });
	  }
	  var iterator = '1111a2b3cccc'.matchAll(/(\d)(\D)/g);
	  assert.isIterator(iterator);
	  assert.isIterable(iterator);
	  assert.deepEqual(iterator.next(), {
	    value: assign(['1a', '1', 'a'], {
	      input: '1111a2b3cccc',
	      index: 3
	    }),
	    done: false
	  });
	  assert.deepEqual(iterator.next(), {
	    value: assign(['2b', '2', 'b'], {
	      input: '1111a2b3cccc',
	      index: 5
	    }),
	    done: false
	  });
	  assert.deepEqual(iterator.next(), {
	    value: assign(['3c', '3', 'c'], {
	      input: '1111a2b3cccc',
	      index: 7
	    }),
	    done: false
	  });
	  assert.deepEqual(iterator.next(), {
	    value: undefined,
	    done: true
	  });
	  assert.throws(function () {
	    return '1111a2b3cccc'.matchAll(/(\d)(\D)/);
	  }, TypeError);
	  iterator = '1111a2b3cccc'.matchAll('(\\d)(\\D)');
	  assert.isIterator(iterator);
	  assert.isIterable(iterator);
	  assert.deepEqual(iterator.next(), {
	    value: assign(['1a', '1', 'a'], {
	      input: '1111a2b3cccc',
	      index: 3
	    }),
	    done: false
	  });
	  assert.deepEqual(iterator.next(), {
	    value: assign(['2b', '2', 'b'], {
	      input: '1111a2b3cccc',
	      index: 5
	    }),
	    done: false
	  });
	  assert.deepEqual(iterator.next(), {
	    value: assign(['3c', '3', 'c'], {
	      input: '1111a2b3cccc',
	      index: 7
	    }),
	    done: false
	  });
	  assert.deepEqual(iterator.next(), {
	    value: undefined,
	    done: true
	  });
	  /* IE8- issue
	  iterator = 'abc'.matchAll(/\B/g);
	  assert.isIterator(iterator);
	  assert.isIterable(iterator);
	  assert.deepEqual(iterator.next(), {
	    value: assign([''], {
	  	input: 'abc',
	  	index: 1,
	    }),
	    done: false,
	  });
	  assert.deepEqual(iterator.next(), {
	    value: assign([''], {
	  	input: 'abc',
	  	index: 2,
	    }),
	    done: false,
	  });
	  assert.deepEqual(iterator.next(), {
	    value: undefined,
	    done: true,
	  });
	  */
	  data = [null, undefined, NaN, 42, {}, []];
	  var _loop = function (target) {
	    assert.notThrows(function () {
	      return ''.matchAll(target);
	    }, "Not throws on " + target + " as the first argument");
	  };
	  for (var _i2 = 0, _data2 = data; _i2 < _data2.length; _i2++) {
	    var _target = _data2[_i2];
	    _loop(_target);
	  }
	  if (STRICT) {
	    assert.throws(function () {
	      return matchAll.call(null, /./g);
	    }, TypeError, 'Throws on null as `this`');
	    assert.throws(function () {
	      return matchAll.call(undefined, /./g);
	    }, TypeError, 'Throws on undefined as `this`');
	  }
	});

	function allSettled(promises) {
	  // if(!Array.isArray(promises)) {
	  // 	return Promise.reject(new TypeError('You must pass an array to allSettled.'));
	  // }
	  return new Promise(function (resolve, reject) {
	    var array = Array.from(promises);
	    if (array.length == 0) return resolve(array);
	    var c = 0;
	    array.forEach(function (one, index, array) {
	      if (typeof one.then === "function") {
	        one.then(function (data) {
	          c++;
	          array[index] = {
	            value: data,
	            status: 'fulfilled'
	          };
	          if (c >= array.length) {
	            resolve(array);
	          }
	        }, function (data) {
	          c++;
	          array[index] = {
	            reason: data,
	            status: 'rejected'
	          };
	          if (c >= array.length) {
	            resolve(array);
	          }
	        });
	      } else {
	        c++;
	        array[index] = {
	          value: data,
	          status: 'fulfilled'
	        };
	        if (c >= array.length) {
	          resolve(array);
	        }
	      }
	    });
	  });
	}

	if (!Promise$1.allSettled) {
	  Promise$1.allSettled = allSettled;
	}

	QUnit.test('Promise.allSettled', function (assert) {
	  assert.isFunction(Promise.allSettled);
	  assert.arity(Promise.allSettled, 1);
	  assert.looksNative(Promise.allSettled);
	  assert.nonEnumerable(Promise, 'allSettled');
	  assert.ok(Promise.allSettled([1, 2, 3]) instanceof Promise, 'returns a promise');
	});
	QUnit.asyncTest('Promise.allSettled, resolved', function (assert) {
	  expect(1);
	  Promise.allSettled([Promise.resolve(1), Promise.reject(2), Promise.resolve(3)]).then(function (it) {
	    assert.deepEqual(it, [{
	      value: 1,
	      status: 'fulfilled'
	    }, {
	      reason: 2,
	      status: 'rejected'
	    }, {
	      value: 3,
	      status: 'fulfilled'
	    }], 'resolved with a correct value');
	    start();
	  });
	});
	QUnit.asyncTest('Promise.allSettled, rejected', function (assert) {
	  expect(1);
	  Promise.allSettled().catch(function () {
	    assert.ok(true, 'rejected as expected');
	    start();
	  });
	});

	function isRegExp(obj) {
	  return Object.prototype.toString.call(obj) === '[object RegExp]';
	}
	;

	var stringEscapes = {
	  '\\': '\\',
	  "'": "'",
	  '\n': 'n',
	  '\r': 'r',
	  "\u2028": 'u2028',
	  "\u2029": 'u2029'
	};
	var regexpEscapes = {
	  '0': 'x30',
	  '1': 'x31',
	  '2': 'x32',
	  '3': 'x33',
	  '4': 'x34',
	  '5': 'x35',
	  '6': 'x36',
	  '7': 'x37',
	  '8': 'x38',
	  '9': 'x39',
	  'A': 'x41',
	  'B': 'x42',
	  'C': 'x43',
	  'D': 'x44',
	  'E': 'x45',
	  'F': 'x46',
	  'a': 'x61',
	  'b': 'x62',
	  'c': 'x63',
	  'd': 'x64',
	  'e': 'x65',
	  'f': 'x66',
	  'n': 'x6e',
	  'r': 'x72',
	  't': 'x74',
	  'u': 'x75',
	  'v': 'x76',
	  'x': 'x78'
	};
	var reRegExpChars = /^[:!,]|[\\^$.*+?()[\]{}|\/]|(^[0-9a-fA-Fnrtuvx])|([\n\r\u2028\u2029])/g;
	function escapeRegExp(str) {
	  //from lodash
	  if (str) {
	    reRegExpChars.lastIndex = 0;
	    return reRegExpChars.test(str) ? str.replace(reRegExpChars, function (chr, leadingChar, whitespaceChar) {
	      if (leadingChar) {
	        chr = regexpEscapes[chr];
	      } else if (whitespaceChar) {
	        chr = stringEscapes[chr];
	      }
	      return '\\' + chr;
	    }) : str;
	  }
	  return "(?:)";
	}
	;

	var replace = String.prototype.replace;
	function replaceAll(searchValue, replaceValue) {
	  if (isRegExp(searchValue)) {
	    if (!searchValue.global) {
	      throw new TypeError("String.prototype.replaceAll called with a non-global RegExp argument");
	    } else {
	      return this.replace(searchValue, replaceValue);
	    }
	  }
	  searchValue = new RegExp(escapeRegExp(String(searchValue)), "g");
	  return replace.call(this, searchValue, replaceValue);
	}
	;

	if (!String.prototype.replaceAll) {
	  String.prototype.replaceAll = replaceAll;
	}

	QUnit.test('String#replaceAll', function (assert) {
	  var replaceAll = String.prototype.replaceAll;
	  assert.isFunction(replaceAll);
	  assert.arity(replaceAll, 2);
	  assert.name(replaceAll, 'replaceAll');
	  assert.same('q=query+string+parameters'.replaceAll('+', ' '), 'q=query string parameters');
	  assert.same('foo'.replaceAll('o', {}), 'f[object Object][object Object]');
	  assert.same('[object Object]x[object Object]'.replaceAll({}, 'y'), 'yxy');
	  assert.same(replaceAll.call({}, 'bject', 'lolo'), '[ololo Ololo]');
	  assert.same('aba'.replaceAll('b', function (search, i, string) {
	    assert.same(search, 'b', '`search` is `b`');
	    assert.same(i, 1, '`i` is 1');
	    assert.same(String(string), 'aba', '`string` is `aba`');
	    return 'c';
	  }), 'aca');
	  assert.same('aba'.replaceAll('b'), 'aundefineda');
	  assert.same('xxx'.replaceAll('', '_'), '_x_x_x_');
	  assert.same('121314'.replaceAll('1', '$$'), '$2$3$4', '$$');
	  assert.same('121314'.replaceAll('1', '$&'), '121314', '$&');
	  assert.same('121314'.replaceAll('1', '$`'), '212312134', '$`');
	  assert.same('121314'.replaceAll('1', '$\''), '213142314344', '$\'');
	  if (STRICT) {
	    assert.throws(function () {
	      return replaceAll.call(null, 'a', 'b');
	    }, TypeError);
	    assert.throws(function () {
	      return replaceAll.call(undefined, 'a', 'b');
	    }, TypeError);
	  }
	  assert.throws(function () {
	    return 'b.b.b.b.b'.replaceAll(/\./, 'a');
	  }, TypeError);
	  assert.same('b.b.b.b.b'.replaceAll(/\./g, 'a'), 'babababab');
	  var object = {};
	  assert.same('[object Object]'.replaceAll(object, 'a'), 'a');
	});

	function inherits(clazz, superClazz) {
	  Object.setPrototypeOf(clazz, superClazz);
	  clazz.prototype = Object.create(superClazz.prototype);
	  clazz.prototype.constructor = clazz;
	}

	function AggregateError$1(errors, message) {
	  if (!(this instanceof AggregateError$1)) {
	    return new AggregateError$1(errors, message);
	  }
	  this.errors = errors;
	  this.name = "AggregateError";
	  this.message = message;
	}
	inherits(AggregateError$1, Error);

	if (!window.AggregateError) {
	  window.AggregateError = AggregateError$1;
	}

	function any(promises) {
	  // if(!Array.isArray(promises)) {
	  // 	throw new TypeError('You must pass an array to any.');
	  // }
	  // if(promises.length == 0) return Promise.reject();
	  return new Promise(function (resolve, reject) {
	    var errors = Array.from(promises);
	    if (errors.length === 0) {
	      return reject(new AggregateError(errors));
	    }
	    var c = 0;
	    errors.forEach(function (one, index, errors) {
	      if (typeof one.then === "function") {
	        one.then(function (data) {
	          resolve(data);
	        }, function (error) {
	          c++;
	          errors[index] = error;
	          if (c >= errors.length) {
	            reject(new AggregateError(errors));
	          }
	        });
	      } else {
	        resolve(one);
	      }
	    });
	  });
	}
	;

	if (!Promise$1.any) {
	  Promise$1.any = any;
	}

	QUnit.test('Promise.any', function (assert) {
	  assert.isFunction(Promise.any);
	  assert.arity(Promise.any, 1);
	  assert.looksNative(Promise.any);
	  assert.nonEnumerable(Promise, 'any');
	  assert.ok(Promise.any([1, 2, 3]) instanceof Promise, 'returns a promise');
	});
	QUnit.asyncTest('Promise.any, resolved', function (assert) {
	  expect(1);
	  Promise.any([Promise.resolve(1), Promise.reject(2), Promise.resolve(3)]).then(function (it) {
	    assert.same(it, 1, 'resolved with a correct value');
	    start();
	  });
	});
	QUnit.asyncTest('Promise.any, rejected #1', function (assert) {
	  expect(2);
	  Promise.any([Promise.reject(1), Promise.reject(2), Promise.reject(3)]).catch(function (error) {
	    assert.ok(error instanceof AggregateError, 'instanceof AggregateError');
	    assert.deepEqual(error.errors, [1, 2, 3], 'rejected with a correct value');
	    start();
	  });
	});
	QUnit.asyncTest('Promise.any, rejected #2', function (assert) {
	  expect(1);
	  Promise.any().catch(function () {
	    assert.ok(true, 'rejected as expected');
	    start();
	  });
	});
	QUnit.asyncTest('Promise.any, rejected #3', function (assert) {
	  expect(2);
	  Promise.any([]).catch(function (error) {
	    assert.ok(error instanceof AggregateError, 'instanceof AggregateError');
	    assert.deepEqual(error.errors, [], 'rejected with a correct value');
	    start();
	  });
	});

	QUnit.test('AggregateError', function (assert) {
	  assert.isFunction(AggregateError);
	  assert.arity(AggregateError, 2);
	  assert.name(AggregateError, 'AggregateError');
	  assert.looksNative(AggregateError);
	  assert.ok(new AggregateError([1]) instanceof AggregateError);
	  assert.ok(new AggregateError([1]) instanceof Error);
	  assert.ok(AggregateError([1]) instanceof AggregateError);
	  assert.ok(AggregateError([1]) instanceof Error);
	  assert.same(AggregateError([1], 'foo').message, 'foo');
	  assert.deepEqual(AggregateError([1, 2, 3]).errors, [1, 2, 3]);
	});

	// import "../web/web.url";

})();
