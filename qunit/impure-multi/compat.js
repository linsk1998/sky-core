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

	function indexOf(e) {
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
		Array.prototype.indexOf = indexOf;
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

	function forEach(callback) {
		var thisArg = arguments[1];
		for(var i = 0; i < this.length; i++) {
			if(i in this) {
				callback.call(thisArg, this[i], i, this);
			}
		}
	}

	if(!Array.prototype.forEach) {
		Array.prototype.forEach = forEach;
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

	function map(fn) {
		var thisArg = arguments[1];
		var arr = [];
		for(var k = 0, length = this.length; k < length; k++) {
			arr.push(fn.call(thisArg, this[k], k, this));
		}
		return arr;
	}

	if(!Array.prototype.map) {
		Array.prototype.map = map;
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

})();
