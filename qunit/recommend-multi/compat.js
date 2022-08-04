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
	var STRICT = !function () {
	  return this;
	}();
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

	function isRegExp(obj){
		return Object.prototype.toString.call(obj)==='[object RegExp]';
	}

	var stringEscapes = {
		'\\': '\\',
		"'": "'",
		'\n': 'n',
		'\r': 'r',
		'\u2028': 'u2028',
		'\u2029': 'u2029'
	};
	var regexpEscapes = {
		'0': 'x30', '1': 'x31', '2': 'x32', '3': 'x33', '4': 'x34',
		'5': 'x35', '6': 'x36', '7': 'x37', '8': 'x38', '9': 'x39',
		'A': 'x41', 'B': 'x42', 'C': 'x43', 'D': 'x44', 'E': 'x45', 'F': 'x46',
		'a': 'x61', 'b': 'x62', 'c': 'x63', 'd': 'x64', 'e': 'x65', 'f': 'x66',
		'n': 'x6e', 'r': 'x72', 't': 'x74', 'u': 'x75', 'v': 'x76', 'x': 'x78'
	};
	var reRegExpChars = /^[:!,]|[\\^$.*+?()[\]{}|\/]|(^[0-9a-fA-Fnrtuvx])|([\n\r\u2028\u2029])/g;

	function escapeRegExp(str){//from lodash
		if(str){
			reRegExpChars.lastIndex = 0;
			return (reRegExpChars.test(str))
				? str.replace(reRegExpChars, function(chr, leadingChar, whitespaceChar) {
				if (leadingChar) {
					chr = regexpEscapes[chr];
				} else if (whitespaceChar) {
					chr = stringEscapes[chr];
				}
				return '\\' + chr;
			})
				: str;
		}
		return "(?:)";
	}

	var replace = String.prototype.replace;
	function replaceAll(searchValue, replaceValue) {
		if(isRegExp(searchValue)) {
			if(!searchValue.global) {
				throw new TypeError("String.prototype.replaceAll called with a non-global RegExp argument");
			} else {
				return this.replace(searchValue, replaceValue);
			}
		}
		searchValue = new RegExp(escapeRegExp(String(searchValue)), "g");
		return replace.call(this, searchValue, replaceValue);
	}

	if(!String.prototype.replaceAll) {
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
	    assert["throws"](function () {
	      return replaceAll.call(null, 'a', 'b');
	    }, TypeError);
	    assert["throws"](function () {
	      return replaceAll.call(undefined, 'a', 'b');
	    }, TypeError);
	  }

	  assert["throws"](function () {
	    return 'b.b.b.b.b'.replaceAll(/\./, 'a');
	  }, TypeError);
	  assert.same('b.b.b.b.b'.replaceAll(/\./g, 'a'), 'babababab');
	  var object = {};
	  assert.same('[object Object]'.replaceAll(object, 'a'), 'a');
	});

})();
