(function () {

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
	  return Symbol.iterator in O;
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

	function trim() {
		return this.replace(/^[\s\u3000\xA0]+|[\s\u3000\xA0]+$/g, '');
	}

	if(!String.prototype.trim) {
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
	  assert.strictEqual(" ".trim(), '', "\\u0020"); // assert.strictEqual("\u0085".trim(), '\u0085', "\\u0085 shouldn't remove");

	  assert.strictEqual("\xA0".trim(), '', "\\u00A0"); // assert.strictEqual("\u1680".trim(), '', '\\u1680');
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

	  assert.strictEqual("\u3000".trim(), '', "\\u3000"); // assert.strictEqual("\uFEFF".trim(), '', '\\uFEFF');

	  if (STRICT) {
	    assert["throws"](function () {
	      return trim.call(null, 0);
	    }, TypeError);
	    assert["throws"](function () {
	      return trim.call(undefined, 0);
	    }, TypeError);
	  }
	});

	function trimStart() {
		return this.replace(/^[\s\u3000\xA0]+/g, '');
	}

	if(!String.prototype.trimStart) {
		String.prototype.trimStart = trimStart;
	}

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
	  assert.strictEqual(" ".trimStart(), '', "\\u0020"); // assert.strictEqual("\u0085".trimStart(), '\u0085', "\\u0085 shouldn't remove");

	  assert.strictEqual("\xA0".trimStart(), '', "\\u00A0"); // assert.strictEqual("\u1680".trimStart(), '', '\\u1680');
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

	  assert.strictEqual("\u3000".trimStart(), '', "\\u3000"); // assert.strictEqual("\uFEFF".trimStart(), '', '\\uFEFF');

	  if (STRICT) {
	    assert["throws"](function () {
	      return trimStart.call(null, 0);
	    }, TypeError);
	    assert["throws"](function () {
	      return trimStart.call(undefined, 0);
	    }, TypeError);
	  }
	});

	function trimEnd() {
		return this.replace(/[\s\u3000\xA0]+$/g, '');
	}

	if(!String.prototype.trimEnd) {
		String.prototype.trimEnd = trimEnd;
	}

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
	  assert.strictEqual(" ".trimEnd(), '', "\\u0020"); // assert.strictEqual("\u0085".trimEnd(), '\u0085', "\\u0085 shouldn't remove");

	  assert.strictEqual("\xA0".trimEnd(), '', "\\u00A0"); // assert.strictEqual("\u1680".trimEnd(), '', '\\u1680');
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

	  assert.strictEqual("\u3000".trimEnd(), '', "\\u3000"); // assert.strictEqual("\uFEFF".trimEnd(), '', '\\uFEFF');

	  if (STRICT) {
	    assert["throws"](function () {
	      return trimEnd.call(null, 0);
	    }, TypeError);
	    assert["throws"](function () {
	      return trimEnd.call(undefined, 0);
	    }, TypeError);
	  }
	});

	var $inject_Symbol_iterator = '@@iterator';

	function values() {
		var array = this;
		var index = 0;
		return {
			next: function() {
				var value;
				var done = array.length <= index;
				if(!done) {
					value = array[index];
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

	if(!Array.prototype.values) {
		Array.prototype.values = values;
	}

	if(!Array.prototype[$inject_Symbol_iterator]) {
		Array.prototype[$inject_Symbol_iterator] = Array.prototype.values;
	}

	function iterator() {
		var p = 0;
		var string = this;
		var size = this.length;
		return {
			next: function() {
				var value;
				var done = p >= string.length;
				if(!done) {
					value = string.charAt(p);
					var first = value.charCodeAt(0);
					if( // 检查是否开始 surrogate pair
						first >= 0xD800 && first <= 0xDBFF && // high surrogate
						size > p + 1 // 下一个编码单元
					) {
						var second = string.charCodeAt(p + 1);
						if(second >= 0xDC00 && second <= 0xDFFF) { // low surrogate
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
			'@@iterator': function() {
				return this;
			}
		};
	}

	if(!String.prototype['@@iterator']) {
		String.prototype['@@iterator'] = iterator;
	}

	var Array$1 = window.Array;

	var Number$1 = window.Number;

	if(!('MAX_SAFE_INTEGER' in Number$1)) {
		Number$1.MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
	}

	function isString(obj){
		return Object.prototype.toString.call(obj)==='[object String]';
	}

	var push = Array.prototype.push;

	function from(arrayLike) {
		if(arrayLike == null) {
			throw new TypeError("Array.from requires an array-like object - not null or undefined");
		}
		var ArrayLike = this;
		if(typeof ArrayLike !== "function") {
			ArrayLike = Array;
		}
		var mapFn = arguments[1];
		var thisArg;
		if(mapFn !== undefined) {
			if(typeof mapFn !== "function") {
				throw new TypeError(mapFn + " is not a function");
			}
			thisArg = arguments[2];
		}
		var arr = new ArrayLike();
		arr.length = 0;
		var entries = arrayLike[$inject_Symbol_iterator];
		if(!entries && isString(arrayLike)) {
			entries = iterator;
		}
		var i, item;
		if(entries) {
			var normalCompletion = true;
			var error, it;
			try {
				it = entries.call(arrayLike);
				i = 0;
				while(true) {
					var next = it.next();
					normalCompletion = next.done;
					if(next.done) break;
					item = next.value;
					if(mapFn) {
						item = mapFn.call(thisArg, item, i);
					}
					push.call(arr, item);
					i++;
				}
			} catch(e) {
				error = e;
			} finally {
				try {
					if(!normalCompletion) {
						var onReturn = it['return'];
						if(onReturn) {
							onReturn.call(it);
						}
					}
				} finally {
					if(error) {
						throw error;
					}
				}
			}
		} else if(arrayLike.length >= 0 && arrayLike.length <= Number.MAX_SAFE_INTEGER) {
			for(i = 0; i < arrayLike.length; i++) {
				item = arrayLike[i];
				if(mapFn) {
					item = mapFn.call(thisArg, item, i);
				}
				push.call(arr, item);
			}
		}
		return arr;
	}

	if(!Array$1.from) {
		Array$1.from = from;
	}

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

	function repeat$1(count) {
		if(count < 0) {
			throw new RangeError("RangeError repeat count must be non-negative");
		}
		if(count == Number.POSITIVE_INFINITY) {
			throw new RangeError("RangeError repeat count must be less than infinity");
		}
		return new Array(parseInt(count + 1)).join(this);
	}

	if(!String.prototype.repeat) {
		String.prototype.repeat = repeat$1;
	}

	QUnit.test('String#repeat', function (assert) {
	  var repeat = String.prototype.repeat;
	  assert.isFunction(repeat);
	  assert.arity(repeat, 1);
	  assert.name(repeat, 'repeat');
	  assert.strictEqual('qwe'.repeat(3), 'qweqweqwe');
	  assert.strictEqual('qwe'.repeat(2.5), 'qweqwe');
	  assert["throws"](function () {
	    return 'qwe'.repeat(-1);
	  }, RangeError);
	  assert["throws"](function () {
	    return 'qwe'.repeat(Infinity);
	  }, RangeError);

	  if (STRICT) {
	    assert["throws"](function () {
	      return repeat.call(null, 1);
	    }, TypeError);
	    assert["throws"](function () {
	      return repeat.call(undefined, 1);
	    }, TypeError);
	  }
	});

	var repeat = String.prototype.repeat || repeat$1;

	function padStart(targetLength) {
		var x = targetLength - this.length;
		if(x > 0) {
			var padString = arguments[1];
			if(padString == null) {
				padString = " ";
			}
			var len = padString.length;
			if(len) {
				return repeat.call(padString, Math.ceil(x / len)).substr(0, x) + this;
			}
		}
		return String(this);
	}

	if(!String.prototype.padStart) {
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
	    assert["throws"](function () {
	      return padStart.call(null, 0);
	    }, TypeError);
	    assert["throws"](function () {
	      return padStart.call(undefined, 0);
	    }, TypeError);
	  }
	});

	function padEnd(targetLength) {
		var x = targetLength - this.length;
		if(x > 0) {
			var padString = arguments[1];
			if(padString == null) {
				padString = " ";
			}
			var len = padString.length;
			if(len) {
				return this + repeat.call(padString, Math.ceil(x / len)).substr(0, x);
			}
		}
		return String(this);
	}

	if(!String.prototype.padEnd) {
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
	    assert["throws"](function () {
	      return padEnd.call(null, 0);
	    }, TypeError);
	    assert["throws"](function () {
	      return padEnd.call(undefined, 0);
	    }, TypeError);
	  }
	});

	/*! http://mths.be/codepointat v0.1.0 by @mathias */
	function codePointAt(position) {
		if(this == null) {
			throw TypeError();
		}
		var string = String(this);
		var size = string.length;
		// 变成整数
		var index = position ? Number(position) : 0;
		if(index != index) { // better `isNaN`
			index = 0;
		}
		// 边界
		if(index < 0 || index >= size) {
			return undefined;
		}
		// 第一个编码单元
		var first = string.charCodeAt(index);
		var second;
		if( // 检查是否开始 surrogate pair
			first >= 0xD800 && first <= 0xDBFF && // high surrogate
			size > index + 1 // 下一个编码单元
		) {
			second = string.charCodeAt(index + 1);
			if(second >= 0xDC00 && second <= 0xDFFF) { // low surrogate
				// http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
				return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
			}
		}
		return first;
	}

	if(!String.prototype.codePointAt) {
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
	    assert["throws"](function () {
	      return codePointAt.call(null, 0);
	    }, TypeError);
	    assert["throws"](function () {
	      return codePointAt.call(undefined, 0);
	    }, TypeError);
	  }
	});

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
	  assert["throws"](function () {
	    return fromCodePoint('_');
	  }, RangeError);
	  assert["throws"](function () {
	    return fromCodePoint('+Infinity');
	  }, RangeError);
	  assert["throws"](function () {
	    return fromCodePoint('-Infinity');
	  }, RangeError);
	  assert["throws"](function () {
	    return fromCodePoint(-1);
	  }, RangeError);
	  assert["throws"](function () {
	    return fromCodePoint(0x10FFFF + 1);
	  }, RangeError);
	  assert["throws"](function () {
	    return fromCodePoint(3.14);
	  }, RangeError);
	  assert["throws"](function () {
	    return fromCodePoint(3e-2);
	  }, RangeError);
	  assert["throws"](function () {
	    return fromCodePoint(-Infinity);
	  }, RangeError);
	  assert["throws"](function () {
	    return fromCodePoint(Infinity);
	  }, RangeError);
	  assert["throws"](function () {
	    return fromCodePoint(NaN);
	  }, RangeError);
	  assert["throws"](function () {
	    return fromCodePoint(undefined);
	  }, RangeError);
	  assert["throws"](function () {
	    return fromCodePoint({});
	  }, RangeError);
	  assert["throws"](function () {
	    return fromCodePoint(/./);
	  }, RangeError);
	  var number = 0x60;
	  assert.strictEqual(fromCodePoint({
	    valueOf: function valueOf() {
	      return ++number;
	    }
	  }), 'a');
	  assert.strictEqual(number, 0x61); // one code unit per symbol

	  var counter = Math.pow(2, 15) * 3 / 2;
	  var result = [];

	  while (--counter >= 0) {
	    result.push(0);
	  } // should not throw


	  fromCodePoint.apply(null, result);
	  counter = Math.pow(2, 15) * 3 / 2;
	  result = [];

	  while (--counter >= 0) {
	    result.push(0xFFFF + 1);
	  } // should not throw


	  fromCodePoint.apply(null, result);
	});

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
	  assert["throws"](function () {
	    return raw({});
	  }, TypeError);
	  assert["throws"](function () {
	    return raw({
	      raw: null
	    });
	  }, TypeError);
	});

	function matchAll(regExp) {
		var string = this;
		if(typeof regExp === "string") {
			regExp = new RegExp(regExp, 'g');
		} else if(regExp && regExp.global === false) {
			throw new TypeError();
		}
		var it = {
			next: function() {
				var value = regExp.exec(string);
				if(value) {
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
		it[$inject_Symbol_iterator] = function() {
			return this;
		};
		return it;
	}

	if(!String.prototype.matchAll) {
		String.prototype.matchAll = matchAll;
	}

	QUnit.test('String#matchAll', function (assert) {
	  var matchAll = String.prototype.matchAll;
	  var assign = Object.assign;
	  assert.isFunction(matchAll);
	  assert.arity(matchAll, 1);
	  assert.name(matchAll, 'matchAll');
	  var data = ['aabc', {
	    toString: function toString() {
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
	  assert["throws"](function () {
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

	  var _loop = function _loop() {
	    var target = _data2[_i2];
	    assert.notThrows(function () {
	      return ''.matchAll(target);
	    }, "Not throws on " + target + " as the first argument");
	  };

	  for (var _i2 = 0, _data2 = data; _i2 < _data2.length; _i2++) {
	    _loop();
	  }

	  if (STRICT) {
	    assert["throws"](function () {
	      return matchAll.call(null, /./g);
	    }, TypeError, 'Throws on null as `this`');
	    assert["throws"](function () {
	      return matchAll.call(undefined, /./g);
	    }, TypeError, 'Throws on undefined as `this`');
	  }
	});

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
	    assert.same(string, 'aba', '`string` is `aba`');
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
