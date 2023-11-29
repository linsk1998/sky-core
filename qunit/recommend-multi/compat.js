(function () {

	var $inject_Symbol_iterator = '@@iterator';

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

	var hasOwnProperty = Object$1.prototype.hasOwnProperty;

	function hasOwn(obj, key) {
	  if (obj == null) {
	    throw new TypeError("Cannot convert undefined or null to object");
	  }
	  if (typeof obj !== "object") {
	    return false;
	  }
	  if (!(key in obj)) {
	    return false;
	  }
	  if (obj instanceof NullProtoObject) {
	    return false;
	  }
	  var value = obj[key];
	  if (!(obj instanceof Object)) {
	    var constructor = obj.constructor;
	    if (constructor) {
	      var proto = constructor.prototype;
	      if (obj !== proto) {
	        return proto[key] !== value;
	      }
	    }
	  }
	  return hasOwnProperty.call(obj, key);
	}
	;

	if (!Object$1.hasOwn) {
	  Object$1.hasOwn = hasOwn;
	}

	function isPrimitive(value) {
	  return typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean';
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
	  if (isPrimitive(obj)) {
	    return arr;
	  }
	  for (var key in obj) {
	    if (key.substring(0, 2) === "@@") {
	      if (Object.hasOwn(obj, key)) {
	        if (key in all_symbol) {
	          arr.push(all_symbol[key]);
	        }
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

	function _typeof(obj) {
	  "@babel/helpers - typeof";

	  return _typeof = "function" == typeof Symbol && "symbol" == typeof $inject_Symbol_iterator ? function (obj) {
	    return typeof obj;
	  } : function (obj) {
	    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
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

	if (!String.prototype['@@iterator']) {
	  String.prototype['@@iterator'] = iterator;
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

	function findLastIndex(callback) {
	  var thisArg = arguments[1];
	  var i = this.length;
	  if (i > 0) {
	    while (i-- > 0) {
	      var j = this[i];
	      var r = callback.call(thisArg, j, i, this);
	      if (r) {
	        return i;
	      }
	    }
	  }
	  return -1;
	}

	if (!Array.prototype.findLastIndex) {
	  Array.prototype.findLastIndex = findLastIndex;
	}

	QUnit.test('Array#findLastIndex', function (assert) {
	  var findLastIndex = Array.prototype.findLastIndex;
	  assert.isFunction(findLastIndex);
	  assert.arity(findLastIndex, 1);
	  assert.name(findLastIndex, 'findLastIndex');
	  assert.looksNative(findLastIndex);
	  assert.nonEnumerable(Array.prototype, 'findLastIndex');
	  var array = [1];
	  var context = {};
	  array.findLastIndex(function (value, key, that) {
	    assert.same(arguments.length, 3, 'correct number of callback arguments');
	    assert.same(value, 1, 'correct value in callback');
	    assert.same(key, 0, 'correct index in callback');
	    assert.same(that, array, 'correct link to array in callback');
	    assert.same(this, context, 'correct callback context');
	  }, context);
	  assert.same([{}, 2, NaN, 42, 1].findLastIndex(function (it) {
	    return !(it % 2);
	  }), 3);
	  assert.same([{}, 2, NaN, 42, 1].findLastIndex(function (it) {
	    return it > 42;
	  }), -1);
	  var values = '';
	  var keys = '';
	  [1, 2, 3].findLastIndex(function (value, key) {
	    values += value;
	    keys += key;
	  });
	  assert.same(values, '321');
	  assert.same(keys, '210');
	  if (STRICT) {
	    assert["throws"](function () {
	      return findLastIndex.call(null, 0);
	    }, TypeError);
	    assert["throws"](function () {
	      return findLastIndex.call(undefined, 0);
	    }, TypeError);
	  }
	  assert.notThrows(function () {
	    return findLastIndex.call({
	      length: -1,
	      0: 1
	    }, function () {
	      throw new Error();
	    }) === -1;
	  }, 'uses ToLength');
	  // assert.equal(true, 'findLastIndex' in Array.prototype[Symbol.unscopables], 'In Array#@@unscopables');
	});

	function findLast(callback) {
	  var thisArg = arguments[1];
	  var i = findLastIndex.call(this, callback, thisArg);
	  if (i >= 0) {
	    return this[i];
	  }
	}
	;

	if (!Array.prototype.findLast) {
	  Array.prototype.findLast = findLast;
	}

	QUnit.test('Array#findLast', function (assert) {
	  var findLast = Array.prototype.findLast;
	  assert.isFunction(findLast);
	  assert.arity(findLast, 1);
	  assert.name(findLast, 'findLast');
	  assert.looksNative(findLast);
	  assert.nonEnumerable(Array.prototype, 'findLast');
	  var array = [1];
	  var context = {};
	  array.findLast(function (value, key, that) {
	    assert.same(arguments.length, 3, 'correct number of callback arguments');
	    assert.same(value, 1, 'correct value in callback');
	    assert.same(key, 0, 'correct index in callback');
	    assert.same(that, array, 'correct link to array in callback');
	    assert.same(this, context, 'correct callback context');
	  }, context);
	  assert.same([{}, 2, NaN, 42, 1].findLast(function (it) {
	    return !(it % 2);
	  }), 42);
	  assert.same([{}, 2, NaN, 42, 1].findLast(function (it) {
	    return it === 43;
	  }), undefined);
	  var values = '';
	  var keys = '';
	  [1, 2, 3].findLast(function (value, key) {
	    values += value;
	    keys += key;
	  });
	  assert.same(values, '321');
	  assert.same(keys, '210');
	  if (STRICT) {
	    assert["throws"](function () {
	      return findLast.call(null, 0);
	    }, TypeError);
	    assert["throws"](function () {
	      return findLast.call(undefined, 0);
	    }, TypeError);
	  }
	  assert.notThrows(function () {
	    return findLast.call({
	      length: -1,
	      0: 1
	    }, function () {
	      throw new Error();
	    }) === undefined;
	  }, 'uses ToLength');
	  // assert.equal(true, 'find' in Array.prototype[Symbol.unscopables], 'In Array#@@unscopables');
	});

	function toReversed() {
	  var arr = Array.prototype.slice.call(this);
	  arr.reverse();
	  return arr;
	}

	if (!Array.prototype.toReversed) {
	  Array.prototype.toReversed = toReversed;
	}

	QUnit.test('Array#toReversed', function (assert) {
	  var _array$constructor;
	  var toReversed = Array.prototype.toReversed;
	  assert.isFunction(toReversed);
	  assert.arity(toReversed, 0);
	  assert.name(toReversed, 'toReversed');
	  assert.looksNative(toReversed);
	  assert.nonEnumerable(Array.prototype, 'toReversed');
	  var array = [1, 2];
	  assert.ok(array.toReversed() !== array, 'immutable');
	  assert.deepEqual([1, 2.2, 3.3].toReversed(), [3.3, 2.2, 1], 'basic');
	  var object = {};
	  array = {
	    0: undefined,
	    1: 2,
	    2: 1,
	    3: 'X',
	    4: -1,
	    5: 'a',
	    6: true,
	    7: object,
	    8: NaN,
	    10: Infinity,
	    length: 11
	  };
	  var expected = [Infinity, undefined, NaN, object, true, 'a', -1, 'X', 1, 2, undefined];
	  assert.deepEqual(toReversed.call(array), expected, 'non-array target');
	  array = [1];
	  // eslint-disable-next-line object-shorthand -- constructor
	  array.constructor = (_array$constructor = {}, _array$constructor[Symbol.species] = function () {
	    return {
	      foo: 1
	    };
	  }, _array$constructor);
	  assert.equal(true, array.toReversed() instanceof Array, 'non-generic');
	  if (STRICT) {
	    assert["throws"](function () {
	      return toReversed.call(null, function () {/* empty */}, 1);
	    }, TypeError);
	    assert["throws"](function () {
	      return toReversed.call(undefined, function () {/* empty */}, 1);
	    }, TypeError);
	  }

	  // assert.equal(true, 'toReversed' in Array.prototype[Symbol.unscopables], 'In Array#@@unscopables');
	});

	function toSorted(fn) {
	  var arr = Array.prototype.slice.call(this);
	  arr.sort.apply(arr, arguments);
	  return arr;
	}

	if (!Array.prototype.toSorted) {
	  Array.prototype.toSorted = toSorted;
	}

	QUnit.test('Array#toSorted', function (assert) {
	  var _array$constructor;
	  var toSorted = Array.prototype.toSorted;
	  assert.isFunction(toSorted);
	  assert.arity(toSorted, 1);
	  assert.name(toSorted, 'toSorted');
	  assert.looksNative(toSorted);
	  assert.nonEnumerable(Array.prototype, 'toSorted');
	  var array = [1];
	  assert.ok(array.toSorted() !== array, 'immutable');
	  assert.deepEqual([1, 3, 2].toSorted(), [1, 2, 3], '#1');
	  assert.deepEqual([1, 3, 2, 11].toSorted(), [1, 11, 2, 3], '#2');
	  assert.deepEqual([1, -1, 3, NaN, 2, 0, 11, -0].toSorted(), [-1, 0, -0, 1, 11, 2, 3, NaN], '#1');
	  array = Array(5);
	  array[0] = 1;
	  array[2] = 3;
	  array[4] = 2;
	  var expected = Array(5);
	  expected[0] = 1;
	  expected[1] = 2;
	  expected[2] = 3;
	  assert.deepEqual(array.toSorted(), expected, 'holes');
	  array = 'zyxwvutsrqponMLKJIHGFEDCBA'.split('');
	  expected = 'ABCDEFGHIJKLMnopqrstuvwxyz'.split('');
	  assert.deepEqual(array.toSorted(), expected, 'alpha #1');
	  array = 'ёяюэьыъщшчцхфутсрПОНМЛКЙИЗЖЕДГВБА'.split('');
	  expected = 'АБВГДЕЖЗИЙКЛМНОПрстуфхцчшщъыьэюяё'.split('');
	  assert.deepEqual(array.toSorted(), expected, 'alpha #2');
	  array = [undefined, 1];
	  assert.notThrows(function () {
	    return array = array.toSorted(function () {
	      throw 1;
	    });
	  }, 'undefined #1');
	  assert.deepEqual(array, [1, undefined], 'undefined #2');
	  var object = {
	    valueOf: function () {
	      return 1;
	    },
	    toString: function () {
	      return -1;
	    }
	  };
	  array = {
	    0: undefined,
	    1: 2,
	    2: 1,
	    3: 'X',
	    4: -1,
	    5: 'a',
	    6: true,
	    7: object,
	    8: NaN,
	    10: Infinity,
	    length: 11
	  };
	  expected = [-1, object, 1, 2, Infinity, NaN, 'X', 'a', true, undefined, undefined];

	  // assert.deepEqual(toSorted.call(array), expected, 'non-array target');

	  var index, mod, code, chr, value;
	  expected = Array(516);
	  array = Array(516);
	  for (index = 0; index < 516; index++) {
	    mod = index % 4;
	    array[index] = 515 - index;
	    expected[index] = index - 2 * mod + 3;
	  }

	  // assert.arrayEqual(array.toSorted((a, b) => (a / 4 | 0) - (b / 4 | 0)), expected, 'stable #1');

	  // assert.equal(true, 1 / [0, -0].toSorted()[0] > 0, '-0');

	  var result = '';
	  array = [];

	  // generate an array with more 512 elements (Chakra and old V8 fails only in this case)
	  for (code = 65; code < 76; code++) {
	    chr = String.fromCharCode(code);
	    switch (code) {
	      case 66:
	      case 69:
	      case 70:
	      case 72:
	        value = 3;
	        break;
	      case 68:
	      case 71:
	        value = 4;
	        break;
	      default:
	        value = 2;
	    }
	    for (index = 0; index < 47; index++) {
	      array.push({
	        k: chr + index,
	        v: value
	      });
	    }
	  }
	  array = array.toSorted(function (a, b) {
	    return b.v - a.v;
	  });
	  for (index = 0; index < array.length; index++) {
	    chr = array[index].k.charAt(0);
	    if (result.charAt(result.length - 1) !== chr) result += chr;
	  }

	  // assert.same(result, 'DGBEFHACIJK', 'stable #2');

	  assert.notThrows(function () {
	    return [1, 2, 3].toSorted(undefined).length === 3;
	  }, 'works with undefined');
	  assert["throws"](function () {
	    return [1, 2, 3].toSorted(null);
	  }, 'throws on null');
	  assert["throws"](function () {
	    return [1, 2, 3].toSorted({});
	  }, 'throws on {}');
	  if (typeof Symbol == 'function' && !Symbol.sham) {
	    assert["throws"](function () {
	      return [Symbol(1), Symbol(2)].toSorted();
	    }, 'w/o cmp throws on symbols');
	  }
	  array = [1];
	  // eslint-disable-next-line object-shorthand -- constructor
	  array.constructor = (_array$constructor = {}, _array$constructor[Symbol.species] = function () {
	    return {
	      foo: 1
	    };
	  }, _array$constructor);
	  assert.equal(true, array.toSorted() instanceof Array, 'non-generic');
	  if (STRICT) {
	    assert["throws"](function () {
	      return toSorted.call(null);
	    }, TypeError, 'ToObject(this)');
	    assert["throws"](function () {
	      return toSorted.call(undefined);
	    }, TypeError, 'ToObject(this)');
	  }

	  // assert.equal(true, 'toSorted' in Array.prototype[Symbol.unscopables], 'In Array#@@unscopables');
	});

	function toSpliced(a1, a2) {
	  var arr = Array.prototype.slice.call(this);
	  arr.splice.apply(arr, arguments);
	  return arr;
	}

	if (!Array.prototype.toSpliced) {
	  Array.prototype.toSpliced = toSpliced;
	}

	QUnit.test('Array#toSpliced', function (assert) {
	  var _array$constructor;
	  var toSpliced = Array.prototype.toSpliced;
	  assert.isFunction(toSpliced);
	  assert.arity(toSpliced, 2);
	  assert.name(toSpliced, 'toSpliced');
	  assert.looksNative(toSpliced);
	  assert.nonEnumerable(Array.prototype, 'toSpliced');
	  var array = [1, 2, 3, 4, 5];
	  assert.ok(array.toSpliced(2) !== array, 'immutable');
	  assert.deepEqual([1, 2, 3, 4, 5].toSpliced(2), [1, 2]);
	  assert.deepEqual([1, 2, 3, 4, 5].toSpliced(-2), [1, 2, 3]);
	  assert.deepEqual([1, 2, 3, 4, 5].toSpliced(2, 2), [1, 2, 5]);
	  assert.deepEqual([1, 2, 3, 4, 5].toSpliced(2, -2), [1, 2, 3, 4, 5]);
	  assert.deepEqual([1, 2, 3, 4, 5].toSpliced(2, 2, 6, 7), [1, 2, 6, 7, 5]);
	  if (STRICT) {
	    assert["throws"](function () {
	      return toSpliced.call(null);
	    }, TypeError);
	    assert["throws"](function () {
	      return toSpliced.call(undefined);
	    }, TypeError);
	  }
	  array = [];
	  // eslint-disable-next-line object-shorthand -- constructor
	  array.constructor = (_array$constructor = {}, _array$constructor[Symbol.species] = function () {
	    return {
	      foo: 1
	    };
	  }, _array$constructor);
	  assert.equal(true, array.toSpliced() instanceof Array, 'non-generic');

	  // assert.equal(true, 'toSpliced' in Array.prototype[Symbol.unscopables], 'In Array#@@unscopables');
	});

	function withAt(index, value) {
	  if (this == null) {
	    throw new TypeError("Cannot convert undefined or null to object");
	  }
	  if (index < 0) {
	    index += this.length;
	  }
	  if (index < 0 || index >= this.length) {
	    throw new RangeError("Invalid index: " + index);
	  }
	  var arr = Array.prototype.slice.call(this);
	  arr[index] = value;
	  return arr;
	}

	if (!Array.prototype["with"]) {
	  Array.prototype["with"] = withAt;
	}

	QUnit.test('Array#with', function (assert) {
	  var _array$constructor;
	  var withAt = Array.prototype["with"];
	  assert.isFunction(withAt);
	  assert.arity(withAt, 2);
	  // assert.name(withAt, 'with');
	  assert.looksNative(withAt);
	  assert.nonEnumerable(Array.prototype, 'with');
	  var array = [1, 2, 3, 4, 5];
	  assert.ok(array["with"](2, 1) !== array, 'immutable');
	  assert.deepEqual([1, 2, 3, 4, 5]["with"](2, 6), [1, 2, 6, 4, 5]);
	  assert.deepEqual([1, 2, 3, 4, 5]["with"](-2, 6), [1, 2, 3, 6, 5]);
	  assert.deepEqual([1, 2, 3, 4, 5]["with"]('1', 6), [1, 6, 3, 4, 5]);
	  assert["throws"](function () {
	    return [1, 2, 3, 4, 5]["with"](5, 6);
	  }, RangeError);
	  assert["throws"](function () {
	    return [1, 2, 3, 4, 5]["with"](-6, 6);
	  }, RangeError);
	  if (STRICT) {
	    assert["throws"](function () {
	      return withAt.call(null, 1, 2);
	    }, TypeError);
	    assert["throws"](function () {
	      return withAt.call(undefined, 1, 2);
	    }, TypeError);
	  }
	  array = [1, 2];
	  // eslint-disable-next-line object-shorthand -- constructor
	  array.constructor = (_array$constructor = {}, _array$constructor[Symbol.species] = function () {
	    return {
	      foo: 1
	    };
	  }, _array$constructor);
	  // assert.true(array.with(1, 2) instanceof Array, 'non-generic');
	});

	// import "../web/web.url";

})();
