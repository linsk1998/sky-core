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
	var NATIVE = GLOBAL.NATIVE || false;
	(function () {
	  try {
	    return new GLOBAL.Uint8Array(new GLOBAL.Uint16Array([1]).buffer)[0] === 1;
	  } catch (_unused2) {
	    return true;
	  }
	})();
	var PROTO = !!Object.setPrototypeOf || '__proto__' in Object.prototype;
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
	var CORRECT_PROTOTYPE_GETTER = !function () {
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
	var WHITESPACES = "\t\n\x0B\f\r \xA0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF";

	function _unsupportedIterableToArray(o, minLen) {
	  if (!o) return;
	  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
	  var n = Object.prototype.toString.call(o).slice(8, -1);
	  if (n === "Object" && o.constructor) n = o.constructor.name;
	  if (n === "Map" || n === "Set") return Array.from(o);
	  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
	}

	function _arrayLikeToArray(arr, len) {
	  if (len == null || len > arr.length) len = arr.length;

	  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

	  return arr2;
	}

	function _createForOfIteratorHelperLoose(o, allowArrayLike) {
	  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
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

	function createIterable$1(elements, methods) {
	  var _iterable;

	  var iterable = (_iterable = {
	    called: false,
	    received: false
	  }, _iterable[Symbol.iterator] = function () {
	    iterable.received = true;
	    var index = 0;
	    var iterator = {
	      next: function next() {
	        iterable.called = true;
	        return {
	          value: elements[index++],
	          done: index > elements.length
	        };
	      }
	    };
	    if (methods) for (var key in methods) {
	      iterator[key] = methods[key];
	    }
	    return iterator;
	  }, _iterable);
	  return iterable;
	}
	function includes$2(target, wanted) {
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
	  } catch (_unused) {
	    /* empty */
	  }
	}(); // export function timeLimitedPromise(time, fn) {
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

	QUnit.test('Array#indexOf', function (assert) {
	  var indexOf = Array.prototype.indexOf;
	  assert.isFunction(indexOf);
	  assert.arity(indexOf, 1);
	  assert.name(indexOf, 'indexOf');
	  assert.same(0, [1, 1, 1].indexOf(1));
	  assert.same(-1, [1, 2, 3].indexOf(1, 1));
	  assert.same(1, [1, 2, 3].indexOf(2, 1));
	  assert.same(-1, [1, 2, 3].indexOf(2, -1));
	  assert.same(1, [1, 2, 3].indexOf(2, -2));
	  assert.same(-1, [NaN].indexOf(NaN));
	  assert.same(3, Array(2).concat([1, 2, 3]).indexOf(2));
	  assert.same(-1, Array(1).indexOf(undefined));
	  assert.same(0, [1].indexOf(1, -0), "shouldn't return negative zero");

	  if (STRICT) {
	    assert["throws"](function () {
	      return indexOf.call(null, 0);
	    }, TypeError);
	    assert["throws"](function () {
	      return indexOf.call(undefined, 0);
	    }, TypeError);
	  }
	});

	function lastIndexOf(e) {
		var i = this.length;
		if(arguments.length > 1) {
			i = Math.min(1 + arguments[1], i);
			if(i < 1) {
				i += this.length;
				if(i < 1) {
					return -1;
				}
			}
		}
		while(i--) {
			if(i in this && this[i] === e) { return i; }
		}
		return -1;
	}

	if(!Array.prototype.lastIndexOf) {
		Array.prototype.lastIndexOf = lastIndexOf;
	}

	QUnit.test('Array#lastIndexOf', function (assert) {
	  var lastIndexOf = Array.prototype.lastIndexOf;
	  assert.isFunction(lastIndexOf);
	  assert.arity(lastIndexOf, 1);
	  assert.name(lastIndexOf, 'lastIndexOf');
	  assert.same(2, [1, 1, 1].lastIndexOf(1));
	  assert.same(-1, [1, 2, 3].lastIndexOf(3, 1));
	  assert.same(1, [1, 2, 3].lastIndexOf(2, 1));
	  assert.same(-1, [1, 2, 3].lastIndexOf(2, -3));
	  assert.same(-1, [1, 2, 3].lastIndexOf(1, -4));
	  assert.same(1, [1, 2, 3].lastIndexOf(2, -2));
	  assert.same(-1, [NaN].lastIndexOf(NaN));
	  assert.same(1, [1, 2, 3].concat(Array(2)).lastIndexOf(2));
	  assert.same(0, [1].lastIndexOf(1, -0), "shouldn't return negative zero");

	  if (STRICT) {
	    assert["throws"](function () {
	      return lastIndexOf.call(null, 0);
	    }, TypeError);
	    assert["throws"](function () {
	      return lastIndexOf.call(undefined, 0);
	    }, TypeError);
	  }
	});

	function forEach$2(callback) {
		var thisArg = arguments[1];
		for(var i = 0; i < this.length; i++) {
			if(i in this) {
				callback.call(thisArg, this[i], i, this);
			}
		}
	}

	if(!Array.prototype.forEach) {
		Array.prototype.forEach = forEach$2;
	}

	QUnit.test('Array#forEach', function (assert) {
	  var forEach = Array.prototype.forEach;
	  assert.isFunction(forEach);
	  assert.arity(forEach, 1);
	  assert.name(forEach, 'forEach');
	  var array = [1];
	  var context = {};
	  array.forEach(function (value, key, that) {
	    assert.same(arguments.length, 3, 'correct number of callback arguments');
	    assert.same(value, 1, 'correct value in callback');
	    assert.same(key, 0, 'correct index in callback');
	    assert.same(that, array, 'correct link to array in callback');
	    assert.same(this, context, 'correct callback context');
	  }, context);
	  var result = '';
	  [1, 2, 3].forEach(function (value) {
	    result += value;
	  });
	  assert.ok(result === '123');
	  result = '';
	  [1, 2, 3].forEach(function (value, key) {
	    result += key;
	  });
	  assert.ok(result === '012');
	  result = '';
	  [1, 2, 3].forEach(function (value, key, that) {
	    result += that;
	  });
	  assert.ok(result === '1,2,31,2,31,2,3');
	  result = '';
	  [1, 2, 3].forEach(function () {
	    result += this;
	  }, 1);
	  assert.ok(result === '111');
	  result = '';
	  array = [];
	  array[5] = '';
	  array.forEach(function (value, key) {
	    result += key;
	  });
	  assert.ok(result === '5');

	  if (STRICT) {
	    assert["throws"](function () {
	      forEach.call(null, function () {
	        /* empty */
	      });
	    }, TypeError);
	    assert["throws"](function () {
	      forEach.call(undefined, function () {
	        /* empty */
	      });
	    }, TypeError);
	  }
	});

	function filter(fn) {
		var thisArg = arguments[1];
		var arr = [];
		for(var k = 0, length = this.length; k < length; k++) {
			fn.call(thisArg, this[k], k, this) && arr.push(this[k]);
		}
		return arr;
	}

	if(!Array.prototype.filter) {
		Array.prototype.filter = filter;
	}

	QUnit.test('Array#filter', function (assert) {
	  var filter = Array.prototype.filter;
	  assert.isFunction(filter);
	  assert.arity(filter, 1);
	  assert.name(filter, 'filter');
	  var array = [1];
	  var context = {};
	  array.filter(function (value, key, that) {
	    assert.same(arguments.length, 3, 'correct number of callback arguments');
	    assert.same(value, 1, 'correct value in callback');
	    assert.same(key, 0, 'correct index in callback');
	    assert.same(that, array, 'correct link to array in callback');
	    assert.same(this, context, 'correct callback context');
	  }, context);
	  assert.deepEqual([1, 2, 3, 4, 5], [1, 2, 3, 'q', {}, 4, true, 5].filter(function (it) {
	    return typeof it === 'number';
	  }));

	  if (STRICT) {
	    assert["throws"](function () {
	      return filter.call(null, function () {
	        /* empty */
	      });
	    }, TypeError);
	    assert["throws"](function () {
	      return filter.call(undefined, function () {
	        /* empty */
	      });
	    }, TypeError);
	  }
	});

	function map$1(fn) {
		var thisArg = arguments[1];
		var arr = [];
		for(var k = 0, length = this.length; k < length; k++) {
			arr.push(fn.call(thisArg, this[k], k, this));
		}
		return arr;
	}

	if(!Array.prototype.map) {
		Array.prototype.map = map$1;
	}

	QUnit.test('Array#map', function (assert) {
	  var map = Array.prototype.map;
	  assert.isFunction(map);
	  assert.arity(map, 1);
	  assert.name(map, 'map');
	  var array = [1];
	  var context = {};
	  array.map(function (value, key, that) {
	    assert.same(arguments.length, 3, 'correct number of callback arguments');
	    assert.same(value, 1, 'correct value in callback');
	    assert.same(key, 0, 'correct index in callback');
	    assert.same(that, array, 'correct link to array in callback');
	    assert.same(this, context, 'correct callback context');
	  }, context);
	  assert.deepEqual([2, 3, 4], [1, 2, 3].map(function (value) {
	    return value + 1;
	  }));
	  assert.deepEqual([1, 3, 5], [1, 2, 3].map(function (value, key) {
	    return value + key;
	  }));
	  assert.deepEqual([2, 2, 2], [1, 2, 3].map(function () {
	    return +this;
	  }, 2));

	  if (STRICT) {
	    assert["throws"](function () {
	      return map.call(null, function () {
	        /* empty */
	      });
	    }, TypeError);
	    assert["throws"](function () {
	      return map.call(undefined, function () {
	        /* empty */
	      });
	    }, TypeError);
	  }
	});

	function reduce(callback) {
		var i, value;
		if(arguments.length >= 2) {
			value = arguments[1];
			i = 0;
		} else if(this.length > 0) {
			value = this[0];
			i = 1;
		} else {
			throw new Error("Reduce of empty array with no initial value");
		}
		while(i < this.length) {
			if(i in this) {
				value = callback(value, this[i], i, this);
			}
			i++;
		}
		return value;
	}

	if(!Array.prototype.reduce) {
		Array.prototype.reduce = reduce;
	}

	QUnit.test('Array#reduce', function (assert) {
	  var reduce = Array.prototype.reduce;
	  assert.isFunction(reduce);
	  assert.arity(reduce, 1);
	  assert.name(reduce, 'reduce');
	  var array = [1];
	  var accumulator = {};
	  array.reduce(function (memo, value, key, that) {
	    assert.same(arguments.length, 4, 'correct number of callback arguments');
	    assert.same(memo, accumulator, 'correct callback accumulator');
	    assert.same(value, 1, 'correct value in callback');
	    assert.same(key, 0, 'correct index in callback');
	    assert.same(that, array, 'correct link to array in callback');
	  }, accumulator);
	  assert.same([1, 2, 3].reduce(function (a, b) {
	    return a + b;
	  }, 1), 7, 'works with initial accumulator');
	  [1, 2].reduce(function (memo, value, key) {
	    assert.same(memo, 1, 'correct default accumulator');
	    assert.same(value, 2, 'correct start value without initial accumulator');
	    assert.same(key, 1, 'correct start index without initial accumulator');
	  });
	  assert.same([1, 2, 3].reduce(function (a, b) {
	    return a + b;
	  }), 6, 'works without initial accumulator');
	  var values = '';
	  var keys = '';
	  [1, 2, 3].reduce(function (memo, value, key) {
	    values += value;
	    keys += key;
	  }, 0);
	  assert.same(values, '123', 'correct order #1');
	  assert.same(keys, '012', 'correct order #2');
	  assert.same(reduce.call({
	    0: 1,
	    1: 2,
	    length: 2
	  }, function (a, b) {
	    return a + b;
	  }), 3, 'generic');

	  if (STRICT) {
	    assert["throws"](function () {
	      return reduce.call(null, function () {
	        /* empty */
	      }, 1);
	    }, TypeError);
	    assert["throws"](function () {
	      return reduce.call(undefined, function () {
	        /* empty */
	      }, 1);
	    }, TypeError);
	  }
	});

	function reduceRight(callback) {
		var i = this.length, value;
		if(arguments.length >= 2) {
			value = arguments[1];
		} else if(this.length > 0) {
			value = this[--i];
		} else {
			throw new Error("Reduce of empty array with no initial value");
		}
		while(i-- > 0) {
			if(i in this) {
				value = callback(value, this[i], i, this);
			}
		}
		return value;
	}

	if(!Array.prototype.reduceRight) {
		Array.prototype.reduceRight = reduceRight;
	}

	QUnit.test('Array#reduceRight', function (assert) {
	  var reduceRight = Array.prototype.reduceRight;
	  assert.isFunction(reduceRight);
	  assert.arity(reduceRight, 1);
	  assert.name(reduceRight, 'reduceRight');
	  var array = [1];
	  var accumulator = {};
	  array.reduceRight(function (memo, value, key, that) {
	    assert.same(arguments.length, 4, 'correct number of callback arguments');
	    assert.same(memo, accumulator, 'correct callback accumulator');
	    assert.same(value, 1, 'correct value in callback');
	    assert.same(key, 0, 'correct index in callback');
	    assert.same(that, array, 'correct link to array in callback');
	  }, accumulator);
	  assert.same([1, 2, 3].reduceRight(function (a, b) {
	    return a + b;
	  }, 1), 7, 'works with initial accumulator');
	  [1, 2].reduceRight(function (memo, value, key) {
	    assert.same(memo, 2, 'correct default accumulator');
	    assert.same(value, 1, 'correct start value without initial accumulator');
	    assert.same(key, 0, 'correct start index without initial accumulator');
	  });
	  assert.same([1, 2, 3].reduceRight(function (a, b) {
	    return a + b;
	  }), 6, 'works without initial accumulator');
	  var values = '';
	  var keys = '';
	  [1, 2, 3].reduceRight(function (memo, value, key) {
	    values += value;
	    keys += key;
	  }, 0);
	  assert.same(values, '321', 'correct order #1');
	  assert.same(keys, '210', 'correct order #2');
	  assert.same(reduceRight.call({
	    0: 1,
	    1: 2,
	    length: 2
	  }, function (a, b) {
	    return a + b;
	  }), 3, 'generic');

	  if (STRICT) {
	    assert["throws"](function () {
	      return reduceRight.call(null, function () {
	        /* empty */
	      }, 1);
	    }, TypeError);
	    assert["throws"](function () {
	      return reduceRight.call(undefined, function () {
	        /* empty */
	      }, 1);
	    }, TypeError);
	  }
	});

	function some(fn) {
		var thisArg = arguments[1];
		var passed = false;
		for(var k = 0, length = this.length; k < length; k++) {
			if(passed === true) break;
			passed = !!fn.call(thisArg, this[k], k, this);
		}
		return passed;
	}

	if(!Array.prototype.some) {
		Array.prototype.some = some;
	}

	QUnit.test('Array#some', function (assert) {
	  var some = Array.prototype.some;
	  assert.isFunction(some);
	  assert.arity(some, 1);
	  assert.name(some, 'some');
	  var array = [1];
	  var context = {};
	  array.some(function (value, key, that) {
	    assert.same(arguments.length, 3, 'correct number of callback arguments');
	    assert.same(value, 1, 'correct value in callback');
	    assert.same(key, 0, 'correct index in callback');
	    assert.same(that, array, 'correct link to array in callback');
	    assert.same(this, context, 'correct callback context');
	  }, context);
	  assert.ok([1, '2', 3].some(function (value) {
	    return typeof value === 'number';
	  }));
	  assert.ok([1, 2, 3].some(function (value) {
	    return value < 3;
	  }));
	  assert.ok(![1, 2, 3].some(function (value) {
	    return value < 0;
	  }));
	  assert.ok(![1, 2, 3].some(function (value) {
	    return typeof value === 'string';
	  }));
	  assert.ok(![1, 2, 3].some(function () {
	    return +this !== 1;
	  }, 1));
	  var result = '';
	  [1, 2, 3].some(function (value, key) {
	    result += key;
	    return false;
	  });
	  assert.ok(result === '012');
	  array = [1, 2, 3];
	  assert.ok(!array.some(function (value, key, that) {
	    return that !== array;
	  }));

	  if (STRICT) {
	    assert["throws"](function () {
	      return some.call(null, function () {
	        /* empty */
	      });
	    }, TypeError);
	    assert["throws"](function () {
	      return some.call(undefined, function () {
	        /* empty */
	      });
	    }, TypeError);
	  }
	});

	function every(fn) {
		var thisArg = arguments[1];
		var passed = true;
		for(var k = 0, length = this.length; k < length; k++) {
			if(passed === false) break;
			passed = !!fn.call(thisArg, this[k], k, this);
		}
		return passed;
	}

	if(!Array.prototype.every) {
		Array.prototype.every = every;
	}

	QUnit.test('Array#every', function (assert) {
	  var every = Array.prototype.every;
	  assert.isFunction(every);
	  assert.arity(every, 1);
	  assert.name(every, 'every');
	  var array = [1];
	  var context = {};
	  array.every(function (value, key, that) {
	    assert.same(arguments.length, 3, 'correct number of callback arguments');
	    assert.same(value, 1, 'correct value in callback');
	    assert.same(key, 0, 'correct index in callback');
	    assert.same(that, array, 'correct link to array in callback');
	    assert.same(this, context, 'correct callback context');
	  }, context);
	  assert.ok([1, 2, 3].every(function (it) {
	    return typeof it === 'number';
	  }));
	  assert.ok([1, 2, 3].every(function (it) {
	    return it < 4;
	  }));
	  assert.ok(![1, 2, 3].every(function (it) {
	    return it < 3;
	  }));
	  assert.ok(![1, 2, 3].every(function (it) {
	    return typeof it === 'string';
	  }));
	  assert.ok([1, 2, 3].every(function () {
	    return +this === 1;
	  }, 1));
	  var result = '';
	  [1, 2, 3].every(function (value, key) {
	    return result += key;
	  });
	  assert.ok(result === '012');
	  array = [1, 2, 3];
	  assert.ok(array.every(function (value, key, that) {
	    return that === array;
	  }));

	  if (STRICT) {
	    assert["throws"](function () {
	      return every.call(null, function () {
	        /* empty */
	      });
	    }, TypeError);
	    assert["throws"](function () {
	      return every.call(undefined, function () {
	        /* empty */
	      });
	    }, TypeError);
	  }
	});

	QUnit.test('Array.isArray', function (assert) {
	  var isArray = Array.isArray;
	  assert.isFunction(isArray);
	  assert.arity(isArray, 1);
	  assert.name(isArray, 'isArray');
	  assert.ok(!isArray({}));
	  assert.ok(!isArray(function () {
	    return arguments;
	  }()));
	  assert.ok(isArray([]));
	});

	QUnit.test('Array.from', function (assert) {
	  var Symbol = GLOBAL.Symbol || {};
	  var from = Array.from;
	  var defineProperty = Object.defineProperty;
	  assert.isFunction(from);
	  assert.arity(from, 1);
	  assert.name(from, 'from');
	  var types = {
	    'array-like': {
	      length: '3',
	      0: '1',
	      1: '2',
	      2: '3'
	    },
	    arguments: function () {
	      return arguments;
	    }('1', '2', '3'),
	    array: ['1', '2', '3'],
	    iterable: createIterable$1(['1', '2', '3']),
	    string: '123'
	  };

	  for (var type in types) {
	    var data = types[type];
	    assert.arrayEqual(from(data), ['1', '2', '3'], "Works with " + type);
	    assert.arrayEqual(from(data, function (it) {
	      return Math.pow(it, 2);
	    }), [1, 4, 9], "Works with " + type + " + mapFn");
	  }

	  types = {
	    'array-like': {
	      length: 1,
	      0: 1
	    },
	    arguments: function () {
	      return arguments;
	    }(1),
	    array: [1],
	    iterable: createIterable$1([1]),
	    string: '1'
	  };

	  var _loop = function _loop(_type) {
	    var data = types[_type];
	    var context = {};
	    assert.arrayEqual(from(data, function (value, key) {
	      assert.same(this, context, "Works with " + _type + ", correct callback context");
	      assert.same(value, _type === 'string' ? '1' : 1, "Works with " + _type + ", correct callback key");
	      assert.same(key, 0, "Works with " + _type + ", correct callback value");
	      assert.same(arguments.length, 2, "Works with " + _type + ", correct callback arguments number");
	      return 42;
	    }, context), [42], "Works with " + _type + ", correct result");
	  };

	  for (var _type in types) {
	    _loop(_type);
	  }

	  var primitives = [false, true, 0];

	  for (var _i = 0, _primitives = primitives; _i < _primitives.length; _i++) {
	    var primitive = _primitives[_i];
	    assert.arrayEqual(from(primitive), [], "Works with " + primitive);
	  }

	  assert["throws"](function () {
	    return from(null);
	  }, TypeError, 'Throws on null');
	  assert["throws"](function () {
	    return from(undefined);
	  }, TypeError, 'Throws on undefined');
	  assert.arrayEqual(from('𠮷𠮷𠮷'), ['𠮷', '𠮷', '𠮷'], 'Uses correct string iterator');
	  var done = true;
	  from(createIterable$1([1, 2, 3], {
	    "return": function _return() {
	      return done = false;
	    }
	  }), function () {
	    return false;
	  });
	  assert.ok(done, '.return #default');
	  done = false;

	  try {
	    from(createIterable$1([1, 2, 3], {
	      "return": function _return() {
	        return done = true;
	      }
	    }), function () {
	      throw new Error();
	    });
	  } catch (_unused) {
	    /* empty */
	  }

	  assert.ok(done, '.return #throw');

	  var C = function C() {};

	  var instance = from.call(C, createIterable$1([1, 2]));
	  assert.ok(instance instanceof C, 'generic, iterable case, instanceof');
	  assert.arrayEqual(instance, [1, 2], 'generic, iterable case, elements');
	  instance = from.call(C, {
	    0: 1,
	    1: 2,
	    length: 2
	  });
	  assert.ok(instance instanceof C, 'generic, array-like case, instanceof');
	  assert.arrayEqual(instance, [1, 2], 'generic, array-like case, elements');
	  var array = [1, 2, 3];
	  done = false;
	  array['@@iterator'] = undefined;

	  array[Symbol.iterator] = function () {
	    done = true;
	    return [][Symbol.iterator].call(this);
	  };

	  assert.arrayEqual(from(array), [1, 2, 3], 'Array with custom iterator, elements');
	  assert.ok(done, 'call @@iterator in Array with custom iterator');
	  array = [1, 2, 3];
	  delete array[1];
	  assert.arrayEqual(from(array, String), ['1', 'undefined', '3'], 'Ignores holes');
	  assert.notThrows(function () {
	    return from({
	      length: -1,
	      0: 1
	    }, function () {
	      throw new Error();
	    }).length === 0;
	  }, 'Uses ToLength');
	  assert.arrayEqual(from([], undefined), [], 'Works with undefined as asecond argument');
	  assert["throws"](function () {
	    return from([], null);
	  }, TypeError, 'Throws with null as second argument');
	  assert["throws"](function () {
	    return from([], 0);
	  }, TypeError, 'Throws with 0 as second argument');
	  assert["throws"](function () {
	    return from([], '');
	  }, TypeError, 'Throws with "" as second argument');
	  assert["throws"](function () {
	    return from([], false);
	  }, TypeError, 'Throws with false as second argument');
	  assert["throws"](function () {
	    return from([], {});
	  }, TypeError, 'Throws with {} as second argument');

	  if (DESCRIPTORS) {
	    var called = false;
	    defineProperty(C.prototype, 0, {
	      set: function set() {
	        called = true;
	      }
	    });
	    from.call(C, [1, 2, 3]);
	    assert.ok(!called, 'Should not call prototype accessors');
	  }
	});

	var Array$1 = window.Array;

	function values$1() {
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
		Array.prototype.values = values$1;
	}

	var iterator$1 = '@@iterator';

	if(!Array.prototype[iterator$1]) {
		Array.prototype[iterator$1] = Array.prototype.values;
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

	var Symbol$7 = window.Symbol;

	var symbol_sqe = 0;
	var all_symbol = {};
	function Symbol$6(desc) {
		this.__name__ = "@@" + desc + ":" + symbol_sqe;
		if(desc !== undefined) {
			this.description = String(desc);
		}
		symbol_sqe++;
		all_symbol[this.__name__] = this;
	}Symbol$6.prototype.toString = function() {
		return this.__name__;
	};
	Symbol$6.prototype.toJSON = function() {
		return undefined;
	};
	function getOwnPropertySymbols$3(obj) {
		var arr = [];
		for(var key in obj) {
			if(key.substring(0, 2) === "@@") {
				if(Object.prototype.hasOwnProperty.call(obj, key)) {
					arr.push(all_symbol[key]);
				}
			}
		}
		return arr;
	}

	function Symbol$5(desc) {
		return new Symbol$6(desc);
	}Symbol$5.sham = true;

	var Symbol$4 = Symbol$7;
	if(!Symbol$4) {
		window.Symbol = Symbol$4 = Symbol$5;
		Symbol$4.sham = true;
		Symbol$4.asyncIterator = "@@asyncIterator";
		Symbol$4.hasInstance = "@@hasInstance";
		// Symbol.isConcatSpreadable = "@@isConcatSpreadable";
		Symbol$4.iterator = "@@iterator";
		// Symbol.match = "@@match";
		// Symbol.matchAll = "@@matchAll";
		// Symbol.replace = "@@replace";
		// Symbol.search = "@@search";
		// Symbol.species = "@@species";
		// Symbol.split = "@@split";
		// Symbol.toPrimitive = "@@toPrimitive";
		// Symbol.toStringTag = "@@toStringTag";
		// Symbol.unscopables = "@@unscopables";
	}

	var Number$1 = window.Number;

	if(!('MAX_SAFE_INTEGER' in Number$1)) {
		Number$1.MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
	}

	function isString(obj){
		return Object.prototype.toString.call(obj)==='[object String]';
	}

	var push = Array.prototype.push;

	function from$1(arrayLike) {
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
		var entries = arrayLike[Symbol.iterator];
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
		Array$1.from = from$1;
	}

	function of() {
		return Array.from.call(this, arguments);
	}

	if(!Array$1.of) {
		Array$1.of = of;
	}

	QUnit.test('Array.of', function (assert) {
	  var defineProperty = Object.defineProperty;
	  assert.isFunction(Array.of);
	  assert.arity(Array.of, 0);
	  assert.name(Array.of, 'of');
	  assert.deepEqual(Array.of(1), [1]);
	  assert.deepEqual(Array.of(1, 2, 3), [1, 2, 3]);

	  var C = function C() {};

	  var instance = Array.of.call(C, 1, 2);
	  assert.ok(instance instanceof C);
	  assert.strictEqual(instance[0], 1);
	  assert.strictEqual(instance[1], 2);
	  assert.strictEqual(instance.length, 2);

	  if (DESCRIPTORS) {
	    var called = false;
	    defineProperty(C.prototype, 0, {
	      set: function set() {
	        called = true;
	      }
	    });
	    Array.of.call(C, 1, 2, 3);
	    assert.ok(!called, 'Should not call prototype accessors');
	  }
	});

	function findIndex(callback) {
		var thisArg = arguments[1];
		if(this.length > 0) {
			for(var i = 0, j; i < this.length; i++) {
				j = this[i];
				var r = callback.call(thisArg, j, i, this);
				if(r) {
					return i;
				}
			}
		}
		return -1;
	}

	if(!Array.prototype.findIndex) {
		Array.prototype.findIndex = findIndex;
	}

	QUnit.test('Array#findIndex', function (assert) {
	  var findIndex = Array.prototype.findIndex;
	  assert.isFunction(findIndex);
	  assert.arity(findIndex, 1);
	  assert.name(findIndex, 'findIndex');
	  var array = [1];
	  var context = {};
	  array.findIndex(function (value, key, that) {
	    assert.same(arguments.length, 3, 'correct number of callback arguments');
	    assert.same(value, 1, 'correct value in callback');
	    assert.same(key, 0, 'correct index in callback');
	    assert.same(that, array, 'correct link to array in callback');
	    assert.same(this, context, 'correct callback context');
	  }, context); // eslint-disable-next-line unicorn/prefer-array-index-of -- ignore

	  assert.same([1, 3, NaN, 42, {}].findIndex(function (it) {
	    return it === 42;
	  }), 3); // eslint-disable-next-line unicorn/prefer-array-index-of -- ignore

	  assert.same([1, 3, NaN, 42, {}].findIndex(function (it) {
	    return it === 43;
	  }), -1);

	  if (STRICT) {
	    assert["throws"](function () {
	      return findIndex.call(null, 0);
	    }, TypeError);
	    assert["throws"](function () {
	      return findIndex.call(undefined, 0);
	    }, TypeError);
	  }

	  assert.notThrows(function () {
	    return findIndex.call({
	      length: -1,
	      0: 1
	    }, function () {
	      throw new Error();
	    }) === -1;
	  }, 'uses ToLength');
	});

	function find(callback) {
		var thisArg = arguments[1];
		var i = findIndex.call(this, callback, thisArg);
		if(i >= 0) {
			return this[i];
		}
	}

	if(!Array.prototype.find) {
		Array.prototype.find = find;
	}

	QUnit.test('Array#find', function (assert) {
	  var find = Array.prototype.find;
	  assert.isFunction(find);
	  assert.arity(find, 1);
	  assert.name(find, 'find');
	  var array = [1];
	  var context = {};
	  array.find(function (value, key, that) {
	    assert.same(arguments.length, 3, 'correct number of callback arguments');
	    assert.same(value, 1, 'correct value in callback');
	    assert.same(key, 0, 'correct index in callback');
	    assert.same(that, array, 'correct link to array in callback');
	    assert.same(this, context, 'correct callback context');
	  }, context);
	  assert.same([1, 3, NaN, 42, {}].find(function (it) {
	    return it === 42;
	  }), 42);
	  assert.same([1, 3, NaN, 42, {}].find(function (it) {
	    return it === 43;
	  }), undefined);

	  if (STRICT) {
	    assert["throws"](function () {
	      return find.call(null, 0);
	    }, TypeError);
	    assert["throws"](function () {
	      return find.call(undefined, 0);
	    }, TypeError);
	  }

	  assert.notThrows(function () {
	    return find.call({
	      length: -1,
	      0: 1
	    }, function () {
	      throw new Error();
	    }) === undefined;
	  }, 'uses ToLength');
	});

	function fill(target) {
		if(this.length <= 0) {
			return this;
		}
		var len = this.length;
		var start = arguments[1] || 0;
		var end = arguments[2] || len;
		if(start < 0) {
			start += len;
			if(start < 0) {
				start = 0;
			}
		}
		if(end < 0) {
			end += len;
		}
		var i = Math.min(end, len);
		while(i-- > start) {
			this[i] = target;
		}
		return this;
	}

	if(!Array.prototype.fill) {
		Array.prototype.fill = fill;
	}

	var Object$1 = window.Object;

	function noop(){}

	function log(data) {
		if(window.Debug) {
			Debug.writeln(data);
		}
	}
	if(!window.console) {
		window.console = {
			log: log,
			info: log,
			error: log,
			warn: log,
			clear: noop
		};
	}

	var defineProperty$1 = Object$1.defineProperty;

	function ie8_defineProperty(obj, prop, descriptor) {
		if(obj instanceof Object) {
			compat_defineProperty.apply(Object, arguments);
		} else {
			delete descriptor.enumerable;
			defineProperty$1.apply(Object, arguments);
		}
		return obj;
	}
	function compat_defineProperty(obj, prop, descriptor) {
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

	QUnit.test('Array#fill', function (assert) {
	  var fill = Array.prototype.fill;
	  assert.isFunction(fill);
	  assert.arity(fill, 1);
	  assert.name(fill, 'fill');
	  var array = new Array(5);
	  assert.strictEqual(array.fill(5), array);
	  assert.deepEqual(Array(5).fill(5), [5, 5, 5, 5, 5]);
	  assert.deepEqual(Array(5).fill(5, 1), [undefined, 5, 5, 5, 5]);
	  assert.deepEqual(Array(5).fill(5, 1, 4), [undefined, 5, 5, 5, undefined]);
	  assert.deepEqual(Array(5).fill(5, 6, 1), [undefined, undefined, undefined, undefined, undefined]);
	  assert.deepEqual(Array(5).fill(5, -3, 4), [undefined, undefined, 5, 5, undefined]);
	  assert.arrayEqual(fill.call({
	    length: 5
	  }, 5), [5, 5, 5, 5, 5]);

	  if (STRICT) {
	    assert["throws"](function () {
	      return fill.call(null, 0);
	    }, TypeError);
	    assert["throws"](function () {
	      return fill.call(undefined, 0);
	    }, TypeError);
	  }

	  if (NATIVE && DESCRIPTORS) {
	    assert.notThrows(function () {
	      return fill.call(Object.defineProperty({
	        length: -1
	      }, 0, {
	        set: function set() {
	          throw Error();
	        }
	      }));
	    }, 'uses ToLength');
	  }
	});

	function copyWithin(target, start/*, end*/) {
		var end = arguments[2];
		var len = this.length || 0;

		if(target < 0) {
			target += len;
			if(target < 0) {
				target = 0;
			}
		}

		start = start || 0;
		if(start < 0) {
			start += len;
			if(start < 0) {
				start = 0;
			}
		}
		if(end === undefined) {
			end = len;
		}
		if(end < 0) {
			end += len;
			if(end < 0) {
				end = 0;
			}
		} else if(end - start + target > len) {
			end = len - target + start;
		}
		var i;
		for(i = start; i < end; i++) {
			if(i in this) {
				this[i - start + target] = this[i];
			} else {
				delete this[i];
			}
		}
		return this;
	}

	if(!Array.prototype.copyWithin) {
		Array.prototype.copyWithin = copyWithin;
	}

	QUnit.test('Array#copyWithin', function (assert) {
	  var copyWithin = Array.prototype.copyWithin;
	  assert.isFunction(copyWithin);
	  assert.arity(copyWithin, 2);
	  assert.name(copyWithin, 'copyWithin');
	  var array = [1];
	  assert.strictEqual(array.copyWithin(0), array);
	  assert.deepEqual([1, 2, 3, 4, 5].copyWithin(-2), [1, 2, 3, 1, 2]);
	  assert.deepEqual([1, 2, 3, 4, 5].copyWithin(0, 3), [4, 5, 3, 4, 5]);
	  assert.deepEqual([1, 2, 3, 4, 5].copyWithin(1, 3), [1, 4, 5, 4, 5]);
	  assert.deepEqual([1, 2, 3, 4, 5].copyWithin(1, 2), [1, 3, 4, 5, 5]);
	  assert.deepEqual([1, 2, 3, 4, 5].copyWithin(2, 2), [1, 2, 3, 4, 5]);
	  assert.deepEqual([1, 2, 3, 4, 5].copyWithin(0, 3, 4), [4, 2, 3, 4, 5]);
	  assert.deepEqual([1, 2, 3, 4, 5].copyWithin(1, 3, 4), [1, 4, 3, 4, 5]);
	  assert.deepEqual([1, 2, 3, 4, 5].copyWithin(1, 2, 4), [1, 3, 4, 4, 5]);
	  assert.deepEqual([1, 2, 3, 4, 5].copyWithin(0, -2), [4, 5, 3, 4, 5]);
	  assert.deepEqual([1, 2, 3, 4, 5].copyWithin(0, -2, -1), [4, 2, 3, 4, 5]);
	  assert.deepEqual([1, 2, 3, 4, 5].copyWithin(-4, -3, -2), [1, 3, 3, 4, 5]);
	  assert.deepEqual([1, 2, 3, 4, 5].copyWithin(-4, -3, -1), [1, 3, 4, 4, 5]);
	  assert.deepEqual([1, 2, 3, 4, 5].copyWithin(-4, -3), [1, 3, 4, 5, 5]);

	  if (STRICT) {
	    assert["throws"](function () {
	      return copyWithin.call(null, 0);
	    }, TypeError);
	    assert["throws"](function () {
	      return copyWithin.call(undefined, 0);
	    }, TypeError);
	  }
	});

	function keys$5() {
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
		Array.prototype.keys = keys$5;
	}

	function entries$1() {
		var array = this;
		var index = 0;
		return {
			next: function() {
				var value;
				var done = array.length <= index;
				if(!done) {
					value = [index, array[index]];
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

	if(!Array.prototype.entries) {
		Array.prototype.entries = entries$1;
	}

	QUnit.test('Array#keys', function (assert) {
	  var keys = Array.prototype.keys;
	  assert.isFunction(keys);
	  assert.arity(keys, 0);
	  assert.name(keys, 'keys');
	  var iterator = ['q', 'w', 'e'].keys();
	  assert.isIterator(iterator);
	  assert.isIterable(iterator);
	  assert.deepEqual(iterator.next(), {
	    value: 0,
	    done: false
	  });
	  assert.deepEqual(iterator.next(), {
	    value: 1,
	    done: false
	  });
	  assert.deepEqual(iterator.next(), {
	    value: 2,
	    done: false
	  });
	  assert.deepEqual(iterator.next(), {
	    value: undefined,
	    done: true
	  });
	  assert.deepEqual(keys.call({
	    length: -1
	  }).next(), {
	    value: undefined,
	    done: true
	  }, 'uses ToLength');
	});
	QUnit.test('Array#values', function (assert) {
	  var values = Array.prototype.values;
	  assert.isFunction(values);
	  assert.arity(values, 0);
	  assert.name(values, 'values');
	  var iterator = ['q', 'w', 'e'].values();
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
	  assert.deepEqual(values.call({
	    length: -1
	  }).next(), {
	    value: undefined,
	    done: true
	  }, 'uses ToLength');
	});
	QUnit.test('Array#entries', function (assert) {
	  var entries = Array.prototype.entries;
	  assert.isFunction(entries);
	  assert.arity(entries, 0);
	  assert.name(entries, 'entries');
	  var iterator = ['q', 'w', 'e'].entries();
	  assert.isIterator(iterator);
	  assert.isIterable(iterator);
	  assert.deepEqual(iterator.next(), {
	    value: [0, 'q'],
	    done: false
	  });
	  assert.deepEqual(iterator.next(), {
	    value: [1, 'w'],
	    done: false
	  });
	  assert.deepEqual(iterator.next(), {
	    value: [2, 'e'],
	    done: false
	  });
	  assert.deepEqual(iterator.next(), {
	    value: undefined,
	    done: true
	  });
	  assert.deepEqual(entries.call({
	    length: -1
	  }).next(), {
	    value: undefined,
	    done: true
	  }, 'uses ToLength');
	});
	QUnit.test('Array#@@iterator', function (assert) {
	  assert.isIterable(Array.prototype);
	  assert.arity(Array.prototype[Symbol.iterator], 0);
	  assert.name(Array.prototype[Symbol.iterator], 'values');
	  assert.strictEqual(Array.prototype[Symbol.iterator], Array.prototype.values);
	  var iterator = ['q', 'w', 'e'][Symbol.iterator]();
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
	  assert.deepEqual(Array.prototype[Symbol.iterator].call({
	    length: -1
	  }).next(), {
	    value: undefined,
	    done: true
	  }, 'uses ToLength');
	});

	var isNaN$2 = window.isNaN;

	function isNaN$1(value) {
		return typeof value === "number" && isNaN$2(value);
	}

	function includes$1(search) {
		var i = this.length;
		while(i-- > 0) {
			var value = this[i];
			if(value === search || isNaN$1(value) && isNaN$1(search)) {
				return true;
			}
		}
		return false;
	}

	if(!Array.prototype.includes) {
		Array.prototype.includes = includes$1;
	}

	function includes(search) {
		if(search instanceof RegExp) {
			throw new TypeError("First argument must not be a regular expression");
		}
		var start = arguments[1];
		if(typeof start !== 'number') {
			start = 0;
		}
		return this.indexOf(search, start) !== -1;
	}

	if(!String.prototype.includes) {
		String.prototype.includes = includes;
	}

	QUnit.test('Array#includes', function (assert) {
	  var includes = Array.prototype.includes;
	  assert.isFunction(includes);
	  assert.name(includes, 'includes');
	  assert.arity(includes, 1);
	  var object = {};
	  var array = [1, 2, 3, -0, object];
	  assert.ok(array.includes(1));
	  assert.ok(array.includes(-0));
	  assert.ok(array.includes(0));
	  assert.ok(array.includes(object));
	  assert.ok(!array.includes(4));
	  assert.ok(!array.includes(-0.5));
	  assert.ok(!array.includes({}));
	  assert.ok(Array(1).includes(undefined));
	  assert.ok([NaN].includes(NaN));

	  if (STRICT) {
	    assert["throws"](function () {
	      return includes.call(null, 0);
	    }, TypeError);
	    assert["throws"](function () {
	      return includes.call(undefined, 0);
	    }, TypeError);
	  }
	});

	function isArray(obj){
		return Object.prototype.toString.call(obj)==='[object Array]';
	}

	if(!Array$1.isArray) {
		Array$1.isArray = isArray;
	}

	function flat() {
		var deep = arguments[0];
		if(deep == null) deep = 1;
		var arr = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(Array.isArray(item) && deep > 0) {
				arr = arr.concat(flat.call(item, deep - 1));
			} else {
				arr.push(item);
			}
		}
		return arr;
	}

	if(!Array.prototype.flat) {
		Array.prototype.flat = flat;
	}

	QUnit.test('Array#flat', function (assert) {
	  var flat = Array.prototype.flat;
	  var defineProperty = Object.defineProperty;
	  assert.isFunction(flat);
	  assert.name(flat, 'flat');
	  assert.arity(flat, 0);
	  assert.deepEqual([].flat(), []);
	  var array = [1, [2, 3], [4, [5, 6]]];
	  assert.deepEqual(array.flat(0), array);
	  assert.deepEqual(array.flat(1), [1, 2, 3, 4, [5, 6]]);
	  assert.deepEqual(array.flat(), [1, 2, 3, 4, [5, 6]]);
	  assert.deepEqual(array.flat(2), [1, 2, 3, 4, 5, 6]);
	  assert.deepEqual(array.flat(3), [1, 2, 3, 4, 5, 6]);
	  assert.deepEqual(array.flat(-1), array);
	  assert.deepEqual(array.flat(Infinity), [1, 2, 3, 4, 5, 6]);

	  if (STRICT) {
	    assert["throws"](function () {
	      return flat.call(null);
	    }, TypeError);
	    assert["throws"](function () {
	      return flat.call(undefined);
	    }, TypeError);
	  }

	  if (DESCRIPTORS) {
	    assert.notThrows(function () {
	      return flat.call(defineProperty({
	        length: -1
	      }, 0, {
	        enumerable: true,
	        get: function get() {
	          throw new Error();
	        }
	      })).length === 0;
	    }, 'uses ToLength');
	  }
	});

	var map = Array.prototype.map || map$1;

	function flatMap(fn) {
		return flat.call(map.call(this, fn, arguments[1]), 1);
	}

	if(!Array.prototype.flatMap) {
		Array.prototype.flatMap = flatMap;
	}

	QUnit.test('Array#flatMap', function (assert) {
	  var flatMap = Array.prototype.flatMap;
	  assert.isFunction(flatMap);
	  assert.name(flatMap, 'flatMap');
	  assert.arity(flatMap, 1);
	  assert.deepEqual([].flatMap(function (it) {
	    return it;
	  }), []);
	  assert.deepEqual([1, 2, 3].flatMap(function (it) {
	    return it;
	  }), [1, 2, 3]);
	  assert.deepEqual([1, 2, 3].flatMap(function (it) {
	    return [it, it];
	  }), [1, 1, 2, 2, 3, 3]);
	  assert.deepEqual([1, 2, 3].flatMap(function (it) {
	    return [[it], [it]];
	  }), [[1], [1], [2], [2], [3], [3]]);
	  assert.deepEqual([1, [2, 3]].flatMap(function () {
	    return 1;
	  }), [1, 1]);
	  var array = [1];
	  var context = {};
	  array.flatMap(function (value, key, that) {
	    assert.same(value, 1);
	    assert.same(key, 0);
	    assert.same(that, array);
	    assert.same(this, context);
	    return value;
	  }, context);

	  if (STRICT) {
	    assert["throws"](function () {
	      return flatMap.call(null, function (it) {
	        return it;
	      });
	    }, TypeError);
	    assert["throws"](function () {
	      return flatMap.call(undefined, function (it) {
	        return it;
	      });
	    }, TypeError);
	  }

	  assert.notThrows(function () {
	    return flatMap.call({
	      length: -1
	    }, function () {
	      throw new Error();
	    }).length === 0;
	  }, 'uses ToLength');
	});

	QUnit.test('String#includes', function (assert) {
	  var includes = String.prototype.includes;
	  assert.isFunction(includes);
	  assert.arity(includes, 1);
	  assert.name(includes, 'includes');
	  assert.ok(!'abc'.includes());
	  assert.ok('aundefinedb'.includes());
	  assert.ok('abcd'.includes('b', 1));
	  assert.ok(!'abcd'.includes('b', 2));

	  if (STRICT) {
	    assert["throws"](function () {
	      return includes.call(null, '.');
	    }, TypeError);
	    assert["throws"](function () {
	      return includes.call(undefined, '.');
	    }, TypeError);
	  }

	  var regexp = /./;
	  assert["throws"](function () {
	    return '/./'.includes(regexp);
	  }, TypeError);
	  var object = {};
	  assert.notThrows(function () {
	    return '[object Object]'.includes(object);
	  });
	});

	function startsWith(search) {
		if(search instanceof RegExp) {
			throw new TypeError("First argument must not be a regular expression");
		}
		var pos = arguments[1];
		pos = isNaN(pos) ? 0 : (pos < 0 ? 0 : +pos);
		search = String(search);
		return this.substring(pos, pos + search.length) === search;
	}

	if(!String.prototype.startsWith) {
		String.prototype.startsWith = startsWith;
	}

	GLOBAL.Symbol || {};
	QUnit.test('String#startsWith', function (assert) {
	  var startsWith = String.prototype.startsWith;
	  assert.isFunction(startsWith);
	  assert.arity(startsWith, 1);
	  assert.name(startsWith, 'startsWith');
	  assert.ok('undefined'.startsWith());
	  assert.ok(!'undefined'.startsWith(null));
	  assert.ok('abc'.startsWith(''));
	  assert.ok('abc'.startsWith('a'));
	  assert.ok('abc'.startsWith('ab'));
	  assert.ok(!'abc'.startsWith('bc'));
	  assert.ok('abc'.startsWith('', NaN));
	  assert.ok('abc'.startsWith('a', -1));
	  assert.ok(!'abc'.startsWith('a', 1));
	  assert.ok(!'abc'.startsWith('a', Infinity));
	  assert.ok('abc'.startsWith('b', true));
	  assert.ok('abc'.startsWith('a', 'x'));

	  if (STRICT) {
	    assert["throws"](function () {
	      return startsWith.call(null, '.');
	    }, TypeError);
	    assert["throws"](function () {
	      return startsWith.call(undefined, '.');
	    }, TypeError);
	  }

	  var regexp = /./;
	  assert["throws"](function () {
	    return '/./'.startsWith(regexp);
	  }, TypeError);
	  var object = {};
	  assert.notThrows(function () {
	    return '[object Object]'.startsWith(object);
	  });
	});

	function endsWith(search) {
		if(search instanceof RegExp) {
			throw new TypeError("First argument must not be a regular expression");
		}
		var len = this.length;
		var pos = arguments[1];
		if(pos == null) {
			pos = len;
		} else if(isNaN(pos)) {
			pos = 0;
		} else {
			pos = pos > len ? len : +pos;
		}
		search = String(search);
		return this.substring(pos - search.length, pos) === search;
	}

	if(!String.prototype.endsWith) {
		String.prototype.endsWith = endsWith;
	}

	GLOBAL.Symbol || {};
	QUnit.test('String#endsWith', function (assert) {
	  var endsWith = String.prototype.endsWith;
	  assert.isFunction(endsWith);
	  assert.arity(endsWith, 1);
	  assert.name(endsWith, 'endsWith');
	  assert.ok('undefined'.endsWith());
	  assert.ok(!'undefined'.endsWith(null));
	  assert.ok('abc'.endsWith(''));
	  assert.ok('abc'.endsWith('c'));
	  assert.ok('abc'.endsWith('bc'));
	  assert.ok(!'abc'.endsWith('ab'));
	  assert.ok('abc'.endsWith('', NaN));
	  assert.ok(!'abc'.endsWith('c', -1));
	  assert.ok('abc'.endsWith('a', 1));
	  assert.ok('abc'.endsWith('c', Infinity));
	  assert.ok('abc'.endsWith('a', true));
	  assert.ok(!'abc'.endsWith('c', 'x'));
	  assert.ok(!'abc'.endsWith('a', 'x'));

	  if (STRICT) {
	    assert["throws"](function () {
	      return endsWith.call(null, '.');
	    }, TypeError);
	    assert["throws"](function () {
	      return endsWith.call(undefined, '.');
	    }, TypeError);
	  }

	  var regexp = /./;
	  assert["throws"](function () {
	    return '/./'.endsWith(regexp);
	  }, TypeError);
	  var object = {};
	  assert.notThrows(function () {
	    return '[object Object]'.endsWith(object);
	  });
	});

	function trim() {
		return this.replace(/^[\s\u3000\xA0]+|[\s\u3000\xA0]+$/g, '');
	}

	if(!String.prototype.trim) {
		String.prototype.trim = trim;
	}

	QUnit.test('String#trim', function (assert) {
	  var trim = String.prototype.trim;
	  assert.isFunction(''.trim);
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

	if(!String.prototype.trimLeft) {
		String.prototype.trimLeft = trimStart;
	}

	QUnit.test('String#trimLeft', function (assert) {
	  var _String$prototype = String.prototype,
	      trimStart = _String$prototype.trimStart,
	      trimLeft = _String$prototype.trimLeft;
	  assert.same(trimStart, trimLeft, 'same #trimLeft');
	});
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

	if(!String.prototype.trimRight) {
		String.prototype.trimRight = trimEnd;
	}

	QUnit.test('String#trimRight', function (assert) {
	  var _String$prototype = String.prototype,
	      trimEnd = _String$prototype.trimEnd,
	      trimRight = _String$prototype.trimRight;
	  assert.same(trimEnd, trimRight, 'same #trimRight');
	});
	QUnit.test('String#trimEnd', function (assert) {
	  var _String$prototype2 = String.prototype,
	      trimEnd = _String$prototype2.trimEnd;
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

	QUnit.test('String#@@iterator', function (assert) {
	  assert.isIterable(String.prototype);
	  var iterator = 'qwe'[Symbol.iterator]();
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
	  iterator = '𠮷𠮷𠮷'[Symbol.iterator]();
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
		it[Symbol.iterator] = function() {
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

	function prefixIntrger2(number) {
		if(number<10){
			return '0'+number;
		}
		return number;
	}

	function prefixIntrger3(number) {
		if(number<100){
			return '0'+prefixIntrger2(number);
		}
		return number;
	}

	if(!Date.prototype.toISOString){
		Date.prototype.toISOString = function() {
			return this.getUTCFullYear()+
				'-'+prefixIntrger2(this.getUTCMonth()+1)+
				'-'+prefixIntrger2(this.getUTCDate()) +
				'T'+prefixIntrger2(this.getUTCHours()) +
				':'+prefixIntrger2(this.getUTCMinutes()) +
				':'+prefixIntrger2(this.getUTCSeconds()) +
				'.'+prefixIntrger3(this.getUTCMilliseconds())+'Z';
		};
	}

	if(!Date.prototype.toJSON){
		Date.prototype.toJSON=Date.prototype.toISOString;
	}

	if(!Object$1.getOwnPropertySymbols) {
		Object$1.getOwnPropertySymbols = getOwnPropertySymbols$3;
	}

	var hasInstance = '@@hasInstance';

	if(!Function.prototype[hasInstance]) {
		Function.prototype[hasInstance] = function(instance) {
			return instance instanceof this;
		};
	}

	var symbol_cache = {};
	function compat_for(desc) {
		if(Object.prototype.hasOwnProperty.call(symbol_cache, desc)) {
			return symbol_cache[desc];
		}
		var s = Symbol(desc);
		s.__key__ = desc;
		symbol_cache[desc] = s;
		return s;
	}

	if(!('for' in Symbol$4)) {
		Symbol$4['for'] = compat_for;
	}

	function keyFor(symbol) {
		var s = String(symbol);
		if(s.indexOf("@@") !== 0) {
			throw new TypeError(s + " is not a symbol");
		}
		return symbol.__key__;
	}

	if(!Symbol$4.keyFor) {
		Symbol$4.keyFor = keyFor;
	}

	var JSON$1 = window.JSON;

	function parse(str) {
		return eval('(' + str + ')');
	}

	var dontEnums=[
		"toString",
		"toLocaleString",
		"valueOf",
		"hasOwnProperty",
		"isPrototypeOf",
		"propertyIsEnumerable"
	];

	function getPrototypeOf(obj){
		if(typeof obj!=="object"){
			obj=Object(obj);
		}
		if(!('constructor' in obj)){
			return null;
		}
		if(Object.prototype.hasOwnProperty.call(obj,'constructor')){
			if('__proto__' in obj.constructor){
				return obj.constructor.__proto__.prototype;
			}
		}
		return obj.constructor.prototype;
	}

	function keys$4(obj) {
		var result = [], key;
		var isJsObject = obj instanceof Object;
		if(!isJsObject) {
			var proto = getPrototypeOf(obj);
			if(proto) {
				for(key in obj) {
					if(!key.substring(0, 2) === "@@" && !key.substring(0, 2) === "__" && proto[key] !== obj[key]) {
						result.push(key);
					}
				}
				return result;
			}
		}
		for(key in obj) {
			if(Object.prototype.hasOwnProperty.call(obj, key) && !key.substring(0, 2) === "@@" && !key.substring(0, 2) === "__") {
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

	if(!Object$1.keys) {
		Object$1.keys = keys$4;
	}

	var escapeString$1 = JSON.stringify;

	var rx_escapable = /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
	function compat_escapeString(str) {//from lodash
		rx_escapable.lastIndex = 0;
		return rx_escapable.test(str)
			? str.replace(rx_escapable, function(a) {
				var meta = {
					"\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", "\"": "\\\"", "\\": "\\\\"
				};
				var c = meta[a];
				return typeof c === "string"
					? c
					: "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
			}) : str;
	}
	var escapeString = JSON$1 ? escapeString$1 : compat_escapeString;

	function isFunction(obj) {
		return typeof obj === 'function';
	}

	function stringify(obj) {
		switch(obj) {
			case undefined:
			case null:
				return "null";
			case false:
			case true:
				return obj;
			default:
				var type = Object.prototype.toString.call(obj);
				switch(type) {
					case '[object String]':
						return '"' + escapeString(obj) + '"';
					case '[object Number]':
						return isNaN(obj) ? "null" : obj.toString();
					case '[object Array]':
						return "[" + obj.map(stringify).join(",") + "]";
					default:
						if(obj.toJSON && isFunction(obj.toJSON)) {
							return stringify(obj.toJSON());
						}
						var items = [];
						var ownKeys = Object.keys(obj);
						for(var i = 0; i < ownKeys.length; i++) {
							var key = ownKeys[i];
							var value = obj[key];
							if(value !== void 0) {
								if(!isFunction(value)) {
									items.push('"' + escapeString(key) + '":' + stringify(value));
								}
							}
						}
						return "{" + items.join(",") + "}";
				}
		}
	}

	if(!JSON$1) {
		window.JSON = {
			stringify: stringify,
			parse: parse
		};
	}

	var defineProperty = Object.defineProperty,
	    defineProperties$1 = Object.defineProperties,
	    getOwnPropertyDescriptor$3 = Object.getOwnPropertyDescriptor,
	    getOwnPropertyNames$2 = Object.getOwnPropertyNames,
	    keys$3 = Object.keys,
	    create$2 = Object.create;
	var getOwnPropertySymbols$2 = Object.getOwnPropertySymbols;

	var _ref$2 = GLOBAL.Reflect || {},
	    ownKeys$2 = _ref$2.ownKeys;

	QUnit.test('Symbol', function (assert) {
	  assert.isFunction(Symbol);
	  if (NATIVE) assert.strictEqual(Symbol.length, 0, 'arity is 0');
	  assert.name(Symbol, 'Symbol');
	  var symbol1 = Symbol('symbol');
	  var symbol2 = Symbol('symbol');
	  assert.ok(symbol1 !== symbol2, 'Symbol("symbol") !== Symbol("symbol")');
	  var object = {};
	  object[symbol1] = 42;
	  assert.ok(object[symbol1] === 42, 'Symbol() work as key');
	  assert.ok(object[symbol2] !== 42, 'Various symbols from one description are various keys');

	  if (DESCRIPTORS) {
	    var count = 0; // eslint-disable-next-line no-unused-vars -- required for testing

	    for (var key in object) {
	      count++;
	    }

	    assert.ok(count === 0, 'object[Symbol()] is not enumerable');
	  }
	});
	QUnit.test('Well-known Symbols', function (assert) {
	  assert.ok(Symbol.hasInstance, "Symbol.hasInstance available");
	  assert.ok(Symbol.iterator, "Symbol.iterator available");
	  assert.ok(Symbol.asyncIterator, "Symbol.asyncIterator available");
	});
	QUnit.test('Global symbol registry', function (assert) {
	  assert.isFunction(Symbol["for"], 'Symbol.for is function');
	  assert.strictEqual(Symbol["for"].length, 1, 'Symbol.for arity is 1');
	  if (NATIVE) assert.strictEqual(Symbol["for"].name, 'for', 'Symbol.for.name is "for"');
	  assert.isFunction(Symbol.keyFor, 'Symbol.keyFor is function');
	  assert.strictEqual(Symbol.keyFor.length, 1, 'Symbol.keyFor arity is 1');
	  assert.name(Symbol.keyFor, 'keyFor');
	  var symbol = Symbol["for"]('foo');
	  assert.strictEqual(Symbol["for"]('foo'), symbol);
	  assert.strictEqual(Symbol.keyFor(symbol), 'foo');
	  assert["throws"](function () {
	    return Symbol.keyFor('foo');
	  }, 'throws on non-symbol');
	});
	QUnit.test('Object.getOwnPropertySymbols', function (assert) {
	  assert.isFunction(getOwnPropertySymbols$2);
	  assert.strictEqual(getOwnPropertySymbols$2.length, 1, 'arity is 1');
	  assert.name(getOwnPropertySymbols$2, 'getOwnPropertySymbols');
	  var prototype = {
	    q: 1,
	    w: 2,
	    e: 3
	  };
	  prototype[Symbol()] = 42;
	  prototype[Symbol()] = 43;
	  assert.deepEqual(getOwnPropertyNames$2(prototype).sort(), ['e', 'q', 'w']);
	  assert.strictEqual(getOwnPropertySymbols$2(prototype).length, 2);
	  var object = create$2(prototype);
	  object.a = 1;
	  object.s = 2;
	  object.d = 3;
	  object[Symbol()] = 44;
	  assert.deepEqual(getOwnPropertyNames$2(object).sort(), ['a', 'd', 's']);
	  assert.strictEqual(getOwnPropertySymbols$2(object).length, 1);
	  assert.strictEqual(getOwnPropertySymbols$2(Object.prototype).length, 0);
	  var primitives = [42, 'foo', false];

	  var _loop = function _loop() {
	    var value = _primitives[_i];
	    assert.notThrows(function () {
	      return getOwnPropertySymbols$2(value);
	    }, "accept " + typeof value);
	  };

	  for (var _i = 0, _primitives = primitives; _i < _primitives.length; _i++) {
	    _loop();
	  }
	});

	if (JSON) {
	  QUnit.test('Symbols & JSON.stringify', function (assert) {
	    assert.strictEqual(JSON.stringify([1, Symbol('foo'), false, Symbol('bar'), {}]), '[1,null,false,null,{}]', 'array value');
	    assert.strictEqual(JSON.stringify({
	      symbol: Symbol('symbol')
	    }), '{}', 'object value');

	    if (DESCRIPTORS) {
	      var object = {
	        bar: 2
	      };
	      object[Symbol('symbol')] = 1;
	      assert.strictEqual(JSON.stringify(object), '{"bar":2}', 'object key');
	    }

	    assert.strictEqual(JSON.stringify(Symbol('symbol')), undefined, 'symbol value');

	    if (typeof Symbol() === 'symbol') {
	      assert.strictEqual(JSON.stringify(Object(Symbol('symbol'))), '{}', 'boxed symbol');
	    }

	    assert.strictEqual(JSON.stringify(undefined, function () {
	      return 42;
	    }), '42', 'replacer works with top-level undefined');
	  });
	}

	if (DESCRIPTORS) {
	  QUnit.test('Symbols & descriptors', function (assert) {
	    var d = Symbol('d');
	    var e = Symbol('e');
	    var f = Symbol('f');
	    var i = Symbol('i');
	    var j = Symbol('j');
	    var prototype = {
	      g: 'g'
	    };
	    prototype[i] = 'i';
	    defineProperty(prototype, 'h', {
	      value: 'h'
	    });
	    defineProperty(prototype, 'j', {
	      value: 'j'
	    });
	    var object = create$2(prototype);
	    object.a = 'a';
	    object[d] = 'd';
	    defineProperty(object, 'b', {
	      value: 'b'
	    });
	    defineProperty(object, 'c', {
	      value: 'c',
	      enumerable: true
	    });
	    defineProperty(object, e, {
	      configurable: true,
	      writable: true,
	      value: 'e'
	    });
	    var descriptor = {
	      value: 'f',
	      enumerable: true
	    };
	    defineProperty(object, f, descriptor);
	    assert.strictEqual(descriptor.enumerable, true, 'defineProperty not changes descriptor object');
	    assert.deepEqual(getOwnPropertyDescriptor$3(object, 'a'), {
	      configurable: true,
	      writable: true,
	      enumerable: true,
	      value: 'a'
	    }, 'getOwnPropertyDescriptor a');
	    assert.deepEqual(getOwnPropertyDescriptor$3(object, 'b'), {
	      configurable: false,
	      writable: false,
	      enumerable: false,
	      value: 'b'
	    }, 'getOwnPropertyDescriptor b');
	    assert.deepEqual(getOwnPropertyDescriptor$3(object, 'c'), {
	      configurable: false,
	      writable: false,
	      enumerable: true,
	      value: 'c'
	    }, 'getOwnPropertyDescriptor c');
	    assert.deepEqual(getOwnPropertyDescriptor$3(object, d), {
	      configurable: true,
	      writable: true,
	      enumerable: true,
	      value: 'd'
	    }, 'getOwnPropertyDescriptor d');
	    assert.deepEqual(getOwnPropertyDescriptor$3(object, e), {
	      configurable: true,
	      writable: true,
	      enumerable: false,
	      value: 'e'
	    }, 'getOwnPropertyDescriptor e');
	    assert.deepEqual(getOwnPropertyDescriptor$3(object, f), {
	      configurable: false,
	      writable: false,
	      enumerable: true,
	      value: 'f'
	    }, 'getOwnPropertyDescriptor f');
	    assert.strictEqual(getOwnPropertyDescriptor$3(object, 'g'), undefined, 'getOwnPropertyDescriptor g');
	    assert.strictEqual(getOwnPropertyDescriptor$3(object, 'h'), undefined, 'getOwnPropertyDescriptor h');
	    assert.strictEqual(getOwnPropertyDescriptor$3(object, i), undefined, 'getOwnPropertyDescriptor i');
	    assert.strictEqual(getOwnPropertyDescriptor$3(object, j), undefined, 'getOwnPropertyDescriptor j');
	    assert.strictEqual(getOwnPropertyDescriptor$3(object, 'k'), undefined, 'getOwnPropertyDescriptor k');
	    assert.strictEqual(getOwnPropertyDescriptor$3(Object.prototype, 'toString').enumerable, false, 'getOwnPropertyDescriptor on Object.prototype');
	    assert.strictEqual(getOwnPropertyDescriptor$3(Object.prototype, d), undefined, 'getOwnPropertyDescriptor on Object.prototype missed symbol');
	    assert.strictEqual(keys$3(object).length, 2, 'Object.keys');
	    assert.strictEqual(getOwnPropertyNames$2(object).length, 3, 'Object.getOwnPropertyNames');
	    assert.strictEqual(getOwnPropertySymbols$2(object).length, 3, 'Object.getOwnPropertySymbols');
	    assert.strictEqual(ownKeys$2(object).length, 6, 'Reflect.ownKeys');
	    delete object[e];
	    object[e] = 'e';
	    assert.deepEqual(getOwnPropertyDescriptor$3(object, e), {
	      configurable: true,
	      writable: true,
	      enumerable: true,
	      value: 'e'
	    }, 'redefined non-enum key');
	  });
	  QUnit.test('Symbols & Object.defineProperties', function (assert) {
	    var c = Symbol('c');
	    var d = Symbol('d');
	    var descriptors = {
	      a: {
	        value: 'a'
	      }
	    };
	    descriptors[c] = {
	      value: 'c'
	    };
	    defineProperty(descriptors, 'b', {
	      value: {
	        value: 'b'
	      }
	    });
	    defineProperty(descriptors, d, {
	      value: {
	        value: 'd'
	      }
	    });
	    var object = defineProperties$1({}, descriptors);
	    assert.strictEqual(object.a, 'a', 'a');
	    assert.strictEqual(object.b, undefined, 'b');
	    assert.strictEqual(object[c], 'c', 'c');
	    assert.strictEqual(object[d], undefined, 'd');
	  });
	  QUnit.test('Symbols & Object.create', function (assert) {
	    var c = Symbol('c');
	    var d = Symbol('d');
	    var descriptors = {
	      a: {
	        value: 'a'
	      }
	    };
	    descriptors[c] = {
	      value: 'c'
	    };
	    defineProperty(descriptors, 'b', {
	      value: {
	        value: 'b'
	      }
	    });
	    defineProperty(descriptors, d, {
	      value: {
	        value: 'd'
	      }
	    });
	    var object = create$2(null, descriptors);
	    assert.strictEqual(object.a, 'a', 'a');
	    assert.strictEqual(object.b, undefined, 'b');
	    assert.strictEqual(object[c], 'c', 'c');
	    assert.strictEqual(object[d], undefined, 'd');
	  });
	  var constructors = ['Map', 'Set', 'Promise'];

	  var _loop2 = function _loop2() {
	    var name = _constructors[_i2];
	    QUnit.test(name + "@@species", function (assert) {
	      assert.strictEqual(GLOBAL[name][Symbol.species], GLOBAL[name], name + "@@species === " + name);
	      var Subclass = create$2(GLOBAL[name]);
	      assert.strictEqual(Subclass[Symbol.species], Subclass, name + " subclass");
	    });
	  };

	  for (var _i2 = 0, _constructors = constructors; _i2 < _constructors.length; _i2++) {
	    _loop2();
	  }

	  QUnit.test('Array@@species', function (assert) {
	    assert.strictEqual(Array[Symbol.species], Array, 'Array@@species === Array');
	    var Subclass = create$2(Array);
	    assert.strictEqual(Subclass[Symbol.species], Subclass, 'Array subclass');
	  });
	  QUnit.test('Symbol.sham flag', function (assert) {
	    assert.same(Symbol.sham, typeof Symbol() === 'symbol' ? undefined : true);
	  });
	}

	QUnit.test('Symbol#description', function (assert) {
	  assert.same(Symbol('foo').description, 'foo');
	  assert.same(Symbol('').description, '');
	  assert.same(Symbol(')').description, ')');
	  assert.same(Symbol({}).description, '[object Object]');
	  assert.same(Symbol(null).description, 'null');
	  assert.same(Symbol(undefined).description, undefined);
	  assert.same(Symbol().description, undefined);
	  assert.same(Object(Symbol('foo')).description, 'foo');
	  assert.same(Object(Symbol()).description, undefined); // if (DESCRIPTORS) {
	  //   assert.ok(!Object.prototype.hasOwnProperty.call(Symbol('foo'), 'description'));
	  //   const descriptor = Object.getOwnPropertyDescriptor(Symbol.prototype, 'description');
	  //   assert.same(descriptor.enumerable, false);
	  //   assert.same(descriptor.configurable, true);
	  //   assert.same(typeof descriptor.get, 'function');
	  // }

	  if (typeof Symbol() == 'symbol') {
	    assert.same(Symbol('foo').toString(), 'Symbol(foo)');
	    assert.same(String(Symbol('foo')), 'Symbol(foo)');
	    assert.same(Symbol('').toString(), 'Symbol()');
	    assert.same(String(Symbol('')), 'Symbol()');
	    assert.same(Symbol().toString(), 'Symbol()');
	    assert.same(String(Symbol()), 'Symbol()');
	  }
	});

	function getOwnPropertyDescriptor$2(obj,prop){
		var key='@@desc:'+prop;
		if(Object.prototype.hasOwnProperty.call(obj,key)){
			return obj[key];
		}
		if(Object.prototype.hasOwnProperty.call(obj,prop)){
			return {value: obj[prop], writable: true, enumerable: true, configurable: true};
		}
	}

	if(!Object$1.getOwnPropertyDescriptor) {
		Object$1.getOwnPropertyDescriptor = getOwnPropertyDescriptor$2;
	}

	QUnit.test('Symbol.asyncIterator', function (assert) {
	  assert.ok('asyncIterator' in Symbol, 'Symbol.asyncIterator available');
	  assert.nonEnumerable(Symbol, 'asyncIterator');
	  assert.ok(Object(Symbol.asyncIterator) instanceof Symbol, 'Symbol.asyncIterator is symbol');

	  if (DESCRIPTORS) {
	    var descriptor = Object.getOwnPropertyDescriptor(Symbol, 'asyncIterator');
	    assert.ok(!descriptor.enumerble, 'non-enumerable');
	    assert.ok(!descriptor.writable, 'non-writable');
	    assert.ok(!descriptor.configurable, 'non-configurable');
	  }
	});

	QUnit.test('Object.assign', function (assert) {
	  var assign = Object.assign,
	      keys = Object.keys,
	      defineProperty = Object.defineProperty;
	  assert.isFunction(assign);
	  assert.arity(assign, 2);
	  assert.name(assign, 'assign');
	  assert.looksNative(assign);
	  assert.nonEnumerable(Object, 'assign');
	  var object = {
	    q: 1
	  };
	  assert.strictEqual(object, assign(object, {
	    bar: 2
	  }), 'assign return target');
	  assert.strictEqual(object.bar, 2, 'assign define properties');
	  assert.deepEqual(assign({}, {
	    q: 1
	  }, {
	    w: 2
	  }), {
	    q: 1,
	    w: 2
	  });
	  assert.deepEqual(assign({}, 'qwe'), {
	    0: 'q',
	    1: 'w',
	    2: 'e'
	  });
	  assert["throws"](function () {
	    return assign(null, {
	      q: 1
	    });
	  }, TypeError);
	  assert["throws"](function () {
	    return assign(undefined, {
	      q: 1
	    });
	  }, TypeError);
	  var string = assign('qwe', {
	    q: 1
	  });
	  assert.strictEqual(typeof string, 'object');
	  assert.strictEqual(String(string), 'qwe');
	  assert.strictEqual(string.q, 1);
	  assert.same(assign({}, {
	    valueOf: 42
	  }).valueOf, 42, 'IE enum keys bug');

	  if (DESCRIPTORS) {
	    object = {
	      baz: 1
	    };
	    assign(object, defineProperty({}, 'bar', {
	      get: function get() {
	        return this.baz + 1;
	      }
	    }));
	    assert.ok(object.bar === undefined, "assign don't copy descriptors");
	    object = {
	      a: 'a'
	    };
	    var c = Symbol('c');
	    var d = Symbol('d');
	    object[c] = 'c';
	    defineProperty(object, 'b', {
	      value: 'b'
	    });
	    defineProperty(object, d, {
	      value: 'd'
	    });
	    var object2 = assign({}, object);
	    assert.strictEqual(object2.a, 'a', 'a');
	    assert.strictEqual(object2.b, undefined, 'b');
	    assert.strictEqual(object2[c], 'c', 'c');
	    assert.strictEqual(object2[d], undefined, 'defineProperty 不允许使用Symbol');

	    try {
	      assert.strictEqual(Function('assign', "\n        return assign({ b: 1 }, { get a() {\n          delete this.b;\n        }, b: 2 });\n      ")(assign).b, 1);
	    } catch (_unused) {
	      /* empty */
	    }

	    try {
	      assert.strictEqual(Function('assign', "\n        return assign({ b: 1 }, { get a() {\n          Object.defineProperty(this, \"b\", {\n            value: 3,\n            enumerable: false\n          });\n        }, b: 2 });\n      ")(assign).b, 1);
	    } catch (_unused2) {
	      /* empty */
	    }
	  }

	  string = 'abcdefghijklmnopqrst';
	  var result = {};

	  for (var i = 0, _string = string, length = _string.length; i < length; ++i) {
	    var _char = string.charAt(i);

	    result[_char] = _char;
	  }

	  assert.strictEqual(keys(assign({}, result)).join(''), string);
	});

	function defineProperties(obj, properties) {
		var ownKeys = Object.keys(properties);
		var len = ownKeys.length;
		for(var i = 0; i < len; i++) {
			var key = ownKeys[i];
			Object.defineProperty(obj, key, properties[key]);
		}
	}

	var $inject_Object_defineProperties = Object$1.defineProperties || defineProperties;

	//var defineProperties = require("sky-core/pure/Object/defineProperties");
	function create$1(proto, properties) {
		function F() { }
		F.prototype = proto;
		var o = new F();
		if(properties) {
			$inject_Object_defineProperties(o, properties);
		}
		return o;
	}

	if(!Object$1.create) {
		Object$1.create = create$1;
	}

	QUnit.test('Object.create', function (assert) {
	  var create = Object.create,
	      getPrototypeOf = Object.getPrototypeOf,
	      getOwnPropertyNames = Object.getOwnPropertyNames;

	  function getPropertyNames(object) {
	    var result = [];

	    do {
	      result = result.concat(getOwnPropertyNames(object));
	    } while (object = getPrototypeOf(object));

	    return result;
	  }

	  assert.isFunction(create);
	  assert.arity(create, 2);
	  assert.name(create, 'create');
	  assert.looksNative(create);
	  assert.nonEnumerable(Object, 'create');
	  var object = {
	    q: 1
	  };
	  assert.ok({}.isPrototypeOf.call(object, create(object)));
	  assert.ok(create(object).q === 1);

	  function F() {
	    return this.a = 1;
	  }

	  assert.ok(create(new F()) instanceof F);
	  assert.ok(F.prototype === getPrototypeOf(getPrototypeOf(create(new F()))));
	  assert.ok(create(new F()).a === 1);
	  assert.ok(create({}, {
	    a: {
	      value: 42
	    }
	  }).a === 42);
	  object = create(null, {
	    w: {
	      value: 2
	    }
	  });
	  assert.same(object, Object(object));
	  assert.ok(!('toString' in object));
	  assert.ok(object.w === 2);
	  assert.deepEqual(getPropertyNames(create(null)), []);
	});
	QUnit.test('Object.create.sham flag', function (assert) {
	  assert.same(Object.create.sham, DESCRIPTORS ? undefined : true);
	});

	QUnit.test('Object.defineProperties', function (assert) {
	  var defineProperties = Object.defineProperties;
	  assert.isFunction(defineProperties);
	  assert.arity(defineProperties, 2);
	  assert.name(defineProperties, 'defineProperties');
	  assert.looksNative(defineProperties);
	  assert.nonEnumerable(Object, 'defineProperties');
	  var source = {};
	  var result = defineProperties(source, {
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
	QUnit.test('Object.defineProperties.sham flag', function (assert) {
	  assert.same($inject_Object_defineProperties.sham, DESCRIPTORS ? undefined : true);
	});

	QUnit.test('Object.defineProperty', function (assert) {
	  var defineProperty = Object.defineProperty,
	      create = Object.create;
	  assert.isFunction(defineProperty);
	  assert.arity(defineProperty, 3);
	  assert.name(defineProperty, 'defineProperty');
	  assert.looksNative(defineProperty);
	  assert.nonEnumerable(Object, 'defineProperty');
	  var source = {};
	  var result = defineProperty(source, 'q', {
	    value: 42
	  });
	  assert.same(result, source);
	  assert.same(result.q, 42);
	  assert["throws"](function () {
	    return defineProperty(42, 1, {});
	  });
	  assert["throws"](function () {
	    return defineProperty({}, create(null), {});
	  });
	  assert["throws"](function () {
	    return defineProperty({}, 1, 1);
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

	var Set$1 = window.Set;

	function createMap() {
		function Map() {
			var arr = arguments[0];
			this.size = 0;
			this.head = null;
			this.tail = null;
			if(arr) {
				var entries = arr['@@iterator'];
				if(entries) {
					var it = entries.call(arr);
					while(true) {
						var next = it.next();
						if(next.done) break;
						try {
							this.set(next.value[0], next.value[1]);
						} catch(e) {
							if(it.return) {
								try {
									it.return();
								} catch(e) { }
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
		Map.prototype.forEach = forEach$1;
		Map.prototype.entries = entries;
		Map.prototype.keys = keys$2;
		Map.prototype.values = values;
		Map.prototype['@@iterator'] = entries;
		return Map;
	}function has(key) {
		if(this.size === 0) {
			return false;
		}
		var item = this.head;
		do {
			if(item.key === key || isNaN$1(key) && isNaN$1(item.key)) {
				return true;
			}
			item = item.next;
		} while(item);
		return false;
	}function get(key) {
		if(this.size === 0) {
			return undefined;
		}
		var item = this.head;
		do {
			if(item.key === key || isNaN$1(key) && isNaN$1(item.key)) {
				return item.value;
			}
			item = item.next;
		} while(item);
		return undefined;
	}function set(key, value) {
		if(key === 0) {
			//-0 -> 0
			key = 0;
		}
		if(this.size === 0) {
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
		do {
			if(item.key === key || isNaN$1(key) && isNaN$1(item.key)) {
				item.value = value;
				return this;
			}
			item = item.next;
		} while(item);
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
	}function remove(key) {
		if(this.size === 0) {
			return false;
		}
		var item = this.head;
		do {
			if(item.key === key || isNaN$1(key) && isNaN$1(item.key)) {
				var prev = item.prev;
				var next = item.next;
				if(prev) {
					prev.next = next;
				} else {
					this.head = next;
				}
				if(next) {
					next.prev = prev;
				} else {
					this.tail = prev;
				}
				item.exist = false;
				this.size--;
				return true;
			}
			item = item.next;
		} while(item);
		return false;
	}function clear() {
		this.size = 0;
		this.head = null;
		this.tail = null;
	}function forEach$1(callbackfn) {
		var thisArg = arguments[1];
		var item = this.head;
		do {
			callbackfn.call(thisArg, item.value, item.key, this);
			var next = item.next;
			if(item.exist || next && next.exist) {
				item = next;
			} else {
				while(true) {
					item = item.prev;
					if(item) {
						if(item.exist) {
							item = item.next;
							break;
						}
					} else {
						item = this.head;
						break;
					}
				}
			}
		} while(item);
	}
	function createIterable(that, getValue) {
		var done = false;
		var current;
		var it = {
			next: function() {
				var value;
				if(done) {
					return { done: done, value: value };
				}
				if(!current) {
					current = that.head;
				} else {
					var next = current.next;
					if(current.exist || next && next.exist) {
						current = next;
					} else {
						while(true) {
							current = current.prev;
							if(current) {
								if(current.exist) {
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
				if(current) {
					done = false;
					value = getValue(current);
				} else {
					done = true;
				}
				return { done: done, value: value };
			}
		};
		it['@@iterator'] = function() {
			return createIterable(that, getValue);
		};
		return it;
	}
	function getKeyValue(item) {
		return [item.key, item.value];
	}
	function entries() {
		return createIterable(this, getKeyValue);
	}function getKey(item) {
		return item.key;
	}
	function keys$2() {
		return createIterable(this, getKey);
	}function getValue(item) {
		return item.value;
	}
	function values() {
		return createIterable(this, getValue);
	}

	function createSet() {
		function Set() {
			var arr = arguments[0];
			this.size = 0;
			this.head = null;
			this.tail = null;
			if(arr) {
				var entries = arr['@@iterator'];
				if(entries) {
					var it = entries.call(arr);
					while(true) {
						var next = it.next();
						if(next.done) break;
						try {
							this.add(next.value);
						} catch(e) {
							if(it.return) {
								try {
									it.return();
								} catch(e) { }
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
		Set.prototype.forEach = forEach$1;
		Set.prototype.entries = entries;
		Set.prototype.values = values;
		Set.prototype.keys = values;
		Set.prototype['@@iterator'] = values;
		return Set;
	}function add(value) {
		if(value === 0) {
			//-0 -> 0
			value = 0;
		}
		set.call(this, value, value);
		return this;
	}

	if(!Set$1) {
		window.Set = createSet();
	}

	QUnit.test('Object.fromEntries', function (assert) {
	  var fromEntries = Object.fromEntries;
	  assert.isFunction(fromEntries);
	  assert.arity(fromEntries, 1);
	  assert.name(fromEntries, 'fromEntries');
	  assert.looksNative(fromEntries);
	  assert.nonEnumerable(Object, 'fromEntries');
	  assert.ok(fromEntries([]) instanceof Object);
	  assert.same(fromEntries([['foo', 1]]).foo, 1);
	  assert.same(fromEntries(createIterable$1([['bar', 2]])).bar, 2);

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
	  var object = fromEntries(units.entries());
	  assert.same(object.unit101.id, 101);
	  assert.same(object.unit102.id, 102);
	  assert.same(object.unit103.id, 103);
	});

	QUnit.test('Object.getOwnPropertyDescriptor', function (assert) {
	  var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
	  assert.isFunction(getOwnPropertyDescriptor);
	  assert.arity(getOwnPropertyDescriptor, 2);
	  assert.name(getOwnPropertyDescriptor, 'getOwnPropertyDescriptor');
	  assert.looksNative(getOwnPropertyDescriptor);
	  assert.nonEnumerable(Object, 'getOwnPropertyDescriptor');
	  assert.deepEqual(getOwnPropertyDescriptor({
	    q: 42
	  }, 'q'), {
	    writable: true,
	    enumerable: true,
	    configurable: true,
	    value: 42
	  });
	  assert.ok(getOwnPropertyDescriptor({}, 'toString') === undefined);
	  var primitives = [42, 'foo', false];

	  var _loop = function _loop() {
	    var value = _primitives[_i];
	    assert.notThrows(function () {
	      return getOwnPropertyDescriptor(value) || true;
	    }, "accept " + typeof value + " (\u4E0D\u652F\u6301)");
	  };

	  for (var _i = 0, _primitives = primitives; _i < _primitives.length; _i++) {
	    _loop();
	  }

	  assert["throws"](function () {
	    return getOwnPropertyDescriptor(null);
	  }, TypeError, 'throws on null');
	  assert["throws"](function () {
	    return getOwnPropertyDescriptor(undefined);
	  }, TypeError, 'throws on undefined');
	});
	QUnit.test('Object.getOwnPropertyDescriptor.sham flag', function (assert) {
	  assert.same(Object.getOwnPropertyDescriptor.sham, DESCRIPTORS ? undefined : true);
	});

	var indexOf = Array.prototype.indexOf || indexOf$1;

	function getOwnPropertyDescriptors(obj) {
		var o = {};
		var keys = [];
		for(var key in obj) {
			if(key.substring(0, 8) === "@@desc:") {
				if(Object.prototype.hasOwnProperty.call(obj, key)) {
					var prop = key.substring(7);
					o[prop] = obj[key];
					keys.push(prop);
				}
			}
		}
		var ks = keys$4(obj);
		var i = ks.length;
		while(i-- > 0) {
			var k = ks[i];
			if(indexOf.call(keys, k) < 0) {
				var desc = new Object();
				desc.value = obj[k];
				desc.writable = true;
				desc.enumerable = true;
				desc.configurable = true;
				o[k] = desc;
			}
		}
		return o;
	}

	if(!Object$1.getOwnPropertyDescriptors) {
		if(!Object$1.prototype.__defineSetter__) {
			Object$1.getOwnPropertyDescriptors = getOwnPropertyDescriptors;
		}
	}

	QUnit.test('Object.getOwnPropertyDescriptors', function (assert) {
	  var create = Object.create,
	      getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors;
	  assert.isFunction(getOwnPropertyDescriptors);
	  assert.arity(getOwnPropertyDescriptors, 1);
	  assert.name(getOwnPropertyDescriptors, 'getOwnPropertyDescriptors');
	  assert.looksNative(getOwnPropertyDescriptors);
	  assert.nonEnumerable(Object, 'getOwnPropertyDescriptors');
	  var object = create({
	    q: 1
	  }, {
	    e: {
	      value: 3
	    }
	  });
	  object.w = 2;
	  var symbol = Symbol('4');
	  object[symbol] = 4;
	  var descriptors = getOwnPropertyDescriptors(object);
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
	  var getOwnPropertyNames = Object.getOwnPropertyNames;
	  assert.isFunction(getOwnPropertyNames);
	  assert.arity(getOwnPropertyNames, 1);
	  assert.name(getOwnPropertyNames, 'getOwnPropertyNames');
	  assert.looksNative(getOwnPropertyNames);
	  assert.nonEnumerable(Object, 'getOwnPropertyNames');

	  function F1() {
	    this.w = 1;
	  }

	  function F2() {
	    this.toString = 1;
	  }

	  F1.prototype.q = F2.prototype.q = 1;
	  var names = getOwnPropertyNames([1, 2, 3]);
	  assert.strictEqual(names.length, 4);
	  assert.ok(includes$2(names, '0'));
	  assert.ok(includes$2(names, '1'));
	  assert.ok(includes$2(names, '2'));
	  assert.ok(includes$2(names, 'length'));
	  assert.deepEqual(getOwnPropertyNames(new F1()), ['w']);
	  assert.deepEqual(getOwnPropertyNames(new F2()), ['toString']);
	  assert.ok(includes$2(getOwnPropertyNames(Array.prototype), 'toString'));
	  assert.ok(includes$2(getOwnPropertyNames(Object.prototype), 'toString'));
	  assert.ok(includes$2(getOwnPropertyNames(Object.prototype), 'constructor'));
	  var primitives = [42, 'foo', false];

	  var _loop = function _loop() {
	    var value = _primitives[_i];
	    assert.notThrows(function () {
	      return getOwnPropertyNames(value);
	    }, "accept " + typeof value + " \u4E0D\u652F\u6301");
	  };

	  for (var _i = 0, _primitives = primitives; _i < _primitives.length; _i++) {
	    _loop();
	  }

	  assert["throws"](function () {
	  }, TypeError, 'throws on null');
	  assert["throws"](function () {
	  }, TypeError, 'throws on undefined');

	  if (GLOBAL.document) {
	    assert.notThrows(function () {
	      var iframe = document.createElement('iframe');
	      iframe.src = 'http://example.com';
	      document.documentElement.appendChild(iframe);
	      var window = iframe.contentWindow;
	      document.documentElement.removeChild(iframe);
	      return getOwnPropertyNames(window);
	    }, 'IE11 bug with iframe and window');
	  }
	});

	if(!Object$1.getPrototypeOf) {
		Object$1.getPrototypeOf = getPrototypeOf;
	}

	QUnit.test('Object.getPrototypeOf', function (assert) {
	  var create = Object.create,
	      getPrototypeOf = Object.getPrototypeOf;
	  assert.isFunction(getPrototypeOf);
	  assert.arity(getPrototypeOf, 1);
	  assert.name(getPrototypeOf, 'getPrototypeOf');
	  assert.looksNative(getPrototypeOf);
	  assert.nonEnumerable(Object, 'getPrototypeOf');
	  assert.ok(getPrototypeOf({}) === Object.prototype);
	  assert.ok(getPrototypeOf([]) === Array.prototype);

	  function F() {
	    /* empty */
	  }

	  assert.ok(getPrototypeOf(new F()) === F.prototype);
	  var object = {
	    q: 1
	  };
	  assert.ok(getPrototypeOf(create(object)) === object);
	  assert.ok(getPrototypeOf(create(null)) === null);
	  assert.ok(getPrototypeOf(getPrototypeOf({})) === null);

	  function Foo() {
	    /* empty */
	  }

	  Foo.prototype.foo = 'foo';

	  function Bar() {
	    /* empty */
	  }

	  Bar.prototype = create(Foo.prototype);
	  Bar.prototype.constructor = Bar;
	  assert.strictEqual(getPrototypeOf(Bar.prototype).foo, 'foo');
	  var primitives = [42, 'foo', false];

	  var _loop = function _loop() {
	    var value = _primitives[_i];
	    assert.notThrows(function () {
	      return getPrototypeOf(value);
	    }, "accept " + typeof value + " \u4E0D\u652F\u6301");
	  };

	  for (var _i = 0, _primitives = primitives; _i < _primitives.length; _i++) {
	    _loop();
	  }

	  assert["throws"](function () {
	    return getPrototypeOf(null);
	  }, TypeError, 'throws on null');
	  assert["throws"](function () {
	    return getPrototypeOf(undefined);
	  }, TypeError, 'throws on undefined');
	  assert.strictEqual(getPrototypeOf(Object('foo')), String.prototype);
	});
	QUnit.test('Object.getPrototypeOf.sham flag', function (assert) {
	  assert.same(Object.getPrototypeOf.sham, CORRECT_PROTOTYPE_GETTER ? undefined : true);
	});

	QUnit.test('Object.is', function (assert) {
	  var is = Object.is;
	  assert.isFunction(is);
	  assert.arity(is, 2);
	  assert.name(is, 'is');
	  assert.looksNative(is);
	  assert.nonEnumerable(Object, 'is');
	  assert.ok(is(1, 1), '1 is 1');
	  assert.ok(is(NaN, NaN), '1 is 1');
	  assert.ok(!is(0, -0), '0 isnt -0');
	  assert.ok(!is({}, {}), '{} isnt {}');
	});

	QUnit.test('Object.keys', function (assert) {
	  var keys = Object.keys;
	  assert.isFunction(keys);
	  assert.arity(keys, 1);
	  assert.name(keys, 'keys');
	  assert.looksNative(keys);
	  assert.nonEnumerable(Object, 'keys');

	  function F1() {
	    this.w = 1;
	  }

	  function F2() {
	    this.toString = 1;
	  }

	  F1.prototype.q = F2.prototype.q = 1;
	  assert.deepEqual(keys([1, 2, 3]), ['0', '1', '2']);
	  assert.deepEqual(keys(new F1()), ['w']);
	  assert.deepEqual(keys(new F2()), ['toString']);
	  assert.ok(!includes$2(keys(Array.prototype), 'push'));
	  var primitives = [42, 'foo', false];

	  var _loop = function _loop() {
	    var value = _primitives[_i];
	    assert.notThrows(function () {
	      return keys(value);
	    }, "accept " + typeof value + " \u4E0D\u652F\u6301");
	  };

	  for (var _i = 0, _primitives = primitives; _i < _primitives.length; _i++) {
	    _loop();
	  }

	  assert["throws"](function () {
	    return keys(null);
	  }, TypeError, 'throws on null');
	  assert["throws"](function () {
	    return keys(undefined);
	  }, TypeError, 'throws on undefined');
	});

	if (PROTO) QUnit.test('Object.setPrototypeOf', function (assert) {
	  var setPrototypeOf = Object.setPrototypeOf;
	  assert.isFunction(setPrototypeOf);
	  assert.arity(setPrototypeOf, 2);
	  assert.name(setPrototypeOf, 'setPrototypeOf');
	  assert.looksNative(setPrototypeOf);
	  assert.nonEnumerable(Object, 'setPrototypeOf');
	  assert.ok('apply' in setPrototypeOf({}, Function.prototype), 'Parent properties in target');
	  assert.strictEqual(setPrototypeOf({
	    a: 2
	  }, {
	    b: function b() {
	      return Math.pow(this.a, 2);
	    }
	  }).b(), 4, 'Child and parent properties in target');
	  var object = {};
	  assert.strictEqual(setPrototypeOf(object, {
	    a: 1
	  }), object, 'setPrototypeOf return target');
	  assert.ok(!('toString' in setPrototypeOf({}, null)), 'Can set null as prototype');
	});

	QUnit.test('Object.values', function (assert) {
	  var values = Object.values,
	      create = Object.create,
	      assign = Object.assign;
	  assert.isFunction(values);
	  assert.arity(values, 1);
	  assert.name(values, 'values');
	  assert.looksNative(values);
	  assert.nonEnumerable(Object, 'values');
	  assert.deepEqual(values({
	    q: 1,
	    w: 2,
	    e: 3
	  }), [1, 2, 3]);
	  assert.deepEqual(values(new String('qwe')), ['q', 'w', 'e']);
	  assert.deepEqual(values(assign(create({
	    q: 1,
	    w: 2,
	    e: 3
	  }), {
	    a: 4,
	    s: 5,
	    d: 6
	  })), [4, 5, 6]);
	  assert.deepEqual(values({
	    valueOf: 42
	  }), [42], 'IE enum keys bug');

	  try {
	    assert.deepEqual(Function('values', "\n      return values({ a: 1, get b() {\n        delete this.c;\n        return 2;\n      }, c: 3 });\n    ")(values), [1, 2]);
	  } catch (_unused) {
	    /* empty */
	  }

	  try {
	    assert.deepEqual(Function('values', "\n      return values({ a: 1, get b() {\n        Object.defineProperty(this, \"c\", {\n          value: 4,\n          enumerable: false\n        });\n        return 2;\n      }, c: 3 });\n    ")(values), [1, 2]);
	  } catch (_unused2) {
	    /* empty */
	  }
	});

	if(typeof globalThis==="undefined"){
		window.globalThis=window;
	}

	QUnit.test('globalThis', function (assert) {
	  assert.same(globalThis, Object(globalThis), 'is object');
	  assert.same(globalThis.Math, Math, 'contains globals');
	});

	if(!Function.prototype.bind) {
		Function.prototype.bind = function(context) {
			var self = this, args = Array.prototype.slice.call(arguments, 1);
			return function() {
				return self.apply(context, args.concat(Array.prototype.slice.call(arguments)));
			};
		};
	}

	QUnit.test('Function#bind', function (assert) {
	  var bind = Function.prototype.bind;
	  assert.isFunction(bind);
	  assert.arity(bind, 1);
	  assert.name(bind, 'bind');
	  assert.looksNative(bind);
	  assert.nonEnumerable(Function.prototype, 'bind');
	  assert.same(function () {
	    return this.a;
	  }.bind({
	    a: 42
	  })(), 42);
	  assert.same(new function () {
	    /* empty */
	  }().a, undefined);

	  function A(a, b) {
	    this.a = a;
	    this.b = b;
	  }

	  var instance = new (A.bind(null, 1))(2);
	  assert.ok(instance instanceof A);
	  assert.strictEqual(instance.a, 1);
	  assert.strictEqual(instance.b, 2);
	  assert.same(function (it) {
	    return it;
	  }.bind(null, 42)(), 42);
	  var regExpTest = RegExp.prototype.test.bind(/a/);
	  assert.ok(regExpTest('a'));
	  var Date2017 = Date.bind(null, 2017);
	  var date = new Date2017(11);
	  assert.ok(date instanceof Date);
	  assert.strictEqual(date.getFullYear(), 2017);
	  assert.strictEqual(date.getMonth(), 11);
	});

	if (DESCRIPTORS) {
	  QUnit.test('Function#name', function (assert) {
	    assert.ok('name' in Function.prototype);
	    assert.nonEnumerable(Function.prototype, 'name');

	    function foo() {
	      /* empty */
	    }

	    assert.same(foo.name, 'foo');
	    assert.same(function () {
	      /* empty */
	    }.name, '');

	    if (Object.freeze) {
	      assert.same(Object.freeze(function () {
	        /* empty */
	      }).name, '');
	    }

	    function bar() {
	      /* empty */
	    }

	    bar.toString = function () {
	      throw new Error();
	    };

	    assert.notThrows(function () {
	      return bar.name === 'bar';
	    }, 'works with redefined `.toString`');
	    var baz = Object(function () {
	      /* empty */
	    });

	    baz.toString = function () {
	      return '';
	    };

	    assert.same(baz.name, '');
	  });
	}

	QUnit.test('Function#@@hasInstance', function (assert) {
	  assert.ok(Symbol.hasInstance in Function.prototype);
	  assert.nonEnumerable(Function.prototype, Symbol.hasInstance);
	  assert.ok(Function[Symbol.hasInstance](function () {
	    /* empty */
	  }));
	  assert.ok(!Function[Symbol.hasInstance]({}));
	});

	QUnit.test('Date#toJSON', function (assert) {
	  var toJSON = Date.prototype.toJSON;
	  assert.isFunction(toJSON);
	  assert.arity(toJSON, 1);
	  assert.name(toJSON, 'toJSON');
	  assert.looksNative(toJSON);
	  assert.nonEnumerable(Date.prototype, 'toJSON');
	  var date = new Date();
	  assert.same(date.toJSON(), date.toISOString(), 'base');
	  assert.same(new Date(NaN).toJSON(), null, 'not finite');
	  assert.same(toJSON.call({
	    toISOString: function toISOString() {
	      return 42;
	    }
	  }), 42, 'generic');
	});

	QUnit.test('Date#toISOString', function (assert) {
	  var toISOString = Date.prototype.toISOString;
	  assert.isFunction(toISOString);
	  assert.arity(toISOString, 0);
	  assert.name(toISOString, 'toISOString');
	  assert.looksNative(toISOString);
	  assert.nonEnumerable(Date.prototype, 'toISOString');
	  assert.strictEqual(new Date(0).toISOString(), '1970-01-01T00:00:00.000Z');
	  assert.strictEqual(new Date(1e12 + 1).toISOString(), '2001-09-09T01:46:40.001Z');
	  assert.strictEqual(new Date(-5e13 - 1).toISOString(), '0385-07-25T07:06:39.999Z');
	  var future = new Date(1e15 + 1).toISOString();
	  assert.ok(future === '+033658-09-27T01:46:40.001Z' || future === '33658-09-27T01:46:40.001Z');
	  var prehistoric = new Date(-1e15 + 1).toISOString();
	  assert.ok(prehistoric === '-029719-04-05T22:13:20.001Z' || prehistoric === '-29719-04-05T22:13:20.001Z');
	  assert["throws"](function () {
	    return new Date(NaN).toISOString();
	  }, RangeError);
	});

	QUnit.test('Date#toString', function (assert) {
	  var toString = Date.prototype.toString;
	  assert.isFunction(toString);
	  assert.arity(toString, 0);
	  assert.name(toString, 'toString');
	  assert.looksNative(toString);
	  assert.nonEnumerable(Date.prototype, 'toString');
	  assert.same(String(new Date(NaN)), 'Invalid Date');
	});

	QUnit.test('Number.EPSILON', function (assert) {
	  var EPSILON = Number.EPSILON;
	  assert.ok('EPSILON' in Number, 'EPSILON in Number');
	  assert.nonEnumerable(Number, 'EPSILON');
	  assert.strictEqual(EPSILON, Math.pow(2, -52), 'Is 2^-52');
	  assert.ok(1 !== 1 + EPSILON, '1 isnt 1 + EPSILON');
	  assert.strictEqual(1, 1 + EPSILON / 2, '1 is 1 + EPSILON / 2');
	});

	QUnit.test('Number.isFinite', function (assert) {
	  var isFinite = Number.isFinite;
	  var create = Object.create;
	  assert.isFunction(isFinite);
	  assert.name(isFinite, 'isFinite');
	  assert.arity(isFinite, 1);
	  assert.looksNative(isFinite);
	  assert.nonEnumerable(Number, 'isFinite');
	  var finite = [1, 0.1, -1, Math.pow(2, 16), Math.pow(2, 16) - 1, Math.pow(2, 31), Math.pow(2, 31) - 1, Math.pow(2, 32), Math.pow(2, 32) - 1, -0];

	  for (var _i = 0, _finite = finite; _i < _finite.length; _i++) {
	    var value = _finite[_i];
	    assert.ok(isFinite(value), "isFinite " + typeof value + " " + value);
	  }

	  var notFinite = [NaN, Infinity, 'NaN', '5', false, new Number(NaN), new Number(Infinity), new Number(5), new Number(0.1), undefined, null, {}, function () {
	    /* empty */
	  }];

	  for (var _i2 = 0, _notFinite = notFinite; _i2 < _notFinite.length; _i2++) {
	    var _value = _notFinite[_i2];
	    assert.ok(!isFinite(_value), "not isFinite " + typeof _value + " " + _value);
	  }

	  assert.ok(!isFinite(create(null)), 'Number.isFinite(Object.create(null)) -> false');
	});

	QUnit.test('Number.isInteger', function (assert) {
	  var isInteger = Number.isInteger;
	  var create = Object.create;
	  assert.isFunction(isInteger);
	  assert.name(isInteger, 'isInteger');
	  assert.arity(isInteger, 1);
	  assert.looksNative(isInteger);
	  assert.nonEnumerable(Number, 'isInteger');
	  var integers = [1, -1, Math.pow(2, 16), Math.pow(2, 16) - 1, Math.pow(2, 31), Math.pow(2, 31) - 1, Math.pow(2, 32), Math.pow(2, 32) - 1, -0];

	  for (var _i = 0, _integers = integers; _i < _integers.length; _i++) {
	    var value = _integers[_i];
	    assert.ok(isInteger(value), "isInteger " + typeof value + " " + value);
	  }

	  var notIntegers = [NaN, 0.1, Infinity, 'NaN', '5', false, new Number(NaN), new Number(Infinity), new Number(5), new Number(0.1), undefined, null, {}, function () {
	    /* empty */
	  }];

	  for (var _i2 = 0, _notIntegers = notIntegers; _i2 < _notIntegers.length; _i2++) {
	    var _value = _notIntegers[_i2];
	    assert.ok(!isInteger(_value), "not isInteger " + typeof _value + " " + _value);
	  }

	  assert.ok(!isInteger(create(null)), 'Number.isInteger(Object.create(null)) -> false');
	});

	QUnit.test('Number.isNaN', function (assert) {
	  var isNaN = Number.isNaN;
	  var create = Object.create;
	  assert.isFunction(isNaN);
	  assert.name(isNaN, 'isNaN');
	  assert.arity(isNaN, 1);
	  assert.looksNative(isNaN);
	  assert.nonEnumerable(Number, 'isNaN');
	  assert.ok(isNaN(NaN), 'Number.isNaN NaN');
	  var notNaNs = [1, 0.1, -1, Math.pow(2, 16), Math.pow(2, 16) - 1, Math.pow(2, 31), Math.pow(2, 31) - 1, Math.pow(2, 32), Math.pow(2, 32) - 1, -0, Infinity, 'NaN', '5', false, new Number(NaN), new Number(Infinity), new Number(5), new Number(0.1), undefined, null, {}, function () {
	    /* empty */
	  }];

	  for (var _i = 0, _notNaNs = notNaNs; _i < _notNaNs.length; _i++) {
	    var value = _notNaNs[_i];
	    assert.ok(!isNaN(value), "not Number.isNaN " + typeof value + " " + value);
	  }

	  assert.ok(!isNaN(create(null)), 'Number.isNaN(Object.create(null)) -> false');
	});

	QUnit.test('Number.isSafeInteger', function (assert) {
	  var isSafeInteger = Number.isSafeInteger;
	  var create = Object.create;
	  assert.isFunction(isSafeInteger);
	  assert.name(isSafeInteger, 'isSafeInteger');
	  assert.arity(isSafeInteger, 1);
	  assert.looksNative(isSafeInteger);
	  assert.nonEnumerable(Number, 'isSafeInteger');
	  var safeIntegers = [1, -1, Math.pow(2, 16), Math.pow(2, 16) - 1, Math.pow(2, 31), Math.pow(2, 31) - 1, Math.pow(2, 32), Math.pow(2, 32) - 1, -0, 9007199254740991, -9007199254740991];

	  for (var _i = 0, _safeIntegers = safeIntegers; _i < _safeIntegers.length; _i++) {
	    var value = _safeIntegers[_i];
	    assert.ok(isSafeInteger(value), "isSafeInteger " + typeof value + " " + value);
	  }

	  var notSafeIntegers = [9007199254740992, -9007199254740992, NaN, 0.1, Infinity, 'NaN', '5', false, new Number(NaN), new Number(Infinity), new Number(5), new Number(0.1), undefined, null, {}, function () {
	    /* empty */
	  }];

	  for (var _i2 = 0, _notSafeIntegers = notSafeIntegers; _i2 < _notSafeIntegers.length; _i2++) {
	    var _value = _notSafeIntegers[_i2];
	    assert.ok(!isSafeInteger(_value), "not isSafeInteger " + typeof _value + " " + _value);
	  }

	  assert.ok(!isSafeInteger(create(null)), 'Number.isSafeInteger(Object.create(null)) -> false');
	});

	QUnit.test('Number.MAX_SAFE_INTEGER', function (assert) {
	  assert.ok('MAX_SAFE_INTEGER' in Number);
	  assert.nonEnumerable(Number, 'MAX_SAFE_INTEGER');
	  assert.strictEqual(Number.MAX_SAFE_INTEGER, Math.pow(2, 53) - 1, 'Is 2^53 - 1');
	});

	if(!('MIN_SAFE_INTEGER' in Number$1)) {
		Number$1.MIN_SAFE_INTEGER = -0x1FFFFFFFFFFFFF;
	}

	QUnit.test('Number.MIN_SAFE_INTEGER', function (assert) {
	  assert.ok('MIN_SAFE_INTEGER' in Number);
	  assert.nonEnumerable(Number, 'MIN_SAFE_INTEGER');
	  assert.strictEqual(Number.MIN_SAFE_INTEGER, -Math.pow(2, 53) + 1, 'Is -2^53 + 1');
	});

	QUnit.test('Number.parseFloat', function (assert) {
	  var parseFloat = Number.parseFloat;
	  assert.isFunction(parseFloat);
	  assert.name(parseFloat, 'parseFloat');
	  assert.arity(parseFloat, 1);
	  assert.looksNative(parseFloat);
	  assert.nonEnumerable(Number, 'parseFloat');
	  assert.same(parseFloat, GLOBAL.parseFloat);
	  assert.same(parseFloat('0'), 0);
	  assert.same(parseFloat(' 0'), 0);
	  assert.same(parseFloat('+0'), 0);
	  assert.same(parseFloat(' +0'), 0);
	  assert.same(parseFloat('-0'), -0);
	  assert.same(parseFloat(' -0'), -0);
	  assert.same(parseFloat(WHITESPACES + "+0"), 0);
	  assert.same(parseFloat(WHITESPACES + "-0"), -0);
	  assert.same(parseFloat(null), NaN);
	  assert.same(parseFloat(undefined), NaN);
	});

	QUnit.test('Number.parseInt', function (assert) {
	  var parseInt = Number.parseInt;
	  assert.isFunction(parseInt);
	  assert.name(parseInt, 'parseInt');
	  assert.arity(parseInt, 2);
	  assert.looksNative(parseInt);
	  assert.nonEnumerable(Number, 'parseInt');
	  assert.same(parseInt, GLOBAL.parseInt);

	  for (var radix = 2; radix <= 36; ++radix) {
	    assert.same(parseInt('10', radix), radix, "radix " + radix);
	  }

	  var strings = ['01', '08', '10', '42'];

	  for (var _i = 0, _strings = strings; _i < _strings.length; _i++) {
	    var string = _strings[_i];
	    assert.same(parseInt(string), parseInt(string, 10), "default radix is 10: " + string);
	  }

	  assert.same(parseInt('0x16'), parseInt('0x16', 16), 'default radix is 16: 0x16');
	  assert.same(parseInt('  0x16'), parseInt('0x16', 16), 'ignores leading whitespace #1');
	  assert.same(parseInt('  42'), parseInt('42', 10), 'ignores leading whitespace #2');
	  assert.same(parseInt('  08'), parseInt('08', 10), 'ignores leading whitespace #3');
	  assert.same(parseInt(WHITESPACES + "08"), parseInt('08', 10), 'ignores leading whitespace #4');
	  assert.same(parseInt(WHITESPACES + "0x16"), parseInt('0x16', 16), 'ignores leading whitespace #5');
	  var fakeZero = {
	    valueOf: function valueOf() {
	      return 0;
	    }
	  };
	  assert.same(parseInt('08', fakeZero), parseInt('08', 10), 'valueOf #1');
	  assert.same(parseInt('0x16', fakeZero), parseInt('0x16', 16), 'valueOf #2');
	  assert.same(parseInt('-0xF'), -15, 'signed hex #1');
	  assert.same(parseInt('-0xF', 16), -15, 'signed hex #2');
	  assert.same(parseInt('+0xF'), 15, 'signed hex #3');
	  assert.same(parseInt('+0xF', 16), 15, 'signed hex #4');
	  assert.same(parseInt('10', -4294967294), 2, 'radix uses ToUint32');
	  assert.same(parseInt(null), NaN);
	  assert.same(parseInt(undefined), NaN);
	});

	QUnit.test('Number#toFixed', function (assert) {
	  var toFixed = Number.prototype.toFixed;
	  assert.isFunction(toFixed);
	  assert.name(toFixed, 'toFixed');
	  assert.arity(toFixed, 1);
	  assert.looksNative(toFixed);
	  assert.nonEnumerable(Number.prototype, 'toFixed');
	  assert.same(0.00008.toFixed(3), '0.000');
	  assert.same(0.9.toFixed(0), '1');
	  assert.same(1.255.toFixed(2), '1.25');
	  assert.same(1843654265.0774949.toFixed(5), '1843654265.07749');
	  assert.same(1000000000000000128.0.toFixed(0), '1000000000000000128');
	  assert.same(toFixed.call(1), '1');
	  assert.same(toFixed.call(1, 0), '1');
	  assert.same(toFixed.call(1, 1), '1.0');
	  assert.same(toFixed.call(1, 1.1), '1.0');
	  assert.same(toFixed.call(1, 0.9), '1');
	  assert.same(toFixed.call(1, '0'), '1');
	  assert.same(toFixed.call(1, '1'), '1.0');
	  assert.same(toFixed.call(1, '1.1'), '1.0');
	  assert.same(toFixed.call(1, '0.9'), '1');
	  assert.same(toFixed.call(1, NaN), '1');
	  assert.same(toFixed.call(1, 'some string'), '1');
	  assert.notThrows(function () {
	    return toFixed.call(1, -0.1) === '1';
	  });
	  assert.same(new Number(1).toFixed(), '1');
	  assert.same(new Number(1).toFixed(0), '1');
	  assert.same(new Number(1).toFixed(1), '1.0');
	  assert.same(new Number(1).toFixed(1.1), '1.0');
	  assert.same(new Number(1).toFixed(0.9), '1');
	  assert.same(new Number(1).toFixed('0'), '1');
	  assert.same(new Number(1).toFixed('1'), '1.0');
	  assert.same(new Number(1).toFixed('1.1'), '1.0');
	  assert.same(new Number(1).toFixed('0.9'), '1');
	  assert.same(new Number(1).toFixed(NaN), '1');
	  assert.same(new Number(1).toFixed('some string'), '1');
	  assert.notThrows(function () {
	    return new Number(1).toFixed(-0.1) === '1';
	  });
	  assert.same(NaN.toFixed(), 'NaN');
	  assert.same(NaN.toFixed(0), 'NaN');
	  assert.same(NaN.toFixed(1), 'NaN');
	  assert.same(NaN.toFixed(1.1), 'NaN');
	  assert.same(NaN.toFixed(0.9), 'NaN');
	  assert.same(NaN.toFixed('0'), 'NaN');
	  assert.same(NaN.toFixed('1'), 'NaN');
	  assert.same(NaN.toFixed('1.1'), 'NaN');
	  assert.same(NaN.toFixed('0.9'), 'NaN');
	  assert.same(NaN.toFixed(NaN), 'NaN');
	  assert.same(NaN.toFixed('some string'), 'NaN');
	  assert.notThrows(function () {
	    return NaN.toFixed(-0.1) === 'NaN';
	  });
	  assert.same(new Number(1e21).toFixed(), String(1e21));
	  assert.same(new Number(1e21).toFixed(0), String(1e21));
	  assert.same(new Number(1e21).toFixed(1), String(1e21));
	  assert.same(new Number(1e21).toFixed(1.1), String(1e21));
	  assert.same(new Number(1e21).toFixed(0.9), String(1e21));
	  assert.same(new Number(1e21).toFixed('0'), String(1e21));
	  assert.same(new Number(1e21).toFixed('1'), String(1e21));
	  assert.same(new Number(1e21).toFixed('1.1'), String(1e21));
	  assert.same(new Number(1e21).toFixed('0.9'), String(1e21));
	  assert.same(new Number(1e21).toFixed(NaN), String(1e21));
	  assert.same(new Number(1e21).toFixed('some string'), String(1e21));
	  assert.notThrows(function () {
	    return new Number(1e21).toFixed(-0.1) === String(1e21);
	  });
	  assert["throws"](function () {
	    return 1.0.toFixed(-101);
	  }, RangeError, 'If f < 0 or f > 20, throw a RangeError exception.');
	  assert["throws"](function () {
	    return 1.0.toFixed(101);
	  }, RangeError, 'If f < 0 or f > 20, throw a RangeError exception.');
	  assert["throws"](function () {
	    return NaN.toFixed(Infinity);
	  }, RangeError, 'If f < 0 or f > 20, throw a RangeError exception.');
	  assert["throws"](function () {
	    return toFixed.call({}, 1);
	  }, TypeError, '? thisNumberValue(this value)');
	  assert["throws"](function () {
	    return toFixed.call('123', 1);
	  }, TypeError, '? thisNumberValue(this value)');
	  assert["throws"](function () {
	    return toFixed.call(false, 1);
	  }, TypeError, '? thisNumberValue(this value)');
	  assert["throws"](function () {
	    return toFixed.call(null, 1);
	  }, TypeError, '? thisNumberValue(this value)');
	  assert["throws"](function () {
	    return toFixed.call(undefined, 1);
	  }, TypeError, '? thisNumberValue(this value)');
	});

	QUnit.test('Number#toPrecision', function (assert) {
	  var toPrecision = Number.prototype.toPrecision;
	  assert.isFunction(toPrecision);
	  assert.name(toPrecision, 'toPrecision');
	  assert.arity(toPrecision, 1);
	  assert.looksNative(toPrecision);
	  assert.nonEnumerable(Number.prototype, 'toPrecision');
	  assert.same(0.00008.toPrecision(3), '0.0000800', '0.00008.toPrecision(3)');
	  assert.same(1.255.toPrecision(2), '1.3', '1.255.toPrecision(2)');
	  assert.same(1843654265.0774949.toPrecision(13), '1843654265.077', '1843654265.0774949.toPrecision(13)');
	  assert.same(NaN.toPrecision(1), 'NaN', 'If x is NaN, return the String "NaN".');
	  assert.same(123.456.toPrecision(), '123.456', 'If precision is undefined, return ! ToString(x).');
	  assert.same(123.456.toPrecision(undefined), '123.456', 'If precision is undefined, return ! ToString(x).');
	  assert["throws"](function () {
	    return 0.9.toPrecision(0);
	  }, RangeError, 'If p < 1 or p > 21, throw a RangeError exception.');
	  assert["throws"](function () {
	    return 0.9.toPrecision(101);
	  }, RangeError, 'If p < 1 or p > 21, throw a RangeError exception.');
	  assert["throws"](function () {
	    return toPrecision.call({}, 1);
	  }, TypeError, '? thisNumberValue(this value)');
	  assert["throws"](function () {
	    return toPrecision.call('123', 1);
	  }, TypeError, '? thisNumberValue(this value)');
	  assert["throws"](function () {
	    return toPrecision.call(false, 1);
	  }, TypeError, '? thisNumberValue(this value)');
	  assert["throws"](function () {
	    return toPrecision.call(null, 1);
	  }, TypeError, '? thisNumberValue(this value)');
	  assert["throws"](function () {
	    return toPrecision.call(undefined, 1);
	  }, TypeError, '? thisNumberValue(this value)');
	});

	if(Number$1.EPSILON === undefined) {
		Number$1.EPSILON = Math.pow(2, -52);
	}

	QUnit.test('Math.acosh', function (assert) {
	  var acosh = Math.acosh;
	  assert.isFunction(acosh);
	  assert.name(acosh, 'acosh');
	  assert.arity(acosh, 1);
	  assert.looksNative(acosh);
	  assert.nonEnumerable(Math, 'acosh');
	  assert.same(acosh(NaN), NaN);
	  assert.same(acosh(0.5), NaN);
	  assert.same(acosh(-1), NaN);
	  assert.same(acosh(-1e300), NaN);
	  assert.same(acosh(1), 0);
	  assert.strictEqual(acosh(Infinity), Infinity);
	  assert.epsilon(acosh(1234), 7.811163220849231);
	  assert.epsilon(acosh(8.88), 2.8737631531629235);
	  assert.epsilon(acosh(1e+160), 369.10676205960726);
	  assert.epsilon(acosh(Number.MAX_VALUE), 710.475860073944);
	  assert.epsilon(acosh(1 + Number.EPSILON), 2.1073424255447017e-8);
	});

	QUnit.test('Math.asinh', function (assert) {
	  var asinh = Math.asinh;
	  assert.isFunction(asinh);
	  assert.name(asinh, 'asinh');
	  assert.arity(asinh, 1);
	  assert.looksNative(asinh);
	  assert.nonEnumerable(Math, 'asinh');
	  assert.same(asinh(NaN), NaN);
	  assert.same(asinh(0), 0);
	  assert.same(asinh(-0), -0);
	  assert.strictEqual(asinh(Infinity), Infinity);
	  assert.strictEqual(asinh(-Infinity), -Infinity);
	  assert.epsilon(asinh(1234), 7.811163549201245);
	  assert.epsilon(asinh(9.99), 2.997227420191335);
	  assert.epsilon(asinh(1e150), 346.0809111296668);
	  assert.epsilon(asinh(1e7), 16.811242831518268);
	  assert.epsilon(asinh(-1e7), -16.811242831518268);
	});

	QUnit.test('Math.atanh', function (assert) {
	  var atanh = Math.atanh;
	  assert.isFunction(atanh);
	  assert.name(atanh, 'atanh');
	  assert.arity(atanh, 1);
	  assert.looksNative(atanh);
	  assert.nonEnumerable(Math, 'atanh');
	  assert.same(atanh(NaN), NaN);
	  assert.same(atanh(-2), NaN);
	  assert.same(atanh(-1.5), NaN);
	  assert.same(atanh(2), NaN);
	  assert.same(atanh(1.5), NaN);
	  assert.strictEqual(atanh(-1), -Infinity);
	  assert.strictEqual(atanh(1), Infinity);
	  assert.same(atanh(0), 0);
	  assert.same(atanh(-0), -0);
	  assert.same(atanh(-1e300), NaN);
	  assert.same(atanh(1e300), NaN);
	  assert.epsilon(atanh(0.5), 0.5493061443340549);
	  assert.epsilon(atanh(-0.5), -0.5493061443340549);
	  assert.epsilon(atanh(0.444), 0.47720201260109457);
	});

	QUnit.test('Math.cbrt', function (assert) {
	  var cbrt = Math.cbrt;
	  assert.isFunction(cbrt);
	  assert.name(cbrt, 'cbrt');
	  assert.arity(cbrt, 1);
	  assert.looksNative(cbrt);
	  assert.nonEnumerable(Math, 'cbrt');
	  assert.same(cbrt(NaN), NaN);
	  assert.same(cbrt(0), 0);
	  assert.same(cbrt(-0), -0);
	  assert.strictEqual(cbrt(Infinity), Infinity);
	  assert.strictEqual(cbrt(-Infinity), -Infinity);
	  assert.strictEqual(cbrt(-8), -2);
	  assert.strictEqual(cbrt(8), 2);
	  assert.epsilon(cbrt(-1000), -10);
	  assert.epsilon(cbrt(1000), 10);
	});

	QUnit.test('Math.clz32', function (assert) {
	  var clz32 = Math.clz32;
	  assert.isFunction(clz32);
	  assert.name(clz32, 'clz32');
	  assert.arity(clz32, 1);
	  assert.looksNative(clz32);
	  assert.nonEnumerable(Math, 'clz32');
	  assert.strictEqual(clz32(0), 32);
	  assert.strictEqual(clz32(1), 31);
	  assert.same(clz32(-1), 0);
	  assert.strictEqual(clz32(0.6), 32);
	  assert.same(clz32(Math.pow(2, 32) - 1), 0);
	  assert.strictEqual(clz32(Math.pow(2, 32)), 32);
	});

	QUnit.test('Math.cosh', function (assert) {
	  var cosh = Math.cosh;
	  assert.isFunction(cosh);
	  assert.name(cosh, 'cosh');
	  assert.arity(cosh, 1);
	  assert.looksNative(cosh);
	  assert.nonEnumerable(Math, 'cosh');
	  assert.same(cosh(NaN), NaN);
	  assert.strictEqual(cosh(0), 1);
	  assert.strictEqual(cosh(-0), 1);
	  assert.strictEqual(cosh(Infinity), Infinity);
	  assert.strictEqual(cosh(-Infinity), Infinity);
	  assert.epsilon(cosh(12), 81377.395712574, 1e-9);
	  assert.epsilon(cosh(22), 1792456423.065795780980053377, 1e-5);
	  assert.epsilon(cosh(-10), 11013.23292010332313972137);
	  assert.epsilon(cosh(-23), 4872401723.1244513000, 1e-5);
	  assert.epsilon(cosh(710), 1.1169973830808557e+308, 1e+295);
	});

	QUnit.test('Math.expm1', function (assert) {
	  var expm1 = Math.expm1;
	  assert.isFunction(expm1);
	  assert.name(expm1, 'expm1');
	  assert.arity(expm1, 1);
	  assert.looksNative(expm1);
	  assert.nonEnumerable(Math, 'expm1');
	  assert.same(expm1(NaN), NaN);
	  assert.same(expm1(0), 0);
	  assert.same(expm1(-0), -0);
	  assert.strictEqual(expm1(Infinity), Infinity);
	  assert.strictEqual(expm1(-Infinity), -1);
	  assert.epsilon(expm1(10), 22025.465794806718);
	  assert.epsilon(expm1(-10), -0.9999546000702375);
	});

	QUnit.test('Math.fround', function (assert) {
	  var fround = Math.fround;
	  assert.isFunction(fround);
	  assert.name(fround, 'fround');
	  assert.arity(fround, 1);
	  assert.looksNative(fround);
	  assert.nonEnumerable(Math, 'fround');
	  assert.same(fround(undefined), NaN);
	  assert.same(fround(NaN), NaN);
	  assert.same(fround(0), 0);
	  assert.same(fround(-0), -0);
	  assert.same(fround(Number.MIN_VALUE), 0);
	  assert.same(fround(-Number.MIN_VALUE), -0);
	  assert.strictEqual(fround(Infinity), Infinity);
	  assert.strictEqual(fround(-Infinity), -Infinity);
	  assert.strictEqual(fround(1.7976931348623157e+308), Infinity);
	  assert.strictEqual(fround(-1.7976931348623157e+308), -Infinity);
	  assert.strictEqual(fround(3.4028235677973366e+38), Infinity);
	  assert.strictEqual(fround(3), 3);
	  assert.strictEqual(fround(-3), -3);
	  var maxFloat32 = 3.4028234663852886e+38;
	  var minFloat32 = 1.401298464324817e-45;
	  assert.strictEqual(fround(maxFloat32), maxFloat32);
	  assert.strictEqual(fround(-maxFloat32), -maxFloat32);
	  assert.strictEqual(fround(maxFloat32 + Math.pow(2, 102)), maxFloat32);
	  assert.strictEqual(fround(minFloat32), minFloat32);
	  assert.strictEqual(fround(-minFloat32), -minFloat32);
	  assert.same(fround(minFloat32 / 2), 0);
	  assert.same(fround(-minFloat32 / 2), -0);
	  assert.strictEqual(fround(minFloat32 / 2 + Math.pow(2, -202)), minFloat32);
	  assert.strictEqual(fround(-minFloat32 / 2 - Math.pow(2, -202)), -minFloat32);
	});

	QUnit.test('Math.hypot', function (assert) {
	  var hypot = Math.hypot,
	      sqrt = Math.sqrt;
	  assert.isFunction(hypot);
	  assert.name(hypot, 'hypot');
	  assert.arity(hypot, 2);
	  assert.looksNative(hypot);
	  assert.nonEnumerable(Math, 'hypot');
	  assert.strictEqual(hypot(), 0);
	  assert.strictEqual(hypot(1), 1);
	  assert.same(hypot('', 0), 0);
	  assert.same(hypot(0, ''), 0);
	  assert.strictEqual(hypot(Infinity, 0), Infinity, 'Infinity, 0');
	  assert.strictEqual(hypot(-Infinity, 0), Infinity, '-Infinity, 0');
	  assert.strictEqual(hypot(0, Infinity), Infinity, '0, Infinity');
	  assert.strictEqual(hypot(0, -Infinity), Infinity, '0, -Infinity');
	  assert.strictEqual(hypot(Infinity, NaN), Infinity, 'Infinity, NaN');
	  assert.strictEqual(hypot(NaN, -Infinity), Infinity, 'NaN, -Infinity');
	  assert.same(hypot(NaN, 0), NaN, 'NaN, 0');
	  assert.same(hypot(0, NaN), NaN, '0, NaN');
	  assert.same(hypot(0, -0), 0);
	  assert.same(hypot(0, 0), 0);
	  assert.same(hypot(-0, -0), 0);
	  assert.same(hypot(-0, 0), 0);
	  assert.strictEqual(hypot(0, 1), 1);
	  assert.strictEqual(hypot(0, -1), 1);
	  assert.strictEqual(hypot(-0, 1), 1);
	  assert.strictEqual(hypot(-0, -1), 1);
	  assert.same(hypot(0), 0);
	  assert.strictEqual(hypot(1), 1);
	  assert.strictEqual(hypot(2), 2);
	  assert.strictEqual(hypot(0, 0, 1), 1);
	  assert.strictEqual(hypot(0, 1, 0), 1);
	  assert.strictEqual(hypot(1, 0, 0), 1);
	  assert.strictEqual(hypot(2, 3, 4), sqrt(2 * 2 + 3 * 3 + 4 * 4));
	  assert.strictEqual(hypot(2, 3, 4, 5), sqrt(2 * 2 + 3 * 3 + 4 * 4 + 5 * 5));
	  assert.epsilon(hypot(66, 66), 93.33809511662427);
	  assert.epsilon(hypot(0.1, 100), 100.0000499999875);
	  assert.strictEqual(hypot(1e+300, 1e+300), 1.4142135623730952e+300);
	  assert.strictEqual(Math.floor(hypot(1e-300, 1e-300) * 1e308), 141421356);
	  assert.strictEqual(hypot(1e+300, 1e+300, 2, 3), 1.4142135623730952e+300);
	  assert.strictEqual(hypot(-3, 4), 5);
	  assert.strictEqual(hypot(3, -4), 5);
	});

	QUnit.test('Math.imul', function (assert) {
	  var imul = Math.imul;
	  assert.isFunction(imul);
	  assert.name(imul, 'imul');
	  assert.arity(imul, 2);
	  assert.looksNative(imul);
	  assert.nonEnumerable(Math, 'imul');
	  assert.same(imul(0, 0), 0);
	  assert.strictEqual(imul(123, 456), 56088);
	  assert.strictEqual(imul(-123, 456), -56088);
	  assert.strictEqual(imul(123, -456), -56088);
	  assert.strictEqual(imul(19088743, 4275878552), 602016552);
	  assert.same(imul(false, 7), 0);
	  assert.same(imul(7, false), 0);
	  assert.same(imul(false, false), 0);
	  assert.strictEqual(imul(true, 7), 7);
	  assert.strictEqual(imul(7, true), 7);
	  assert.strictEqual(imul(true, true), 1);
	  assert.same(imul(undefined, 7), 0);
	  assert.same(imul(7, undefined), 0);
	  assert.same(imul(undefined, undefined), 0);
	  assert.same(imul('str', 7), 0);
	  assert.same(imul(7, 'str'), 0);
	  assert.same(imul({}, 7), 0);
	  assert.same(imul(7, {}), 0);
	  assert.same(imul([], 7), 0);
	  assert.same(imul(7, []), 0);
	  assert.strictEqual(imul(0xFFFFFFFF, 5), -5);
	  assert.strictEqual(imul(0xFFFFFFFE, 5), -10);
	  assert.strictEqual(imul(2, 4), 8);
	  assert.strictEqual(imul(-1, 8), -8);
	  assert.strictEqual(imul(-2, -2), 4);
	  assert.same(imul(-0, 7), 0);
	  assert.same(imul(7, -0), 0);
	  assert.same(imul(0.1, 7), 0);
	  assert.same(imul(7, 0.1), 0);
	  assert.same(imul(0.9, 7), 0);
	  assert.same(imul(7, 0.9), 0);
	  assert.strictEqual(imul(1.1, 7), 7);
	  assert.strictEqual(imul(7, 1.1), 7);
	  assert.strictEqual(imul(1.9, 7), 7);
	  assert.strictEqual(imul(7, 1.9), 7);
	});

	QUnit.test('Math.log10', function (assert) {
	  var log10 = Math.log10;
	  assert.isFunction(log10);
	  assert.name(log10, 'log10');
	  assert.arity(log10, 1);
	  assert.looksNative(log10);
	  assert.nonEnumerable(Math, 'log10');
	  assert.same(log10(''), log10(0));
	  assert.same(log10(NaN), NaN);
	  assert.same(log10(-1), NaN);
	  assert.same(log10(0), -Infinity);
	  assert.same(log10(-0), -Infinity);
	  assert.same(log10(1), 0);
	  assert.same(log10(Infinity), Infinity);
	  assert.epsilon(log10(0.1), -1);
	  assert.epsilon(log10(0.5), -0.3010299956639812);
	  assert.epsilon(log10(1.5), 0.17609125905568124);
	  assert.epsilon(log10(5), 0.6989700043360189);
	  assert.epsilon(log10(50), 1.6989700043360187);
	  assert.epsilon(log10(1000), 3);
	});

	QUnit.test('Math.log1p', function (assert) {
	  var log1p = Math.log1p;
	  assert.isFunction(log1p);
	  assert.name(log1p, 'log1p');
	  assert.arity(log1p, 1);
	  assert.looksNative(log1p);
	  assert.nonEnumerable(Math, 'log1p');
	  assert.same(log1p(''), log1p(0));
	  assert.same(log1p(NaN), NaN);
	  assert.same(log1p(-2), NaN);
	  assert.same(log1p(-1), -Infinity);
	  assert.same(log1p(0), 0);
	  assert.same(log1p(-0), -0);
	  assert.same(log1p(Infinity), Infinity);
	  assert.epsilon(log1p(5), 1.791759469228055);
	  assert.epsilon(log1p(50), 3.9318256327243257);
	});

	QUnit.test('Math.log2', function (assert) {
	  var log2 = Math.log2;
	  assert.isFunction(log2);
	  assert.name(log2, 'log2');
	  assert.arity(log2, 1);
	  assert.looksNative(log2);
	  assert.nonEnumerable(Math, 'log2');
	  assert.same(log2(''), log2(0));
	  assert.same(log2(NaN), NaN);
	  assert.same(log2(-1), NaN);
	  assert.same(log2(0), -Infinity);
	  assert.same(log2(-0), -Infinity);
	  assert.same(log2(1), 0);
	  assert.same(log2(Infinity), Infinity);
	  assert.same(log2(0.5), -1);
	  assert.same(log2(32), 5);
	  assert.epsilon(log2(5), 2.321928094887362);
	});

	QUnit.test('Math.sign', function (assert) {
	  var sign = Math.sign;
	  assert.isFunction(sign);
	  assert.name(sign, 'sign');
	  assert.arity(sign, 1);
	  assert.looksNative(sign);
	  assert.nonEnumerable(Math, 'sign');
	  assert.same(sign(NaN), NaN);
	  assert.same(sign(), NaN);
	  assert.same(sign(-0), -0);
	  assert.same(sign(0), 0);
	  assert.strictEqual(sign(Infinity), 1);
	  assert.strictEqual(sign(-Infinity), -1);
	  assert.strictEqual(sign(13510798882111488), 1);
	  assert.strictEqual(sign(-13510798882111488), -1);
	  assert.strictEqual(sign(42.5), 1);
	  assert.strictEqual(sign(-42.5), -1);
	});

	QUnit.test('Math.sinh', function (assert) {
	  var sinh = Math.sinh;
	  assert.isFunction(sinh);
	  assert.name(sinh, 'sinh');
	  assert.arity(sinh, 1);
	  assert.looksNative(sinh);
	  assert.nonEnumerable(Math, 'sinh');
	  assert.same(sinh(NaN), NaN);
	  assert.same(sinh(0), 0);
	  assert.same(sinh(-0), -0);
	  assert.strictEqual(sinh(Infinity), Infinity);
	  assert.strictEqual(sinh(-Infinity), -Infinity);
	  assert.epsilon(sinh(-5), -74.20321057778875);
	  assert.epsilon(sinh(2), 3.6268604078470186);
	  assert.strictEqual(sinh(-2e-17), -2e-17);
	});

	QUnit.test('Math.tanh', function (assert) {
	  var tanh = Math.tanh;
	  assert.isFunction(tanh);
	  assert.name(tanh, 'tanh');
	  assert.arity(tanh, 1);
	  assert.looksNative(tanh);
	  assert.nonEnumerable(Math, 'tanh');
	  assert.same(tanh(NaN), NaN);
	  assert.same(tanh(0), 0);
	  assert.same(tanh(-0), -0);
	  assert.strictEqual(tanh(Infinity), 1);
	  assert.strictEqual(tanh(90), 1);
	  assert.epsilon(tanh(10), 0.9999999958776927);
	  if (NATIVE) assert.strictEqual(tanh(710), 1);
	});

	QUnit.test('Math.trunc', function (assert) {
	  var trunc = Math.trunc;
	  assert.isFunction(trunc);
	  assert.name(trunc, 'trunc');
	  assert.arity(trunc, 1);
	  assert.looksNative(trunc);
	  assert.nonEnumerable(Math, 'trunc');
	  assert.same(trunc(NaN), NaN, 'NaN -> NaN');
	  assert.same(trunc(-0), -0, '-0 -> -0');
	  assert.same(trunc(0), 0, '0 -> 0');
	  assert.same(trunc(Infinity), Infinity, 'Infinity -> Infinity');
	  assert.same(trunc(-Infinity), -Infinity, '-Infinity -> -Infinity');
	  assert.same(trunc(null), 0, 'null -> 0');
	  assert.same(trunc({}), NaN, '{} -> NaN');
	  assert.strictEqual(trunc([]), 0, '[] -> 0');
	  assert.strictEqual(trunc(1.01), 1, '1.01 -> 0');
	  assert.strictEqual(trunc(1.99), 1, '1.99 -> 0');
	  assert.strictEqual(trunc(-1), -1, '-1 -> -1');
	  assert.strictEqual(trunc(-1.99), -1, '-1.99 -> -1');
	  assert.strictEqual(trunc(-555.555), -555, '-555.555 -> -555');
	  assert.strictEqual(trunc(0x20000000000001), 0x20000000000001, '0x20000000000001 -> 0x20000000000001');
	  assert.strictEqual(trunc(-0x20000000000001), -0x20000000000001, '-0x20000000000001 -> -0x20000000000001');
	});

	if (GLOBAL.JSON) {
	  QUnit.test('Well‑formed JSON.stringify', function (assert) {
	    var stringify = JSON.stringify;
	    assert.isFunction(stringify);
	    assert.arity(stringify, 3);
	    assert.name(stringify, 'stringify');
	    assert.looksNative(stringify);
	    assert.same(stringify({
	      foo: 'bar'
	    }), '{"foo":"bar"}', 'basic');
	    assert.same(stringify("\uDEAD"), "\"\\udead\"", 'r1');
	    assert.same(stringify("\uDF06\uD834"), "\"\\udf06\\ud834\"", 'r2');
	    assert.same(stringify("\uDF06ab\uD834"), "\"\\udf06ab\\ud834\"", 'r3');
	    assert.same(stringify('𠮷'), '"𠮷"', 'r4');
	    assert.same(stringify("\uD834\uDF06"), '"𝌆"', 'r5');
	    assert.same(stringify("\uD834\uD834\uDF06"), "\"\\ud834\uD834\uDF06\"", 'r6');
	    assert.same(stringify("\uD834\uDF06\uDF06"), "\"\uD834\uDF06\\udf06\"", 'r7');
	    assert.same(stringify({
	      '𠮷': ["\uDF06\uD834"]
	    }), "{\"\uD842\uDFB7\":[\"\\udf06\\ud834\"]}", 'r8');
	  });
	}

	var Map$1 = window.Map;

	if(!Map$1) {
		window.Map = createMap();
	}

	var Symbol$3 = GLOBAL.Symbol || {};
	var getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor,
	    keys$1 = Object.keys,
	    getOwnPropertyNames$1 = Object.getOwnPropertyNames,
	    getOwnPropertySymbols$1 = Object.getOwnPropertySymbols,
	    freeze$1 = Object.freeze;

	var _ref$1 = GLOBAL.Reflect || {},
	    ownKeys$1 = _ref$1.ownKeys;

	var from = Array.from;
	QUnit.test('Set', function (assert) {
	  assert.isFunction(Set);
	  assert.name(Set, 'Set');
	  assert.arity(Set, 0);
	  assert.looksNative(Set);
	  assert.ok('add' in Set.prototype, 'add in Set.prototype');
	  assert.ok('clear' in Set.prototype, 'clear in Set.prototype');
	  assert.ok('delete' in Set.prototype, 'delete in Set.prototype');
	  assert.ok('forEach' in Set.prototype, 'forEach in Set.prototype');
	  assert.ok('has' in Set.prototype, 'has in Set.prototype');
	  assert.ok(new Set() instanceof Set, 'new Set instanceof Set');
	  var set = new Set();
	  set.add(1);
	  set.add(2);
	  set.add(3);
	  set.add(2);
	  set.add(1);
	  assert.strictEqual(set.size, 3);
	  var result = [];
	  set.forEach(function (val) {
	    result.push(val);
	  });
	  assert.deepEqual(result, [1, 2, 3]);
	  assert.strictEqual(new Set(createIterable$1([1, 2, 3])).size, 3, 'Init from iterable');
	  assert.strictEqual(new Set([freeze$1({}), 1]).size, 2, 'Support frozen objects');
	  assert.strictEqual(new Set([NaN, NaN, NaN]).size, 1);
	  assert.deepEqual(from(new Set([3, 4]).add(2).add(1)), [3, 4, 2, 1]);
	  var done = false;
	  var add = Set.prototype.add; // eslint-disable-next-line no-extend-native -- required for testing

	  Set.prototype.add = function () {
	    throw new Error();
	  };

	  try {
	    new Set(createIterable$1([null, 1, 2], {
	      "return": function _return() {
	        return done = true;
	      }
	    }));
	  } catch (_unused) {
	    /* empty */
	  } // eslint-disable-next-line no-extend-native -- required for testing


	  Set.prototype.add = add;
	  assert.ok(done, '.return #throw');
	  var array = [];
	  done = false;
	  array['@@iterator'] = undefined;

	  array[Symbol$3.iterator] = function () {
	    done = true;
	    return [][Symbol$3.iterator].call(this);
	  };
	  assert.ok(done);
	  var object = {};
	  new Set().add(object);

	  if (DESCRIPTORS) {
	    var results = [];

	    for (var key in object) {
	      results.push(key);
	    }

	    assert.arrayEqual(results, []);
	    assert.arrayEqual(keys$1(object), []);
	  }

	  assert.arrayEqual(getOwnPropertyNames$1(object), []);
	  if (getOwnPropertySymbols$1) assert.arrayEqual(getOwnPropertySymbols$1(object), []);
	  if (ownKeys$1) assert.arrayEqual(ownKeys$1(object), []);

	  if (nativeSubclass) {
	    var Subclass = nativeSubclass(Set);
	    assert.ok(new Subclass() instanceof Subclass, 'correct subclassing with native classes #1');
	    assert.ok(new Subclass() instanceof Set, 'correct subclassing with native classes #2');
	    assert.ok(new Subclass().add(2).has(2), 'correct subclassing with native classes #3');
	  }
	});
	QUnit.test('Set#add', function (assert) {
	  assert.isFunction(Set.prototype.add);
	  assert.name(Set.prototype.add, 'add');
	  assert.arity(Set.prototype.add, 1);
	  assert.looksNative(Set.prototype.add);
	  assert.nonEnumerable(Set.prototype, 'add');
	  var array = [];
	  var set = new Set();
	  set.add(NaN);
	  set.add(2);
	  set.add(3);
	  set.add(2);
	  set.add(1);
	  set.add(array);
	  assert.strictEqual(set.size, 5);
	  var chain = set.add(NaN);
	  assert.strictEqual(chain, set);
	  assert.strictEqual(set.size, 5);
	  set.add(2);
	  assert.strictEqual(set.size, 5);
	  set.add(array);
	  assert.strictEqual(set.size, 5);
	  set.add([]);
	  assert.strictEqual(set.size, 6);
	  set.add(4);
	  assert.strictEqual(set.size, 7);
	  var frozen = freeze$1({});
	  set = new Set();
	  set.add(frozen);
	  assert.ok(set.has(frozen));
	});
	QUnit.test('Set#clear', function (assert) {
	  assert.isFunction(Set.prototype.clear);
	  assert.name(Set.prototype.clear, 'clear');
	  assert.arity(Set.prototype.clear, 0);
	  assert.looksNative(Set.prototype.clear);
	  assert.nonEnumerable(Set.prototype, 'clear');
	  var set = new Set();
	  set.clear();
	  assert.strictEqual(set.size, 0);
	  set = new Set();
	  set.add(1);
	  set.add(2);
	  set.add(3);
	  set.add(2);
	  set.add(1);
	  set.clear();
	  assert.strictEqual(set.size, 0);
	  assert.ok(!set.has(1));
	  assert.ok(!set.has(2));
	  assert.ok(!set.has(3));
	  var frozen = freeze$1({});
	  set = new Set();
	  set.add(1);
	  set.add(frozen);
	  set.clear();
	  assert.strictEqual(set.size, 0, 'Support frozen objects');
	  assert.ok(!set.has(1));
	  assert.ok(!set.has(frozen));
	});
	QUnit.test('Set#delete', function (assert) {
	  assert.isFunction(Set.prototype["delete"]);
	  if (NATIVE) assert.name(Set.prototype["delete"], 'delete');
	  assert.arity(Set.prototype["delete"], 1);
	  assert.looksNative(Set.prototype["delete"]);
	  assert.nonEnumerable(Set.prototype, 'delete');
	  var array = [];
	  var set = new Set();
	  set.add(NaN);
	  set.add(2);
	  set.add(3);
	  set.add(2);
	  set.add(1);
	  set.add(array);
	  assert.strictEqual(set.size, 5);
	  assert.strictEqual(set["delete"](NaN), true);
	  assert.strictEqual(set.size, 4);
	  assert.strictEqual(set["delete"](4), false);
	  assert.strictEqual(set.size, 4);
	  set["delete"]([]);
	  assert.strictEqual(set.size, 4);
	  set["delete"](array);
	  assert.strictEqual(set.size, 3);
	  var frozen = freeze$1({});
	  set.add(frozen);
	  assert.strictEqual(set.size, 4);
	  set["delete"](frozen);
	  assert.strictEqual(set.size, 3);
	});
	QUnit.test('Set#forEach', function (assert) {
	  assert.isFunction(Set.prototype.forEach);
	  assert.name(Set.prototype.forEach, 'forEach');
	  assert.arity(Set.prototype.forEach, 1);
	  assert.looksNative(Set.prototype.forEach);
	  assert.nonEnumerable(Set.prototype, 'forEach');
	  var result = [];
	  var count = 0;
	  var set = new Set();
	  set.add(1);
	  set.add(2);
	  set.add(3);
	  set.add(2);
	  set.add(1);
	  set.forEach(function (value) {
	    count++;
	    result.push(value);
	  });
	  assert.strictEqual(count, 3);
	  assert.deepEqual(result, [1, 2, 3]);
	  set = new Set();
	  set.add('0');
	  set.add('1');
	  set.add('2');
	  set.add('3');
	  result = '';
	  set.forEach(function (it) {
	    result += it;

	    if (it === '2') {
	      set["delete"]('2');
	      set["delete"]('3');
	      set["delete"]('1');
	      set.add('4');
	    }
	  });
	  assert.strictEqual(result, '0124');
	  set = new Set();
	  set.add('0');
	  result = '';
	  set.forEach(function (it) {
	    set["delete"]('0');
	    if (result !== '') throw new Error();
	    result += it;
	  });
	  assert.strictEqual(result, '0');
	  assert["throws"](function () {
	    Set.prototype.forEach.call(new Map(), function () {
	      /* empty */
	    });
	  }, 'non-generic');
	});
	QUnit.test('Set#has', function (assert) {
	  assert.isFunction(Set.prototype.has);
	  assert.name(Set.prototype.has, 'has');
	  assert.arity(Set.prototype.has, 1);
	  assert.looksNative(Set.prototype.has);
	  assert.nonEnumerable(Set.prototype, 'has');
	  var array = [];
	  var frozen = freeze$1({});
	  var set = new Set();
	  set.add(NaN);
	  set.add(2);
	  set.add(3);
	  set.add(2);
	  set.add(1);
	  set.add(frozen);
	  set.add(array);
	  assert.ok(set.has(NaN));
	  assert.ok(set.has(array));
	  assert.ok(set.has(frozen));
	  assert.ok(set.has(2));
	  assert.ok(!set.has(4));
	  assert.ok(!set.has([]));
	});
	QUnit.test('Set#size', function (assert) {
	  assert.nonEnumerable(Set.prototype, 'size');
	  var set = new Set();
	  set.add(1);
	  var size = set.size;
	  assert.strictEqual(typeof size, 'number', 'size is number');
	  assert.strictEqual(size, 1, 'size is correct');

	  if (DESCRIPTORS) {
	    var sizeDescriptor = getOwnPropertyDescriptor$1(Set.prototype, 'size');
	    assert.ok(sizeDescriptor && sizeDescriptor.get, 'size is getter');
	    assert.ok(sizeDescriptor && !sizeDescriptor.set, 'size isnt setter');
	    assert["throws"](function () {
	      return Set.prototype.size;
	    }, TypeError);
	  }
	});
	QUnit.test('Set & -0', function (assert) {
	  var set = new Set();
	  set.add(-0);
	  assert.strictEqual(set.size, 1);
	  assert.ok(set.has(0));
	  assert.ok(set.has(-0));
	  set.forEach(function (it) {
	    assert.ok(!is(it, -0));
	  });
	  set["delete"](-0);
	  assert.strictEqual(set.size, 0);
	  set = new Set([-0]);
	  set.forEach(function (key) {
	    assert.ok(!is(key, -0));
	  });
	  set = new Set();
	  set.add(4);
	  set.add(3);
	  set.add(2);
	  set.add(1);
	  set.add(0);
	  assert.ok(set.has(-0));
	});
	QUnit.test('Set#@@toStringTag', function (assert) {
	  assert.strictEqual(Set.prototype[Symbol$3.toStringTag], 'Set', 'Set::@@toStringTag is `Set`');
	  assert.strictEqual(String(new Set()), '[object Set]', 'correct stringification');
	});
	QUnit.test('Set Iterator', function (assert) {
	  var set = new Set();
	  set.add('a');
	  set.add('b');
	  set.add('c');
	  set.add('d');
	  var results = [];
	  var iterator = set.keys();
	  results.push(iterator.next().value);
	  assert.ok(set["delete"]('a'));
	  assert.ok(set["delete"]('b'));
	  assert.ok(set["delete"]('c'));
	  set.add('e');
	  results.push(iterator.next().value, iterator.next().value);
	  assert.ok(iterator.next().done);
	  set.add('f');
	  assert.ok(iterator.next().done);
	  assert.deepEqual(results, ['a', 'd', 'e']);
	});
	QUnit.test('Set#keys', function (assert) {
	  assert.isFunction(Set.prototype.keys);
	  assert.name(Set.prototype.keys, 'values');
	  assert.arity(Set.prototype.keys, 0);
	  assert.looksNative(Set.prototype.keys);
	  assert.strictEqual(Set.prototype.keys, Set.prototype.values);
	  assert.nonEnumerable(Set.prototype, 'keys');
	  var set = new Set();
	  set.add('q');
	  set.add('w');
	  set.add('e');
	  var iterator = set.keys();
	  assert.isIterator(iterator);
	  assert.isIterable(iterator);
	  assert.strictEqual(iterator[Symbol$3.toStringTag], 'Set Iterator');
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
	});
	QUnit.test('Set#values', function (assert) {
	  assert.isFunction(Set.prototype.values);
	  assert.name(Set.prototype.values, 'values');
	  assert.arity(Set.prototype.values, 0);
	  assert.looksNative(Set.prototype.values);
	  assert.nonEnumerable(Set.prototype, 'values');
	  var set = new Set();
	  set.add('q');
	  set.add('w');
	  set.add('e');
	  var iterator = set.values();
	  assert.isIterator(iterator);
	  assert.isIterable(iterator);
	  assert.strictEqual(iterator[Symbol$3.toStringTag], 'Set Iterator');
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
	});
	QUnit.test('Set#entries', function (assert) {
	  assert.isFunction(Set.prototype.entries);
	  assert.name(Set.prototype.entries, 'entries');
	  assert.arity(Set.prototype.entries, 0);
	  assert.looksNative(Set.prototype.entries);
	  assert.nonEnumerable(Set.prototype, 'entries');
	  var set = new Set();
	  set.add('q');
	  set.add('w');
	  set.add('e');
	  var iterator = set.entries();
	  assert.isIterator(iterator);
	  assert.isIterable(iterator);
	  assert.strictEqual(iterator[Symbol$3.toStringTag], 'Set Iterator');
	  assert.deepEqual(iterator.next(), {
	    value: ['q', 'q'],
	    done: false
	  });
	  assert.deepEqual(iterator.next(), {
	    value: ['w', 'w'],
	    done: false
	  });
	  assert.deepEqual(iterator.next(), {
	    value: ['e', 'e'],
	    done: false
	  });
	  assert.deepEqual(iterator.next(), {
	    value: undefined,
	    done: true
	  });
	});
	QUnit.test('Set#@@iterator', function (assert) {
	  assert.isIterable(Set.prototype);
	  assert.name(Set.prototype[Symbol$3.iterator], 'values');
	  assert.arity(Set.prototype[Symbol$3.iterator], 0);
	  assert.looksNative(Set.prototype[Symbol$3.iterator]);
	  assert.strictEqual(Set.prototype[Symbol$3.iterator], Set.prototype.values);
	  assert.nonEnumerable(Set.prototype, 'values');
	  var set = new Set();
	  set.add('q');
	  set.add('w');
	  set.add('e');
	  var iterator = set[Symbol$3.iterator]();
	  assert.isIterator(iterator);
	  assert.isIterable(iterator);
	  assert.strictEqual(iterator[Symbol$3.toStringTag], 'Set Iterator');
	  assert.strictEqual(String(iterator), '[object Set Iterator]');
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
	});

	var Symbol$2 = GLOBAL.Symbol || {};
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor,
	    keys = Object.keys,
	    getOwnPropertyNames = Object.getOwnPropertyNames,
	    getOwnPropertySymbols = Object.getOwnPropertySymbols,
	    freeze = Object.freeze;

	var _ref = GLOBAL.Reflect || {},
	    ownKeys = _ref.ownKeys;

	QUnit.test('Map', function (assert) {
	  assert.isFunction(Map);
	  assert.arity(Map, 0);
	  assert.name(Map, 'Map');
	  assert.looksNative(Map);
	  assert.ok('clear' in Map.prototype, 'clear in Map.prototype');
	  assert.ok('delete' in Map.prototype, 'delete in Map.prototype');
	  assert.ok('forEach' in Map.prototype, 'forEach in Map.prototype');
	  assert.ok('get' in Map.prototype, 'get in Map.prototype');
	  assert.ok('has' in Map.prototype, 'has in Map.prototype');
	  assert.ok('set' in Map.prototype, 'set in Map.prototype');
	  assert.ok(new Map() instanceof Map, 'new Map instanceof Map');
	  assert.strictEqual(new Map(createIterable$1([[1, 1], [2, 2], [3, 3]])).size, 3, 'Init from iterable');
	  assert.strictEqual(new Map([[freeze({}), 1], [2, 3]]).size, 2, 'Support frozen objects');
	  var done = false;

	  try {
	    new Map(createIterable$1([null, 1, 2], {
	      "return": function _return() {
	        return done = true;
	      }
	    }));
	  } catch (_unused) {
	    /* empty */
	  }

	  assert.ok(done, '.return #throw');
	  var array = [];
	  done = false;
	  array['@@iterator'] = undefined;

	  array[Symbol$2.iterator] = function () {
	    done = true;
	    return [][Symbol$2.iterator].call(this);
	  };
	  assert.ok(done);
	  var object = {};
	  new Map().set(object, 1);

	  if (DESCRIPTORS) {
	    var results = [];

	    for (var key in object) {
	      results.push(key);
	    }

	    assert.arrayEqual(results, []);
	    assert.arrayEqual(keys(object), []);
	  }

	  assert.arrayEqual(getOwnPropertyNames(object), []);
	  if (getOwnPropertySymbols) assert.arrayEqual(getOwnPropertySymbols(object), []);
	  if (ownKeys) assert.arrayEqual(ownKeys(object), []);

	  if (nativeSubclass) {
	    var Subclass = nativeSubclass(Map);
	    assert.ok(new Subclass() instanceof Subclass, 'correct subclassing with native classes #1');
	    assert.ok(new Subclass() instanceof Map, 'correct subclassing with native classes #2');
	    assert.strictEqual(new Subclass().set(1, 2).get(1), 2, 'correct subclassing with native classes #3');
	  }
	});
	QUnit.test('Map#clear', function (assert) {
	  assert.isFunction(Map.prototype.clear);
	  assert.arity(Map.prototype.clear, 0);
	  assert.name(Map.prototype.clear, 'clear');
	  assert.looksNative(Map.prototype.clear);
	  assert.nonEnumerable(Map.prototype, 'clear');
	  var map = new Map();
	  map.clear();
	  assert.strictEqual(map.size, 0);
	  map = new Map();
	  map.set(1, 2);
	  map.set(2, 3);
	  map.set(1, 4);
	  map.clear();
	  assert.strictEqual(map.size, 0);
	  assert.ok(!map.has(1));
	  assert.ok(!map.has(2));
	  var frozen = freeze({});
	  map = new Map();
	  map.set(1, 2);
	  map.set(frozen, 3);
	  map.clear();
	  assert.strictEqual(map.size, 0, 'Support frozen objects');
	  assert.ok(!map.has(1));
	  assert.ok(!map.has(frozen));
	});
	QUnit.test('Map#delete', function (assert) {
	  assert.isFunction(Map.prototype["delete"]);
	  assert.arity(Map.prototype["delete"], 1);
	  if (NATIVE) assert.name(Map.prototype["delete"], 'delete');
	  assert.looksNative(Map.prototype["delete"]);
	  assert.nonEnumerable(Map.prototype, 'delete');
	  var object = {};
	  var map = new Map();
	  map.set(NaN, 1);
	  map.set(2, 1);
	  map.set(3, 7);
	  map.set(2, 5);
	  map.set(1, 4);
	  map.set(object, 9);
	  assert.strictEqual(map.size, 5);
	  assert.ok(map["delete"](NaN));
	  assert.strictEqual(map.size, 4);
	  assert.ok(!map["delete"](4));
	  assert.strictEqual(map.size, 4);
	  map["delete"]([]);
	  assert.strictEqual(map.size, 4);
	  map["delete"](object);
	  assert.strictEqual(map.size, 3);
	  var frozen = freeze({});
	  map.set(frozen, 42);
	  assert.strictEqual(map.size, 4);
	  map["delete"](frozen);
	  assert.strictEqual(map.size, 3);
	});
	QUnit.test('Map#forEach', function (assert) {
	  assert.isFunction(Map.prototype.forEach);
	  assert.arity(Map.prototype.forEach, 1);
	  assert.name(Map.prototype.forEach, 'forEach');
	  assert.looksNative(Map.prototype.forEach);
	  assert.nonEnumerable(Map.prototype, 'forEach');
	  var result = {};
	  var count = 0;
	  var object = {};
	  var map = new Map();
	  map.set(NaN, 1);
	  map.set(2, 1);
	  map.set(3, 7);
	  map.set(2, 5);
	  map.set(1, 4);
	  map.set(object, 9);
	  map.forEach(function (value, key) {
	    count++;
	    result[value] = key;
	  });
	  assert.strictEqual(count, 5);
	  assert.deepEqual(result, {
	    1: NaN,
	    7: 3,
	    5: 2,
	    4: 1,
	    9: object
	  });
	  map = new Map();
	  map.set('0', 9);
	  map.set('1', 9);
	  map.set('2', 9);
	  map.set('3', 9);
	  result = '';
	  map.forEach(function (value, key) {
	    result += key;

	    if (key === '2') {
	      map["delete"]('2');
	      map["delete"]('3');
	      map["delete"]('1');
	      map.set('4', 9);
	    }
	  });
	  assert.strictEqual(result, '0124');
	  map = new Map([['0', 1]]);
	  result = '';
	  map.forEach(function (it) {
	    map["delete"]('0');
	    if (result !== '') throw new Error();
	    result += it;
	  });
	  assert.strictEqual(result, '1');
	  assert["throws"](function () {
	    Map.prototype.forEach.call(new Set(), function () {
	      /* empty */
	    });
	  }, 'non-generic');
	});
	QUnit.test('Map#get', function (assert) {
	  assert.isFunction(Map.prototype.get);
	  assert.name(Map.prototype.get, 'get');
	  assert.arity(Map.prototype.get, 1);
	  assert.looksNative(Map.prototype.get);
	  assert.nonEnumerable(Map.prototype, 'get');
	  var object = {};
	  var frozen = freeze({});
	  var map = new Map();
	  map.set(NaN, 1);
	  map.set(2, 1);
	  map.set(3, 1);
	  map.set(2, 5);
	  map.set(1, 4);
	  map.set(frozen, 42);
	  map.set(object, object);
	  assert.strictEqual(map.get(NaN), 1);
	  assert.strictEqual(map.get(4), undefined);
	  assert.strictEqual(map.get({}), undefined);
	  assert.strictEqual(map.get(object), object);
	  assert.strictEqual(map.get(frozen), 42);
	  assert.strictEqual(map.get(2), 5);
	});
	QUnit.test('Map#has', function (assert) {
	  assert.isFunction(Map.prototype.has);
	  assert.name(Map.prototype.has, 'has');
	  assert.arity(Map.prototype.has, 1);
	  assert.looksNative(Map.prototype.has);
	  assert.nonEnumerable(Map.prototype, 'has');
	  var object = {};
	  var frozen = freeze({});
	  var map = new Map();
	  map.set(NaN, 1);
	  map.set(2, 1);
	  map.set(3, 1);
	  map.set(2, 5);
	  map.set(1, 4);
	  map.set(frozen, 42);
	  map.set(object, object);
	  assert.ok(map.has(NaN));
	  assert.ok(map.has(object));
	  assert.ok(map.has(2));
	  assert.ok(map.has(frozen));
	  assert.ok(!map.has(4));
	  assert.ok(!map.has({}));
	});
	QUnit.test('Map#set', function (assert) {
	  assert.isFunction(Map.prototype.set);
	  assert.name(Map.prototype.set, 'set');
	  assert.arity(Map.prototype.set, 2);
	  assert.looksNative(Map.prototype.set);
	  assert.nonEnumerable(Map.prototype, 'set');
	  var object = {};
	  var map = new Map();
	  map.set(NaN, 1);
	  map.set(2, 1);
	  map.set(3, 1);
	  map.set(2, 5);
	  map.set(1, 4);
	  map.set(object, object);
	  assert.ok(map.size === 5);
	  var chain = map.set(7, 2);
	  assert.strictEqual(chain, map);
	  map.set(7, 2);
	  assert.strictEqual(map.size, 6);
	  assert.strictEqual(map.get(7), 2);
	  assert.strictEqual(map.get(NaN), 1);
	  map.set(NaN, 42);
	  assert.strictEqual(map.size, 6);
	  assert.strictEqual(map.get(NaN), 42);
	  map.set({}, 11);
	  assert.strictEqual(map.size, 7);
	  assert.strictEqual(map.get(object), object);
	  map.set(object, 27);
	  assert.strictEqual(map.size, 7);
	  assert.strictEqual(map.get(object), 27);
	  map = new Map();
	  map.set(NaN, 2);
	  map.set(NaN, 3);
	  map.set(NaN, 4);
	  assert.strictEqual(map.size, 1);
	  var frozen = freeze({});
	  map = new Map().set(frozen, 42);
	  assert.strictEqual(map.get(frozen), 42);
	});
	QUnit.test('Map#size', function (assert) {
	  assert.nonEnumerable(Map.prototype, 'size');
	  var map = new Map();
	  map.set(2, 1);
	  var size = map.size;
	  assert.strictEqual(typeof size, 'number', 'size is number');
	  assert.strictEqual(size, 1, 'size is correct');

	  if (DESCRIPTORS) {
	    var sizeDescriptor = getOwnPropertyDescriptor(Map.prototype, 'size');
	    assert.ok(sizeDescriptor && sizeDescriptor.get, 'size is getter');
	    assert.ok(sizeDescriptor && !sizeDescriptor.set, 'size isnt setter');
	    assert["throws"](function () {
	      return Map.prototype.size;
	    }, TypeError);
	  }
	});
	QUnit.test('Map & -0', function (assert) {
	  var map = new Map();
	  map.set(-0, 1);
	  assert.strictEqual(map.size, 1);
	  assert.ok(map.has(0));
	  assert.ok(map.has(-0));
	  assert.strictEqual(map.get(0), 1);
	  assert.strictEqual(map.get(-0), 1);
	  map.forEach(function (val, key) {
	    assert.ok(!is(key, -0));
	  });
	  map["delete"](-0);
	  assert.strictEqual(map.size, 0);
	  map = new Map([[-0, 1]]);
	  map.forEach(function (val, key) {
	    assert.ok(!is(key, -0));
	  });
	  map = new Map();
	  map.set(4, 4);
	  map.set(3, 3);
	  map.set(2, 2);
	  map.set(1, 1);
	  map.set(0, 0);
	  assert.ok(map.has(-0));
	});
	QUnit.test('Map#@@toStringTag', function (assert) {
	  assert.strictEqual(Map.prototype[Symbol$2.toStringTag], 'Map', 'Map::@@toStringTag is `Map`');
	  assert.strictEqual(String(new Map()), '[object Map]', 'correct stringification');
	});
	QUnit.test('Map Iterator', function (assert) {
	  var map = new Map();
	  map.set('a', 1);
	  map.set('b', 2);
	  map.set('c', 3);
	  map.set('d', 4);
	  var results = [];
	  var iterator = map.keys();
	  assert.isIterator(iterator);
	  assert.isIterable(iterator);
	  assert.nonEnumerable(iterator, 'next');
	  assert.nonEnumerable(iterator, Symbol$2.iterator);
	  results.push(iterator.next().value);
	  assert.ok(map["delete"]('a'));
	  assert.ok(map["delete"]('b'));
	  assert.ok(map["delete"]('c'));
	  map.set('e');
	  results.push(iterator.next().value, iterator.next().value);
	  assert.ok(iterator.next().done);
	  map.set('f');
	  assert.ok(iterator.next().done);
	  assert.deepEqual(results, ['a', 'd', 'e']);
	});
	QUnit.test('Map#keys', function (assert) {
	  assert.isFunction(Map.prototype.keys);
	  assert.name(Map.prototype.keys, 'keys');
	  assert.arity(Map.prototype.keys, 0);
	  assert.looksNative(Map.prototype.keys);
	  assert.nonEnumerable(Map.prototype, 'keys');
	  var map = new Map();
	  map.set('a', 'q');
	  map.set('s', 'w');
	  map.set('d', 'e');
	  var iterator = map.keys();
	  assert.isIterator(iterator);
	  assert.isIterable(iterator);
	  assert.strictEqual(iterator[Symbol$2.toStringTag], 'Map Iterator');
	  assert.deepEqual(iterator.next(), {
	    value: 'a',
	    done: false
	  });
	  assert.deepEqual(iterator.next(), {
	    value: 's',
	    done: false
	  });
	  assert.deepEqual(iterator.next(), {
	    value: 'd',
	    done: false
	  });
	  assert.deepEqual(iterator.next(), {
	    value: undefined,
	    done: true
	  });
	});
	QUnit.test('Map#values', function (assert) {
	  assert.isFunction(Map.prototype.values);
	  assert.name(Map.prototype.values, 'values');
	  assert.arity(Map.prototype.values, 0);
	  assert.looksNative(Map.prototype.values);
	  assert.nonEnumerable(Map.prototype, 'values');
	  var map = new Map();
	  map.set('a', 'q');
	  map.set('s', 'w');
	  map.set('d', 'e');
	  var iterator = map.values();
	  assert.isIterator(iterator);
	  assert.isIterable(iterator);
	  assert.strictEqual(iterator[Symbol$2.toStringTag], 'Map Iterator');
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
	});
	QUnit.test('Map#entries', function (assert) {
	  assert.isFunction(Map.prototype.entries);
	  assert.name(Map.prototype.entries, 'entries');
	  assert.arity(Map.prototype.entries, 0);
	  assert.looksNative(Map.prototype.entries);
	  assert.nonEnumerable(Map.prototype, 'entries');
	  var map = new Map();
	  map.set('a', 'q');
	  map.set('s', 'w');
	  map.set('d', 'e');
	  var iterator = map.entries();
	  assert.isIterator(iterator);
	  assert.isIterable(iterator);
	  assert.strictEqual(iterator[Symbol$2.toStringTag], 'Map Iterator');
	  assert.deepEqual(iterator.next(), {
	    value: ['a', 'q'],
	    done: false
	  });
	  assert.deepEqual(iterator.next(), {
	    value: ['s', 'w'],
	    done: false
	  });
	  assert.deepEqual(iterator.next(), {
	    value: ['d', 'e'],
	    done: false
	  });
	  assert.deepEqual(iterator.next(), {
	    value: undefined,
	    done: true
	  });
	});
	QUnit.test('Map#@@iterator', function (assert) {
	  assert.isIterable(Map.prototype);
	  assert.name(Map.prototype.entries, 'entries');
	  assert.arity(Map.prototype.entries, 0);
	  assert.looksNative(Map.prototype[Symbol$2.iterator]);
	  assert.strictEqual(Map.prototype[Symbol$2.iterator], Map.prototype.entries);
	  var map = new Map();
	  map.set('a', 'q');
	  map.set('s', 'w');
	  map.set('d', 'e');
	  var iterator = map[Symbol$2.iterator]();
	  assert.isIterator(iterator);
	  assert.isIterable(iterator);
	  assert.strictEqual(iterator[Symbol$2.toStringTag], 'Map Iterator');
	  assert.strictEqual(String(iterator), '[object Map Iterator]');
	  assert.deepEqual(iterator.next(), {
	    value: ['a', 'q'],
	    done: false
	  });
	  assert.deepEqual(iterator.next(), {
	    value: ['s', 'w'],
	    done: false
	  });
	  assert.deepEqual(iterator.next(), {
	    value: ['d', 'e'],
	    done: false
	  });
	  assert.deepEqual(iterator.next(), {
	    value: undefined,
	    done: true
	  });
	});

	var ticks = null;
	var nextTick = setTimeout;
	function next() {
		if(ticks && ticks.length) {
			for(var i = 0; i < ticks.length; i++) {
				var args = ticks[i];
				var fn = args[0];
				args = Array.prototype.slice.call(args, 1);
				try {
					fn.apply(this, args);
				} catch(e) {
					console.error(e);
				}
			}
			ticks = null;
		}
	}
	function queueMicrotask$1() {
		if(!ticks) {
			ticks = new Array();
			nextTick(next);
		}
		ticks.push(arguments);
	}

	if(!window.queueMicrotask) {
		window.queueMicrotask = queueMicrotask$1;
	}

	var forEach = Array.prototype.forEach || forEach$2;

	var PENDING = 1;
	var RESOLVED = 2;
	var REJECTED = 3;

	function Promise$1(executor) {
		if(!executor) {
			throw new TypeError("undefined is not a promise");
		}
		this._resolveds = [];
		this._rejecteds = [];
		this._state = PENDING;//resolved | rejected

		var me = this;
		function resolve(value) {
			if(me._state === PENDING) {
				if(value) {
					try {
						var then = value.then;
						if(isFunction(then)) {
							queueMicrotask(function() {
								try {
									value.then(resolve, reject);
								} catch(e) {
									reject(e);
								}
							});
							return;
						}
					} catch(e) {
						reject(e);
						return;
					}
				}
				me._value = value;
				me._state = RESOLVED;
				queueMicrotask(function() {
					forEach.call(me._resolveds, callAll, me);
					me._resolveds = null;
				});
			}
		}
		function reject(reason) {
			if(me._state === PENDING) {
				me._value = reason;
				me._state = REJECTED;
				queueMicrotask(function() {
					forEach.call(me._rejecteds, callAll, me);
					me._rejecteds = null;
				});
			}
		}
		try {
			executor(resolve, reject);
		} catch(e) {
			reject(e);
		}
	}
	function callAll(fn) {
		fn.call(this, this._value);
	}
	function nextPromise(before, after, resolve, reject) {
		return function(value) {
			try {
				var x = before(value);
				if(x && (typeof x.then === "function")) {
					x.then(resolve, reject);
				} else {
					after(x);
				}
			} catch(r) {
				reject(r);
			}
		};
	}
	Promise$1.prototype.then = function then(onResolved, onRejected) {
		// var Class = speciesConstructor(this, Promise);
		var me = this;
		onResolved = onResolved || noop;
		onRejected = onRejected || noop;
		return new Promise$1(function(resolve, reject) {
			switch(me._state) {
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
	Promise$1.prototype.catch = function(onRejected) {
		return this.then(undefined, onRejected);
	};

	function ResolvePromise(value) {
		this._value = value;
		this._state = RESOLVED;
	}
	ResolvePromise.prototype = Promise$1.prototype;

	function RejectPromise(value) {
		this._value = value;
		this._state = REJECTED;
	}
	RejectPromise.prototype = Promise$1.prototype;

	Promise$1.resolve = function resolve(value) {
		if(value.constructor === this) {
			return value;
		}
		if(!this) {
			throw TypeError("Promise.resolve called on non-object");
		}
		if(typeof this !== "function") {
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
	Promise$1.reject = function reject(value) {
		if(value.constructor === this) {
			return value;
		}
		if(!this) {
			throw TypeError("Promise.resolve called on non-object");
		}
		if(typeof this !== "function") {
			throw TypeError(this + " is not a constructor");
		}
		return new RejectPromise(value);
	};

	Promise$1.all = function all(promises) {
		if(!this) {
			throw TypeError("Promise.all called on non-object");
		}
		if(typeof this !== "function") {
			throw TypeError(this + " is not a constructor");
		}
		// var Promise = this;
		if(promises) {
			var entries = promises[Symbol.iterator];
			if(entries) {
				var it = entries.call(promises);
				promises = [];
				while(true) {
					var next = it.next();
					if(next.done) break;
					var value = next.value;
					try {
						promises.push(Promise$1.resolve(value));
					} catch(e) {
						if(it.return) {
							try {
								it.return();
							} catch(e) { }
						}
						throw e;
					}
				}
				return new Promise$1(function(resolve, reject) {
					var c = 0;
					var result = new Array(promises.length);
					forEach.call(promises, function(p, index) {
						p.then(function(data) {
							c++;
							result[index] = data;
							if(c >= promises.length) {
								resolve(result);
							}
						}, function(error) {
							reject(error);
						});
						c++;
						if(c >= promises.length) {
							resolve();
						}
					});
				});
			}
		}
		throw new TypeError(promises + 'is not iterable');
	};
	Promise$1.race = function race(promises) {
		if(!this) {
			throw TypeError("Promise.all called on non-object");
		}
		if(typeof this !== "function") {
			throw TypeError(this + " is not a constructor");
		}
		// var Promise = this;
		if(promises) {
			var entries = promises[Symbol.iterator];
			if(entries) {
				var it = entries.call(promises);
				promises = [];
				while(true) {
					var next = it.next();
					if(next.done) break;
					var value = next.value;
					try {
						promises.push(Promise$1.resolve(value));
					} catch(e) {
						if(it.return) {
							try {
								it.return();
							} catch(e) { }
						}
						throw e;
					}
				}
				return new Promise$1(function(resolve, reject) {
					forEach.call(promises, function(one) {
						one.then(function() {
							resolve();
						}, function() {
							reject();
						});
					});
				});
			}
		}
		throw new TypeError(promises + 'is not iterable');
	};

	if(!window.Promise) {
		window.Promise = Promise$1;
	}

	function promise_finally(onCompleted) {
		return this.then(function(value) {
			var r = onCompleted();
			if(r === undefined) {
				return value;
			}
			return r;
		}, function(error) {
			var r = onCompleted();
			if(r === undefined) {
				return error;
			}
			return r;
		});
	}

	if(!Promise.prototype.finally) {
		Promise.prototype.finally = promise_finally;
	}

	var Symbol$1 = GLOBAL.Symbol || {};
	var setPrototypeOf = Object.setPrototypeOf,
	    create = Object.create;
	QUnit.test('Promise', function (assert) {
	  assert.isFunction(Promise);
	  assert.arity(Promise, 1);
	  assert.name(Promise, 'Promise');
	  assert.looksNative(Promise);
	  assert["throws"](function () {
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
	    then: function then() {
	      result += 'A';
	      throw Error();
	    }
	  });
	  promise1["catch"](function () {
	    result += 'B';
	  });
	  promise1["catch"](function () {
	    result += 'C';
	    assert.same(result, EXPECTED_ORDER);
	    start();
	  });
	  var promise2 = new Promise(function (r) {
	    resolve2 = r;
	  });
	  resolve2(Object.defineProperty({}, 'then', {
	    get: function get() {
	      result += 'D';
	      throw Error();
	    }
	  }));
	  resolve2(Object.defineProperty({}, 'then', {
	    get: function get() {
	      result += 'I';
	      return 1;
	    }
	  }));
	  result += 'E';
	  promise2["catch"](function () {
	    result += 'F';
	  });
	  promise2["catch"](function () {
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
	    executor(function () {
	      /* empty */
	    }, function () {
	      /* empty */
	    });
	  };

	  var FakePromise2 = FakePromise1[Symbol$1.species] = function (executor) {
	    executor(function () {
	      /* empty */
	    }, function () {
	      /* empty */
	    });
	  };

	  assert.ok(promise.then(function () {
	    /* empty */
	  }) instanceof FakePromise2, 'subclassing, @@species pattern');
	  promise = new Promise(function (resolve) {
	    resolve(42);
	  });

	  promise.constructor = FakePromise1 = function FakePromise1(executor) {
	    executor(function () {
	      /* empty */
	    }, function () {
	      /* empty */
	    });
	  };

	  assert.ok(promise.then(function () {
	    /* empty */
	  }) instanceof Promise, 'subclassing, incorrect `this` pattern');
	  promise = new Promise(function (resolve) {
	    resolve(42);
	  });

	  promise.constructor = FakePromise1 = function FakePromise1(executor) {
	    executor(function () {
	      /* empty */
	    }, function () {
	      /* empty */
	    });
	  };

	  FakePromise1[Symbol$1.species] = function () {
	    /* empty */
	  };

	  assert["throws"](function () {
	    promise.then(function () {
	      /* empty */
	    });
	  }, 'NewPromiseCapability validations, #1');

	  FakePromise1[Symbol$1.species] = function (executor) {
	    executor(null, function () {
	      /* empty */
	    });
	  };

	  assert["throws"](function () {
	    promise.then(function () {
	      /* empty */
	    });
	  }, 'NewPromiseCapability validations, #2');

	  FakePromise1[Symbol$1.species] = function (executor) {
	    executor(function () {
	      /* empty */
	    }, null);
	  };

	  assert["throws"](function () {
	    promise.then(function () {
	      /* empty */
	    });
	  }, 'NewPromiseCapability validations, #3');
	});
	QUnit.test('Promise#catch', function (assert) {
	  assert.isFunction(Promise.prototype["catch"]);
	  if (NATIVE) assert.arity(Promise.prototype["catch"], 1);
	  if (NATIVE) assert.name(Promise.prototype["catch"], 'catch');
	  assert.looksNative(Promise.prototype["catch"]);
	  assert.nonEnumerable(Promise.prototype, 'catch');
	  var promise = new Promise(function (resolve) {
	    resolve(42);
	  });

	  promise.constructor = function (executor) {
	    executor(function () {
	      /* empty */
	    }, function () {
	      /* empty */
	    });
	  };

	  promise = new Promise(function (resolve) {
	    resolve(42);
	  });

	  promise.constructor = function FakePromise1(executor) {
	    executor(function () {
	      /* empty */
	    }, function () {
	      /* empty */
	    });
	  };

	  assert.ok(promise["catch"](function () {
	    /* empty */
	  }) instanceof Promise, 'subclassing, incorrect `this` pattern');
	  promise = new Promise(function (resolve) {
	    resolve(42);
	  });

	  promise.constructor = function FakePromise1(executor) {
	    executor(function () {
	      /* empty */
	    }, function () {
	      /* empty */
	    });
	  };

	  assert.same(Promise.prototype["catch"].call({
	    then: function then(x, y) {
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
	  assert["throws"](function () {
	    resolve.call(null, 1)["catch"](function () {
	      /* empty */
	    });
	  }, TypeError, 'throws without context');

	  function FakePromise1(executor) {
	    executor(function () {
	      /* empty */
	    }, function () {
	      /* empty */
	    });
	  }

	  FakePromise1[Symbol$1.species] = function (executor) {
	    executor(function () {
	      /* empty */
	    }, function () {
	      /* empty */
	    });
	  };

	  assert.ok(resolve.call(FakePromise1, 42) instanceof FakePromise1, 'subclassing, `this` pattern');
	  assert["throws"](function () {
	    resolve.call(function () {
	      /* empty */
	    }, 42);
	  }, 'NewPromiseCapability validations, #1');
	  assert["throws"](function () {
	    resolve.call(function (executor) {
	      executor(null, function () {
	        /* empty */
	      });
	    }, 42);
	  }, 'NewPromiseCapability validations, #2');
	  assert["throws"](function () {
	    resolve.call(function (executor) {
	      executor(function () {
	        /* empty */
	      }, null);
	    }, 42);
	  }, 'NewPromiseCapability validations, #3');
	});
	QUnit.test('Promise.reject', function (assert) {
	  var reject = Promise.reject;
	  assert.isFunction(reject);
	  if (NATIVE) assert.arity(reject, 1);
	  assert.name(reject, 'reject');
	  assert.looksNative(reject);
	  assert.nonEnumerable(Promise, 'reject');
	  assert["throws"](function () {
	    reject.call(null, 1)["catch"](function () {
	      /* empty */
	    });
	  }, TypeError, 'throws without context');

	  function FakePromise1(executor) {
	    executor(function () {
	      /* empty */
	    }, function () {
	      /* empty */
	    });
	  }

	  FakePromise1[Symbol$1.species] = function (executor) {
	    executor(function () {
	      /* empty */
	    }, function () {
	      /* empty */
	    });
	  };

	  assert.ok(reject.call(FakePromise1, 42) instanceof FakePromise1, 'subclassing, `this` pattern');
	  assert["throws"](function () {
	    reject.call(function () {
	      /* empty */
	    }, 42);
	  }, 'NewPromiseCapability validations, #1');
	  assert["throws"](function () {
	    reject.call(function (executor) {
	      executor(null, function () {
	        /* empty */
	      });
	    }, 42);
	  }, 'NewPromiseCapability validations, #2');
	  assert["throws"](function () {
	    reject.call(function (executor) {
	      executor(function () {
	        /* empty */
	      }, null);
	    }, 42);
	  }, 'NewPromiseCapability validations, #3');
	});
	QUnit.test('Promise.all', function (assert) {
	  var FakePromise1, FakePromise2;
	  var all = Promise.all,
	      resolve = Promise.resolve;
	  assert.isFunction(all);
	  assert.arity(all, 1);
	  assert.name(all, 'all');
	  assert.looksNative(all);
	  assert.nonEnumerable(Promise, 'all');
	  var iterable = createIterable$1([1, 2, 3]);
	  Promise.all(iterable)["catch"](function () {
	    /* empty */
	  });
	  assert.ok(iterable.received, 'works with iterables: iterator received');
	  assert.ok(iterable.called, 'works with iterables: next called');
	  var array = [];
	  var done = false;
	  array['@@iterator'] = undefined;

	  array[Symbol$1.iterator] = function () {
	    done = true;
	    return [][Symbol$1.iterator].call(this);
	  };

	  Promise.all(array);
	  assert.ok(done);
	  assert["throws"](function () {
	    all.call(null, [])["catch"](function () {
	      /* empty */
	    });
	  }, TypeError, 'throws without context');
	  done = false;

	  try {
	    Promise.resolve = function () {
	      throw new Error();
	    };

	    Promise.all(createIterable$1([1, 2, 3], {
	      "return": function _return() {
	        done = true;
	      }
	    }))["catch"](function () {
	      /* empty */
	    });
	  } catch (error) {
	    /* empty */
	  }

	  Promise.resolve = resolve;
	  assert.ok(done, 'iteration closing');

	  FakePromise1 = function FakePromise1(executor) {
	    executor(function () {
	      /* empty */
	    }, function () {
	      /* empty */
	    });
	  };

	  FakePromise2 = FakePromise1[Symbol$1.species] = function (executor) {
	    executor(function () {
	      /* empty */
	    }, function () {
	      /* empty */
	    });
	  };

	  FakePromise1.resolve = FakePromise2.resolve = resolve.bind(Promise);
	  assert.ok(all.call(FakePromise1, [1, 2, 3]) instanceof FakePromise1, 'subclassing, `this` pattern');

	  FakePromise1 = function FakePromise1() {
	    /* empty */
	  };

	  FakePromise2 = function FakePromise2(executor) {
	    executor(null, function () {
	      /* empty */
	    });
	  };

	  var FakePromise3 = function FakePromise3(executor) {
	    executor(function () {
	      /* empty */
	    }, null);
	  };

	  FakePromise1.resolve = FakePromise2.resolve = FakePromise3.resolve = resolve.bind(Promise);
	  assert["throws"](function () {
	    all.call(FakePromise1, [1, 2, 3]);
	  }, 'NewPromiseCapability validations, #1');
	  assert["throws"](function () {
	    all.call(FakePromise2, [1, 2, 3]);
	  }, 'NewPromiseCapability validations, #2');
	  assert["throws"](function () {
	    all.call(FakePromise3, [1, 2, 3]);
	  }, 'NewPromiseCapability validations, #3');
	});
	QUnit.test('Promise.race', function (assert) {
	  var FakePromise1, FakePromise2;
	  var race = Promise.race,
	      resolve = Promise.resolve;
	  assert.isFunction(race);
	  assert.arity(race, 1);
	  assert.name(race, 'race');
	  assert.looksNative(race);
	  assert.nonEnumerable(Promise, 'race');
	  var iterable = createIterable$1([1, 2, 3]);
	  Promise.race(iterable)["catch"](function () {
	    /* empty */
	  });
	  assert.ok(iterable.received, 'works with iterables: iterator received');
	  assert.ok(iterable.called, 'works with iterables: next called');
	  var array = [];
	  var done = false;
	  array['@@iterator'] = undefined;

	  array[Symbol$1.iterator] = function () {
	    done = true;
	    return [][Symbol$1.iterator].call(this);
	  };

	  Promise.race(array);
	  assert.ok(done);
	  assert["throws"](function () {
	    race.call(null, [])["catch"](function () {
	      /* empty */
	    });
	  }, TypeError, 'throws without context');
	  done = false;

	  try {
	    Promise.resolve = function () {
	      throw new Error();
	    };

	    Promise.race(createIterable$1([1, 2, 3], {
	      "return": function _return() {
	        done = true;
	      }
	    }))["catch"](function () {
	      /* empty */
	    });
	  } catch (error) {
	    /* empty */
	  }

	  Promise.resolve = resolve;
	  assert.ok(done, 'iteration closing');

	  FakePromise1 = function FakePromise1(executor) {
	    executor(function () {
	      /* empty */
	    }, function () {
	      /* empty */
	    });
	  };

	  FakePromise2 = FakePromise1[Symbol$1.species] = function (executor) {
	    executor(function () {
	      /* empty */
	    }, function () {
	      /* empty */
	    });
	  };

	  FakePromise1.resolve = FakePromise2.resolve = resolve.bind(Promise);
	  assert.ok(race.call(FakePromise1, [1, 2, 3]) instanceof FakePromise1, 'subclassing, `this` pattern');

	  FakePromise1 = function FakePromise1() {
	    /* empty */
	  };

	  FakePromise2 = function FakePromise2(executor) {
	    executor(null, function () {
	      /* empty */
	    });
	  };

	  var FakePromise3 = function FakePromise3(executor) {
	    executor(function () {
	      /* empty */
	    }, null);
	  };

	  FakePromise1.resolve = FakePromise2.resolve = FakePromise3.resolve = resolve.bind(Promise);
	  assert["throws"](function () {
	    race.call(FakePromise1, [1, 2, 3]);
	  }, 'NewPromiseCapability validations, #1');
	  assert["throws"](function () {
	    race.call(FakePromise2, [1, 2, 3]);
	  }, 'NewPromiseCapability validations, #2');
	  assert["throws"](function () {
	    race.call(FakePromise3, [1, 2, 3]);
	  }, 'NewPromiseCapability validations, #3');
	});
	if (PROTO) QUnit.test('Promise subclassing', function (assert) {
	  function SubPromise(executor) {
	    var self = new Promise(executor);
	    setPrototypeOf(self, SubPromise.prototype);
	    self.mine = 'subclass';
	    return self;
	  }

	  setPrototypeOf(SubPromise, Promise);
	  SubPromise.prototype = create(Promise.prototype);
	  SubPromise.prototype.constructor = SubPromise;
	  var promise1 = SubPromise.resolve(5);
	  assert.strictEqual(promise1.mine, 'subclass');
	  promise1 = promise1.then(function (it) {
	    assert.strictEqual(it, 5);
	  });
	  assert.strictEqual(promise1.mine, 'subclass');
	  var promise2 = new SubPromise(function (resolve) {
	    resolve(6);
	  });
	  assert.strictEqual(promise2.mine, 'subclass');
	  promise2 = promise2.then(function (it) {
	    assert.strictEqual(it, 6);
	  });
	  assert.strictEqual(promise2.mine, 'subclass');
	  var promise3 = SubPromise.all([promise1, promise2]);
	  assert.strictEqual(promise3.mine, 'subclass');
	  assert.ok(promise3 instanceof Promise);
	  assert.ok(promise3 instanceof SubPromise);
	  promise3.then(assert.async(), function (error) {
	    assert.ok(false, error);
	  });
	});

	var promise$1 = function () {
	  try {
	    return Function('return (async function () { /* empty */ })()')();
	  } catch (_unused) {
	    /* empty */
	  }
	}();

	if (promise$1 && promise$1.constructor !== Promise) QUnit.test('Native Promise, patched', function (assert) {
	  assert.isFunction(promise$1.then);
	  assert.arity(promise$1.then, 2);
	  assert.looksNative(promise$1.then);
	  assert.nonEnumerable(promise$1.constructor.prototype, 'then');

	  function empty() {
	    /* empty */
	  }

	  assert.ok(promise$1.then(empty) instanceof Promise, '`.then` returns `Promise` instance #1');
	  assert.ok(new promise$1.constructor(empty).then(empty) instanceof Promise, '`.then` returns `Promise` instance #2');
	  assert.ok(promise$1["catch"](empty) instanceof Promise, '`.catch` returns `Promise` instance #1');
	  assert.ok(new promise$1.constructor(empty)["catch"](empty) instanceof Promise, '`.catch` returns `Promise` instance #2');
	  assert.ok(promise$1["finally"](empty) instanceof Promise, '`.finally` returns `Promise` instance #1');
	  assert.ok(new promise$1.constructor(empty)["finally"](empty) instanceof Promise, '`.finally` returns `Promise` instance #2');
	});

	QUnit.test('Promise#finally', function (assert) {
	  assert.isFunction(Promise.prototype["finally"]);
	  assert.arity(Promise.prototype["finally"], 1);
	  assert.looksNative(Promise.prototype["finally"]);
	  assert.nonEnumerable(Promise.prototype, 'finally');
	  assert.ok(Promise.resolve(42)["finally"](function () {
	    /* empty */
	  }) instanceof Promise, 'returns a promise');
	});
	QUnit.asyncTest('Promise#finally, resolved', function (assert) {
	  expect(3);
	  var called = 0;
	  var argument = null;
	  Promise.resolve(42)["finally"](function (it) {
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
	  Promise.reject(42)["finally"](function (it) {
	    called++;
	    argument = it;
	  })["catch"](function () {
	    assert.same(called, 1, 'onFinally function called one time');
	    assert.same(argument, undefined, 'onFinally function called with a correct argument');
	    start();
	  });
	});

	var promise = function () {
	  try {
	    return Function('return (async function () { /* empty */ })()')();
	  } catch (_unused) {
	    /* empty */
	  }
	}();

	if (promise && promise.constructor !== Promise) QUnit.test('Native Promise, patched', function (assert) {
	  assert.isFunction(promise["finally"]);
	  assert.arity(promise["finally"], 1);
	  assert.looksNative(promise["finally"]);
	  assert.nonEnumerable(promise.constructor.prototype, 'finally');

	  function empty() {
	    /* empty */
	  }

	  assert.ok(promise["finally"](empty) instanceof Promise, '`.finally` returns `Promise` instance #1');
	  assert.ok(new promise.constructor(empty)["finally"](empty) instanceof Promise, '`.finally` returns `Promise` instance #2');
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
	  Promise.allSettled()["catch"](function () {
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
	  Promise.any([Promise.reject(1), Promise.reject(2), Promise.reject(3)])["catch"](function (error) {
	    assert.ok(error instanceof AggregateError, 'instanceof AggregateError');
	    assert.deepEqual(error.errors, [1, 2, 3], 'rejected with a correct value');
	    async();
	  });
	});
	QUnit.test('Promise.any, rejected #2', function (assert) {
	  assert.expect(1);
	  var async = assert.async();
	  Promise.any()["catch"](function () {
	    assert.ok(true, 'rejected as expected');
	    async();
	  });
	});
	QUnit.test('Promise.any, rejected #3', function (assert) {
	  assert.expect(2);
	  var async = assert.async();
	  Promise.any([])["catch"](function (error) {
	    assert.ok(error instanceof AggregateError, 'instanceof AggregateError');
	    assert.deepEqual(error.errors, [], 'rejected with a correct value');
	    async();
	  });
	});

})();
