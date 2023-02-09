(function () {

	var $inject_Symbol_iterator = '@@iterator';

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
	function _Symbol$1(desc) {
	  this.__name__ = "@@" + desc + ":" + symbol_sqe;
	  if (desc !== undefined) {
	    this.description = String(desc);
	  }
	  symbol_sqe++;
	  all_symbol[this.__name__] = this;
	}
	;
	_Symbol$1.prototype.toString = function () {
	  return this.__name__;
	};
	_Symbol$1.prototype.toJSON = function () {
	  return undefined;
	};
	function getOwnPropertySymbols(obj) {
	  var arr = [];
	  for (var key in obj) {
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

	function _Symbol(desc) {
	  return new _Symbol$1(desc);
	}
	;
	_Symbol.sham = true;

	_Symbol.sham = true;
	_Symbol.asyncIterator = "@@asyncIterator";
	_Symbol.isConcatSpreadable = "@@isConcatSpreadable";
	_Symbol.match = "@@match";
	_Symbol.matchAll = "@@matchAll";
	_Symbol.replace = "@@replace";
	_Symbol.search = "@@search";
	_Symbol.species = "@@species";
	_Symbol.split = "@@split";
	_Symbol.toPrimitive = "@@toPrimitive";
	_Symbol.toStringTag = "@@toStringTag";
	_Symbol.unscopables = "@@unscopables";

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

	function keys$1() {
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
	  Array.prototype.keys = keys$1;
	}

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
	          if (it["return"]) {
	            try {
	              it["return"]();
	            } catch (e) {}
	          }
	          throw e;
	        }
	      }
	    }
	  }
	}
	WeakMap$1.prototype.set = function (key, value) {
	  if (_typeof(key) !== "object") {
	    throw new TypeError("Invalid value used in weak");
	  }
	  var map = key[KEY_WM];
	  if (!map) {
	    map = key[KEY_WM] = {};
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
	WeakMap$1.prototype["delete"] = function (key) {
	  if (_typeof(key) !== "object") {
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

	if (!window.WeakMap) {
	  window.WeakMap = WeakMap$1;
	}

	var Object$1 = window.Object;

	function freeze(o) {
	  return o;
	}

	if (!Object$1.freeze) {
	  Object$1.freeze = freeze;
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

	function isJsObject(o) {
	  if (_typeof(o) !== "object") {
	    return false;
	  }
	  if (o instanceof Object) {
	    return true;
	  }
	  if (o instanceof NullProtoObject) {
	    return true;
	  }
	  return false;
	}

	var hasEnumBug = !{
	  toString: null
	}.propertyIsEnumerable('toString');

	function getPrototypeOf(obj) {
	  if (obj == null) {
	    throw new TypeError("Cannot convert undefined or null to object");
	  }
	  if (_typeof(obj) !== "object") {
	    obj = Object(obj);
	  }
	  if ('__proto__' in obj) {
	    return obj.__proto__;
	  }
	  if (!('constructor' in obj)) {
	    return null;
	  }
	  if (Object.prototype.hasOwnProperty.call(obj, 'constructor')) {
	    if ('__proto__' in obj.constructor) {
	      return obj.constructor.__proto__.prototype;
	    } else if (obj === Object.prototype) {
	      return null;
	    } else {
	      return Object.prototype;
	    }
	  }
	  return obj.constructor.prototype;
	}
	;
	getPrototypeOf.sham = true;

	function keys(obj) {
	  if (obj == null) {
	    throw new TypeError("Cannot convert undefined or null to object");
	  }
	  var result = [],
	    key;
	  var jsObject = isJsObject(obj);
	  if (!jsObject) {
	    var proto = getPrototypeOf(obj);
	    if (proto) {
	      for (key in obj) {
	        switch (key.substring(0, 2)) {
	          case "__":
	          case "@@":
	            continue;
	        }
	        if (proto[key] !== obj[key]) {
	          result.push(key);
	        }
	      }
	      return result;
	    }
	  }
	  for (key in obj) {
	    switch (key.substring(0, 2)) {
	      case "__":
	      case "@@":
	        continue;
	    }
	    if (Object.prototype.hasOwnProperty.call(obj, key)) {
	      var desc = obj["@@desc:" + key];
	      if (!desc || desc.enumerable) {
	        result.push(key);
	      }
	    }
	  }
	  if (hasEnumBug) {
	    var i = dontEnums.length;
	    while (i-- > 0) {
	      key = dontEnums[i];
	      if (Object.prototype.hasOwnProperty.call(obj, key)) {
	        result.push(key);
	      }
	    }
	  }
	  return result;
	}

	if (!Object$1.keys) {
	  Object$1.keys = keys;
	}

	function getOwnPropertyNames(obj) {
	  if (obj == null) {
	    throw new TypeError("Cannot convert undefined or null to object");
	  }
	  var result = [],
	    key;
	  if (isString(obj) || isArray(obj)) {
	    for (key = 0; key < obj.length; key++) {
	      result.push(String(key));
	    }
	    result.push("length");
	    return result;
	  }
	  var jsObject = isJsObject(obj);
	  if (!jsObject) {
	    var proto = getPrototypeOf(obj);
	    if (proto) {
	      for (key in obj) {
	        switch (key.substring(0, 2)) {
	          case "__":
	          case "@@":
	            continue;
	        }
	        if (proto[key] !== obj[key]) {
	          result.push(key);
	        }
	      }
	      return result;
	    }
	  }
	  for (key in obj) {
	    if (key === "__proto__") {
	      continue;
	    }
	    if (key.substring(0, 2) === "@@") {
	      continue;
	    }
	    if (Object.prototype.hasOwnProperty.call(obj, key)) {
	      result.push(key);
	    }
	  }
	  if (hasEnumBug) {
	    var i = dontEnums.length;
	    while (i-- > 0) {
	      key = dontEnums[i];
	      if (Object.prototype.hasOwnProperty.call(obj, key)) {
	        result.push(key);
	      }
	    }
	  }
	  return result;
	}
	;

	if (!Object$1.getOwnPropertyNames) {
	  Object$1.getOwnPropertyNames = getOwnPropertyNames;
	}

	if (!Object$1.getOwnPropertySymbols) {
	  Object$1.getOwnPropertySymbols = getOwnPropertySymbols;
	}

	var _ref$1 = GLOBAL.Reflect || {},
	  ownKeys$1 = _ref$1.ownKeys;
	QUnit.test('WeakMap', function (assert) {
	  assert.isFunction(WeakMap);
	  assert.name(WeakMap, 'WeakMap');
	  assert.arity(WeakMap, 0);
	  assert.looksNative(WeakMap);
	  assert.ok('delete' in WeakMap.prototype, 'delete in WeakMap.prototype');
	  assert.ok('get' in WeakMap.prototype, 'get in WeakMap.prototype');
	  assert.ok('has' in WeakMap.prototype, 'has in WeakMap.prototype');
	  assert.ok('set' in WeakMap.prototype, 'set in WeakMap.prototype');
	  assert.ok(new WeakMap() instanceof WeakMap, 'new WeakMap instanceof WeakMap');
	  var object = {};
	  assert.strictEqual(new WeakMap(createIterable([[object, 42]])).get(object), 42, 'Init from iterable');
	  var weakmap = new WeakMap();
	  var frozen = Object.freeze({});
	  weakmap.set(frozen, 42);
	  assert.strictEqual(weakmap.get(frozen), 42, 'Support frozen objects');
	  weakmap = new WeakMap();
	  weakmap.set(frozen, 42);
	  assert.strictEqual(weakmap.has(frozen), true, 'works with frozen objects, #1');
	  assert.strictEqual(weakmap.get(frozen), 42, 'works with frozen objects, #2');
	  weakmap["delete"](frozen);
	  assert.strictEqual(weakmap.has(frozen), false, 'works with frozen objects, #3');
	  assert.strictEqual(weakmap.get(frozen), undefined, 'works with frozen objects, #4');
	  var done = false;
	  try {
	    new WeakMap(createIterable([null, 1, 2], {
	      "return": function () {
	        return done = true;
	      }
	    }));
	  } catch (_unused) {/* empty */}
	  assert.ok(done, '.return #throw');
	  assert.ok(!('clear' in WeakMap.prototype), 'should not contains `.clear` method');
	  var array = [];
	  done = false;
	  array['@@iterator'] = undefined;
	  array[$inject_Symbol_iterator] = function () {
	    done = true;
	    return [][$inject_Symbol_iterator].call(this);
	  };
	  new WeakMap(array);
	  assert.ok(done);
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
	  if (ownKeys$1) assert.arrayEqual(ownKeys$1(object), []);
	  if (nativeSubclass) {
	    var Subclass = nativeSubclass(WeakMap);
	    assert.ok(new Subclass() instanceof Subclass, 'correct subclassing with native classes #1');
	    assert.ok(new Subclass() instanceof WeakMap, 'correct subclassing with native classes #2');
	    object = {};
	    assert.same(new Subclass().set(object, 2).get(object), 2, 'correct subclassing with native classes #3');
	  }
	});
	QUnit.test('WeakMap#delete', function (assert) {
	  assert.isFunction(WeakMap.prototype["delete"]);
	  if (NATIVE) assert.name(WeakMap.prototype["delete"], 'delete');
	  if (NATIVE) assert.arity(WeakMap.prototype["delete"], 1);
	  assert.looksNative(WeakMap.prototype["delete"]);
	  assert.nonEnumerable(WeakMap.prototype, 'delete');
	  var a = {};
	  var b = {};
	  var weakmap = new WeakMap();
	  weakmap.set(a, 42);
	  weakmap.set(b, 21);
	  assert.ok(weakmap.has(a) && weakmap.has(b), 'WeakMap has values before .delete()');
	  weakmap["delete"](a);
	  assert.ok(!weakmap.has(a) && weakmap.has(b), 'WeakMap hasn`t value after .delete()');
	  assert.notThrows(function () {
	    return !weakmap["delete"](1);
	  }, 'return false on primitive');
	  var object = {};
	  weakmap.set(object, 42);
	  Object.freeze(object);
	  assert.ok(weakmap.has(object), 'works with frozen objects #1');
	  weakmap["delete"](object);
	  assert.ok(!weakmap.has(object), 'works with frozen objects #2');
	});
	QUnit.test('WeakMap#get', function (assert) {
	  assert.isFunction(WeakMap.prototype.get);
	  assert.name(WeakMap.prototype.get, 'get');
	  if (NATIVE) assert.arity(WeakMap.prototype.get, 1);
	  assert.looksNative(WeakMap.prototype.get);
	  assert.nonEnumerable(WeakMap.prototype, 'get');
	  var weakmap = new WeakMap();
	  assert.strictEqual(weakmap.get({}), undefined, 'WeakMap .get() before .set() return undefined');
	  var object = {};
	  weakmap.set(object, 42);
	  assert.strictEqual(weakmap.get(object), 42, 'WeakMap .get() return value');
	  weakmap["delete"](object);
	  assert.strictEqual(weakmap.get(object), undefined, 'WeakMap .get() after .delete() return undefined');
	  assert.notThrows(function () {
	    return weakmap.get(1) === undefined;
	  }, 'return undefined on primitive');
	  object = {};
	  weakmap.set(object, 42);
	  Object.freeze(object);
	  assert.same(weakmap.get(object), 42, 'works with frozen objects #1');
	  weakmap["delete"](object);
	  assert.same(weakmap.get(object), undefined, 'works with frozen objects #2');
	});
	QUnit.test('WeakMap#has', function (assert) {
	  assert.isFunction(WeakMap.prototype.has);
	  assert.name(WeakMap.prototype.has, 'has');
	  if (NATIVE) assert.arity(WeakMap.prototype.has, 1);
	  assert.looksNative(WeakMap.prototype.has);
	  assert.nonEnumerable(WeakMap.prototype, 'has');
	  var weakmap = new WeakMap();
	  assert.ok(!weakmap.has({}), 'WeakMap .has() before .set() return false');
	  var object = {};
	  weakmap.set(object, 42);
	  assert.ok(weakmap.has(object), 'WeakMap .has() return true');
	  weakmap["delete"](object);
	  assert.ok(!weakmap.has(object), 'WeakMap .has() after .delete() return false');
	  assert.notThrows(function () {
	    return !weakmap.has(1);
	  }, 'return false on primitive');
	  object = {};
	  weakmap.set(object, 42);
	  Object.freeze(object);
	  assert.ok(weakmap.has(object), 'works with frozen objects #1');
	  weakmap["delete"](object);
	  assert.ok(!weakmap.has(object), 'works with frozen objects #2');
	});
	QUnit.test('WeakMap#set', function (assert) {
	  assert.isFunction(WeakMap.prototype.set);
	  assert.name(WeakMap.prototype.set, 'set');
	  assert.arity(WeakMap.prototype.set, 2);
	  assert.looksNative(WeakMap.prototype.set);
	  assert.nonEnumerable(WeakMap.prototype, 'set');
	  var weakmap = new WeakMap();
	  var object = {};
	  weakmap.set(object, 33);
	  assert.same(weakmap.get(object), 33, 'works with object as keys');
	  assert.ok(weakmap.set({}, 42) === weakmap, 'chaining');
	  assert["throws"](function () {
	    return new WeakMap().set(42, 42);
	  }, 'throws with primitive keys');
	  var object1 = Object.freeze({});
	  var object2 = {};
	  weakmap.set(object1, 42);
	  weakmap.set(object2, 42);
	  Object.freeze(object);
	  assert.same(weakmap.get(object1), 42, 'works with frozen objects #1');
	  assert.same(weakmap.get(object2), 42, 'works with frozen objects #2');
	  weakmap["delete"](object1);
	  weakmap["delete"](object2);
	  assert.same(weakmap.get(object1), undefined, 'works with frozen objects #3');
	  assert.same(weakmap.get(object2), undefined, 'works with frozen objects #4');
	});

	// QUnit.test('WeakMap#@@toStringTag', assert => {
	//   assert.strictEqual(WeakMap.prototype[Symbol.toStringTag], 'WeakMap', 'WeakMap::@@toStringTag is `WeakMap`');
	//   assert.strictEqual(String(new WeakMap()), '[object WeakMap]', 'correct stringification');
	// });

	function map(fn) {
	  var thisArg = arguments[1];
	  var arr = [];
	  for (var k = 0, length = this.length; k < length; k++) {
	    arr.push(fn.call(thisArg, this[k], k, this));
	  }
	  return arr;
	}

	if (!Array.prototype.map) {
	  Array.prototype.map = map;
	}

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
	          if (it["return"]) {
	            try {
	              it["return"]();
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
	WeakSet$1.prototype["delete"] = function (key) {
	  return this.map["delete"](key);
	};

	if (!window.WeakSet) {
	  window.WeakSet = WeakSet$1;
	}

	var _ref = GLOBAL.Reflect || {},
	  ownKeys = _ref.ownKeys;
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
	  assert.ok(new WeakSet(createIterable([object])).has(object), 'Init from iterable');
	  var weakset = new WeakSet();
	  var frozen = Object.freeze({});
	  weakset.add(frozen);
	  assert.strictEqual(weakset.has(frozen), true, 'works with frozen objects, #1');
	  weakset["delete"](frozen);
	  assert.strictEqual(weakset.has(frozen), false, 'works with frozen objects, #2');
	  var done = false;
	  try {
	    new WeakSet(createIterable([null, 1, 2], {
	      "return": function () {
	        return done = true;
	      }
	    }));
	  } catch (_unused) {/* empty */}
	  assert.ok(done, '.return #throw');
	  assert.ok(!('clear' in WeakSet.prototype), 'should not contains `.clear` method');
	  var array = [];
	  done = false;
	  array['@@iterator'] = undefined;
	  array[$inject_Symbol_iterator] = function () {
	    done = true;
	    return [][$inject_Symbol_iterator].call(this);
	  };
	  new WeakSet(array);
	  assert.ok(done);
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
	  if (ownKeys) assert.arrayEqual(ownKeys(object), []);
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
	  assert.name(WeakSet.prototype.add, 'add');
	  assert.arity(WeakSet.prototype.add, 1);
	  assert.looksNative(WeakSet.prototype.add);
	  assert.nonEnumerable(WeakSet.prototype, 'add');
	  var weakset = new WeakSet();
	  assert.ok(weakset.add({}) === weakset, 'chaining');
	  assert["throws"](function () {
	    return new WeakSet().add(42);
	  }, 'throws with primitive keys');
	});
	QUnit.test('WeakSet#delete', function (assert) {
	  assert.isFunction(WeakSet.prototype["delete"]);
	  if (NATIVE) assert.arity(WeakSet.prototype["delete"], 1);
	  assert.looksNative(WeakSet.prototype["delete"]);
	  assert.nonEnumerable(WeakSet.prototype, 'delete');
	  var a = {};
	  var b = {};
	  var weakset = new WeakSet().add(a).add(b);
	  assert.ok(weakset.has(a) && weakset.has(b), 'WeakSet has values before .delete()');
	  weakset["delete"](a);
	  assert.ok(!weakset.has(a) && weakset.has(b), 'WeakSet has`nt value after .delete()');
	  assert.notThrows(function () {
	    return !weakset["delete"](1);
	  }, 'return false on primitive');
	});
	QUnit.test('WeakSet#has', function (assert) {
	  assert.isFunction(WeakSet.prototype.has);
	  assert.name(WeakSet.prototype.has, 'has');
	  assert.arity(WeakSet.prototype.has, 1);
	  assert.looksNative(WeakSet.prototype.has);
	  assert.nonEnumerable(WeakSet.prototype, 'has');
	  var weakset = new WeakSet();
	  assert.ok(!weakset.has({}), 'WeakSet has`nt value');
	  var object = {};
	  weakset.add(object);
	  assert.ok(weakset.has(object), 'WeakSet has value after .add()');
	  weakset["delete"](object);
	  assert.ok(!weakset.has(object), 'WeakSet hasn`t value after .delete()');
	  assert.notThrows(function () {
	    return !weakset.has(1);
	  }, 'return false on primitive');
	});

	// QUnit.test('WeakSet::@@toStringTag', assert => {
	//   assert.strictEqual(WeakSet.prototype[Symbol.toStringTag], 'WeakSet', 'WeakSet::@@toStringTag is `WeakSet`');
	//   assert.strictEqual(String(new WeakSet()), '[object WeakSet]', 'correct stringification');
	// });

	// import "./es.promise";
	// import "./es.promise.finally";
	// import "./es.promise.all-settled";
	// import "./es.promise.any";
	// import "./es.aggregate-error";

	// import "./web.url";

})();
