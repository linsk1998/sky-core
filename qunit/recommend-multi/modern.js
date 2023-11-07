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

	var defineProperties = Object$1.defineProperties;

	var nonEnumerable = !!defineProperties;

	var defineProperty$1 = Object$1.defineProperty;

	var getOwnPropertyNames = Object$1.getOwnPropertyNames;

	var symbol_sqe = 0;
	var all_symbol = {};
	function _Symbol$5(desc) {
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
	_Symbol$5.prototype.toString = function () {
	  return this.__name__;
	};
	_Symbol$5.prototype.toJSON = function () {
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

	function _Symbol$4(desc) {
	  return new _Symbol$5(desc);
	}
	;
	_Symbol$4.sham = true;

	var _Symbol$3 = window.Symbol;

	function _Symbol$2(desc) {
	  if (desc == undefined) {
	    desc = "";
	  }
	  return _Symbol$3(desc);
	}
	;

	var _Symbol$1 = (function () {
	  var _Symbol;
	  if (!_Symbol$3) {
	    _Symbol = _Symbol$4;
	  } else {
	    if (String(_Symbol$3()) !== String(_Symbol$3(""))) {
	      Object.setPrototypeOf(_Symbol$2, _Symbol$3);
	      _Symbol = _Symbol$2;
	    } else {
	      _Symbol = _Symbol$3;
	    }
	  }
	  return _Symbol;
	})();

	var $inject_Symbol_iterator = (function () {
	  if (!_Symbol$3) {
	    if (nonEnumerable) {
	      defineProperty$1(Object.prototype, '@@iterator', {
	        enumerable: false,
	        configurable: false,
	        writable: true
	      });
	    }
	    return '@@iterator';
	  } else {
	    return _Symbol$3.iterator || _Symbol$3('iterator');
	  }
	})();

	function _typeof(obj) {
	  "@babel/helpers - typeof";

	  return _typeof = "function" == typeof _Symbol$1 && "symbol" == typeof $inject_Symbol_iterator ? function (obj) {
	    return typeof obj;
	  } : function (obj) {
	    return obj && "function" == typeof _Symbol$1 && obj.constructor === _Symbol$1 && obj !== _Symbol$1.prototype ? "symbol" : typeof obj;
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

	var accessor = !!defineProperties || !!Object.prototype.__defineSetter__;

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

	if (!_Symbol$3) {
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
	  var it = typeof _Symbol$1 !== "undefined" && o[$inject_Symbol_iterator] || o["@@iterator"];
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

	var forEach = Array.prototype.forEach;

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
	        forEach.call(me._resolveds, callAll, me);
	        me._resolveds = null;
	      });
	    }
	  }
	  function reject(reason) {
	    if (me._state === PENDING) {
	      me._value = reason;
	      me._state = REJECTED;
	      queueMicrotask(function () {
	        forEach.call(me._rejecteds, callAll, me);
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
	    forEach.call(promises, function (one, index) {
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
	    forEach.call(promises, function (one) {
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

	var _Symbol = GLOBAL.Symbol || {};
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
	  var FakePromise2 = FakePromise1[_Symbol.species] = function (executor) {
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
	  var iterable = createIterable([1, 2, 3]);
	  Promise.race(iterable).catch(function () {/* empty */});
	  assert.ok(iterable.received, 'works with iterables: iterator received');
	  assert.ok(iterable.called, 'works with iterables: next called');
	  var array = [];
	  var done = false;
	  array['@@iterator'] = undefined;
	  array[_Symbol.iterator] = function () {
	    done = true;
	    return [][_Symbol.iterator].call(this);
	  };
	  Promise.race(array);
	  assert.ok(done);
	  assert.throws(function () {
	    race.call(null, []).catch(function () {/* empty */});
	  }, TypeError, 'throws without context');
	  done = false;
	  try {
	    Promise.resolve = function () {
	      throw new Error();
	    };
	    Promise.race(createIterable([1, 2, 3], {
	      return: function () {
	        done = true;
	      }
	    })).catch(function () {/* empty */});
	  } catch (error) {/* empty */}
	  Promise.resolve = resolve;
	  assert.ok(done, 'iteration closing');
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

	QUnit.test('Promise.any', function (assert) {
	  assert.isFunction(Promise.any);
	  assert.arity(Promise.any, 1);
	  assert.looksNative(Promise.any);
	  assert.nonEnumerable(Promise, 'any');
	  assert.ok(Promise.any([1, 2, 3]) instanceof Promise, 'returns a promise');
	});
	QUnit.test('Promise.any, resolved', function (assert) {
	  assert.expect(1);
	  var async = assert.async();
	  Promise.any([Promise.resolve(1), Promise.reject(2), Promise.resolve(3)]).then(function (it) {
	    assert.same(it, 1, 'resolved with a correct value');
	    async();
	  });
	});
	QUnit.test('Promise.any, rejected #1', function (assert) {
	  assert.expect(2);
	  var async = assert.async();
	  Promise.any([Promise.reject(1), Promise.reject(2), Promise.reject(3)]).catch(function (error) {
	    assert.ok(error instanceof AggregateError, 'instanceof AggregateError');
	    assert.deepEqual(error.errors, [1, 2, 3], 'rejected with a correct value');
	    async();
	  });
	});
	QUnit.test('Promise.any, rejected #2', function (assert) {
	  assert.expect(1);
	  var async = assert.async();
	  Promise.any().catch(function () {
	    assert.ok(true, 'rejected as expected');
	    async();
	  });
	});
	QUnit.test('Promise.any, rejected #3', function (assert) {
	  assert.expect(2);
	  var async = assert.async();
	  Promise.any([]).catch(function (error) {
	    assert.ok(error instanceof AggregateError, 'instanceof AggregateError');
	    assert.deepEqual(error.errors, [], 'rejected with a correct value');
	    async();
	  });
	});

	// import "./es.aggregate-error";

	// import "../web/web.url";

})();
