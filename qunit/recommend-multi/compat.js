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

	function indexOf(e) {
	  var fromIndex = 0;
	  if (arguments.length > 1) {
	    fromIndex = 0 + arguments[1];
	    if (fromIndex < 0) {
	      fromIndex += this.length;
	      if (fromIndex < 0) {
	        fromIndex = 0;
	      }
	    }
	  }
	  for (var i = fromIndex; i < this.length; i++) {
	    if (i in this && this[i] === e) {
	      return i;
	    }
	  }
	  return -1;
	}

	if (!Array.prototype.indexOf) {
	  Array.prototype.indexOf = indexOf;
	}

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

	var Object$1 = window.Object;

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

	var defineProperty$1 = Object$1.defineProperty;

	function ie8_defineProperty(obj, prop, descriptor) {
	  if (obj instanceof Object || obj instanceof NullProtoObject) {
	    compat_defineProperty.apply(Object, arguments);
	  } else {
	    delete descriptor.enumerable;
	    defineProperty$1.apply(Object, arguments);
	  }
	  return obj;
	}
	;
	function defineProperty(obj, prop, description) {
	  if (defineProperty$1) {
	    if (obj instanceof Object || obj instanceof NullProtoObject) {
	      compat_defineProperty.apply(Object, arguments);
	    } else {
	      delete description.enumerable;
	      defineProperty$1.apply(Object, arguments);
	    }
	  } else {
	    compat_defineProperty.apply(Object, arguments);
	  }
	  return obj;
	}
	;
	function compat_defineProperty(obj, prop, description) {
	  if (_typeof(obj) !== "object") {
	    throw new TypeError("Object.defineProperty called on non-object");
	  }
	  prop = String(prop);
	  var descriptor = {
	    configurable: true,
	    enumerable: true,
	    writable: true
	  };
	  if ('value' in description) {
	    obj[prop] = description.value;
	    descriptor.value = description.value;
	  } else {
	    console.warn("ES3 do NOT support accessor.");
	    descriptor.get = description.get;
	    descriptor.set = description.set;
	  }
	  obj['@@desc:' + prop] = descriptor;
	  return obj;
	}
	;

	if (Object$1.defineProperty) {
	  Object$1.defineProperty = ie8_defineProperty;
	} else {
	  Object$1.defineProperty = compat_defineProperty;
	}
	Object$1.defineProperty.sham = true;

	var defineProperties$1 = Object$1.defineProperties;

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
	  Object$1.create = create;
	}

	function map$1(fn) {
	  var thisArg = arguments[1];
	  var arr = [];
	  for (var k = 0, length = this.length; k < length; k++) {
	    arr.push(fn.call(thisArg, this[k], k, this));
	  }
	  return arr;
	}

	if (!Array.prototype.map) {
	  Array.prototype.map = map$1;
	}

	function forEach$1(callback) {
	  var thisArg = arguments[1];
	  for (var i = 0; i < this.length; i++) {
	    if (i in this) {
	      callback.call(thisArg, this[i], i, this);
	    }
	  }
	}

	if (!Array.prototype.forEach) {
	  Array.prototype.forEach = forEach$1;
	}

	var map = Array.prototype.map || map$1;

	function findIndex$1(callback) {
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
	  Array.prototype.findIndex = findIndex$1;
	}

	var findIndex = Array.prototype.findIndex || findIndex$1;

	var forEach = Array.prototype.forEach || forEach$1;

	function some$1(fn) {
	  var thisArg = arguments[1];
	  var passed = false;
	  for (var k = 0, length = this.length; k < length; k++) {
	    if (passed === true) break;
	    passed = !!fn.call(thisArg, this[k], k, this);
	  }
	  return passed;
	}

	if (!Array.prototype.some) {
	  Array.prototype.some = some$1;
	}

	var some = Array.prototype.some || some$1;

	function URLSearchParams$1(paramsString) {
	  this._data = new Array();
	  if (paramsString) {
	    var i, pair;
	    if (Array.isArray(paramsString)) {
	      i = this._data.length = paramsString.length;
	      while (i-- > 0) {
	        pair = paramsString[i];
	        this._data[i] = new Array(pairs[1], pairs[0]);
	      }
	    } else {
	      var pairs = paramsString.split("&");
	      i = this._data.length = pairs.length;
	      while (i-- > 0) {
	        pair = pairs[i];
	        if (pair) {
	          var id = pair.indexOf("=");
	          this._data[i] = new Array(decodeURIComponent(pair.substring(id + 1, pair.length)), decodeURIComponent(pair.substring(0, id)));
	        }
	      }
	    }
	  }
	}
	;
	URLSearchParams$1.prototype.append = function (key, value) {
	  this._data.push([value, key]);
	};
	URLSearchParams$1.prototype.get = function (key) {
	  var index = findIndex.call(this._data, function (item) {
	    return item[1] == key;
	  });
	  if (index < 0) return null;
	  return this._data[index][0];
	};
	URLSearchParams$1.prototype.getAll = function (key) {
	  var data = this._data,
	    len = data.length;
	  var r = [];
	  for (var i = 0; i < len; i++) {
	    var item = data[i];
	    if (item[1] == key) {
	      r.push(item[0]);
	    }
	  }
	  return r;
	};
	URLSearchParams$1.prototype.set = function (key, value) {
	  var index = findIndex.call(this._data, function (item) {
	    return item[1] == key;
	  });
	  if (index < 0) {
	    this.append(key, value);
	  } else {
	    this._data[index][0] = value;
	  }
	};
	URLSearchParams$1.prototype["delete"] = function (key) {
	  var data = this._data,
	    i = data.length;
	  while (i-- > 0) {
	    var item = data[i];
	    if (item[1] == key) {
	      data.splice(i, 1);
	    }
	  }
	};
	URLSearchParams$1.prototype.has = function (key) {
	  return some.call(this._data, function (item) {
	    return item[1] == key;
	  });
	};
	URLSearchParams$1.prototype.toString = function () {
	  return this._data.map.call(this._data, function (item) {
	    return encodeURIComponent(item[1]) + "=" + encodeURIComponent(item[0]);
	  }).join("&");
	};
	URLSearchParams$1.prototype.sort = function () {
	  return this._data.sort(function (a, b) {
	    return a[1] > b[1];
	  });
	};
	URLSearchParams$1.prototype.forEach = function (fn) {
	  forEach.apply(this._data, fn, arguments[1]);
	};

	if (!window.URLSearchParams) {
	  window.URLSearchParams = URLSearchParams$1;
	}

	function SearchParams(url) {
	  this.url = url;
	}
	;
	SearchParams.prototype = Object.create(URLSearchParams.prototype);
	forEach.call(["append", "set", "delete"], function (method) {
	  this[method] = function (key, value) {
	    var searchParams = new URLSearchParams(this.url.search.replace(/^\?/, ""));
	    searchParams[method].apply(searchParams, arguments);
	    this.url.search = "?" + searchParams.toString();
	  };
	}, SearchParams.prototype);
	forEach.call(["getAll", "get", "has", "toString", "forEach"], function (method) {
	  this[method] = function (key, value) {
	    var searchParams = new URLSearchParams(this.url.search.replace(/^\?/, ""));
	    return searchParams[method].apply(searchParams, arguments);
	  };
	}, SearchParams.prototype);

	function URL$2(relativePath, absolutePath) {
	  var path, arr;
	  this.port = this.search = this.hash = this.username = this.password = "";
	  this.searchParams = new SearchParams(this);
	  var pattern = /^[a-zA-Z]+:/;
	  if (arr = relativePath.match(pattern)) {
	    this.protocol = arr[0];
	    path = relativePath.replace(pattern, "");
	    pattern = /^\/*([^\/]+)/;
	    var host = path.match(pattern)[1];
	    path = path.replace(pattern, "");
	    arr = host.split("@");
	    if (arr.length > 1) {
	      this.host = arr[1];
	      arr = arr[0].split(":");
	      if (arr.length > 1) {
	        this.username = arr[0];
	        this.password = arr[1];
	      } else {
	        this.username = arr[0];
	      }
	    } else {
	      this.host = host;
	    }
	  } else if (absolutePath) {
	    var absInfo = absolutePath.indexOf ? new URL$2(absolutePath) : absolutePath;
	    if (absInfo.hostname) {
	      this.hostname = absInfo.hostname;
	      this.port = absInfo.port;
	    } else {
	      this.host = absInfo.host;
	    }
	    this.protocol = absInfo.protocol;
	    if (absInfo.username) this.username = absInfo.username;
	    if (absInfo.password) this.password = absInfo.password;
	    this.pathname = absInfo.pathname;
	    if (relativePath.startsWith("#")) {
	      this.search = absInfo.search;
	      this.hash = relativePath;
	      return this;
	    } else if (relativePath.startsWith("?")) {
	      var a = relativePath.indexOf("#");
	      if (a < 0) {
	        this.search = relativePath;
	        this.hash = "";
	      } else {
	        this.search = relativePath.substr(0, a);
	        this.hash = relativePath.substring(a, relativePath.length);
	      }
	      return this;
	    } else if (relativePath.startsWith("/")) {
	      path = relativePath;
	    } else if (relativePath.startsWith("../")) {
	      path = absInfo.pathname.replace(/\/[^\/]*$/, "/") + relativePath;
	      pattern = /[^\/]+\/\.\.\//;
	      while (pattern.test(path)) {
	        path = path.replace(pattern, "");
	      }
	      path = path.replace(/^(\/\.\.)+/, "");
	    } else {
	      path = absInfo.pathname.replace(/[^\/]*$/, "") + relativePath.replace(/^\.\//, "");
	    }
	  } else {
	    throw new TypeError("Invalid URL");
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
	;
	var URLProperties = {
	  host: {
	    enumerable: true,
	    get: function () {
	      if (this.port) {
	        return this.hostname + ":" + this.port;
	      }
	      return this.hostname;
	    },
	    set: function (value) {
	      var pattern = /(.*):(\d+)$/;
	      var arr = value.match(pattern);
	      this.port = "";
	      if (arr) {
	        this.hostname = arr[1];
	        this.port = arr[2];
	      } else {
	        this.hostname = value;
	      }
	    }
	  },
	  origin: {
	    enumerable: true,
	    get: function () {
	      return this.protocol + "//" + this.host;
	    }
	  },
	  href: {
	    enumerable: true,
	    get: function () {
	      var user = this.username;
	      if (user) {
	        if (this.password) {
	          user += ":" + this.password;
	        }
	        user += "@";
	      }
	      return this.protocol + "//" + user + this.host + this.pathname + this.search + this.hash;
	    },
	    set: function (value) {
	      var url = new URL$2(value);
	      if (url.hostname) {
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
	function getSearchParams() {
	  var searchParams = new SearchParams(this);
	  Object.defineProperty(this, "searchParams", {
	    enumerable: true,
	    value: searchParams
	  });
	  return searchParams;
	}

	function initURL() {
	  try {
	    window.execScript("var VBURLProperties;", "JScript");
	    window.execScript([
	    //'Dim VBURLProperties',
	    'Class VBURL', '	Public [constructor]', '	Public [protocol]', '	Public [hostname]', '	Public [port]', '	Public [pathname]', '	Public [search]', '	Public [searchParams]', '	Public [hash]', '	Public [username]', '	Public [password]', '	Public Property Let [host](var)', '		Call VBURLProperties.host.set.call(Me,var)', '	End Property', '	Public Property Get [host]', '		[host]=VBURLProperties.host.get.call(Me)', '	End Property', '	Public Property Get [origin]', '		[origin]=VBURLProperties.origin.get.call(Me)', '	End Property', '	Public Property Let [href](var)', '		Call VBURLProperties.href.set.call(Me,var)', '	End Property', '	Public Property Get [href]', '		[href]=VBURLProperties.href.get.call(Me)', '	End Property', 'End Class', 'Function VBUrlFactory(url)', '	Set VBUrlFactory = New VBURL', 'End Function'].join('\n'), 'VBScript');
	    window.VBURLProperties = URLProperties;
	  } catch (e) {
	    window.VBUrlFactory = function (url) {
	      if (url.host) {
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
	  var url = new URL$2(relativePath, absolutePath);
	  var o = VBUrlFactory(url);
	  if (url.host) {
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

	if (!window.URL) {
	  initURL();
	  window.URL = URL$1;
	}

	var getOwnPropertyDescriptor$1 = Object$1.getOwnPropertyDescriptor;

	function getOwnPropertyDescriptor(obj, prop) {
	  if (obj == null) {
	    throw new TypeError("Cannot convert undefined or null to object");
	  }
	  if (_typeof(obj) !== "object") {
	    return;
	  }
	  var key = '@@desc:' + prop;
	  if (key in obj) {
	    var descriptor = obj[key];
	    if ('value' in descriptor) {
	      descriptor.value = obj[prop];
	    }
	    return descriptor;
	  }
	  if (Object.prototype.hasOwnProperty.call(obj, prop)) {
	    return {
	      value: obj[prop],
	      writable: true,
	      enumerable: String(prop).substring(0, 2) !== "__",
	      configurable: true
	    };
	  }
	}
	;
	getOwnPropertyDescriptor.sham = true;
	function ie8_getOwnPropertyDescriptor(obj, prop) {
	  if (obj instanceof Object || obj instanceof NullProtoObject) {
	    return getOwnPropertyDescriptor.apply(Object, arguments);
	  } else {
	    if (obj == null) {
	      throw new TypeError("Cannot convert undefined or null to object");
	    }
	    if (_typeof(obj) !== "object") {
	      return;
	    }
	    return getOwnPropertyDescriptor$1.apply(Object, arguments);
	  }
	}
	;
	ie8_getOwnPropertyDescriptor.sham = true;

	if (Object$1.getOwnPropertyDescriptor) {
	  Object$1.getOwnPropertyDescriptor = ie8_getOwnPropertyDescriptor;
	} else {
	  Object$1.getOwnPropertyDescriptor = getOwnPropertyDescriptor;
	}

	/* eslint-disable no-script-url -- required for testing */
	var urlTestData = ['# Based on http://trac.webkit.org/browser/trunk/LayoutTests/fast/url/script-tests/segments.js', {
	  input: 'http://example\t.\norg',
	  base: 'http://example.org/foo/bar',
	  href: 'http://example.org/',
	  origin: 'http://example.org',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.org',
	  hostname: 'example.org',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://user:pass@foo:21/bar;par?b#c',
	  base: 'http://example.org/foo/bar',
	  href: 'http://user:pass@foo:21/bar;par?b#c',
	  origin: 'http://foo:21',
	  protocol: 'http:',
	  username: 'user',
	  password: 'pass',
	  host: 'foo:21',
	  hostname: 'foo',
	  port: '21',
	  pathname: '/bar;par',
	  search: '?b',
	  hash: '#c'
	}, {
	  input: 'https://test:@test',
	  base: 'about:blank',
	  href: 'https://test@test/',
	  origin: 'https://test',
	  protocol: 'https:',
	  username: 'test',
	  password: '',
	  host: 'test',
	  hostname: 'test',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'https://:@test',
	  base: 'about:blank',
	  href: 'https://test/',
	  origin: 'https://test',
	  protocol: 'https:',
	  username: '',
	  password: '',
	  host: 'test',
	  hostname: 'test',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'non-special://test:@test/x',
	  base: 'about:blank',
	  href: 'non-special://test@test/x',
	  origin: 'null',
	  protocol: 'non-special:',
	  username: 'test',
	  password: '',
	  host: 'test',
	  hostname: 'test',
	  port: '',
	  pathname: '/x',
	  search: '',
	  hash: ''
	}, {
	  input: 'non-special://:@test/x',
	  base: 'about:blank',
	  href: 'non-special://test/x',
	  origin: 'null',
	  protocol: 'non-special:',
	  username: '',
	  password: '',
	  host: 'test',
	  hostname: 'test',
	  port: '',
	  pathname: '/x',
	  search: '',
	  hash: ''
	}, {
	  input: 'http:foo.com',
	  base: 'http://example.org/foo/bar',
	  href: 'http://example.org/foo/foo.com',
	  origin: 'http://example.org',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.org',
	  hostname: 'example.org',
	  port: '',
	  pathname: '/foo/foo.com',
	  search: '',
	  hash: ''
	}, {
	  input: '\t   :foo.com   \n',
	  base: 'http://example.org/foo/bar',
	  href: 'http://example.org/foo/:foo.com',
	  origin: 'http://example.org',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.org',
	  hostname: 'example.org',
	  port: '',
	  pathname: '/foo/:foo.com',
	  search: '',
	  hash: ''
	}, {
	  input: ' foo.com  ',
	  base: 'http://example.org/foo/bar',
	  href: 'http://example.org/foo/foo.com',
	  origin: 'http://example.org',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.org',
	  hostname: 'example.org',
	  port: '',
	  pathname: '/foo/foo.com',
	  search: '',
	  hash: ''
	}, {
	  input: 'a:\t foo.com',
	  base: 'http://example.org/foo/bar',
	  href: 'a: foo.com',
	  origin: 'null',
	  protocol: 'a:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: ' foo.com',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://f:21/ b ? d # e ',
	  base: 'http://example.org/foo/bar',
	  href: 'http://f:21/%20b%20?%20d%20#%20e',
	  origin: 'http://f:21',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'f:21',
	  hostname: 'f',
	  port: '21',
	  pathname: '/%20b%20',
	  search: '?%20d%20',
	  hash: '#%20e'
	}, {
	  input: 'lolscheme:x x#x x',
	  base: 'about:blank',
	  href: 'lolscheme:x x#x%20x',
	  protocol: 'lolscheme:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: 'x x',
	  search: '',
	  hash: '#x%20x'
	}, {
	  input: 'http://f:/c',
	  base: 'http://example.org/foo/bar',
	  href: 'http://f/c',
	  origin: 'http://f',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'f',
	  hostname: 'f',
	  port: '',
	  pathname: '/c',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://f:0/c',
	  base: 'http://example.org/foo/bar',
	  href: 'http://f:0/c',
	  origin: 'http://f:0',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'f:0',
	  hostname: 'f',
	  port: '0',
	  pathname: '/c',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://f:00000000000000/c',
	  base: 'http://example.org/foo/bar',
	  href: 'http://f:0/c',
	  origin: 'http://f:0',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'f:0',
	  hostname: 'f',
	  port: '0',
	  pathname: '/c',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://f:00000000000000000000080/c',
	  base: 'http://example.org/foo/bar',
	  href: 'http://f/c',
	  origin: 'http://f',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'f',
	  hostname: 'f',
	  port: '',
	  pathname: '/c',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://f:b/c',
	  base: 'http://example.org/foo/bar',
	  failure: true
	}, {
	  input: 'http://f: /c',
	  base: 'http://example.org/foo/bar',
	  failure: true
	}, {
	  input: 'http://f:\n/c',
	  base: 'http://example.org/foo/bar',
	  href: 'http://f/c',
	  origin: 'http://f',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'f',
	  hostname: 'f',
	  port: '',
	  pathname: '/c',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://f:fifty-two/c',
	  base: 'http://example.org/foo/bar',
	  failure: true
	}, {
	  input: 'http://f:999999/c',
	  base: 'http://example.org/foo/bar',
	  failure: true
	}, {
	  input: 'non-special://f:999999/c',
	  base: 'http://example.org/foo/bar',
	  failure: true
	}, {
	  input: 'http://f: 21 / b ? d # e ',
	  base: 'http://example.org/foo/bar',
	  failure: true
	}, {
	  input: '',
	  base: 'http://example.org/foo/bar',
	  href: 'http://example.org/foo/bar',
	  origin: 'http://example.org',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.org',
	  hostname: 'example.org',
	  port: '',
	  pathname: '/foo/bar',
	  search: '',
	  hash: ''
	}, {
	  input: '  \t',
	  base: 'http://example.org/foo/bar',
	  href: 'http://example.org/foo/bar',
	  origin: 'http://example.org',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.org',
	  hostname: 'example.org',
	  port: '',
	  pathname: '/foo/bar',
	  search: '',
	  hash: ''
	}, {
	  input: ':foo.com/',
	  base: 'http://example.org/foo/bar',
	  href: 'http://example.org/foo/:foo.com/',
	  origin: 'http://example.org',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.org',
	  hostname: 'example.org',
	  port: '',
	  pathname: '/foo/:foo.com/',
	  search: '',
	  hash: ''
	}, {
	  input: ':foo.com\\',
	  base: 'http://example.org/foo/bar',
	  href: 'http://example.org/foo/:foo.com/',
	  origin: 'http://example.org',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.org',
	  hostname: 'example.org',
	  port: '',
	  pathname: '/foo/:foo.com/',
	  search: '',
	  hash: ''
	}, {
	  input: ':',
	  base: 'http://example.org/foo/bar',
	  href: 'http://example.org/foo/:',
	  origin: 'http://example.org',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.org',
	  hostname: 'example.org',
	  port: '',
	  pathname: '/foo/:',
	  search: '',
	  hash: ''
	}, {
	  input: ':a',
	  base: 'http://example.org/foo/bar',
	  href: 'http://example.org/foo/:a',
	  origin: 'http://example.org',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.org',
	  hostname: 'example.org',
	  port: '',
	  pathname: '/foo/:a',
	  search: '',
	  hash: ''
	}, {
	  input: ':/',
	  base: 'http://example.org/foo/bar',
	  href: 'http://example.org/foo/:/',
	  origin: 'http://example.org',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.org',
	  hostname: 'example.org',
	  port: '',
	  pathname: '/foo/:/',
	  search: '',
	  hash: ''
	}, {
	  input: ':\\',
	  base: 'http://example.org/foo/bar',
	  href: 'http://example.org/foo/:/',
	  origin: 'http://example.org',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.org',
	  hostname: 'example.org',
	  port: '',
	  pathname: '/foo/:/',
	  search: '',
	  hash: ''
	}, {
	  input: ':#',
	  base: 'http://example.org/foo/bar',
	  href: 'http://example.org/foo/:#',
	  origin: 'http://example.org',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.org',
	  hostname: 'example.org',
	  port: '',
	  pathname: '/foo/:',
	  search: '',
	  hash: ''
	}, {
	  input: '#',
	  base: 'http://example.org/foo/bar',
	  href: 'http://example.org/foo/bar#',
	  origin: 'http://example.org',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.org',
	  hostname: 'example.org',
	  port: '',
	  pathname: '/foo/bar',
	  search: '',
	  hash: ''
	}, {
	  input: '#/',
	  base: 'http://example.org/foo/bar',
	  href: 'http://example.org/foo/bar#/',
	  origin: 'http://example.org',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.org',
	  hostname: 'example.org',
	  port: '',
	  pathname: '/foo/bar',
	  search: '',
	  hash: '#/'
	}, {
	  input: '#\\',
	  base: 'http://example.org/foo/bar',
	  href: 'http://example.org/foo/bar#\\',
	  origin: 'http://example.org',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.org',
	  hostname: 'example.org',
	  port: '',
	  pathname: '/foo/bar',
	  search: '',
	  hash: '#\\'
	}, {
	  input: '#;?',
	  base: 'http://example.org/foo/bar',
	  href: 'http://example.org/foo/bar#;?',
	  origin: 'http://example.org',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.org',
	  hostname: 'example.org',
	  port: '',
	  pathname: '/foo/bar',
	  search: '',
	  hash: '#;?'
	}, {
	  input: '?',
	  base: 'http://example.org/foo/bar',
	  href: 'http://example.org/foo/bar?',
	  origin: 'http://example.org',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.org',
	  hostname: 'example.org',
	  port: '',
	  pathname: '/foo/bar',
	  search: '',
	  hash: ''
	}, {
	  input: '/',
	  base: 'http://example.org/foo/bar',
	  href: 'http://example.org/',
	  origin: 'http://example.org',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.org',
	  hostname: 'example.org',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: ':23',
	  base: 'http://example.org/foo/bar',
	  href: 'http://example.org/foo/:23',
	  origin: 'http://example.org',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.org',
	  hostname: 'example.org',
	  port: '',
	  pathname: '/foo/:23',
	  search: '',
	  hash: ''
	}, {
	  input: '/:23',
	  base: 'http://example.org/foo/bar',
	  href: 'http://example.org/:23',
	  origin: 'http://example.org',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.org',
	  hostname: 'example.org',
	  port: '',
	  pathname: '/:23',
	  search: '',
	  hash: ''
	}, {
	  input: '::',
	  base: 'http://example.org/foo/bar',
	  href: 'http://example.org/foo/::',
	  origin: 'http://example.org',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.org',
	  hostname: 'example.org',
	  port: '',
	  pathname: '/foo/::',
	  search: '',
	  hash: ''
	}, {
	  input: '::23',
	  base: 'http://example.org/foo/bar',
	  href: 'http://example.org/foo/::23',
	  origin: 'http://example.org',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.org',
	  hostname: 'example.org',
	  port: '',
	  pathname: '/foo/::23',
	  search: '',
	  hash: ''
	}, {
	  input: 'foo://',
	  base: 'http://example.org/foo/bar',
	  href: 'foo://',
	  origin: 'null',
	  protocol: 'foo:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://a:b@c:29/d',
	  base: 'http://example.org/foo/bar',
	  href: 'http://a:b@c:29/d',
	  origin: 'http://c:29',
	  protocol: 'http:',
	  username: 'a',
	  password: 'b',
	  host: 'c:29',
	  hostname: 'c',
	  port: '29',
	  pathname: '/d',
	  search: '',
	  hash: ''
	}, {
	  input: 'http::@c:29',
	  base: 'http://example.org/foo/bar',
	  href: 'http://example.org/foo/:@c:29',
	  origin: 'http://example.org',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.org',
	  hostname: 'example.org',
	  port: '',
	  pathname: '/foo/:@c:29',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://&a:foo(b]c@d:2/',
	  base: 'http://example.org/foo/bar',
	  href: 'http://&a:foo(b%5Dc@d:2/',
	  origin: 'http://d:2',
	  protocol: 'http:',
	  username: '&a',
	  password: 'foo(b%5Dc',
	  host: 'd:2',
	  hostname: 'd',
	  port: '2',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://::@c@d:2',
	  base: 'http://example.org/foo/bar',
	  href: 'http://:%3A%40c@d:2/',
	  origin: 'http://d:2',
	  protocol: 'http:',
	  username: '',
	  password: '%3A%40c',
	  host: 'd:2',
	  hostname: 'd',
	  port: '2',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://foo.com:b@d/',
	  base: 'http://example.org/foo/bar',
	  href: 'http://foo.com:b@d/',
	  origin: 'http://d',
	  protocol: 'http:',
	  username: 'foo.com',
	  password: 'b',
	  host: 'd',
	  hostname: 'd',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://foo.com/\\@',
	  base: 'http://example.org/foo/bar',
	  href: 'http://foo.com//@',
	  origin: 'http://foo.com',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'foo.com',
	  hostname: 'foo.com',
	  port: '',
	  pathname: '//@',
	  search: '',
	  hash: ''
	}, {
	  input: 'http:\\\\foo.com\\',
	  base: 'http://example.org/foo/bar',
	  href: 'http://foo.com/',
	  origin: 'http://foo.com',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'foo.com',
	  hostname: 'foo.com',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'http:\\\\a\\b:c\\d@foo.com\\',
	  base: 'http://example.org/foo/bar',
	  href: 'http://a/b:c/d@foo.com/',
	  origin: 'http://a',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'a',
	  hostname: 'a',
	  port: '',
	  pathname: '/b:c/d@foo.com/',
	  search: '',
	  hash: ''
	}, {
	  input: 'foo:/',
	  base: 'http://example.org/foo/bar',
	  href: 'foo:/',
	  origin: 'null',
	  protocol: 'foo:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'foo:/bar.com/',
	  base: 'http://example.org/foo/bar',
	  href: 'foo:/bar.com/',
	  origin: 'null',
	  protocol: 'foo:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/bar.com/',
	  search: '',
	  hash: ''
	}, {
	  input: 'foo://///////',
	  base: 'http://example.org/foo/bar',
	  href: 'foo://///////',
	  origin: 'null',
	  protocol: 'foo:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '///////',
	  search: '',
	  hash: ''
	}, {
	  input: 'foo://///////bar.com/',
	  base: 'http://example.org/foo/bar',
	  href: 'foo://///////bar.com/',
	  origin: 'null',
	  protocol: 'foo:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '///////bar.com/',
	  search: '',
	  hash: ''
	}, {
	  input: 'foo:////://///',
	  base: 'http://example.org/foo/bar',
	  href: 'foo:////://///',
	  origin: 'null',
	  protocol: 'foo:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '//://///',
	  search: '',
	  hash: ''
	}, {
	  input: 'c:/foo',
	  base: 'http://example.org/foo/bar',
	  href: 'c:/foo',
	  origin: 'null',
	  protocol: 'c:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/foo',
	  search: '',
	  hash: ''
	}, {
	  input: '//foo/bar',
	  base: 'http://example.org/foo/bar',
	  href: 'http://foo/bar',
	  origin: 'http://foo',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'foo',
	  hostname: 'foo',
	  port: '',
	  pathname: '/bar',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://foo/path;a??e#f#g',
	  base: 'http://example.org/foo/bar',
	  href: 'http://foo/path;a??e#f#g',
	  origin: 'http://foo',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'foo',
	  hostname: 'foo',
	  port: '',
	  pathname: '/path;a',
	  search: '??e',
	  hash: '#f#g'
	}, {
	  input: 'http://foo/abcd?efgh?ijkl',
	  base: 'http://example.org/foo/bar',
	  href: 'http://foo/abcd?efgh?ijkl',
	  origin: 'http://foo',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'foo',
	  hostname: 'foo',
	  port: '',
	  pathname: '/abcd',
	  search: '?efgh?ijkl',
	  hash: ''
	}, {
	  input: 'http://foo/abcd#foo?bar',
	  base: 'http://example.org/foo/bar',
	  href: 'http://foo/abcd#foo?bar',
	  origin: 'http://foo',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'foo',
	  hostname: 'foo',
	  port: '',
	  pathname: '/abcd',
	  search: '',
	  hash: '#foo?bar'
	}, {
	  input: '[61:24:74]:98',
	  base: 'http://example.org/foo/bar',
	  href: 'http://example.org/foo/[61:24:74]:98',
	  origin: 'http://example.org',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.org',
	  hostname: 'example.org',
	  port: '',
	  pathname: '/foo/[61:24:74]:98',
	  search: '',
	  hash: ''
	}, {
	  input: 'http:[61:27]/:foo',
	  base: 'http://example.org/foo/bar',
	  href: 'http://example.org/foo/[61:27]/:foo',
	  origin: 'http://example.org',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.org',
	  hostname: 'example.org',
	  port: '',
	  pathname: '/foo/[61:27]/:foo',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://[1::2]:3:4',
	  base: 'http://example.org/foo/bar',
	  failure: true
	}, {
	  input: 'http://2001::1',
	  base: 'http://example.org/foo/bar',
	  failure: true
	}, {
	  input: 'http://2001::1]',
	  base: 'http://example.org/foo/bar',
	  failure: true
	}, {
	  input: 'http://2001::1]:80',
	  base: 'http://example.org/foo/bar',
	  failure: true
	}, {
	  input: 'http://[2001::1]',
	  base: 'http://example.org/foo/bar',
	  href: 'http://[2001::1]/',
	  origin: 'http://[2001::1]',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: '[2001::1]',
	  hostname: '[2001::1]',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://[::127.0.0.1]',
	  base: 'http://example.org/foo/bar',
	  href: 'http://[::7f00:1]/',
	  origin: 'http://[::7f00:1]',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: '[::7f00:1]',
	  hostname: '[::7f00:1]',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://[0:0:0:0:0:0:13.1.68.3]',
	  base: 'http://example.org/foo/bar',
	  href: 'http://[::d01:4403]/',
	  origin: 'http://[::d01:4403]',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: '[::d01:4403]',
	  hostname: '[::d01:4403]',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://[2001::1]:80',
	  base: 'http://example.org/foo/bar',
	  href: 'http://[2001::1]/',
	  origin: 'http://[2001::1]',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: '[2001::1]',
	  hostname: '[2001::1]',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'http:/example.com/',
	  base: 'http://example.org/foo/bar',
	  href: 'http://example.org/example.com/',
	  origin: 'http://example.org',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.org',
	  hostname: 'example.org',
	  port: '',
	  pathname: '/example.com/',
	  search: '',
	  hash: ''
	}, {
	  input: 'ftp:/example.com/',
	  base: 'http://example.org/foo/bar',
	  href: 'ftp://example.com/',
	  origin: 'ftp://example.com',
	  protocol: 'ftp:',
	  username: '',
	  password: '',
	  host: 'example.com',
	  hostname: 'example.com',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'https:/example.com/',
	  base: 'http://example.org/foo/bar',
	  href: 'https://example.com/',
	  origin: 'https://example.com',
	  protocol: 'https:',
	  username: '',
	  password: '',
	  host: 'example.com',
	  hostname: 'example.com',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'madeupscheme:/example.com/',
	  base: 'http://example.org/foo/bar',
	  href: 'madeupscheme:/example.com/',
	  origin: 'null',
	  protocol: 'madeupscheme:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/example.com/',
	  search: '',
	  hash: ''
	}, {
	  input: 'file:/example.com/',
	  base: 'http://example.org/foo/bar',
	  href: 'file:///example.com/',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/example.com/',
	  search: '',
	  hash: ''
	}, {
	  input: 'file://example:1/',
	  base: 'about:blank',
	  failure: true
	}, {
	  input: 'file://example:test/',
	  base: 'about:blank',
	  failure: true
	}, {
	  input: 'file://example%/',
	  base: 'about:blank',
	  failure: true
	}, {
	  input: 'file://[example]/',
	  base: 'about:blank',
	  failure: true
	}, {
	  input: 'ftps:/example.com/',
	  base: 'http://example.org/foo/bar',
	  href: 'ftps:/example.com/',
	  origin: 'null',
	  protocol: 'ftps:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/example.com/',
	  search: '',
	  hash: ''
	}, {
	  input: 'ws:/example.com/',
	  base: 'http://example.org/foo/bar',
	  href: 'ws://example.com/',
	  origin: 'ws://example.com',
	  protocol: 'ws:',
	  username: '',
	  password: '',
	  host: 'example.com',
	  hostname: 'example.com',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'wss:/example.com/',
	  base: 'http://example.org/foo/bar',
	  href: 'wss://example.com/',
	  origin: 'wss://example.com',
	  protocol: 'wss:',
	  username: '',
	  password: '',
	  host: 'example.com',
	  hostname: 'example.com',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'data:/example.com/',
	  base: 'http://example.org/foo/bar',
	  href: 'data:/example.com/',
	  origin: 'null',
	  protocol: 'data:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/example.com/',
	  search: '',
	  hash: ''
	}, {
	  input: 'javascript:/example.com/',
	  base: 'http://example.org/foo/bar',
	  href: 'javascript:/example.com/',
	  origin: 'null',
	  protocol: 'javascript:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/example.com/',
	  search: '',
	  hash: ''
	}, {
	  input: 'mailto:/example.com/',
	  base: 'http://example.org/foo/bar',
	  href: 'mailto:/example.com/',
	  origin: 'null',
	  protocol: 'mailto:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/example.com/',
	  search: '',
	  hash: ''
	}, {
	  input: 'http:example.com/',
	  base: 'http://example.org/foo/bar',
	  href: 'http://example.org/foo/example.com/',
	  origin: 'http://example.org',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.org',
	  hostname: 'example.org',
	  port: '',
	  pathname: '/foo/example.com/',
	  search: '',
	  hash: ''
	}, {
	  input: 'ftp:example.com/',
	  base: 'http://example.org/foo/bar',
	  href: 'ftp://example.com/',
	  origin: 'ftp://example.com',
	  protocol: 'ftp:',
	  username: '',
	  password: '',
	  host: 'example.com',
	  hostname: 'example.com',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'https:example.com/',
	  base: 'http://example.org/foo/bar',
	  href: 'https://example.com/',
	  origin: 'https://example.com',
	  protocol: 'https:',
	  username: '',
	  password: '',
	  host: 'example.com',
	  hostname: 'example.com',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'madeupscheme:example.com/',
	  base: 'http://example.org/foo/bar',
	  href: 'madeupscheme:example.com/',
	  origin: 'null',
	  protocol: 'madeupscheme:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: 'example.com/',
	  search: '',
	  hash: ''
	}, {
	  input: 'ftps:example.com/',
	  base: 'http://example.org/foo/bar',
	  href: 'ftps:example.com/',
	  origin: 'null',
	  protocol: 'ftps:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: 'example.com/',
	  search: '',
	  hash: ''
	}, {
	  input: 'ws:example.com/',
	  base: 'http://example.org/foo/bar',
	  href: 'ws://example.com/',
	  origin: 'ws://example.com',
	  protocol: 'ws:',
	  username: '',
	  password: '',
	  host: 'example.com',
	  hostname: 'example.com',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'wss:example.com/',
	  base: 'http://example.org/foo/bar',
	  href: 'wss://example.com/',
	  origin: 'wss://example.com',
	  protocol: 'wss:',
	  username: '',
	  password: '',
	  host: 'example.com',
	  hostname: 'example.com',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'data:example.com/',
	  base: 'http://example.org/foo/bar',
	  href: 'data:example.com/',
	  origin: 'null',
	  protocol: 'data:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: 'example.com/',
	  search: '',
	  hash: ''
	}, {
	  input: 'javascript:example.com/',
	  base: 'http://example.org/foo/bar',
	  href: 'javascript:example.com/',
	  origin: 'null',
	  protocol: 'javascript:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: 'example.com/',
	  search: '',
	  hash: ''
	}, {
	  input: 'mailto:example.com/',
	  base: 'http://example.org/foo/bar',
	  href: 'mailto:example.com/',
	  origin: 'null',
	  protocol: 'mailto:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: 'example.com/',
	  search: '',
	  hash: ''
	}, {
	  input: '/a/b/c',
	  base: 'http://example.org/foo/bar',
	  href: 'http://example.org/a/b/c',
	  origin: 'http://example.org',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.org',
	  hostname: 'example.org',
	  port: '',
	  pathname: '/a/b/c',
	  search: '',
	  hash: ''
	}, {
	  input: '/a/ /c',
	  base: 'http://example.org/foo/bar',
	  href: 'http://example.org/a/%20/c',
	  origin: 'http://example.org',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.org',
	  hostname: 'example.org',
	  port: '',
	  pathname: '/a/%20/c',
	  search: '',
	  hash: ''
	}, {
	  input: '/a%2fc',
	  base: 'http://example.org/foo/bar',
	  href: 'http://example.org/a%2fc',
	  origin: 'http://example.org',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.org',
	  hostname: 'example.org',
	  port: '',
	  pathname: '/a%2fc',
	  search: '',
	  hash: ''
	}, {
	  input: '/a/%2f/c',
	  base: 'http://example.org/foo/bar',
	  href: 'http://example.org/a/%2f/c',
	  origin: 'http://example.org',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.org',
	  hostname: 'example.org',
	  port: '',
	  pathname: '/a/%2f/c',
	  search: '',
	  hash: ''
	}, {
	  input: '#β',
	  base: 'http://example.org/foo/bar',
	  href: 'http://example.org/foo/bar#%CE%B2',
	  origin: 'http://example.org',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.org',
	  hostname: 'example.org',
	  port: '',
	  pathname: '/foo/bar',
	  search: '',
	  hash: '#%CE%B2'
	}, {
	  input: 'data:text/html,test#test',
	  base: 'http://example.org/foo/bar',
	  href: 'data:text/html,test#test',
	  origin: 'null',
	  protocol: 'data:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: 'text/html,test',
	  search: '',
	  hash: '#test'
	}, {
	  input: 'tel:1234567890',
	  base: 'http://example.org/foo/bar',
	  href: 'tel:1234567890',
	  origin: 'null',
	  protocol: 'tel:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '1234567890',
	  search: '',
	  hash: ''
	}, '# Based on http://trac.webkit.org/browser/trunk/LayoutTests/fast/url/file.html', {
	  input: 'file:c:\\foo\\bar.html',
	  base: 'file:///tmp/mock/path',
	  href: 'file:///c:/foo/bar.html',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/c:/foo/bar.html',
	  search: '',
	  hash: ''
	}, {
	  input: '  File:c|////foo\\bar.html',
	  base: 'file:///tmp/mock/path',
	  href: 'file:///c:////foo/bar.html',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/c:////foo/bar.html',
	  search: '',
	  hash: ''
	}, {
	  input: 'C|/foo/bar',
	  base: 'file:///tmp/mock/path',
	  href: 'file:///C:/foo/bar',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/C:/foo/bar',
	  search: '',
	  hash: ''
	}, {
	  input: '/C|\\foo\\bar',
	  base: 'file:///tmp/mock/path',
	  href: 'file:///C:/foo/bar',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/C:/foo/bar',
	  search: '',
	  hash: ''
	}, {
	  input: '//C|/foo/bar',
	  base: 'file:///tmp/mock/path',
	  href: 'file:///C:/foo/bar',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/C:/foo/bar',
	  search: '',
	  hash: ''
	}, {
	  input: '//server/file',
	  base: 'file:///tmp/mock/path',
	  href: 'file://server/file',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: 'server',
	  hostname: 'server',
	  port: '',
	  pathname: '/file',
	  search: '',
	  hash: ''
	}, {
	  input: '\\\\server\\file',
	  base: 'file:///tmp/mock/path',
	  href: 'file://server/file',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: 'server',
	  hostname: 'server',
	  port: '',
	  pathname: '/file',
	  search: '',
	  hash: ''
	}, {
	  input: '/\\server/file',
	  base: 'file:///tmp/mock/path',
	  href: 'file://server/file',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: 'server',
	  hostname: 'server',
	  port: '',
	  pathname: '/file',
	  search: '',
	  hash: ''
	}, {
	  input: 'file:///foo/bar.txt',
	  base: 'file:///tmp/mock/path',
	  href: 'file:///foo/bar.txt',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/foo/bar.txt',
	  search: '',
	  hash: ''
	}, {
	  input: 'file:///home/me',
	  base: 'file:///tmp/mock/path',
	  href: 'file:///home/me',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/home/me',
	  search: '',
	  hash: ''
	}, {
	  input: '//',
	  base: 'file:///tmp/mock/path',
	  href: 'file:///',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: '///',
	  base: 'file:///tmp/mock/path',
	  href: 'file:///',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: '///test',
	  base: 'file:///tmp/mock/path',
	  href: 'file:///test',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/test',
	  search: '',
	  hash: ''
	}, {
	  input: 'file://test',
	  base: 'file:///tmp/mock/path',
	  href: 'file://test/',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: 'test',
	  hostname: 'test',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'file://localhost',
	  base: 'file:///tmp/mock/path',
	  href: 'file:///',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'file://localhost/',
	  base: 'file:///tmp/mock/path',
	  href: 'file:///',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'file://localhost/test',
	  base: 'file:///tmp/mock/path',
	  href: 'file:///test',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/test',
	  search: '',
	  hash: ''
	}, {
	  input: 'test',
	  base: 'file:///tmp/mock/path',
	  href: 'file:///tmp/mock/test',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/tmp/mock/test',
	  search: '',
	  hash: ''
	}, {
	  input: 'file:test',
	  base: 'file:///tmp/mock/path',
	  href: 'file:///tmp/mock/test',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/tmp/mock/test',
	  search: '',
	  hash: ''
	}, '# Based on http://trac.webkit.org/browser/trunk/LayoutTests/fast/url/script-tests/path.js', {
	  input: 'http://example.com/././foo',
	  base: 'about:blank',
	  href: 'http://example.com/foo',
	  origin: 'http://example.com',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.com',
	  hostname: 'example.com',
	  port: '',
	  pathname: '/foo',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://example.com/./.foo',
	  base: 'about:blank',
	  href: 'http://example.com/.foo',
	  origin: 'http://example.com',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.com',
	  hostname: 'example.com',
	  port: '',
	  pathname: '/.foo',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://example.com/foo/.',
	  base: 'about:blank',
	  href: 'http://example.com/foo/',
	  origin: 'http://example.com',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.com',
	  hostname: 'example.com',
	  port: '',
	  pathname: '/foo/',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://example.com/foo/./',
	  base: 'about:blank',
	  href: 'http://example.com/foo/',
	  origin: 'http://example.com',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.com',
	  hostname: 'example.com',
	  port: '',
	  pathname: '/foo/',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://example.com/foo/bar/..',
	  base: 'about:blank',
	  href: 'http://example.com/foo/',
	  origin: 'http://example.com',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.com',
	  hostname: 'example.com',
	  port: '',
	  pathname: '/foo/',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://example.com/foo/bar/../',
	  base: 'about:blank',
	  href: 'http://example.com/foo/',
	  origin: 'http://example.com',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.com',
	  hostname: 'example.com',
	  port: '',
	  pathname: '/foo/',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://example.com/foo/..bar',
	  base: 'about:blank',
	  href: 'http://example.com/foo/..bar',
	  origin: 'http://example.com',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.com',
	  hostname: 'example.com',
	  port: '',
	  pathname: '/foo/..bar',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://example.com/foo/bar/../ton',
	  base: 'about:blank',
	  href: 'http://example.com/foo/ton',
	  origin: 'http://example.com',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.com',
	  hostname: 'example.com',
	  port: '',
	  pathname: '/foo/ton',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://example.com/foo/bar/../ton/../../a',
	  base: 'about:blank',
	  href: 'http://example.com/a',
	  origin: 'http://example.com',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.com',
	  hostname: 'example.com',
	  port: '',
	  pathname: '/a',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://example.com/foo/../../..',
	  base: 'about:blank',
	  href: 'http://example.com/',
	  origin: 'http://example.com',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.com',
	  hostname: 'example.com',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://example.com/foo/../../../ton',
	  base: 'about:blank',
	  href: 'http://example.com/ton',
	  origin: 'http://example.com',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.com',
	  hostname: 'example.com',
	  port: '',
	  pathname: '/ton',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://example.com/foo/%2e',
	  base: 'about:blank',
	  href: 'http://example.com/foo/',
	  origin: 'http://example.com',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.com',
	  hostname: 'example.com',
	  port: '',
	  pathname: '/foo/',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://example.com/foo/%2e%2',
	  base: 'about:blank',
	  href: 'http://example.com/foo/%2e%2',
	  origin: 'http://example.com',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.com',
	  hostname: 'example.com',
	  port: '',
	  pathname: '/foo/%2e%2',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://example.com/foo/%2e./%2e%2e/.%2e/%2e.bar',
	  base: 'about:blank',
	  href: 'http://example.com/%2e.bar',
	  origin: 'http://example.com',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.com',
	  hostname: 'example.com',
	  port: '',
	  pathname: '/%2e.bar',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://example.com////../..',
	  base: 'about:blank',
	  href: 'http://example.com//',
	  origin: 'http://example.com',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.com',
	  hostname: 'example.com',
	  port: '',
	  pathname: '//',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://example.com/foo/bar//../..',
	  base: 'about:blank',
	  href: 'http://example.com/foo/',
	  origin: 'http://example.com',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.com',
	  hostname: 'example.com',
	  port: '',
	  pathname: '/foo/',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://example.com/foo/bar//..',
	  base: 'about:blank',
	  href: 'http://example.com/foo/bar/',
	  origin: 'http://example.com',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.com',
	  hostname: 'example.com',
	  port: '',
	  pathname: '/foo/bar/',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://example.com/foo',
	  base: 'about:blank',
	  href: 'http://example.com/foo',
	  origin: 'http://example.com',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.com',
	  hostname: 'example.com',
	  port: '',
	  pathname: '/foo',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://example.com/%20foo',
	  base: 'about:blank',
	  href: 'http://example.com/%20foo',
	  origin: 'http://example.com',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.com',
	  hostname: 'example.com',
	  port: '',
	  pathname: '/%20foo',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://example.com/foo%',
	  base: 'about:blank',
	  href: 'http://example.com/foo%',
	  origin: 'http://example.com',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.com',
	  hostname: 'example.com',
	  port: '',
	  pathname: '/foo%',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://example.com/foo%2',
	  base: 'about:blank',
	  href: 'http://example.com/foo%2',
	  origin: 'http://example.com',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.com',
	  hostname: 'example.com',
	  port: '',
	  pathname: '/foo%2',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://example.com/foo%2zbar',
	  base: 'about:blank',
	  href: 'http://example.com/foo%2zbar',
	  origin: 'http://example.com',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.com',
	  hostname: 'example.com',
	  port: '',
	  pathname: '/foo%2zbar',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://example.com/foo%2Â©zbar',
	  base: 'about:blank',
	  href: 'http://example.com/foo%2%C3%82%C2%A9zbar',
	  origin: 'http://example.com',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.com',
	  hostname: 'example.com',
	  port: '',
	  pathname: '/foo%2%C3%82%C2%A9zbar',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://example.com/foo%41%7a',
	  base: 'about:blank',
	  href: 'http://example.com/foo%41%7a',
	  origin: 'http://example.com',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.com',
	  hostname: 'example.com',
	  port: '',
	  pathname: '/foo%41%7a',
	  search: '',
	  hash: ''
	}, {
	  input: "http://example.com/foo\t\x91%91",
	  base: 'about:blank',
	  href: 'http://example.com/foo%C2%91%91',
	  origin: 'http://example.com',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.com',
	  hostname: 'example.com',
	  port: '',
	  pathname: '/foo%C2%91%91',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://example.com/foo%00%51',
	  base: 'about:blank',
	  href: 'http://example.com/foo%00%51',
	  origin: 'http://example.com',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.com',
	  hostname: 'example.com',
	  port: '',
	  pathname: '/foo%00%51',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://example.com/(%28:%3A%29)',
	  base: 'about:blank',
	  href: 'http://example.com/(%28:%3A%29)',
	  origin: 'http://example.com',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.com',
	  hostname: 'example.com',
	  port: '',
	  pathname: '/(%28:%3A%29)',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://example.com/%3A%3a%3C%3c',
	  base: 'about:blank',
	  href: 'http://example.com/%3A%3a%3C%3c',
	  origin: 'http://example.com',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.com',
	  hostname: 'example.com',
	  port: '',
	  pathname: '/%3A%3a%3C%3c',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://example.com/foo\tbar',
	  base: 'about:blank',
	  href: 'http://example.com/foobar',
	  origin: 'http://example.com',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.com',
	  hostname: 'example.com',
	  port: '',
	  pathname: '/foobar',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://example.com\\\\foo\\\\bar',
	  base: 'about:blank',
	  href: 'http://example.com//foo//bar',
	  origin: 'http://example.com',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.com',
	  hostname: 'example.com',
	  port: '',
	  pathname: '//foo//bar',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://example.com/%7Ffp3%3Eju%3Dduvgw%3Dd',
	  base: 'about:blank',
	  href: 'http://example.com/%7Ffp3%3Eju%3Dduvgw%3Dd',
	  origin: 'http://example.com',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.com',
	  hostname: 'example.com',
	  port: '',
	  pathname: '/%7Ffp3%3Eju%3Dduvgw%3Dd',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://example.com/@asdf%40',
	  base: 'about:blank',
	  href: 'http://example.com/@asdf%40',
	  origin: 'http://example.com',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.com',
	  hostname: 'example.com',
	  port: '',
	  pathname: '/@asdf%40',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://example.com/你好你好',
	  base: 'about:blank',
	  href: 'http://example.com/%E4%BD%A0%E5%A5%BD%E4%BD%A0%E5%A5%BD',
	  origin: 'http://example.com',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.com',
	  hostname: 'example.com',
	  port: '',
	  pathname: '/%E4%BD%A0%E5%A5%BD%E4%BD%A0%E5%A5%BD',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://example.com/‥/foo',
	  base: 'about:blank',
	  href: 'http://example.com/%E2%80%A5/foo',
	  origin: 'http://example.com',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.com',
	  hostname: 'example.com',
	  port: '',
	  pathname: '/%E2%80%A5/foo',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://example.com/﻿/foo',
	  base: 'about:blank',
	  href: 'http://example.com/%EF%BB%BF/foo',
	  origin: 'http://example.com',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.com',
	  hostname: 'example.com',
	  port: '',
	  pathname: '/%EF%BB%BF/foo',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://example.com/‮/foo/‭/bar',
	  base: 'about:blank',
	  href: 'http://example.com/%E2%80%AE/foo/%E2%80%AD/bar',
	  origin: 'http://example.com',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.com',
	  hostname: 'example.com',
	  port: '',
	  pathname: '/%E2%80%AE/foo/%E2%80%AD/bar',
	  search: '',
	  hash: ''
	}, '# Based on http://trac.webkit.org/browser/trunk/LayoutTests/fast/url/script-tests/relative.js', {
	  input: 'http://www.google.com/foo?bar=baz#',
	  base: 'about:blank',
	  href: 'http://www.google.com/foo?bar=baz#',
	  origin: 'http://www.google.com',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'www.google.com',
	  hostname: 'www.google.com',
	  port: '',
	  pathname: '/foo',
	  search: '?bar=baz',
	  hash: ''
	}, {
	  input: 'http://www.google.com/foo?bar=baz# »',
	  base: 'about:blank',
	  href: 'http://www.google.com/foo?bar=baz#%20%C2%BB',
	  origin: 'http://www.google.com',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'www.google.com',
	  hostname: 'www.google.com',
	  port: '',
	  pathname: '/foo',
	  search: '?bar=baz',
	  hash: '#%20%C2%BB'
	}, {
	  input: 'data:test# »',
	  base: 'about:blank',
	  href: 'data:test#%20%C2%BB',
	  origin: 'null',
	  protocol: 'data:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: 'test',
	  search: '',
	  hash: '#%20%C2%BB'
	}, {
	  input: 'http://www.google.com',
	  base: 'about:blank',
	  href: 'http://www.google.com/',
	  origin: 'http://www.google.com',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'www.google.com',
	  hostname: 'www.google.com',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://192.0x00A80001',
	  base: 'about:blank',
	  href: 'http://192.168.0.1/',
	  origin: 'http://192.168.0.1',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: '192.168.0.1',
	  hostname: '192.168.0.1',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://www/foo%2Ehtml',
	  base: 'about:blank',
	  href: 'http://www/foo%2Ehtml',
	  origin: 'http://www',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'www',
	  hostname: 'www',
	  port: '',
	  pathname: '/foo%2Ehtml',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://www/foo/%2E/html',
	  base: 'about:blank',
	  href: 'http://www/foo/html',
	  origin: 'http://www',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'www',
	  hostname: 'www',
	  port: '',
	  pathname: '/foo/html',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://user:pass@/',
	  base: 'about:blank',
	  failure: true
	}, {
	  input: 'http://%25DOMAIN:foobar@foodomain.com/',
	  base: 'about:blank',
	  href: 'http://%25DOMAIN:foobar@foodomain.com/',
	  origin: 'http://foodomain.com',
	  protocol: 'http:',
	  username: '%25DOMAIN',
	  password: 'foobar',
	  host: 'foodomain.com',
	  hostname: 'foodomain.com',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'http:\\\\www.google.com\\foo',
	  base: 'about:blank',
	  href: 'http://www.google.com/foo',
	  origin: 'http://www.google.com',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'www.google.com',
	  hostname: 'www.google.com',
	  port: '',
	  pathname: '/foo',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://foo:80/',
	  base: 'about:blank',
	  href: 'http://foo/',
	  origin: 'http://foo',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'foo',
	  hostname: 'foo',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://foo:81/',
	  base: 'about:blank',
	  href: 'http://foo:81/',
	  origin: 'http://foo:81',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'foo:81',
	  hostname: 'foo',
	  port: '81',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'httpa://foo:80/',
	  base: 'about:blank',
	  href: 'httpa://foo:80/',
	  origin: 'null',
	  protocol: 'httpa:',
	  username: '',
	  password: '',
	  host: 'foo:80',
	  hostname: 'foo',
	  port: '80',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://foo:-80/',
	  base: 'about:blank',
	  failure: true
	}, {
	  input: 'https://foo:443/',
	  base: 'about:blank',
	  href: 'https://foo/',
	  origin: 'https://foo',
	  protocol: 'https:',
	  username: '',
	  password: '',
	  host: 'foo',
	  hostname: 'foo',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'https://foo:80/',
	  base: 'about:blank',
	  href: 'https://foo:80/',
	  origin: 'https://foo:80',
	  protocol: 'https:',
	  username: '',
	  password: '',
	  host: 'foo:80',
	  hostname: 'foo',
	  port: '80',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'ftp://foo:21/',
	  base: 'about:blank',
	  href: 'ftp://foo/',
	  origin: 'ftp://foo',
	  protocol: 'ftp:',
	  username: '',
	  password: '',
	  host: 'foo',
	  hostname: 'foo',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'ftp://foo:80/',
	  base: 'about:blank',
	  href: 'ftp://foo:80/',
	  origin: 'ftp://foo:80',
	  protocol: 'ftp:',
	  username: '',
	  password: '',
	  host: 'foo:80',
	  hostname: 'foo',
	  port: '80',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'ws://foo:80/',
	  base: 'about:blank',
	  href: 'ws://foo/',
	  origin: 'ws://foo',
	  protocol: 'ws:',
	  username: '',
	  password: '',
	  host: 'foo',
	  hostname: 'foo',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'ws://foo:81/',
	  base: 'about:blank',
	  href: 'ws://foo:81/',
	  origin: 'ws://foo:81',
	  protocol: 'ws:',
	  username: '',
	  password: '',
	  host: 'foo:81',
	  hostname: 'foo',
	  port: '81',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'ws://foo:443/',
	  base: 'about:blank',
	  href: 'ws://foo:443/',
	  origin: 'ws://foo:443',
	  protocol: 'ws:',
	  username: '',
	  password: '',
	  host: 'foo:443',
	  hostname: 'foo',
	  port: '443',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'ws://foo:815/',
	  base: 'about:blank',
	  href: 'ws://foo:815/',
	  origin: 'ws://foo:815',
	  protocol: 'ws:',
	  username: '',
	  password: '',
	  host: 'foo:815',
	  hostname: 'foo',
	  port: '815',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'wss://foo:80/',
	  base: 'about:blank',
	  href: 'wss://foo:80/',
	  origin: 'wss://foo:80',
	  protocol: 'wss:',
	  username: '',
	  password: '',
	  host: 'foo:80',
	  hostname: 'foo',
	  port: '80',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'wss://foo:81/',
	  base: 'about:blank',
	  href: 'wss://foo:81/',
	  origin: 'wss://foo:81',
	  protocol: 'wss:',
	  username: '',
	  password: '',
	  host: 'foo:81',
	  hostname: 'foo',
	  port: '81',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'wss://foo:443/',
	  base: 'about:blank',
	  href: 'wss://foo/',
	  origin: 'wss://foo',
	  protocol: 'wss:',
	  username: '',
	  password: '',
	  host: 'foo',
	  hostname: 'foo',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'wss://foo:815/',
	  base: 'about:blank',
	  href: 'wss://foo:815/',
	  origin: 'wss://foo:815',
	  protocol: 'wss:',
	  username: '',
	  password: '',
	  host: 'foo:815',
	  hostname: 'foo',
	  port: '815',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'http:/example.com/',
	  base: 'about:blank',
	  href: 'http://example.com/',
	  origin: 'http://example.com',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.com',
	  hostname: 'example.com',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'ftp:/example.com/',
	  base: 'about:blank',
	  href: 'ftp://example.com/',
	  origin: 'ftp://example.com',
	  protocol: 'ftp:',
	  username: '',
	  password: '',
	  host: 'example.com',
	  hostname: 'example.com',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'https:/example.com/',
	  base: 'about:blank',
	  href: 'https://example.com/',
	  origin: 'https://example.com',
	  protocol: 'https:',
	  username: '',
	  password: '',
	  host: 'example.com',
	  hostname: 'example.com',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'madeupscheme:/example.com/',
	  base: 'about:blank',
	  href: 'madeupscheme:/example.com/',
	  origin: 'null',
	  protocol: 'madeupscheme:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/example.com/',
	  search: '',
	  hash: ''
	}, {
	  input: 'file:/example.com/',
	  base: 'about:blank',
	  href: 'file:///example.com/',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/example.com/',
	  search: '',
	  hash: ''
	}, {
	  input: 'ftps:/example.com/',
	  base: 'about:blank',
	  href: 'ftps:/example.com/',
	  origin: 'null',
	  protocol: 'ftps:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/example.com/',
	  search: '',
	  hash: ''
	}, {
	  input: 'ws:/example.com/',
	  base: 'about:blank',
	  href: 'ws://example.com/',
	  origin: 'ws://example.com',
	  protocol: 'ws:',
	  username: '',
	  password: '',
	  host: 'example.com',
	  hostname: 'example.com',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'wss:/example.com/',
	  base: 'about:blank',
	  href: 'wss://example.com/',
	  origin: 'wss://example.com',
	  protocol: 'wss:',
	  username: '',
	  password: '',
	  host: 'example.com',
	  hostname: 'example.com',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'data:/example.com/',
	  base: 'about:blank',
	  href: 'data:/example.com/',
	  origin: 'null',
	  protocol: 'data:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/example.com/',
	  search: '',
	  hash: ''
	}, {
	  input: 'javascript:/example.com/',
	  base: 'about:blank',
	  href: 'javascript:/example.com/',
	  origin: 'null',
	  protocol: 'javascript:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/example.com/',
	  search: '',
	  hash: ''
	}, {
	  input: 'mailto:/example.com/',
	  base: 'about:blank',
	  href: 'mailto:/example.com/',
	  origin: 'null',
	  protocol: 'mailto:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/example.com/',
	  search: '',
	  hash: ''
	}, {
	  input: 'http:example.com/',
	  base: 'about:blank',
	  href: 'http://example.com/',
	  origin: 'http://example.com',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.com',
	  hostname: 'example.com',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'ftp:example.com/',
	  base: 'about:blank',
	  href: 'ftp://example.com/',
	  origin: 'ftp://example.com',
	  protocol: 'ftp:',
	  username: '',
	  password: '',
	  host: 'example.com',
	  hostname: 'example.com',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'https:example.com/',
	  base: 'about:blank',
	  href: 'https://example.com/',
	  origin: 'https://example.com',
	  protocol: 'https:',
	  username: '',
	  password: '',
	  host: 'example.com',
	  hostname: 'example.com',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'madeupscheme:example.com/',
	  base: 'about:blank',
	  href: 'madeupscheme:example.com/',
	  origin: 'null',
	  protocol: 'madeupscheme:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: 'example.com/',
	  search: '',
	  hash: ''
	}, {
	  input: 'ftps:example.com/',
	  base: 'about:blank',
	  href: 'ftps:example.com/',
	  origin: 'null',
	  protocol: 'ftps:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: 'example.com/',
	  search: '',
	  hash: ''
	}, {
	  input: 'ws:example.com/',
	  base: 'about:blank',
	  href: 'ws://example.com/',
	  origin: 'ws://example.com',
	  protocol: 'ws:',
	  username: '',
	  password: '',
	  host: 'example.com',
	  hostname: 'example.com',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'wss:example.com/',
	  base: 'about:blank',
	  href: 'wss://example.com/',
	  origin: 'wss://example.com',
	  protocol: 'wss:',
	  username: '',
	  password: '',
	  host: 'example.com',
	  hostname: 'example.com',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'data:example.com/',
	  base: 'about:blank',
	  href: 'data:example.com/',
	  origin: 'null',
	  protocol: 'data:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: 'example.com/',
	  search: '',
	  hash: ''
	}, {
	  input: 'javascript:example.com/',
	  base: 'about:blank',
	  href: 'javascript:example.com/',
	  origin: 'null',
	  protocol: 'javascript:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: 'example.com/',
	  search: '',
	  hash: ''
	}, {
	  input: 'mailto:example.com/',
	  base: 'about:blank',
	  href: 'mailto:example.com/',
	  origin: 'null',
	  protocol: 'mailto:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: 'example.com/',
	  search: '',
	  hash: ''
	}, '# Based on http://trac.webkit.org/browser/trunk/LayoutTests/fast/url/segments-userinfo-vs-host.html', {
	  input: 'http:@www.example.com',
	  base: 'about:blank',
	  href: 'http://www.example.com/',
	  origin: 'http://www.example.com',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'www.example.com',
	  hostname: 'www.example.com',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'http:/@www.example.com',
	  base: 'about:blank',
	  href: 'http://www.example.com/',
	  origin: 'http://www.example.com',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'www.example.com',
	  hostname: 'www.example.com',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://@www.example.com',
	  base: 'about:blank',
	  href: 'http://www.example.com/',
	  origin: 'http://www.example.com',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'www.example.com',
	  hostname: 'www.example.com',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'http:a:b@www.example.com',
	  base: 'about:blank',
	  href: 'http://a:b@www.example.com/',
	  origin: 'http://www.example.com',
	  protocol: 'http:',
	  username: 'a',
	  password: 'b',
	  host: 'www.example.com',
	  hostname: 'www.example.com',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'http:/a:b@www.example.com',
	  base: 'about:blank',
	  href: 'http://a:b@www.example.com/',
	  origin: 'http://www.example.com',
	  protocol: 'http:',
	  username: 'a',
	  password: 'b',
	  host: 'www.example.com',
	  hostname: 'www.example.com',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://a:b@www.example.com',
	  base: 'about:blank',
	  href: 'http://a:b@www.example.com/',
	  origin: 'http://www.example.com',
	  protocol: 'http:',
	  username: 'a',
	  password: 'b',
	  host: 'www.example.com',
	  hostname: 'www.example.com',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://@pple.com',
	  base: 'about:blank',
	  href: 'http://pple.com/',
	  origin: 'http://pple.com',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'pple.com',
	  hostname: 'pple.com',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'http::b@www.example.com',
	  base: 'about:blank',
	  href: 'http://:b@www.example.com/',
	  origin: 'http://www.example.com',
	  protocol: 'http:',
	  username: '',
	  password: 'b',
	  host: 'www.example.com',
	  hostname: 'www.example.com',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'http:/:b@www.example.com',
	  base: 'about:blank',
	  href: 'http://:b@www.example.com/',
	  origin: 'http://www.example.com',
	  protocol: 'http:',
	  username: '',
	  password: 'b',
	  host: 'www.example.com',
	  hostname: 'www.example.com',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://:b@www.example.com',
	  base: 'about:blank',
	  href: 'http://:b@www.example.com/',
	  origin: 'http://www.example.com',
	  protocol: 'http:',
	  username: '',
	  password: 'b',
	  host: 'www.example.com',
	  hostname: 'www.example.com',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'http:/:@/www.example.com',
	  base: 'about:blank',
	  failure: true
	}, {
	  input: 'http://user@/www.example.com',
	  base: 'about:blank',
	  failure: true
	}, {
	  input: 'http:@/www.example.com',
	  base: 'about:blank',
	  failure: true
	}, {
	  input: 'http:/@/www.example.com',
	  base: 'about:blank',
	  failure: true
	}, {
	  input: 'http://@/www.example.com',
	  base: 'about:blank',
	  failure: true
	}, {
	  input: 'https:@/www.example.com',
	  base: 'about:blank',
	  failure: true
	}, {
	  input: 'http:a:b@/www.example.com',
	  base: 'about:blank',
	  failure: true
	}, {
	  input: 'http:/a:b@/www.example.com',
	  base: 'about:blank',
	  failure: true
	}, {
	  input: 'http://a:b@/www.example.com',
	  base: 'about:blank',
	  failure: true
	}, {
	  input: 'http::@/www.example.com',
	  base: 'about:blank',
	  failure: true
	}, {
	  input: 'http:a:@www.example.com',
	  base: 'about:blank',
	  href: 'http://a@www.example.com/',
	  origin: 'http://www.example.com',
	  protocol: 'http:',
	  username: 'a',
	  password: '',
	  host: 'www.example.com',
	  hostname: 'www.example.com',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'http:/a:@www.example.com',
	  base: 'about:blank',
	  href: 'http://a@www.example.com/',
	  origin: 'http://www.example.com',
	  protocol: 'http:',
	  username: 'a',
	  password: '',
	  host: 'www.example.com',
	  hostname: 'www.example.com',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://a:@www.example.com',
	  base: 'about:blank',
	  href: 'http://a@www.example.com/',
	  origin: 'http://www.example.com',
	  protocol: 'http:',
	  username: 'a',
	  password: '',
	  host: 'www.example.com',
	  hostname: 'www.example.com',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://www.@pple.com',
	  base: 'about:blank',
	  href: 'http://www.@pple.com/',
	  origin: 'http://pple.com',
	  protocol: 'http:',
	  username: 'www.',
	  password: '',
	  host: 'pple.com',
	  hostname: 'pple.com',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'http:@:www.example.com',
	  base: 'about:blank',
	  failure: true
	}, {
	  input: 'http:/@:www.example.com',
	  base: 'about:blank',
	  failure: true
	}, {
	  input: 'http://@:www.example.com',
	  base: 'about:blank',
	  failure: true
	}, {
	  input: 'http://:@www.example.com',
	  base: 'about:blank',
	  href: 'http://www.example.com/',
	  origin: 'http://www.example.com',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'www.example.com',
	  hostname: 'www.example.com',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, '# Others', {
	  input: '/',
	  base: 'http://www.example.com/test',
	  href: 'http://www.example.com/',
	  origin: 'http://www.example.com',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'www.example.com',
	  hostname: 'www.example.com',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: '/test.txt',
	  base: 'http://www.example.com/test',
	  href: 'http://www.example.com/test.txt',
	  origin: 'http://www.example.com',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'www.example.com',
	  hostname: 'www.example.com',
	  port: '',
	  pathname: '/test.txt',
	  search: '',
	  hash: ''
	}, {
	  input: '.',
	  base: 'http://www.example.com/test',
	  href: 'http://www.example.com/',
	  origin: 'http://www.example.com',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'www.example.com',
	  hostname: 'www.example.com',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: '..',
	  base: 'http://www.example.com/test',
	  href: 'http://www.example.com/',
	  origin: 'http://www.example.com',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'www.example.com',
	  hostname: 'www.example.com',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'test.txt',
	  base: 'http://www.example.com/test',
	  href: 'http://www.example.com/test.txt',
	  origin: 'http://www.example.com',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'www.example.com',
	  hostname: 'www.example.com',
	  port: '',
	  pathname: '/test.txt',
	  search: '',
	  hash: ''
	}, {
	  input: './test.txt',
	  base: 'http://www.example.com/test',
	  href: 'http://www.example.com/test.txt',
	  origin: 'http://www.example.com',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'www.example.com',
	  hostname: 'www.example.com',
	  port: '',
	  pathname: '/test.txt',
	  search: '',
	  hash: ''
	}, {
	  input: '../test.txt',
	  base: 'http://www.example.com/test',
	  href: 'http://www.example.com/test.txt',
	  origin: 'http://www.example.com',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'www.example.com',
	  hostname: 'www.example.com',
	  port: '',
	  pathname: '/test.txt',
	  search: '',
	  hash: ''
	}, {
	  input: '../aaa/test.txt',
	  base: 'http://www.example.com/test',
	  href: 'http://www.example.com/aaa/test.txt',
	  origin: 'http://www.example.com',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'www.example.com',
	  hostname: 'www.example.com',
	  port: '',
	  pathname: '/aaa/test.txt',
	  search: '',
	  hash: ''
	}, {
	  input: '../../test.txt',
	  base: 'http://www.example.com/test',
	  href: 'http://www.example.com/test.txt',
	  origin: 'http://www.example.com',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'www.example.com',
	  hostname: 'www.example.com',
	  port: '',
	  pathname: '/test.txt',
	  search: '',
	  hash: ''
	}, {
	  input: '中/test.txt',
	  base: 'http://www.example.com/test',
	  href: 'http://www.example.com/%E4%B8%AD/test.txt',
	  origin: 'http://www.example.com',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'www.example.com',
	  hostname: 'www.example.com',
	  port: '',
	  pathname: '/%E4%B8%AD/test.txt',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://www.example2.com',
	  base: 'http://www.example.com/test',
	  href: 'http://www.example2.com/',
	  origin: 'http://www.example2.com',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'www.example2.com',
	  hostname: 'www.example2.com',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: '//www.example2.com',
	  base: 'http://www.example.com/test',
	  href: 'http://www.example2.com/',
	  origin: 'http://www.example2.com',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'www.example2.com',
	  hostname: 'www.example2.com',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'file:...',
	  base: 'http://www.example.com/test',
	  href: 'file:///...',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/...',
	  search: '',
	  hash: ''
	}, {
	  input: 'file:..',
	  base: 'http://www.example.com/test',
	  href: 'file:///',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'file:a',
	  base: 'http://www.example.com/test',
	  href: 'file:///a',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/a',
	  search: '',
	  hash: ''
	}, '# Based on http://trac.webkit.org/browser/trunk/LayoutTests/fast/url/host.html', 'Basic canonicalization, uppercase should be converted to lowercase', {
	  input: 'http://ExAmPlE.CoM',
	  base: 'http://other.com/',
	  href: 'http://example.com/',
	  origin: 'http://example.com',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.com',
	  hostname: 'example.com',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://example example.com',
	  base: 'http://other.com/',
	  failure: true
	}, {
	  input: 'http://Goo%20 goo%7C|.com',
	  base: 'http://other.com/',
	  failure: true
	}, {
	  input: 'http://[]',
	  base: 'http://other.com/',
	  failure: true
	}, {
	  input: 'http://[:]',
	  base: 'http://other.com/',
	  failure: true
	}, 'U+3000 is mapped to U+0020 (space) which is disallowed', {
	  input: "http://GOO\xA0\u3000goo.com",
	  base: 'http://other.com/',
	  failure: true
	}, 'Other types of space (no-break, zero-width, zero-width-no-break) are name-prepped away to nothing. U+200B, U+2060, and U+FEFF, are ignored', {
	  input: "http://GOO\u200B\u2060\uFEFFgoo.com",
	  base: 'http://other.com/',
	  href: 'http://googoo.com/',
	  origin: 'http://googoo.com',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'googoo.com',
	  hostname: 'googoo.com',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, 'Leading and trailing C0 control or space', {
	  input: "\0\x1B\x04\x12 http://example.com/\x1F \r ",
	  base: 'about:blank',
	  href: 'http://example.com/',
	  origin: 'http://example.com',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.com',
	  hostname: 'example.com',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, 'Ideographic full stop (full-width period for Chinese, etc.) should be treated as a dot. U+3002 is mapped to U+002E (dot)', {
	  input: 'http://www.foo。bar.com',
	  base: 'http://other.com/',
	  href: 'http://www.foo.bar.com/',
	  origin: 'http://www.foo.bar.com',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'www.foo.bar.com',
	  hostname: 'www.foo.bar.com',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, 'Invalid unicode characters should fail... U+FDD0 is disallowed; %ef%b7%90 is U+FDD0', {
	  input: "http://\uFDD0zyx.com",
	  base: 'http://other.com/',
	  failure: true
	}, 'This is the same as previous but escaped', {
	  input: 'http://%ef%b7%90zyx.com',
	  base: 'http://other.com/',
	  failure: true
	}, 'U+FFFD', {
	  input: "https://\uFFFD",
	  base: 'about:blank',
	  failure: true
	}, {
	  input: 'https://%EF%BF%BD',
	  base: 'about:blank',
	  failure: true
	}, {
	  input: "https://x/\uFFFD?\uFFFD#\uFFFD",
	  base: 'about:blank',
	  href: 'https://x/%EF%BF%BD?%EF%BF%BD#%EF%BF%BD',
	  origin: 'https://x',
	  protocol: 'https:',
	  username: '',
	  password: '',
	  host: 'x',
	  hostname: 'x',
	  port: '',
	  pathname: '/%EF%BF%BD',
	  search: '?%EF%BF%BD',
	  hash: '#%EF%BF%BD'
	}, "Test name prepping, fullwidth input should be converted to ASCII and NOT IDN-ized. This is 'Go' in fullwidth UTF-8/UTF-16.", {
	  input: 'http://Ｇｏ.com',
	  base: 'http://other.com/',
	  href: 'http://go.com/',
	  origin: 'http://go.com',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'go.com',
	  hostname: 'go.com',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, 'URL spec forbids the following. https://www.w3.org/Bugs/Public/show_bug.cgi?id=24257', {
	  input: 'http://％４１.com',
	  base: 'http://other.com/',
	  failure: true
	}, {
	  input: 'http://%ef%bc%85%ef%bc%94%ef%bc%91.com',
	  base: 'http://other.com/',
	  failure: true
	}, '...%00 in fullwidth should fail (also as escaped UTF-8 input)', {
	  input: 'http://％００.com',
	  base: 'http://other.com/',
	  failure: true
	}, {
	  input: 'http://%ef%bc%85%ef%bc%90%ef%bc%90.com',
	  base: 'http://other.com/',
	  failure: true
	}, 'Basic IDN support, UTF-8 and UTF-16 input should be converted to IDN', {
	  input: 'http://你好你好',
	  base: 'http://other.com/',
	  href: 'http://xn--6qqa088eba/',
	  origin: 'http://xn--6qqa088eba',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'xn--6qqa088eba',
	  hostname: 'xn--6qqa088eba',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'https://faß.ExAmPlE/',
	  base: 'about:blank',
	  href: 'https://xn--fa-hia.example/',
	  origin: 'https://xn--fa-hia.example',
	  protocol: 'https:',
	  username: '',
	  password: '',
	  host: 'xn--fa-hia.example',
	  hostname: 'xn--fa-hia.example',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'sc://faß.ExAmPlE/',
	  base: 'about:blank',
	  href: 'sc://fa%C3%9F.ExAmPlE/',
	  origin: 'null',
	  protocol: 'sc:',
	  username: '',
	  password: '',
	  host: 'fa%C3%9F.ExAmPlE',
	  hostname: 'fa%C3%9F.ExAmPlE',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, 'Invalid escaped characters should fail and the percents should be escaped. https://www.w3.org/Bugs/Public/show_bug.cgi?id=24191', {
	  input: 'http://%zz%66%a.com',
	  base: 'http://other.com/',
	  failure: true
	}, 'If we get an invalid character that has been escaped.', {
	  input: 'http://%25',
	  base: 'http://other.com/',
	  failure: true
	}, {
	  input: 'http://hello%00',
	  base: 'http://other.com/',
	  failure: true
	}, 'Escaped numbers should be treated like IP addresses if they are.',
	/*
	{
	  input: 'http://%30%78%63%30%2e%30%32%35%30.01',
	  base: 'http://other.com/',
	  href: 'http://192.168.0.1/',
	  origin: 'http://192.168.0.1',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: '192.168.0.1',
	  hostname: '192.168.0.1',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: '',
	},
	{
	  input: 'http://%30%78%63%30%2e%30%32%35%30.01%2e',
	  base: 'http://other.com/',
	  href: 'http://192.168.0.1/',
	  origin: 'http://192.168.0.1',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: '192.168.0.1',
	  hostname: '192.168.0.1',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: '',
	},
	*/
	{
	  input: 'http://192.168.0.257',
	  base: 'http://other.com/',
	  failure: true
	}, 'Invalid escaping in hosts causes failure', {
	  input: 'http://%3g%78%63%30%2e%30%32%35%30%2E.01',
	  base: 'http://other.com/',
	  failure: true
	}, 'A space in a host causes failure', {
	  input: 'http://192.168.0.1 hello',
	  base: 'http://other.com/',
	  failure: true
	}, {
	  input: 'https://x x:12',
	  base: 'about:blank',
	  failure: true
	}, 'Fullwidth and escaped UTF-8 fullwidth should still be treated as IP', {
	  input: 'http://０Ｘｃ０．０２５０．０１',
	  base: 'http://other.com/',
	  href: 'http://192.168.0.1/',
	  origin: 'http://192.168.0.1',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: '192.168.0.1',
	  hostname: '192.168.0.1',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, 'Domains with empty labels', {
	  input: 'http://./',
	  base: 'about:blank',
	  href: 'http://./',
	  origin: 'http://.',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: '.',
	  hostname: '.',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://../',
	  base: 'about:blank',
	  href: 'http://../',
	  origin: 'http://..',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: '..',
	  hostname: '..',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://0..0x300/',
	  base: 'about:blank',
	  href: 'http://0..0x300/',
	  origin: 'http://0..0x300',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: '0..0x300',
	  hostname: '0..0x300',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, 'Broken IPv6', {
	  input: 'http://[www.google.com]/',
	  base: 'about:blank',
	  failure: true
	}, {
	  input: 'http://[google.com]',
	  base: 'http://other.com/',
	  failure: true
	}, {
	  input: 'http://[::1.2.3.4x]',
	  base: 'http://other.com/',
	  failure: true
	}, {
	  input: 'http://[::1.2.3.]',
	  base: 'http://other.com/',
	  failure: true
	}, {
	  input: 'http://[::1.2.]',
	  base: 'http://other.com/',
	  failure: true
	}, {
	  input: 'http://[::1.]',
	  base: 'http://other.com/',
	  failure: true
	}, 'Misc Unicode', {
	  input: 'http://foo:💩@example.com/bar',
	  base: 'http://other.com/',
	  href: 'http://foo:%F0%9F%92%A9@example.com/bar',
	  origin: 'http://example.com',
	  protocol: 'http:',
	  username: 'foo',
	  password: '%F0%9F%92%A9',
	  host: 'example.com',
	  hostname: 'example.com',
	  port: '',
	  pathname: '/bar',
	  search: '',
	  hash: ''
	}, '# resolving a fragment against any scheme succeeds', {
	  input: '#',
	  base: 'test:test',
	  href: 'test:test#',
	  origin: 'null',
	  protocol: 'test:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: 'test',
	  search: '',
	  hash: ''
	}, {
	  input: '#x',
	  base: 'mailto:x@x.com',
	  href: 'mailto:x@x.com#x',
	  origin: 'null',
	  protocol: 'mailto:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: 'x@x.com',
	  search: '',
	  hash: '#x'
	}, {
	  input: '#x',
	  base: 'data:,',
	  href: 'data:,#x',
	  origin: 'null',
	  protocol: 'data:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: ',',
	  search: '',
	  hash: '#x'
	}, {
	  input: '#x',
	  base: 'about:blank',
	  href: 'about:blank#x',
	  origin: 'null',
	  protocol: 'about:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: 'blank',
	  search: '',
	  hash: '#x'
	}, {
	  input: '#',
	  base: 'test:test?test',
	  href: 'test:test?test#',
	  origin: 'null',
	  protocol: 'test:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: 'test',
	  search: '?test',
	  hash: ''
	}, '# multiple @ in authority state', {
	  input: 'https://@test@test@example:800/',
	  base: 'http://doesnotmatter/',
	  href: 'https://%40test%40test@example:800/',
	  origin: 'https://example:800',
	  protocol: 'https:',
	  username: '%40test%40test',
	  password: '',
	  host: 'example:800',
	  hostname: 'example',
	  port: '800',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'https://@@@example',
	  base: 'http://doesnotmatter/',
	  href: 'https://%40%40@example/',
	  origin: 'https://example',
	  protocol: 'https:',
	  username: '%40%40',
	  password: '',
	  host: 'example',
	  hostname: 'example',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, 'non-az-09 characters', {
	  input: 'http://`{}:`{}@h/`{}?`{}',
	  base: 'http://doesnotmatter/',
	  href: 'http://%60%7B%7D:%60%7B%7D@h/%60%7B%7D?`{}',
	  origin: 'http://h',
	  protocol: 'http:',
	  username: '%60%7B%7D',
	  password: '%60%7B%7D',
	  host: 'h',
	  hostname: 'h',
	  port: '',
	  pathname: '/%60%7B%7D',
	  search: '?`{}',
	  hash: ''
	}, "byte is ' and url is special", {
	  input: "http://host/?'",
	  base: 'about:blank',
	  href: 'http://host/?%27',
	  origin: 'http://host',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'host',
	  hostname: 'host',
	  port: '',
	  pathname: '/',
	  search: '?%27',
	  hash: ''
	}, {
	  input: "notspecial://host/?'",
	  base: 'about:blank',
	  href: "notspecial://host/?'",
	  origin: 'null',
	  protocol: 'notspecial:',
	  username: '',
	  password: '',
	  host: 'host',
	  hostname: 'host',
	  port: '',
	  pathname: '/',
	  search: "?'",
	  hash: ''
	}, '# Credentials in base', {
	  input: '/some/path',
	  base: 'http://user@example.org/smth',
	  href: 'http://user@example.org/some/path',
	  origin: 'http://example.org',
	  protocol: 'http:',
	  username: 'user',
	  password: '',
	  host: 'example.org',
	  hostname: 'example.org',
	  port: '',
	  pathname: '/some/path',
	  search: '',
	  hash: ''
	}, {
	  input: '',
	  base: 'http://user:pass@example.org:21/smth',
	  href: 'http://user:pass@example.org:21/smth',
	  origin: 'http://example.org:21',
	  protocol: 'http:',
	  username: 'user',
	  password: 'pass',
	  host: 'example.org:21',
	  hostname: 'example.org',
	  port: '21',
	  pathname: '/smth',
	  search: '',
	  hash: ''
	}, {
	  input: '/some/path',
	  base: 'http://user:pass@example.org:21/smth',
	  href: 'http://user:pass@example.org:21/some/path',
	  origin: 'http://example.org:21',
	  protocol: 'http:',
	  username: 'user',
	  password: 'pass',
	  host: 'example.org:21',
	  hostname: 'example.org',
	  port: '21',
	  pathname: '/some/path',
	  search: '',
	  hash: ''
	}, '# a set of tests designed by zcorpan for relative URLs with unknown schemes', {
	  input: 'i',
	  base: 'sc:sd',
	  failure: true
	}, {
	  input: 'i',
	  base: 'sc:sd/sd',
	  failure: true
	}, {
	  input: 'i',
	  base: 'sc:/pa/pa',
	  href: 'sc:/pa/i',
	  origin: 'null',
	  protocol: 'sc:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/pa/i',
	  search: '',
	  hash: ''
	}, {
	  input: 'i',
	  base: 'sc://ho/pa',
	  href: 'sc://ho/i',
	  origin: 'null',
	  protocol: 'sc:',
	  username: '',
	  password: '',
	  host: 'ho',
	  hostname: 'ho',
	  port: '',
	  pathname: '/i',
	  search: '',
	  hash: ''
	}, {
	  input: 'i',
	  base: 'sc:///pa/pa',
	  href: 'sc:///pa/i',
	  origin: 'null',
	  protocol: 'sc:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/pa/i',
	  search: '',
	  hash: ''
	}, {
	  input: '../i',
	  base: 'sc:sd',
	  failure: true
	}, {
	  input: '../i',
	  base: 'sc:sd/sd',
	  failure: true
	}, {
	  input: '../i',
	  base: 'sc:/pa/pa',
	  href: 'sc:/i',
	  origin: 'null',
	  protocol: 'sc:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/i',
	  search: '',
	  hash: ''
	}, {
	  input: '../i',
	  base: 'sc://ho/pa',
	  href: 'sc://ho/i',
	  origin: 'null',
	  protocol: 'sc:',
	  username: '',
	  password: '',
	  host: 'ho',
	  hostname: 'ho',
	  port: '',
	  pathname: '/i',
	  search: '',
	  hash: ''
	}, {
	  input: '../i',
	  base: 'sc:///pa/pa',
	  href: 'sc:///i',
	  origin: 'null',
	  protocol: 'sc:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/i',
	  search: '',
	  hash: ''
	}, {
	  input: '/i',
	  base: 'sc:sd',
	  failure: true
	}, {
	  input: '/i',
	  base: 'sc:sd/sd',
	  failure: true
	}, {
	  input: '/i',
	  base: 'sc:/pa/pa',
	  href: 'sc:/i',
	  origin: 'null',
	  protocol: 'sc:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/i',
	  search: '',
	  hash: ''
	}, {
	  input: '/i',
	  base: 'sc://ho/pa',
	  href: 'sc://ho/i',
	  origin: 'null',
	  protocol: 'sc:',
	  username: '',
	  password: '',
	  host: 'ho',
	  hostname: 'ho',
	  port: '',
	  pathname: '/i',
	  search: '',
	  hash: ''
	}, {
	  input: '/i',
	  base: 'sc:///pa/pa',
	  href: 'sc:///i',
	  origin: 'null',
	  protocol: 'sc:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/i',
	  search: '',
	  hash: ''
	}, {
	  input: '?i',
	  base: 'sc:sd',
	  failure: true
	}, {
	  input: '?i',
	  base: 'sc:sd/sd',
	  failure: true
	}, {
	  input: '?i',
	  base: 'sc:/pa/pa',
	  href: 'sc:/pa/pa?i',
	  origin: 'null',
	  protocol: 'sc:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/pa/pa',
	  search: '?i',
	  hash: ''
	}, {
	  input: '?i',
	  base: 'sc://ho/pa',
	  href: 'sc://ho/pa?i',
	  origin: 'null',
	  protocol: 'sc:',
	  username: '',
	  password: '',
	  host: 'ho',
	  hostname: 'ho',
	  port: '',
	  pathname: '/pa',
	  search: '?i',
	  hash: ''
	}, {
	  input: '?i',
	  base: 'sc:///pa/pa',
	  href: 'sc:///pa/pa?i',
	  origin: 'null',
	  protocol: 'sc:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/pa/pa',
	  search: '?i',
	  hash: ''
	}, {
	  input: '#i',
	  base: 'sc:sd',
	  href: 'sc:sd#i',
	  origin: 'null',
	  protocol: 'sc:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: 'sd',
	  search: '',
	  hash: '#i'
	}, {
	  input: '#i',
	  base: 'sc:sd/sd',
	  href: 'sc:sd/sd#i',
	  origin: 'null',
	  protocol: 'sc:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: 'sd/sd',
	  search: '',
	  hash: '#i'
	}, {
	  input: '#i',
	  base: 'sc:/pa/pa',
	  href: 'sc:/pa/pa#i',
	  origin: 'null',
	  protocol: 'sc:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/pa/pa',
	  search: '',
	  hash: '#i'
	}, {
	  input: '#i',
	  base: 'sc://ho/pa',
	  href: 'sc://ho/pa#i',
	  origin: 'null',
	  protocol: 'sc:',
	  username: '',
	  password: '',
	  host: 'ho',
	  hostname: 'ho',
	  port: '',
	  pathname: '/pa',
	  search: '',
	  hash: '#i'
	}, {
	  input: '#i',
	  base: 'sc:///pa/pa',
	  href: 'sc:///pa/pa#i',
	  origin: 'null',
	  protocol: 'sc:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/pa/pa',
	  search: '',
	  hash: '#i'
	}, '# make sure that relative URL logic works on known typically non-relative schemes too', {
	  input: 'about:/../',
	  base: 'about:blank',
	  href: 'about:/',
	  origin: 'null',
	  protocol: 'about:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'data:/../',
	  base: 'about:blank',
	  href: 'data:/',
	  origin: 'null',
	  protocol: 'data:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'javascript:/../',
	  base: 'about:blank',
	  href: 'javascript:/',
	  origin: 'null',
	  protocol: 'javascript:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'mailto:/../',
	  base: 'about:blank',
	  href: 'mailto:/',
	  origin: 'null',
	  protocol: 'mailto:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, '# unknown schemes and their hosts', {
	  input: 'sc://ñ.test/',
	  base: 'about:blank',
	  href: 'sc://%C3%B1.test/',
	  origin: 'null',
	  protocol: 'sc:',
	  username: '',
	  password: '',
	  host: '%C3%B1.test',
	  hostname: '%C3%B1.test',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: "sc://\x1F!\"$&'()*+,-.;<=>^_`{|}~/",
	  base: 'about:blank',
	  href: "sc://%1F!\"$&'()*+,-.;<=>^_`{|}~/",
	  origin: 'null',
	  protocol: 'sc:',
	  username: '',
	  password: '',
	  host: "%1F!\"$&'()*+,-.;<=>^_`{|}~",
	  hostname: "%1F!\"$&'()*+,-.;<=>^_`{|}~",
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: "sc://\0/",
	  base: 'about:blank',
	  failure: true
	}, {
	  input: 'sc:// /',
	  base: 'about:blank',
	  failure: true
	},
	/*
	{
	  input: 'sc://%/',
	  base: 'about:blank',
	  href: 'sc://%/',
	  protocol: 'sc:',
	  username: '',
	  password: '',
	  host: '%',
	  hostname: '%',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: '',
	},
	*/
	{
	  input: 'sc://@/',
	  base: 'about:blank',
	  failure: true
	}, {
	  input: 'sc://te@s:t@/',
	  base: 'about:blank',
	  failure: true
	}, {
	  input: 'sc://:/',
	  base: 'about:blank',
	  failure: true
	}, {
	  input: 'sc://:12/',
	  base: 'about:blank',
	  failure: true
	}, {
	  input: 'sc://[/',
	  base: 'about:blank',
	  failure: true
	}, {
	  input: 'sc://\\/',
	  base: 'about:blank',
	  failure: true
	}, {
	  input: 'sc://]/',
	  base: 'about:blank',
	  failure: true
	}, {
	  input: 'x',
	  base: 'sc://ñ',
	  href: 'sc://%C3%B1/x',
	  origin: 'null',
	  protocol: 'sc:',
	  username: '',
	  password: '',
	  host: '%C3%B1',
	  hostname: '%C3%B1',
	  port: '',
	  pathname: '/x',
	  search: '',
	  hash: ''
	}, '# unknown schemes and backslashes', {
	  input: 'sc:\\../',
	  base: 'about:blank',
	  href: 'sc:\\../',
	  origin: 'null',
	  protocol: 'sc:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '\\../',
	  search: '',
	  hash: ''
	}, '# unknown scheme with path looking like a password', {
	  input: 'sc::a@example.net',
	  base: 'about:blank',
	  href: 'sc::a@example.net',
	  origin: 'null',
	  protocol: 'sc:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: ':a@example.net',
	  search: '',
	  hash: ''
	}, '# unknown scheme with bogus percent-encoding', {
	  input: 'wow:%NBD',
	  base: 'about:blank',
	  href: 'wow:%NBD',
	  origin: 'null',
	  protocol: 'wow:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '%NBD',
	  search: '',
	  hash: ''
	}, {
	  input: 'wow:%1G',
	  base: 'about:blank',
	  href: 'wow:%1G',
	  origin: 'null',
	  protocol: 'wow:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '%1G',
	  search: '',
	  hash: ''
	}, '# Hosts and percent-encoding', {
	  input: 'ftp://example.com%80/',
	  base: 'about:blank',
	  failure: true
	}, {
	  input: 'ftp://example.com%A0/',
	  base: 'about:blank',
	  failure: true
	}, {
	  input: 'https://example.com%80/',
	  base: 'about:blank',
	  failure: true
	}, {
	  input: 'https://example.com%A0/',
	  base: 'about:blank',
	  failure: true
	},
	/*
	{
	  input: 'ftp://%e2%98%83',
	  base: 'about:blank',
	  href: 'ftp://xn--n3h/',
	  origin: 'ftp://xn--n3h',
	  protocol: 'ftp:',
	  username: '',
	  password: '',
	  host: 'xn--n3h',
	  hostname: 'xn--n3h',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: '',
	},
	{
	  input: 'https://%e2%98%83',
	  base: 'about:blank',
	  href: 'https://xn--n3h/',
	  origin: 'https://xn--n3h',
	  protocol: 'https:',
	  username: '',
	  password: '',
	  host: 'xn--n3h',
	  hostname: 'xn--n3h',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: '',
	},
	*/
	'# tests from jsdom/whatwg-url designed for code coverage', {
	  input: 'http://127.0.0.1:10100/relative_import.html',
	  base: 'about:blank',
	  href: 'http://127.0.0.1:10100/relative_import.html',
	  origin: 'http://127.0.0.1:10100',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: '127.0.0.1:10100',
	  hostname: '127.0.0.1',
	  port: '10100',
	  pathname: '/relative_import.html',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://facebook.com/?foo=%7B%22abc%22',
	  base: 'about:blank',
	  href: 'http://facebook.com/?foo=%7B%22abc%22',
	  origin: 'http://facebook.com',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'facebook.com',
	  hostname: 'facebook.com',
	  port: '',
	  pathname: '/',
	  search: '?foo=%7B%22abc%22',
	  hash: ''
	}, {
	  input: 'https://localhost:3000/jqueryui@1.2.3',
	  base: 'about:blank',
	  href: 'https://localhost:3000/jqueryui@1.2.3',
	  origin: 'https://localhost:3000',
	  protocol: 'https:',
	  username: '',
	  password: '',
	  host: 'localhost:3000',
	  hostname: 'localhost',
	  port: '3000',
	  pathname: '/jqueryui@1.2.3',
	  search: '',
	  hash: ''
	}, '# tab/LF/CR', {
	  input: 'h\tt\nt\rp://h\to\ns\rt:9\t0\n0\r0/p\ta\nt\rh?q\tu\ne\rry#f\tr\na\rg',
	  base: 'about:blank',
	  href: 'http://host:9000/path?query#frag',
	  origin: 'http://host:9000',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'host:9000',
	  hostname: 'host',
	  port: '9000',
	  pathname: '/path',
	  search: '?query',
	  hash: '#frag'
	}, '# Stringification of URL.searchParams', {
	  input: '?a=b&c=d',
	  base: 'http://example.org/foo/bar',
	  href: 'http://example.org/foo/bar?a=b&c=d',
	  origin: 'http://example.org',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.org',
	  hostname: 'example.org',
	  port: '',
	  pathname: '/foo/bar',
	  search: '?a=b&c=d',
	  searchParams: 'a=b&c=d',
	  hash: ''
	}, {
	  input: '??a=b&c=d',
	  base: 'http://example.org/foo/bar',
	  href: 'http://example.org/foo/bar??a=b&c=d',
	  origin: 'http://example.org',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.org',
	  hostname: 'example.org',
	  port: '',
	  pathname: '/foo/bar',
	  search: '??a=b&c=d',
	  searchParams: '%3Fa=b&c=d',
	  hash: ''
	}, '# Scheme only', {
	  input: 'http:',
	  base: 'http://example.org/foo/bar',
	  href: 'http://example.org/foo/bar',
	  origin: 'http://example.org',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.org',
	  hostname: 'example.org',
	  port: '',
	  pathname: '/foo/bar',
	  search: '',
	  searchParams: '',
	  hash: ''
	}, {
	  input: 'http:',
	  base: 'https://example.org/foo/bar',
	  failure: true
	}, {
	  input: 'sc:',
	  base: 'https://example.org/foo/bar',
	  href: 'sc:',
	  origin: 'null',
	  protocol: 'sc:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '',
	  search: '',
	  searchParams: '',
	  hash: ''
	}, '# Percent encoding of fragments', {
	  input: 'http://foo.bar/baz?qux#foo\bbar',
	  base: 'about:blank',
	  href: 'http://foo.bar/baz?qux#foo%08bar',
	  origin: 'http://foo.bar',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'foo.bar',
	  hostname: 'foo.bar',
	  port: '',
	  pathname: '/baz',
	  search: '?qux',
	  searchParams: 'qux=',
	  hash: '#foo%08bar'
	}, {
	  input: 'http://foo.bar/baz?qux#foo"bar',
	  base: 'about:blank',
	  href: 'http://foo.bar/baz?qux#foo%22bar',
	  origin: 'http://foo.bar',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'foo.bar',
	  hostname: 'foo.bar',
	  port: '',
	  pathname: '/baz',
	  search: '?qux',
	  searchParams: 'qux=',
	  hash: '#foo%22bar'
	}, {
	  input: 'http://foo.bar/baz?qux#foo<bar',
	  base: 'about:blank',
	  href: 'http://foo.bar/baz?qux#foo%3Cbar',
	  origin: 'http://foo.bar',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'foo.bar',
	  hostname: 'foo.bar',
	  port: '',
	  pathname: '/baz',
	  search: '?qux',
	  searchParams: 'qux=',
	  hash: '#foo%3Cbar'
	}, {
	  input: 'http://foo.bar/baz?qux#foo>bar',
	  base: 'about:blank',
	  href: 'http://foo.bar/baz?qux#foo%3Ebar',
	  origin: 'http://foo.bar',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'foo.bar',
	  hostname: 'foo.bar',
	  port: '',
	  pathname: '/baz',
	  search: '?qux',
	  searchParams: 'qux=',
	  hash: '#foo%3Ebar'
	}, {
	  input: 'http://foo.bar/baz?qux#foo`bar',
	  base: 'about:blank',
	  href: 'http://foo.bar/baz?qux#foo%60bar',
	  origin: 'http://foo.bar',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'foo.bar',
	  hostname: 'foo.bar',
	  port: '',
	  pathname: '/baz',
	  search: '?qux',
	  searchParams: 'qux=',
	  hash: '#foo%60bar'
	}, '# IPv4 parsing (via https://github.com/nodejs/node/pull/10317)', {
	  input: 'http://192.168.257',
	  base: 'http://other.com/',
	  href: 'http://192.168.1.1/',
	  origin: 'http://192.168.1.1',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: '192.168.1.1',
	  hostname: '192.168.1.1',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://192.168.257.com',
	  base: 'http://other.com/',
	  href: 'http://192.168.257.com/',
	  origin: 'http://192.168.257.com',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: '192.168.257.com',
	  hostname: '192.168.257.com',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://256',
	  base: 'http://other.com/',
	  href: 'http://0.0.1.0/',
	  origin: 'http://0.0.1.0',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: '0.0.1.0',
	  hostname: '0.0.1.0',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://256.com',
	  base: 'http://other.com/',
	  href: 'http://256.com/',
	  origin: 'http://256.com',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: '256.com',
	  hostname: '256.com',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://999999999',
	  base: 'http://other.com/',
	  href: 'http://59.154.201.255/',
	  origin: 'http://59.154.201.255',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: '59.154.201.255',
	  hostname: '59.154.201.255',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://999999999.com',
	  base: 'http://other.com/',
	  href: 'http://999999999.com/',
	  origin: 'http://999999999.com',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: '999999999.com',
	  hostname: '999999999.com',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://10000000000',
	  base: 'http://other.com/',
	  failure: true
	}, {
	  input: 'http://10000000000.com',
	  base: 'http://other.com/',
	  href: 'http://10000000000.com/',
	  origin: 'http://10000000000.com',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: '10000000000.com',
	  hostname: '10000000000.com',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://4294967295',
	  base: 'http://other.com/',
	  href: 'http://255.255.255.255/',
	  origin: 'http://255.255.255.255',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: '255.255.255.255',
	  hostname: '255.255.255.255',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://4294967296',
	  base: 'http://other.com/',
	  failure: true
	}, {
	  input: 'http://0xffffffff',
	  base: 'http://other.com/',
	  href: 'http://255.255.255.255/',
	  origin: 'http://255.255.255.255',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: '255.255.255.255',
	  hostname: '255.255.255.255',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://0xffffffff1',
	  base: 'http://other.com/',
	  failure: true
	}, {
	  input: 'http://256.256.256.256',
	  base: 'http://other.com/',
	  failure: true
	}, {
	  input: 'http://256.256.256.256.256',
	  base: 'http://other.com/',
	  href: 'http://256.256.256.256.256/',
	  origin: 'http://256.256.256.256.256',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: '256.256.256.256.256',
	  hostname: '256.256.256.256.256',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'https://0x.0x.0',
	  base: 'about:blank',
	  href: 'https://0.0.0.0/',
	  origin: 'https://0.0.0.0',
	  protocol: 'https:',
	  username: '',
	  password: '',
	  host: '0.0.0.0',
	  hostname: '0.0.0.0',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, 'More IPv4 parsing (via https://github.com/jsdom/whatwg-url/issues/92)', {
	  input: 'https://0x100000000/test',
	  base: 'about:blank',
	  failure: true
	}, {
	  input: 'https://256.0.0.1/test',
	  base: 'about:blank',
	  failure: true
	}, "# file URLs containing percent-encoded Windows drive letters (shouldn't work)", {
	  input: 'file:///C%3A/',
	  base: 'about:blank',
	  href: 'file:///C%3A/',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/C%3A/',
	  search: '',
	  hash: ''
	}, {
	  input: 'file:///C%7C/',
	  base: 'about:blank',
	  href: 'file:///C%7C/',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/C%7C/',
	  search: '',
	  hash: ''
	}, '# file URLs relative to other file URLs (via https://github.com/jsdom/whatwg-url/pull/60)', {
	  input: 'pix/submit.gif',
	  base: 'file:///C:/Users/Domenic/Dropbox/GitHub/tmpvar/jsdom/test/level2/html/files/anchor.html',
	  href: 'file:///C:/Users/Domenic/Dropbox/GitHub/tmpvar/jsdom/test/level2/html/files/pix/submit.gif',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/C:/Users/Domenic/Dropbox/GitHub/tmpvar/jsdom/test/level2/html/files/pix/submit.gif',
	  search: '',
	  hash: ''
	}, {
	  input: '..',
	  base: 'file:///C:/',
	  href: 'file:///C:/',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/C:/',
	  search: '',
	  hash: ''
	}, {
	  input: '..',
	  base: 'file:///',
	  href: 'file:///',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, '# More file URL tests by zcorpan and annevk', {
	  input: '/',
	  base: 'file:///C:/a/b',
	  href: 'file:///C:/',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/C:/',
	  search: '',
	  hash: ''
	}, {
	  input: '//d:',
	  base: 'file:///C:/a/b',
	  href: 'file:///d:',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/d:',
	  search: '',
	  hash: ''
	}, {
	  input: '//d:/..',
	  base: 'file:///C:/a/b',
	  href: 'file:///d:/',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/d:/',
	  search: '',
	  hash: ''
	}, {
	  input: '..',
	  base: 'file:///ab:/',
	  href: 'file:///',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: '..',
	  base: 'file:///1:/',
	  href: 'file:///',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: '',
	  base: 'file:///test?test#test',
	  href: 'file:///test?test',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/test',
	  search: '?test',
	  hash: ''
	}, {
	  input: 'file:',
	  base: 'file:///test?test#test',
	  href: 'file:///test?test',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/test',
	  search: '?test',
	  hash: ''
	}, {
	  input: '?x',
	  base: 'file:///test?test#test',
	  href: 'file:///test?x',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/test',
	  search: '?x',
	  hash: ''
	}, {
	  input: 'file:?x',
	  base: 'file:///test?test#test',
	  href: 'file:///test?x',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/test',
	  search: '?x',
	  hash: ''
	}, {
	  input: '#x',
	  base: 'file:///test?test#test',
	  href: 'file:///test?test#x',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/test',
	  search: '?test',
	  hash: '#x'
	}, {
	  input: 'file:#x',
	  base: 'file:///test?test#test',
	  href: 'file:///test?test#x',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/test',
	  search: '?test',
	  hash: '#x'
	}, '# File URLs and many (back)slashes', {
	  input: 'file:\\\\//',
	  base: 'about:blank',
	  href: 'file:///',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'file:\\\\\\\\',
	  base: 'about:blank',
	  href: 'file:///',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'file:\\\\\\\\?fox',
	  base: 'about:blank',
	  href: 'file:///?fox',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/',
	  search: '?fox',
	  hash: ''
	}, {
	  input: 'file:\\\\\\\\#guppy',
	  base: 'about:blank',
	  href: 'file:///#guppy',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: '#guppy'
	}, {
	  input: 'file://spider///',
	  base: 'about:blank',
	  href: 'file://spider/',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: 'spider',
	  hostname: 'spider',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'file:\\\\localhost//',
	  base: 'about:blank',
	  href: 'file:///',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'file:///localhost//cat',
	  base: 'about:blank',
	  href: 'file:///localhost//cat',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/localhost//cat',
	  search: '',
	  hash: ''
	}, {
	  input: 'file://\\/localhost//cat',
	  base: 'about:blank',
	  href: 'file:///localhost//cat',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/localhost//cat',
	  search: '',
	  hash: ''
	}, {
	  input: 'file://localhost//a//../..//',
	  base: 'about:blank',
	  href: 'file:///',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: '/////mouse',
	  base: 'file:///elephant',
	  href: 'file:///mouse',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/mouse',
	  search: '',
	  hash: ''
	}, {
	  input: '\\//pig',
	  base: 'file://lion/',
	  href: 'file:///pig',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/pig',
	  search: '',
	  hash: ''
	}, {
	  input: '\\/localhost//pig',
	  base: 'file://lion/',
	  href: 'file:///pig',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/pig',
	  search: '',
	  hash: ''
	}, {
	  input: '//localhost//pig',
	  base: 'file://lion/',
	  href: 'file:///pig',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/pig',
	  search: '',
	  hash: ''
	}, {
	  input: '/..//localhost//pig',
	  base: 'file://lion/',
	  href: 'file://lion/localhost//pig',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: 'lion',
	  hostname: 'lion',
	  port: '',
	  pathname: '/localhost//pig',
	  search: '',
	  hash: ''
	}, {
	  input: 'file://',
	  base: 'file://ape/',
	  href: 'file:///',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, '# File URLs with non-empty hosts', {
	  input: '/rooibos',
	  base: 'file://tea/',
	  href: 'file://tea/rooibos',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: 'tea',
	  hostname: 'tea',
	  port: '',
	  pathname: '/rooibos',
	  search: '',
	  hash: ''
	}, {
	  input: '/?chai',
	  base: 'file://tea/',
	  href: 'file://tea/?chai',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: 'tea',
	  hostname: 'tea',
	  port: '',
	  pathname: '/',
	  search: '?chai',
	  hash: ''
	}, "# Windows drive letter handling with the 'file:' base URL", {
	  input: 'C|',
	  base: 'file://host/dir/file',
	  href: 'file:///C:',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/C:',
	  search: '',
	  hash: ''
	}, {
	  input: 'C|#',
	  base: 'file://host/dir/file',
	  href: 'file:///C:#',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/C:',
	  search: '',
	  hash: ''
	}, {
	  input: 'C|?',
	  base: 'file://host/dir/file',
	  href: 'file:///C:?',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/C:',
	  search: '',
	  hash: ''
	}, {
	  input: 'C|/',
	  base: 'file://host/dir/file',
	  href: 'file:///C:/',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/C:/',
	  search: '',
	  hash: ''
	}, {
	  input: 'C|\n/',
	  base: 'file://host/dir/file',
	  href: 'file:///C:/',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/C:/',
	  search: '',
	  hash: ''
	}, {
	  input: 'C|\\',
	  base: 'file://host/dir/file',
	  href: 'file:///C:/',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/C:/',
	  search: '',
	  hash: ''
	}, {
	  input: 'C',
	  base: 'file://host/dir/file',
	  href: 'file://host/dir/C',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: 'host',
	  hostname: 'host',
	  port: '',
	  pathname: '/dir/C',
	  search: '',
	  hash: ''
	}, {
	  input: 'C|a',
	  base: 'file://host/dir/file',
	  href: 'file://host/dir/C|a',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: 'host',
	  hostname: 'host',
	  port: '',
	  pathname: '/dir/C|a',
	  search: '',
	  hash: ''
	}, '# Windows drive letter quirk in the file slash state', {
	  input: '/c:/foo/bar',
	  base: 'file:///c:/baz/qux',
	  href: 'file:///c:/foo/bar',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/c:/foo/bar',
	  search: '',
	  hash: ''
	}, {
	  input: '/c|/foo/bar',
	  base: 'file:///c:/baz/qux',
	  href: 'file:///c:/foo/bar',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/c:/foo/bar',
	  search: '',
	  hash: ''
	}, {
	  input: 'file:\\c:\\foo\\bar',
	  base: 'file:///c:/baz/qux',
	  href: 'file:///c:/foo/bar',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/c:/foo/bar',
	  search: '',
	  hash: ''
	}, {
	  input: '/c:/foo/bar',
	  base: 'file://host/path',
	  href: 'file:///c:/foo/bar',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/c:/foo/bar',
	  search: '',
	  hash: ''
	}, '# Windows drive letter quirk with not empty host', {
	  input: 'file://example.net/C:/',
	  base: 'about:blank',
	  href: 'file:///C:/',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/C:/',
	  search: '',
	  hash: ''
	}, {
	  input: 'file://1.2.3.4/C:/',
	  base: 'about:blank',
	  href: 'file:///C:/',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/C:/',
	  search: '',
	  hash: ''
	}, {
	  input: 'file://[1::8]/C:/',
	  base: 'about:blank',
	  href: 'file:///C:/',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/C:/',
	  search: '',
	  hash: ''
	}, '# Windows drive letter quirk (no host)', {
	  input: 'file:/C|/',
	  base: 'about:blank',
	  href: 'file:///C:/',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/C:/',
	  search: '',
	  hash: ''
	}, {
	  input: 'file://C|/',
	  base: 'about:blank',
	  href: 'file:///C:/',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/C:/',
	  search: '',
	  hash: ''
	}, '# file URLs without base URL by Rimas Misevičius', {
	  input: 'file:',
	  base: 'about:blank',
	  href: 'file:///',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'file:?q=v',
	  base: 'about:blank',
	  href: 'file:///?q=v',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/',
	  search: '?q=v',
	  hash: ''
	}, {
	  input: 'file:#frag',
	  base: 'about:blank',
	  href: 'file:///#frag',
	  protocol: 'file:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: '#frag'
	}, '# IPv6 tests', {
	  input: 'http://[1:0::]',
	  base: 'http://example.net/',
	  href: 'http://[1::]/',
	  origin: 'http://[1::]',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: '[1::]',
	  hostname: '[1::]',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://[0:1:2:3:4:5:6:7:8]',
	  base: 'http://example.net/',
	  failure: true
	}, {
	  input: 'https://[0::0::0]',
	  base: 'about:blank',
	  failure: true
	}, {
	  input: 'https://[0:.0]',
	  base: 'about:blank',
	  failure: true
	}, {
	  input: 'https://[0:0:]',
	  base: 'about:blank',
	  failure: true
	}, {
	  input: 'https://[0:1:2:3:4:5:6:7.0.0.0.1]',
	  base: 'about:blank',
	  failure: true
	}, {
	  input: 'https://[0:1.00.0.0.0]',
	  base: 'about:blank',
	  failure: true
	}, {
	  input: 'https://[0:1.290.0.0.0]',
	  base: 'about:blank',
	  failure: true
	}, {
	  input: 'https://[0:1.23.23]',
	  base: 'about:blank',
	  failure: true
	}, '# Empty host', {
	  input: 'http://?',
	  base: 'about:blank',
	  failure: true
	}, {
	  input: 'http://#',
	  base: 'about:blank',
	  failure: true
	}, 'Port overflow (2^32 + 81)', {
	  input: 'http://f:4294967377/c',
	  base: 'http://example.org/',
	  failure: true
	}, 'Port overflow (2^64 + 81)', {
	  input: 'http://f:18446744073709551697/c',
	  base: 'http://example.org/',
	  failure: true
	}, 'Port overflow (2^128 + 81)', {
	  input: 'http://f:340282366920938463463374607431768211537/c',
	  base: 'http://example.org/',
	  failure: true
	}, '# Non-special-URL path tests', {
	  input: 'sc://ñ',
	  base: 'about:blank',
	  href: 'sc://%C3%B1',
	  origin: 'null',
	  protocol: 'sc:',
	  username: '',
	  password: '',
	  host: '%C3%B1',
	  hostname: '%C3%B1',
	  port: '',
	  pathname: '',
	  search: '',
	  hash: ''
	}, {
	  input: 'sc://ñ?x',
	  base: 'about:blank',
	  href: 'sc://%C3%B1?x',
	  origin: 'null',
	  protocol: 'sc:',
	  username: '',
	  password: '',
	  host: '%C3%B1',
	  hostname: '%C3%B1',
	  port: '',
	  pathname: '',
	  search: '?x',
	  hash: ''
	}, {
	  input: 'sc://ñ#x',
	  base: 'about:blank',
	  href: 'sc://%C3%B1#x',
	  origin: 'null',
	  protocol: 'sc:',
	  username: '',
	  password: '',
	  host: '%C3%B1',
	  hostname: '%C3%B1',
	  port: '',
	  pathname: '',
	  search: '',
	  hash: '#x'
	}, {
	  input: '#x',
	  base: 'sc://ñ',
	  href: 'sc://%C3%B1#x',
	  origin: 'null',
	  protocol: 'sc:',
	  username: '',
	  password: '',
	  host: '%C3%B1',
	  hostname: '%C3%B1',
	  port: '',
	  pathname: '',
	  search: '',
	  hash: '#x'
	}, {
	  input: '?x',
	  base: 'sc://ñ',
	  href: 'sc://%C3%B1?x',
	  origin: 'null',
	  protocol: 'sc:',
	  username: '',
	  password: '',
	  host: '%C3%B1',
	  hostname: '%C3%B1',
	  port: '',
	  pathname: '',
	  search: '?x',
	  hash: ''
	}, {
	  input: 'sc://?',
	  base: 'about:blank',
	  href: 'sc://?',
	  protocol: 'sc:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '',
	  search: '',
	  hash: ''
	}, {
	  input: 'sc://#',
	  base: 'about:blank',
	  href: 'sc://#',
	  protocol: 'sc:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '',
	  search: '',
	  hash: ''
	}, {
	  input: '///',
	  base: 'sc://x/',
	  href: 'sc:///',
	  protocol: 'sc:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: '////',
	  base: 'sc://x/',
	  href: 'sc:////',
	  protocol: 'sc:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '//',
	  search: '',
	  hash: ''
	}, {
	  input: '////x/',
	  base: 'sc://x/',
	  href: 'sc:////x/',
	  protocol: 'sc:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '//x/',
	  search: '',
	  hash: ''
	}, {
	  input: 'tftp://foobar.com/someconfig;mode=netascii',
	  base: 'about:blank',
	  href: 'tftp://foobar.com/someconfig;mode=netascii',
	  origin: 'null',
	  protocol: 'tftp:',
	  username: '',
	  password: '',
	  host: 'foobar.com',
	  hostname: 'foobar.com',
	  port: '',
	  pathname: '/someconfig;mode=netascii',
	  search: '',
	  hash: ''
	}, {
	  input: 'telnet://user:pass@foobar.com:23/',
	  base: 'about:blank',
	  href: 'telnet://user:pass@foobar.com:23/',
	  origin: 'null',
	  protocol: 'telnet:',
	  username: 'user',
	  password: 'pass',
	  host: 'foobar.com:23',
	  hostname: 'foobar.com',
	  port: '23',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'ut2004://10.10.10.10:7777/Index.ut2',
	  base: 'about:blank',
	  href: 'ut2004://10.10.10.10:7777/Index.ut2',
	  origin: 'null',
	  protocol: 'ut2004:',
	  username: '',
	  password: '',
	  host: '10.10.10.10:7777',
	  hostname: '10.10.10.10',
	  port: '7777',
	  pathname: '/Index.ut2',
	  search: '',
	  hash: ''
	}, {
	  input: 'redis://foo:bar@somehost:6379/0?baz=bam&qux=baz',
	  base: 'about:blank',
	  href: 'redis://foo:bar@somehost:6379/0?baz=bam&qux=baz',
	  origin: 'null',
	  protocol: 'redis:',
	  username: 'foo',
	  password: 'bar',
	  host: 'somehost:6379',
	  hostname: 'somehost',
	  port: '6379',
	  pathname: '/0',
	  search: '?baz=bam&qux=baz',
	  hash: ''
	}, {
	  input: 'rsync://foo@host:911/sup',
	  base: 'about:blank',
	  href: 'rsync://foo@host:911/sup',
	  origin: 'null',
	  protocol: 'rsync:',
	  username: 'foo',
	  password: '',
	  host: 'host:911',
	  hostname: 'host',
	  port: '911',
	  pathname: '/sup',
	  search: '',
	  hash: ''
	}, {
	  input: 'git://github.com/foo/bar.git',
	  base: 'about:blank',
	  href: 'git://github.com/foo/bar.git',
	  origin: 'null',
	  protocol: 'git:',
	  username: '',
	  password: '',
	  host: 'github.com',
	  hostname: 'github.com',
	  port: '',
	  pathname: '/foo/bar.git',
	  search: '',
	  hash: ''
	}, {
	  input: 'irc://myserver.com:6999/channel?passwd',
	  base: 'about:blank',
	  href: 'irc://myserver.com:6999/channel?passwd',
	  origin: 'null',
	  protocol: 'irc:',
	  username: '',
	  password: '',
	  host: 'myserver.com:6999',
	  hostname: 'myserver.com',
	  port: '6999',
	  pathname: '/channel',
	  search: '?passwd',
	  hash: ''
	}, {
	  input: 'dns://fw.example.org:9999/foo.bar.org?type=TXT',
	  base: 'about:blank',
	  href: 'dns://fw.example.org:9999/foo.bar.org?type=TXT',
	  origin: 'null',
	  protocol: 'dns:',
	  username: '',
	  password: '',
	  host: 'fw.example.org:9999',
	  hostname: 'fw.example.org',
	  port: '9999',
	  pathname: '/foo.bar.org',
	  search: '?type=TXT',
	  hash: ''
	}, {
	  input: 'ldap://localhost:389/ou=People,o=JNDITutorial',
	  base: 'about:blank',
	  href: 'ldap://localhost:389/ou=People,o=JNDITutorial',
	  origin: 'null',
	  protocol: 'ldap:',
	  username: '',
	  password: '',
	  host: 'localhost:389',
	  hostname: 'localhost',
	  port: '389',
	  pathname: '/ou=People,o=JNDITutorial',
	  search: '',
	  hash: ''
	}, {
	  input: 'git+https://github.com/foo/bar',
	  base: 'about:blank',
	  href: 'git+https://github.com/foo/bar',
	  origin: 'null',
	  protocol: 'git+https:',
	  username: '',
	  password: '',
	  host: 'github.com',
	  hostname: 'github.com',
	  port: '',
	  pathname: '/foo/bar',
	  search: '',
	  hash: ''
	}, {
	  input: 'urn:ietf:rfc:2648',
	  base: 'about:blank',
	  href: 'urn:ietf:rfc:2648',
	  origin: 'null',
	  protocol: 'urn:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: 'ietf:rfc:2648',
	  search: '',
	  hash: ''
	}, {
	  input: 'tag:joe@example.org,2001:foo/bar',
	  base: 'about:blank',
	  href: 'tag:joe@example.org,2001:foo/bar',
	  origin: 'null',
	  protocol: 'tag:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: 'joe@example.org,2001:foo/bar',
	  search: '',
	  hash: ''
	}, '# percent encoded hosts in non-special-URLs', {
	  input: 'non-special://%E2%80%A0/',
	  base: 'about:blank',
	  href: 'non-special://%E2%80%A0/',
	  protocol: 'non-special:',
	  username: '',
	  password: '',
	  host: '%E2%80%A0',
	  hostname: '%E2%80%A0',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'non-special://H%4fSt/path',
	  base: 'about:blank',
	  href: 'non-special://H%4fSt/path',
	  protocol: 'non-special:',
	  username: '',
	  password: '',
	  host: 'H%4fSt',
	  hostname: 'H%4fSt',
	  port: '',
	  pathname: '/path',
	  search: '',
	  hash: ''
	}, '# IPv6 in non-special-URLs', {
	  input: 'non-special://[1:2:0:0:5:0:0:0]/',
	  base: 'about:blank',
	  href: 'non-special://[1:2:0:0:5::]/',
	  protocol: 'non-special:',
	  username: '',
	  password: '',
	  host: '[1:2:0:0:5::]',
	  hostname: '[1:2:0:0:5::]',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'non-special://[1:2:0:0:0:0:0:3]/',
	  base: 'about:blank',
	  href: 'non-special://[1:2::3]/',
	  protocol: 'non-special:',
	  username: '',
	  password: '',
	  host: '[1:2::3]',
	  hostname: '[1:2::3]',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'non-special://[1:2::3]:80/',
	  base: 'about:blank',
	  href: 'non-special://[1:2::3]:80/',
	  protocol: 'non-special:',
	  username: '',
	  password: '',
	  host: '[1:2::3]:80',
	  hostname: '[1:2::3]',
	  port: '80',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'non-special://[:80/',
	  base: 'about:blank',
	  failure: true
	}, {
	  input: 'blob:https://example.com:443/',
	  base: 'about:blank',
	  href: 'blob:https://example.com:443/',
	  protocol: 'blob:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: 'https://example.com:443/',
	  search: '',
	  hash: ''
	}, {
	  input: 'blob:d3958f5c-0777-0845-9dcf-2cb28783acaf',
	  base: 'about:blank',
	  href: 'blob:d3958f5c-0777-0845-9dcf-2cb28783acaf',
	  protocol: 'blob:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: 'd3958f5c-0777-0845-9dcf-2cb28783acaf',
	  search: '',
	  hash: ''
	}, 'Invalid IPv4 radix digits', {
	  input: 'http://0177.0.0.0189',
	  base: 'about:blank',
	  href: 'http://0177.0.0.0189/',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: '0177.0.0.0189',
	  hostname: '0177.0.0.0189',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://0x7f.0.0.0x7g',
	  base: 'about:blank',
	  href: 'http://0x7f.0.0.0x7g/',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: '0x7f.0.0.0x7g',
	  hostname: '0x7f.0.0.0x7g',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://0X7F.0.0.0X7G',
	  base: 'about:blank',
	  href: 'http://0x7f.0.0.0x7g/',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: '0x7f.0.0.0x7g',
	  hostname: '0x7f.0.0.0x7g',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, 'Invalid IPv4 portion of IPv6 address', {
	  input: 'http://[::127.0.0.0.1]',
	  base: 'about:blank',
	  failure: true
	}, 'Uncompressed IPv6 addresses with 0', {
	  input: 'http://[0:1:0:1:0:1:0:1]',
	  base: 'about:blank',
	  href: 'http://[0:1:0:1:0:1:0:1]/',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: '[0:1:0:1:0:1:0:1]',
	  hostname: '[0:1:0:1:0:1:0:1]',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, {
	  input: 'http://[1:0:1:0:1:0:1:0]',
	  base: 'about:blank',
	  href: 'http://[1:0:1:0:1:0:1:0]/',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: '[1:0:1:0:1:0:1:0]',
	  hostname: '[1:0:1:0:1:0:1:0]',
	  port: '',
	  pathname: '/',
	  search: '',
	  hash: ''
	}, 'Percent-encoded query and fragment', {
	  input: "http://example.org/test?\"",
	  base: 'about:blank',
	  href: 'http://example.org/test?%22',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.org',
	  hostname: 'example.org',
	  port: '',
	  pathname: '/test',
	  search: '?%22',
	  hash: ''
	}, {
	  input: "http://example.org/test?#",
	  base: 'about:blank',
	  href: 'http://example.org/test?#',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.org',
	  hostname: 'example.org',
	  port: '',
	  pathname: '/test',
	  search: '',
	  hash: ''
	}, {
	  input: "http://example.org/test?<",
	  base: 'about:blank',
	  href: 'http://example.org/test?%3C',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.org',
	  hostname: 'example.org',
	  port: '',
	  pathname: '/test',
	  search: '?%3C',
	  hash: ''
	}, {
	  input: "http://example.org/test?>",
	  base: 'about:blank',
	  href: 'http://example.org/test?%3E',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.org',
	  hostname: 'example.org',
	  port: '',
	  pathname: '/test',
	  search: '?%3E',
	  hash: ''
	}, {
	  input: "http://example.org/test?\u2323",
	  base: 'about:blank',
	  href: 'http://example.org/test?%E2%8C%A3',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.org',
	  hostname: 'example.org',
	  port: '',
	  pathname: '/test',
	  search: '?%E2%8C%A3',
	  hash: ''
	}, {
	  input: 'http://example.org/test?%23%23',
	  base: 'about:blank',
	  href: 'http://example.org/test?%23%23',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.org',
	  hostname: 'example.org',
	  port: '',
	  pathname: '/test',
	  search: '?%23%23',
	  hash: ''
	},
	/*
	{
	  input: 'http://example.org/test?%GH',
	  base: 'about:blank',
	  href: 'http://example.org/test?%GH',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.org',
	  hostname: 'example.org',
	  port: '',
	  pathname: '/test',
	  search: '?%GH',
	  hash: '',
	},
	*/
	{
	  input: 'http://example.org/test?a#%EF',
	  base: 'about:blank',
	  href: 'http://example.org/test?a#%EF',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.org',
	  hostname: 'example.org',
	  port: '',
	  pathname: '/test',
	  search: '?a',
	  hash: '#%EF'
	}, {
	  input: 'http://example.org/test?a#%GH',
	  base: 'about:blank',
	  href: 'http://example.org/test?a#%GH',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.org',
	  hostname: 'example.org',
	  port: '',
	  pathname: '/test',
	  search: '?a',
	  hash: '#%GH'
	}, 'URLs that require a non-about:blank base. (Also serve as invalid base tests.)', {
	  input: 'a',
	  base: 'about:blank',
	  failure: true
	}, {
	  input: 'a/',
	  base: 'about:blank',
	  failure: true
	}, {
	  input: 'a//',
	  base: 'about:blank',
	  failure: true
	}, "Bases that don't fail to parse but fail to be bases", {
	  input: 'test-a-colon.html',
	  base: 'a:',
	  failure: true
	}, {
	  input: 'test-a-colon-b.html',
	  base: 'a:b',
	  failure: true
	}, 'Other base URL tests, that must succeed', {
	  input: 'test-a-colon-slash.html',
	  base: 'a:/',
	  href: 'a:/test-a-colon-slash.html',
	  protocol: 'a:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/test-a-colon-slash.html',
	  search: '',
	  hash: ''
	}, {
	  input: 'test-a-colon-slash-slash.html',
	  base: 'a://',
	  href: 'a:///test-a-colon-slash-slash.html',
	  protocol: 'a:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/test-a-colon-slash-slash.html',
	  search: '',
	  hash: ''
	}, {
	  input: 'test-a-colon-slash-b.html',
	  base: 'a:/b',
	  href: 'a:/test-a-colon-slash-b.html',
	  protocol: 'a:',
	  username: '',
	  password: '',
	  host: '',
	  hostname: '',
	  port: '',
	  pathname: '/test-a-colon-slash-b.html',
	  search: '',
	  hash: ''
	}, {
	  input: 'test-a-colon-slash-slash-b.html',
	  base: 'a://b',
	  href: 'a://b/test-a-colon-slash-slash-b.html',
	  protocol: 'a:',
	  username: '',
	  password: '',
	  host: 'b',
	  hostname: 'b',
	  port: '',
	  pathname: '/test-a-colon-slash-slash-b.html',
	  search: '',
	  hash: ''
	}, 'Null code point in fragment', {
	  input: "http://example.org/test?a#b\0c",
	  base: 'about:blank',
	  href: 'http://example.org/test?a#bc',
	  protocol: 'http:',
	  username: '',
	  password: '',
	  host: 'example.org',
	  hostname: 'example.org',
	  port: '',
	  pathname: '/test',
	  search: '?a',
	  hash: '#bc'
	}];

	/* eslint-disable no-script-url -- required for testing */
	var settersTestData = {
	  protocol: [{
	    comment: 'The empty string is not a valid scheme. Setter leaves the URL unchanged.',
	    href: 'a://example.net',
	    newValue: '',
	    expected: {
	      href: 'a://example.net',
	      protocol: 'a:'
	    }
	  }, {
	    href: 'a://example.net',
	    newValue: 'b',
	    expected: {
	      href: 'b://example.net',
	      protocol: 'b:'
	    }
	  }, {
	    href: 'javascript:alert(1)',
	    newValue: 'defuse',
	    expected: {
	      href: 'defuse:alert(1)',
	      protocol: 'defuse:'
	    }
	  }, {
	    comment: 'Upper-case ASCII is lower-cased',
	    href: 'a://example.net',
	    newValue: 'B',
	    expected: {
	      href: 'b://example.net',
	      protocol: 'b:'
	    }
	  }, {
	    comment: 'Non-ASCII is rejected',
	    href: 'a://example.net',
	    newValue: 'é',
	    expected: {
	      href: 'a://example.net',
	      protocol: 'a:'
	    }
	  }, {
	    comment: 'No leading digit',
	    href: 'a://example.net',
	    newValue: '0b',
	    expected: {
	      href: 'a://example.net',
	      protocol: 'a:'
	    }
	  }, {
	    comment: 'No leading punctuation',
	    href: 'a://example.net',
	    newValue: '+b',
	    expected: {
	      href: 'a://example.net',
	      protocol: 'a:'
	    }
	  }, {
	    href: 'a://example.net',
	    newValue: 'bC0+-.',
	    expected: {
	      href: 'bc0+-.://example.net',
	      protocol: 'bc0+-.:'
	    }
	  }, {
	    comment: 'Only some punctuation is acceptable',
	    href: 'a://example.net',
	    newValue: 'b,c',
	    expected: {
	      href: 'a://example.net',
	      protocol: 'a:'
	    }
	  }, {
	    comment: 'Non-ASCII is rejected',
	    href: 'a://example.net',
	    newValue: 'bé',
	    expected: {
	      href: 'a://example.net',
	      protocol: 'a:'
	    }
	  }, {
	    comment: 'Can’t switch from URL containing username/password/port to file',
	    href: 'http://test@example.net',
	    newValue: 'file',
	    expected: {
	      href: 'http://test@example.net/',
	      protocol: 'http:'
	    }
	  }, {
	    href: 'wss://x:x@example.net:1234',
	    newValue: 'file',
	    expected: {
	      href: 'wss://x:x@example.net:1234/',
	      protocol: 'wss:'
	    }
	  }, {
	    comment: 'Can’t switch from file URL with no host',
	    href: 'file://localhost/',
	    newValue: 'http',
	    expected: {
	      href: 'file:///',
	      protocol: 'file:'
	    }
	  }, {
	    href: 'file:',
	    newValue: 'wss',
	    expected: {
	      href: 'file:///',
	      protocol: 'file:'
	    }
	  }, {
	    comment: 'Can’t switch from special scheme to non-special',
	    href: 'http://example.net',
	    newValue: 'b',
	    expected: {
	      href: 'http://example.net/',
	      protocol: 'http:'
	    }
	  }, {
	    href: 'file://hi/path',
	    newValue: 's',
	    expected: {
	      href: 'file://hi/path',
	      protocol: 'file:'
	    }
	  }, {
	    href: 'https://example.net',
	    newValue: 's',
	    expected: {
	      href: 'https://example.net/',
	      protocol: 'https:'
	    }
	  }, {
	    href: 'ftp://example.net',
	    newValue: 'test',
	    expected: {
	      href: 'ftp://example.net/',
	      protocol: 'ftp:'
	    }
	  }, {
	    comment: 'Cannot-be-a-base URL doesn’t have a host, but URL in a special scheme must.',
	    href: 'mailto:me@example.net',
	    newValue: 'http',
	    expected: {
	      href: 'mailto:me@example.net',
	      protocol: 'mailto:'
	    }
	  }, {
	    comment: 'Can’t switch from non-special scheme to special',
	    href: 'ssh://me@example.net',
	    newValue: 'http',
	    expected: {
	      href: 'ssh://me@example.net',
	      protocol: 'ssh:'
	    }
	  }, {
	    href: 'ssh://me@example.net',
	    newValue: 'file',
	    expected: {
	      href: 'ssh://me@example.net',
	      protocol: 'ssh:'
	    }
	  }, {
	    href: 'ssh://example.net',
	    newValue: 'file',
	    expected: {
	      href: 'ssh://example.net',
	      protocol: 'ssh:'
	    }
	  }, {
	    href: 'nonsense:///test',
	    newValue: 'https',
	    expected: {
	      href: 'nonsense:///test',
	      protocol: 'nonsense:'
	    }
	  }, {
	    comment: "Stuff after the first ':' is ignored",
	    href: 'http://example.net',
	    newValue: 'https:foo : bar',
	    expected: {
	      href: 'https://example.net/',
	      protocol: 'https:'
	    }
	  }, {
	    comment: "Stuff after the first ':' is ignored",
	    href: 'data:text/html,<p>Test',
	    newValue: 'view-source+data:foo : bar',
	    expected: {
	      href: 'view-source+data:text/html,<p>Test',
	      protocol: 'view-source+data:'
	    }
	  }, {
	    comment: 'Port is set to null if it is the default for new scheme.',
	    href: 'http://foo.com:443/',
	    newValue: 'https',
	    expected: {
	      href: 'https://foo.com/',
	      protocol: 'https:',
	      port: ''
	    }
	  }],
	  username: [{
	    comment: 'No host means no username',
	    href: 'file:///home/you/index.html',
	    newValue: 'me',
	    expected: {
	      href: 'file:///home/you/index.html',
	      username: ''
	    }
	  }, {
	    comment: 'No host means no username',
	    href: 'unix:/run/foo.socket',
	    newValue: 'me',
	    expected: {
	      href: 'unix:/run/foo.socket',
	      username: ''
	    }
	  }, {
	    comment: 'Cannot-be-a-base means no username',
	    href: 'mailto:you@example.net',
	    newValue: 'me',
	    expected: {
	      href: 'mailto:you@example.net',
	      username: ''
	    }
	  }, {
	    href: 'javascript:alert(1)',
	    newValue: 'wario',
	    expected: {
	      href: 'javascript:alert(1)',
	      username: ''
	    }
	  }, {
	    href: 'http://example.net',
	    newValue: 'me',
	    expected: {
	      href: 'http://me@example.net/',
	      username: 'me'
	    }
	  }, {
	    href: 'http://:secret@example.net',
	    newValue: 'me',
	    expected: {
	      href: 'http://me:secret@example.net/',
	      username: 'me'
	    }
	  }, {
	    href: 'http://me@example.net',
	    newValue: '',
	    expected: {
	      href: 'http://example.net/',
	      username: ''
	    }
	  }, {
	    href: 'http://me:secret@example.net',
	    newValue: '',
	    expected: {
	      href: 'http://:secret@example.net/',
	      username: ''
	    }
	  }, {
	    comment: 'UTF-8 percent encoding with the userinfo encode set.',
	    href: 'http://example.net',
	    newValue: "\0\x01\t\n\r\x1F !\"#$%&'()*+,-./09:;<=>?@AZ[\\]^_`az{|}~\x7F\x80\x81\xC9\xE9",
	    expected: {
	      href: "http://%00%01%09%0A%0D%1F%20!%22%23$%&'()*+,-.%2F09%3A%3B%3C%3D%3E%3F%40AZ%5B%5C%5D%5E_%60az%7B%7C%7D~%7F%C2%80%C2%81%C3%89%C3%A9@example.net/",
	      username: "%00%01%09%0A%0D%1F%20!%22%23$%&'()*+,-.%2F09%3A%3B%3C%3D%3E%3F%40AZ%5B%5C%5D%5E_%60az%7B%7C%7D~%7F%C2%80%C2%81%C3%89%C3%A9"
	    }
	  }, {
	    comment: 'Bytes already percent-encoded are left as-is.',
	    href: 'http://example.net',
	    newValue: '%c3%89té',
	    expected: {
	      href: 'http://%c3%89t%C3%A9@example.net/',
	      username: '%c3%89t%C3%A9'
	    }
	  }, {
	    href: 'sc:///',
	    newValue: 'x',
	    expected: {
	      href: 'sc:///',
	      username: ''
	    }
	  }, {
	    href: 'javascript://x/',
	    newValue: 'wario',
	    expected: {
	      href: 'javascript://wario@x/',
	      username: 'wario'
	    }
	  }, {
	    href: 'file://test/',
	    newValue: 'test',
	    expected: {
	      href: 'file://test/',
	      username: ''
	    }
	  }],
	  password: [{
	    comment: 'No host means no password',
	    href: 'file:///home/me/index.html',
	    newValue: 'secret',
	    expected: {
	      href: 'file:///home/me/index.html',
	      password: ''
	    }
	  }, {
	    comment: 'No host means no password',
	    href: 'unix:/run/foo.socket',
	    newValue: 'secret',
	    expected: {
	      href: 'unix:/run/foo.socket',
	      password: ''
	    }
	  }, {
	    comment: 'Cannot-be-a-base means no password',
	    href: 'mailto:me@example.net',
	    newValue: 'secret',
	    expected: {
	      href: 'mailto:me@example.net',
	      password: ''
	    }
	  }, {
	    href: 'http://example.net',
	    newValue: 'secret',
	    expected: {
	      href: 'http://:secret@example.net/',
	      password: 'secret'
	    }
	  }, {
	    href: 'http://me@example.net',
	    newValue: 'secret',
	    expected: {
	      href: 'http://me:secret@example.net/',
	      password: 'secret'
	    }
	  }, {
	    href: 'http://:secret@example.net',
	    newValue: '',
	    expected: {
	      href: 'http://example.net/',
	      password: ''
	    }
	  }, {
	    href: 'http://me:secret@example.net',
	    newValue: '',
	    expected: {
	      href: 'http://me@example.net/',
	      password: ''
	    }
	  }, {
	    comment: 'UTF-8 percent encoding with the userinfo encode set.',
	    href: 'http://example.net',
	    newValue: "\0\x01\t\n\r\x1F !\"#$%&'()*+,-./09:;<=>?@AZ[\\]^_`az{|}~\x7F\x80\x81\xC9\xE9",
	    expected: {
	      href: "http://:%00%01%09%0A%0D%1F%20!%22%23$%&'()*+,-.%2F09%3A%3B%3C%3D%3E%3F%40AZ%5B%5C%5D%5E_%60az%7B%7C%7D~%7F%C2%80%C2%81%C3%89%C3%A9@example.net/",
	      password: "%00%01%09%0A%0D%1F%20!%22%23$%&'()*+,-.%2F09%3A%3B%3C%3D%3E%3F%40AZ%5B%5C%5D%5E_%60az%7B%7C%7D~%7F%C2%80%C2%81%C3%89%C3%A9"
	    }
	  }, {
	    comment: 'Bytes already percent-encoded are left as-is.',
	    href: 'http://example.net',
	    newValue: '%c3%89té',
	    expected: {
	      href: 'http://:%c3%89t%C3%A9@example.net/',
	      password: '%c3%89t%C3%A9'
	    }
	  }, {
	    href: 'sc:///',
	    newValue: 'x',
	    expected: {
	      href: 'sc:///',
	      password: ''
	    }
	  }, {
	    href: 'javascript://x/',
	    newValue: 'bowser',
	    expected: {
	      href: 'javascript://:bowser@x/',
	      password: 'bowser'
	    }
	  }, {
	    href: 'file://test/',
	    newValue: 'test',
	    expected: {
	      href: 'file://test/',
	      password: ''
	    }
	  }],
	  host: [{
	    comment: 'Non-special scheme',
	    href: 'sc://x/',
	    newValue: "\0",
	    expected: {
	      href: 'sc://x/',
	      host: 'x',
	      hostname: 'x'
	    }
	  }, {
	    href: 'sc://x/',
	    newValue: "\t",
	    expected: {
	      href: 'sc:///',
	      host: '',
	      hostname: ''
	    }
	  }, {
	    href: 'sc://x/',
	    newValue: "\n",
	    expected: {
	      href: 'sc:///',
	      host: '',
	      hostname: ''
	    }
	  }, {
	    href: 'sc://x/',
	    newValue: "\r",
	    expected: {
	      href: 'sc:///',
	      host: '',
	      hostname: ''
	    }
	  }, {
	    href: 'sc://x/',
	    newValue: ' ',
	    expected: {
	      href: 'sc://x/',
	      host: 'x',
	      hostname: 'x'
	    }
	  }, {
	    href: 'sc://x/',
	    newValue: '#',
	    expected: {
	      href: 'sc:///',
	      host: '',
	      hostname: ''
	    }
	  }, {
	    href: 'sc://x/',
	    newValue: '/',
	    expected: {
	      href: 'sc:///',
	      host: '',
	      hostname: ''
	    }
	  }, {
	    href: 'sc://x/',
	    newValue: '?',
	    expected: {
	      href: 'sc:///',
	      host: '',
	      hostname: ''
	    }
	  }, {
	    href: 'sc://x/',
	    newValue: '@',
	    expected: {
	      href: 'sc://x/',
	      host: 'x',
	      hostname: 'x'
	    }
	  }, {
	    href: 'sc://x/',
	    newValue: 'ß',
	    expected: {
	      href: 'sc://%C3%9F/',
	      host: '%C3%9F',
	      hostname: '%C3%9F'
	    }
	  }, {
	    comment: 'IDNA Nontransitional_Processing',
	    href: 'https://x/',
	    newValue: 'ß',
	    expected: {
	      href: 'https://xn--zca/',
	      host: 'xn--zca',
	      hostname: 'xn--zca'
	    }
	  }, {
	    comment: 'Cannot-be-a-base means no host',
	    href: 'mailto:me@example.net',
	    newValue: 'example.com',
	    expected: {
	      href: 'mailto:me@example.net',
	      host: ''
	    }
	  }, {
	    comment: 'Cannot-be-a-base means no password',
	    href: 'data:text/plain,Stuff',
	    newValue: 'example.net',
	    expected: {
	      href: 'data:text/plain,Stuff',
	      host: ''
	    }
	  }, {
	    href: 'http://example.net',
	    newValue: 'example.com:8080',
	    expected: {
	      href: 'http://example.com:8080/',
	      host: 'example.com:8080',
	      hostname: 'example.com',
	      port: '8080'
	    }
	  }, {
	    comment: 'Port number is unchanged if not specified in the new value',
	    href: 'http://example.net:8080',
	    newValue: 'example.com',
	    expected: {
	      href: 'http://example.com:8080/',
	      host: 'example.com:8080',
	      hostname: 'example.com',
	      port: '8080'
	    }
	  }, {
	    comment: 'Port number is unchanged if not specified',
	    href: 'http://example.net:8080',
	    newValue: 'example.com:',
	    expected: {
	      href: 'http://example.com:8080/',
	      host: 'example.com:8080',
	      hostname: 'example.com',
	      port: '8080'
	    }
	  }, {
	    comment: 'The empty host is not valid for special schemes',
	    href: 'http://example.net',
	    newValue: '',
	    expected: {
	      href: 'http://example.net/',
	      host: 'example.net'
	    }
	  }, {
	    comment: 'The empty host is OK for non-special schemes',
	    href: 'view-source+http://example.net/foo',
	    newValue: '',
	    expected: {
	      href: 'view-source+http:///foo',
	      host: ''
	    }
	  }, {
	    comment: 'Path-only URLs can gain a host',
	    href: 'a:/foo',
	    newValue: 'example.net',
	    expected: {
	      href: 'a://example.net/foo',
	      host: 'example.net'
	    }
	  }, {
	    comment: 'IPv4 address syntax is normalized',
	    href: 'http://example.net',
	    newValue: '0x7F000001:8080',
	    expected: {
	      href: 'http://127.0.0.1:8080/',
	      host: '127.0.0.1:8080',
	      hostname: '127.0.0.1',
	      port: '8080'
	    }
	  }, {
	    comment: 'IPv6 address syntax is normalized',
	    href: 'http://example.net',
	    newValue: '[::0:01]:2',
	    expected: {
	      href: 'http://[::1]:2/',
	      host: '[::1]:2',
	      hostname: '[::1]',
	      port: '2'
	    }
	  }, {
	    comment: 'Default port number is removed',
	    href: 'http://example.net',
	    newValue: 'example.com:80',
	    expected: {
	      href: 'http://example.com/',
	      host: 'example.com',
	      hostname: 'example.com',
	      port: ''
	    }
	  }, {
	    comment: 'Default port number is removed',
	    href: 'https://example.net',
	    newValue: 'example.com:443',
	    expected: {
	      href: 'https://example.com/',
	      host: 'example.com',
	      hostname: 'example.com',
	      port: ''
	    }
	  }, {
	    comment: 'Default port number is only removed for the relevant scheme',
	    href: 'https://example.net',
	    newValue: 'example.com:80',
	    expected: {
	      href: 'https://example.com:80/',
	      host: 'example.com:80',
	      hostname: 'example.com',
	      port: '80'
	    }
	  }, {
	    comment: 'Port number is removed if new port is scheme default and existing URL has a non-default port',
	    href: 'http://example.net:8080',
	    newValue: 'example.com:80',
	    expected: {
	      href: 'http://example.com/',
	      host: 'example.com',
	      hostname: 'example.com',
	      port: ''
	    }
	  }, {
	    comment: 'Stuff after a / delimiter is ignored',
	    href: 'http://example.net/path',
	    newValue: 'example.com/stuff',
	    expected: {
	      href: 'http://example.com/path',
	      host: 'example.com',
	      hostname: 'example.com',
	      port: ''
	    }
	  }, {
	    comment: 'Stuff after a / delimiter is ignored',
	    href: 'http://example.net/path',
	    newValue: 'example.com:8080/stuff',
	    expected: {
	      href: 'http://example.com:8080/path',
	      host: 'example.com:8080',
	      hostname: 'example.com',
	      port: '8080'
	    }
	  }, {
	    comment: 'Stuff after a ? delimiter is ignored',
	    href: 'http://example.net/path',
	    newValue: 'example.com?stuff',
	    expected: {
	      href: 'http://example.com/path',
	      host: 'example.com',
	      hostname: 'example.com',
	      port: ''
	    }
	  }, {
	    comment: 'Stuff after a ? delimiter is ignored',
	    href: 'http://example.net/path',
	    newValue: 'example.com:8080?stuff',
	    expected: {
	      href: 'http://example.com:8080/path',
	      host: 'example.com:8080',
	      hostname: 'example.com',
	      port: '8080'
	    }
	  }, {
	    comment: 'Stuff after a # delimiter is ignored',
	    href: 'http://example.net/path',
	    newValue: 'example.com#stuff',
	    expected: {
	      href: 'http://example.com/path',
	      host: 'example.com',
	      hostname: 'example.com',
	      port: ''
	    }
	  }, {
	    comment: 'Stuff after a # delimiter is ignored',
	    href: 'http://example.net/path',
	    newValue: 'example.com:8080#stuff',
	    expected: {
	      href: 'http://example.com:8080/path',
	      host: 'example.com:8080',
	      hostname: 'example.com',
	      port: '8080'
	    }
	  }, {
	    comment: 'Stuff after a \\ delimiter is ignored for special schemes',
	    href: 'http://example.net/path',
	    newValue: 'example.com\\stuff',
	    expected: {
	      href: 'http://example.com/path',
	      host: 'example.com',
	      hostname: 'example.com',
	      port: ''
	    }
	  }, {
	    comment: 'Stuff after a \\ delimiter is ignored for special schemes',
	    href: 'http://example.net/path',
	    newValue: 'example.com:8080\\stuff',
	    expected: {
	      href: 'http://example.com:8080/path',
	      host: 'example.com:8080',
	      hostname: 'example.com',
	      port: '8080'
	    }
	  }, {
	    comment: '\\ is not a delimiter for non-special schemes, but still forbidden in hosts',
	    href: 'view-source+http://example.net/path',
	    newValue: 'example.com\\stuff',
	    expected: {
	      href: 'view-source+http://example.net/path',
	      host: 'example.net',
	      hostname: 'example.net',
	      port: ''
	    }
	  }, {
	    comment: 'Anything other than ASCII digit stops the port parser in a setter but is not an error',
	    href: 'view-source+http://example.net/path',
	    newValue: 'example.com:8080stuff2',
	    expected: {
	      href: 'view-source+http://example.com:8080/path',
	      host: 'example.com:8080',
	      hostname: 'example.com',
	      port: '8080'
	    }
	  }, {
	    comment: 'Anything other than ASCII digit stops the port parser in a setter but is not an error',
	    href: 'http://example.net/path',
	    newValue: 'example.com:8080stuff2',
	    expected: {
	      href: 'http://example.com:8080/path',
	      host: 'example.com:8080',
	      hostname: 'example.com',
	      port: '8080'
	    }
	  }, {
	    comment: 'Anything other than ASCII digit stops the port parser in a setter but is not an error',
	    href: 'http://example.net/path',
	    newValue: 'example.com:8080+2',
	    expected: {
	      href: 'http://example.com:8080/path',
	      host: 'example.com:8080',
	      hostname: 'example.com',
	      port: '8080'
	    }
	  }, {
	    comment: 'Port numbers are 16 bit integers',
	    href: 'http://example.net/path',
	    newValue: 'example.com:65535',
	    expected: {
	      href: 'http://example.com:65535/path',
	      host: 'example.com:65535',
	      hostname: 'example.com',
	      port: '65535'
	    }
	  }, {
	    comment: 'Port numbers are 16 bit integers, overflowing is an error. Hostname is still set, though.',
	    href: 'http://example.net/path',
	    newValue: 'example.com:65536',
	    expected: {
	      href: 'http://example.com/path',
	      host: 'example.com',
	      hostname: 'example.com',
	      port: ''
	    }
	  }, {
	    comment: 'Broken IPv6',
	    href: 'http://example.net/',
	    newValue: '[google.com]',
	    expected: {
	      href: 'http://example.net/',
	      host: 'example.net',
	      hostname: 'example.net'
	    }
	  }, {
	    href: 'http://example.net/',
	    newValue: '[::1.2.3.4x]',
	    expected: {
	      href: 'http://example.net/',
	      host: 'example.net',
	      hostname: 'example.net'
	    }
	  }, {
	    href: 'http://example.net/',
	    newValue: '[::1.2.3.]',
	    expected: {
	      href: 'http://example.net/',
	      host: 'example.net',
	      hostname: 'example.net'
	    }
	  }, {
	    href: 'http://example.net/',
	    newValue: '[::1.2.]',
	    expected: {
	      href: 'http://example.net/',
	      host: 'example.net',
	      hostname: 'example.net'
	    }
	  }, {
	    href: 'http://example.net/',
	    newValue: '[::1.]',
	    expected: {
	      href: 'http://example.net/',
	      host: 'example.net',
	      hostname: 'example.net'
	    }
	  }, {
	    href: 'file://y/',
	    newValue: 'x:123',
	    expected: {
	      href: 'file://y/',
	      host: 'y',
	      hostname: 'y',
	      port: ''
	    }
	  }, {
	    href: 'file://y/',
	    newValue: 'loc%41lhost',
	    expected: {
	      href: 'file:///',
	      host: '',
	      hostname: '',
	      port: ''
	    }
	  }, {
	    href: 'file://hi/x',
	    newValue: '',
	    expected: {
	      href: 'file:///x',
	      host: '',
	      hostname: '',
	      port: ''
	    }
	  }, {
	    href: 'sc://test@test/',
	    newValue: '',
	    expected: {
	      href: 'sc://test@test/',
	      host: 'test',
	      hostname: 'test',
	      username: 'test'
	    }
	  }, {
	    href: 'sc://test:12/',
	    newValue: '',
	    expected: {
	      href: 'sc://test:12/',
	      host: 'test:12',
	      hostname: 'test',
	      port: '12'
	    }
	  }],
	  hostname: [{
	    comment: 'Non-special scheme',
	    href: 'sc://x/',
	    newValue: "\0",
	    expected: {
	      href: 'sc://x/',
	      host: 'x',
	      hostname: 'x'
	    }
	  }, {
	    href: 'sc://x/',
	    newValue: "\t",
	    expected: {
	      href: 'sc:///',
	      host: '',
	      hostname: ''
	    }
	  }, {
	    href: 'sc://x/',
	    newValue: "\n",
	    expected: {
	      href: 'sc:///',
	      host: '',
	      hostname: ''
	    }
	  }, {
	    href: 'sc://x/',
	    newValue: "\r",
	    expected: {
	      href: 'sc:///',
	      host: '',
	      hostname: ''
	    }
	  }, {
	    href: 'sc://x/',
	    newValue: ' ',
	    expected: {
	      href: 'sc://x/',
	      host: 'x',
	      hostname: 'x'
	    }
	  }, {
	    href: 'sc://x/',
	    newValue: '#',
	    expected: {
	      href: 'sc:///',
	      host: '',
	      hostname: ''
	    }
	  }, {
	    href: 'sc://x/',
	    newValue: '/',
	    expected: {
	      href: 'sc:///',
	      host: '',
	      hostname: ''
	    }
	  }, {
	    href: 'sc://x/',
	    newValue: '?',
	    expected: {
	      href: 'sc:///',
	      host: '',
	      hostname: ''
	    }
	  }, {
	    href: 'sc://x/',
	    newValue: '@',
	    expected: {
	      href: 'sc://x/',
	      host: 'x',
	      hostname: 'x'
	    }
	  }, {
	    comment: 'Cannot-be-a-base means no host',
	    href: 'mailto:me@example.net',
	    newValue: 'example.com',
	    expected: {
	      href: 'mailto:me@example.net',
	      host: ''
	    }
	  }, {
	    comment: 'Cannot-be-a-base means no password',
	    href: 'data:text/plain,Stuff',
	    newValue: 'example.net',
	    expected: {
	      href: 'data:text/plain,Stuff',
	      host: ''
	    }
	  }, {
	    href: 'http://example.net:8080',
	    newValue: 'example.com',
	    expected: {
	      href: 'http://example.com:8080/',
	      host: 'example.com:8080',
	      hostname: 'example.com',
	      port: '8080'
	    }
	  }, {
	    comment: 'The empty host is not valid for special schemes',
	    href: 'http://example.net',
	    newValue: '',
	    expected: {
	      href: 'http://example.net/',
	      host: 'example.net'
	    }
	  }, {
	    comment: 'The empty host is OK for non-special schemes',
	    href: 'view-source+http://example.net/foo',
	    newValue: '',
	    expected: {
	      href: 'view-source+http:///foo',
	      host: ''
	    }
	  }, {
	    comment: 'Path-only URLs can gain a host',
	    href: 'a:/foo',
	    newValue: 'example.net',
	    expected: {
	      href: 'a://example.net/foo',
	      host: 'example.net'
	    }
	  }, {
	    comment: 'IPv4 address syntax is normalized',
	    href: 'http://example.net:8080',
	    newValue: '0x7F000001',
	    expected: {
	      href: 'http://127.0.0.1:8080/',
	      host: '127.0.0.1:8080',
	      hostname: '127.0.0.1',
	      port: '8080'
	    }
	  }, {
	    comment: 'IPv6 address syntax is normalized',
	    href: 'http://example.net',
	    newValue: '[::0:01]',
	    expected: {
	      href: 'http://[::1]/',
	      host: '[::1]',
	      hostname: '[::1]',
	      port: ''
	    }
	  }, {
	    comment: 'Stuff after a : delimiter is ignored',
	    href: 'http://example.net/path',
	    newValue: 'example.com:8080',
	    expected: {
	      href: 'http://example.com/path',
	      host: 'example.com',
	      hostname: 'example.com',
	      port: ''
	    }
	  }, {
	    comment: 'Stuff after a : delimiter is ignored',
	    href: 'http://example.net:8080/path',
	    newValue: 'example.com:',
	    expected: {
	      href: 'http://example.com:8080/path',
	      host: 'example.com:8080',
	      hostname: 'example.com',
	      port: '8080'
	    }
	  }, {
	    comment: 'Stuff after a / delimiter is ignored',
	    href: 'http://example.net/path',
	    newValue: 'example.com/stuff',
	    expected: {
	      href: 'http://example.com/path',
	      host: 'example.com',
	      hostname: 'example.com',
	      port: ''
	    }
	  }, {
	    comment: 'Stuff after a ? delimiter is ignored',
	    href: 'http://example.net/path',
	    newValue: 'example.com?stuff',
	    expected: {
	      href: 'http://example.com/path',
	      host: 'example.com',
	      hostname: 'example.com',
	      port: ''
	    }
	  }, {
	    comment: 'Stuff after a # delimiter is ignored',
	    href: 'http://example.net/path',
	    newValue: 'example.com#stuff',
	    expected: {
	      href: 'http://example.com/path',
	      host: 'example.com',
	      hostname: 'example.com',
	      port: ''
	    }
	  }, {
	    comment: 'Stuff after a \\ delimiter is ignored for special schemes',
	    href: 'http://example.net/path',
	    newValue: 'example.com\\stuff',
	    expected: {
	      href: 'http://example.com/path',
	      host: 'example.com',
	      hostname: 'example.com',
	      port: ''
	    }
	  }, {
	    comment: '\\ is not a delimiter for non-special schemes, but still forbidden in hosts',
	    href: 'view-source+http://example.net/path',
	    newValue: 'example.com\\stuff',
	    expected: {
	      href: 'view-source+http://example.net/path',
	      host: 'example.net',
	      hostname: 'example.net',
	      port: ''
	    }
	  }, {
	    comment: 'Broken IPv6',
	    href: 'http://example.net/',
	    newValue: '[google.com]',
	    expected: {
	      href: 'http://example.net/',
	      host: 'example.net',
	      hostname: 'example.net'
	    }
	  }, {
	    href: 'http://example.net/',
	    newValue: '[::1.2.3.4x]',
	    expected: {
	      href: 'http://example.net/',
	      host: 'example.net',
	      hostname: 'example.net'
	    }
	  }, {
	    href: 'http://example.net/',
	    newValue: '[::1.2.3.]',
	    expected: {
	      href: 'http://example.net/',
	      host: 'example.net',
	      hostname: 'example.net'
	    }
	  }, {
	    href: 'http://example.net/',
	    newValue: '[::1.2.]',
	    expected: {
	      href: 'http://example.net/',
	      host: 'example.net',
	      hostname: 'example.net'
	    }
	  }, {
	    href: 'http://example.net/',
	    newValue: '[::1.]',
	    expected: {
	      href: 'http://example.net/',
	      host: 'example.net',
	      hostname: 'example.net'
	    }
	  }, {
	    href: 'file://y/',
	    newValue: 'x:123',
	    expected: {
	      href: 'file://y/',
	      host: 'y',
	      hostname: 'y',
	      port: ''
	    }
	  }, {
	    href: 'file://y/',
	    newValue: 'loc%41lhost',
	    expected: {
	      href: 'file:///',
	      host: '',
	      hostname: '',
	      port: ''
	    }
	  }, {
	    href: 'file://hi/x',
	    newValue: '',
	    expected: {
	      href: 'file:///x',
	      host: '',
	      hostname: '',
	      port: ''
	    }
	  }, {
	    href: 'sc://test@test/',
	    newValue: '',
	    expected: {
	      href: 'sc://test@test/',
	      host: 'test',
	      hostname: 'test',
	      username: 'test'
	    }
	  }, {
	    href: 'sc://test:12/',
	    newValue: '',
	    expected: {
	      href: 'sc://test:12/',
	      host: 'test:12',
	      hostname: 'test',
	      port: '12'
	    }
	  }],
	  port: [{
	    href: 'http://example.net',
	    newValue: '8080',
	    expected: {
	      href: 'http://example.net:8080/',
	      host: 'example.net:8080',
	      hostname: 'example.net',
	      port: '8080'
	    }
	  }, {
	    comment: 'Port number is removed if empty is the new value',
	    href: 'http://example.net:8080',
	    newValue: '',
	    expected: {
	      href: 'http://example.net/',
	      host: 'example.net',
	      hostname: 'example.net',
	      port: ''
	    }
	  }, {
	    comment: 'Default port number is removed',
	    href: 'http://example.net:8080',
	    newValue: '80',
	    expected: {
	      href: 'http://example.net/',
	      host: 'example.net',
	      hostname: 'example.net',
	      port: ''
	    }
	  }, {
	    comment: 'Default port number is removed',
	    href: 'https://example.net:4433',
	    newValue: '443',
	    expected: {
	      href: 'https://example.net/',
	      host: 'example.net',
	      hostname: 'example.net',
	      port: ''
	    }
	  }, {
	    comment: 'Default port number is only removed for the relevant scheme',
	    href: 'https://example.net',
	    newValue: '80',
	    expected: {
	      href: 'https://example.net:80/',
	      host: 'example.net:80',
	      hostname: 'example.net',
	      port: '80'
	    }
	  }, {
	    comment: 'Stuff after a / delimiter is ignored',
	    href: 'http://example.net/path',
	    newValue: '8080/stuff',
	    expected: {
	      href: 'http://example.net:8080/path',
	      host: 'example.net:8080',
	      hostname: 'example.net',
	      port: '8080'
	    }
	  }, {
	    comment: 'Stuff after a ? delimiter is ignored',
	    href: 'http://example.net/path',
	    newValue: '8080?stuff',
	    expected: {
	      href: 'http://example.net:8080/path',
	      host: 'example.net:8080',
	      hostname: 'example.net',
	      port: '8080'
	    }
	  }, {
	    comment: 'Stuff after a # delimiter is ignored',
	    href: 'http://example.net/path',
	    newValue: '8080#stuff',
	    expected: {
	      href: 'http://example.net:8080/path',
	      host: 'example.net:8080',
	      hostname: 'example.net',
	      port: '8080'
	    }
	  }, {
	    comment: 'Stuff after a \\ delimiter is ignored for special schemes',
	    href: 'http://example.net/path',
	    newValue: '8080\\stuff',
	    expected: {
	      href: 'http://example.net:8080/path',
	      host: 'example.net:8080',
	      hostname: 'example.net',
	      port: '8080'
	    }
	  }, {
	    comment: 'Anything other than ASCII digit stops the port parser in a setter but is not an error',
	    href: 'view-source+http://example.net/path',
	    newValue: '8080stuff2',
	    expected: {
	      href: 'view-source+http://example.net:8080/path',
	      host: 'example.net:8080',
	      hostname: 'example.net',
	      port: '8080'
	    }
	  }, {
	    comment: 'Anything other than ASCII digit stops the port parser in a setter but is not an error',
	    href: 'http://example.net/path',
	    newValue: '8080stuff2',
	    expected: {
	      href: 'http://example.net:8080/path',
	      host: 'example.net:8080',
	      hostname: 'example.net',
	      port: '8080'
	    }
	  }, {
	    comment: 'Anything other than ASCII digit stops the port parser in a setter but is not an error',
	    href: 'http://example.net/path',
	    newValue: '8080+2',
	    expected: {
	      href: 'http://example.net:8080/path',
	      host: 'example.net:8080',
	      hostname: 'example.net',
	      port: '8080'
	    }
	  }, {
	    comment: 'Port numbers are 16 bit integers',
	    href: 'http://example.net/path',
	    newValue: '65535',
	    expected: {
	      href: 'http://example.net:65535/path',
	      host: 'example.net:65535',
	      hostname: 'example.net',
	      port: '65535'
	    }
	  }, {
	    comment: 'Port numbers are 16 bit integers, overflowing is an error',
	    href: 'http://example.net:8080/path',
	    newValue: '65536',
	    expected: {
	      href: 'http://example.net:8080/path',
	      host: 'example.net:8080',
	      hostname: 'example.net',
	      port: '8080'
	    }
	  }, {
	    comment: 'Port numbers are 16 bit integers, overflowing is an error',
	    href: 'non-special://example.net:8080/path',
	    newValue: '65536',
	    expected: {
	      href: 'non-special://example.net:8080/path',
	      host: 'example.net:8080',
	      hostname: 'example.net',
	      port: '8080'
	    }
	  }, {
	    href: 'file://test/',
	    newValue: '12',
	    expected: {
	      href: 'file://test/',
	      port: ''
	    }
	  }, {
	    href: 'file://localhost/',
	    newValue: '12',
	    expected: {
	      href: 'file:///',
	      port: ''
	    }
	  }, {
	    href: 'non-base:value',
	    newValue: '12',
	    expected: {
	      href: 'non-base:value',
	      port: ''
	    }
	  }, {
	    href: 'sc:///',
	    newValue: '12',
	    expected: {
	      href: 'sc:///',
	      port: ''
	    }
	  }, {
	    href: 'sc://x/',
	    newValue: '12',
	    expected: {
	      href: 'sc://x:12/',
	      port: '12'
	    }
	  }, {
	    href: 'javascript://x/',
	    newValue: '12',
	    expected: {
	      href: 'javascript://x:12/',
	      port: '12'
	    }
	  }],
	  pathname: [{
	    comment: 'Cannot-be-a-base don’t have a path',
	    href: 'mailto:me@example.net',
	    newValue: '/foo',
	    expected: {
	      href: 'mailto:me@example.net',
	      pathname: 'me@example.net'
	    }
	  }, {
	    href: 'unix:/run/foo.socket?timeout=10',
	    newValue: '/var/log/../run/bar.socket',
	    expected: {
	      href: 'unix:/var/run/bar.socket?timeout=10',
	      pathname: '/var/run/bar.socket'
	    }
	  }, {
	    href: 'https://example.net#nav',
	    newValue: 'home',
	    expected: {
	      href: 'https://example.net/home#nav',
	      pathname: '/home'
	    }
	  }, {
	    href: 'https://example.net#nav',
	    newValue: '../home',
	    expected: {
	      href: 'https://example.net/home#nav',
	      pathname: '/home'
	    }
	  }, {
	    comment: "\\ is a segment delimiter for 'special' URLs",
	    href: 'http://example.net/home?lang=fr#nav',
	    newValue: '\\a\\%2E\\b\\%2e.\\c',
	    expected: {
	      href: 'http://example.net/a/c?lang=fr#nav',
	      pathname: '/a/c'
	    }
	  }, {
	    comment: "\\ is *not* a segment delimiter for non-'special' URLs",
	    href: 'view-source+http://example.net/home?lang=fr#nav',
	    newValue: '\\a\\%2E\\b\\%2e.\\c',
	    expected: {
	      href: 'view-source+http://example.net/\\a\\%2E\\b\\%2e.\\c?lang=fr#nav',
	      pathname: '/\\a\\%2E\\b\\%2e.\\c'
	    }
	  }, {
	    comment: 'UTF-8 percent encoding with the default encode set. Tabs and newlines are removed.',
	    href: 'a:/',
	    newValue: "\0\x01\t\n\r\x1F !\"#$%&'()*+,-./09:;<=>?@AZ[\\]^_`az{|}~\x7F\x80\x81\xC9\xE9",
	    expected: {
	      href: "a:/%00%01%1F%20!%22%23$%&'()*+,-./09:;%3C=%3E%3F@AZ[\\]^_%60az%7B|%7D~%7F%C2%80%C2%81%C3%89%C3%A9",
	      pathname: "/%00%01%1F%20!%22%23$%&'()*+,-./09:;%3C=%3E%3F@AZ[\\]^_%60az%7B|%7D~%7F%C2%80%C2%81%C3%89%C3%A9"
	    }
	  }, {
	    comment: 'Bytes already percent-encoded are left as-is, including %2E outside dotted segments.',
	    href: 'http://example.net',
	    newValue: '%2e%2E%c3%89té',
	    expected: {
	      href: 'http://example.net/%2e%2E%c3%89t%C3%A9',
	      pathname: '/%2e%2E%c3%89t%C3%A9'
	    }
	  }, {
	    comment: '? needs to be encoded',
	    href: 'http://example.net',
	    newValue: '?',
	    expected: {
	      href: 'http://example.net/%3F',
	      pathname: '/%3F'
	    }
	  }, {
	    comment: '# needs to be encoded',
	    href: 'http://example.net',
	    newValue: '#',
	    expected: {
	      href: 'http://example.net/%23',
	      pathname: '/%23'
	    }
	  }, {
	    comment: '? needs to be encoded, non-special scheme',
	    href: 'sc://example.net',
	    newValue: '?',
	    expected: {
	      href: 'sc://example.net/%3F',
	      pathname: '/%3F'
	    }
	  }, {
	    comment: '# needs to be encoded, non-special scheme',
	    href: 'sc://example.net',
	    newValue: '#',
	    expected: {
	      href: 'sc://example.net/%23',
	      pathname: '/%23'
	    }
	  }, {
	    comment: 'File URLs and (back)slashes',
	    href: 'file://monkey/',
	    newValue: '\\\\',
	    expected: {
	      href: 'file://monkey/',
	      pathname: '/'
	    }
	  }, {
	    comment: 'File URLs and (back)slashes',
	    href: 'file:///unicorn',
	    newValue: '//\\/',
	    expected: {
	      href: 'file:///',
	      pathname: '/'
	    }
	  }, {
	    comment: 'File URLs and (back)slashes',
	    href: 'file:///unicorn',
	    newValue: '//monkey/..//',
	    expected: {
	      href: 'file:///',
	      pathname: '/'
	    }
	  }],
	  search: [{
	    href: 'https://example.net#nav',
	    newValue: 'lang=fr',
	    expected: {
	      href: 'https://example.net/?lang=fr#nav',
	      search: '?lang=fr'
	    }
	  }, {
	    href: 'https://example.net?lang=en-US#nav',
	    newValue: 'lang=fr',
	    expected: {
	      href: 'https://example.net/?lang=fr#nav',
	      search: '?lang=fr'
	    }
	  }, {
	    href: 'https://example.net?lang=en-US#nav',
	    newValue: '?lang=fr',
	    expected: {
	      href: 'https://example.net/?lang=fr#nav',
	      search: '?lang=fr'
	    }
	  }, {
	    href: 'https://example.net?lang=en-US#nav',
	    newValue: '??lang=fr',
	    expected: {
	      href: 'https://example.net/??lang=fr#nav',
	      search: '??lang=fr'
	    }
	  }, {
	    href: 'https://example.net?lang=en-US#nav',
	    newValue: '?',
	    expected: {
	      href: 'https://example.net/?#nav',
	      search: ''
	    }
	  }, {
	    href: 'https://example.net?lang=en-US#nav',
	    newValue: '',
	    expected: {
	      href: 'https://example.net/#nav',
	      search: ''
	    }
	  }, {
	    href: 'https://example.net?lang=en-US',
	    newValue: '',
	    expected: {
	      href: 'https://example.net/',
	      search: ''
	    }
	  }, {
	    href: 'https://example.net',
	    newValue: '',
	    expected: {
	      href: 'https://example.net/',
	      search: ''
	    }
	  },
	  /* URI malformed
	  {
	    comment: 'UTF-8 percent encoding with the query encode set. Tabs and newlines are removed.',
	    href: 'a:/',
	    newValue: "\u0000\u0001\t\n\r\u001f !\"#$%&'()*+,-./09:;<=>?@AZ[\\]^_`az{|}~\u007f\u0080\u0081Éé",
	    expected: {
	      href: "a:/?%00%01%1F%20!%22%23$%&'()*+,-./09:;%3C=%3E?@AZ[\\]^_`az{|}~%7F%C2%80%C2%81%C3%89%C3%A9",
	      search: "?%00%01%1F%20!%22%23$%&'()*+,-./09:;%3C=%3E?@AZ[\\]^_`az{|}~%7F%C2%80%C2%81%C3%89%C3%A9",
	    },
	  },
	  */
	  {
	    comment: 'Bytes already percent-encoded are left as-is',
	    href: 'http://example.net',
	    newValue: '%c3%89té',
	    expected: {
	      href: 'http://example.net/?%c3%89t%C3%A9',
	      search: '?%c3%89t%C3%A9'
	    }
	  }],
	  hash: [{
	    href: 'https://example.net',
	    newValue: 'main',
	    expected: {
	      href: 'https://example.net/#main',
	      hash: '#main'
	    }
	  }, {
	    href: 'https://example.net#nav',
	    newValue: 'main',
	    expected: {
	      href: 'https://example.net/#main',
	      hash: '#main'
	    }
	  }, {
	    href: 'https://example.net?lang=en-US',
	    newValue: '##nav',
	    expected: {
	      href: 'https://example.net/?lang=en-US##nav',
	      hash: '##nav'
	    }
	  }, {
	    href: 'https://example.net?lang=en-US#nav',
	    newValue: '#main',
	    expected: {
	      href: 'https://example.net/?lang=en-US#main',
	      hash: '#main'
	    }
	  }, {
	    href: 'https://example.net?lang=en-US#nav',
	    newValue: '#',
	    expected: {
	      href: 'https://example.net/?lang=en-US#',
	      hash: ''
	    }
	  }, {
	    href: 'https://example.net?lang=en-US#nav',
	    newValue: '',
	    expected: {
	      href: 'https://example.net/?lang=en-US',
	      hash: ''
	    }
	  }, {
	    href: 'http://example.net',
	    newValue: '#foo bar',
	    expected: {
	      href: 'http://example.net/#foo%20bar',
	      hash: '#foo%20bar'
	    }
	  }, {
	    href: 'http://example.net',
	    newValue: '#foo"bar',
	    expected: {
	      href: 'http://example.net/#foo%22bar',
	      hash: '#foo%22bar'
	    }
	  }, {
	    href: 'http://example.net',
	    newValue: '#foo<bar',
	    expected: {
	      href: 'http://example.net/#foo%3Cbar',
	      hash: '#foo%3Cbar'
	    }
	  }, {
	    href: 'http://example.net',
	    newValue: '#foo>bar',
	    expected: {
	      href: 'http://example.net/#foo%3Ebar',
	      hash: '#foo%3Ebar'
	    }
	  }, {
	    href: 'http://example.net',
	    newValue: '#foo`bar',
	    expected: {
	      href: 'http://example.net/#foo%60bar',
	      hash: '#foo%60bar'
	    }
	  }, {
	    comment: 'Simple percent-encoding; nuls, tabs, and newlines are removed',
	    href: 'a:/',
	    newValue: "\0\x01\t\n\r\x1F !\"#$%&'()*+,-./09:;<=>?@AZ[\\]^_`az{|}~\x7F\x80\x81\xC9\xE9",
	    expected: {
	      href: "a:/#%01%1F%20!%22#$%&'()*+,-./09:;%3C=%3E?@AZ[\\]^_%60az{|}~%7F%C2%80%C2%81%C3%89%C3%A9",
	      hash: "#%01%1F%20!%22#$%&'()*+,-./09:;%3C=%3E?@AZ[\\]^_%60az{|}~%7F%C2%80%C2%81%C3%89%C3%A9"
	    }
	  }, {
	    comment: 'Bytes already percent-encoded are left as-is',
	    href: 'http://example.net',
	    newValue: '%c3%89té',
	    expected: {
	      href: 'http://example.net/#%c3%89t%C3%A9',
	      hash: '#%c3%89t%C3%A9'
	    }
	  }, {
	    href: 'javascript:alert(1)',
	    newValue: 'castle',
	    expected: {
	      href: 'javascript:alert(1)#castle',
	      hash: '#castle'
	    }
	  }]
	};

	/* eslint-disable max-len -- ignore */
	var toASCIITestData = [{
	  comment: 'Label with hyphens in 3rd and 4th position',
	  input: 'aa--',
	  output: 'aa--'
	}, {
	  input: 'a†--',
	  output: 'xn--a---kp0a'
	}, {
	  input: 'ab--c',
	  output: 'ab--c'
	}, {
	  comment: 'Label with leading hyphen',
	  input: '-x',
	  output: '-x'
	}, {
	  input: '-†',
	  output: 'xn----xhn'
	}, {
	  input: '-x.xn--nxa',
	  output: '-x.xn--nxa'
	}, {
	  input: '-x.β',
	  output: '-x.xn--nxa'
	}, {
	  comment: 'Label with trailing hyphen',
	  input: 'x-.xn--nxa',
	  output: 'x-.xn--nxa'
	}, {
	  input: 'x-.β',
	  output: 'x-.xn--nxa'
	}, {
	  comment: 'Empty labels',
	  input: 'x..xn--nxa',
	  output: 'x..xn--nxa'
	}, {
	  input: 'x..β',
	  output: 'x..xn--nxa'
	}, {
	  comment: 'Invalid Punycode',
	  input: 'xn--a',
	  output: null
	}, {
	  input: 'xn--a.xn--nxa',
	  output: null
	}, {
	  input: 'xn--a.β',
	  output: null
	}, {
	  comment: 'Valid Punycode',
	  input: 'xn--nxa.xn--nxa',
	  output: 'xn--nxa.xn--nxa'
	}, {
	  comment: 'Mixed',
	  input: 'xn--nxa.β',
	  output: 'xn--nxa.xn--nxa'
	}, {
	  input: 'ab--c.xn--nxa',
	  output: 'ab--c.xn--nxa'
	}, {
	  input: 'ab--c.β',
	  output: 'ab--c.xn--nxa'
	}, {
	  comment: 'CheckJoiners is true',
	  input: "\u200D.example",
	  output: null
	}, {
	  input: 'xn--1ug.example',
	  output: null
	}, {
	  comment: 'CheckBidi is true',
	  input: 'يa',
	  output: null
	}, {
	  input: 'xn--a-yoc',
	  output: null
	}, {
	  comment: 'processing_option is Nontransitional_Processing',
	  input: 'ශ්‍රී',
	  output: 'xn--10cl1a0b660p'
	}, {
	  input: 'نامه‌ای',
	  output: 'xn--mgba3gch31f060k'
	}, {
	  comment: 'U+FFFD',
	  input: "\uFFFD.com",
	  output: null
	}, {
	  comment: 'U+FFFD character encoded in Punycode',
	  input: 'xn--zn7c.com',
	  output: null
	}, {
	  comment: 'Label longer than 63 code points',
	  input: 'x01234567890123456789012345678901234567890123456789012345678901x',
	  output: 'x01234567890123456789012345678901234567890123456789012345678901x'
	}, {
	  input: 'x01234567890123456789012345678901234567890123456789012345678901†',
	  output: 'xn--x01234567890123456789012345678901234567890123456789012345678901-6963b'
	}, {
	  input: 'x01234567890123456789012345678901234567890123456789012345678901x.xn--nxa',
	  output: 'x01234567890123456789012345678901234567890123456789012345678901x.xn--nxa'
	}, {
	  input: 'x01234567890123456789012345678901234567890123456789012345678901x.β',
	  output: 'x01234567890123456789012345678901234567890123456789012345678901x.xn--nxa'
	}, {
	  comment: 'Domain excluding TLD longer than 253 code points',
	  input: '01234567890123456789012345678901234567890123456789.01234567890123456789012345678901234567890123456789.01234567890123456789012345678901234567890123456789.01234567890123456789012345678901234567890123456789.0123456789012345678901234567890123456789012345678.x',
	  output: '01234567890123456789012345678901234567890123456789.01234567890123456789012345678901234567890123456789.01234567890123456789012345678901234567890123456789.01234567890123456789012345678901234567890123456789.0123456789012345678901234567890123456789012345678.x'
	}, {
	  input: '01234567890123456789012345678901234567890123456789.01234567890123456789012345678901234567890123456789.01234567890123456789012345678901234567890123456789.01234567890123456789012345678901234567890123456789.0123456789012345678901234567890123456789012345678.xn--nxa',
	  output: '01234567890123456789012345678901234567890123456789.01234567890123456789012345678901234567890123456789.01234567890123456789012345678901234567890123456789.01234567890123456789012345678901234567890123456789.0123456789012345678901234567890123456789012345678.xn--nxa'
	}, {
	  input: '01234567890123456789012345678901234567890123456789.01234567890123456789012345678901234567890123456789.01234567890123456789012345678901234567890123456789.01234567890123456789012345678901234567890123456789.0123456789012345678901234567890123456789012345678.β',
	  output: '01234567890123456789012345678901234567890123456789.01234567890123456789012345678901234567890123456789.01234567890123456789012345678901234567890123456789.01234567890123456789012345678901234567890123456789.0123456789012345678901234567890123456789012345678.xn--nxa'
	}];

	var hasOwnProperty = Object.prototype.hasOwnProperty;
	QUnit.test('URL constructor', function (assert) {
	  assert.isFunction(URL);
	  assert.arity(URL, 1);
	  assert.name(URL, 'URL');
	  assert.looksNative(URL);
	  assert.same(String(new URL('http://www.domain.com/a/b')), 'http://www.domain.com/a/b');
	  assert.same(String(new URL('/c/d', 'http://www.domain.com/a/b')), 'http://www.domain.com/c/d');
	  assert.same(String(new URL('b/c', 'http://www.domain.com/a/b')), 'http://www.domain.com/a/b/c');
	  assert.same(String(new URL('b/c', new URL('http://www.domain.com/a/b'))), 'http://www.domain.com/a/b/c');
	  assert.same(String(new URL({
	    toString: function () {
	      return 'https://example.org/';
	    }
	  })), 'https://example.org/');
	  assert.same(String(new URL('nonspecial://example.com/')), 'nonspecial://example.com/');
	  assert.same(String(new URL('https://測試')), 'https://xn--g6w251d/', 'unicode parsing');
	  assert.same(String(new URL('https://xxпривет.тест')), 'https://xn--xx-flcmn5bht.xn--e1aybc/', 'unicode parsing');
	  assert.same(String(new URL('https://xxПРИВЕТ.тест')), 'https://xn--xx-flcmn5bht.xn--e1aybc/', 'unicode parsing');
	  assert.same(String(new URL('http://Example.com/', 'https://example.org/')), 'http://example.com/');
	  assert.same(String(new URL('https://Example.com/', 'https://example.org/')), 'https://example.com/');
	  assert.same(String(new URL('nonspecial://Example.com/', 'https://example.org/')), 'nonspecial://Example.com/');
	  assert.same(String(new URL('http:Example.com/', 'https://example.org/')), 'http://example.com/');
	  assert.same(String(new URL('https:Example.com/', 'https://example.org/')), 'https://example.org/Example.com/');
	  assert.same(String(new URL('nonspecial:Example.com/', 'https://example.org/')), 'nonspecial:Example.com/');
	  assert.same(String(new URL('http://0300.168.0xF0')), 'http://192.168.0.240/');
	  assert.same(String(new URL('http://[20:0:0:1:0:0:0:ff]')), 'http://[20:0:0:1::ff]/');
	  // assert.same(String(new URL('http://257.168.0xF0')), 'http://257.168.0xf0/', 'incorrect IPv4 parsed as host'); // TypeError in Chrome and Safari
	  assert.same(String(new URL('http://0300.168.0xG0')), 'http://0300.168.0xg0/', 'incorrect IPv4 parsed as host');
	  assert.same(String(new URL('file:///var/log/system.log')), 'file:///var/log/system.log', 'file scheme');
	  // assert.same(String(new URL('file://nnsc.nsf.net/bar/baz')), 'file://nnsc.nsf.net/bar/baz', 'file scheme'); // 'file:///bar/baz' in FF
	  // assert.same(String(new URL('file://localhost/bar/baz')), 'file:///bar/baz', 'file scheme'); // 'file://localhost/bar/baz' in Chrome

	  assert["throws"](function () {
	    return new URL();
	  }, 'TypeError: Failed to construct \'URL\': 1 argument required, but only 0 present.');
	  assert["throws"](function () {
	    return new URL('');
	  }, 'TypeError: Failed to construct \'URL\': Invalid URL');
	  assert["throws"](function () {
	    return new URL('', 'about:blank');
	  }, 'TypeError: Failed to construct \'URL\': Invalid URL');
	  assert["throws"](function () {
	    return new URL('abc');
	  }, 'TypeError: Failed to construct \'URL\': Invalid URL');
	  assert["throws"](function () {
	    return new URL('//abc');
	  }, 'TypeError: Failed to construct \'URL\': Invalid URL');
	  assert["throws"](function () {
	    return new URL('http:///www.domain.com/', 'abc');
	  }, 'TypeError: Failed to construct \'URL\': Invalid base URL');
	  assert["throws"](function () {
	    return new URL('http:///www.domain.com/', null);
	  }, 'TypeError: Failed to construct \'URL\': Invalid base URL');
	  assert["throws"](function () {
	    return new URL('//abc', null);
	  }, 'TypeError: Failed to construct \'URL\': Invalid base URL');
	  assert["throws"](function () {
	    return new URL('http://[20:0:0:1:0:0:0:ff');
	  }, 'incorrect IPv6');
	  assert["throws"](function () {
	    return new URL('http://[20:0:0:1:0:0:0:fg]');
	  }, 'incorrect IPv6');
	  // assert.throws(() => new URL('http://a%b'), 'forbidden host code point'); // no error in FF
	  assert["throws"](function () {
	    return new URL('1http://zloirock.ru');
	  }, 'incorrect scheme');
	});
	QUnit.test('URL#href', function (assert) {
	  var url = new URL('http://zloirock.ru/');
	  if (DESCRIPTORS) {
	    assert.ok(!hasOwnProperty.call(url, 'href'));
	    var descriptor = Object.getOwnPropertyDescriptor(URL.prototype, 'href');
	    assert.same(descriptor.enumerable, true);
	    assert.same(descriptor.configurable, true);
	    assert.same(_typeof(descriptor.get), 'function');
	    assert.same(_typeof(descriptor.set), 'function');
	  }
	  assert.same(url.href, 'http://zloirock.ru/');
	  if (DESCRIPTORS) {
	    url.searchParams.append('foo', 'bar');
	    assert.same(url.href, 'http://zloirock.ru/?foo=bar');
	    url = new URL('http://zloirock.ru/foo');
	    url.href = 'https://測試';
	    assert.same(url.href, 'https://xn--g6w251d/', 'unicode parsing');
	    assert.same(String(url), 'https://xn--g6w251d/', 'unicode parsing');
	    url = new URL('http://zloirock.ru/foo');
	    url.href = 'https://xxпривет.тест';
	    assert.same(url.href, 'https://xn--xx-flcmn5bht.xn--e1aybc/', 'unicode parsing');
	    assert.same(String(url), 'https://xn--xx-flcmn5bht.xn--e1aybc/', 'unicode parsing');
	    url = new URL('http://zloirock.ru/foo');
	    url.href = 'https://xxПРИВЕТ.тест';
	    assert.same(url.href, 'https://xn--xx-flcmn5bht.xn--e1aybc/', 'unicode parsing');
	    assert.same(String(url), 'https://xn--xx-flcmn5bht.xn--e1aybc/', 'unicode parsing');
	    url = new URL('http://zloirock.ru/');
	    url.href = 'http://0300.168.0xF0';
	    assert.same(url.href, 'http://192.168.0.240/');
	    assert.same(String(url), 'http://192.168.0.240/');
	    url = new URL('http://zloirock.ru/');
	    url.href = 'http://[20:0:0:1:0:0:0:ff]';
	    assert.same(url.href, 'http://[20:0:0:1::ff]/');
	    assert.same(String(url), 'http://[20:0:0:1::ff]/');

	    // url = new URL('http://zloirock.ru/');
	    // url.href = 'http://257.168.0xF0'; // TypeError and Safari
	    // assert.same(url.href, 'http://257.168.0xf0/', 'incorrect IPv4 parsed as host'); // `F` instead of `f` in Chrome
	    // assert.same(String(url), 'http://257.168.0xf0/', 'incorrect IPv4 parsed as host'); // `F` instead of `f` in Chrome

	    url = new URL('http://zloirock.ru/');
	    url.href = 'http://0300.168.0xG0';
	    assert.same(url.href, 'http://0300.168.0xg0/', 'incorrect IPv4 parsed as host');
	    assert.same(String(url), 'http://0300.168.0xg0/', 'incorrect IPv4 parsed as host');
	    url = new URL('http://192.168.0.240/');
	    url.href = 'file:///var/log/system.log';
	    assert.same(url.href, 'file:///var/log/system.log', 'file -> ip');
	    assert.same(String(url), 'file:///var/log/system.log', 'file -> ip');
	    url = new URL('file:///var/log/system.log');
	    url.href = 'http://0300.168.0xF0';
	    assert.same(url.href, 'http://192.168.0.240/', 'file -> http');
	    assert.same(String(url), 'http://192.168.0.240/', 'file -> http');

	    // assert.throws(() => new URL('http://zloirock.ru/').href = undefined, 'incorrect URL'); // no error in Chrome
	    // assert.throws(() => new URL('http://zloirock.ru/').href = '', 'incorrect URL'); // no error in Chrome
	    // assert.throws(() => new URL('http://zloirock.ru/').href = 'abc', 'incorrect URL'); // no error in Chrome
	    // assert.throws(() => new URL('http://zloirock.ru/').href = '//abc', 'incorrect URL'); // no error in Chrome
	    // assert.throws(() => new URL('http://zloirock.ru/').href = 'http://[20:0:0:1:0:0:0:ff', 'incorrect IPv6'); // no error in Chrome
	    // assert.throws(() => new URL('http://zloirock.ru/').href = 'http://[20:0:0:1:0:0:0:fg]', 'incorrect IPv6'); // no error in Chrome
	    // assert.throws(() => new URL('http://zloirock.ru/').href = 'http://a%b', 'forbidden host code point'); // no error in Chrome and FF
	    // assert.throws(() => new URL('http://zloirock.ru/').href = '1http://zloirock.ru', 'incorrect scheme'); // no error in Chrome
	  }
	});

	QUnit.test('URL#origin', function (assert) {
	  var url = new URL('http://es6.zloirock.ru/tests.html');
	  if (DESCRIPTORS) {
	    assert.ok(!hasOwnProperty.call(url, 'origin'));
	    var descriptor = Object.getOwnPropertyDescriptor(URL.prototype, 'origin');
	    assert.same(descriptor.enumerable, true);
	    assert.same(descriptor.configurable, true);
	    assert.same(_typeof(descriptor.get), 'function');
	  }
	  assert.same(url.origin, 'http://es6.zloirock.ru');
	  assert.same(new URL('https://測試/tests').origin, 'https://xn--g6w251d');
	});
	QUnit.test('URL#protocol', function (assert) {
	  var url = new URL('http://zloirock.ru/');
	  if (DESCRIPTORS) {
	    assert.ok(!hasOwnProperty.call(url, 'protocol'));
	    var descriptor = Object.getOwnPropertyDescriptor(URL.prototype, 'protocol');
	    assert.same(descriptor.enumerable, true);
	    assert.same(descriptor.configurable, true);
	    assert.same(_typeof(descriptor.get), 'function');
	    assert.same(_typeof(descriptor.set), 'function');
	  }
	  assert.same(url.protocol, 'http:');
	  if (DESCRIPTORS) {
	    url = new URL('http://zloirock.ru/');
	    url.protocol = 'https';
	    assert.same(url.protocol, 'https:');
	    assert.same(String(url), 'https://zloirock.ru/');

	    // https://nodejs.org/api/url.html#url_special_schemes
	    // url = new URL('http://zloirock.ru/');
	    // url.protocol = 'fish';
	    // assert.same(url.protocol, 'http:');
	    // assert.same(url.href, 'http://zloirock.ru/');
	    // assert.same(String(url), 'http://zloirock.ru/');

	    url = new URL('http://zloirock.ru/');
	    url.protocol = '1http';
	    assert.same(url.protocol, 'http:');
	    assert.same(url.href, 'http://zloirock.ru/', 'incorrect scheme');
	    assert.same(String(url), 'http://zloirock.ru/', 'incorrect scheme');
	  }
	});
	QUnit.test('URL#username', function (assert) {
	  var url = new URL('http://zloirock.ru/');
	  if (DESCRIPTORS) {
	    assert.ok(!hasOwnProperty.call(url, 'username'));
	    var descriptor = Object.getOwnPropertyDescriptor(URL.prototype, 'username');
	    assert.same(descriptor.enumerable, true);
	    assert.same(descriptor.configurable, true);
	    assert.same(_typeof(descriptor.get), 'function');
	    assert.same(_typeof(descriptor.set), 'function');
	  }
	  assert.same(url.username, '');
	  url = new URL('http://username@zloirock.ru/');
	  assert.same(url.username, 'username');
	  if (DESCRIPTORS) {
	    url = new URL('http://zloirock.ru/');
	    url.username = 'username';
	    assert.same(url.username, 'username');
	    assert.same(String(url), 'http://username@zloirock.ru/');
	  }
	});
	QUnit.test('URL#password', function (assert) {
	  var url = new URL('http://zloirock.ru/');
	  if (DESCRIPTORS) {
	    assert.ok(!hasOwnProperty.call(url, 'password'));
	    var descriptor = Object.getOwnPropertyDescriptor(URL.prototype, 'password');
	    assert.same(descriptor.enumerable, true);
	    assert.same(descriptor.configurable, true);
	    assert.same(_typeof(descriptor.get), 'function');
	    assert.same(_typeof(descriptor.set), 'function');
	  }
	  assert.same(url.password, '');
	  url = new URL('http://username:password@zloirock.ru/');
	  assert.same(url.password, 'password');

	  // url = new URL('http://:password@zloirock.ru/'); // TypeError in FF
	  // assert.same(url.password, 'password');

	  if (DESCRIPTORS) {
	    url = new URL('http://zloirock.ru/');
	    url.username = 'username';
	    url.password = 'password';
	    assert.same(url.password, 'password');
	    assert.same(String(url), 'http://username:password@zloirock.ru/');

	    // url = new URL('http://zloirock.ru/');
	    // url.password = 'password';
	    // assert.same(url.password, 'password'); // '' in FF
	    // assert.same(String(url), 'http://:password@zloirock.ru/'); // 'http://zloirock.ru/' in FF
	  }
	});

	QUnit.test('URL#host', function (assert) {
	  var url = new URL('http://zloirock.ru:81/path');
	  if (DESCRIPTORS) {
	    assert.ok(!hasOwnProperty.call(url, 'host'));
	    var descriptor = Object.getOwnPropertyDescriptor(URL.prototype, 'host');
	    assert.same(descriptor.enumerable, true);
	    assert.same(descriptor.configurable, true);
	    assert.same(_typeof(descriptor.get), 'function');
	    assert.same(_typeof(descriptor.set), 'function');
	  }
	  assert.same(url.host, 'zloirock.ru:81');
	  if (DESCRIPTORS) {
	    url = new URL('http://zloirock.ru:81/path');
	    url.host = 'example.com:82';
	    assert.same(url.host, 'example.com:82');
	    assert.same(String(url), 'http://example.com:82/path');

	    // url = new URL('http://zloirock.ru:81/path');
	    // url.host = 'other?domain.com';
	    // assert.same(String(url), 'http://other:81/path'); // 'http://other/?domain.com/path' in Safari

	    url = new URL('https://www.mydomain.com:8080/path/');
	    url.host = 'www.otherdomain.com:80';
	    assert.same(url.href, 'https://www.otherdomain.com:80/path/', 'set default port for another protocol');

	    // url = new URL('https://www.mydomain.com:8080/path/');
	    // url.host = 'www.otherdomain.com:443';
	    // assert.same(url.href, 'https://www.otherdomain.com/path/', 'set default port');

	    url = new URL('http://zloirock.ru/foo');
	    url.host = '測試';
	    assert.same(url.host, 'xn--g6w251d', 'unicode parsing');
	    assert.same(String(url), 'http://xn--g6w251d/foo', 'unicode parsing');
	    url = new URL('http://zloirock.ru/foo');
	    url.host = 'xxпривет.тест';
	    assert.same(url.host, 'xn--xx-flcmn5bht.xn--e1aybc', 'unicode parsing');
	    assert.same(String(url), 'http://xn--xx-flcmn5bht.xn--e1aybc/foo', 'unicode parsing');
	    url = new URL('http://zloirock.ru/foo');
	    url.host = 'xxПРИВЕТ.тест';
	    assert.same(url.host, 'xn--xx-flcmn5bht.xn--e1aybc', 'unicode parsing');
	    assert.same(String(url), 'http://xn--xx-flcmn5bht.xn--e1aybc/foo', 'unicode parsing');
	    url = new URL('http://zloirock.ru/foo');
	    url.host = '0300.168.0xF0';
	    assert.same(url.host, '192.168.0.240');
	    assert.same(String(url), 'http://192.168.0.240/foo');

	    // url = new URL('http://zloirock.ru/foo');
	    // url.host = '[20:0:0:1:0:0:0:ff]';
	    // assert.same(url.host, '[20:0:0:1::ff]'); // ':0' in Chrome, 'zloirock.ru' in Safari
	    // assert.same(String(url), 'http://[20:0:0:1::ff]/foo'); // 'http://[20:0/foo' in Chrome, 'http://zloirock.ru/foo' in Safari

	    // url = new URL('file:///var/log/system.log');
	    // url.host = 'nnsc.nsf.net'; // does not work in FF
	    // assert.same(url.hostname, 'nnsc.nsf.net', 'file');
	    // assert.same(String(url), 'file://nnsc.nsf.net/var/log/system.log', 'file');

	    // url = new URL('http://zloirock.ru/');
	    // url.host = '[20:0:0:1:0:0:0:ff';
	    // assert.same(url.host, 'zloirock.ru', 'incorrect IPv6'); // ':0' in Chrome
	    // assert.same(String(url), 'http://zloirock.ru/', 'incorrect IPv6'); // 'http://[20:0/' in Chrome

	    // url = new URL('http://zloirock.ru/');
	    // url.host = '[20:0:0:1:0:0:0:fg]';
	    // assert.same(url.host, 'zloirock.ru', 'incorrect IPv6'); // ':0' in Chrome
	    // assert.same(String(url), 'http://zloirock.ru/', 'incorrect IPv6'); // 'http://[20:0/' in Chrome

	    // url = new URL('http://zloirock.ru/');
	    // url.host = 'a%b';
	    // assert.same(url.host, 'zloirock.ru', 'forbidden host code point'); // '' in Chrome, 'a%b' in FF
	    // assert.same(String(url), 'http://zloirock.ru/', 'forbidden host code point'); // 'http://a%25b/' in Chrome, 'http://a%b/' in FF
	  }
	});

	QUnit.test('URL#hostname', function (assert) {
	  var url = new URL('http://zloirock.ru:81/');
	  if (DESCRIPTORS) {
	    assert.ok(!hasOwnProperty.call(url, 'hostname'));
	    var descriptor = Object.getOwnPropertyDescriptor(URL.prototype, 'hostname');
	    assert.same(descriptor.enumerable, true);
	    assert.same(descriptor.configurable, true);
	    assert.same(_typeof(descriptor.get), 'function');
	    assert.same(_typeof(descriptor.set), 'function');
	  }
	  assert.same(url.hostname, 'zloirock.ru');
	  if (DESCRIPTORS) {
	    url = new URL('http://zloirock.ru:81/');
	    url.hostname = 'example.com';
	    assert.same(url.hostname, 'example.com');
	    assert.same(String(url), 'http://example.com:81/');

	    // url = new URL('http://zloirock.ru:81/');
	    // url.hostname = 'example.com:82';
	    // assert.same(url.hostname, 'example.com'); // '' in Chrome
	    // assert.same(String(url), 'http://example.com:81/'); // 'ttp://example.com:82:81/' in Chrome

	    url = new URL('http://zloirock.ru/foo');
	    url.hostname = '測試';
	    assert.same(url.hostname, 'xn--g6w251d', 'unicode parsing');
	    assert.same(String(url), 'http://xn--g6w251d/foo', 'unicode parsing');
	    url = new URL('http://zloirock.ru/foo');
	    url.hostname = 'xxпривет.тест';
	    assert.same(url.hostname, 'xn--xx-flcmn5bht.xn--e1aybc', 'unicode parsing');
	    assert.same(String(url), 'http://xn--xx-flcmn5bht.xn--e1aybc/foo', 'unicode parsing');
	    url = new URL('http://zloirock.ru/foo');
	    url.hostname = 'xxПРИВЕТ.тест';
	    assert.same(url.hostname, 'xn--xx-flcmn5bht.xn--e1aybc', 'unicode parsing');
	    assert.same(String(url), 'http://xn--xx-flcmn5bht.xn--e1aybc/foo', 'unicode parsing');
	    url = new URL('http://zloirock.ru/foo');
	    url.hostname = '0300.168.0xF0';
	    assert.same(url.hostname, '192.168.0.240');
	    assert.same(String(url), 'http://192.168.0.240/foo');

	    // url = new URL('http://zloirock.ru/foo');
	    // url.hostname = '[20:0:0:1:0:0:0:ff]';
	    // assert.same(url.hostname, '[20:0:0:1::ff]'); // 'zloirock.ru' in Safari
	    // assert.same(String(url), 'http://[20:0:0:1::ff]/foo'); // 'http://zloirock.ru/foo' in Safari

	    // url = new URL('file:///var/log/system.log');
	    // url.hostname = 'nnsc.nsf.net'; // does not work in FF
	    // assert.same(url.hostname, 'nnsc.nsf.net', 'file');
	    // assert.same(String(url), 'file://nnsc.nsf.net/var/log/system.log', 'file');

	    // url = new URL('http://zloirock.ru/');
	    // url.hostname = '[20:0:0:1:0:0:0:ff';
	    // assert.same(url.hostname, 'zloirock.ru', 'incorrect IPv6'); // '' in Chrome
	    // assert.same(String(url), 'http://zloirock.ru/', 'incorrect IPv6'); // 'http://[20:0:0:1:0:0:0:ff' in Chrome

	    // url = new URL('http://zloirock.ru/');
	    // url.hostname = '[20:0:0:1:0:0:0:fg]';
	    // assert.same(url.hostname, 'zloirock.ru', 'incorrect IPv6'); // '' in Chrome
	    // assert.same(String(url), 'http://zloirock.ru/', 'incorrect IPv6'); // 'http://[20:0:0:1:0:0:0:ff/' in Chrome

	    // url = new URL('http://zloirock.ru/');
	    // url.hostname = 'a%b';
	    // assert.same(url.hostname, 'zloirock.ru', 'forbidden host code point'); // '' in Chrome, 'a%b' in FF
	    // assert.same(String(url), 'http://zloirock.ru/', 'forbidden host code point'); // 'http://a%25b/' in Chrome, 'http://a%b/' in FF
	  }
	});

	QUnit.test('URL#port', function (assert) {
	  var url = new URL('http://zloirock.ru:1337/');
	  if (DESCRIPTORS) {
	    assert.ok(!hasOwnProperty.call(url, 'port'));
	    var descriptor = Object.getOwnPropertyDescriptor(URL.prototype, 'port');
	    assert.same(descriptor.enumerable, true);
	    assert.same(descriptor.configurable, true);
	    assert.same(_typeof(descriptor.get), 'function');
	    assert.same(_typeof(descriptor.set), 'function');
	  }
	  assert.same(url.port, '1337');
	  if (DESCRIPTORS) {
	    url = new URL('http://zloirock.ru/');
	    url.port = 80;
	    assert.same(url.port, '');
	    assert.same(String(url), 'http://zloirock.ru/');
	    url.port = 1337;
	    assert.same(url.port, '1337');
	    assert.same(String(url), 'http://zloirock.ru:1337/');
	    // url.port = 'abcd';
	    // assert.same(url.port, '1337'); // '0' in Chrome
	    // assert.same(String(url), 'http://zloirock.ru:1337/'); // 'http://zloirock.ru:0/' in Chrome
	    // url.port = '5678abcd';
	    // assert.same(url.port, '5678'); // '1337' in FF
	    // assert.same(String(url), 'http://zloirock.ru:5678/'); // 'http://zloirock.ru:1337/"' in FF
	    url.port = 1234.5678;
	    assert.same(url.port, '1234');
	    assert.same(String(url), 'http://zloirock.ru:1234/');
	    // url.port = 1e10;
	    // assert.same(url.port, '1234'); // '0' in Chrome
	    // assert.same(String(url), 'http://zloirock.ru:1234/'); // 'http://zloirock.ru:0/' in Chrome
	  }
	});

	QUnit.test('URL#pathname', function (assert) {
	  var url = new URL('http://zloirock.ru/foo/bar');
	  if (DESCRIPTORS) {
	    assert.ok(!hasOwnProperty.call(url, 'pathname'));
	    var descriptor = Object.getOwnPropertyDescriptor(URL.prototype, 'pathname');
	    assert.same(descriptor.enumerable, true);
	    assert.same(descriptor.configurable, true);
	    assert.same(_typeof(descriptor.get), 'function');
	    assert.same(_typeof(descriptor.set), 'function');
	  }
	  assert.same(url.pathname, '/foo/bar');
	  if (DESCRIPTORS) {
	    url = new URL('http://zloirock.ru/');
	    url.pathname = 'bar/baz';
	    assert.same(url.pathname, '/bar/baz');
	    assert.same(String(url), 'http://zloirock.ru/bar/baz');
	  }
	});
	QUnit.test('URL#search', function (assert) {
	  var url = new URL('http://zloirock.ru/');
	  if (DESCRIPTORS) {
	    assert.ok(!hasOwnProperty.call(url, 'search'));
	    var descriptor = Object.getOwnPropertyDescriptor(URL.prototype, 'search');
	    assert.same(descriptor.enumerable, true);
	    assert.same(descriptor.configurable, true);
	    assert.same(_typeof(descriptor.get), 'function');
	    assert.same(_typeof(descriptor.set), 'function');
	  }
	  assert.same(url.search, '');
	  url = new URL('http://zloirock.ru/?foo=bar');
	  assert.same(url.search, '?foo=bar');
	  if (DESCRIPTORS) {
	    url = new URL('http://zloirock.ru/?');
	    assert.same(url.search, '');
	    assert.same(String(url), 'http://zloirock.ru/?');
	    url.search = 'foo=bar';
	    assert.same(url.search, '?foo=bar');
	    assert.same(String(url), 'http://zloirock.ru/?foo=bar');
	    url.search = '?bar=baz';
	    assert.same(url.search, '?bar=baz');
	    assert.same(String(url), 'http://zloirock.ru/?bar=baz');
	    url.search = '';
	    assert.same(url.search, '');
	    assert.same(String(url), 'http://zloirock.ru/');
	  }
	});
	QUnit.test('URL#searchParams', function (assert) {
	  var url = new URL('http://zloirock.ru/?foo=bar&bar=baz');
	  if (DESCRIPTORS) {
	    assert.ok(!hasOwnProperty.call(url, 'searchParams'));
	    var descriptor = Object.getOwnPropertyDescriptor(URL.prototype, 'searchParams');
	    assert.same(descriptor.enumerable, true);
	    assert.same(descriptor.configurable, true);
	    assert.same(_typeof(descriptor.get), 'function');
	  }
	  assert.ok(url.searchParams instanceof URLSearchParams);
	  assert.same(url.searchParams.get('foo'), 'bar');
	  assert.same(url.searchParams.get('bar'), 'baz');
	  if (DESCRIPTORS) {
	    url = new URL('http://zloirock.ru/');
	    url.searchParams.append('foo', 'bar');
	    assert.same(String(url), 'http://zloirock.ru/?foo=bar');
	    url = new URL('http://zloirock.ru/');
	    url.search = 'foo=bar';
	    assert.same(url.searchParams.get('foo'), 'bar');
	    url = new URL('http://zloirock.ru/?foo=bar&bar=baz');
	    url.search = '';
	    assert.same(url.searchParams.has('foo'), false);
	  }
	});
	QUnit.test('URL#hash', function (assert) {
	  var url = new URL('http://zloirock.ru/');
	  if (DESCRIPTORS) {
	    assert.ok(!hasOwnProperty.call(url, 'hash'));
	    var descriptor = Object.getOwnPropertyDescriptor(URL.prototype, 'hash');
	    assert.same(descriptor.enumerable, true);
	    assert.same(descriptor.configurable, true);
	    assert.same(_typeof(descriptor.get), 'function');
	    assert.same(_typeof(descriptor.set), 'function');
	  }
	  assert.same(url.hash, '');
	  url = new URL('http://zloirock.ru/#foo');
	  assert.same(url.hash, '#foo');
	  url = new URL('http://zloirock.ru/#');
	  assert.same(url.hash, '');
	  assert.same(String(url), 'http://zloirock.ru/#');
	  if (DESCRIPTORS) {
	    url = new URL('http://zloirock.ru/#');
	    url.hash = 'foo';
	    assert.same(url.hash, '#foo');
	    assert.same(String(url), 'http://zloirock.ru/#foo');
	    url.hash = '';
	    assert.same(url.hash, '');
	    assert.same(String(url), 'http://zloirock.ru/');
	    // url.hash = '#';
	    // assert.same(url.hash, '');
	    // assert.same(String(url), 'http://zloirock.ru/'); // 'http://zloirock.ru/#' in FF
	    url.hash = '#foo';
	    assert.same(url.hash, '#foo');
	    assert.same(String(url), 'http://zloirock.ru/#foo');
	    url.hash = '#foo#bar';
	    assert.same(url.hash, '#foo#bar');
	    assert.same(String(url), 'http://zloirock.ru/#foo#bar');
	    url = new URL('http://zloirock.ru/');
	    url.hash = 'абa';
	    assert.same(url.hash, '#%D0%B0%D0%B1a');

	    // url = new URL('http://zloirock.ru/');
	    // url.hash = '\udc01\ud802a';
	    // assert.same(url.hash, '#%EF%BF%BD%EF%BF%BDa', 'unmatched surrogates');
	  }
	});

	QUnit.test('URL#toJSON', function (assert) {
	  var toJSON = URL.prototype.toJSON;
	  assert.isFunction(toJSON);
	  assert.arity(toJSON, 0);
	  assert.name(toJSON, 'toJSON');
	  assert.enumerable(URL.prototype, 'toJSON');
	  assert.looksNative(toJSON);
	  var url = new URL('http://zloirock.ru/');
	  assert.same(url.toJSON(), 'http://zloirock.ru/');
	  if (DESCRIPTORS) {
	    url.searchParams.append('foo', 'bar');
	    assert.same(url.toJSON(), 'http://zloirock.ru/?foo=bar');
	  }
	});
	QUnit.test('URL#toString', function (assert) {
	  var toString = URL.prototype.toString;
	  assert.isFunction(toString);
	  assert.arity(toString, 0);
	  assert.name(toString, 'toString');
	  assert.enumerable(URL.prototype, 'toString');
	  assert.looksNative(toString);
	  var url = new URL('http://zloirock.ru/');
	  assert.same(url.toString(), 'http://zloirock.ru/');
	  if (DESCRIPTORS) {
	    url.searchParams.append('foo', 'bar');
	    assert.same(url.toString(), 'http://zloirock.ru/?foo=bar');
	  }
	});
	QUnit.test('URL#@@toStringTag', function (assert) {
	  var url = new URL('http://zloirock.ru/');
	  assert.same({}.toString.call(url), '[object URL]');
	});
	QUnit.test('URL.sham', function (assert) {
	  assert.same(URL.sham, DESCRIPTORS ? undefined : true);
	});

	// `core-js` URL implementation pass all (exclude some encoding-ralated) tests
	// from the next 3 test cases, but URLs from all of popular browsers fail a serious part of tests.
	// Replacing all of them does not looks like a good idea, so next test cases disabled by default.

	// see https://github.com/web-platform-tests/wpt/blob/master/url
	QUnit.skip('WPT URL constructor tests', function (assert) {
	  var _loop = function (expected) {
	    if (typeof expected == 'string') return "continue";
	    var name = "Parsing: <" + expected.input + "> against <" + expected.base + ">";
	    if (expected.failure) {
	      assert["throws"](function () {
	        return new URL(expected.input, expected.base || 'about:blank');
	      }, name);
	    } else {
	      var url = new URL(expected.input, expected.base || 'about:blank');
	      assert.same(url.href, expected.href, name + ": href");
	      assert.same(url.protocol, expected.protocol, name + ": protocol");
	      assert.same(url.username, expected.username, name + ": username");
	      assert.same(url.password, expected.password, name + ": password");
	      assert.same(url.host, expected.host, name + ": host");
	      assert.same(url.hostname, expected.hostname, name + ": hostname");
	      assert.same(url.port, expected.port, name + ": port");
	      assert.same(url.pathname, expected.pathname, name + ": pathname");
	      assert.same(url.search, expected.search, name + ": search");
	      if ('searchParams' in expected) {
	        assert.same(url.searchParams.toString(), expected.searchParams, name + ": searchParams");
	      }
	      assert.same(url.hash, expected.hash, name + ": hash");
	      if ('origin' in expected) {
	        assert.same(url.origin, expected.origin, name + ": origin");
	      }
	    }
	  };
	  for (var _iterator = _createForOfIteratorHelperLoose(urlTestData), _step; !(_step = _iterator()).done;) {
	    var expected = _step.value;
	    var _ret = _loop(expected);
	    if (_ret === "continue") continue;
	  }
	});

	// see https://github.com/web-platform-tests/wpt/blob/master/url
	if (DESCRIPTORS) QUnit.skip('WPT URL setters tests', function (assert) {
	  for (var setter in settersTestData) {
	    var testCases = settersTestData[setter];
	    for (var _iterator2 = _createForOfIteratorHelperLoose(testCases), _step2; !(_step2 = _iterator2()).done;) {
	      var _ref = _step2.value;
	      var href = _ref.href;
	      var newValue = _ref.newValue;
	      var comment = _ref.comment;
	      var expected = _ref.expected;
	      var name = "Setting <" + href + ">." + setter + " = '" + newValue + "'.";
	      if (comment) name += " " + comment;
	      var url = new URL(href);
	      url[setter] = newValue;
	      for (var attribute in expected) {
	        assert.same(url[attribute], expected[attribute], name);
	      }
	    }
	  }
	});

	// see https://github.com/web-platform-tests/wpt/blob/master/url
	QUnit.skip('WPT conversion to ASCII tests', function (assert) {
	  var _loop2 = function (input) {
	    var name = "Parsing: <" + input + ">";
	    if (comment) name += " " + comment;
	    if (output === null) {
	      assert["throws"](function () {
	        return new URL("https://" + input + "/x");
	      }, name);
	    } else {
	      var url = new URL("https://" + input + "/x");
	      assert.same(url.host, output, name);
	      assert.same(url.hostname, output, name);
	      assert.same(url.pathname, '/x', name);
	      assert.same(url.href, "https://" + output + "/x", name);
	    }
	  };
	  for (var _iterator3 = _createForOfIteratorHelperLoose(toASCIITestData), _step3; !(_step3 = _iterator3()).done;) {
	    var _ref2 = _step3.value;
	    var comment = _ref2.comment;
	    var input = _ref2.input;
	    var output = _ref2.output;
	    _loop2(input);
	  }
	});

})();
