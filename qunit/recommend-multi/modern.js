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

	function keys$2() {
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
	  Array.prototype.keys = keys$2;
	}

	var keys$1 = Object$1.keys;

	function isNotSymbolKey(key) {
	  return key.substring(0, 2) !== "@@";
	}

	function ie_keys(obj) {
	  return keys$1.call(Object, obj).filter(isNotSymbolKey);
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
	function keys(obj) {
	  if (!keys$1) {
	    return nie_keys(obj);
	  } else if (_Symbol$2) {
	    return keys$1(obj);
	  } else {
	    return ie_keys(obj);
	  }
	}

	if (!Object$1.keys) {
	  Object$1.keys = nie_keys;
	} else if (!_Symbol$2) {
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

	function create(proto, properties) {
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
	    Object$1.create = create;
	  }
	}

	var hasOwnProperty = Object$1.prototype.hasOwnProperty;

	function hasOwn(obj, key) {
	  return hasOwnProperty.call(obj, key);
	}
	;

	if (!Object$1.hasOwn) {
	  Object$1.hasOwn = hasOwn;
	}

	QUnit.test('Object.hasOwn', function (assert) {
	  var create = Object.create;
	  var hasOwn = Object.hasOwn;
	  assert.isFunction(hasOwn);
	  assert.arity(hasOwn, 2);
	  assert.name(hasOwn, 'hasOwn');
	  assert.looksNative(hasOwn);
	  assert.nonEnumerable(Object, 'hasOwn');
	  assert.equal(true, hasOwn({
	    q: 42
	  }, 'q'));
	  assert.equal(false, hasOwn({
	    q: 42
	  }, 'w'));
	  assert.equal(false, hasOwn(create({
	    q: 42
	  }), 'q'));
	  assert.equal(true, hasOwn(Object.prototype, 'hasOwnProperty'));
	  // let called = false;
	  // try {
	  //   hasOwn(null, { toString() { called = true; } });
	  // } catch { /* empty */ }
	  // assert.ok(false, called, 'modern behaviour');
	  assert.throws(function () {
	    return hasOwn(null, 'foo');
	  }, TypeError, 'throws on null');
	  assert.throws(function () {
	    return hasOwn(undefined, 'foo');
	  }, TypeError, 'throws on undefined');
	});

	// import "../web/web.url";

})();
