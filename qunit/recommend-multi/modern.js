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

	function isPrimitive(value) {
	  return typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean';
	}

	var defineProperties$1 = Object$1.defineProperties;

	var nonEnumerable = !!defineProperties$1;

	var defineProperty$1 = Object$1.defineProperty;

	var getOwnPropertyNames = Object$1.getOwnPropertyNames;

	var symbol_sqe = 0;
	var all_symbol = {};
	function _Symbol$4(desc) {
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
	_Symbol$4.prototype.toString = function () {
	  return this.__name__;
	};
	_Symbol$4.prototype.toJSON = function () {
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
	      if (key in all_symbol) {
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

	function _Symbol$3(desc) {
	  return new _Symbol$4(desc);
	}
	;
	_Symbol$3.sham = true;

	var _Symbol$2 = window.Symbol;

	function _Symbol$1(desc) {
	  if (desc == undefined) {
	    desc = "";
	  }
	  return _Symbol$2(desc);
	}
	;

	var _Symbol = (function () {
	  var _Symbol;
	  if (!_Symbol$2) {
	    _Symbol = _Symbol$3;
	  } else {
	    if (String(_Symbol$2()) !== String(_Symbol$2(""))) {
	      Object.setPrototypeOf(_Symbol$1, _Symbol$2);
	      _Symbol = _Symbol$1;
	    } else {
	      _Symbol = _Symbol$2;
	    }
	  }
	  return _Symbol;
	})();

	var $inject_Symbol_iterator = (function () {
	  if (!_Symbol$2) {
	    if (nonEnumerable) {
	      defineProperty$1(Object.prototype, '@@iterator', {
	        enumerable: false,
	        configurable: false,
	        writable: true
	      });
	    }
	    return '@@iterator';
	  } else {
	    return _Symbol$2.iterator || _Symbol$2('iterator');
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

	if (!_Symbol$2) {
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
	function includes(target, wanted) {
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

	if (!Object$1.getOwnPropertySymbols) {
	  Object$1.getOwnPropertySymbols = getOwnPropertySymbols;
	}

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

	var keys$2 = Object$1.keys;

	function isNotSymbolKey(key) {
	  return key.substring(0, 2) !== "@@";
	}

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
	  } else if (_Symbol$2) {
	    return keys$2(obj);
	  } else {
	    return ie_keys(obj);
	  }
	}

	if (!Object$1.keys) {
	  Object$1.keys = nie_keys;
	} else if (!_Symbol$2) {
	  Object$1.keys = ie_keys;
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
	    var c = _Symbol('c');
	    var d = _Symbol('d');
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
	    assert.strictEqual(object2[d], undefined, 'defineProperty 不允许使用Symbol');
	    try {
	      assert.strictEqual(Function('assign', "\n        return assign({ b: 1 }, { get a() {\n          delete this.b;\n        }, b: 2 });\n      ")(Object.assign).b, 1);
	    } catch (_unused) {/* empty */}
	    try {
	      assert.strictEqual(Function('assign', "\n        return assign({ b: 1 }, { get a() {\n          Object.defineProperty(this, \"b\", {\n            value: 3,\n            enumerable: false\n          });\n        }, b: 2 });\n      ")(Object.assign).b, 1);
	    } catch (_unused2) {/* empty */}
	  }
	  string = 'abcdefghijklmnopqrst';
	  var result = {};
	  for (var i = 0, _string = string, length = _string.length; i < length; ++i) {
	    var char = string.charAt(i);
	    result[char] = char;
	  }
	  assert.strictEqual(Object.keys(Object.assign({}, result)).join(''), string);
	});

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
	  if (!_Symbol$2) {
	    Object$1.getOwnPropertyNames = ie_getOwnPropertyNames;
	  }
	} else {
	  if (Object$1.prototype.__defineSetter__) {
	    Object$1.getOwnPropertyNames = ff_getOwnPropertyNames;
	  }
	}

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
	} else if (!setPrototypeOf) {
	  Object$1.getPrototypeOf = ie_getPrototypeOf;
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
	function create(proto, properties) {
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
	create.sham = true;

	if (!Object$1.create) {
	  if ('__proto__' in Object$1.prototype) {
	    Object$1.create = create;
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

	function entries$1(obj) {
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
	  Object$1.entries = entries$1;
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
	  try {
	    assert.deepEqual(Function('entries', "\n      return entries({\n        a: 1,\n        get b() {\n          delete this.c;\n          return 2;\n        },\n        c: 3\n      });\n    ")(Object.entries), [['a', 1], ['b', 2]]);
	  } catch (_unused) {/* empty */}
	  try {
	    assert.deepEqual(Function('entries', "\n      return entries({\n        a: 1,\n        get b() {\n          Object.defineProperty(this, \"c\", {\n            value: 4,\n            enumerable: false\n          });\n          return 2;\n        },\n        c: 3\n      });\n    ")(Object.entries), [['a', 1], ['b', 2]]);
	  } catch (_unused2) {/* empty */}
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

	var isNaN$3 = window.isNaN;

	function isNaN$2(value) {
	  return typeof value === "number" && isNaN$3(value);
	}

	if (!Number$1.isNaN) {
	  Number$1.isNaN = isNaN$2;
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
	  Map.prototype.entries = entries;
	  Map.prototype.keys = keys;
	  Map.prototype.values = values$1;
	  Map.prototype['@@iterator'] = entries;
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
	function entries() {
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
	  Set.prototype.entries = entries;
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

	if (!_Symbol$2) {
	  if (Set$1 && (Set$1.prototype.iterator || Set$1.prototype['@@iterator'])) {
	    window.Set = fixSet();
	  } else {
	    window.Set = createSet();
	  }
	} else {
	  if (!_Symbol$2.iterator) {
	    _Symbol$2.iterator = _Symbol$2('iterator');
	  }
	  if (!Set$1.prototype[_Symbol$2.iterator]) {
	    Set$1.prototype[_Symbol$2.iterator] = Set$1.prototype.values;
	  }
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
	  var primitives = [42, 'foo', false];
	  var _loop = function (value) {
	    assert.notThrows(function () {
	      return Object.getOwnPropertyDescriptor(value) || true;
	    });
	  };
	  for (var _i = 0, _primitives = primitives; _i < _primitives.length; _i++) {
	    var value = _primitives[_i];
	    _loop(value);
	  }
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
	  var ownKeys = Object.getOwnPropertyNames(obj);
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
	  assert.name(Object.getOwnPropertyDescriptors, 'getOwnPropertyDescriptors');
	  var object = Object.create({
	    q: 1
	  }, {
	    e: {
	      value: 3
	    }
	  });
	  object.w = 2;
	  var symbol = _Symbol('4');
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

	QUnit.test('Object.getOwnPropertyNames', function (assert) {
	  assert.isFunction(Object.getOwnPropertyNames);
	  assert.arity(Object.getOwnPropertyNames, 1);
	  assert.name(Object.getOwnPropertyNames, 'getOwnPropertyNames');
	  function F1() {
	    this.w = 1;
	  }
	  function F2() {
	    this.toString = 1;
	  }
	  F1.prototype.q = F2.prototype.q = 1;
	  var names = Object.getOwnPropertyNames([1, 2, 3]);
	  assert.strictEqual(names.length, 4);
	  assert.ok(includes(names, '0'));
	  assert.ok(includes(names, '1'));
	  assert.ok(includes(names, '2'));
	  assert.ok(includes(names, 'length'));
	  assert.deepEqual(Object.getOwnPropertyNames(new F1()), ['w']);
	  assert.deepEqual(Object.getOwnPropertyNames(new F2()), ['toString']);
	  // assert.ok(includes(Object.getOwnPropertyNames(Array.prototype), 'toString'));
	  // assert.ok(includes(Object.getOwnPropertyNames(Object.prototype), 'toString'));
	  // assert.ok(includes(Object.getOwnPropertyNames(Object.prototype), 'constructor'));
	  var primitives = [42, 'foo', false];
	  var _loop = function (value) {
	    assert.notThrows(function () {
	      return Object.getOwnPropertyNames(value);
	    }, "accept " + _typeof(value));
	  };
	  for (var _i = 0, _primitives = primitives; _i < _primitives.length; _i++) {
	    var value = _primitives[_i];
	    _loop(value);
	  }
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

	QUnit.test('Object.getPrototypeOf', function (assert) {
	  assert.isFunction(Object.getPrototypeOf);
	  assert.arity(Object.getPrototypeOf, 1);
	  assert.name(Object.getPrototypeOf, 'getPrototypeOf');
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
	  var primitives = [42, 'foo', false];
	  var _loop = function (value) {
	    assert.notThrows(function () {
	      return Object.getPrototypeOf(value);
	    }, "accept " + _typeof(value) + " \u4E0D\u652F\u6301");
	  };
	  for (var _i = 0, _primitives = primitives; _i < _primitives.length; _i++) {
	    var value = _primitives[_i];
	    _loop(value);
	  }
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

	QUnit.test('Object.keys', function (assert) {
	  assert.isFunction(Object.keys);
	  assert.arity(Object.keys, 1);
	  assert.name(Object.keys, 'keys');
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
	  assert.ok(!includes(Object.keys(Array.prototype), 'push'));
	  var primitives = [42, 'foo', false];
	  var _loop = function (value) {
	    assert.notThrows(function () {
	      return Object.keys(value);
	    }, "accept " + _typeof(value) + " \u4E0D\u652F\u6301");
	  };
	  for (var _i = 0, _primitives = primitives; _i < _primitives.length; _i++) {
	    var value = _primitives[_i];
	    _loop(value);
	  }
	  assert.throws(function () {
	    return Object.keys(null);
	  }, TypeError, 'throws on null');
	  assert.throws(function () {
	    return Object.keys(undefined);
	  }, TypeError, 'throws on undefined');
	});

	if (PROTO) QUnit.test('Object.setPrototypeOf', function (assert) {
	  assert.isFunction(Object.setPrototypeOf);
	  assert.arity(Object.setPrototypeOf, 2);
	  assert.name(Object.setPrototypeOf, 'setPrototypeOf');
	  assert.looksNative(Object.setPrototypeOf);
	  assert.nonEnumerable(Object, 'setPrototypeOf');
	  assert.ok('apply' in Object.setPrototypeOf({}, Function.prototype), 'Parent properties in target');
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
	  assert.ok(!('toString' in Object.setPrototypeOf({}, null)), 'Can set null as prototype');
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
	  try {
	    assert.deepEqual(Function('values', "\n      return values({ a: 1, get b() {\n        delete this.c;\n        return 2;\n      }, c: 3 });\n    ")(Object.values), [1, 2]);
	  } catch (_unused) {/* empty */}
	  try {
	    assert.deepEqual(Function('values', "\n      return values({ a: 1, get b() {\n        Object.defineProperty(this, \"c\", {\n          value: 4,\n          enumerable: false\n        });\n        return 2;\n      }, c: 3 });\n    ")(Object.values), [1, 2]);
	  } catch (_unused2) {/* empty */}
	});

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
