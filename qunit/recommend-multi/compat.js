(function () {

	function values$1() {
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
	  Array.prototype.values = values$1;
	}

	var iterator$1 = '@@iterator';

	if (!Array.prototype[iterator$1]) {
	  Array.prototype[iterator$1] = Array.prototype.values;
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

	function _typeof(o) {
	  "@babel/helpers - typeof";

	  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
	    return typeof o;
	  } : function (o) {
	    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	  }, _typeof(o);
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
	  } else if (window == obj || obj instanceof Element || obj instanceof HTMLDocument) {
	    delete descriptor.enumerable;
	    defineProperty$1.apply(Object, arguments);
	  } else {
	    compat_defineProperty.apply(Object, arguments);
	  }
	  return obj;
	}
	;
	ie8_defineProperty.sham = true;
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
	  if (typeof obj !== "object" && typeof obj !== "function") {
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
	    descriptor.get = description.get;
	    descriptor.set = description.set;
	  }
	  obj['@@desc:' + prop] = descriptor;
	  return obj;
	}
	;
	compat_defineProperty.sham = true;

	if (Object$1.defineProperty) {
	  Object$1.defineProperty = ie8_defineProperty;
	} else {
	  Object$1.defineProperty = compat_defineProperty;
	}

	var $inject_Object_defineProperty = Object.defineProperty ? ie8_defineProperty : compat_defineProperty;

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

	function isJsObject(o) {
	  if (typeof o !== "object") {
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
	  if (typeof obj !== "object" && typeof obj !== "function") {
	    obj = Object(obj);
	  }
	  if ('__proto__' in obj) {
	    return obj.__proto__;
	  }
	  if (!('constructor' in obj)) {
	    return null;
	  }
	  if (Object.hasOwn(obj, 'constructor')) {
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

	function keys$1(obj) {
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
	    if (Object.hasOwn(obj, key)) {
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
	      if (Object.hasOwn(obj, key)) {
	        result.push(key);
	      }
	    }
	  }
	  return result;
	}

	if (!Object$1.keys) {
	  Object$1.keys = keys$1;
	}

	function defineProperties$1(obj, properties) {
	  var ownKeys = Object.keys(properties);
	  var len = ownKeys.length;
	  for (var i = 0; i < len; i++) {
	    var key = ownKeys[i];
	    $inject_Object_defineProperty(obj, key, properties[key]);
	  }
	  return obj;
	}
	;
	defineProperties$1.sham = true;

	var $inject_Object_defineProperties = Object$1.defineProperties || defineProperties$1;

	var DESCRIPTORS = !!function () {
	  return !!$inject_Object_defineProperties || !!Object.prototype.__defineSetter__;
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

	var defineProperties = Object$1.defineProperties;

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
	  var entries = arrayLike[iterator$1];
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

	function _arrayLikeToArray(r, a) {
	  (null == a || a > r.length) && (a = r.length);
	  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
	  return n;
	}

	function _unsupportedIterableToArray(r, a) {
	  if (r) {
	    if ("string" == typeof r) return _arrayLikeToArray(r, a);
	    var t = {}.toString.call(r).slice(8, -1);
	    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
	  }
	}

	function _createForOfIteratorHelperLoose(r, e) {
	  var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
	  if (t) return (t = t.call(r)).next.bind(t);
	  if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) {
	    t && (r = t);
	    var o = 0;
	    return function () {
	      return o >= r.length ? {
	        done: !0
	      } : {
	        done: !1,
	        value: r[o++]
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
	  }, _iterable[iterator$1] = function () {
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
	  return iterator$1 in O;
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

	if (!defineProperties) {
	  Object$1.defineProperties = defineProperties$1;
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
	    $inject_Object_defineProperties(o, properties);
	  }
	  return o;
	}
	;
	create.sham = true;

	if (!Object$1.create) {
	  Object$1.create = create;
	}

	function groupBy$1(iterable, keySelector) {
	  var entries = iterable[iterator$1];
	  if (!entries) {
	    throw new TypeError("object is not iterable");
	  }
	  var it = entries.call(iterable);
	  var r = Object.create(null);
	  var i = 0;
	  var key, value, arr;
	  while (true) {
	    var next = it.next();
	    if (next.done) break;
	    try {
	      value = next.value;
	      key = keySelector(value, i++);
	      if (key in r) {
	        arr = r[key];
	      } else {
	        arr = r[key] = [];
	      }
	      arr.push(value);
	    } catch (e) {
	      if (it["return"]) {
	        try {
	          it["return"]();
	        } catch (e) {}
	      }
	      throw e;
	    }
	  }
	  return r;
	}

	if (!Object$1.groupBy) {
	  Object$1.groupBy = groupBy$1;
	}

	if (!Object$1.getPrototypeOf) {
	  Object$1.getPrototypeOf = getPrototypeOf;
	}

	function forOwn(obj, fn, thisArg) {
	  var key;
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
	        if (proto[key] === obj[key]) {
	          continue;
	        }
	        if (fn.call(thisArg, obj[key], key) === false) {
	          return false;
	        }
	      }
	      return true;
	    }
	  }
	  for (key in obj) {
	    switch (key.substring(0, 2)) {
	      case "__":
	      case "@@":
	        continue;
	    }
	    if (hasOwnProperty.call(obj, key)) {
	      if (fn.call(thisArg, obj[key], key) === false) {
	        return false;
	      }
	    }
	  }
	  if (hasEnumBug) {
	    var i = dontEnums.length;
	    while (i-- > 0) {
	      key = dontEnums[i];
	      if (hasOwnProperty.call(obj, key)) {
	        if (fn.call(thisArg, obj[key], key) === false) {
	          return false;
	        }
	      }
	    }
	  }
	  return true;
	}
	;

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

	QUnit.test('Object.groupBy', function (assert) {
	  var groupBy = Object.groupBy;
	  var getPrototypeOf = Object.getPrototypeOf;
	  var entries = Object.entries;
	  assert.isFunction(groupBy);
	  assert.arity(groupBy, 2);
	  assert.name(groupBy, 'groupBy');
	  assert.same(getPrototypeOf(groupBy([], function (it) {
	    return it;
	  })), null);
	  assert.deepEqual(entries(groupBy([], function (it) {
	    return it;
	  })), []);
	  assert.deepEqual(entries(groupBy([1, 2], function (it) {
	    return Math.pow(it, 2);
	  })), [['1', [1]], ['4', [2]]]);
	  assert.deepEqual(entries(groupBy([1, 2, 1], function (it) {
	    return Math.pow(it, 2);
	  })), [['1', [1, 1]], ['4', [2]]]);
	  assert.deepEqual(entries(groupBy(createIterable$1([1, 2]), function (it) {
	    return Math.pow(it, 2);
	  })), [['1', [1]], ['4', [2]]]);
	  assert.deepEqual(entries(groupBy('qwe', function (it) {
	    return it;
	  })), [['q', ['q']], ['w', ['w']], ['e', ['e']]], 'iterable string');
	  var element = {};
	  groupBy([element], function (it, i) {
	    assert.same(arguments.length, 2);
	    assert.same(it, element);
	    assert.same(i, 0);
	  });
	});

	var Map$1 = window.Map;

	var isNaN$1 = window.isNaN;

	function isNaN(value) {
	  return typeof value === "number" && isNaN$1(value);
	}

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
	  Map.prototype.has = has;
	  Map.prototype.get = get;
	  Map.prototype.set = set;
	  Map.prototype["delete"] = remove;
	  Map.prototype.clear = clear;
	  Map.prototype.forEach = forEach;
	  Map.prototype.entries = entries;
	  Map.prototype.keys = keys;
	  Map.prototype.values = values;
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
	    if (item.key === key || isNaN(key) && isNaN(item.key)) {
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
	    if (item.key === key || isNaN(key) && isNaN(item.key)) {
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
	    if (item.key === key || isNaN(key) && isNaN(item.key)) {
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
	    if (item.key === key || isNaN(key) && isNaN(item.key)) {
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
	function values() {
	  return createIterable(this, getValue);
	}
	;

	if (!Map$1) {
	  window.Map = createMap();
	}

	function groupBy(iterable, keySelector) {
	  var entries = iterable[iterator$1];
	  if (!entries) {
	    throw new TypeError("object is not iterable");
	  }
	  var it = entries.call(iterable);
	  var r = new Map();
	  var i = 0;
	  var key, value, arr;
	  while (true) {
	    var next = it.next();
	    if (next.done) break;
	    try {
	      value = next.value;
	      key = keySelector(value, i++);
	      if (r.has(key)) {
	        arr = r.get(key);
	      } else {
	        arr = [];
	        r.set(key, arr);
	      }
	      arr.push(value);
	    } catch (e) {
	      if (it["return"]) {
	        try {
	          it["return"]();
	        } catch (e) {}
	      }
	      throw e;
	    }
	  }
	  return r;
	}

	if (!Map.groupBy) {
	  Map.groupBy = groupBy;
	}

	QUnit.test('Map.groupBy', function (assert) {
	  var groupBy = Map.groupBy;
	  var from = Array.from;
	  assert.isFunction(groupBy);
	  assert.arity(groupBy, 2);
	  assert.name(groupBy, 'groupBy');
	  assert.ok(groupBy([], function (it) {
	    return it;
	  }) instanceof Map);
	  assert.deepEqual(from(groupBy([], function (it) {
	    return it;
	  })), []);
	  assert.deepEqual(from(groupBy([1, 2], function (it) {
	    return Math.pow(it, 2);
	  })), [[1, [1]], [4, [2]]]);
	  assert.deepEqual(from(groupBy([1, 2, 1], function (it) {
	    return Math.pow(it, 2);
	  })), [[1, [1, 1]], [4, [2]]]);
	  assert.deepEqual(from(groupBy(createIterable$1([1, 2]), function (it) {
	    return Math.pow(it, 2);
	  })), [[1, [1]], [4, [2]]]);
	  assert.deepEqual(from(groupBy('qwe', function (it) {
	    return it;
	  })), [['q', ['q']], ['w', ['w']], ['e', ['e']]], 'iterable string');
	  var element = {};
	  groupBy([element], function (it, i) {
	    assert.same(arguments.length, 2);
	    assert.same(it, element);
	    assert.same(i, 0);
	  });
	});

	// import "./es.promise.with-resolvers";

	// import "../web/web.url";

})();
