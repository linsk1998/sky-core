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
	GLOBAL.NATIVE || false;
	(function () {
	  try {
	    return new GLOBAL.Uint8Array(new GLOBAL.Uint16Array([1]).buffer)[0] === 1;
	  } catch (_unused2) {
	    return true;
	  }
	})();
	!function () {
	  try {
	    return Object.isExtensible(Object.preventExtensions({}));
	  } catch (_unused3) {
	    return true;
	  }
	}();
	!function () {
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

	function is(a, b) {
	  // eslint-disable-next-line no-self-compare -- NaN check
	  return a === b ? a !== 0 || 1 / a === 1 / b : a != a && b != b;
	}
	(function () {
	  try {
	    if (Function("\n'use strict';\nclass Subclass extends Object { /* empty */ };\nreturn new Subclass() instanceof Subclass;\n\t\t")()) return Function('Parent', "\n'use strict';\nreturn class extends Parent { /* empty */ };\n\t\t");
	  } catch (_unused) {
	    /* empty */
	  }
	})(); // export function timeLimitedPromise(time, fn) {
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

	var Object$1 = window.Object;

	function indexOf$1(e) {
		var fromIndex = 0;
		if(arguments.length > 1) {
			fromIndex = 0 + arguments[1];
			if(fromIndex < 0) {
				fromIndex += this.length;
				if(fromIndex < 0) {
					fromIndex = 0;
				}
			}
		}
		for(var i = fromIndex; i < this.length; i++) {
			if(i in this && this[i] === e) { return i; }
		}
		return -1;
	}

	if(!Array.prototype.indexOf) {
		Array.prototype.indexOf = indexOf$1;
	}

	var indexOf = Array.prototype.indexOf || indexOf$1;

	var dontEnums=[
		"toString",
		"toLocaleString",
		"valueOf",
		"hasOwnProperty",
		"isPrototypeOf",
		"propertyIsEnumerable"
	];

	function getPrototypeOf(obj) {
		if(typeof obj !== "object") {
			obj = Object(obj);
		}
		if('__proto__' in obj) {
			return obj.__proto__;
		}
		if(!('constructor' in obj)) {
			return null;
		}
		if(Object.prototype.hasOwnProperty.call(obj, 'constructor')) {
			if('__proto__' in obj.constructor) {
				return obj.constructor.__proto__.prototype;
			} else if(obj === Object.prototype) {
				return null;
			} else {
				return Object.prototype;
			}
		}
		return obj.constructor.prototype;
	}

	function keys$1(obj) {
		var result = [], key;
		var isJsObject = obj instanceof Object;
		if(!isJsObject) {
			var proto = getPrototypeOf(obj);
			if(proto) {
				for(key in obj) {
					if(key.substring(0, 2) !== "@@" && key.substring(0, 2) !== "__" && proto[key] !== obj[key]) {
						result.push(key);
					}
				}
				return result;
			}
		}
		for(key in obj) {
			if(Object.prototype.hasOwnProperty.call(obj, key) && key.substring(0, 2) !== "@@" && key.substring(0, 2) !== "__") {
				result.push(key);
			}
		}
		var i = dontEnums.length;
		while(i-- > 0) {
			key = dontEnums[i];
			if(Object.prototype.hasOwnProperty.call(obj, key)) {
				result.push(key);
			}
		}
		return result;
	}

	function getOwnPropertyNames(obj) {
		var keys = keys$1(obj);
		for(var key in obj) {
			if(key.substring(0, 8) === "@@desc:") {
				if(Object.prototype.hasOwnProperty.call(obj, key)) {
					var prop = key.substring(7);
					if(indexOf.call(keys, prop) < 0) {
						keys.push(prop);
					}
				}
			}
		}
		return keys;
	}

	if(!Object$1.getOwnPropertyNames) {
		Object$1.getOwnPropertyNames = getOwnPropertyNames;
	}

	if(!Object$1.getPrototypeOf) {
		Object$1.getPrototypeOf = getPrototypeOf;
	}

	function keys() {
		var array = this;
		var index = 0;
		return {
			next: function() {
				var value;
				var done = array.length <= index;
				if(!done) {
					value = index;
					index++;
				}
				return {
					done: done, value: value
				};
			},
			'@@iterator': function() {
				return this;
			},
			'@@toStringTag': 'Array Iterator'
		};
	}

	if(!Array.prototype.keys) {
		Array.prototype.keys = keys;
	}

	if(!Object$1.keys) {
		Object$1.keys = keys$1;
	}

	var defineProperty = Object$1.defineProperty;

	function ie8_defineProperty(obj, prop, descriptor) {
		if(obj instanceof Object) {
			compat_defineProperty.apply(Object, arguments);
		} else {
			delete descriptor.enumerable;
			defineProperty.apply(Object, arguments);
		}
		return obj;
	}
	function compat_defineProperty(obj, prop, descriptor) {
		if(typeof obj !== "object") {
			throw new TypeError("Object.defineProperty called on non-object");
		}
		prop = String(prop);
		if('value' in descriptor) {
			obj[prop] = descriptor.value;
		} else {
			console.warn("ES3 do NOT support accessor.");
		}
		obj['@@desc:' + prop] = descriptor;
		return obj;
	}

	if(Object$1.defineProperty) {
		Object$1.defineProperty = ie8_defineProperty;
	} else {
		Object$1.defineProperty = compat_defineProperty;
	}
	Object$1.defineProperty.sham = true;

	function defineProperties(obj, properties) {
		var ownKeys = Object.keys(properties);
		var len = ownKeys.length;
		for(var i = 0; i < len; i++) {
			var key = ownKeys[i];
			Object.defineProperty(obj, key, properties[key]);
		}
		return obj;
	}

	var $inject_Object_defineProperties = Object$1.defineProperties || defineProperties;

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
	// Check for document.domain and active x support
	// No need to use active x approach when document.domain is not set
	// see https://github.com/es-shims/es5-shim/issues/150
	// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
	// avoid IE GC bug
	var activeXDocument;
	var NullProtoObject = function() {
		try {
			/* global ActiveXObject -- old IE */
			activeXDocument = document.domain && new ActiveXObject('htmlfile');
		} catch(error) { /* ignore */ }
		NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
		var i = dontEnums.length;
		while(i--) delete NullProtoObject.prototype[dontEnums[i]];
		return NullProtoObject();
	};


	function F() { /* empty */ }function create(proto, properties) {
		var o;
		if(proto !== null) {
			F.prototype = proto;
			var o = new F();
			F.prototype = null;
		} else {
			o = NullProtoObject();
		}
		o.__proto__ = proto;
		if(properties) {
			$inject_Object_defineProperties(o, properties);
		}
		return o;
	}create.sham = true;

	if(!Object$1.create) {
		Object$1.create = create;
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
	  assert["throws"](function () {
	    return String(object);
	  }, "throws String({__proto__:null})");
	  assert.deepEqual(getPropertyNames(Object.create(null)), []);
	});
	QUnit.test('Object.create.sham flag', function (assert) {
	  assert.same(Object.create.sham, DESCRIPTORS ? undefined : true);
	});

	QUnit.test('Object.defineProperties', function (assert) {
	  assert.isFunction($inject_Object_defineProperties);
	  assert.arity($inject_Object_defineProperties, 2);
	  assert.name($inject_Object_defineProperties, 'defineProperties');
	  var source = {};
	  var result = $inject_Object_defineProperties(source, {
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
	}); // QUnit.test('Object.defineProperties.sham flag', assert => {
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
	  assert["throws"](function () {
	    return Object.defineProperty(42, 1, {});
	  });
	  assert["throws"](function () {
	    return Object.defineProperty({}, Object.create(null), {});
	  });
	  assert["throws"](function () {
	    return Object.defineProperty({}, 1, 1);
	  });
	});
	QUnit.test('Object.defineProperty.sham flag', function (assert) {
	  assert.same(Object.defineProperty.sham, DESCRIPTORS ? undefined : true);
	});

	QUnit.test('Object.entries', function (assert) {
	  var entries = Object.entries,
	      create = Object.create,
	      assign = Object.assign;
	  assert.isFunction(entries);
	  assert.arity(entries, 1);
	  assert.name(entries, 'entries');
	  assert.looksNative(entries);
	  assert.nonEnumerable(Object, 'entries');
	  assert.deepEqual(entries({
	    q: 1,
	    w: 2,
	    e: 3
	  }), [['q', 1], ['w', 2], ['e', 3]]);
	  assert.deepEqual(entries(new String('qwe')), [['0', 'q'], ['1', 'w'], ['2', 'e']]);
	  assert.deepEqual(entries(assign(create({
	    q: 1,
	    w: 2,
	    e: 3
	  }), {
	    a: 4,
	    s: 5,
	    d: 6
	  })), [['a', 4], ['s', 5], ['d', 6]]);
	  assert.deepEqual(entries({
	    valueOf: 42
	  }), [['valueOf', 42]], 'IE enum keys bug');

	  try {
	    assert.deepEqual(Function('entries', "\n      return entries({\n        a: 1,\n        get b() {\n          delete this.c;\n          return 2;\n        },\n        c: 3\n      });\n    ")(entries), [['a', 1], ['b', 2]]);
	  } catch (_unused) {
	    /* empty */
	  }

	  try {
	    assert.deepEqual(Function('entries', "\n      return entries({\n        a: 1,\n        get b() {\n          Object.defineProperty(this, \"c\", {\n            value: 4,\n            enumerable: false\n          });\n          return 2;\n        },\n        c: 3\n      });\n    ")(entries), [['a', 1], ['b', 2]]);
	  } catch (_unused2) {
	    /* empty */
	  }
	});

})();
