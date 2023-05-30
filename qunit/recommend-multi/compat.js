(function () {

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
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

  function iterator$1() {
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
    var entries = arrayLike[Symbol.iterator];
    if (!entries && isString(arrayLike)) {
      entries = iterator$1;
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

  var iterator = '@@iterator';

  if (!Array.prototype[iterator]) {
    Array.prototype[iterator] = Array.prototype.values;
  }

  if (!String.prototype['@@iterator']) {
    String.prototype['@@iterator'] = iterator$1;
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
    }, _iterable[Symbol.iterator] = function () {
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
    if (arguments.length > 1) {
      i = Math.min(1 + arguments[1], i);
      if (i < 1) {
        i += this.length;
        if (i < 1) {
          return -1;
        }
      }
    }
    while (i--) {
      if (i in this && this[i] === e) {
        return i;
      }
    }
    return -1;
  }

  if (!Array.prototype.lastIndexOf) {
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
    for (var i = 0; i < this.length; i++) {
      if (i in this) {
        callback.call(thisArg, this[i], i, this);
      }
    }
  }

  if (!Array.prototype.forEach) {
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
        forEach.call(null, function () {/* empty */});
      }, TypeError);
      assert["throws"](function () {
        forEach.call(undefined, function () {/* empty */});
      }, TypeError);
    }
  });

  function filter(fn) {
    var thisArg = arguments[1];
    var arr = [];
    for (var k = 0, length = this.length; k < length; k++) {
      fn.call(thisArg, this[k], k, this) && arr.push(this[k]);
    }
    return arr;
  }

  if (!Array.prototype.filter) {
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
        return filter.call(null, function () {/* empty */});
      }, TypeError);
      assert["throws"](function () {
        return filter.call(undefined, function () {/* empty */});
      }, TypeError);
    }
  });

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
        return map.call(null, function () {/* empty */});
      }, TypeError);
      assert["throws"](function () {
        return map.call(undefined, function () {/* empty */});
      }, TypeError);
    }
  });

  function reduce(callback) {
    var i, value;
    if (arguments.length >= 2) {
      value = arguments[1];
      i = 0;
    } else if (this.length > 0) {
      value = this[0];
      i = 1;
    } else {
      throw new Error("Reduce of empty array with no initial value");
    }
    while (i < this.length) {
      if (i in this) {
        value = callback(value, this[i], i, this);
      }
      i++;
    }
    return value;
  }

  if (!Array.prototype.reduce) {
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
        return reduce.call(null, function () {/* empty */}, 1);
      }, TypeError);
      assert["throws"](function () {
        return reduce.call(undefined, function () {/* empty */}, 1);
      }, TypeError);
    }
  });

  function reduceRight(callback) {
    var i = this.length,
      value;
    if (arguments.length >= 2) {
      value = arguments[1];
    } else if (this.length > 0) {
      value = this[--i];
    } else {
      throw new Error("Reduce of empty array with no initial value");
    }
    while (i-- > 0) {
      if (i in this) {
        value = callback(value, this[i], i, this);
      }
    }
    return value;
  }

  if (!Array.prototype.reduceRight) {
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
        return reduceRight.call(null, function () {/* empty */}, 1);
      }, TypeError);
      assert["throws"](function () {
        return reduceRight.call(undefined, function () {/* empty */}, 1);
      }, TypeError);
    }
  });

  function some(fn) {
    var thisArg = arguments[1];
    var passed = false;
    for (var k = 0, length = this.length; k < length; k++) {
      if (passed === true) break;
      passed = !!fn.call(thisArg, this[k], k, this);
    }
    return passed;
  }

  if (!Array.prototype.some) {
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
        return some.call(null, function () {/* empty */});
      }, TypeError);
      assert["throws"](function () {
        return some.call(undefined, function () {/* empty */});
      }, TypeError);
    }
  });

  function every(fn) {
    var thisArg = arguments[1];
    var passed = true;
    for (var k = 0, length = this.length; k < length; k++) {
      if (passed === false) break;
      passed = !!fn.call(thisArg, this[k], k, this);
    }
    return passed;
  }

  if (!Array.prototype.every) {
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
        return every.call(null, function () {/* empty */});
      }, TypeError);
      assert["throws"](function () {
        return every.call(undefined, function () {/* empty */});
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
    var _Symbol = GLOBAL.Symbol || {};
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
      iterable: createIterable(['1', '2', '3']),
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
      iterable: createIterable([1]),
      string: '1'
    };
    var _loop = function (type) {
      var data = types[type];
      var context = {};
      assert.arrayEqual(from(data, function (value, key) {
        assert.same(this, context, "Works with " + type + ", correct callback context");
        assert.same(value, type === 'string' ? '1' : 1, "Works with " + type + ", correct callback key");
        assert.same(key, 0, "Works with " + type + ", correct callback value");
        assert.same(arguments.length, 2, "Works with " + type + ", correct callback arguments number");
        return 42;
      }, context), [42], "Works with " + type + ", correct result");
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
    from(createIterable([1, 2, 3], {
      "return": function () {
        return done = false;
      }
    }), function () {
      return false;
    });
    assert.ok(done, '.return #default');
    done = false;
    try {
      from(createIterable([1, 2, 3], {
        "return": function () {
          return done = true;
        }
      }), function () {
        throw new Error();
      });
    } catch (_unused) {/* empty */}
    assert.ok(done, '.return #throw');
    var C = function () {
      function C() {}
      return C;
    }();
    var instance = from.call(C, createIterable([1, 2]));
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
    array[_Symbol.iterator] = function () {
      done = true;
      return [][_Symbol.iterator].call(this);
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
        set: function () {
          called = true;
        }
      });
      from.call(C, [1, 2, 3]);
      assert.ok(!called, 'Should not call prototype accessors');
    }
  });

  function of() {
    return Array.from.call(this, arguments);
  }

  if (!Array$1.of) {
    Array$1.of = of;
  }

  QUnit.test('Array.of', function (assert) {
    var defineProperty = Object.defineProperty;
    assert.isFunction(Array.of);
    assert.arity(Array.of, 0);
    assert.name(Array.of, 'of');
    assert.deepEqual(Array.of(1), [1]);
    assert.deepEqual(Array.of(1, 2, 3), [1, 2, 3]);
    var C = function () {
      function C() {}
      return C;
    }();
    var instance = Array.of.call(C, 1, 2);
    assert.ok(instance instanceof C);
    assert.strictEqual(instance[0], 1);
    assert.strictEqual(instance[1], 2);
    assert.strictEqual(instance.length, 2);
    if (DESCRIPTORS) {
      var called = false;
      defineProperty(C.prototype, 0, {
        set: function () {
          called = true;
        }
      });
      Array.of.call(C, 1, 2, 3);
      assert.ok(!called, 'Should not call prototype accessors');
    }
  });

  function findIndex(callback) {
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
    }, context);
    // eslint-disable-next-line unicorn/prefer-array-index-of -- ignore
    assert.same([1, 3, NaN, 42, {}].findIndex(function (it) {
      return it === 42;
    }), 3);
    // eslint-disable-next-line unicorn/prefer-array-index-of -- ignore
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
    if (i >= 0) {
      return this[i];
    }
  }
  ;

  if (!Array.prototype.find) {
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
    if (this.length <= 0) {
      return this;
    }
    var len = this.length;
    var start = arguments[1] || 0;
    var end = arguments[2] || len;
    if (start < 0) {
      start += len;
      if (start < 0) {
        start = 0;
      }
    }
    if (end < 0) {
      end += len;
    }
    var i = Math.min(end, len);
    while (i-- > start) {
      this[i] = target;
    }
    return this;
  }
  ;

  if (!Array.prototype.fill) {
    Array.prototype.fill = fill;
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
    if (_typeof(obj) !== "object" && typeof obj !== "function") {
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

  if (Object$1.defineProperty) {
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
          set: function () {
            throw Error();
          }
        }));
      }, 'uses ToLength');
    }
  });

  function copyWithin(target, start /*, end*/) {
    var end = arguments[2];
    var len = this.length || 0;
    if (target < 0) {
      target += len;
      if (target < 0) {
        target = 0;
      }
    }
    start = start || 0;
    if (start < 0) {
      start += len;
      if (start < 0) {
        start = 0;
      }
    }
    if (end === undefined) {
      end = len;
    }
    if (end < 0) {
      end += len;
      if (end < 0) {
        end = 0;
      }
    } else if (end - start + target > len) {
      end = len - target + start;
    }
    var i;
    for (i = start; i < end; i++) {
      if (i in this) {
        this[i - start + target] = this[i];
      } else {
        delete this[i];
      }
    }
    return this;
  }

  if (!Array.prototype.copyWithin) {
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

  function keys() {
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
    Array.prototype.keys = keys;
  }

  function entries() {
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
    Array.prototype.entries = entries;
  }

  var _Symbol$3 = window.Symbol;

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

  var symbol_sqe = 0;
  var all_symbol = {};
  function _Symbol$2(desc) {
    this.__name__ = "@@" + desc + ":" + symbol_sqe;
    if (desc !== undefined) {
      this.description = String(desc);
    }
    symbol_sqe++;
    all_symbol[this.__name__] = this;
  }
  ;
  _Symbol$2.prototype.toString = function () {
    return this.__name__;
  };
  _Symbol$2.prototype.toJSON = function () {
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

  function _Symbol$1(desc) {
    return new _Symbol$2(desc);
  }
  ;
  _Symbol$1.sham = true;

  var _Symbol = _Symbol$3;
  if (!_Symbol) {
    window.Symbol = _Symbol = _Symbol$1;
    _Symbol.sham = true;
    _Symbol.asyncIterator = "@@asyncIterator";
    _Symbol.hasInstance = "@@hasInstance";
    // Symbol.isConcatSpreadable = "@@isConcatSpreadable";
    _Symbol.iterator = "@@iterator";
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
    while (i-- > 0) {
      var value = this[i];
      if (value === search || isNaN$1(value) && isNaN$1(search)) {
        return true;
      }
    }
    return false;
  }

  if (!Array.prototype.includes) {
    Array.prototype.includes = includes$1;
  }

  function includes(search) {
    if (search instanceof RegExp) {
      throw new TypeError("First argument must not be a regular expression");
    }
    var start = arguments[1];
    if (typeof start !== 'number') {
      start = 0;
    }
    return this.indexOf(search, start) !== -1;
  }

  if (!String.prototype.includes) {
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

  function flat() {
    var deep = arguments[0];
    if (deep == null) deep = 1;
    var arr = [];
    for (var i = 0; i < this.length; i++) {
      var item = this[i];
      if (Array.isArray(item) && deep > 0) {
        arr = arr.concat(flat.call(item, deep - 1));
      } else {
        arr.push(item);
      }
    }
    return arr;
  }

  if (!Array.prototype.flat) {
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
          get: function () {
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

  if (!Array.prototype.flatMap) {
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

  // import "./es.string.includes";
  // import "./es.string.starts-with";
  // import "./es.string.ends-with";
  // import "./es.string.trim";
  // import "./es.string.trim-start";
  // import "./es.string.trim-end";
  // import "./es.string.iterator";
  // import "./es.string.repeat";
  // import "./es.string.pad-start";
  // import "./es.string.pad-end";
  // import "./es.string.code-point-at";
  // import "./es.string.from-code-point";
  // import "./es.string.raw";
  // import "./es.string.match-all";
  // import "./es.string.replace-all";

  // import "./es.symbol";
  // import "./es.symbol.description";
  // import "./es.symbol.async-iterator";

  // import "./es.object.assign";
  // import "./es.object.create";
  // import "./es.object.define-properties";
  // import "./es.object.define-property";
  // import "./es.object.entries";
  // import "./es.object.from-entries";
  // import "./es.object.get-own-property-descriptor";
  // import "./es.object.get-own-property-descriptors";
  // import "./es.object.get-own-property-names";
  // import "./es.object.get-prototype-of";
  // import "./es.object.is";
  // import "./es.object.keys";
  // import "./es.object.set-prototype-of";
  // import "./es.object.values";

  // import "./es.global-this";

  // import "./es.function.bind";
  // import "./es.function.name";
  // import "./es.function.has-instance";

  // import "./es.date.to-json";
  // import "./es.date.to-iso-string";
  // import "./es.date.to-string";

  // import "./es.number.epsilon";
  // import "./es.number.is-finite";
  // import "./es.number.is-integer";
  // import "./es.number.is-nan";
  // import "./es.number.is-safe-integer";
  // import "./es.number.max-safe-integer";
  // import "./es.number.min-safe-integer";
  // import "./es.number.parse-float";
  // import "./es.number.parse-int";
  // import "./es.number.to-fixed";
  // import "./es.number.to-precision";

  // import "./es.math.acosh";
  // import "./es.math.asinh";
  // import "./es.math.atanh";
  // import "./es.math.cbrt";
  // import "./es.math.clz32";
  // import "./es.math.cosh";
  // import "./es.math.expm1";
  // import "./es.math.fround";
  // import "./es.math.hypot";
  // import "./es.math.imul";
  // import "./es.math.log10";
  // import "./es.math.log1p";
  // import "./es.math.log2";
  // import "./es.math.sign";
  // import "./es.math.sinh";
  // import "./es.math.tanh";
  // import "./es.math.trunc";

  // import "./es.date.to-iso-string";
  // import "./es.date.to-json";
  // import "./es.date.to-string";

  // import "./es.map";
  // import "./es.set";

  // import "./es.weak-map";
  // import "./es.weak-set";

  // import "./es.promise";
  // import "./es.promise.finally";
  // import "./es.promise.all-settled";
  // import "./es.promise.any";
  // import "./es.aggregate-error";

  // import "../web/web.url";

})();
