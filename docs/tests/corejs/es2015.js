(function () {

	var DESCRIPTORS = !!(() => {
	  return !!Object.defineProperties || !!Object.prototype.__defineSetter__;
	})();
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
	var LITTLE_ENDIAN = (() => {
	  try {
	    return new GLOBAL.Uint8Array(new GLOBAL.Uint16Array([1]).buffer)[0] === 1;
	  } catch (_unused) {
	    return true;
	  }
	})();
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
	  function F() {/* empty */}
	  F.prototype.constructor = null;
	  try {
	    return Object.getPrototypeOf(new F()) !== F.prototype;
	  } catch (_unused3) {
	    return true;
	  }
	}();
	var WHITESPACES = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

	function createIterator(elements, methods) {
	  let index = 0;
	  const iterator = {
	    called: false,
	    next: function () {
	      iterator.called = true;
	      return {
	        value: elements[index++],
	        done: index > elements.length
	      };
	    }
	  };
	  if (methods) for (const key in methods) iterator[key] = methods[key];
	  return iterator;
	}
	function createIterable(elements, methods) {
	  const iterable = {
	    called: false,
	    received: false,
	    [Symbol.iterator]() {
	      iterable.received = true;
	      let index = 0;
	      const iterator = {
	        next: function () {
	          iterable.called = true;
	          return {
	            value: elements[index++],
	            done: index > elements.length
	          };
	        }
	      };
	      if (methods) for (const key in methods) iterator[key] = methods[key];
	      return iterator;
	    }
	  };
	  return iterable;
	}
	function includes$2(target, wanted) {
	  for (const element of target) if (wanted === element) return true;
	  return false;
	}
	function is(a, b) {
	  // eslint-disable-next-line no-self-compare -- NaN check
	  return a === b ? a !== 0 || 1 / a === 1 / b : a != a && b != b;
	}
	const nativeSubclass = (() => {
	  try {
	    if (Function(`
'use strict';
class Subclass extends Object { /* empty */ };
return new Subclass() instanceof Subclass;
		`)()) return Function('Parent', `
'use strict';
return class extends Parent { /* empty */ };
		`);
	  } catch (_unused) {/* empty */}
	})();

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

	function fromSource(source) {
	  try {
	    return Function(`return ${source}`)();
	  } catch (_unused2) {/* empty */}
	}
	function bufferToArray(buffer) {
	  const array = [];
	  const view = new DataView(buffer);
	  for (let i = 0, {
	      byteLength
	    } = view; i < byteLength; ++i) {
	    array.push(view.getUint8(i));
	  }
	  return array;
	}

	function isIterable(it) {
	  var O = Object(it);
	  return Symbol.iterator in O;
	}
	const {
	  toString: toString$1,
	  propertyIsEnumerable
	} = Object.prototype;
	GLOBAL.USE_FUNCTION_CONSTRUCTOR = true;
	QUnit.assert.pushResult = function (options) {
	  return QUnit.push(options.result, options.actual, options.expected, options.message);
	};
	QUnit.assert.arity = function (fn, length, message) {
	  this.pushResult({
	    result: fn.length === length,
	    actual: fn.length,
	    expected: length,
	    message: message || `arity is ${length}`
	  });
	};
	QUnit.assert.arrayEqual = function (a, b, message) {
	  let result = true;
	  if (a.length !== b.length) {
	    result = false;
	  } else {
	    for (let i = 0, {
	        length
	      } = a; i < length; ++i) {
	      if (!is(a[i], b[i])) {
	        result = false;
	        break;
	      }
	    }
	  }
	  this.pushResult({
	    result,
	    actual: [].slice.call(a),
	    expected: [].slice.call(b),
	    message
	  });
	};
	QUnit.assert.epsilon = function (a, b, E, message) {
	  this.pushResult({
	    result: Math.abs(a - b) <= (E != null ? E : 1e-11),
	    actual: a,
	    expected: b,
	    message
	  });
	};
	QUnit.assert.isFunction = function (fn, message) {
	  this.pushResult({
	    result: typeof fn === 'function' || toString$1.call(fn).slice(8, -1) === 'Function',
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
	    result: typeof it === 'object' && typeof it.next === 'function',
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
	      message: message || `name is '${name}'`
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
	      message: message || `${typeof key === 'symbol' ? 'method' : `'${key}'`} is enumerable`
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
	  if (DESCRIPTORS) {
	    this.pushResult({
	      result: !propertyIsEnumerable.call(O, key),
	      actual: false,
	      expected: true,
	      message: message || `${typeof key === 'symbol' ? 'method' : `'${key}'`} is non-enumerable`
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
	  let throws, result, error;
	  try {
	    result = fn();
	    throws = false;
	  } catch (err) {
	    throws = true;
	    error = err;
	  }
	  this.pushResult({
	    result: !throws && result,
	    actual: throws ? error : result,
	    expected: throws ? undefined : true,
	    message: message || 'does not throw'
	  });
	};
	QUnit.assert.same = function (a, b, message) {
	  this.pushResult({
	    result: is(a, b),
	    actual: a,
	    expected: b,
	    message
	  });
	};
	QUnit.assert.notSame = function (a, b, message) {
	  this.pushResult({
	    result: !is(a, b),
	    actual: a,
	    expected: b,
	    message
	  });
	};

	var Object$1 = window.Object;

	var defineProperties = Object$1.defineProperties;

	var accessor = !!defineProperties || !!Object.prototype.__defineSetter__;

	if(accessor) {
		if(!('name' in Function.prototype)) {
			Object.defineProperty(Function.prototype, 'name', {
				enumerable: false, configurable: true,
				get: function() {
					return Function.prototype.toString.call(this).match(/function\s*([^(]*)\(/)[1];
				}
			});
		}
	}

	QUnit.test('Array#slice', assert => {
	  const slice = Array.prototype.slice;
	  const isArray = Array.isArray;
	  assert.isFunction(slice);
	  assert.arity(slice, 2);
	  assert.name(slice, 'slice');
	  assert.looksNative(slice);
	  assert.nonEnumerable(Array.prototype, 'slice');
	  let array = ['1', '2', '3', '4', '5'];
	  assert.deepEqual(array.slice(), array);
	  assert.deepEqual(array.slice(1, 3), ['2', '3']);
	  assert.deepEqual(array.slice(1), ['2', '3', '4', '5']);
	  assert.deepEqual(array.slice(1, undefined), ['2', '3', '4', '5']);
	  assert.deepEqual(array.slice(1, -1), ['2', '3', '4']);
	  assert.deepEqual(array.slice(-2, -1), ['4']);
	  assert.deepEqual(array.slice(-2, -3), []);
	  // const string = '12345';
	  // assert.deepEqual(slice.call(string), array);
	  // assert.deepEqual(slice.call(string, 1, 3), ['2', '3']);
	  // assert.deepEqual(slice.call(string, 1, undefined), ['2', '3', '4', '5']);
	  // assert.deepEqual(slice.call(string, 1, -1), ['2', '3', '4']);
	  // assert.deepEqual(slice.call(string, -2, -1), ['4']);
	  // assert.deepEqual(slice.call(string, -2, -3), []);
	  assert.notThrows(() => isArray(slice.call(arguments)), 'works on arguments');
	  const list = GLOBAL.document && document.body && document.body.childNodes;
	  if (list) {
	    assert.notThrows(() => isArray(slice.call(list)), 'works on NodeList');
	  }
	  if (STRICT) {
	    assert.throws(() => slice.call(null), TypeError);
	    assert.throws(() => slice.call(undefined), TypeError);
	  }
	  // array = [];
	  // // eslint-disable-next-line object-shorthand -- constructor
	  // array.constructor = {
	  //   [Symbol.species]: function() {
	  //     return { foo: 1 };
	  //   }
	  // };
	  // assert.same(array.slice().foo, 1, '@@species');
	});

	QUnit.test('Array#splice', assert => {
	  const splice = Array.prototype.splice;
	  assert.isFunction(splice);
	  assert.arity(splice, 2);
	  assert.name(splice, 'splice');
	  assert.looksNative(splice);
	  assert.nonEnumerable(Array.prototype, 'splice');
	  let array = [1, 2, 3, 4, 5];
	  assert.deepEqual(array.splice(2), [3, 4, 5]);
	  assert.deepEqual(array, [1, 2]);
	  array = [1, 2, 3, 4, 5];
	  assert.deepEqual(array.splice(-2), [4, 5]);
	  assert.deepEqual(array, [1, 2, 3]);
	  array = [1, 2, 3, 4, 5];
	  assert.deepEqual(array.splice(2, 2), [3, 4]);
	  assert.deepEqual(array, [1, 2, 5]);
	  array = [1, 2, 3, 4, 5];
	  assert.deepEqual(array.splice(2, -2), []);
	  assert.deepEqual(array, [1, 2, 3, 4, 5]);
	  array = [1, 2, 3, 4, 5];
	  assert.deepEqual(array.splice(2, 2, 6, 7), [3, 4]);
	  assert.deepEqual(array, [1, 2, 6, 7, 5]);
	  if (STRICT) {
	    assert.throws(() => splice.call(null), TypeError);
	    assert.throws(() => splice.call(undefined), TypeError);
	  }
	  // array = [];
	  // // eslint-disable-next-line object-shorthand -- constructor
	  // array.constructor = { [Symbol.species]: function () {
	  //   return { foo: 1 };
	  // } };
	  // assert.same(array.splice().foo, 1, '@@species');
	});

	var slice$1 = String.prototype['slice'];

	function repeat(count) {
		if(this == null) {
			throw new TypeError("repeat called on null or undefined");
		}
		if(count < 0) {
			throw new RangeError("RangeError repeat count must be non-negative");
		}
		if(count === Number.POSITIVE_INFINITY) {
			throw new RangeError("RangeError repeat count must be less than infinity");
		}
		count = Math.floor(count);
		if(isNaN(count)) return "";
		return new Array(count + 1).join(this);
	}

	function toInteger(n) {
		return isNaN(n = +n) ? 0 : (n > 0 ? Math.floor : Math.ceil)(n);
	}

	// from core-js

	function pow(x, n, acc) {
		return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
	}

	function log(x) {
		var n = 0;
		var x2 = x;
		while(x2 >= 4096) {
			n += 12;
			x2 /= 4096;
		}
		while(x2 >= 2) {
			n += 1;
			x2 /= 2;
		} return n;
	}

	function multiply(data, n, c) {
		var index = -1;
		var c2 = c;
		while(++index < 6) {
			c2 += n * data[index];
			data[index] = c2 % 1e7;
			c2 = Math.floor(c2 / 1e7);
		}
	}

	function divide(data, n) {
		var index = 6;
		var c = 0;
		while(--index >= 0) {
			c += data[index];
			data[index] = Math.floor(c / n);
			c = (c % n) * 1e7;
		}
	}

	function dataToString(data) {
		var index = 6;
		var s = '';
		while(--index >= 0) {
			if(s !== '' || index === 0 || data[index] !== 0) {
				var t = String(data[index]);
				s = s === '' ? t : s + repeat.call('0', 7 - t.length) + t;
			}
		} return s;
	}

	function toFixed(fractionDigits) {
		var number = this;
		var fractDigits = toInteger(fractionDigits);
		var data = [0, 0, 0, 0, 0, 0];
		var sign = '';
		var result = '0';
		var e, z, j, k;

		if(fractDigits < 0 || fractDigits > 20) throw RangeError('Incorrect fraction digits');
		// eslint-disable-next-line no-self-compare -- NaN check
		if(isNaN(number)) return 'NaN';
		if(number <= -1e21 || number >= 1e21) return String(number);
		if(number < 0) {
			sign = '-';
			number = -number;
		}
		if(number > 1e-21) {
			e = log(number * pow(2, 69, 1)) - 69;
			z = e < 0 ? number * pow(2, -e, 1) : number / pow(2, e, 1);
			z *= 0x10000000000000;
			e = 52 - e;
			if(e > 0) {
				multiply(data, 0, z);
				j = fractDigits;
				while(j >= 7) {
					multiply(data, 1e7, 0);
					j -= 7;
				}
				multiply(data, pow(10, j, 1), 0);
				j = e - 1;
				while(j >= 23) {
					divide(data, 1 << 23);
					j -= 23;
				}
				divide(data, 1 << j);
				multiply(data, 1, 1);
				divide(data, 2);
				result = dataToString(data);
			} else {
				multiply(data, 0, z);
				multiply(data, 1 << -e, 0);
				result = dataToString(data) + repeat.call('0', fractDigits);
			}
		}
		if(fractDigits > 0) {
			k = result.length;
			result = sign + (k <= fractDigits
				? '0.' + repeat.call('0', fractDigits - k) + result
				: slice$1.call(result, 0, k - fractDigits) + '.' + slice$1.call(result, k - fractDigits));
		} else {
			result = sign + result;
		} return result;
	}

	// from core-js
	var native = Number.prototype['toFixed'];
	if(native.call(0.00008, 3) !== '0.000' ||
		native.call(0.9, 3) !== '1' ||
		native.call(1.255, 3) !== '1.25' ||
		native.call(1000000000000000128.0, 0) !== '1000000000000000128'
	) {
		Number.prototype['toFixed'] = toFixed;
	}

	QUnit.test('Number#toFixed', assert => {
	  const toFixed = Number.prototype.toFixed;
	  assert.isFunction(toFixed);
	  // assert.name(toFixed, 'toFixed');
	  assert.arity(toFixed, 1);
	  assert.looksNative(toFixed);
	  assert.nonEnumerable(Number.prototype, 'toFixed');
	  assert.same(0.00008.toFixed(3), '0.000');
	  assert.same(0.9.toFixed(0), '1');
	  assert.same(1.255.toFixed(2), '1.25');
	  assert.same(1843654265.0774949.toFixed(5), '1843654265.07749');
	  assert.same(1000000000000000128.0.toFixed(0), '1000000000000000128');
	  assert.same(1 .toFixed(), '1');
	  assert.same(1 .toFixed(0), '1');
	  assert.same(1 .toFixed(1), '1.0');
	  assert.same(1 .toFixed(1.1), '1.0');
	  assert.same(1 .toFixed(0.9), '1');
	  assert.same(1 .toFixed('0'), '1');
	  assert.same(1 .toFixed('1'), '1.0');
	  assert.same(1 .toFixed('1.1'), '1.0');
	  assert.same(1 .toFixed('0.9'), '1');
	  assert.same(1 .toFixed(NaN), '1');
	  assert.same(1 .toFixed('some string'), '1');
	  assert.notThrows(() => toFixed.call(1, -0.1) === '1');
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
	  assert.notThrows(() => new Number(1).toFixed(-0.1) === '1');
	  assert.same(NaN.toFixed(), 'NaN', 'NaN');
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
	  assert.notThrows(() => NaN.toFixed(-0.1) === 'NaN');
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
	  assert.notThrows(() => new Number(1e21).toFixed(-0.1) === String(1e21));
	  assert.throws(() => 1.0.toFixed(-101), RangeError, 'If f < 0 or f > 20, throw a RangeError exception.');
	  assert.throws(() => 1.0.toFixed(101), RangeError, 'If f < 0 or f > 20, throw a RangeError exception.');
	  assert.throws(() => NaN.toFixed(Infinity), RangeError, 'If f < 0 or f > 20, throw a RangeError exception.');
	  // assert.throws(() => toFixed.call({}, 1), TypeError, '? thisNumberValue(this value)');
	  // assert.throws(() => toFixed.call('123', 1), TypeError, '? thisNumberValue(this value)');
	  // assert.throws(() => toFixed.call(false, 1), TypeError, '? thisNumberValue(this value)');
	  // assert.throws(() => toFixed.call(null, 1), TypeError, '? thisNumberValue(this value)');
	  // assert.throws(() => toFixed.call(undefined, 1), TypeError, '? thisNumberValue(this value)');
	});

	QUnit.test('Number#toPrecision', assert => {
	  const toPrecision = Number.prototype.toPrecision;
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
	  // assert.same(123.456.toPrecision(undefined), '123.456', 'If precision is undefined, return ! ToString(x).');
	  assert.throws(() => 0.9.toPrecision(0), RangeError, 'If p < 1 or p > 21, throw a RangeError exception.');
	  assert.throws(() => 0.9.toPrecision(101), RangeError, 'If p < 1 or p > 21, throw a RangeError exception.');
	  assert.throws(() => toPrecision.call({}, 1), TypeError, '? thisNumberValue(this value)');
	  assert.throws(() => toPrecision.call('123', 1), TypeError, '? thisNumberValue(this value)');
	  assert.throws(() => toPrecision.call(false, 1), TypeError, '? thisNumberValue(this value)');
	  assert.throws(() => toPrecision.call(null, 1), TypeError, '? thisNumberValue(this value)');
	  assert.throws(() => toPrecision.call(undefined, 1), TypeError, '? thisNumberValue(this value)');
	});

	var Date$1 = window.Date;

	function definePrototype(target, property, value) {
		var prototype = target.prototype;
		if(!(property in prototype)) {
			Object.defineProperty(prototype, property, {
				configurable: true,
				writable: true,
				enumerable: false,
				value: value
			});
		}
	}

	function prefixIntrger2(number) {
		if(number<10){
			return '0'+number;
		}
		return number;
	};

	function prefixIntrger3(number) {
		if(number<100){
			return '0'+prefixIntrger2(number);
		}
		return number;
	};

	definePrototype(Date$1, 'toISOString', function() {
		var time = this.getTime();
		if(isNaN(time)) {
			throw new RangeError("Invalid time value");
		}
		return this.getUTCFullYear() +
			'-' + prefixIntrger2(this.getUTCMonth() + 1) +
			'-' + prefixIntrger2(this.getUTCDate()) +
			'T' + prefixIntrger2(this.getUTCHours()) +
			':' + prefixIntrger2(this.getUTCMinutes()) +
			':' + prefixIntrger2(this.getUTCSeconds()) +
			'.' + prefixIntrger3(this.getUTCMilliseconds()) + 'Z';
	});

	var k = 'toJSON', p = Date$1.prototype;
	if(!(k in p) || new Date$1(0)[k]() !== '1970-01-01T00:00:00.000Z') {
		p[k] = function(_) {
			if(this.getTime && isNaN(this.getTime())) {
				return null;
			}
			return this.toISOString();
		};
	}

	QUnit.test('Date#toJSON', assert => {
	  const toJSON = Date.prototype.toJSON;
	  assert.isFunction(toJSON);
	  // assert.arity(toJSON, 1);
	  assert.name(toJSON, 'toJSON');
	  assert.looksNative(toJSON);
	  assert.nonEnumerable(Date.prototype, 'toJSON');
	  const date = new Date();
	  assert.same(date.toJSON(), date.toISOString(), 'base');
	  assert.same(new Date(NaN).toJSON(), null, 'not finite');
	  assert.same(toJSON.call({
	    toISOString() {
	      return 42;
	    }
	  }), 42, 'generic');
	});

	QUnit.test('Date#toISOString', assert => {
	  const toISOString = Date.prototype.toISOString;
	  assert.isFunction(toISOString);
	  assert.name(toISOString, 'toISOString');
	  assert.looksNative(toISOString);
	  assert.nonEnumerable(Date.prototype, 'toISOString');
	  // assert.strictEqual(new Date(0).toISOString(), '1970-01-01T00:00:00.000Z');
	  // assert.strictEqual(new Date(1e12 + 1).toISOString(), '2001-09-09T01:46:40.001Z');
	  // assert.strictEqual(new Date(-5e13 - 1).toISOString(), '0385-07-25T07:06:39.999Z');
	  const future = new Date(1e15 + 1).toISOString();
	  assert.ok(future === '+033658-09-27T01:46:40.001Z' || future === '33658-09-27T01:46:40.001Z');
	  const prehistoric = new Date(-1e15 + 1).toISOString();
	  assert.ok(prehistoric === '-029719-04-05T22:13:20.001Z' || prehistoric === '-29719-04-05T22:13:20.001Z');
	  // assert.throws(() => new Date(NaN).toISOString(), RangeError);
	});

	QUnit.test('Date#toString', assert => {
	  const toString = Date.prototype.toString;
	  assert.isFunction(toString);
	  assert.arity(toString, 0);
	  assert.name(toString, 'toString');
	  assert.looksNative(toString);
	  assert.nonEnumerable(Date.prototype, 'toString');
	  // assert.same(String(new Date(NaN)), 'Invalid Date');
	});

	QUnit.test('Array#indexOf', assert => {
	  const indexOf = Array.prototype.indexOf;
	  assert.isFunction(indexOf);
	  assert.arity(indexOf, 1);
	  assert.name(indexOf, 'indexOf');
	  assert.nonEnumerable(Array.prototype, 'indexOf');
	  assert.same(0, [1, 1, 1].indexOf(1));
	  assert.same(-1, [1, 2, 3].indexOf(1, 1));
	  assert.same(1, [1, 2, 3].indexOf(2, 1));
	  assert.same(-1, [1, 2, 3].indexOf(2, -1));
	  assert.same(1, [1, 2, 3].indexOf(2, -2));
	  assert.same(-1, [NaN].indexOf(NaN));
	  assert.same(3, Array(2).concat([1, 2, 3]).indexOf(2));
	  assert.same(-1, Array(1).indexOf(undefined));
	  // assert.same(0, [1].indexOf(1, -0), "shouldn't return negative zero");
	  if (STRICT) {
	    assert.throws(() => indexOf.call(null, 0), TypeError);
	    assert.throws(() => indexOf.call(undefined, 0), TypeError);
	  }
	});

	QUnit.test('Array#lastIndexOf', assert => {
	  const lastIndexOf = Array.prototype.lastIndexOf;
	  assert.isFunction(lastIndexOf);
	  assert.arity(lastIndexOf, 1);
	  assert.name(lastIndexOf, 'lastIndexOf');
	  assert.nonEnumerable(Array.prototype, 'lastIndexOf');
	  assert.same(2, [1, 1, 1].lastIndexOf(1));
	  assert.same(-1, [1, 2, 3].lastIndexOf(3, 1));
	  assert.same(1, [1, 2, 3].lastIndexOf(2, 1));
	  assert.same(-1, [1, 2, 3].lastIndexOf(2, -3));
	  assert.same(-1, [1, 2, 3].lastIndexOf(1, -4));
	  assert.same(1, [1, 2, 3].lastIndexOf(2, -2));
	  assert.same(-1, [NaN].lastIndexOf(NaN));
	  assert.same(1, [1, 2, 3].concat(Array(2)).lastIndexOf(2));
	  // assert.same(0, [1].lastIndexOf(1, -0), "shouldn't return negative zero");
	  if (STRICT) {
	    assert.throws(() => lastIndexOf.call(null, 0), TypeError);
	    assert.throws(() => lastIndexOf.call(undefined, 0), TypeError);
	  }
	});

	QUnit.test('Array#forEach', assert => {
	  const forEach = Array.prototype.forEach;
	  assert.isFunction(forEach);
	  assert.arity(forEach, 1);
	  assert.name(forEach, 'forEach');
	  assert.looksNative(forEach);
	  assert.nonEnumerable(Array.prototype, 'forEach');
	  let array = [1];
	  const context = {};
	  array.forEach(function (value, key, that) {
	    assert.same(arguments.length, 3, 'correct number of callback arguments');
	    assert.same(value, 1, 'correct value in callback');
	    assert.same(key, 0, 'correct index in callback');
	    assert.same(that, array, 'correct link to array in callback');
	    assert.same(this, context, 'correct callback context');
	  }, context);
	  let result = '';
	  [1, 2, 3].forEach(value => {
	    result += value;
	  });
	  assert.ok(result === '123');
	  result = '';
	  [1, 2, 3].forEach((value, key) => {
	    result += key;
	  });
	  assert.ok(result === '012');
	  result = '';
	  [1, 2, 3].forEach((value, key, that) => {
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
	  array.forEach((value, key) => {
	    result += key;
	  });
	  assert.ok(result === '5');
	  if (STRICT) {
	    assert.throws(() => {
	      forEach.call(null, () => {/* empty */});
	    }, TypeError);
	    assert.throws(() => {
	      forEach.call(undefined, () => {/* empty */});
	    }, TypeError);
	  }
	});

	QUnit.test('Array#filter', assert => {
	  const filter = Array.prototype.filter;
	  assert.isFunction(filter);
	  assert.arity(filter, 1);
	  assert.name(filter, 'filter');
	  assert.nonEnumerable(Array.prototype, 'filter');
	  let array = [1];
	  const context = {};
	  array.filter(function (value, key, that) {
	    assert.same(arguments.length, 3, 'correct number of callback arguments');
	    assert.same(value, 1, 'correct value in callback');
	    assert.same(key, 0, 'correct index in callback');
	    assert.same(that, array, 'correct link to array in callback');
	    assert.same(this, context, 'correct callback context');
	  }, context);
	  assert.deepEqual([1, 2, 3, 4, 5], [1, 2, 3, 'q', {}, 4, true, 5].filter(it => typeof it === 'number'));
	  if (STRICT) {
	    assert.throws(() => filter.call(null, () => {/* empty */}), TypeError);
	    assert.throws(() => filter.call(undefined, () => {/* empty */}), TypeError);
	  }
	});

	QUnit.test('Array#map', assert => {
	  const map = Array.prototype.map;
	  assert.isFunction(map);
	  assert.arity(map, 1);
	  assert.name(map, 'map');
	  assert.looksNative(map);
	  assert.nonEnumerable(Array.prototype, 'map');
	  let array = [1];
	  const context = {};
	  array.map(function (value, key, that) {
	    assert.same(arguments.length, 3, 'correct number of callback arguments');
	    assert.same(value, 1, 'correct value in callback');
	    assert.same(key, 0, 'correct index in callback');
	    assert.same(that, array, 'correct link to array in callback');
	    assert.same(this, context, 'correct callback context');
	  }, context);
	  assert.deepEqual([2, 3, 4], [1, 2, 3].map(value => value + 1));
	  assert.deepEqual([1, 3, 5], [1, 2, 3].map((value, key) => value + key));
	  assert.deepEqual([2, 2, 2], [1, 2, 3].map(function () {
	    return +this;
	  }, 2));
	  if (STRICT) {
	    assert.throws(() => map.call(null, () => {/* empty */}), TypeError);
	    assert.throws(() => map.call(undefined, () => {/* empty */}), TypeError);
	  }
	});

	QUnit.test('Array#some', assert => {
	  const some = Array.prototype.some;
	  assert.isFunction(some);
	  assert.arity(some, 1);
	  assert.name(some, 'some');
	  assert.looksNative(some);
	  assert.nonEnumerable(Array.prototype, 'some');
	  let array = [1];
	  const context = {};
	  array.some(function (value, key, that) {
	    assert.same(arguments.length, 3, 'correct number of callback arguments');
	    assert.same(value, 1, 'correct value in callback');
	    assert.same(key, 0, 'correct index in callback');
	    assert.same(that, array, 'correct link to array in callback');
	    assert.same(this, context, 'correct callback context');
	  }, context);
	  assert.ok([1, '2', 3].some(value => typeof value === 'number'));
	  assert.ok([1, 2, 3].some(value => value < 3));
	  assert.ok(![1, 2, 3].some(value => value < 0));
	  assert.ok(![1, 2, 3].some(value => typeof value === 'string'));
	  assert.ok(![1, 2, 3].some(function () {
	    return +this !== 1;
	  }, 1));
	  let result = '';
	  [1, 2, 3].some((value, key) => {
	    result += key;
	    return false;
	  });
	  assert.ok(result === '012');
	  array = [1, 2, 3];
	  assert.ok(!array.some((value, key, that) => that !== array));
	  if (STRICT) {
	    assert.throws(() => some.call(null, () => {/* empty */}), TypeError);
	    assert.throws(() => some.call(undefined, () => {/* empty */}), TypeError);
	  }
	});

	QUnit.test('Array#every', assert => {
	  const every = Array.prototype.every;
	  assert.isFunction(every);
	  assert.arity(every, 1);
	  assert.name(every, 'every');
	  assert.looksNative(every);
	  assert.nonEnumerable(Array.prototype, 'every');
	  let array = [1];
	  const context = {};
	  array.every(function (value, key, that) {
	    assert.same(arguments.length, 3, 'correct number of callback arguments');
	    assert.same(value, 1, 'correct value in callback');
	    assert.same(key, 0, 'correct index in callback');
	    assert.same(that, array, 'correct link to array in callback');
	    assert.same(this, context, 'correct callback context');
	  }, context);
	  assert.ok([1, 2, 3].every(it => typeof it === 'number'));
	  assert.ok([1, 2, 3].every(it => it < 4));
	  assert.ok(![1, 2, 3].every(it => it < 3));
	  assert.ok(![1, 2, 3].every(it => typeof it === 'string'));
	  assert.ok([1, 2, 3].every(function () {
	    return +this === 1;
	  }, 1));
	  let result = '';
	  [1, 2, 3].every((value, key) => result += key);
	  assert.ok(result === '012');
	  array = [1, 2, 3];
	  assert.ok(array.every((value, key, that) => that === array));
	  if (STRICT) {
	    assert.throws(() => every.call(null, () => {/* empty */}), TypeError);
	    assert.throws(() => every.call(undefined, () => {/* empty */}), TypeError);
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

	definePrototype(Array, 'reduce', reduce);

	QUnit.test('Array#reduce', assert => {
	  const reduce = Array.prototype.reduce;
	  assert.isFunction(reduce);
	  assert.arity(reduce, 1);
	  assert.name(reduce, 'reduce');
	  assert.looksNative(reduce);
	  assert.nonEnumerable(Array.prototype, 'reduce');
	  const array = [1];
	  const accumulator = {};
	  array.reduce(function (memo, value, key, that) {
	    assert.same(arguments.length, 4, 'correct number of callback arguments');
	    assert.same(memo, accumulator, 'correct callback accumulator');
	    assert.same(value, 1, 'correct value in callback');
	    assert.same(key, 0, 'correct index in callback');
	    assert.same(that, array, 'correct link to array in callback');
	  }, accumulator);
	  assert.same([1, 2, 3].reduce((a, b) => a + b, 1), 7, 'works with initial accumulator');
	  [1, 2].reduce((memo, value, key) => {
	    assert.same(memo, 1, 'correct default accumulator');
	    assert.same(value, 2, 'correct start value without initial accumulator');
	    assert.same(key, 1, 'correct start index without initial accumulator');
	  });
	  assert.same([1, 2, 3].reduce((a, b) => a + b), 6, 'works without initial accumulator');
	  let values = '';
	  let keys = '';
	  [1, 2, 3].reduce((memo, value, key) => {
	    values += value;
	    keys += key;
	  }, 0);
	  assert.same(values, '123', 'correct order #1');
	  assert.same(keys, '012', 'correct order #2');
	  assert.same(reduce.call({
	    0: 1,
	    1: 2,
	    length: 2
	  }, (a, b) => a + b), 3, 'generic');
	  if (STRICT) {
	    assert.throws(() => reduce.call(null, () => {/* empty */}, 1), TypeError);
	    assert.throws(() => reduce.call(undefined, () => {/* empty */}, 1), TypeError);
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

	definePrototype(Array, 'reduceRight', reduceRight);

	QUnit.test('Array#reduceRight', assert => {
	  const reduceRight = Array.prototype.reduceRight;
	  assert.isFunction(reduceRight);
	  assert.arity(reduceRight, 1);
	  assert.name(reduceRight, 'reduceRight');
	  assert.looksNative(reduceRight);
	  assert.nonEnumerable(Array.prototype, 'reduceRight');
	  const array = [1];
	  const accumulator = {};
	  array.reduceRight(function (memo, value, key, that) {
	    assert.same(arguments.length, 4, 'correct number of callback arguments');
	    assert.same(memo, accumulator, 'correct callback accumulator');
	    assert.same(value, 1, 'correct value in callback');
	    assert.same(key, 0, 'correct index in callback');
	    assert.same(that, array, 'correct link to array in callback');
	  }, accumulator);
	  assert.same([1, 2, 3].reduceRight((a, b) => a + b, 1), 7, 'works with initial accumulator');
	  [1, 2].reduceRight((memo, value, key) => {
	    assert.same(memo, 2, 'correct default accumulator');
	    assert.same(value, 1, 'correct start value without initial accumulator');
	    assert.same(key, 0, 'correct start index without initial accumulator');
	  });
	  assert.same([1, 2, 3].reduceRight((a, b) => a + b), 6, 'works without initial accumulator');
	  let values = '';
	  let keys = '';
	  [1, 2, 3].reduceRight((memo, value, key) => {
	    values += value;
	    keys += key;
	  }, 0);
	  assert.same(values, '321', 'correct order #1');
	  assert.same(keys, '210', 'correct order #2');
	  assert.same(reduceRight.call({
	    0: 1,
	    1: 2,
	    length: 2
	  }, (a, b) => a + b), 3, 'generic');
	  if (STRICT) {
	    assert.throws(() => reduceRight.call(null, () => {/* empty */}, 1), TypeError);
	    assert.throws(() => reduceRight.call(undefined, () => {/* empty */}, 1), TypeError);
	  }
	});

	QUnit.test('String#trim', assert => {
	  const trim = String.prototype.trim;
	  assert.isFunction(trim);
	  assert.arity(trim, 0);
	  assert.name(trim, 'trim');
	  assert.nonEnumerable(String.prototype, 'trim');
	  assert.strictEqual(' \n  q w e \n  '.trim(), 'q w e', 'removes whitespaces at left & right side of string');
	  assert.strictEqual("\u0009".trim(), '', '\\u0009');
	  assert.strictEqual("\u000A".trim(), '', '\\u000A');
	  assert.strictEqual("\u000B".trim(), '', '\\u000B');
	  assert.strictEqual("\u000C".trim(), '', '\\u000C');
	  assert.strictEqual("\u000D".trim(), '', '\\u000D');
	  assert.strictEqual("\u0020".trim(), '', '\\u0020');
	  // assert.strictEqual("\u0085".trim(), '\u0085', "\\u0085 shouldn't remove");
	  assert.strictEqual("\u00A0".trim(), '', '\\u00A0');
	  // assert.strictEqual("\u1680".trim(), '', '\\u1680');
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
	  assert.strictEqual("\u3000".trim(), '', '\\u3000');
	  // assert.strictEqual("\uFEFF".trim(), '', '\\uFEFF');
	  if (STRICT) {
	    assert.throws(() => trim.call(null, 0), TypeError);
	    assert.throws(() => trim.call(undefined, 0), TypeError);
	  }
	});

	QUnit.test('Object.getPrototypeOf', assert => {
	  assert.isFunction(Object.getPrototypeOf);
	  assert.arity(Object.getPrototypeOf, 1);
	  // assert.name(Object.getPrototypeOf, 'getPrototypeOf');
	  assert.looksNative(Object.getPrototypeOf);
	  assert.nonEnumerable(Object, 'getPrototypeOf');
	  assert.ok(Object.getPrototypeOf({}) === Object.prototype);
	  assert.ok(Object.getPrototypeOf([]) === Array.prototype);
	  function F() {/* empty */}
	  assert.ok(Object.getPrototypeOf(new F()) === F.prototype);
	  const object = {
	    q: 1
	  };
	  assert.ok(Object.getPrototypeOf(Object.create(object)) === object);
	  assert.ok(Object.getPrototypeOf(Object.create(null)) === null);
	  assert.ok(Object.getPrototypeOf(Object.getPrototypeOf({})) === null);
	  function Foo() {/* empty */}
	  Foo.prototype.foo = 'foo';
	  function Bar() {/* empty */}
	  Bar.prototype = Object.create(Foo.prototype);
	  Bar.prototype.constructor = Bar;
	  assert.strictEqual(Object.getPrototypeOf(Bar.prototype).foo, 'foo');
	  // const primitives = [42, 'foo', false];
	  // for(const value of primitives) {
	  //   assert.notThrows(() => Object.getPrototypeOf(value), `accept ${typeof value} 不支持`);
	  // }
	  assert.throws(() => Object.getPrototypeOf(null), TypeError, 'throws on null');
	  assert.throws(() => Object.getPrototypeOf(undefined), TypeError, 'throws on undefined');
	  assert.strictEqual(Object.getPrototypeOf(Object('foo')), String.prototype);
	});
	QUnit.test('Object.getPrototypeOf.sham flag', assert => {
	  assert.same(Object.getPrototypeOf.sham, CORRECT_PROTOTYPE_GETTER ? undefined : true);
	});

	QUnit.test('Object.create', assert => {
	  function getPropertyNames(object) {
	    let result = [];
	    do {
	      result = result.concat(Object.getOwnPropertyNames(object));
	    } while (object = Object.getPrototypeOf(object));
	    return result;
	  }
	  assert.isFunction(Object.create);
	  assert.arity(Object.create, 2);
	  assert.name(Object.create, 'create');
	  let object = {
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
	  assert.throws(() => String(object), "throws String({__proto__:null})");
	  assert.deepEqual(getPropertyNames(Object.create(null)), []);
	});
	QUnit.test('Object.create.sham flag', assert => {
	  assert.same(Object.create.sham, DESCRIPTORS ? undefined : true);
	});

	function keys$1() {
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

	definePrototype(Array, 'keys', keys$1);

	QUnit.test('Object.keys', assert => {
	  assert.isFunction(Object.keys);
	  assert.arity(Object.keys, 1);
	  // assert.name(Object.keys, 'keys');
	  assert.looksNative(Object.keys);
	  assert.nonEnumerable(Object, 'keys');
	  function F1() {
	    this.w = 1;
	  }
	  function F2() {
	    this.toString = 1;
	  }
	  F1.prototype.q = F2.prototype.q = 1;
	  assert.deepEqual(Object.keys([1, 2, 3]), ['0', '1', '2']);
	  assert.deepEqual(Object.keys(new F1()), ['w']);
	  assert.deepEqual(Object.keys(new F2()), ['toString']);
	  assert.ok(!includes$2(Object.keys(Array.prototype), 'push'));
	  // const primitives = [42, 'foo', false];
	  // for(const value of primitives) {
	  //   assert.notThrows(() => Object.keys(value), `accept ${typeof value} 不支持`);
	  // }
	  assert.throws(() => Object.keys(null), TypeError, 'throws on null');
	  assert.throws(() => Object.keys(undefined), TypeError, 'throws on undefined');
	});

	QUnit.test('Object.defineProperty', assert => {
	  assert.isFunction(Object.defineProperty);
	  assert.arity(Object.defineProperty, 3);
	  assert.name(Object.defineProperty, 'defineProperty');
	  const source = {};
	  const result = Object.defineProperty(source, 'q', {
	    value: 42
	  });
	  assert.same(result, source);
	  assert.same(result.q, 42);
	  assert.throws(() => Object.defineProperty(42, 1, {}));
	  assert.throws(() => Object.defineProperty({}, Object.create(null), {}));
	  assert.throws(() => Object.defineProperty({}, 1, 1));
	});
	QUnit.test('Object.defineProperty.sham flag', assert => {
	  assert.same(Object.defineProperty.sham, DESCRIPTORS ? undefined : true);
	});

	QUnit.test('Object.getOwnPropertyDescriptor', assert => {
	  assert.isFunction(Object.getOwnPropertyDescriptor);
	  assert.arity(Object.getOwnPropertyDescriptor, 2);
	  assert.name(Object.getOwnPropertyDescriptor, 'getOwnPropertyDescriptor');
	  assert.deepEqual(Object.getOwnPropertyDescriptor({
	    q: 42
	  }, 'q'), {
	    writable: true,
	    enumerable: true,
	    configurable: true,
	    value: 42
	  });
	  assert.ok(Object.getOwnPropertyDescriptor({}, 'toString') === undefined);
	  // const primitives = [42, 'foo', false];
	  // for(const value of primitives) {
	  //   assert.notThrows(() => Object.getOwnPropertyDescriptor(value) || true);
	  // }
	  assert.throws(() => Object.getOwnPropertyDescriptor(null), TypeError, 'throws on null');
	  assert.throws(() => Object.getOwnPropertyDescriptor(undefined), TypeError, 'throws on undefined');
	});
	QUnit.test('Object.getOwnPropertyDescriptor.sham flag', assert => {
	  assert.same(Object.getOwnPropertyDescriptor.sham, DESCRIPTORS ? undefined : true);
	});

	QUnit.test('Object.getOwnPropertyNames', assert => {
	  assert.isFunction(Object.getOwnPropertyNames);
	  assert.arity(Object.getOwnPropertyNames, 1);
	  // assert.name(Object.getOwnPropertyNames, 'getOwnPropertyNames');
	  function F1() {
	    this.w = 1;
	  }
	  function F2() {
	    this.toString = 1;
	  }
	  F1.prototype.q = F2.prototype.q = 1;
	  const names = Object.getOwnPropertyNames([1, 2, 3]);
	  assert.strictEqual(names.length, 4);
	  assert.ok(includes$2(names, '0'));
	  assert.ok(includes$2(names, '1'));
	  assert.ok(includes$2(names, '2'));
	  assert.ok(includes$2(names, 'length'));
	  assert.deepEqual(Object.getOwnPropertyNames(new F1()), ['w']);
	  assert.deepEqual(Object.getOwnPropertyNames(new F2()), ['toString']);
	  // assert.ok(includes(Object.getOwnPropertyNames(Array.prototype), 'toString'));
	  // assert.ok(includes(Object.getOwnPropertyNames(Object.prototype), 'toString'));
	  // assert.ok(includes(Object.getOwnPropertyNames(Object.prototype), 'constructor'));
	  // const primitives = [42, 'foo', false];
	  // for(const value of primitives) {
	  //   assert.notThrows(() => Object.getOwnPropertyNames(value), `accept ${typeof value}`);
	  // }
	  assert.throws(() => {
	    Object.getOwnPropertyNames(null);
	  }, TypeError, 'throws on null');
	  assert.throws(() => {
	    Object.getOwnPropertyNames(undefined);
	  }, TypeError, 'throws on undefined');
	  // if(GLOBAL.document) {
	  //   assert.notThrows(() => {
	  //     const iframe = document.createElement('iframe');
	  //     iframe.src = 'http://example.com';
	  //     document.documentElement.appendChild(iframe);
	  //     const window = iframe.contentWindow;
	  //     document.documentElement.removeChild(iframe);
	  //     return Object.getOwnPropertyNames(window);
	  //   }, 'IE11 bug with iframe and window');
	  // }
	});

	QUnit.test('Object.defineProperties', assert => {
	  assert.isFunction(Object.defineProperties);
	  assert.arity(Object.defineProperties, 2);
	  assert.name(Object.defineProperties, 'defineProperties');
	  const source = {};
	  const result = Object.defineProperties(source, {
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

	var slice = Array.prototype.slice;

	function bind(context) {
		var self = this, args = slice.call(arguments, 1);
		var Bind = function() {
			if(this instanceof Bind) {
				self.apply(this, args.concat(slice.call(arguments)));
				return;
			}
			return self.apply(context, args.concat(slice.call(arguments)));
		};
		return Bind;
	}

	definePrototype(Function, 'bind', bind);

	QUnit.test('Function#bind', assert => {
	  const bind = Function.prototype.bind;
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
	  assert.same(new function () {/* empty */}().a, undefined);
	  // new 用法MDN上说不建议使用，就不支持了，
	  // function A() {
	  // }
	  // const a = new A();
	  // const B = A.bind(a);
	  // assert.ok(B.call(a) === undefined, "not allow new");

	  // assert.same((it => it).bind(null, 42)(), 42);
	  // const regExpTest = RegExp.prototype.test.bind(/a/);
	  // assert.ok(regExpTest('a'));
	  // const Date2017 = Date.bind(null, 2017);
	  // const date = new Date2017(11);
	  // assert.ok(date instanceof Date);
	  // assert.strictEqual(date.getFullYear(), 2017);
	  // assert.strictEqual(date.getMonth(), 11);
	});

	QUnit.test('Array.isArray', assert => {
	  const isArray = Array.isArray;
	  assert.isFunction(isArray);
	  assert.arity(isArray, 1);
	  assert.name(isArray, 'isArray');
	  assert.ok(!isArray({}));
	  assert.ok(!isArray(function () {
	    return arguments;
	  }()));
	  assert.ok(isArray([]));
	});

	if (PROTO) QUnit.test('Object.setPrototypeOf', assert => {
	  assert.isFunction(Object.setPrototypeOf);
	  assert.arity(Object.setPrototypeOf, 2);
	  // assert.name(Object.setPrototypeOf, 'setPrototypeOf');
	  assert.looksNative(Object.setPrototypeOf);
	  // assert.nonEnumerable(Object, 'setPrototypeOf');
	  // assert.ok('apply' in Object.setPrototypeOf({}, Function.prototype), 'Parent properties in target');
	  assert.strictEqual(Object.setPrototypeOf({
	    a: 2
	  }, {
	    b() {
	      return this.a ** 2;
	    }
	  }).b(), 4, 'Child and parent properties in target');
	  const object = {};
	  assert.strictEqual(Object.setPrototypeOf(object, {
	    a: 1
	  }), object, 'setPrototypeOf return target');
	  // assert.ok(!('toString' in Object.setPrototypeOf({}, null)), 'Can set null as prototype');
	});

	QUnit.test('Object.is', assert => {
	  assert.isFunction(Object.is);
	  assert.arity(Object.is, 2);
	  assert.name(Object.is, 'is');
	  assert.looksNative(Object.is);
	  // assert.nonEnumerable(Object, 'is');
	  assert.ok(Object.is(1, 1), '1 is 1');
	  assert.ok(Object.is(NaN, NaN), '1 is 1');
	  assert.ok(!Object.is(0, -0), '0 isnt -0');
	  assert.ok(!Object.is({}, {}), '{} isnt {}');
	});

	var Promise$3 = window.Promise;

	function isNotNullObject(obj) {
		return typeof obj === "object" ? obj !== null : typeof obj === "function";
	};

	function isFunction(obj) {
		return typeof obj === 'function';
	};

	var queueMicrotask$2 = window.queueMicrotask;

	var ticks = null;
	var nextTick = setTimeout;
	function initQueueMicrotask(fn) {
		nextTick = fn;
		return queueMicrotask$1;
	}
	function next() {
		if(ticks && ticks.length) {
			for(var i = 0; i < ticks.length; i++) {
				var args = ticks[i];
				var fn = args[0];
				args = slice.call(args, 1);
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
	};

	if(!queueMicrotask$2) {
		window.queueMicrotask = initQueueMicrotask(Promise$3 ? Promise$3.prototype.then.bind(Promise$3.resolve(1)) : setTimeout);
	}

	var PENDING = 1;
	var RESOLVED = 2;
	var REJECTED = 3;

	function Promise$2(executor) {
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
					var a = me._resolveds, len = a.length, i;
					for(i = 0; i < len; i++)
						a[i].call(me, me._value);
					me._resolveds = null;
				});
			}
		}
		function reject(reason) {
			if(me._state === PENDING) {
				me._value = reason;
				me._state = REJECTED;
				queueMicrotask(function() {
					var a = me._rejecteds, len = a.length, i;
					for(i = 0; i < len; i++)
						a[i].call(me, me._value);
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
	function nextPromise(before, after, resolve, reject) {
		return function(value) {
			try {
				var x = before(value);
				if(x != null && isFunction(x.then)) {
					x.then(resolve, reject);
				} else {
					after(x);
				}
			} catch(r) {
				reject(r);
			}
		};
	}
	function returnArg1(arg1) {
		return arg1;
	}
	Promise$2.prototype.then = function then(onResolved, onRejected) {
		// var Class = speciesConstructor(this, Promise);
		var me = this;
		onResolved = onResolved || returnArg1;
		onRejected = onRejected || returnArg1;
		return new Promise$2(function(resolve, reject) {
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
	Promise$2.prototype.catch = function(onRejected) {
		return this.then(undefined, onRejected);
	};

	function ResolvePromise(value) {
		this._value = value;
		this._state = RESOLVED;
	}
	ResolvePromise.prototype = Promise$2.prototype;

	function RejectPromise(value) {
		this._value = value;
		this._state = REJECTED;
	}
	RejectPromise.prototype = Promise$2.prototype;

	Promise$2.resolve = function resolve(value) {
		if(value && typeof value === "object" && value.constructor === this) {
			return value;
		}
		if(!this) {
			throw TypeError("Promise.resolve called on non-object");
		}
		if(!isFunction(this)) {
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
	Promise$2.reject = function reject(value) {
		if(value && typeof value === "object" && value.constructor === this) {
			return value;
		}
		if(!this) {
			throw TypeError("Promise.resolve called on non-object");
		}
		if(!isFunction(this)) {
			throw TypeError(this + " is not a constructor");
		}
		return new RejectPromise(value);
	};

	Promise$2.all = function(promises) {
		if(!Array.isArray(promises)) {
			throw new TypeError('You must pass an array to all.');
		}
		if(promises.length == 0) return Promise$2.resolve();
		return new Promise$2(function(resolve, reject) {
			var result = new Array(promises.length);
			var c = 0;
			promises.forEach.call(function(one, index) {
				if(isNotNullObject(one) && isFunction(one.then)) {
					one.then(function(data) {
						c++;
						result[index] = data;
						if(c >= promises.length) {
							resolve(result);
						}
					}, reject);
				} else {
					c++;
					if(c >= promises.length) {
						resolve();
					}
				}
			});
		});
	};
	Promise$2.race = function(promises) {
		if(!Array.isArray(promises)) {
			throw new TypeError('You must pass an array to all.');
		}
		return new Promise$2(function(resolve, reject) {
			var i = promises.length;
			while(i--) {
				promises[i].then(resolve, reject);
			}
		});
	};

	var Promise$1 = Promise$3;
	if(!Promise$1) {
		Promise$1 = window.Promise = Promise$2;
	}

	function promise_finally(onCompleted) {
		var fun = isFunction(onCompleted);
		return this.then(
			fun ?
				function(x) {
					return Promise.resolve(onCompleted()).then(function() { return x; });
				} :
				onCompleted,
			fun ?
				function(e) {
					onCompleted();
					throw e;
				} :
				onCompleted
		);
	};

	definePrototype(Promise$1, 'finally', promise_finally);

	const Symbol$7 = GLOBAL.Symbol || {};
	const {
	  setPrototypeOf: setPrototypeOf$1,
	  create
	} = Object;
	QUnit.test('Promise', assert => {
	  assert.isFunction(Promise);
	  assert.arity(Promise, 1);
	  // assert.name(Promise, 'Promise');
	  assert.looksNative(Promise);
	  assert.throws(() => {
	    Promise();
	  }, 'throws w/o `new`');
	  new Promise(function (resolve, reject) {
	    assert.isFunction(resolve, 'resolver is function');
	    assert.isFunction(reject, 'rejector is function');
	    if (STRICT) assert.same(this, undefined, 'correct executor context');
	  });
	});
	if (false) QUnit.asyncTest('Promise operations order', assert => {
	  let resolve, resolve2;
	  expect(1);
	  const EXPECTED_ORDER = 'DEHAFGBC';
	  let result = '';
	  const promise1 = new Promise(r => {
	    resolve = r;
	  });
	  resolve({
	    then() {
	      result += 'A';
	      throw Error();
	    }
	  });
	  promise1.catch(() => {
	    result += 'B';
	  });
	  promise1.catch(() => {
	    result += 'C';
	    assert.same(result, EXPECTED_ORDER);
	    start();
	  });
	  const promise2 = new Promise(r => {
	    resolve2 = r;
	  });
	  resolve2(Object.defineProperty({}, 'then', {
	    get() {
	      result += 'D';
	      throw Error();
	    }
	  }));
	  resolve2(Object.defineProperty({}, 'then', {
	    get() {
	      result += 'I';
	      return 1;
	    }
	  }));
	  result += 'E';
	  promise2.catch(() => {
	    result += 'F';
	  });
	  promise2.catch(() => {
	    result += 'G';
	  });
	  result += 'H';
	  setTimeout(() => {
	    if (!~result.indexOf('C')) {
	      assert.same(result, EXPECTED_ORDER);
	      start();
	    }
	  }, 1e3);
	});
	QUnit.test('Promise#then', assert => {
	  assert.isFunction(Promise.prototype.then);
	  if (NATIVE) assert.arity(Promise.prototype.then, 2);
	  assert.name(Promise.prototype.then, 'then');
	  assert.looksNative(Promise.prototype.then);
	  // assert.nonEnumerable(Promise.prototype, 'then');
	  let promise = new Promise(resolve => {
	    resolve(42);
	  });
	  let FakePromise1 = promise.constructor = function (executor) {
	    executor(() => {/* empty */}, () => {/* empty */});
	  };
	  const FakePromise2 = FakePromise1[Symbol$7.species] = function (executor) {
	    executor(() => {/* empty */}, () => {/* empty */});
	  };
	  // assert.ok(promise.then(() => { /* empty */ }) instanceof FakePromise2, 'subclassing, @@species pattern');
	  promise = new Promise(resolve => {
	    resolve(42);
	  });
	  promise.constructor = FakePromise1 = function (executor) {
	    executor(() => {/* empty */}, () => {/* empty */});
	  };
	  // assert.ok(promise.then(() => { /* empty */ }) instanceof Promise, 'subclassing, incorrect `this` pattern');
	  promise = new Promise(resolve => {
	    resolve(42);
	  });
	  // promise.constructor = FakePromise1 = function(executor) {
	  //   executor(() => { /* empty */ }, () => { /* empty */ });
	  // };
	  // FakePromise1[Symbol.species] = function() { /* empty */ };
	  // assert.throws(() => {
	  //   promise.then(() => { /* empty */ });
	  // }, 'NewPromiseCapability validations, #1');
	  // FakePromise1[Symbol.species] = function(executor) {
	  //   executor(null, () => { /* empty */ });
	  // };
	  // assert.throws(() => {
	  //   promise.then(() => { /* empty */ });
	  // }, 'NewPromiseCapability validations, #2');
	  // FakePromise1[Symbol.species] = function(executor) {
	  //   executor(() => { /* empty */ }, null);
	  // };
	  // assert.throws(() => {
	  //   promise.then(() => { /* empty */ });
	  // }, 'NewPromiseCapability validations, #3');
	});
	QUnit.test('Promise#catch', assert => {
	  assert.isFunction(Promise.prototype.catch);
	  if (NATIVE) assert.arity(Promise.prototype.catch, 1);
	  if (NATIVE) assert.name(Promise.prototype.catch, 'catch');
	  assert.looksNative(Promise.prototype.catch);
	  // assert.nonEnumerable(Promise.prototype, 'catch');
	  // let promise = new Promise(resolve => {
	  //   resolve(42);
	  // });
	  // let FakePromise1 = promise.constructor = function(executor) {
	  //   executor(() => { /* empty */ }, () => { /* empty */ });
	  // };
	  // promise = new Promise(resolve => {
	  //   resolve(42);
	  // });
	  // promise.constructor = FakePromise1 = function(executor) {
	  //   executor(() => { /* empty */ }, () => { /* empty */ });
	  // };
	  // assert.ok(promise.catch(() => { /* empty */ }) instanceof Promise, 'subclassing, incorrect `this` pattern');
	  // promise = new Promise(resolve => {
	  //   resolve(42);
	  // });
	  // promise.constructor = FakePromise1 = function(executor) {
	  //   executor(() => { /* empty */ }, () => { /* empty */ });
	  // };
	  // assert.same(Promise.prototype.catch.call({
	  //   then(x, y) {
	  //     return y;
	  //   },
	  // }, 42), 42, 'calling `.then`');
	});
	QUnit.test('Promise.resolve', assert => {
	  const resolve = Promise.resolve;
	  assert.isFunction(resolve);
	  if (NATIVE) assert.arity(resolve, 1);
	  assert.name(resolve, 'resolve');
	  assert.looksNative(resolve);
	  // assert.nonEnumerable(Promise, 'resolve');
	  // assert.throws(() => {
	  //   resolve.call(null, 1).catch(() => { /* empty */ });
	  // }, TypeError, 'throws without context');
	  // function FakePromise1(executor) {
	  //   executor(() => { /* empty */ }, () => { /* empty */ });
	  // }
	  // FakePromise1[Symbol.species] = function(executor) {
	  //   executor(() => { /* empty */ }, () => { /* empty */ });
	  // };
	  // assert.ok(resolve.call(FakePromise1, 42) instanceof FakePromise1, 'subclassing, `this` pattern');
	  // assert.throws(() => {
	  //   resolve.call(() => { /* empty */ }, 42);
	  // }, 'NewPromiseCapability validations, #1');
	  // assert.throws(() => {
	  //   resolve.call(executor => {
	  //     executor(null, () => { /* empty */ });
	  //   }, 42);
	  // }, 'NewPromiseCapability validations, #2');
	  // assert.throws(() => {
	  //   resolve.call(executor => {
	  //     executor(() => { /* empty */ }, null);
	  //   }, 42);
	  // }, 'NewPromiseCapability validations, #3');
	});
	QUnit.test('Promise.reject', assert => {
	  const reject = Promise.reject;
	  assert.isFunction(reject);
	  if (NATIVE) assert.arity(reject, 1);
	  assert.name(reject, 'reject');
	  assert.looksNative(reject);
	  // assert.nonEnumerable(Promise, 'reject');
	  // assert.throws(() => {
	  //   reject.call(null, 1).catch(() => { /* empty */ });
	  // }, TypeError, 'throws without context');
	  // function FakePromise1(executor) {
	  //   executor(() => { /* empty */ }, () => { /* empty */ });
	  // }
	  // FakePromise1[Symbol.species] = function(executor) {
	  //   executor(() => { /* empty */ }, () => { /* empty */ });
	  // };
	  // assert.ok(reject.call(FakePromise1, 42) instanceof FakePromise1, 'subclassing, `this` pattern');
	  // assert.throws(() => {
	  //   reject.call(() => { /* empty */ }, 42);
	  // }, 'NewPromiseCapability validations, #1');
	  // assert.throws(() => {
	  //   reject.call(executor => {
	  //     executor(null, () => { /* empty */ });
	  //   }, 42);
	  // }, 'NewPromiseCapability validations, #2');
	  // assert.throws(() => {
	  //   reject.call(executor => {
	  //     executor(() => { /* empty */ }, null);
	  //   }, 42);
	  // }, 'NewPromiseCapability validations, #3');
	});
	QUnit.test('Promise.all', assert => {
	  let FakePromise1, FakePromise2;
	  const {
	    all,
	    resolve
	  } = Promise;
	  assert.isFunction(all);
	  // assert.arity(all, 1);
	  // assert.name(all, 'all');
	  assert.looksNative(all);
	  // assert.nonEnumerable(Promise, 'all');
	  // const iterable = createIterable([1, 2, 3]);
	  // Promise.all(iterable).catch(() => { /* empty */ });
	  // assert.ok(iterable.received, 'works with iterables: iterator received');
	  // assert.ok(iterable.called, 'works with iterables: next called');
	  // const array = [];
	  // let done = false;
	  // array['@@iterator'] = undefined;
	  // array[Symbol.iterator] = function() {
	  //   done = true;
	  //   return [][Symbol.iterator].call(this);
	  // };
	  // Promise.all(array);
	  // assert.ok(done);
	  // assert.throws(() => {
	  //   all.call(null, []).catch(() => { /* empty */ });
	  // }, TypeError, 'throws without context');
	  // done = false;
	  // try {
	  //   Promise.resolve = function() {
	  //     throw new Error();
	  //   };
	  //   Promise.all(createIterable([1, 2, 3], {
	  //     return() {
	  //       done = true;
	  //     },
	  //   })).catch(() => { /* empty */ });
	  // } catch(error) { /* empty */ }
	  // Promise.resolve = resolve;
	  // assert.ok(done, 'iteration closing');
	  // FakePromise1 = function(executor) {
	  //   executor(() => { /* empty */ }, () => { /* empty */ });
	  // };
	  // FakePromise2 = FakePromise1[Symbol.species] = function(executor) {
	  //   executor(() => { /* empty */ }, () => { /* empty */ });
	  // };
	  // FakePromise1.resolve = FakePromise2.resolve = resolve.bind(Promise);
	  // assert.ok(all.call(FakePromise1, [1, 2, 3]) instanceof FakePromise1, 'subclassing, `this` pattern');
	  // FakePromise1 = function() { /* empty */ };
	  // FakePromise2 = function(executor) {
	  //   executor(null, () => { /* empty */ });
	  // };
	  // const FakePromise3 = function(executor) {
	  //   executor(() => { /* empty */ }, null);
	  // };
	  // FakePromise1.resolve = FakePromise2.resolve = FakePromise3.resolve = resolve.bind(Promise);
	  // assert.throws(() => {
	  //   all.call(FakePromise1, [1, 2, 3]);
	  // }, 'NewPromiseCapability validations, #1');
	  // assert.throws(() => {
	  //   all.call(FakePromise2, [1, 2, 3]);
	  // }, 'NewPromiseCapability validations, #2');
	  // assert.throws(() => {
	  //   all.call(FakePromise3, [1, 2, 3]);
	  // }, 'NewPromiseCapability validations, #3');
	});
	QUnit.test('Promise.race', assert => {
	  let FakePromise1, FakePromise2;
	  const {
	    race,
	    resolve
	  } = Promise;
	  assert.isFunction(race);
	  // assert.arity(race, 1);
	  // assert.name(race, 'race');
	  assert.looksNative(race);
	  // assert.nonEnumerable(Promise, 'race');
	  // const iterable = createIterable([1, 2, 3]);
	  // Promise.race(iterable).catch(() => { /* empty */ });
	  // assert.ok(iterable.received, 'works with iterables: iterator received');
	  // assert.ok(iterable.called, 'works with iterables: next called');
	  // const array = [];
	  // let done = false;
	  // array['@@iterator'] = undefined;
	  // array[Symbol.iterator] = function() {
	  //   done = true;
	  //   return [][Symbol.iterator].call(this);
	  // };
	  // Promise.race(array);
	  // assert.ok(done);
	  // assert.throws(() => {
	  //   race.call(null, []).catch(() => { /* empty */ });
	  // }, TypeError, 'throws without context');
	  // done = false;
	  // try {
	  //   Promise.resolve = function() {
	  //     throw new Error();
	  //   };
	  //   Promise.race(createIterable([1, 2, 3], {
	  //     return() {
	  //       done = true;
	  //     },
	  //   })).catch(() => { /* empty */ });
	  // } catch(error) { /* empty */ }
	  // Promise.resolve = resolve;
	  // assert.ok(done, 'iteration closing');
	  // FakePromise1 = function(executor) {
	  //   executor(() => { /* empty */ }, () => { /* empty */ });
	  // };
	  // FakePromise2 = FakePromise1[Symbol.species] = function(executor) {
	  //   executor(() => { /* empty */ }, () => { /* empty */ });
	  // };
	  // FakePromise1.resolve = FakePromise2.resolve = resolve.bind(Promise);
	  // assert.ok(race.call(FakePromise1, [1, 2, 3]) instanceof FakePromise1, 'subclassing, `this` pattern');
	  // FakePromise1 = function() { /* empty */ };
	  // FakePromise2 = function(executor) {
	  //   executor(null, () => { /* empty */ });
	  // };
	  // const FakePromise3 = function(executor) {
	  //   executor(() => { /* empty */ }, null);
	  // };
	  // FakePromise1.resolve = FakePromise2.resolve = FakePromise3.resolve = resolve.bind(Promise);
	  // assert.throws(() => {
	  //   race.call(FakePromise1, [1, 2, 3]);
	  // }, 'NewPromiseCapability validations, #1');
	  // assert.throws(() => {
	  //   race.call(FakePromise2, [1, 2, 3]);
	  // }, 'NewPromiseCapability validations, #2');
	  // assert.throws(() => {
	  //   race.call(FakePromise3, [1, 2, 3]);
	  // }, 'NewPromiseCapability validations, #3');
	});

	// if(PROTO) QUnit.test('Promise subclassing', assert => {
	//   function SubPromise(executor) {
	//     const self = new Promise(executor);
	//     setPrototypeOf(self, SubPromise.prototype);
	//     self.mine = 'subclass';
	//     return self;
	//   }
	//   setPrototypeOf(SubPromise, Promise);
	//   SubPromise.prototype = create(Promise.prototype);
	//   SubPromise.prototype.constructor = SubPromise;
	//   let promise1 = SubPromise.resolve(5);
	//   assert.strictEqual(promise1.mine, 'subclass');
	//   promise1 = promise1.then(it => {
	//     assert.strictEqual(it, 5);
	//   });
	//   assert.strictEqual(promise1.mine, 'subclass');
	//   let promise2 = new SubPromise(resolve => {
	//     resolve(6);
	//   });
	//   assert.strictEqual(promise2.mine, 'subclass');
	//   promise2 = promise2.then(it => {
	//     assert.strictEqual(it, 6);
	//   });
	//   assert.strictEqual(promise2.mine, 'subclass');
	//   const promise3 = SubPromise.all([promise1, promise2]);
	//   assert.strictEqual(promise3.mine, 'subclass');
	//   assert.ok(promise3 instanceof Promise);
	//   assert.ok(promise3 instanceof SubPromise);
	//   promise3.then(assert.async(), error => {
	//     assert.ok(false, error);
	//   });
	// });

	const promise$1 = (() => {
	  try {
	    return Function('return (async function () { /* empty */ })()')();
	  } catch (_unused) {/* empty */}
	})();
	if (promise$1 && promise$1.constructor !== Promise) QUnit.test('Native Promise, patched', assert => {
	  assert.isFunction(promise$1.then);
	  assert.arity(promise$1.then, 2);
	  assert.looksNative(promise$1.then);
	  // assert.nonEnumerable(promise.constructor.prototype, 'then');
	  function empty() {/* empty */}
	  assert.ok(promise$1.then(empty) instanceof Promise, '`.then` returns `Promise` instance #1');
	  assert.ok(new promise$1.constructor(empty).then(empty) instanceof Promise, '`.then` returns `Promise` instance #2');
	  assert.ok(promise$1.catch(empty) instanceof Promise, '`.catch` returns `Promise` instance #1');
	  assert.ok(new promise$1.constructor(empty).catch(empty) instanceof Promise, '`.catch` returns `Promise` instance #2');
	  assert.ok(promise$1.finally(empty) instanceof Promise, '`.finally` returns `Promise` instance #1');
	  assert.ok(new promise$1.constructor(empty).finally(empty) instanceof Promise, '`.finally` returns `Promise` instance #2');
	});

	QUnit.test('Number.isNaN', assert => {
	  const isNaN = Number.isNaN;
	  const create = Object.create;
	  assert.isFunction(isNaN);
	  assert.name(isNaN, 'isNaN');
	  assert.arity(isNaN, 1);
	  assert.looksNative(isNaN);
	  // assert.nonEnumerable(Number, 'isNaN');
	  assert.ok(isNaN(NaN), 'Number.isNaN NaN');
	  const notNaNs = [1, 0.1, -1, 2 ** 16, 2 ** 16 - 1, 2 ** 31, 2 ** 31 - 1, 2 ** 32, 2 ** 32 - 1, -0, Infinity, 'NaN', '5', false, new Number(NaN), new Number(Infinity), new Number(5), new Number(0.1), undefined, null, {}, function () {/* empty */}];
	  for (const value of notNaNs) {
	    assert.ok(!isNaN(value), `not Number.isNaN ${typeof value} ${value}`);
	  }
	  assert.ok(!isNaN(create(null)), 'Number.isNaN(Object.create(null)) -> false');
	});

	QUnit.test('Number.isFinite', assert => {
	  const isFinite = Number.isFinite;
	  const create = Object.create;
	  assert.isFunction(isFinite);
	  assert.name(isFinite, 'isFinite');
	  assert.arity(isFinite, 1);
	  assert.looksNative(isFinite);
	  // assert.nonEnumerable(Number, 'isFinite');
	  const finite = [1, 0.1, -1, 2 ** 16, 2 ** 16 - 1, 2 ** 31, 2 ** 31 - 1, 2 ** 32, 2 ** 32 - 1, -0];
	  for (const value of finite) {
	    assert.ok(isFinite(value), `isFinite ${typeof value} ${value}`);
	  }
	  const notFinite = [NaN, Infinity, 'NaN', '5', false, new Number(NaN), new Number(Infinity), new Number(5), new Number(0.1), undefined, null, {}, function () {/* empty */}];
	  for (const value of notFinite) {
	    assert.ok(!isFinite(value), `not isFinite ${typeof value} ${value}`);
	  }
	  assert.ok(!isFinite(create(null)), 'Number.isFinite(Object.create(null)) -> false');
	});

	QUnit.test('Number.isInteger', assert => {
	  const isInteger = Number.isInteger;
	  const create = Object.create;
	  assert.isFunction(isInteger);
	  assert.name(isInteger, 'isInteger');
	  assert.arity(isInteger, 1);
	  assert.looksNative(isInteger);
	  // assert.nonEnumerable(Number, 'isInteger');
	  const integers = [1, -1, 2 ** 16, 2 ** 16 - 1, 2 ** 31, 2 ** 31 - 1, 2 ** 32, 2 ** 32 - 1, -0];
	  for (const value of integers) {
	    assert.ok(isInteger(value), `isInteger ${typeof value} ${value}`);
	  }
	  const notIntegers = [NaN, 0.1, Infinity, 'NaN', '5', false, new Number(NaN), new Number(Infinity), new Number(5), new Number(0.1), undefined, null, {}, function () {/* empty */}];
	  for (const value of notIntegers) {
	    assert.ok(!isInteger(value), `not isInteger ${typeof value} ${value}`);
	  }
	  assert.ok(!isInteger(create(null)), 'Number.isInteger(Object.create(null)) -> false');
	});

	QUnit.test('Number.EPSILON', assert => {
	  const EPSILON = Number.EPSILON;
	  assert.ok('EPSILON' in Number, 'EPSILON in Number');
	  // assert.nonEnumerable(Number, 'EPSILON');
	  assert.strictEqual(EPSILON, 2 ** -52, 'Is 2^-52');
	  assert.ok(1 !== 1 + EPSILON, '1 isnt 1 + EPSILON');
	  assert.strictEqual(1, 1 + EPSILON / 2, '1 is 1 + EPSILON / 2');
	});

	QUnit.test('Number.parseFloat', assert => {
	  const parseFloat = Number.parseFloat;
	  assert.isFunction(parseFloat);
	  assert.name(parseFloat, 'parseFloat');
	  assert.arity(parseFloat, 1);
	  assert.looksNative(parseFloat);
	  // assert.nonEnumerable(Number, 'parseFloat');
	  // assert.same(parseFloat, GLOBAL.parseFloat);
	  assert.same(parseFloat('0'), 0);
	  assert.same(parseFloat(' 0'), 0);
	  assert.same(parseFloat('+0'), 0);
	  assert.same(parseFloat(' +0'), 0);
	  assert.same(parseFloat('-0'), -0);
	  assert.same(parseFloat(' -0'), -0);
	  // assert.same(parseFloat(`${WHITESPACES}+0`), 0);
	  // assert.same(parseFloat(`${WHITESPACES}-0`), -0);
	  assert.same(parseFloat(null), NaN);
	  assert.same(parseFloat(undefined), NaN);
	});

	QUnit.test('Number.parseInt', assert => {
	  const parseInt = Number.parseInt;
	  assert.isFunction(parseInt);
	  // assert.name(parseInt, 'parseInt');
	  assert.arity(parseInt, 2);
	  assert.looksNative(parseInt);
	  // assert.nonEnumerable(Number, 'parseInt');
	  // assert.same(parseInt, GLOBAL.parseInt);
	  for (let radix = 2; radix <= 36; ++radix) {
	    assert.same(parseInt('10', radix), radix, `radix ${radix}`);
	  }
	  const strings = ['01', '08', '10', '42'];
	  for (const string of strings) {
	    assert.same(parseInt(string), parseInt(string, 10), `default radix is 10: ${string}`);
	  }
	  assert.same(parseInt('0x16'), parseInt('0x16', 16), 'default radix is 16: 0x16');
	  assert.same(parseInt('  0x16'), parseInt('0x16', 16), 'ignores leading whitespace #1');
	  assert.same(parseInt('  42'), parseInt('42', 10), 'ignores leading whitespace #2');
	  assert.same(parseInt('  08'), parseInt('08', 10), 'ignores leading whitespace #3');
	  // assert.same(parseInt(`${WHITESPACES}08`), parseInt('08', 10), 'ignores leading whitespace #4');
	  // assert.same(parseInt(`${WHITESPACES}0x16`), parseInt('0x16', 16), 'ignores leading whitespace #5');
	  const fakeZero = {
	    valueOf() {
	      return 0;
	    }
	  };
	  // assert.same(parseInt('08', fakeZero), parseInt('08', 10), 'valueOf #1');
	  // assert.same(parseInt('0x16', fakeZero), parseInt('0x16', 16), 'valueOf #2');
	  assert.same(parseInt('-0xF'), -15, 'signed hex #1');
	  assert.same(parseInt('-0xF', 16), -15, 'signed hex #2');
	  assert.same(parseInt('+0xF'), 15, 'signed hex #3');
	  assert.same(parseInt('+0xF', 16), 15, 'signed hex #4');
	  assert.same(parseInt('10', -4294967294), 2, 'radix uses ToUint32');
	  assert.same(parseInt(null), NaN);
	  assert.same(parseInt(undefined), NaN);
	});

	QUnit.test('Number.isSafeInteger', assert => {
	  const isSafeInteger = Number.isSafeInteger;
	  const create = Object.create;
	  assert.isFunction(isSafeInteger);
	  assert.name(isSafeInteger, 'isSafeInteger');
	  assert.arity(isSafeInteger, 1);
	  assert.looksNative(isSafeInteger);
	  // assert.nonEnumerable(Number, 'isSafeInteger');
	  const safeIntegers = [1, -1, 2 ** 16, 2 ** 16 - 1, 2 ** 31, 2 ** 31 - 1, 2 ** 32, 2 ** 32 - 1, -0, 9007199254740991, -9007199254740991];
	  for (const value of safeIntegers) {
	    assert.ok(isSafeInteger(value), `isSafeInteger ${typeof value} ${value}`);
	  }
	  const notSafeIntegers = [9007199254740992, -9007199254740992, NaN, 0.1, Infinity, 'NaN', '5', false, new Number(NaN), new Number(Infinity), new Number(5), new Number(0.1), undefined, null, {}, function () {/* empty */}];
	  for (const value of notSafeIntegers) {
	    assert.ok(!isSafeInteger(value), `not isSafeInteger ${typeof value} ${value}`);
	  }
	  assert.ok(!isSafeInteger(create(null)), 'Number.isSafeInteger(Object.create(null)) -> false');
	});

	QUnit.test('Number.MAX_SAFE_INTEGER', assert => {
	  assert.ok('MAX_SAFE_INTEGER' in Number);
	  // assert.nonEnumerable(Number, 'MAX_SAFE_INTEGER');
	  assert.strictEqual(Number.MAX_SAFE_INTEGER, 2 ** 53 - 1, 'Is 2^53 - 1');
	});

	QUnit.test('Number.MIN_SAFE_INTEGER', assert => {
	  assert.ok('MIN_SAFE_INTEGER' in Number);
	  // assert.nonEnumerable(Number, 'MIN_SAFE_INTEGER');
	  assert.strictEqual(Number.MIN_SAFE_INTEGER, -(2 ** 53) + 1, 'Is -2^53 + 1');
	});

	const {
	  ownKeys: ownKeys$4
	} = GLOBAL.Reflect || {};
	QUnit.test('WeakMap', assert => {
	  assert.isFunction(WeakMap);
	  assert.name(WeakMap, 'WeakMap');
	  // assert.arity(WeakMap, 0);
	  assert.looksNative(WeakMap);
	  assert.ok('delete' in WeakMap.prototype, 'delete in WeakMap.prototype');
	  assert.ok('get' in WeakMap.prototype, 'get in WeakMap.prototype');
	  assert.ok('has' in WeakMap.prototype, 'has in WeakMap.prototype');
	  assert.ok('set' in WeakMap.prototype, 'set in WeakMap.prototype');
	  assert.ok(new WeakMap() instanceof WeakMap, 'new WeakMap instanceof WeakMap');
	  let object = {};
	  // assert.strictEqual(new WeakMap(createIterable([[object, 42]])).get(object), 42, 'Init from iterable');
	  // let weakmap = new WeakMap();
	  // const frozen = Object.freeze({});
	  // weakmap.set(frozen, 42);
	  // assert.strictEqual(weakmap.get(frozen), 42, 'Support frozen objects');
	  // weakmap = new WeakMap();
	  // weakmap.set(frozen, 42);
	  // assert.strictEqual(weakmap.has(frozen), true, 'works with frozen objects, #1');
	  // assert.strictEqual(weakmap.get(frozen), 42, 'works with frozen objects, #2');
	  // weakmap.delete(frozen);
	  // assert.strictEqual(weakmap.has(frozen), false, 'works with frozen objects, #3');
	  // assert.strictEqual(weakmap.get(frozen), undefined, 'works with frozen objects, #4');
	  // let done = false;
	  // try {
	  //   new WeakMap(createIterable([null, 1, 2], {
	  //     return() {
	  //       return done = true;
	  //     },
	  //   }));
	  // } catch { /* empty */ }
	  // assert.ok(done, '.return #throw');
	  // assert.ok(!('clear' in WeakMap.prototype), 'should not contains `.clear` method');
	  // const array = [];
	  // done = false;
	  // array['@@iterator'] = undefined;
	  // array[Symbol.iterator] = function() {
	  //   done = true;
	  //   return [][Symbol.iterator].call(this);
	  // };
	  // new WeakMap(array);
	  // assert.ok(done);
	  object = {};
	  new WeakMap().set(object, 1);
	  if (DESCRIPTORS) {
	    const results = [];
	    for (const key in object) results.push(key);
	    assert.arrayEqual(results, []);
	    assert.arrayEqual(Object.keys(object), []);
	  }
	  assert.arrayEqual(Object.getOwnPropertyNames(object), []);
	  if (Object.getOwnPropertySymbols) assert.arrayEqual(Object.getOwnPropertySymbols(object), []);
	  if (ownKeys$4) assert.arrayEqual(ownKeys$4(object), []);
	  if (nativeSubclass) {
	    const Subclass = nativeSubclass(WeakMap);
	    assert.ok(new Subclass() instanceof Subclass, 'correct subclassing with native classes #1');
	    assert.ok(new Subclass() instanceof WeakMap, 'correct subclassing with native classes #2');
	    object = {};
	    assert.same(new Subclass().set(object, 2).get(object), 2, 'correct subclassing with native classes #3');
	  }
	});
	QUnit.test('WeakMap#delete', assert => {
	  assert.isFunction(WeakMap.prototype.delete);
	  if (NATIVE) assert.name(WeakMap.prototype.delete, 'delete');
	  if (NATIVE) assert.arity(WeakMap.prototype.delete, 1);
	  assert.looksNative(WeakMap.prototype.delete);
	  // assert.nonEnumerable(WeakMap.prototype, 'delete');
	  const a = {};
	  const b = {};
	  const weakmap = new WeakMap();
	  weakmap.set(a, 42);
	  weakmap.set(b, 21);
	  assert.ok(weakmap.has(a) && weakmap.has(b), 'WeakMap has values before .delete()');
	  weakmap.delete(a);
	  assert.ok(!weakmap.has(a) && weakmap.has(b), 'WeakMap hasn`t value after .delete()');
	  // assert.notThrows(() => !weakmap.delete(1), 'return false on primitive');
	  const object = {};
	  weakmap.set(object, 42);
	  Object.freeze(object);
	  assert.ok(weakmap.has(object), 'works with frozen objects #1');
	  weakmap.delete(object);
	  assert.ok(!weakmap.has(object), 'works with frozen objects #2');
	});
	QUnit.test('WeakMap#get', assert => {
	  assert.isFunction(WeakMap.prototype.get);
	  if (NATIVE) assert.name(WeakMap.prototype.get, 'get');
	  if (NATIVE) assert.arity(WeakMap.prototype.get, 1);
	  assert.looksNative(WeakMap.prototype.get);
	  // assert.nonEnumerable(WeakMap.prototype, 'get');
	  const weakmap = new WeakMap();
	  assert.strictEqual(weakmap.get({}), undefined, 'WeakMap .get() before .set() return undefined');
	  let object = {};
	  weakmap.set(object, 42);
	  assert.strictEqual(weakmap.get(object), 42, 'WeakMap .get() return value');
	  weakmap.delete(object);
	  assert.strictEqual(weakmap.get(object), undefined, 'WeakMap .get() after .delete() return undefined');
	  // assert.notThrows(() => weakmap.get(1) === undefined, 'return undefined on primitive');
	  object = {};
	  weakmap.set(object, 42);
	  Object.freeze(object);
	  assert.same(weakmap.get(object), 42, 'works with frozen objects #1');
	  weakmap.delete(object);
	  assert.same(weakmap.get(object), undefined, 'works with frozen objects #2');
	});
	QUnit.test('WeakMap#has', assert => {
	  assert.isFunction(WeakMap.prototype.has);
	  if (NATIVE) assert.name(WeakMap.prototype.has, 'has');
	  if (NATIVE) assert.arity(WeakMap.prototype.has, 1);
	  assert.looksNative(WeakMap.prototype.has);
	  // assert.nonEnumerable(WeakMap.prototype, 'has');
	  const weakmap = new WeakMap();
	  assert.ok(!weakmap.has({}), 'WeakMap .has() before .set() return false');
	  let object = {};
	  weakmap.set(object, 42);
	  assert.ok(weakmap.has(object), 'WeakMap .has() return true');
	  weakmap.delete(object);
	  assert.ok(!weakmap.has(object), 'WeakMap .has() after .delete() return false');
	  // assert.notThrows(() => !weakmap.has(1), 'return false on primitive');
	  object = {};
	  weakmap.set(object, 42);
	  Object.freeze(object);
	  assert.ok(weakmap.has(object), 'works with frozen objects #1');
	  weakmap.delete(object);
	  assert.ok(!weakmap.has(object), 'works with frozen objects #2');
	});
	QUnit.test('WeakMap#set', assert => {
	  assert.isFunction(WeakMap.prototype.set);
	  if (NATIVE) assert.name(WeakMap.prototype.set, 'set');
	  assert.arity(WeakMap.prototype.set, 2);
	  assert.looksNative(WeakMap.prototype.set);
	  // assert.nonEnumerable(WeakMap.prototype, 'set');
	  const weakmap = new WeakMap();
	  const object = {};
	  weakmap.set(object, 33);
	  assert.same(weakmap.get(object), 33, 'works with object as keys');
	  // assert.ok(weakmap.set({}, 42) === weakmap, 'chaining');
	  assert.throws(() => new WeakMap().set(42, 42), 'throws with primitive keys');
	  // const object1 = Object.freeze({});
	  // const object2 = {};
	  // weakmap.set(object1, 42);
	  // weakmap.set(object2, 42);
	  // Object.freeze(object2);
	  // assert.same(weakmap.get(object1), 42, 'works with frozen objects #1');
	  // assert.same(weakmap.get(object2), 42, 'works with frozen objects #2');
	  // weakmap.delete(object1);
	  // weakmap.delete(object2);
	  // assert.same(weakmap.get(object1), undefined, 'works with frozen objects #3');
	  // assert.same(weakmap.get(object2), undefined, 'works with frozen objects #4');
	});

	const {
	  ownKeys: ownKeys$3
	} = GLOBAL.Reflect || {};
	QUnit.test('WeakSet', assert => {
	  assert.isFunction(WeakSet);
	  assert.name(WeakSet, 'WeakSet');
	  // assert.arity(WeakSet, 0);
	  assert.looksNative(WeakSet);
	  assert.ok('add' in WeakSet.prototype, 'add in WeakSet.prototype');
	  assert.ok('delete' in WeakSet.prototype, 'delete in WeakSet.prototype');
	  assert.ok('has' in WeakSet.prototype, 'has in WeakSet.prototype');
	  assert.ok(new WeakSet() instanceof WeakSet, 'new WeakSet instanceof WeakSet');
	  let object = {};
	  // assert.ok(new WeakSet(createIterable([object])).has(object), 'Init from iterable');
	  // const weakset = new WeakSet();
	  // const frozen = Object.freeze({});
	  // weakset.add(frozen);
	  // assert.strictEqual(weakset.has(frozen), true, 'works with frozen objects, #1');
	  // weakset.delete(frozen);
	  // assert.strictEqual(weakset.has(frozen), false, 'works with frozen objects, #2');
	  // let done = false;
	  // try {
	  //   new WeakSet(createIterable([null, 1, 2], {
	  //     return() {
	  //       return done = true;
	  //     },
	  //   }));
	  // } catch { /* empty */ }
	  // assert.ok(done, '.return #throw');
	  // assert.ok(!('clear' in WeakSet.prototype), 'should not contains `.clear` method');
	  // const array = [];
	  // done = false;
	  // array['@@iterator'] = undefined;
	  // array[Symbol.iterator] = function() {
	  //   done = true;
	  //   return [][Symbol.iterator].call(this);
	  // };
	  // new WeakSet(array);
	  // assert.ok(done);
	  object = {};
	  new WeakSet().add(object);
	  if (DESCRIPTORS) {
	    const results = [];
	    for (const key in object) results.push(key);
	    assert.arrayEqual(results, []);
	    assert.arrayEqual(Object.keys(object), []);
	  }
	  assert.arrayEqual(Object.getOwnPropertyNames(object), []);
	  if (Object.getOwnPropertySymbols) assert.arrayEqual(Object.getOwnPropertySymbols(object), []);
	  if (ownKeys$3) assert.arrayEqual(ownKeys$3(object), []);
	  if (nativeSubclass) {
	    const Subclass = nativeSubclass(WeakSet);
	    assert.ok(new Subclass() instanceof Subclass, 'correct subclassing with native classes #1');
	    assert.ok(new Subclass() instanceof WeakSet, 'correct subclassing with native classes #2');
	    object = {};
	    assert.ok(new Subclass().add(object).has(object), 'correct subclassing with native classes #3');
	  }
	});
	QUnit.test('WeakSet#add', assert => {
	  assert.isFunction(WeakSet.prototype.add);
	  // assert.name(WeakSet.prototype.add, 'add');
	  assert.arity(WeakSet.prototype.add, 1);
	  assert.looksNative(WeakSet.prototype.add);
	  // assert.nonEnumerable(WeakSet.prototype, 'add');
	  const weakset = new WeakSet();
	  // assert.ok(weakset.add({}) === weakset, 'chaining');
	  assert.throws(() => new WeakSet().add(42), 'throws with primitive keys');
	});
	QUnit.test('WeakSet#delete', assert => {
	  assert.isFunction(WeakSet.prototype.delete);
	  if (NATIVE) assert.arity(WeakSet.prototype.delete, 1);
	  assert.looksNative(WeakSet.prototype.delete);
	  // assert.nonEnumerable(WeakSet.prototype, 'delete');
	  const a = {};
	  const b = {};
	  const weakset = new WeakSet().add(a).add(b);
	  assert.ok(weakset.has(a) && weakset.has(b), 'WeakSet has values before .delete()');
	  weakset.delete(a);
	  assert.ok(!weakset.has(a) && weakset.has(b), 'WeakSet has`nt value after .delete()');
	  // assert.notThrows(() => !weakset.delete(1), 'return false on primitive');
	});
	QUnit.test('WeakSet#has', assert => {
	  assert.isFunction(WeakSet.prototype.has);
	  // assert.name(WeakSet.prototype.has, 'has');
	  assert.arity(WeakSet.prototype.has, 1);
	  assert.looksNative(WeakSet.prototype.has);
	  // assert.nonEnumerable(WeakSet.prototype, 'has');
	  const weakset = new WeakSet();
	  assert.ok(!weakset.has({}), 'WeakSet has`nt value');
	  const object = {};
	  weakset.add(object);
	  assert.ok(weakset.has(object), 'WeakSet has value after .add()');
	  weakset.delete(object);
	  assert.ok(!weakset.has(object), 'WeakSet hasn`t value after .delete()');
	  // assert.notThrows(() => !weakset.has(1), 'return false on primitive');
	});

	var Symbol$6 = window.Symbol;

	var descs = Object.create(null);
	function Symbol$5() {
		var desc = arguments[0];
		if(desc !== undefined) {
			desc = String(desc);
		}
		var s = Symbol$6(desc);
		descs[s] = desc;
		return s;
	};
	Object.setPrototypeOf(Symbol$5, Symbol$6);

	function getSymbolDescription() {
		if(this in descs) {
			return descs[this];
		}
		return String(this).slice(7, -1);
	}

	var Symbol$3;
	if('description' in Symbol$6.prototype) {
		Symbol$3 = Symbol$6;
	} else {
		Symbol$3 = Symbol$5;
		Object.setPrototypeOf(Symbol$3, Symbol$6);
		Object.defineProperty(Symbol$6.prototype, 'description', {
			configurable: true,
			enumerable: false,
			get: getSymbolDescription
		});
	}
	var Symbol$4 = Symbol$3;

	if(Symbol$6 !== Symbol$4) {
		if(!Symbol$4.asyncIterator) { Symbol$4.asyncIterator = Symbol$4("asyncIterator"); }
		window.Symbol = Symbol$4;
	}

	definePrototype(Array, 'values', Array.prototype[Symbol.iterator]);

	function entries() {
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

	definePrototype(Array, 'entries', entries);

	/* eslint-disable radar/no-element-overwrite -- required for testing */
	const {
	  ownKeys: ownKeys$2
	} = GLOBAL.Reflect || {};
	QUnit.test('Map', assert => {
	  assert.isFunction(Map);
	  // assert.arity(Map, 0);
	  assert.name(Map, 'Map');
	  assert.looksNative(Map);
	  assert.ok('clear' in Map.prototype, 'clear in Map.prototype');
	  assert.ok('delete' in Map.prototype, 'delete in Map.prototype');
	  assert.ok('forEach' in Map.prototype, 'forEach in Map.prototype');
	  assert.ok('get' in Map.prototype, 'get in Map.prototype');
	  assert.ok('has' in Map.prototype, 'has in Map.prototype');
	  assert.ok('set' in Map.prototype, 'set in Map.prototype');
	  assert.ok(new Map() instanceof Map, 'new Map instanceof Map');
	  assert.strictEqual(new Map(createIterable([[1, 1], [2, 2], [3, 3]])).size, 3, 'Init from iterable');
	  assert.strictEqual(new Map([[Object.freeze({}), 1], [2, 3]]).size, 2, 'Support frozen objects');
	  let done = false;
	  try {
	    new Map(createIterable([null, 1, 2], {
	      return() {
	        return done = true;
	      }
	    }));
	  } catch (_unused) {/* empty */}
	  assert.ok(done, '.return #throw');
	  const array = [];
	  done = false;
	  array['@@iterator'] = undefined;
	  array[Symbol.iterator] = function () {
	    done = true;
	    return [][Symbol.iterator].call(this);
	  };
	  new Map(array);
	  assert.ok(done);
	  const object = {};
	  new Map().set(object, 1);
	  if (DESCRIPTORS) {
	    const results = [];
	    for (const key in object) results.push(key);
	    assert.arrayEqual(results, []);
	    assert.arrayEqual(Object.keys(object), []);
	  }
	  assert.arrayEqual(Object.getOwnPropertyNames(object), []);
	  if (Object.getOwnPropertySymbols) assert.arrayEqual(Object.getOwnPropertySymbols(object), []);
	  if (ownKeys$2) assert.arrayEqual(ownKeys$2(object), []);
	  if (nativeSubclass) {
	    const Subclass = nativeSubclass(Map);
	    assert.ok(new Subclass() instanceof Subclass, 'correct subclassing with native classes #1');
	    assert.ok(new Subclass() instanceof Map, 'correct subclassing with native classes #2');
	    assert.strictEqual(new Subclass().set(1, 2).get(1), 2, 'correct subclassing with native classes #3');
	  }
	});
	QUnit.test('Map#clear', assert => {
	  assert.isFunction(Map.prototype.clear);
	  assert.arity(Map.prototype.clear, 0);
	  assert.name(Map.prototype.clear, 'clear');
	  assert.looksNative(Map.prototype.clear);
	  // assert.nonEnumerable(Map.prototype, 'clear');
	  let map = new Map();
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
	  const frozen = Object.freeze({});
	  map = new Map();
	  map.set(1, 2);
	  map.set(frozen, 3);
	  map.clear();
	  assert.strictEqual(map.size, 0, 'Support frozen objects');
	  assert.ok(!map.has(1));
	  assert.ok(!map.has(frozen));
	});
	QUnit.test('Map#delete', assert => {
	  assert.isFunction(Map.prototype.delete);
	  // assert.arity(Map.prototype.delete, 1);
	  if (NATIVE) assert.name(Map.prototype.delete, 'delete');
	  assert.looksNative(Map.prototype.delete);
	  // assert.nonEnumerable(Map.prototype, 'delete');
	  const object = {};
	  const map = new Map();
	  map.set(NaN, 1);
	  map.set(2, 1);
	  map.set(3, 7);
	  map.set(2, 5);
	  map.set(1, 4);
	  map.set(object, 9);
	  assert.strictEqual(map.size, 5);
	  assert.ok(map.delete(NaN));
	  assert.strictEqual(map.size, 4);
	  assert.ok(!map.delete(4), 'delete no');
	  assert.strictEqual(map.size, 4);
	  map.delete([]);
	  assert.strictEqual(map.size, 4);
	  map.delete(object);
	  assert.strictEqual(map.size, 3);
	  const frozen = Object.freeze({});
	  map.set(frozen, 42);
	  assert.strictEqual(map.size, 4);
	  map.delete(frozen);
	  assert.strictEqual(map.size, 3);
	});
	QUnit.test('Map#forEach', assert => {
	  assert.isFunction(Map.prototype.forEach);
	  assert.arity(Map.prototype.forEach, 1);
	  assert.name(Map.prototype.forEach, 'forEach');
	  assert.looksNative(Map.prototype.forEach);
	  // assert.nonEnumerable(Map.prototype, 'forEach');
	  let result = {};
	  let count = 0;
	  const object = {};
	  let map = new Map();
	  map.set(NaN, 1);
	  map.set(2, 1);
	  map.set(3, 7);
	  map.set(2, 5);
	  map.set(1, 4);
	  map.set(object, 9);
	  map.forEach((value, key) => {
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
	  map.forEach((value, key) => {
	    result += key;
	    if (key === '2') {
	      map.delete('2');
	      map.delete('3');
	      map.delete('1');
	      map.set('4', 9);
	    }
	  });
	  assert.strictEqual(result, '0124');
	  map = new Map([['0', 1]]);
	  result = '';
	  map.forEach(it => {
	    map.delete('0');
	    if (result !== '') throw new Error();
	    result += it;
	  });
	  assert.strictEqual(result, '1');
	  // assert.throws(() => {
	  //   Map.prototype.forEach.call(new Set(), () => { /* empty */ });
	  // }, 'non-generic');
	});
	QUnit.test('Map#get', assert => {
	  assert.isFunction(Map.prototype.get);
	  assert.name(Map.prototype.get, 'get');
	  assert.arity(Map.prototype.get, 1);
	  assert.looksNative(Map.prototype.get);
	  // assert.nonEnumerable(Map.prototype, 'get');
	  const object = {};
	  const frozen = Object.freeze({});
	  const map = new Map();
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
	QUnit.test('Map#has', assert => {
	  assert.isFunction(Map.prototype.has);
	  assert.name(Map.prototype.has, 'has');
	  assert.arity(Map.prototype.has, 1);
	  assert.looksNative(Map.prototype.has);
	  // assert.nonEnumerable(Map.prototype, 'has');
	  const object = {};
	  const frozen = Object.freeze({});
	  const map = new Map();
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
	QUnit.test('Map#set', assert => {
	  assert.isFunction(Map.prototype.set);
	  assert.name(Map.prototype.set, 'set');
	  assert.arity(Map.prototype.set, 2);
	  assert.looksNative(Map.prototype.set);
	  // assert.nonEnumerable(Map.prototype, 'set');
	  const object = {};
	  let map = new Map();
	  map.set(NaN, 1);
	  map.set(2, 1);
	  map.set(3, 1);
	  map.set(2, 5);
	  map.set(1, 4);
	  map.set(object, object);
	  assert.ok(map.size === 5);
	  const chain = map.set(7, 2);
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
	  const frozen = Object.freeze({});
	  map = new Map().set(frozen, 42);
	  assert.strictEqual(map.get(frozen), 42);
	});
	QUnit.test('Map#size', assert => {
	  // assert.nonEnumerable(Map.prototype, 'size');
	  const map = new Map();
	  map.set(2, 1);
	  const size = map.size;
	  assert.strictEqual(typeof size, 'number', 'size is number');
	  assert.strictEqual(size, 1, 'size is correct');
	  // if(DESCRIPTORS) {
	  //   const sizeDescriptor = Object.getOwnPropertyDescriptor(Map.prototype, 'size');
	  //   assert.ok(sizeDescriptor && sizeDescriptor.get, 'size is getter');
	  //   assert.ok(sizeDescriptor && !sizeDescriptor.set, 'size isnt setter');
	  //   assert.throws(() => Map.prototype.size, TypeError);
	  // }
	});
	QUnit.test('Map & -0', assert => {
	  let map = new Map();
	  map.set(-0, 1);
	  assert.strictEqual(map.size, 1);
	  assert.ok(map.has(0));
	  assert.ok(map.has(-0));
	  assert.strictEqual(map.get(0), 1);
	  assert.strictEqual(map.get(-0), 1);
	  map.forEach((val, key) => {
	    assert.ok(!is(key, -0));
	  });
	  map.delete(-0);
	  assert.strictEqual(map.size, 0);
	  map = new Map([[-0, 1]]);
	  map.forEach((val, key) => {
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

	// QUnit.test('Map#@@toStringTag', assert => {
	//   assert.strictEqual(Map.prototype[Symbol.toStringTag], 'Map', 'Map::@@toStringTag is `Map`');
	//   assert.strictEqual(String(new Map()), '[object Map]', 'correct stringification');
	// });

	QUnit.test('Map Iterator', assert => {
	  const map = new Map();
	  map.set('a', 1);
	  map.set('b', 2);
	  map.set('c', 3);
	  map.set('d', 4);
	  const results = [];
	  const iterator = map.keys();
	  assert.isIterator(iterator);
	  assert.isIterable(iterator);
	  // assert.nonEnumerable(iterator, 'next');
	  // assert.nonEnumerable(iterator, Symbol.iterator);
	  results.push(iterator.next().value);
	  assert.ok(map.delete('a'));
	  assert.ok(map.delete('b'));
	  assert.ok(map.delete('c'));
	  map.set('e');
	  results.push(iterator.next().value, iterator.next().value);
	  assert.ok(iterator.next().done);
	  map.set('f');
	  assert.ok(iterator.next().done);
	  assert.deepEqual(results, ['a', 'd', 'e']);
	});
	QUnit.test('Map#keys', assert => {
	  assert.isFunction(Map.prototype.keys);
	  assert.name(Map.prototype.keys, 'keys');
	  assert.arity(Map.prototype.keys, 0);
	  assert.looksNative(Map.prototype.keys);
	  // assert.nonEnumerable(Map.prototype, 'keys');
	  const map = new Map();
	  map.set('a', 'q');
	  map.set('s', 'w');
	  map.set('d', 'e');
	  const iterator = map.keys();
	  assert.isIterator(iterator);
	  assert.isIterable(iterator);
	  // assert.strictEqual(iterator[Symbol.toStringTag], 'Map Iterator');
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
	QUnit.test('Map#values', assert => {
	  assert.isFunction(Map.prototype.values);
	  assert.name(Map.prototype.values, 'values');
	  assert.arity(Map.prototype.values, 0);
	  assert.looksNative(Map.prototype.values);
	  // assert.nonEnumerable(Map.prototype, 'values');
	  const map = new Map();
	  map.set('a', 'q');
	  map.set('s', 'w');
	  map.set('d', 'e');
	  const iterator = map.values();
	  assert.isIterator(iterator);
	  assert.isIterable(iterator);
	  // assert.strictEqual(iterator[Symbol.toStringTag], 'Map Iterator');
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
	QUnit.test('Map#entries', assert => {
	  assert.isFunction(Map.prototype.entries);
	  assert.name(Map.prototype.entries, 'entries');
	  assert.arity(Map.prototype.entries, 0);
	  assert.looksNative(Map.prototype.entries);
	  // assert.nonEnumerable(Map.prototype, 'entries');
	  const map = new Map();
	  map.set('a', 'q');
	  map.set('s', 'w');
	  map.set('d', 'e');
	  const iterator = map.entries();
	  assert.isIterator(iterator);
	  assert.isIterable(iterator);
	  // assert.strictEqual(iterator[Symbol.toStringTag], 'Map Iterator');
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
	QUnit.test('Map#@@iterator', assert => {
	  assert.isIterable(Map.prototype);
	  assert.name(Map.prototype.entries, 'entries');
	  assert.arity(Map.prototype.entries, 0);
	  assert.looksNative(Map.prototype[Symbol.iterator]);
	  assert.strictEqual(Map.prototype[Symbol.iterator], Map.prototype.entries);
	  const map = new Map();
	  map.set('a', 'q');
	  map.set('s', 'w');
	  map.set('d', 'e');
	  const iterator = map[Symbol.iterator]();
	  assert.isIterator(iterator);
	  assert.isIterable(iterator);
	  // assert.strictEqual(iterator[Symbol.toStringTag], 'Map Iterator');
	  // assert.strictEqual(String(iterator), '[object Map Iterator]');
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

	/* eslint-disable radar/no-element-overwrite -- required for testing */
	const {
	  ownKeys: ownKeys$1
	} = GLOBAL.Reflect || {};
	QUnit.test('Set', assert => {
	  assert.isFunction(Set);
	  assert.name(Set, 'Set');
	  // assert.arity(Set, 0);
	  assert.looksNative(Set);
	  assert.ok('add' in Set.prototype, 'add in Set.prototype');
	  assert.ok('clear' in Set.prototype, 'clear in Set.prototype');
	  assert.ok('delete' in Set.prototype, 'delete in Set.prototype');
	  assert.ok('forEach' in Set.prototype, 'forEach in Set.prototype');
	  assert.ok('has' in Set.prototype, 'has in Set.prototype');
	  assert.ok(new Set() instanceof Set, 'new Set instanceof Set');
	  const set = new Set();
	  set.add(1);
	  set.add(2);
	  set.add(3);
	  set.add(2);
	  set.add(1);
	  assert.strictEqual(set.size, 3);
	  const result = [];
	  set.forEach(val => {
	    result.push(val);
	  });
	  assert.deepEqual(result, [1, 2, 3]);
	  assert.strictEqual(new Set(createIterable([1, 2, 3])).size, 3, 'Init from iterable');
	  assert.strictEqual(new Set([Object.freeze({}), 1]).size, 2, 'Support frozen objects');
	  assert.strictEqual(new Set([NaN, NaN, NaN]).size, 1);
	  assert.deepEqual(Array.from(new Set([3, 4]).add(2).add(1)), [3, 4, 2, 1]);
	  let done = false;
	  const add = Set.prototype.add;
	  // eslint-disable-next-line no-extend-native -- required for testing
	  Set.prototype.add = function () {
	    throw new Error();
	  };
	  try {
	    new Set(createIterable([null, 1, 2], {
	      return() {
	        return done = true;
	      }
	    }));
	  } catch (_unused) {/* empty */}
	  // eslint-disable-next-line no-extend-native -- required for testing
	  Set.prototype.add = add;
	  assert.ok(done, '.return #throw');
	  const array = [];
	  done = false;
	  array['@@iterator'] = undefined;
	  array[Symbol.iterator] = function () {
	    done = true;
	    return [][Symbol.iterator].call(this);
	  };
	  new Set(array);
	  assert.ok(done);
	  const object = {};
	  new Set().add(object);
	  if (DESCRIPTORS) {
	    const results = [];
	    for (const key in object) results.push(key);
	    assert.arrayEqual(results, []);
	    assert.arrayEqual(Object.keys(object), []);
	  }
	  assert.arrayEqual(Object.getOwnPropertyNames(object), []);
	  if (Object.getOwnPropertySymbols) assert.arrayEqual(Object.getOwnPropertySymbols(object), []);
	  if (ownKeys$1) assert.arrayEqual(ownKeys$1(object), []);
	  if (nativeSubclass) {
	    const Subclass = nativeSubclass(Set);
	    assert.ok(new Subclass() instanceof Subclass, 'correct subclassing with native classes #1');
	    assert.ok(new Subclass() instanceof Set, 'correct subclassing with native classes #2');
	    assert.ok(new Subclass().add(2).has(2), 'correct subclassing with native classes #3');
	  }
	});
	QUnit.test('Set#add', assert => {
	  assert.isFunction(Set.prototype.add);
	  assert.name(Set.prototype.add, 'add');
	  assert.arity(Set.prototype.add, 1);
	  assert.looksNative(Set.prototype.add);
	  // assert.nonEnumerable(Set.prototype, 'add');
	  const array = [];
	  let set = new Set();
	  set.add(NaN);
	  set.add(2);
	  set.add(3);
	  set.add(2);
	  set.add(1);
	  set.add(array);
	  assert.strictEqual(set.size, 5);
	  const chain = set.add(NaN);
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
	  const frozen = Object.freeze({});
	  set = new Set();
	  set.add(frozen);
	  assert.ok(set.has(frozen));
	});
	QUnit.test('Set#clear', assert => {
	  assert.isFunction(Set.prototype.clear);
	  assert.name(Set.prototype.clear, 'clear');
	  assert.arity(Set.prototype.clear, 0);
	  assert.looksNative(Set.prototype.clear);
	  // assert.nonEnumerable(Set.prototype, 'clear');
	  let set = new Set();
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
	  const frozen = Object.freeze({});
	  set = new Set();
	  set.add(1);
	  set.add(frozen);
	  set.clear();
	  assert.strictEqual(set.size, 0, 'Support frozen objects');
	  assert.ok(!set.has(1));
	  assert.ok(!set.has(frozen));
	});
	QUnit.test('Set#delete', assert => {
	  assert.isFunction(Set.prototype.delete);
	  if (NATIVE) assert.name(Set.prototype.delete, 'delete');
	  assert.arity(Set.prototype.delete, 1);
	  assert.looksNative(Set.prototype.delete);
	  // assert.nonEnumerable(Set.prototype, 'delete');
	  const array = [];
	  const set = new Set();
	  set.add(NaN);
	  set.add(2);
	  set.add(3);
	  set.add(2);
	  set.add(1);
	  set.add(array);
	  assert.strictEqual(set.size, 5);
	  assert.strictEqual(set.delete(NaN), true);
	  assert.strictEqual(set.size, 4);
	  assert.strictEqual(set.delete(4), false);
	  assert.strictEqual(set.size, 4);
	  set.delete([]);
	  assert.strictEqual(set.size, 4);
	  set.delete(array);
	  assert.strictEqual(set.size, 3);
	  const frozen = Object.freeze({});
	  set.add(frozen);
	  assert.strictEqual(set.size, 4);
	  set.delete(frozen);
	  assert.strictEqual(set.size, 3);
	});
	QUnit.test('Set#forEach', assert => {
	  assert.isFunction(Set.prototype.forEach);
	  assert.name(Set.prototype.forEach, 'forEach');
	  assert.arity(Set.prototype.forEach, 1);
	  assert.looksNative(Set.prototype.forEach);
	  // assert.nonEnumerable(Set.prototype, 'forEach');
	  let result = [];
	  let count = 0;
	  let set = new Set();
	  set.add(1);
	  set.add(2);
	  set.add(3);
	  set.add(2);
	  set.add(1);
	  set.forEach(value => {
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
	  set.forEach(it => {
	    result += it;
	    if (it === '2') {
	      set.delete('2');
	      set.delete('3');
	      set.delete('1');
	      set.add('4');
	    }
	  });
	  assert.strictEqual(result, '0124');
	  set = new Set();
	  set.add('0');
	  result = '';
	  set.forEach(it => {
	    set.delete('0');
	    if (result !== '') throw new Error();
	    result += it;
	  });
	  assert.strictEqual(result, '0');
	  // assert.throws(() => {
	  //   Set.prototype.forEach.call(new Map(), () => { /* empty */ });
	  // }, 'non-generic');
	});
	QUnit.test('Set#has', assert => {
	  assert.isFunction(Set.prototype.has);
	  assert.name(Set.prototype.has, 'has');
	  assert.arity(Set.prototype.has, 1);
	  assert.looksNative(Set.prototype.has);
	  // assert.nonEnumerable(Set.prototype, 'has');
	  const array = [];
	  const frozen = Object.freeze({});
	  const set = new Set();
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
	QUnit.test('Set#size', assert => {
	  // assert.nonEnumerable(Set.prototype, 'size');
	  const set = new Set();
	  set.add(1);
	  const size = set.size;
	  ;
	  assert.strictEqual(typeof size, 'number', 'size is number');
	  assert.strictEqual(size, 1, 'size is correct');
	  // if(DESCRIPTORS) {
	  //   const sizeDescriptor = Object.getOwnPropertyDescriptor(Set.prototype, 'size');
	  //   assert.ok(sizeDescriptor && sizeDescriptor.get, 'size is getter');
	  //   assert.ok(sizeDescriptor && !sizeDescriptor.set, 'size isnt setter');
	  //   assert.throws(() => Set.prototype.size, TypeError);
	  // }
	});
	QUnit.test('Set & -0', assert => {
	  let set = new Set();
	  set.add(-0);
	  assert.strictEqual(set.size, 1);
	  assert.ok(set.has(0));
	  assert.ok(set.has(-0));
	  set.forEach(it => {
	    assert.ok(!is(it, -0));
	  });
	  set.delete(-0);
	  assert.strictEqual(set.size, 0);
	  set = new Set([-0]);
	  set.forEach(key => {
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

	// QUnit.test('Set#@@toStringTag', assert => {
	//   assert.strictEqual(Set.prototype[Symbol.toStringTag], 'Set', 'Set::@@toStringTag is `Set`');
	//   assert.strictEqual(String(new Set()), '[object Set]', 'correct stringification');
	// });

	QUnit.test('Set Iterator', assert => {
	  const set = new Set();
	  set.add('a');
	  set.add('b');
	  set.add('c');
	  set.add('d');
	  const results = [];
	  const iterator = set.keys();
	  results.push(iterator.next().value);
	  assert.ok(set.delete('a'));
	  assert.ok(set.delete('b'));
	  assert.ok(set.delete('c'));
	  set.add('e');
	  results.push(iterator.next().value, iterator.next().value);
	  assert.ok(iterator.next().done);
	  set.add('f');
	  assert.ok(iterator.next().done);
	  assert.deepEqual(results, ['a', 'd', 'e']);
	});
	QUnit.test('Set#keys', assert => {
	  assert.isFunction(Set.prototype.keys);
	  assert.name(Set.prototype.keys, 'values');
	  assert.arity(Set.prototype.keys, 0);
	  assert.looksNative(Set.prototype.keys);
	  assert.strictEqual(Set.prototype.keys, Set.prototype.values);
	  // assert.nonEnumerable(Set.prototype, 'keys');
	  const set = new Set();
	  set.add('q');
	  set.add('w');
	  set.add('e');
	  const iterator = set.keys();
	  assert.isIterator(iterator);
	  assert.isIterable(iterator);
	  // assert.strictEqual(iterator[Symbol.toStringTag], 'Set Iterator');
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
	QUnit.test('Set#values', assert => {
	  assert.isFunction(Set.prototype.values);
	  assert.name(Set.prototype.values, 'values');
	  assert.arity(Set.prototype.values, 0);
	  assert.looksNative(Set.prototype.values);
	  // assert.nonEnumerable(Set.prototype, 'values');
	  const set = new Set();
	  set.add('q');
	  set.add('w');
	  set.add('e');
	  const iterator = set.values();
	  assert.isIterator(iterator);
	  assert.isIterable(iterator);
	  // assert.strictEqual(iterator[Symbol.toStringTag], 'Set Iterator');
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
	QUnit.test('Set#entries', assert => {
	  assert.isFunction(Set.prototype.entries);
	  assert.name(Set.prototype.entries, 'entries');
	  assert.arity(Set.prototype.entries, 0);
	  assert.looksNative(Set.prototype.entries);
	  // assert.nonEnumerable(Set.prototype, 'entries');
	  const set = new Set();
	  set.add('q');
	  set.add('w');
	  set.add('e');
	  const iterator = set.entries();
	  assert.isIterator(iterator);
	  assert.isIterable(iterator);
	  // assert.strictEqual(iterator[Symbol.toStringTag], 'Set Iterator');
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
	QUnit.test('Set#@@iterator', assert => {
	  assert.isIterable(Set.prototype);
	  assert.name(Set.prototype[Symbol.iterator], 'values');
	  assert.arity(Set.prototype[Symbol.iterator], 0);
	  assert.looksNative(Set.prototype[Symbol.iterator]);
	  assert.strictEqual(Set.prototype[Symbol.iterator], Set.prototype.values);
	  // assert.nonEnumerable(Set.prototype, 'values');
	  const set = new Set();
	  set.add('q');
	  set.add('w');
	  set.add('e');
	  const iterator = set[Symbol.iterator]();
	  assert.isIterator(iterator);
	  assert.isIterable(iterator);
	  // assert.strictEqual(iterator[Symbol.toStringTag], 'Set Iterator');
	  // assert.strictEqual(String(iterator), '[object Set Iterator]');
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

	QUnit.test('String#@@iterator', assert => {
	  assert.isIterable(String.prototype);
	  let iterator = 'qwe'[Symbol.iterator]();
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

	QUnit.test('Array#keys', assert => {
	  const keys = Array.prototype.keys;
	  assert.isFunction(keys);
	  assert.arity(keys, 0);
	  assert.name(keys, 'keys');
	  const iterator = ['q', 'w', 'e'].keys();
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
	  // has native not support
	  // assert.deepEqual(keys.call({
	  // 	length: -1,
	  // }).next(), {
	  // 	value: undefined,
	  // 	done: true,
	  // }, 'uses ToLength');
	});
	QUnit.test('Array#values', assert => {
	  const values = Array.prototype.values;
	  assert.isFunction(values);
	  assert.arity(values, 0);
	  // assert.name(values, 'values');
	  const iterator = ['q', 'w', 'e'].values();
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
	  // assert.deepEqual(values.call({
	  // 	length: -1,
	  // }).next(), {
	  // 	value: undefined,
	  // 	done: true,
	  // }, 'uses ToLength');
	});
	QUnit.test('Array#entries', assert => {
	  const entries = Array.prototype.entries;
	  assert.isFunction(entries);
	  assert.arity(entries, 0);
	  assert.name(entries, 'entries');
	  const iterator = ['q', 'w', 'e'].entries();
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
	  // assert.deepEqual(entries.call({
	  // 	length: -1,
	  // }).next(), {
	  // 	value: undefined,
	  // 	done: true,
	  // }, 'uses ToLength');
	});
	QUnit.test('Array#@@iterator', assert => {
	  assert.isIterable(Array.prototype);
	  assert.arity(Array.prototype[Symbol.iterator], 0);
	  // assert.name(Array.prototype[Symbol.iterator], 'values');
	  assert.strictEqual(Array.prototype[Symbol.iterator], Array.prototype.values);
	  const iterator = ['q', 'w', 'e'][Symbol.iterator]();
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
	  // assert.deepEqual(Array.prototype[Symbol.iterator].call({
	  // 	length: -1,
	  // }).next(), {
	  // 	value: undefined,
	  // 	done: true,
	  // }, 'uses ToLength');
	});

	const {
	  ownKeys
	} = GLOBAL.Reflect || {};
	QUnit.test('Symbol', assert => {
	  assert.isFunction(Symbol);
	  if (NATIVE) assert.strictEqual(Symbol.length, 0, 'arity is 0');
	  // assert.name(Symbol, 'Symbol');
	  const symbol1 = Symbol('symbol');
	  const symbol2 = Symbol('symbol');
	  assert.ok(symbol1 !== symbol2, 'Symbol("symbol") !== Symbol("symbol")');
	  const object = {};
	  object[symbol1] = 42;
	  assert.ok(object[symbol1] === 42, 'Symbol() work as key');
	  assert.ok(object[symbol2] !== 42, 'Various symbols from one description are various keys');
	  if (DESCRIPTORS) {
	    let count = 0;
	    // eslint-disable-next-line no-unused-vars -- required for testing
	    for (const key in object) count++;
	    assert.ok(count === 0, 'object[Symbol()] is not enumerable');
	  }
	});
	QUnit.test('Well-known Symbols', assert => {
	  assert.ok(Symbol.hasInstance, `Symbol.hasInstance available`);
	  assert.ok(Symbol.iterator, `Symbol.iterator available`);
	  assert.ok(Symbol.asyncIterator, `Symbol.asyncIterator available`);
	});
	QUnit.test('Global symbol registry', assert => {
	  assert.isFunction(Symbol.for, 'Symbol.for is function');
	  assert.strictEqual(Symbol.for.length, 1, 'Symbol.for arity is 1');
	  if (NATIVE) assert.strictEqual(Symbol.for.name, 'for', 'Symbol.for.name is "for"');
	  assert.isFunction(Symbol.keyFor, 'Symbol.keyFor is function');
	  assert.strictEqual(Symbol.keyFor.length, 1, 'Symbol.keyFor arity is 1');
	  assert.name(Symbol.keyFor, 'keyFor');
	  const symbol = Symbol.for('foo');
	  assert.strictEqual(Symbol.for('foo'), symbol);
	  assert.strictEqual(Symbol.keyFor(symbol), 'foo');
	  assert.throws(() => Symbol.keyFor('foo'), 'throws on non-symbol');
	});
	QUnit.test('Object.getOwnPropertySymbols', assert => {
	  assert.isFunction(Object.getOwnPropertySymbols);
	  assert.strictEqual(Object.getOwnPropertySymbols.length, 1, 'arity is 1');
	  // assert.name(Object.getOwnPropertySymbols, 'getOwnPropertySymbols');
	  const prototype = {
	    q: 1,
	    w: 2,
	    e: 3
	  };
	  prototype[Symbol()] = 42;
	  prototype[Symbol()] = 43;
	  assert.deepEqual(Object.getOwnPropertyNames(prototype).sort(), ['e', 'q', 'w']);
	  assert.strictEqual(Object.getOwnPropertySymbols(prototype).length, 2);
	  const object = Object.create(prototype);
	  object.a = 1;
	  object.s = 2;
	  object.d = 3;
	  object[Symbol()] = 44;
	  assert.deepEqual(Object.getOwnPropertyNames(object).sort(), ['a', 'd', 's']);
	  assert.strictEqual(Object.getOwnPropertySymbols(object).length, 1);
	  // assert.strictEqual(Object.getOwnPropertySymbols(Object.prototype).length, 0);
	  const primitives = [42, 'foo', false];
	  for (const value of primitives) {
	    assert.notThrows(() => Object.getOwnPropertySymbols(value), `accept ${typeof value}`);
	  }
	});
	if (JSON) {
	  QUnit.test('Symbols & JSON.stringify', assert => {
	    assert.strictEqual(JSON.stringify([1, Symbol('foo'), false, Symbol('bar'), {}]), '[1,null,false,null,{}]', 'array value');
	    assert.strictEqual(JSON.stringify({
	      symbol: Symbol('symbol')
	    }), '{}', 'object value');
	    if (DESCRIPTORS) {
	      const object = {
	        bar: 2
	      };
	      object[Symbol('symbol')] = 1;
	      assert.strictEqual(JSON.stringify(object), '{"bar":2}', 'object key');
	    }
	    // assert.strictEqual(JSON.stringify(Symbol('symbol')), undefined, 'symbol value');
	    // if(typeof Symbol() === 'symbol') {
	    // 	assert.strictEqual(JSON.stringify(Object(Symbol('symbol'))), '{}', 'boxed symbol');
	    // }
	    // assert.strictEqual(JSON.stringify(undefined, () => 42), '42', 'replacer works with top-level undefined');
	  });
	}
	if (DESCRIPTORS) {
	  QUnit.test('Symbols & descriptors', assert => {
	    const d = Symbol('d');
	    const e = Symbol('e');
	    const f = Symbol('f');
	    const i = Symbol('i');
	    const j = Symbol('j');
	    const prototype = {
	      g: 'g'
	    };
	    prototype[i] = 'i';
	    Object.defineProperty(prototype, 'h', {
	      value: 'h'
	    });
	    Object.defineProperty(prototype, 'j', {
	      value: 'j'
	    });
	    const object = Object.create(prototype);
	    object.a = 'a';
	    object[d] = 'd';
	    Object.defineProperty(object, 'b', {
	      value: 'b'
	    });
	    Object.defineProperty(object, 'c', {
	      value: 'c',
	      enumerable: true
	    });
	    Object.defineProperty(object, e, {
	      configurable: true,
	      writable: true,
	      value: 'e'
	    });
	    const descriptor = {
	      value: 'f',
	      enumerable: true
	    };
	    Object.defineProperty(object, f, descriptor);
	    assert.strictEqual(descriptor.enumerable, true, 'defineProperty not changes descriptor object');
	    assert.deepEqual(Object.getOwnPropertyDescriptor(object, 'a'), {
	      configurable: true,
	      writable: true,
	      enumerable: true,
	      value: 'a'
	    }, 'getOwnPropertyDescriptor a');
	    assert.deepEqual(Object.getOwnPropertyDescriptor(object, 'b'), {
	      configurable: false,
	      writable: false,
	      enumerable: false,
	      value: 'b'
	    }, 'getOwnPropertyDescriptor b');
	    assert.deepEqual(Object.getOwnPropertyDescriptor(object, 'c'), {
	      configurable: false,
	      writable: false,
	      enumerable: true,
	      value: 'c'
	    }, 'getOwnPropertyDescriptor c');
	    // assert.deepEqual(Object.getOwnPropertyDescriptor(object, d), {
	    // 	configurable: true,
	    // 	writable: true,
	    // 	enumerable: true,
	    // 	value: 'd',
	    // }, 'getOwnPropertyDescriptor d');
	    assert.deepEqual(Object.getOwnPropertyDescriptor(object, e), {
	      configurable: true,
	      writable: true,
	      enumerable: false,
	      value: 'e'
	    }, 'getOwnPropertyDescriptor e');
	    assert.deepEqual(Object.getOwnPropertyDescriptor(object, f), {
	      configurable: false,
	      writable: false,
	      enumerable: true,
	      value: 'f'
	    }, 'getOwnPropertyDescriptor f');
	    assert.strictEqual(Object.getOwnPropertyDescriptor(object, 'g'), undefined, 'getOwnPropertyDescriptor g');
	    assert.strictEqual(Object.getOwnPropertyDescriptor(object, 'h'), undefined, 'getOwnPropertyDescriptor h');
	    assert.strictEqual(Object.getOwnPropertyDescriptor(object, i), undefined, 'getOwnPropertyDescriptor i');
	    assert.strictEqual(Object.getOwnPropertyDescriptor(object, j), undefined, 'getOwnPropertyDescriptor j');
	    assert.strictEqual(Object.getOwnPropertyDescriptor(object, 'k'), undefined, 'getOwnPropertyDescriptor k');
	    assert.strictEqual(Object.getOwnPropertyDescriptor(Object.prototype, 'toString').enumerable, false, 'getOwnPropertyDescriptor on Object.prototype');
	    // assert.strictEqual(Object.getOwnPropertyDescriptor(Object.prototype, d), undefined, 'getOwnPropertyDescriptor on Object.prototype missed symbol');
	    assert.strictEqual(Object.keys(object).length, 2, 'Object.keys');
	    assert.strictEqual(Object.getOwnPropertyNames(object).length, 3, 'Object.getOwnPropertyNames');
	    assert.strictEqual(Object.getOwnPropertySymbols(object).length, 3, 'Object.getOwnPropertySymbols');
	    // assert.strictEqual(ownKeys(object).length, 6, 'Reflect.ownKeys');
	    delete object[e];
	    object[e] = 'e';
	    // assert.deepEqual(Object.getOwnPropertyDescriptor(object, e), {
	    // 	configurable: true,
	    // 	writable: true,
	    // 	enumerable: true,
	    // 	value: 'e',
	    // }, 'redefined non-enum key');
	  });
	  QUnit.test('Symbols & Object.defineProperties', assert => {
	    const c = Symbol('c');
	    const d = Symbol('d');
	    const descriptors = {
	      a: {
	        configurable: true,
	        writable: true,
	        enumerable: true,
	        value: 'a'
	      }
	    };
	    descriptors[c] = {
	      configurable: true,
	      writable: true,
	      enumerable: false,
	      value: 'c'
	    };
	    Object.defineProperty(descriptors, 'b', {
	      configurable: true,
	      writable: true,
	      enumerable: true,
	      value: {
	        configurable: true,
	        writable: true,
	        enumerable: true,
	        value: 'b'
	      }
	    });
	    Object.defineProperty(descriptors, d, {
	      configurable: true,
	      writable: true,
	      enumerable: false,
	      value: {
	        configurable: true,
	        writable: true,
	        enumerable: false,
	        value: 'd'
	      }
	    });
	    const object = Object.defineProperties({}, descriptors);
	    assert.strictEqual(object.a, 'a', 'a');
	    // assert.strictEqual(object.b, undefined, 'b');
	    // assert.strictEqual(object[c], 'c', 'c');
	    assert.strictEqual(object[d], undefined, 'd');
	  });
	  QUnit.test('Symbols & Object.create', assert => {
	    const c = Symbol('c');
	    const d = Symbol('d');
	    const descriptors = {
	      a: {
	        configurable: true,
	        writable: true,
	        enumerable: true,
	        value: 'a'
	      }
	    };
	    descriptors[c] = {
	      configurable: true,
	      writable: true,
	      enumerable: false,
	      value: 'c'
	    };
	    Object.defineProperty(descriptors, 'b', {
	      configurable: true,
	      writable: true,
	      enumerable: true,
	      value: {
	        configurable: true,
	        writable: true,
	        enumerable: true,
	        value: 'b'
	      }
	    });
	    Object.defineProperty(descriptors, d, {
	      configurable: true,
	      writable: true,
	      enumerable: false,
	      value: {
	        configurable: true,
	        writable: true,
	        enumerable: false,
	        value: 'd'
	      }
	    });
	    const object = Object.create(null, descriptors);
	    assert.strictEqual(object.a, 'a', 'a');
	    // assert.strictEqual(object.b, undefined, 'b');
	    // assert.strictEqual(object[c], 'c', 'c');
	    assert.strictEqual(object[d], undefined, 'd');
	  });

	  // const constructors = ['Map', 'Set', 'Promise'];
	  // for(const name of constructors) {
	  // 	QUnit.test(`${name}@@species`, assert => {
	  // 		assert.strictEqual(GLOBAL[name][Symbol.species], GLOBAL[name], `${name}@@species === ${name}`);
	  // 		const Subclass = create(GLOBAL[name]);
	  // 		assert.strictEqual(Subclass[Symbol.species], Subclass, `${name} subclass`);
	  // 	});
	  // }

	  // QUnit.test('Array@@species', assert => {
	  // 	assert.strictEqual(Array[Symbol.species], Array, 'Array@@species === Array');
	  // 	const Subclass = create(Array);
	  // 	assert.strictEqual(Subclass[Symbol.species], Subclass, 'Array subclass');
	  // });

	  QUnit.test('Symbol.sham flag', assert => {
	    assert.same(Symbol.sham, typeof Symbol() === 'symbol' ? undefined : true);
	  });
	}

	QUnit.test('Math.imul', assert => {
	  assert.isFunction(Math.imul);
	  assert.name(Math.imul, 'imul');
	  assert.arity(Math.imul, 2);
	  assert.looksNative(Math.imul);
	  // assert.nonEnumerable(Math, 'imul');
	  assert.same(Math.imul(0, 0), 0);
	  assert.strictEqual(Math.imul(123, 456), 56088);
	  assert.strictEqual(Math.imul(-123, 456), -56088);
	  assert.strictEqual(Math.imul(123, -456), -56088);
	  assert.strictEqual(Math.imul(19088743, 4275878552), 602016552);
	  assert.same(Math.imul(false, 7), 0);
	  assert.same(Math.imul(7, false), 0);
	  assert.same(Math.imul(false, false), 0);
	  assert.strictEqual(Math.imul(true, 7), 7);
	  assert.strictEqual(Math.imul(7, true), 7);
	  assert.strictEqual(Math.imul(true, true), 1);
	  assert.same(Math.imul(undefined, 7), 0);
	  assert.same(Math.imul(7, undefined), 0);
	  assert.same(Math.imul(undefined, undefined), 0);
	  assert.same(Math.imul('str', 7), 0);
	  assert.same(Math.imul(7, 'str'), 0);
	  assert.same(Math.imul({}, 7), 0);
	  assert.same(Math.imul(7, {}), 0);
	  assert.same(Math.imul([], 7), 0);
	  assert.same(Math.imul(7, []), 0);
	  assert.strictEqual(Math.imul(0xFFFFFFFF, 5), -5);
	  assert.strictEqual(Math.imul(0xFFFFFFFE, 5), -10);
	  assert.strictEqual(Math.imul(2, 4), 8);
	  assert.strictEqual(Math.imul(-1, 8), -8);
	  assert.strictEqual(Math.imul(-2, -2), 4);
	  assert.same(Math.imul(-0, 7), 0);
	  assert.same(Math.imul(7, -0), 0);
	  assert.same(Math.imul(0.1, 7), 0);
	  assert.same(Math.imul(7, 0.1), 0);
	  assert.same(Math.imul(0.9, 7), 0);
	  assert.same(Math.imul(7, 0.9), 0);
	  assert.strictEqual(Math.imul(1.1, 7), 7);
	  assert.strictEqual(Math.imul(7, 1.1), 7);
	  assert.strictEqual(Math.imul(1.9, 7), 7);
	  assert.strictEqual(Math.imul(7, 1.9), 7);
	});

	QUnit.test('Math.acosh', assert => {
	  assert.isFunction(Math.acosh);
	  assert.name(Math.acosh, 'acosh');
	  assert.arity(Math.acosh, 1);
	  assert.looksNative(Math.acosh);
	  // assert.nonEnumerable(Math, 'acosh');
	  assert.same(Math.acosh(NaN), NaN);
	  assert.same(Math.acosh(0.5), NaN);
	  assert.same(Math.acosh(-1), NaN);
	  assert.same(Math.acosh(-1e300), NaN);
	  assert.same(Math.acosh(1), 0);
	  assert.strictEqual(Math.acosh(Infinity), Infinity);
	  assert.epsilon(Math.acosh(1234), 7.811163220849231);
	  assert.epsilon(Math.acosh(8.88), 2.8737631531629235);
	  assert.epsilon(Math.acosh(1e+160), 369.10676205960726);
	  assert.epsilon(Math.acosh(Number.MAX_VALUE), 710.475860073944);
	  assert.epsilon(Math.acosh(1 + Number.EPSILON), 2.1073424255447017e-8);
	});

	QUnit.test('Math.asinh', assert => {
	  assert.isFunction(Math.asinh);
	  assert.name(Math.asinh, 'asinh');
	  assert.arity(Math.asinh, 1);
	  assert.looksNative(Math.asinh);
	  // assert.nonEnumerable(Math, 'asinh');
	  assert.same(Math.asinh(NaN), NaN);
	  assert.same(Math.asinh(0), 0);
	  assert.same(Math.asinh(-0), -0);
	  assert.strictEqual(Math.asinh(Infinity), Infinity);
	  assert.strictEqual(Math.asinh(-Infinity), -Infinity);
	  assert.epsilon(Math.asinh(1234), 7.811163549201245);
	  assert.epsilon(Math.asinh(9.99), 2.997227420191335);
	  assert.epsilon(Math.asinh(1e150), 346.0809111296668);
	  assert.epsilon(Math.asinh(1e7), 16.811242831518268);
	  assert.epsilon(Math.asinh(-1e7), -16.811242831518268);
	});

	QUnit.test('Math.atanh', assert => {
	  assert.isFunction(Math.atanh);
	  assert.name(Math.atanh, 'atanh');
	  assert.arity(Math.atanh, 1);
	  assert.looksNative(Math.atanh);
	  // assert.nonEnumerable(Math, 'atanh');
	  assert.same(Math.atanh(NaN), NaN);
	  assert.same(Math.atanh(-2), NaN);
	  assert.same(Math.atanh(-1.5), NaN);
	  assert.same(Math.atanh(2), NaN);
	  assert.same(Math.atanh(1.5), NaN);
	  assert.strictEqual(Math.atanh(-1), -Infinity);
	  assert.strictEqual(Math.atanh(1), Infinity);
	  assert.same(Math.atanh(0), 0);
	  assert.same(Math.atanh(-0), -0);
	  assert.same(Math.atanh(-1e300), NaN);
	  assert.same(Math.atanh(1e300), NaN);
	  assert.epsilon(Math.atanh(0.5), 0.5493061443340549);
	  assert.epsilon(Math.atanh(-0.5), -0.5493061443340549);
	  assert.epsilon(Math.atanh(0.444), 0.47720201260109457);
	});

	QUnit.test('Math.cbrt', assert => {
	  assert.isFunction(Math.cbrt);
	  assert.name(Math.cbrt, 'cbrt');
	  assert.arity(Math.cbrt, 1);
	  assert.looksNative(Math.cbrt);
	  // assert.nonEnumerable(Math, 'cbrt');
	  assert.same(Math.cbrt(NaN), NaN);
	  assert.same(Math.cbrt(0), 0);
	  assert.same(Math.cbrt(-0), -0);
	  assert.strictEqual(Math.cbrt(Infinity), Infinity);
	  assert.strictEqual(Math.cbrt(-Infinity), -Infinity);
	  assert.strictEqual(Math.cbrt(-8), -2);
	  assert.strictEqual(Math.cbrt(8), 2);
	  assert.epsilon(Math.cbrt(-1000), -10);
	  assert.epsilon(Math.cbrt(1000), 10);
	});

	QUnit.test('Math.cosh', assert => {
	  assert.isFunction(Math.cosh);
	  assert.name(Math.cosh, 'cosh');
	  assert.arity(Math.cosh, 1);
	  assert.looksNative(Math.cosh);
	  // assert.nonEnumerable(Math, 'cosh');
	  assert.same(Math.cosh(NaN), NaN);
	  assert.strictEqual(Math.cosh(0), 1);
	  assert.strictEqual(Math.cosh(-0), 1);
	  assert.strictEqual(Math.cosh(Infinity), Infinity);
	  assert.strictEqual(Math.cosh(-Infinity), Infinity);
	  assert.epsilon(Math.cosh(12), 81377.395712574, 1e-9);
	  assert.epsilon(Math.cosh(22), 1792456423.065795780980053377, 1e-5);
	  assert.epsilon(Math.cosh(-10), 11013.23292010332313972137);
	  assert.epsilon(Math.cosh(-23), 4872401723.1244513000, 1e-5);
	  assert.epsilon(Math.cosh(710), 1.1169973830808557e+308, 1e+295);
	});

	QUnit.test('Math.expm1', assert => {
	  assert.isFunction(Math.expm1);
	  assert.name(Math.expm1, 'expm1');
	  assert.arity(Math.expm1, 1);
	  assert.looksNative(Math.expm1);
	  // assert.nonEnumerable(Math, 'expm1');
	  assert.same(Math.expm1(NaN), NaN);
	  assert.same(Math.expm1(0), 0);
	  assert.same(Math.expm1(-0), -0);
	  assert.strictEqual(Math.expm1(Infinity), Infinity);
	  assert.strictEqual(Math.expm1(-Infinity), -1);
	  assert.epsilon(Math.expm1(10), 22025.465794806718);
	  assert.epsilon(Math.expm1(-10), -0.9999546000702375);
	});

	QUnit.test('Math.log10', assert => {
	  assert.isFunction(Math.log10);
	  assert.name(Math.log10, 'log10');
	  assert.arity(Math.log10, 1);
	  assert.looksNative(Math.log10);
	  // assert.nonEnumerable(Math, 'log10');
	  assert.same(Math.log10(''), Math.log10(0));
	  assert.same(Math.log10(NaN), NaN);
	  assert.same(Math.log10(-1), NaN);
	  assert.same(Math.log10(0), -Infinity);
	  assert.same(Math.log10(-0), -Infinity);
	  assert.same(Math.log10(1), 0);
	  assert.same(Math.log10(Infinity), Infinity);
	  assert.epsilon(Math.log10(0.1), -1);
	  assert.epsilon(Math.log10(0.5), -0.3010299956639812);
	  assert.epsilon(Math.log10(1.5), 0.17609125905568124);
	  assert.epsilon(Math.log10(5), 0.6989700043360189);
	  assert.epsilon(Math.log10(50), 1.6989700043360187);
	  assert.epsilon(Math.log10(1000), 3);
	});

	QUnit.test('Math.log1p', assert => {
	  assert.isFunction(Math.log1p);
	  assert.name(Math.log1p, 'log1p');
	  assert.arity(Math.log1p, 1);
	  assert.looksNative(Math.log1p);
	  // assert.nonEnumerable(Math, 'log1p');
	  assert.same(Math.log1p(''), Math.log1p(0));
	  assert.same(Math.log1p(NaN), NaN);
	  assert.same(Math.log1p(-2), NaN);
	  assert.same(Math.log1p(-1), -Infinity);
	  assert.same(Math.log1p(0), 0);
	  assert.same(Math.log1p(-0), -0);
	  assert.same(Math.log1p(Infinity), Infinity);
	  assert.epsilon(Math.log1p(5), 1.791759469228055);
	  assert.epsilon(Math.log1p(50), 3.9318256327243257);
	});

	QUnit.test('Math.log2', assert => {
	  assert.isFunction(Math.log2);
	  assert.name(Math.log2, 'log2');
	  assert.arity(Math.log2, 1);
	  assert.looksNative(Math.log2);
	  // assert.nonEnumerable(Math, 'log2');
	  assert.same(Math.log2(''), Math.log2(0));
	  assert.same(Math.log2(NaN), NaN);
	  assert.same(Math.log2(-1), NaN);
	  assert.same(Math.log2(0), -Infinity);
	  assert.same(Math.log2(-0), -Infinity);
	  assert.same(Math.log2(1), 0);
	  assert.same(Math.log2(Infinity), Infinity);
	  assert.same(Math.log2(0.5), -1);
	  assert.same(Math.log2(32), 5);
	  assert.epsilon(Math.log2(5), 2.321928094887362);
	});

	QUnit.test('Math.sinh', assert => {
	  assert.isFunction(Math.sinh);
	  assert.name(Math.sinh, 'sinh');
	  assert.arity(Math.sinh, 1);
	  assert.looksNative(Math.sinh);
	  // assert.nonEnumerable(Math, 'sinh');
	  assert.same(Math.sinh(NaN), NaN);
	  assert.same(Math.sinh(0), 0);
	  assert.same(Math.sinh(-0), -0);
	  assert.strictEqual(Math.sinh(Infinity), Infinity);
	  assert.strictEqual(Math.sinh(-Infinity), -Infinity);
	  assert.epsilon(Math.sinh(-5), -74.20321057778875);
	  assert.epsilon(Math.sinh(2), 3.6268604078470186);
	  assert.strictEqual(Math.sinh(-2e-17), -2e-17);
	});

	QUnit.test('Math.tanh', assert => {
	  assert.isFunction(Math.tanh);
	  assert.name(Math.tanh, 'tanh');
	  assert.arity(Math.tanh, 1);
	  assert.looksNative(Math.tanh);
	  // assert.nonEnumerable(Math, 'tanh');
	  assert.same(Math.tanh(NaN), NaN);
	  assert.same(Math.tanh(0), 0);
	  assert.same(Math.tanh(-0), -0);
	  assert.strictEqual(Math.tanh(Infinity), 1);
	  assert.strictEqual(Math.tanh(90), 1);
	  assert.epsilon(Math.tanh(10), 0.9999999958776927);
	  if (NATIVE) assert.strictEqual(Math.tanh(710), 1);
	});

	QUnit.test('Math.trunc', assert => {
	  assert.isFunction(Math.trunc);
	  assert.name(Math.trunc, 'trunc');
	  assert.arity(Math.trunc, 1);
	  assert.looksNative(Math.trunc);
	  // assert.nonEnumerable(Math, 'trunc');
	  assert.same(Math.trunc(NaN), NaN, 'NaN -> NaN');
	  assert.same(Math.trunc(-0), -0, '-0 -> -0');
	  assert.same(Math.trunc(0), 0, '0 -> 0');
	  assert.same(Math.trunc(Infinity), Infinity, 'Infinity -> Infinity');
	  assert.same(Math.trunc(-Infinity), -Infinity, '-Infinity -> -Infinity');
	  assert.same(Math.trunc(null), 0, 'null -> 0');
	  assert.same(Math.trunc({}), NaN, '{} -> NaN');
	  assert.strictEqual(Math.trunc([]), 0, '[] -> 0');
	  assert.strictEqual(Math.trunc(1.01), 1, '1.01 -> 0');
	  assert.strictEqual(Math.trunc(1.99), 1, '1.99 -> 0');
	  assert.strictEqual(Math.trunc(-1), -1, '-1 -> -1');
	  assert.strictEqual(Math.trunc(-1.99), -1, '-1.99 -> -1');
	  assert.strictEqual(Math.trunc(-555.555), -555, '-555.555 -> -555');
	  assert.strictEqual(Math.trunc(0x20000000000001), 0x20000000000001, '0x20000000000001 -> 0x20000000000001');
	  assert.strictEqual(Math.trunc(-0x20000000000001), -0x20000000000001, '-0x20000000000001 -> -0x20000000000001');
	});

	QUnit.test('Math.sign', assert => {
	  assert.isFunction(Math.sign);
	  assert.name(Math.sign, 'sign');
	  assert.arity(Math.sign, 1);
	  assert.looksNative(Math.sign);
	  // assert.nonEnumerable(Math, 'sign');
	  assert.same(Math.sign(NaN), NaN);
	  assert.same(Math.sign(), NaN);
	  assert.same(Math.sign(-0), -0);
	  assert.same(Math.sign(0), 0);
	  assert.strictEqual(Math.sign(Infinity), 1);
	  assert.strictEqual(Math.sign(-Infinity), -1);
	  assert.strictEqual(Math.sign(13510798882111488), 1);
	  assert.strictEqual(Math.sign(-13510798882111488), -1);
	  assert.strictEqual(Math.sign(42.5), 1);
	  assert.strictEqual(Math.sign(-42.5), -1);
	});

	QUnit.test('Math.fround', assert => {
	  assert.isFunction(Math.fround);
	  assert.name(Math.fround, 'fround');
	  assert.arity(Math.fround, 1);
	  assert.looksNative(Math.fround);
	  // assert.nonEnumerable(Math, 'fround');
	  assert.same(Math.fround(undefined), NaN);
	  assert.same(Math.fround(NaN), NaN);
	  assert.same(Math.fround(0), 0);
	  assert.same(Math.fround(-0), -0);
	  assert.same(Math.fround(Number.MIN_VALUE), 0);
	  assert.same(Math.fround(-Number.MIN_VALUE), -0);
	  assert.strictEqual(Math.fround(Infinity), Infinity);
	  assert.strictEqual(Math.fround(-Infinity), -Infinity);
	  assert.strictEqual(Math.fround(1.7976931348623157e+308), Infinity);
	  assert.strictEqual(Math.fround(-1.7976931348623157e+308), -Infinity);
	  assert.strictEqual(Math.fround(3.4028235677973366e+38), Infinity);
	  assert.strictEqual(Math.fround(3), 3);
	  assert.strictEqual(Math.fround(-3), -3);
	  const maxFloat32 = 3.4028234663852886e+38;
	  const minFloat32 = 1.401298464324817e-45;
	  assert.strictEqual(Math.fround(maxFloat32), maxFloat32);
	  assert.strictEqual(Math.fround(-maxFloat32), -maxFloat32);
	  assert.strictEqual(Math.fround(maxFloat32 + 2 ** 102), maxFloat32);
	  assert.strictEqual(Math.fround(minFloat32), minFloat32);
	  assert.strictEqual(Math.fround(-minFloat32), -minFloat32);
	  assert.same(Math.fround(minFloat32 / 2), 0);
	  assert.same(Math.fround(-minFloat32 / 2), -0);
	  assert.strictEqual(Math.fround(minFloat32 / 2 + 2 ** -202), minFloat32);
	  assert.strictEqual(Math.fround(-minFloat32 / 2 - 2 ** -202), -minFloat32);
	});

	QUnit.test('Math.hypot', assert => {
	  assert.isFunction(Math.hypot);
	  assert.name(Math.hypot, 'hypot');
	  assert.arity(Math.hypot, 2);
	  assert.looksNative(Math.hypot);
	  // assert.nonEnumerable(Math, 'hypot');
	  assert.strictEqual(Math.hypot(), 0);
	  assert.strictEqual(Math.hypot(1), 1);
	  assert.same(Math.hypot('', 0), 0);
	  assert.same(Math.hypot(0, ''), 0);
	  assert.strictEqual(Math.hypot(Infinity, 0), Infinity, 'Infinity, 0');
	  assert.strictEqual(Math.hypot(-Infinity, 0), Infinity, '-Infinity, 0');
	  assert.strictEqual(Math.hypot(0, Infinity), Infinity, '0, Infinity');
	  assert.strictEqual(Math.hypot(0, -Infinity), Infinity, '0, -Infinity');
	  assert.strictEqual(Math.hypot(Infinity, NaN), Infinity, 'Infinity, NaN');
	  assert.strictEqual(Math.hypot(NaN, -Infinity), Infinity, 'NaN, -Infinity');
	  assert.same(Math.hypot(NaN, 0), NaN, 'NaN, 0');
	  assert.same(Math.hypot(0, NaN), NaN, '0, NaN');
	  assert.same(Math.hypot(0, -0), 0);
	  assert.same(Math.hypot(0, 0), 0);
	  assert.same(Math.hypot(-0, -0), 0);
	  assert.same(Math.hypot(-0, 0), 0);
	  assert.strictEqual(Math.hypot(0, 1), 1);
	  assert.strictEqual(Math.hypot(0, -1), 1);
	  assert.strictEqual(Math.hypot(-0, 1), 1);
	  assert.strictEqual(Math.hypot(-0, -1), 1);
	  assert.same(Math.hypot(0), 0);
	  assert.strictEqual(Math.hypot(1), 1);
	  assert.strictEqual(Math.hypot(2), 2);
	  assert.strictEqual(Math.hypot(0, 0, 1), 1);
	  assert.strictEqual(Math.hypot(0, 1, 0), 1);
	  assert.strictEqual(Math.hypot(1, 0, 0), 1);
	  assert.strictEqual(Math.hypot(2, 3, 4), Math.sqrt(2 * 2 + 3 * 3 + 4 * 4));
	  assert.strictEqual(Math.hypot(2, 3, 4, 5), Math.sqrt(2 * 2 + 3 * 3 + 4 * 4 + 5 * 5));
	  assert.epsilon(Math.hypot(66, 66), 93.33809511662427);
	  assert.epsilon(Math.hypot(0.1, 100), 100.0000499999875);
	  assert.strictEqual(Math.hypot(1e+300, 1e+300), 1.4142135623730952e+300);
	  assert.strictEqual(Math.floor(Math.hypot(1e-300, 1e-300) * 1e308), 141421356);
	  assert.strictEqual(Math.hypot(1e+300, 1e+300, 2, 3), 1.4142135623730952e+300);
	  assert.strictEqual(Math.hypot(-3, 4), 5);
	  assert.strictEqual(Math.hypot(3, -4), 5);
	});

	QUnit.test('Math.clz32', assert => {
	  assert.isFunction(Math.clz32);
	  assert.name(Math.clz32, 'clz32');
	  assert.arity(Math.clz32, 1);
	  assert.looksNative(Math.clz32);
	  // assert.nonEnumerable(Math, 'clz32');
	  assert.strictEqual(Math.clz32(0), 32);
	  assert.strictEqual(Math.clz32(1), 31);
	  assert.same(Math.clz32(-1), 0);
	  assert.strictEqual(Math.clz32(0.6), 32);
	  assert.same(Math.clz32(2 ** 32 - 1), 0);
	  assert.strictEqual(Math.clz32(2 ** 32), 32);
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

	definePrototype(String, 'startsWith', startsWith);

	const Symbol$2 = GLOBAL.Symbol || {};
	QUnit.test('String#startsWith', assert => {
	  const startsWith = String.prototype.startsWith;
	  assert.isFunction(startsWith);
	  assert.arity(startsWith, 1);
	  assert.name(startsWith, 'startsWith');
	  assert.nonEnumerable(String.prototype, 'startsWith');
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
	    assert.throws(() => startsWith.call(null, '.'), TypeError);
	    assert.throws(() => startsWith.call(undefined, '.'), TypeError);
	  }
	  // const regexp = /./;
	  // assert.throws(() => '/./'.startsWith(regexp), TypeError);
	  const object = {};
	  assert.notThrows(() => '[object Object]'.startsWith(object));
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

	definePrototype(String, 'endsWith', endsWith);

	const Symbol$1 = GLOBAL.Symbol || {};
	QUnit.test('String#endsWith', assert => {
	  const endsWith = String.prototype.endsWith;
	  assert.isFunction(endsWith);
	  assert.arity(endsWith, 1);
	  assert.name(endsWith, 'endsWith');
	  assert.looksNative(endsWith);
	  assert.nonEnumerable(String.prototype, 'endsWith');
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
	    assert.throws(() => endsWith.call(null, '.'), TypeError);
	    assert.throws(() => endsWith.call(undefined, '.'), TypeError);
	  }
	  // const regexp = /./;
	  // assert.throws(() => '/./'.endsWith(regexp), TypeError);
	  const object = {};
	  assert.notThrows(() => '[object Object]'.endsWith(object));
	});

	QUnit.test('String#repeat', assert => {
	  const repeat = String.prototype.repeat;
	  assert.isFunction(repeat);
	  assert.arity(repeat, 1);
	  assert.looksNative(repeat);
	  assert.nonEnumerable(String.prototype, 'repeat');
	  assert.strictEqual('qwe'.repeat(3), 'qweqweqwe');
	  assert.strictEqual('qwe'.repeat(2.5), 'qweqwe');
	  assert.throws(() => 'qwe'.repeat(-1), RangeError);
	  assert.throws(() => 'qwe'.repeat(Infinity), RangeError);
	  if (STRICT) {
	    assert.throws(() => repeat.call(null, 1), TypeError);
	    assert.throws(() => repeat.call(undefined, 1), TypeError);
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

	definePrototype(String, 'codePointAt', codePointAt);

	QUnit.test('String#codePointAt', assert => {
	  const codePointAt = String.prototype.codePointAt;
	  assert.isFunction(codePointAt);
	  assert.arity(codePointAt, 1);
	  assert.name(codePointAt, 'codePointAt');
	  assert.looksNative(codePointAt);
	  assert.nonEnumerable(String.prototype, 'codePointAt');
	  assert.strictEqual('abc\uD834\uDF06def'.codePointAt(''), 0x61);
	  assert.strictEqual('abc\uD834\uDF06def'.codePointAt('_'), 0x61);
	  assert.strictEqual('abc\uD834\uDF06def'.codePointAt(), 0x61);
	  assert.strictEqual('abc\uD834\uDF06def'.codePointAt(-Infinity), undefined);
	  assert.strictEqual('abc\uD834\uDF06def'.codePointAt(-1), undefined);
	  assert.strictEqual('abc\uD834\uDF06def'.codePointAt(-0), 0x61);
	  assert.strictEqual('abc\uD834\uDF06def'.codePointAt(0), 0x61);
	  assert.strictEqual('abc\uD834\uDF06def'.codePointAt(3), 0x1D306);
	  assert.strictEqual('abc\uD834\uDF06def'.codePointAt(4), 0xDF06);
	  assert.strictEqual('abc\uD834\uDF06def'.codePointAt(5), 0x64);
	  assert.strictEqual('abc\uD834\uDF06def'.codePointAt(42), undefined);
	  assert.strictEqual('abc\uD834\uDF06def'.codePointAt(Infinity), undefined);
	  assert.strictEqual('abc\uD834\uDF06def'.codePointAt(Infinity), undefined);
	  assert.strictEqual('abc\uD834\uDF06def'.codePointAt(NaN), 0x61);
	  assert.strictEqual('abc\uD834\uDF06def'.codePointAt(false), 0x61);
	  assert.strictEqual('abc\uD834\uDF06def'.codePointAt(null), 0x61);
	  assert.strictEqual('abc\uD834\uDF06def'.codePointAt(undefined), 0x61);
	  assert.strictEqual('\uD834\uDF06def'.codePointAt(''), 0x1D306);
	  assert.strictEqual('\uD834\uDF06def'.codePointAt('1'), 0xDF06);
	  assert.strictEqual('\uD834\uDF06def'.codePointAt('_'), 0x1D306);
	  assert.strictEqual('\uD834\uDF06def'.codePointAt(), 0x1D306);
	  assert.strictEqual('\uD834\uDF06def'.codePointAt(-1), undefined);
	  assert.strictEqual('\uD834\uDF06def'.codePointAt(-0), 0x1D306);
	  assert.strictEqual('\uD834\uDF06def'.codePointAt(0), 0x1D306);
	  assert.strictEqual('\uD834\uDF06def'.codePointAt(1), 0xDF06);
	  assert.strictEqual('\uD834\uDF06def'.codePointAt(42), undefined);
	  assert.strictEqual('\uD834\uDF06def'.codePointAt(false), 0x1D306);
	  assert.strictEqual('\uD834\uDF06def'.codePointAt(null), 0x1D306);
	  assert.strictEqual('\uD834\uDF06def'.codePointAt(undefined), 0x1D306);
	  assert.strictEqual('\uD834abc'.codePointAt(''), 0xD834);
	  assert.strictEqual('\uD834abc'.codePointAt('_'), 0xD834);
	  assert.strictEqual('\uD834abc'.codePointAt(), 0xD834);
	  assert.strictEqual('\uD834abc'.codePointAt(-1), undefined);
	  assert.strictEqual('\uD834abc'.codePointAt(-0), 0xD834);
	  assert.strictEqual('\uD834abc'.codePointAt(0), 0xD834);
	  assert.strictEqual('\uD834abc'.codePointAt(false), 0xD834);
	  assert.strictEqual('\uD834abc'.codePointAt(NaN), 0xD834);
	  assert.strictEqual('\uD834abc'.codePointAt(null), 0xD834);
	  assert.strictEqual('\uD834abc'.codePointAt(undefined), 0xD834);
	  assert.strictEqual('\uDF06abc'.codePointAt(''), 0xDF06);
	  assert.strictEqual('\uDF06abc'.codePointAt('_'), 0xDF06);
	  assert.strictEqual('\uDF06abc'.codePointAt(), 0xDF06);
	  assert.strictEqual('\uDF06abc'.codePointAt(-1), undefined);
	  assert.strictEqual('\uDF06abc'.codePointAt(-0), 0xDF06);
	  assert.strictEqual('\uDF06abc'.codePointAt(0), 0xDF06);
	  assert.strictEqual('\uDF06abc'.codePointAt(false), 0xDF06);
	  assert.strictEqual('\uDF06abc'.codePointAt(NaN), 0xDF06);
	  assert.strictEqual('\uDF06abc'.codePointAt(null), 0xDF06);
	  assert.strictEqual('\uDF06abc'.codePointAt(undefined), 0xDF06);
	  if (STRICT) {
	    assert.throws(() => codePointAt.call(null, 0), TypeError);
	    assert.throws(() => codePointAt.call(undefined, 0), TypeError);
	  }
	});

	QUnit.test('String.fromCodePoint', assert => {
	  const fromCodePoint = String.fromCodePoint;
	  assert.isFunction(fromCodePoint);
	  // assert.arity(fromCodePoint, 1);
	  assert.name(fromCodePoint, 'fromCodePoint');
	  assert.looksNative(fromCodePoint);
	  // assert.nonEnumerable(String, 'fromCodePoint');
	  assert.strictEqual(fromCodePoint(''), '\0');
	  assert.strictEqual(fromCodePoint(), '');
	  assert.strictEqual(fromCodePoint(-0), '\0');
	  assert.strictEqual(fromCodePoint(0), '\0');
	  assert.strictEqual(fromCodePoint(0x1D306), '\uD834\uDF06');
	  assert.strictEqual(fromCodePoint(0x1D306, 0x61, 0x1D307), '\uD834\uDF06a\uD834\uDF07');
	  assert.strictEqual(fromCodePoint(0x61, 0x62, 0x1D307), 'ab\uD834\uDF07');
	  assert.strictEqual(fromCodePoint(false), '\0');
	  assert.strictEqual(fromCodePoint(null), '\0');
	  assert.throws(() => fromCodePoint('_'), RangeError);
	  assert.throws(() => fromCodePoint('+Infinity'), RangeError);
	  assert.throws(() => fromCodePoint('-Infinity'), RangeError);
	  assert.throws(() => fromCodePoint(-1), RangeError);
	  assert.throws(() => fromCodePoint(0x10FFFF + 1), RangeError);
	  assert.throws(() => fromCodePoint(3.14), RangeError);
	  assert.throws(() => fromCodePoint(3e-2), RangeError);
	  assert.throws(() => fromCodePoint(-Infinity), RangeError);
	  assert.throws(() => fromCodePoint(Infinity), RangeError);
	  assert.throws(() => fromCodePoint(NaN), RangeError);
	  assert.throws(() => fromCodePoint(undefined), RangeError);
	  assert.throws(() => fromCodePoint({}), RangeError);
	  assert.throws(() => fromCodePoint(/./), RangeError);
	  let number = 0x60;
	  assert.strictEqual(fromCodePoint({
	    valueOf() {
	      return ++number;
	    }
	  }), 'a');
	  assert.strictEqual(number, 0x61);
	  // one code unit per symbol
	  let counter = 2 ** 15 * 3 / 2;
	  let result = [];
	  while (--counter >= 0) result.push(0);
	  // should not throw
	  fromCodePoint.apply(null, result);
	  counter = 2 ** 15 * 3 / 2;
	  result = [];
	  while (--counter >= 0) result.push(0xFFFF + 1);
	  // should not throw
	  fromCodePoint.apply(null, result);
	});

	QUnit.test('String.raw', assert => {
	  const raw = String.raw;
	  assert.isFunction(raw);
	  assert.arity(raw, 1);
	  assert.name(raw, 'raw');
	  assert.looksNative(raw);
	  // assert.nonEnumerable(String, 'raw');
	  assert.strictEqual(raw({
	    raw: ['Hi\\n', '!']
	  }, 'Bob'), 'Hi\\nBob!', 'raw is array');
	  assert.strictEqual(raw({
	    raw: 'test'
	  }, 0, 1, 2), 't0e1s2t', 'raw is string');
	  assert.strictEqual(raw({
	    raw: 'test'
	  }, 0), 't0est', 'lacks substituting');
	  assert.throws(() => raw({}), TypeError);
	  assert.throws(() => raw({
	    raw: null
	  }), TypeError);
	});

	function includes$1(search) {
		if(search instanceof RegExp) {
			throw new TypeError("First argument must not be a regular expression");
		}
		var start = arguments[1];
		if(typeof start !== 'number') {
			start = 0;
		}
		return this.indexOf(search, start) !== -1;
	}

	definePrototype(String, 'includes', includes$1);

	var isNaN$3 = window.isNaN;

	function isNaN$2(value) {
		return typeof value === "number" && isNaN$3(value);
	}

	var isNaN$1 = Number.isNaN || isNaN$2;

	function includes(search) {
		var i = this.length;
		while(i-- > 0) {
			var value = this[i];
			if(value === search || isNaN$1(value) && isNaN$1(search)) {
				return true;
			}
		}
		return false;
	}

	definePrototype(Array, 'includes', includes);

	QUnit.test('String#includes', assert => {
	  const includes = String.prototype.includes;
	  assert.isFunction(includes);
	  assert.arity(includes, 1);
	  assert.name(includes, 'includes');
	  assert.looksNative(includes);
	  assert.nonEnumerable(String.prototype, 'includes');
	  assert.ok(!'abc'.includes());
	  assert.ok('aundefinedb'.includes());
	  assert.ok('abcd'.includes('b', 1));
	  assert.ok(!'abcd'.includes('b', 2));
	  if (STRICT) {
	    assert.throws(() => includes.call(null, '.'), TypeError);
	    assert.throws(() => includes.call(undefined, '.'), TypeError);
	  }
	  const regexp = /./;
	  assert.throws(() => '/./'.includes(regexp), TypeError);
	  const object = {};
	  assert.notThrows(() => '[object Object]'.includes(object));
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

	definePrototype(Array, 'findIndex', findIndex);

	QUnit.test('Array#findIndex', assert => {
	  const findIndex = Array.prototype.findIndex;
	  assert.isFunction(findIndex);
	  assert.arity(findIndex, 1);
	  assert.name(findIndex, 'findIndex');
	  assert.looksNative(findIndex);
	  assert.nonEnumerable(Array.prototype, 'findIndex');
	  const array = [1];
	  const context = {};
	  array.findIndex(function (value, key, that) {
	    assert.same(arguments.length, 3, 'correct number of callback arguments');
	    assert.same(value, 1, 'correct value in callback');
	    assert.same(key, 0, 'correct index in callback');
	    assert.same(that, array, 'correct link to array in callback');
	    assert.same(this, context, 'correct callback context');
	  }, context);
	  // eslint-disable-next-line unicorn/prefer-array-index-of -- ignore
	  assert.same([1, 3, NaN, 42, {}].findIndex(it => it === 42), 3);
	  // eslint-disable-next-line unicorn/prefer-array-index-of -- ignore
	  assert.same([1, 3, NaN, 42, {}].findIndex(it => it === 43), -1);
	  if (STRICT) {
	    assert.throws(() => findIndex.call(null, 0), TypeError);
	    assert.throws(() => findIndex.call(undefined, 0), TypeError);
	  }
	  assert.notThrows(() => findIndex.call({
	    length: -1,
	    0: 1
	  }, () => {
	    throw new Error();
	  }) === -1, 'uses ToLength');
	});

	function find(callback) {
		var thisArg = arguments[1];
		var i = findIndex.call(this, callback, thisArg);
		if(i >= 0) {
			return this[i];
		}
	};

	definePrototype(Array, 'find', find);

	QUnit.test('Array#find', assert => {
	  const find = Array.prototype.find;
	  assert.isFunction(find);
	  assert.arity(find, 1);
	  assert.name(find, 'find');
	  assert.looksNative(find);
	  assert.nonEnumerable(Array.prototype, 'find');
	  const array = [1];
	  const context = {};
	  array.find(function (value, key, that) {
	    assert.same(arguments.length, 3, 'correct number of callback arguments');
	    assert.same(value, 1, 'correct value in callback');
	    assert.same(key, 0, 'correct index in callback');
	    assert.same(that, array, 'correct link to array in callback');
	    assert.same(this, context, 'correct callback context');
	  }, context);
	  assert.same([1, 3, NaN, 42, {}].find(it => it === 42), 42);
	  assert.same([1, 3, NaN, 42, {}].find(it => it === 43), undefined);
	  if (STRICT) {
	    assert.throws(() => find.call(null, 0), TypeError);
	    assert.throws(() => find.call(undefined, 0), TypeError);
	  }
	  assert.notThrows(() => find.call({
	    length: -1,
	    0: 1
	  }, () => {
	    throw new Error();
	  }) === undefined, 'uses ToLength');
	});

	QUnit.test('Array.of', assert => {
	  const defineProperty = Object.defineProperty;
	  assert.isFunction(Array.of);
	  assert.arity(Array.of, 0);
	  assert.name(Array.of, 'of');
	  assert.looksNative(Array.of);
	  // assert.nonEnumerable(Array, 'of');
	  assert.deepEqual(Array.of(1), [1]);
	  assert.deepEqual(Array.of(1, 2, 3), [1, 2, 3]);
	  class C {/* empty */}
	  const instance = Array.of.call(C, 1, 2);
	  assert.ok(instance instanceof C);
	  assert.strictEqual(instance[0], 1);
	  assert.strictEqual(instance[1], 2);
	  assert.strictEqual(instance.length, 2);
	  // if(DESCRIPTORS) {
	  // 	let called = false;
	  // 	defineProperty(C.prototype, 0, {
	  // 		set() {
	  // 			called = true;
	  // 		},
	  // 	});
	  // 	Array.of.call(C, 1, 2, 3);
	  // 	assert.ok(!called, 'Should not call prototype accessors');
	  // }
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
	};

	definePrototype(Array, 'fill', fill);

	QUnit.test('Array#fill', assert => {
	  const fill = Array.prototype.fill;
	  assert.isFunction(fill);
	  assert.arity(fill, 1);
	  assert.name(fill, 'fill');
	  assert.looksNative(fill);
	  assert.nonEnumerable(Array.prototype, 'fill');
	  const array = new Array(5);
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
	    assert.throws(() => fill.call(null, 0), TypeError);
	    assert.throws(() => fill.call(undefined, 0), TypeError);
	  }
	  if (NATIVE && DESCRIPTORS) {
	    assert.notThrows(() => fill.call(Object.defineProperty({
	      length: -1
	    }, 0, {
	      set() {
	        throw Error();
	      }
	    })), 'uses ToLength');
	  }
	});

	QUnit.test('Array.from', assert => {
	  const from = Array.from;
	  const defineProperty = Object.defineProperty;
	  assert.isFunction(from);
	  assert.arity(from, 1);
	  assert.name(from, 'from');
	  assert.looksNative(from);
	  // assert.nonEnumerable(Array, 'from');
	  let types = {
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
	  for (const type in types) {
	    const data = types[type];
	    assert.arrayEqual(from(data), ['1', '2', '3'], `Works with ${type}`);
	    assert.arrayEqual(from(data, it => it ** 2), [1, 4, 9], `Works with ${type} + mapFn`);
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
	  for (const type in types) {
	    const data = types[type];
	    const context = {};
	    assert.arrayEqual(from(data, function (value, key) {
	      assert.same(this, context, `Works with ${type}, correct callback context`);
	      assert.same(value, type === 'string' ? '1' : 1, `Works with ${type}, correct callback key`);
	      assert.same(key, 0, `Works with ${type}, correct callback value`);
	      assert.same(arguments.length, 2, `Works with ${type}, correct callback arguments number`);
	      return 42;
	    }, context), [42], `Works with ${type}, correct result`);
	  }
	  const primitives = [false, true, 0];
	  for (const primitive of primitives) {
	    assert.arrayEqual(from(primitive), [], `Works with ${primitive}`);
	  }
	  assert.throws(() => from(null), TypeError, 'Throws on null');
	  assert.throws(() => from(undefined), TypeError, 'Throws on undefined');
	  assert.arrayEqual(from('𠮷𠮷𠮷'), ['𠮷', '𠮷', '𠮷'], 'Uses correct string iterator');
	  let done = true;
	  from(createIterable([1, 2, 3], {
	    return() {
	      return done = false;
	    }
	  }), () => false);
	  assert.ok(done, '.return #default');
	  done = false;
	  try {
	    from(createIterable([1, 2, 3], {
	      return() {
	        return done = true;
	      }
	    }), () => {
	      throw new Error();
	    });
	  } catch (_unused) {/* empty */}
	  assert.ok(done, '.return #throw');
	  class C {/* empty */}
	  let instance = from.call(C, createIterable([1, 2]));
	  assert.ok(instance instanceof C, 'generic, iterable case, instanceof');
	  assert.arrayEqual(instance, [1, 2], 'generic, iterable case, elements');
	  instance = from.call(C, {
	    0: 1,
	    1: 2,
	    length: 2
	  });
	  assert.ok(instance instanceof C, 'generic, array-like case, instanceof');
	  assert.arrayEqual(instance, [1, 2], 'generic, array-like case, elements');
	  let array = [1, 2, 3];
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
	  assert.notThrows(() => from({
	    length: -1,
	    0: 1
	  }, () => {
	    throw new Error();
	  }).length === 0, 'Uses ToLength');
	  assert.arrayEqual(from([], undefined), [], 'Works with undefined as asecond argument');
	  assert.throws(() => from([], null), TypeError, 'Throws with null as second argument');
	  assert.throws(() => from([], 0), TypeError, 'Throws with 0 as second argument');
	  assert.throws(() => from([], ''), TypeError, 'Throws with "" as second argument');
	  assert.throws(() => from([], false), TypeError, 'Throws with false as second argument');
	  assert.throws(() => from([], {}), TypeError, 'Throws with {} as second argument');
	  // if(DESCRIPTORS) {
	  // 	let called = false;
	  // 	defineProperty(C.prototype, 0, {
	  // 		set() {
	  // 			called = true;
	  // 		},
	  // 	});
	  // 	from.call(C, [1, 2, 3]);
	  // 	assert.ok(!called, 'Should not call prototype accessors');
	  // }
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

	definePrototype(Array, 'copyWithin', copyWithin);

	QUnit.test('Array#copyWithin', assert => {
	  const copyWithin = Array.prototype.copyWithin;
	  assert.isFunction(copyWithin);
	  assert.arity(copyWithin, 2);
	  assert.name(copyWithin, 'copyWithin');
	  const array = [1];
	  assert.strictEqual(array.copyWithin(0), array);
	  assert.nonEnumerable(Array.prototype, 'copyWithin');
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
	    assert.throws(() => copyWithin.call(null, 0), TypeError);
	    assert.throws(() => copyWithin.call(undefined, 0), TypeError);
	  }
	});

	QUnit.test('Object.assign', assert => {
	  assert.isFunction(Object.assign);
	  assert.arity(Object.assign, 2);
	  assert.name(Object.assign, 'assign');
	  assert.looksNative(Object.assign);
	  // assert.nonEnumerable(Object, 'assign');
	  let object = {
	    q: 1
	  };
	  assert.strictEqual(object, Object.assign(object, {
	    bar: 2
	  }), 'assign return target');
	  assert.strictEqual(object.bar, 2, 'assign define properties');
	  assert.deepEqual(Object.assign({}, {
	    q: 1
	  }, {
	    w: 2
	  }), {
	    q: 1,
	    w: 2
	  });
	  assert.deepEqual(Object.assign({}, 'qwe'), {
	    0: 'q',
	    1: 'w',
	    2: 'e'
	  });
	  assert.throws(() => Object.assign(null, {
	    q: 1
	  }), TypeError);
	  assert.throws(() => Object.assign(undefined, {
	    q: 1
	  }), TypeError);
	  let string = Object.assign('qwe', {
	    q: 1
	  });
	  assert.strictEqual(typeof string, 'object');
	  assert.strictEqual(String(string), 'qwe');
	  assert.strictEqual(string.q, 1);
	  assert.same(Object.assign({}, {
	    valueOf: 42
	  }).valueOf, 42, 'IE enum keys bug');
	  if (DESCRIPTORS) {
	    object = {
	      baz: 1
	    };
	    Object.assign(object, Object.defineProperty({}, 'bar', {
	      get() {
	        return this.baz + 1;
	      }
	    }));
	    assert.ok(object.bar === undefined, "assign don't copy descriptors");
	    object = {
	      a: 'a'
	    };
	    const c = Symbol('c');
	    const d = Symbol('d');
	    object[c] = 'c';
	    Object.defineProperty(object, 'b', {
	      value: 'b'
	    });
	    Object.defineProperty(object, d, {
	      value: 'd'
	    });
	    const object2 = Object.assign({}, object);
	    assert.strictEqual(object2.a, 'a', 'a');
	    assert.strictEqual(object2.b, undefined, 'b');
	    assert.strictEqual(object2[c], 'c', 'c');
	    // assert.strictEqual(object2[d], undefined, 'defineProperty 不允许使用Symbol');
	    // try {
	    //   assert.strictEqual(Function('assign', `
	    //     return assign({ b: 1 }, { get a() {
	    //       delete this.b;
	    //     }, b: 2 });
	    //   `)(Object.assign).b, 1);
	    // } catch { /* empty */ }
	    // try {
	    //   assert.strictEqual(Function('assign', `
	    //     return assign({ b: 1 }, { get a() {
	    //       Object.defineProperty(this, "b", {
	    //         value: 3,
	    //         enumerable: false
	    //       });
	    //     }, b: 2 });
	    //   `)(Object.assign).b, 1);
	    // } catch { /* empty */ }
	  }
	  // 不保证对象遍历的顺序
	  // string = 'abcdefghijklmnopqrst';
	  // const result = {};
	  // for(let i = 0, { length } = string; i < length; ++i) {
	  //   const char = string.charAt(i);
	  //   result[char] = char;
	  // }
	  // assert.strictEqual(Object.keys(Object.assign({}, result)).join(''), string);
	});

	if (DESCRIPTORS) {
	  QUnit.test('Function#name', assert => {
	    assert.ok('name' in Function.prototype);
	    assert.nonEnumerable(Function.prototype, 'name');
	    function foo() {/* empty */}
	    assert.same(foo.name, 'foo');
	    assert.same(function () {/* empty */}.name, '');
	    if (Object.freeze) {
	      assert.same(Object.freeze(() => {/* empty */}).name, '');
	    }
	    function bar() {/* empty */}
	    bar.toString = function () {
	      throw new Error();
	    };
	    assert.notThrows(() => bar.name === 'bar', 'works with redefined `.toString`');
	    const baz = Object(() => {/* empty */});
	    baz.toString = function () {
	      return '';
	    };
	    assert.same(baz.name, '');
	  });
	}

	QUnit.test('Array#includes', assert => {
	  const includes = Array.prototype.includes;
	  assert.isFunction(includes);
	  assert.name(includes, 'includes');
	  assert.arity(includes, 1);
	  assert.looksNative(includes);
	  assert.nonEnumerable(Array.prototype, 'includes');
	  const object = {};
	  const array = [1, 2, 3, -0, object];
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
	    assert.throws(() => includes.call(null, 0), TypeError);
	    assert.throws(() => includes.call(undefined, 0), TypeError);
	  }
	});

	QUnit.test('Object.entries', assert => {
	  assert.isFunction(Object.entries);
	  assert.arity(Object.entries, 1);
	  assert.name(Object.entries, 'entries');
	  assert.looksNative(Object.entries);
	  // assert.nonEnumerable(Object, 'entries');
	  assert.deepEqual(Object.entries({
	    q: 1,
	    w: 2,
	    e: 3
	  }), [['q', 1], ['w', 2], ['e', 3]]);
	  assert.deepEqual(Object.entries(new String('qwe')), [['0', 'q'], ['1', 'w'], ['2', 'e']]);
	  assert.deepEqual(Object.entries(Object.assign(Object.create({
	    q: 1,
	    w: 2,
	    e: 3
	  }), {
	    a: 4,
	    s: 5,
	    d: 6
	  })), [['a', 4], ['s', 5], ['d', 6]]);
	  assert.deepEqual(Object.entries({
	    valueOf: 42
	  }), [['valueOf', 42]], 'IE enum keys bug');
	  // try {
	  //   assert.deepEqual(Function('entries', `
	  //     return entries({
	  //       a: 1,
	  //       get b() {
	  //         delete this.c;
	  //         return 2;
	  //       },
	  //       c: 3
	  //     });
	  //   `)(Object.entries), [['a', 1], ['b', 2]]);
	  // } catch { /* empty */ }
	  // try {
	  //   assert.deepEqual(Function('entries', `
	  //     return entries({
	  //       a: 1,
	  //       get b() {
	  //         Object.defineProperty(this, "c", {
	  //           value: 4,
	  //           enumerable: false
	  //         });
	  //         return 2;
	  //       },
	  //       c: 3
	  //     });
	  //   `)(Object.entries), [['a', 1], ['b', 2]]);
	  // } catch { /* empty */ }
	});

	QUnit.test('Object.values', assert => {
	  assert.isFunction(Object.values);
	  assert.arity(Object.values, 1);
	  assert.name(Object.values, 'values');
	  assert.looksNative(Object.values);
	  // assert.nonEnumerable(Object, 'values');
	  assert.deepEqual(Object.values({
	    q: 1,
	    w: 2,
	    e: 3
	  }), [1, 2, 3]);
	  assert.deepEqual(Object.values(new String('qwe')), ['q', 'w', 'e']);
	  assert.deepEqual(Object.values(Object.assign(Object.create({
	    q: 1,
	    w: 2,
	    e: 3
	  }), {
	    a: 4,
	    s: 5,
	    d: 6
	  })), [4, 5, 6]);
	  assert.deepEqual(Object.values({
	    valueOf: 42
	  }), [42], 'IE enum keys bug');
	  // try {
	  //   assert.deepEqual(Function('values', `
	  //     return values({ a: 1, get b() {
	  //       delete this.c;
	  //       return 2;
	  //     }, c: 3 });
	  //   `)(Object.values), [1, 2]);
	  // } catch { /* empty */ }
	  // try {
	  //   assert.deepEqual(Function('values', `
	  //     return values({ a: 1, get b() {
	  //       Object.defineProperty(this, "c", {
	  //         value: 4,
	  //         enumerable: false
	  //       });
	  //       return 2;
	  //     }, c: 3 });
	  //   `)(Object.values), [1, 2]);
	  // } catch { /* empty */ }
	});

	QUnit.test('Object.getOwnPropertyDescriptors', assert => {
	  assert.isFunction(Object.getOwnPropertyDescriptors);
	  assert.arity(Object.getOwnPropertyDescriptors, 1);
	  assert.name(Object.getOwnPropertyDescriptors, 'getOwnPropertyDescriptors');
	  assert.looksNative(Object.getOwnPropertyDescriptors);
	  // assert.nonEnumerable(Object, 'getOwnPropertyDescriptors');
	  const object = Object.create({
	    q: 1
	  }, {
	    e: {
	      value: 3
	    }
	  });
	  object.w = 2;
	  const symbol = Symbol('4');
	  object[symbol] = 4;
	  const descriptors = Object.getOwnPropertyDescriptors(object);
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
	QUnit.test('Object.getOwnPropertyDescriptors.sham flag', assert => {
	  assert.same(Object.getOwnPropertyDescriptors.sham, DESCRIPTORS ? undefined : true);
	});

	function padStart(targetLength) {
		var x = targetLength - this.length;
		if(x > 0) {
			var padString = arguments[1];
			if(padString == null) {
				padString = " ";
			}
			var len = padString.length;
			if(len) {
				return padString.repeat(Math.ceil(x / len)).substr(0, x) + this;
			}
		}
		return String(this);
	}

	definePrototype(String, 'padStart', padStart);

	QUnit.test('String#padStart', assert => {
	  const padStart = String.prototype.padStart;
	  assert.isFunction(padStart);
	  assert.arity(padStart, 1);
	  assert.name(padStart, 'padStart');
	  assert.looksNative(padStart);
	  assert.nonEnumerable(String.prototype, 'padStart');
	  assert.strictEqual('abc'.padStart(5), '  abc');
	  assert.strictEqual('abc'.padStart(4, 'de'), 'dabc');
	  assert.strictEqual('abc'.padStart(), 'abc');
	  assert.strictEqual('abc'.padStart(5, '_'), '__abc');
	  assert.strictEqual(''.padStart(0), '');
	  assert.strictEqual('foo'.padStart(1), 'foo');
	  assert.strictEqual('foo'.padStart(5, ''), 'foo');
	  if (STRICT) {
	    assert.throws(() => padStart.call(null, 0), TypeError);
	    assert.throws(() => padStart.call(undefined, 0), TypeError);
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
				return this + padString.repeat(Math.ceil(x / len)).substr(0, x);
			}
		}
		return String(this);
	}

	definePrototype(String, 'padEnd', padEnd);

	QUnit.test('String#padEnd', assert => {
	  const padEnd = String.prototype.padEnd;
	  assert.isFunction(padEnd);
	  assert.arity(padEnd, 1);
	  assert.name(padEnd, 'padEnd');
	  assert.looksNative(padEnd);
	  assert.nonEnumerable(String.prototype, 'padEnd');
	  assert.strictEqual('abc'.padEnd(5), 'abc  ');
	  assert.strictEqual('abc'.padEnd(4, 'de'), 'abcd');
	  assert.strictEqual('abc'.padEnd(), 'abc');
	  assert.strictEqual('abc'.padEnd(5, '_'), 'abc__');
	  assert.strictEqual(''.padEnd(0), '');
	  assert.strictEqual('foo'.padEnd(1), 'foo');
	  assert.strictEqual('foo'.padEnd(5, ''), 'foo');
	  if (STRICT) {
	    assert.throws(() => padEnd.call(null, 0), TypeError);
	    assert.throws(() => padEnd.call(undefined, 0), TypeError);
	  }
	});

	QUnit.test('Symbol.asyncIterator', assert => {
	  assert.ok(!!Symbol.asyncIterator, 'Symbol.asyncIterator available');
	});

	QUnit.test('Promise#finally', assert => {
	  assert.isFunction(Promise.prototype.finally);
	  assert.arity(Promise.prototype.finally, 1);
	  assert.looksNative(Promise.prototype.finally);
	  assert.nonEnumerable(Promise.prototype, 'finally');
	  assert.ok(Promise.resolve(42).finally(() => {/* empty */}) instanceof Promise, 'returns a promise');
	});
	QUnit.asyncTest('Promise#finally, resolved', assert => {
	  expect(3);
	  let called = 0;
	  let argument = null;
	  Promise.resolve(42).finally(it => {
	    called++;
	    argument = it;
	  }).then(it => {
	    assert.same(it, 42, 'resolved with a correct value');
	    assert.same(called, 1, 'onFinally function called one time');
	    assert.same(argument, undefined, 'onFinally function called with a correct argument');
	    start();
	  });
	});
	QUnit.asyncTest('Promise#finally, rejected', assert => {
	  expect(2);
	  let called = 0;
	  let argument = null;
	  Promise.reject(42).finally(it => {
	    called++;
	    argument = it;
	  }).catch(() => {
	    assert.same(called, 1, 'onFinally function called one time');
	    assert.same(argument, undefined, 'onFinally function called with a correct argument');
	    start();
	  });
	});
	const promise = (() => {
	  try {
	    return Function('return (async function () { /* empty */ })()')();
	  } catch (_unused) {/* empty */}
	})();
	if (promise && promise.constructor !== Promise) QUnit.test('Native Promise, patched', assert => {
	  assert.isFunction(promise.finally);
	  assert.arity(promise.finally, 1);
	  assert.looksNative(promise.finally);
	  assert.nonEnumerable(promise.constructor.prototype, 'finally');
	  function empty() {/* empty */}
	  assert.ok(promise.finally(empty) instanceof Promise, '`.finally` returns `Promise` instance #1');
	  assert.ok(new promise.constructor(empty).finally(empty) instanceof Promise, '`.finally` returns `Promise` instance #2');
	});

	function trimStart() {
		return this.replace(/^[\s\u2006\u3000\xA0]+/g, '');
	}

	definePrototype(String, 'trimStart', trimStart);

	// deprecated
	// QUnit.test('String#trimLeft', assert => {
	// 	const { trimStart, trimLeft } = String.prototype;
	// 	assert.same(trimStart, trimLeft, 'same #trimLeft');
	// });

	QUnit.test('String#trimStart', assert => {
	  const trimStart = String.prototype.trimStart;
	  assert.isFunction(trimStart);
	  assert.arity(trimStart, 0);
	  assert.name(trimStart, 'trimStart');
	  assert.looksNative(trimStart);
	  assert.nonEnumerable(String.prototype, 'trimStart');
	  assert.strictEqual(' \n  q w e \n  '.trimStart(), 'q w e \n  ', 'removes whitespaces at left & right side of string');
	  assert.strictEqual("\u0009".trimStart(), '', '\\u0009');
	  assert.strictEqual("\u000A".trimStart(), '', '\\u000A');
	  assert.strictEqual("\u000B".trimStart(), '', '\\u000B');
	  assert.strictEqual("\u000C".trimStart(), '', '\\u000C');
	  assert.strictEqual("\u000D".trimStart(), '', '\\u000D');
	  assert.strictEqual("\u0020".trimStart(), '', '\\u0020');
	  // assert.strictEqual("\u0085".trimStart(), '\u0085', "\\u0085 shouldn't remove");
	  assert.strictEqual("\u00A0".trimStart(), '', '\\u00A0');
	  // assert.strictEqual("\u1680".trimStart(), '', '\\u1680');
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
	  assert.strictEqual("\u3000".trimStart(), '', '\\u3000');
	  // assert.strictEqual("\uFEFF".trimStart(), '', '\\uFEFF');
	  if (STRICT) {
	    assert.throws(() => trimStart.call(null, 0), TypeError);
	    assert.throws(() => trimStart.call(undefined, 0), TypeError);
	  }
	});

	function trimEnd() {
		return this.replace(/[\s\u2006\u3000\xA0]+$/g, '');
	}

	definePrototype(String, 'trimEnd', trimEnd);

	// deprecated
	// QUnit.test('String#trimRight', assert => {
	// 	const { trimEnd, trimRight } = String.prototype;
	// 	assert.same(trimEnd, trimRight, 'same #trimRight');
	// });

	QUnit.test('String#trimEnd', assert => {
	  const trimEnd = String.prototype.trimEnd;
	  assert.isFunction(trimEnd);
	  assert.arity(trimEnd, 0);
	  assert.name(trimEnd, 'trimEnd');
	  assert.looksNative(trimEnd);
	  assert.nonEnumerable(String.prototype, 'trimEnd');
	  assert.strictEqual(' \n  q w e \n  '.trimEnd(), ' \n  q w e', 'removes whitespaces at left & right side of string');
	  assert.strictEqual("\u0009".trimEnd(), '', '\\u0009');
	  assert.strictEqual("\u000A".trimEnd(), '', '\\u000A');
	  assert.strictEqual("\u000B".trimEnd(), '', '\\u000B');
	  assert.strictEqual("\u000C".trimEnd(), '', '\\u000C');
	  assert.strictEqual("\u000D".trimEnd(), '', '\\u000D');
	  assert.strictEqual("\u0020".trimEnd(), '', '\\u0020');
	  // assert.strictEqual("\u0085".trimEnd(), '\u0085', "\\u0085 shouldn't remove");
	  assert.strictEqual("\u00A0".trimEnd(), '', '\\u00A0');
	  // assert.strictEqual("\u1680".trimEnd(), '', '\\u1680');
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
	  assert.strictEqual("\u3000".trimEnd(), '', '\\u3000');
	  // assert.strictEqual("\uFEFF".trimEnd(), '', '\\uFEFF');
	  if (STRICT) {
	    assert.throws(() => trimEnd.call(null, 0), TypeError);
	    assert.throws(() => trimEnd.call(undefined, 0), TypeError);
	  }
	});

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

	definePrototype(Array, 'flat', flat);

	QUnit.test('Array#flat', assert => {
	  const flat = Array.prototype.flat;
	  assert.isFunction(flat);
	  assert.name(flat, 'flat');
	  assert.arity(flat, 0);
	  assert.looksNative(flat);
	  assert.nonEnumerable(Array.prototype, 'flat');
	  assert.deepEqual([].flat(), []);
	  const array = [1, [2, 3], [4, [5, 6]]];
	  assert.deepEqual(array.flat(0), array);
	  assert.deepEqual(array.flat(1), [1, 2, 3, 4, [5, 6]]);
	  assert.deepEqual(array.flat(), [1, 2, 3, 4, [5, 6]]);
	  assert.deepEqual(array.flat(2), [1, 2, 3, 4, 5, 6]);
	  assert.deepEqual(array.flat(3), [1, 2, 3, 4, 5, 6]);
	  assert.deepEqual(array.flat(-1), array);
	  assert.deepEqual(array.flat(Infinity), [1, 2, 3, 4, 5, 6]);
	  if (STRICT) {
	    assert.throws(() => flat.call(null), TypeError);
	    assert.throws(() => flat.call(undefined), TypeError);
	  }
	  // if(DESCRIPTORS) {
	  // 	assert.notThrows(() => flat.call(defineProperty({ length: -1 }, 0, {
	  // 		enumerable: true,
	  // 		get() {
	  // 			throw new Error();
	  // 		},
	  // 	})).length === 0, 'uses ToLength');
	  // }
	});

	function flatMap(fn) {
		return flat.call(this.map(fn, arguments[1]), 1);
	}

	definePrototype(Array, 'flatMap', flatMap);

	QUnit.test('Array#flatMap', assert => {
	  const flatMap = Array.prototype.flatMap;
	  assert.isFunction(flatMap);
	  assert.name(flatMap, 'flatMap');
	  assert.arity(flatMap, 1);
	  assert.looksNative(flatMap);
	  assert.nonEnumerable(Array.prototype, 'flatMap');
	  assert.deepEqual([].flatMap(it => it), []);
	  assert.deepEqual([1, 2, 3].flatMap(it => it), [1, 2, 3]);
	  assert.deepEqual([1, 2, 3].flatMap(it => [it, it]), [1, 1, 2, 2, 3, 3]);
	  assert.deepEqual([1, 2, 3].flatMap(it => [[it], [it]]), [[1], [1], [2], [2], [3], [3]]);
	  assert.deepEqual([1, [2, 3]].flatMap(() => 1), [1, 1]);
	  const array = [1];
	  const context = {};
	  array.flatMap(function (value, key, that) {
	    assert.same(value, 1);
	    assert.same(key, 0);
	    assert.same(that, array);
	    assert.same(this, context);
	    return value;
	  }, context);
	  if (STRICT) {
	    assert.throws(() => flatMap.call(null, it => it), TypeError);
	    assert.throws(() => flatMap.call(undefined, it => it), TypeError);
	  }
	  // assert.notThrows(() => flatMap.call({ length: -1 }, () => {
	  // 	throw new Error();
	  // }).length === 0, 'uses ToLength');
	});

	QUnit.test('Symbol#description', assert => {
	  assert.same(Symbol('foo').description, 'foo');
	  assert.same(Symbol('').description, '');
	  assert.same(Symbol(')').description, ')');
	  assert.same(Symbol({}).description, '[object Object]');
	  assert.same(Symbol(null).description, 'null');
	  assert.same(Symbol(undefined).description, undefined);
	  assert.same(Symbol().description, undefined);
	  assert.same(Object(Symbol('foo')).description, 'foo');
	  assert.same(Object(Symbol()).description, undefined);
	  // if (DESCRIPTORS) {
	  //   assert.ok(!Object.hasOwn(Symbol('foo'), 'description'));
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

	function fromEntries(obj) {
		var arr = Array.from(obj);
		var len = arr.length;
		var o = {};
		for(var i = 0; i < len; i++) {
			var item = arr[i];
			if(Array.isArray(item)) {
				o[item[0]] = item[1];
			} else {
				throw new TypeError("Iterator value 1 is not an entry object");
			}
		}
		return o;
	}

	if(!Object$1.fromEntries) {
		Object$1.fromEntries = fromEntries;
	}

	QUnit.test('Object.fromEntries', assert => {
	  assert.isFunction(Object.fromEntries);
	  assert.arity(Object.fromEntries, 1);
	  assert.name(Object.fromEntries, 'fromEntries');
	  assert.looksNative(Object.fromEntries);
	  // assert.nonEnumerable(Object, 'fromEntries');

	  assert.ok(Object.fromEntries([]) instanceof Object);
	  assert.same(Object.fromEntries([['foo', 1]]).foo, 1);
	  assert.same(Object.fromEntries(createIterable([['bar', 2]])).bar, 2);
	  class Unit {
	    constructor(id) {
	      this.id = id;
	    }
	    toString() {
	      return `unit${this.id}`;
	    }
	  }
	  const units = new Set([new Unit(101), new Unit(102), new Unit(103)]);
	  const object = Object.fromEntries(units.entries());
	  assert.same(object.unit101.id, 101);
	  assert.same(object.unit102.id, 102);
	  assert.same(object.unit103.id, 103);
	});

	var globalThis$1 = window.globalThis;

	if(!globalThis$1) {
		window.globalThis = window;
	}

	QUnit.test('globalThis', assert => {
	  assert.same(globalThis, Object(globalThis), 'is object');
	  assert.same(globalThis.Math, Math, 'contains globals');
	});

	var toString = Object$1.prototype.toString;

	function isString(obj) {
		return toString.call(obj) === '[object String]';
	};

	function matchAll(regExp) {
		if(this == null) {
			throw new TypeError("matchAll called on null or undefined");
		}
		var string = this;
		if(isString(regExp)) {
			regExp = new RegExp(regExp, 'g');
		} else if(regExp && regExp.global === false) {
			throw new TypeError("matchAll called with a non-global RegExp argument");
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

	definePrototype(String, 'matchAll', matchAll);

	QUnit.test('String#matchAll', assert => {
	  const matchAll = String.prototype.matchAll;
	  const assign = Object.assign;
	  assert.isFunction(matchAll);
	  assert.arity(matchAll, 1);
	  assert.name(matchAll, 'matchAll');
	  assert.looksNative(matchAll);
	  assert.nonEnumerable(String.prototype, 'matchAll');
	  let data = ['aabc', {
	    toString() {
	      return 'aabc';
	    }
	  }];
	  for (const target of data) {
	    const iterator = matchAll.call(target, /[ac]/g);
	    assert.isIterator(iterator);
	    assert.isIterable(iterator);
	    assert.deepEqual(iterator.next(), {
	      value: assign(['a'], {
	        input: 'aabc',
	        index: 0
	      }),
	      done: false
	    });
	    assert.deepEqual(iterator.next(), {
	      value: assign(['a'], {
	        input: 'aabc',
	        index: 1
	      }),
	      done: false
	    });
	    assert.deepEqual(iterator.next(), {
	      value: assign(['c'], {
	        input: 'aabc',
	        index: 3
	      }),
	      done: false
	    });
	    assert.deepEqual(iterator.next(), {
	      value: undefined,
	      done: true
	    });
	  }
	  let iterator = '1111a2b3cccc'.matchAll(/(\d)(\D)/g);
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
	  assert.throws(() => '1111a2b3cccc'.matchAll(/(\d)(\D)/), TypeError);
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
	  for (const target of data) {
	    assert.notThrows(() => ''.matchAll(target), `Not throws on ${target} as the first argument`);
	  }
	  if (STRICT) {
	    assert.throws(() => matchAll.call(null, /./g), TypeError, 'Throws on null as `this`');
	    assert.throws(() => matchAll.call(undefined, /./g), TypeError, 'Throws on undefined as `this`');
	  }
	});

	function allSettled(promises) {
		// if(!Array.isArray(promises)) {
		// 	return Promise.reject(new TypeError('You must pass an array to allSettled.'));
		// }
		return new Promise(function(resolve, reject) {
			var array = Array.from(promises);
			if(array.length == 0) return resolve(array);
			var c = 0;
			array.forEach(function(one, index, array) {
				if(one != null && isFunction(one.then)) {
					one.then(function(data) {
						c++;
						array[index] = { value: data, status: 'fulfilled' };
						if(c >= array.length) {
							resolve(array);
						}
					}, function(data) {
						c++;
						array[index] = { reason: data, status: 'rejected' };
						if(c >= array.length) {
							resolve(array);
						}
					});
				} else {
					c++;
					array[index] = { value: one, status: 'fulfilled' };
					if(c >= array.length) {
						resolve(array);
					}
				}
			});
		});
	}

	if(!Promise$3.allSettled) {
		Promise$3.allSettled = allSettled;
	}

	QUnit.test('Promise.allSettled', assert => {
	  assert.isFunction(Promise.allSettled);
	  assert.arity(Promise.allSettled, 1);
	  assert.looksNative(Promise.allSettled);
	  // assert.nonEnumerable(Promise, 'allSettled');
	  assert.ok(Promise.allSettled([1, 2, 3]) instanceof Promise, 'returns a promise');
	});
	QUnit.asyncTest('Promise.allSettled, resolved', assert => {
	  expect(1);
	  Promise.allSettled([Promise.resolve(1), Promise.reject(2), Promise.resolve(3)]).then(it => {
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
	QUnit.asyncTest('Promise.allSettled, rejected', assert => {
	  expect(1);
	  Promise.allSettled().catch(() => {
	    assert.ok(true, 'rejected as expected');
	    start();
	  });
	});

	function isRegExp(obj) {
		return toString.call(obj) === '[object RegExp]';
	};

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
	};

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
	};

	definePrototype(String, 'replaceAll', replaceAll);

	QUnit.test('String#replaceAll', assert => {
	  const replaceAll = String.prototype.replaceAll;
	  assert.isFunction(replaceAll);
	  assert.arity(replaceAll, 2);
	  assert.name(replaceAll, 'replaceAll');
	  assert.looksNative(replaceAll);
	  assert.nonEnumerable(String.prototype, 'replaceAll');
	  assert.same('q=query+string+parameters'.replaceAll('+', ' '), 'q=query string parameters');
	  assert.same('foo'.replaceAll('o', {}), 'f[object Object][object Object]');
	  assert.same('[object Object]x[object Object]'.replaceAll({}, 'y'), 'yxy');
	  assert.same(replaceAll.call({}, 'bject', 'lolo'), '[ololo Ololo]');
	  assert.same('aba'.replaceAll('b', (search, i, string) => {
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
	    assert.throws(() => replaceAll.call(null, 'a', 'b'), TypeError);
	    assert.throws(() => replaceAll.call(undefined, 'a', 'b'), TypeError);
	  }
	  assert.throws(() => 'b.b.b.b.b'.replaceAll(/\./, 'a'), TypeError);
	  assert.same('b.b.b.b.b'.replaceAll(/\./g, 'a'), 'babababab');
	  const object = {};
	  assert.same('[object Object]'.replaceAll(object, 'a'), 'a');
	});

	var setPrototypeOf = Object$1.setPrototypeOf;

	var proto = !!setPrototypeOf || ('__proto__' in Object.prototype);

	var dontEnums=[
		"toString",
		"toLocaleString",
		"valueOf",
		"hasOwnProperty",
		"isPrototypeOf",
		"propertyIsEnumerable"
	];

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
	};

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
	};

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
		var proto = NullProtoObject.prototype;
		var i = dontEnums.length;
		while(i--) delete proto[dontEnums[i]];
		delete proto.constructor;
		return NullProtoObject();
	};

	var hasOwnProperty = Object$1.prototype.hasOwnProperty;

	function hasOwn$1(obj, key) {
		if(obj == null) {
			throw new TypeError("Cannot convert undefined or null to object");
		}
		if(typeof obj !== "object") {
			return false;
		}
		if(!(key in obj)) {
			return false;
		}
		if(obj instanceof NullProtoObject) {
			return false;
		}
		var value = obj[key];
		if(!(obj instanceof Object)) {
			var constructor = obj.constructor;
			if(constructor) {
				var proto = constructor.prototype;
				if(obj !== proto) {
					return proto[key] !== value;
				}
			}
		}
		return hasOwnProperty.call(obj, key);
	};

	function hasOwn(obj, key) {
		return hasOwnProperty.call(obj, key);
	};

	if(!Object$1.hasOwn) {
		if(proto) {
			Object$1.hasOwn = hasOwn;
		} else {
			Object$1.hasOwn = hasOwn$1;
		}
	}

	function getPrototypeOf$1(obj) {
		if(obj == null) {
			throw new TypeError("Cannot convert undefined or null to object");
		}
		if(typeof obj !== "object" && typeof obj !== "function") {
			obj = Object(obj);
		}
		if('__proto__' in obj) {
			return obj.__proto__;
		}
		if(!('constructor' in obj)) {
			return null;
		}
		if(Object.hasOwn(obj, 'constructor')) {
			if('__proto__' in obj.constructor) {
				return obj.constructor.__proto__.prototype;
			} else if(obj === Object.prototype) {
				return null;
			} else {
				return Object.prototype;
			}
		}
		return obj.constructor.prototype;
	};
	getPrototypeOf$1.sham = true;

	function isJsObject(o) {
		if(typeof o !== "object") {
			return false;
		}
		if(o instanceof Object) {
			return true;
		}
		if(o instanceof NullProtoObject) {
			return true;
		}
		return false;
	}

	var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');

	function forIn(obj, fn, thisArg) {
		if(typeof obj !== "object") {
			return false;
		}
		var jsObject = isJsObject(obj);
		for(var key in obj) {
			if(!jsObject) {
				if(key === "constructor") {
					continue;
				}
			}
			switch(key.substring(0, 2)) {
				case "__":
				case "@@":
					continue;
			}
			if(fn.call(thisArg, obj[key], key) === false) {
				return false;
			}
		}
		if(hasEnumBug) {
			var i = dontEnums.length;
			var proto = getPrototypeOf$1(obj);
			//遍历nonEnumerableProps数组
			while(i--) {
				var prop = dontEnums[i];
				if(prop in obj && obj[prop] !== proto[prop]) {
					if(fn.call(thisArg, obj[prop], prop) === false) {
						return false;
					}
				}
			}
		}
		return true;
	};

	function inherits$2(subClass, superClass) {
		forIn(superClass, setKey, subClass);
		var prototype = Object.create(superClass.prototype);
		prototype.constructor = subClass;
		prototype.__proto__ = prototype;
		subClass.prototype = prototype;
		subClass.__proto__ = superClass.prototype;
	};
	function setKey(value, key) {
		this[key] = value;
	}

	function inherits$1(clazz, superClazz) {
		Object.setPrototypeOf(clazz, superClazz);
		clazz.prototype = Object.create(superClazz.prototype);
		clazz.prototype.constructor = clazz;
	}

	var inherits = proto ? inherits$1 : inherits$2;

	var Error$1 = window.Error;

	function AggregateError$1(errors, message) {
		if(!(this instanceof AggregateError$1)) {
			return new AggregateError$1(errors, message);
		}
		this.errors = errors;
		this.message = message === undefined ? "" : String(message);
		var options = arguments[2];
		if(typeof options === "object" && options !== null) {
			if('cause' in options) {
				this.cause = options.cause;
			}
		}
	}
	inherits(AggregateError$1, Error$1);
	AggregateError$1.prototype.name = "AggregateError";

	if(!window.AggregateError) {
		window.AggregateError = AggregateError$1;
	}

	function any(promises) {
		// if(!Array.isArray(promises)) {
		// 	throw new TypeError('You must pass an array to any.');
		// }
		// if(promises.length == 0) return Promise.reject();
		return new Promise(function(resolve, reject) {
			var errors = Array.from(promises);
			if(errors.length === 0) {
				return reject(new AggregateError(errors));
			}
			var c = 0;
			errors.forEach(function(one, index, errors) {
				if(one != null && isFunction(one.then)) {
					one.then(function(data) {
						resolve(data);
					}, function(error) {
						c++;
						errors[index] = error;
						if(c >= errors.length) {
							reject(new AggregateError(errors));
						}
					});
				} else {
					resolve(one);
				}
			});
		});
	};

	if(!Promise$3.any) {
		Promise$3.any = any;
	}

	QUnit.test('Promise.any', assert => {
	  assert.isFunction(Promise.any);
	  assert.arity(Promise.any, 1);
	  assert.looksNative(Promise.any);
	  // assert.nonEnumerable(Promise, 'any');
	  assert.ok(Promise.any([1, 2, 3]) instanceof Promise, 'returns a promise');
	});
	QUnit.asyncTest('Promise.any, resolved', assert => {
	  expect(1);
	  Promise.any([Promise.resolve(1), Promise.reject(2), Promise.resolve(3)]).then(it => {
	    assert.same(it, 1, 'resolved with a correct value');
	    start();
	  });
	});
	QUnit.asyncTest('Promise.any, rejected #1', assert => {
	  expect(2);
	  Promise.any([Promise.reject(1), Promise.reject(2), Promise.reject(3)]).catch(error => {
	    assert.ok(error instanceof AggregateError, 'instanceof AggregateError');
	    assert.deepEqual(error.errors, [1, 2, 3], 'rejected with a correct value');
	    start();
	  });
	});
	QUnit.asyncTest('Promise.any, rejected #2', assert => {
	  expect(1);
	  Promise.any().catch(() => {
	    assert.ok(true, 'rejected as expected');
	    start();
	  });
	});
	QUnit.asyncTest('Promise.any, rejected #3', assert => {
	  expect(2);
	  Promise.any([]).catch(error => {
	    assert.ok(error instanceof AggregateError, 'instanceof AggregateError');
	    assert.deepEqual(error.errors, [], 'rejected with a correct value');
	    start();
	  });
	});

	QUnit.test('AggregateError', assert => {
	  assert.isFunction(AggregateError);
	  assert.arity(AggregateError, 2);
	  assert.name(AggregateError, 'AggregateError');
	  assert.looksNative(AggregateError);
	  assert.ok(new AggregateError([1]) instanceof AggregateError);
	  assert.ok(new AggregateError([1]) instanceof Error);
	  assert.ok(AggregateError([1]) instanceof AggregateError);
	  assert.ok(AggregateError([1]) instanceof Error);
	  assert.same(AggregateError([1], 'foo').message, 'foo');
	  assert.deepEqual(AggregateError([1, 2, 3]).errors, [1, 2, 3]);
	});

	function at$1(index) {
		// 检查索引是否有效  
		var len = this.length;
		var relativeIndex = toIntegerOrInfinity(index);
		var k = relativeIndex >= 0 ? relativeIndex : len + relativeIndex;
		// 确保索引在字符串范围内  
		if(k < 0 || k >= len) {
			return;
		}
		return this.charAt(k);
	}
	function toIntegerOrInfinity(argument) {
		var number = +argument;
		return number !== number || number === 0 ? 0 : Math.trunc(number);
	};

	definePrototype(String, 'at', at$1);

	function at(n) {
		var len = this.length;
		if(isNaN(n)) {
			return this[0];
		}
		n = Math.trunc(n);
		if(n >= 0) {
			return this[n];
		}
		return this[len + n];
	}

	definePrototype(Array, 'at', at);

	QUnit.test('Array#at', assert => {
	  const at = Array.prototype.at;
	  assert.isFunction(at);
	  assert.arity(at, 1);
	  assert.name(at, 'at');
	  assert.looksNative(at);
	  assert.nonEnumerable(Array.prototype, 'at');
	  assert.same(1, [1, 2, 3].at(0));
	  assert.same(2, [1, 2, 3].at(1));
	  assert.same(3, [1, 2, 3].at(2));
	  assert.same(undefined, [1, 2, 3].at(3));
	  assert.same(3, [1, 2, 3].at(-1));
	  assert.same(2, [1, 2, 3].at(-2));
	  assert.same(1, [1, 2, 3].at(-3));
	  assert.same(undefined, [1, 2, 3].at(-4));
	  assert.same(1, [1, 2, 3].at(0.4));
	  assert.same(1, [1, 2, 3].at(0.5));
	  assert.same(1, [1, 2, 3].at(0.6));
	  assert.same(1, [1].at(NaN));
	  assert.same(1, [1].at());
	  assert.same(1, [1, 2, 3].at(-0));
	  assert.same(undefined, Array(1).at(0));
	  assert.same(1, at.call({
	    0: 1,
	    length: 1
	  }, 0));
	  if (STRICT) {
	    assert.throws(() => at.call(null, 0), TypeError);
	    assert.throws(() => at.call(undefined, 0), TypeError);
	  }
	});

	QUnit.test('String#at', assert => {
	  const at = String.prototype.at;
	  assert.isFunction(at);
	  assert.arity(at, 1);
	  assert.name(at, 'at');
	  assert.looksNative(at);
	  assert.nonEnumerable(String.prototype, 'at');
	  assert.same('1', '123'.at(0));
	  assert.same('2', '123'.at(1));
	  assert.same('3', '123'.at(2));
	  assert.same(undefined, '123'.at(3));
	  assert.same('3', '123'.at(-1));
	  assert.same('2', '123'.at(-2));
	  assert.same('1', '123'.at(-3));
	  assert.same(undefined, '123'.at(-4));
	  assert.same('1', '123'.at(0.4));
	  assert.same('1', '123'.at(0.5));
	  assert.same('1', '123'.at(0.6));
	  assert.same('1', '1'.at(NaN));
	  assert.same('1', '1'.at());
	  assert.same('1', '123'.at(-0));
	  // TODO: disabled by default because of the conflict with old proposal
	  // assert.same('\uD842', '𠮷'.at());
	  // assert.same('1', at.call({ toString() { return '123'; } }, 0));

	  // assert.throws(() => at.call(Symbol('at-alternative test'), 0), 'throws on symbol context');

	  if (STRICT) {
	    assert.throws(() => at.call(null, 0), TypeError);
	    assert.throws(() => at.call(undefined, 0), TypeError);
	  }
	});

	QUnit.test('Object.hasOwn', assert => {
	  const create = Object.create;
	  const hasOwn = Object.hasOwn;
	  assert.isFunction(hasOwn);
	  assert.arity(hasOwn, 2);
	  assert.name(hasOwn, 'hasOwn');
	  assert.looksNative(hasOwn);
	  // assert.nonEnumerable(Object, 'hasOwn');
	  assert.equal(true, hasOwn({
	    q: 42
	  }, 'q'));
	  assert.equal(false, hasOwn({
	    q: 42
	  }, 'w'));
	  assert.equal(false, hasOwn(create({
	    q: 42
	  }), 'q'));
	  assert.equal(true, hasOwn(Object.prototype, 'hasOwnProperty'));
	  // let called = false;
	  // try {
	  //   hasOwn(null, { toString() { called = true; } });
	  // } catch { /* empty */ }
	  // assert.ok(false, called, 'modern behaviour');
	  assert.throws(() => hasOwn(null, 'foo'), TypeError, 'throws on null');
	  assert.throws(() => hasOwn(undefined, 'foo'), TypeError, 'throws on undefined');
	});

	function findLastIndex(callback) {
		var thisArg = arguments[1];
		var i = this.length;
		if(i > 0) {
			while(i-- > 0) {
				var j = this[i];
				var r = callback.call(thisArg, j, i, this);
				if(r) {
					return i;
				}
			}
		}
		return -1;
	}

	definePrototype(Array, 'findLastIndex', findLastIndex);

	QUnit.test('Array#findLastIndex', assert => {
	  const findLastIndex = Array.prototype.findLastIndex;
	  assert.isFunction(findLastIndex);
	  assert.arity(findLastIndex, 1);
	  assert.name(findLastIndex, 'findLastIndex');
	  assert.looksNative(findLastIndex);
	  assert.nonEnumerable(Array.prototype, 'findLastIndex');
	  const array = [1];
	  const context = {};
	  array.findLastIndex(function (value, key, that) {
	    assert.same(arguments.length, 3, 'correct number of callback arguments');
	    assert.same(value, 1, 'correct value in callback');
	    assert.same(key, 0, 'correct index in callback');
	    assert.same(that, array, 'correct link to array in callback');
	    assert.same(this, context, 'correct callback context');
	  }, context);
	  assert.same([{}, 2, NaN, 42, 1].findLastIndex(it => !(it % 2)), 3);
	  assert.same([{}, 2, NaN, 42, 1].findLastIndex(it => it > 42), -1);
	  let values = '';
	  let keys = '';
	  [1, 2, 3].findLastIndex((value, key) => {
	    values += value;
	    keys += key;
	  });
	  assert.same(values, '321');
	  assert.same(keys, '210');
	  if (STRICT) {
	    assert.throws(() => findLastIndex.call(null, 0), TypeError);
	    assert.throws(() => findLastIndex.call(undefined, 0), TypeError);
	  }
	  assert.notThrows(() => findLastIndex.call({
	    length: -1,
	    0: 1
	  }, () => {
	    throw new Error();
	  }) === -1, 'uses ToLength');
	  // assert.equal(true, 'findLastIndex' in Array.prototype[Symbol.unscopables], 'In Array#@@unscopables');
	});

	function findLast(callback) {
		var thisArg = arguments[1];
		var i = findLastIndex.call(this, callback, thisArg);
		if(i >= 0) {
			return this[i];
		}
	};

	definePrototype(Array, 'findLast', findLast);

	QUnit.test('Array#findLast', assert => {
	  const findLast = Array.prototype.findLast;
	  assert.isFunction(findLast);
	  assert.arity(findLast, 1);
	  assert.name(findLast, 'findLast');
	  assert.looksNative(findLast);
	  assert.nonEnumerable(Array.prototype, 'findLast');
	  const array = [1];
	  const context = {};
	  array.findLast(function (value, key, that) {
	    assert.same(arguments.length, 3, 'correct number of callback arguments');
	    assert.same(value, 1, 'correct value in callback');
	    assert.same(key, 0, 'correct index in callback');
	    assert.same(that, array, 'correct link to array in callback');
	    assert.same(this, context, 'correct callback context');
	  }, context);
	  assert.same([{}, 2, NaN, 42, 1].findLast(it => !(it % 2)), 42);
	  assert.same([{}, 2, NaN, 42, 1].findLast(it => it === 43), undefined);
	  let values = '';
	  let keys = '';
	  [1, 2, 3].findLast((value, key) => {
	    values += value;
	    keys += key;
	  });
	  assert.same(values, '321');
	  assert.same(keys, '210');
	  if (STRICT) {
	    assert.throws(() => findLast.call(null, 0), TypeError);
	    assert.throws(() => findLast.call(undefined, 0), TypeError);
	  }
	  assert.notThrows(() => findLast.call({
	    length: -1,
	    0: 1
	  }, () => {
	    throw new Error();
	  }) === undefined, 'uses ToLength');
	  // assert.equal(true, 'find' in Array.prototype[Symbol.unscopables], 'In Array#@@unscopables');
	});

	var structuredClone$2 = window.structuredClone;

	function structuredClone$1(obj) {
		if(arguments.length === 0) {
			throw new Error("Failed to execute 'structuredClone': 1 argumnet required.");
		}
		if(typeof obj === "object") {
			if(obj === null) {
				return obj;
			}
			let proto = Object.getPrototypeOf(obj);
			if(proto === null || proto === Object.prototype) {
				return objectClone({}, obj);
			} else if(Array.isArray(obj)) {
				return arrayClone(obj);
			} else if(obj instanceof Node || obj instanceof Event || obj instanceof Window) {
				throw new Error("Failed to execute 'structuredClone' on DOM");
			} else if(obj instanceof Set) {
				return new Set(obj);
			} else if(obj instanceof Map) {
				return new Map(obj);
			} else if(obj instanceof Array) {
				if(obj.buffer) {
					return new obj.constructor(obj);
				} else {
					return arrayClone(obj);
				}
			} else if(obj instanceof Error) {
				let r = Object.create(Object.getPrototypeOf(obj));
				r.message = obj.message;
				r.stack = obj.stack;
				if('cause' in obj) {
					r.cause = obj.cause;
				}
				if('errors' in obj) {
					r.errors = arrayClone(obj.errors);
				}
				return r;
			}
			let type = toString.call(obj);
			switch(type) {
				case '[object Object]':
					return objectClone(Object.create(Object.getPrototypeOf(obj)), obj);
				case '[object Date]':
					return new Date(obj);
				case '[object Number]':
					return new Number(obj);
				case '[object String]':
					return new String(obj);
				case '[object Boolean]':
					return new Boolean(obj.valueOf());
				case '[object RegExp]':
					return new RegExp(obj);
				case '[object ArrayBuffer]':
					return new Uint8Array(obj).buffer;
				case '[object DataView]':
					return new DataView(new Uint8Array(obj.buffer).buffer);
				case '[object Blob]':
					return obj.slice(0, obj.size, obj.type);
				case '[object BigInt]':
					return new Object(obj.valueOf());
				case '[object File]':
					return new File([obj], obj.name, {
						type: obj.type,
						lastModified: obj.lastModified
					});
				case '[object FileList]':
					const transfer = new DataTransfer();
					for(let it of obj) {
						transfer.items.add(it);
					}
					return transfer.files;
				case '[object DOMRectReadOnly]':
					return new DOMRectReadOnly(obj.x, obj.y, obj.width, obj.height);
				case '[object DOMRect]':
					return new DOMRect(obj.x, obj.y, obj.width, obj.height);
				case '[object DOMPointReadOnly]':
					return new DOMPointReadOnly(obj.x, obj.y, obj.z, obj.w);
				case '[object DOMPoint]':
					return new DOMPoint(obj.x, obj.y, obj.z, obj.w);
				case '[object DOMQuad]':
					return new DOMQuad(obj.p1, obj.p2, obj.p3, obj.p4);
				default:
					throw new Error("Failed to execute 'structuredClone' on " + type);
			}
		} else if(typeof obj === "function") {
			throw new Error("Failed to execute 'structuredClone' on Function");
		} else if(typeof obj === "symbol") {
			throw new Error("Failed to execute 'structuredClone' on Symbol");
		} else {
			return obj;
		}
	}

	function arrayClone(obj) {
		var r, keys, len, i, key;
		r = new Array(obj.length);
		keys = Object.keys(obj);
		len = keys.length;
		for(i = 0; i < len; i++) {
			key = keys[i];
			r[key] = structuredClone$1(obj[key]);
		}
		return r;
	}
	function objectClone(r, obj) {
		var keys, len, i, key;
		keys = Object.keys(obj);
		len = keys.length;
		for(i = 0; i < len; i++) {
			key = keys[i];
			r[key] = structuredClone$1(obj[key]);
		}
		return r;
	}

	function structuredClone$fix(obj) {
		if(typeof obj === "object") {
			if(obj instanceof Error) {
				let r = Object.create(Object.getPrototypeOf(obj));
				r.message = obj.message;
				r.stack = obj.stack;
				if('cause' in obj) {
					r.cause = obj.cause;
				}
				if('errors' in obj) {
					r.errors = arrayClone$fix(obj.errors);
				}
				return r;
			}
		}
		return structuredClone$2.apply(this, arguments);
	}
	function arrayClone$fix(obj) {
		var r, keys, len, i, key;
		r = new Array(obj.length);
		keys = Object.keys(obj);
		len = keys.length;
		for(i = 0; i < len; i++) {
			key = keys[i];
			r[key] = structuredClone$fix(obj[key]);
		}
		return r;
	}

	window.structuredClone = structuredClone$2 ? structuredClone$fix : structuredClone$1;

	// Originally from: https://github.com/web-platform-tests/wpt/blob/4b35e758e2fc4225368304b02bcec9133965fd1a/IndexedDB/structured-clone.any.js
	const from = Array.from;
	const assign = Object.assign;
	const getPrototypeOf = Object.getPrototypeOf;
	const keys = Object.keys;
	QUnit.test('structuredClone#identity', assert => {
	  assert.isFunction(structuredClone, 'structuredClone is a function');
	  assert.name(structuredClone, 'structuredClone');
	  assert.arity(structuredClone, 1);
	  assert.throws(() => structuredClone(), 'throws without arguments');
	  assert.same(structuredClone(1, null), 1, 'null as options');
	  assert.same(structuredClone(1, undefined), 1, 'undefined as options');
	});
	function cloneTest(value, verifyFunc) {
	  verifyFunc(value, structuredClone(value));
	}

	// Specialization of cloneTest() for objects, with common asserts.
	function cloneObjectTest(assert, value, verifyFunc) {
	  cloneTest(value, (orig, clone) => {
	    assert.notSame(orig, clone, 'clone should have different reference');
	    assert.same(typeof clone, 'object', 'clone should be an object');
	    // https://github.com/qunitjs/node-qunit/issues/146
	    assert.ok(getPrototypeOf(orig) === getPrototypeOf(clone), 'clone should have same prototype');
	    verifyFunc(orig, clone);
	  });
	}

	// ECMAScript types

	// Primitive values: Undefined, Null, Boolean, Number, BigInt, String
	const booleans = [false, true];
	const numbers = [NaN, -Infinity, -Number.MAX_VALUE, -0xFFFFFFFF, -0x80000000, -0x7FFFFFFF, -1, -Number.MIN_VALUE, -0, 0, 1, Number.MIN_VALUE, 0x7FFFFFFF, 0x80000000, 0xFFFFFFFF, Number.MAX_VALUE, Infinity];
	const bigints = window.BigInt ? [BigInt('-12345678901234567890'), BigInt('-1'), BigInt('0'), BigInt('1'), BigInt('12345678901234567890')] : [];
	const strings = ['', 'this is a sample string', 'null(\0)'];
	QUnit.test('structuredClone#primitives', assert => {
	  const primitives = [undefined, null, ...booleans, ...numbers, ...bigints, ...strings];
	  for (const value of primitives) cloneTest(value, (orig, clone) => {
	    assert.same(orig, clone, 'primitives should be same after cloned');
	  });
	});

	// "Primitive" Objects (Boolean, Number, BigInt, String)
	QUnit.test('structuredClone#primitive objects', assert => {
	  const primitives = [...booleans, ...numbers, ...bigints, ...strings];
	  for (const value of primitives) cloneObjectTest(assert, Object(value), (orig, clone) => {
	    assert.same(orig.valueOf(), clone.valueOf(), 'primitive wrappers should have same value');
	  });
	});

	// Dates
	QUnit.test('structuredClone#Date', assert => {
	  const dates = [new Date(-1e13), new Date(-1e12), new Date(-1e9), new Date(-1e6), new Date(-1e3), new Date(0), new Date(1e3), new Date(1e6), new Date(1e9), new Date(1e12), new Date(1e13)];
	  for (const date of dates) cloneTest(date, (orig, clone) => {
	    assert.notSame(orig, clone);
	    assert.same(typeof clone, 'object');
	    assert.same(getPrototypeOf(orig), getPrototypeOf(clone));
	    assert.same(orig.valueOf(), clone.valueOf());
	  });
	});

	// Regular Expressions
	QUnit.test('structuredClone#RegExp', assert => {
	  const regexes = [new RegExp(), /abc/, /abc/g, /abc/i, /abc/gi, /abc/, /abc/g, /abc/i, /abc/gi];
	  const giuy = fromSource('/abc/giuy');
	  if (giuy) regexes.push(giuy);
	  for (const regex of regexes) cloneObjectTest(assert, regex, (orig, clone) => {
	    assert.same(orig.toString(), clone.toString(), `regex ${regex}`);
	  });
	});
	if (fromSource('structuredClone#ArrayBuffer.prototype.slice || DataView')) {
	  // ArrayBuffer
	  if (typeof Uint8Array == 'function') QUnit.test('ArrayBuffer', assert => {
	    // Crashes
	    cloneObjectTest(assert, new Uint8Array([0, 1, 254, 255]).buffer, (orig, clone) => {
	      assert.arrayEqual(new Uint8Array(orig), new Uint8Array(clone));
	    });
	  });

	  // TODO SharedArrayBuffer

	  // Array Buffer Views
	  if (typeof Int8Array != 'undefined') {
	    QUnit.test('%TypedArray%', assert => {
	      const arrays = [new Uint8Array([]), new Uint8Array([0, 1, 254, 255]), new Uint16Array([0x0000, 0x0001, 0xFFFE, 0xFFFF]), new Uint32Array([0x00000000, 0x00000001, 0xFFFFFFFE, 0xFFFFFFFF]), new Int8Array([0, 1, 254, 255]), new Int16Array([0x0000, 0x0001, 0xFFFE, 0xFFFF]), new Int32Array([0x00000000, 0x00000001, 0xFFFFFFFE, 0xFFFFFFFF]), new Float32Array([-Infinity, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, Infinity, NaN]), new Float64Array([-Infinity, -Number.MAX_VALUE, -Number.MIN_VALUE, 0, Number.MIN_VALUE, Number.MAX_VALUE, Infinity, NaN])];
	      if (typeof Uint8ClampedArray != 'undefined') {
	        arrays.push(new Uint8ClampedArray([0, 1, 254, 255]));
	      }
	      for (const array of arrays) cloneObjectTest(assert, array, (orig, clone) => {
	        assert.arrayEqual(orig, clone);
	      });
	    });
	    if (typeof DataView != 'undefined') QUnit.test('DataView', assert => {
	      const array = new Int8Array([1, 2, 3, 4]);
	      const view = new DataView(array.buffer);
	      cloneObjectTest(assert, array, (orig, clone) => {
	        assert.same(orig.byteLength, clone.byteLength);
	        assert.same(orig.byteOffset, clone.byteOffset);
	        assert.arrayEqual(new Int8Array(view.buffer), array);
	      });
	    });
	  }
	  if ('resizable' in ArrayBuffer.prototype) {
	    QUnit.test('Resizable ArrayBuffer', assert => {
	      const array = [1, 2, 3, 4, 5, 6, 7, 8];
	      let buffer = new ArrayBuffer(8, {
	        maxByteLength: 16
	      });
	      new Int8Array(buffer).set(array);
	      let copy = structuredClone(buffer);
	      assert.arrayEqual(bufferToArray(copy), array, 'resizable-ab-1');
	      assert.true(copy.resizable, 'resizable-ab-1');
	      buffer = new ArrayBuffer(8);
	      new Int8Array(buffer).set(array);
	      copy = structuredClone(buffer);
	      assert.arrayEqual(bufferToArray(copy), array, 'non-resizable-ab-1');
	      assert.false(copy.resizable, 'non-resizable-ab-1');
	      buffer = new ArrayBuffer(8, {
	        maxByteLength: 16
	      });
	      let tarray = new Int8Array(buffer);
	      tarray.set(array);
	      copy = structuredClone(tarray).buffer;
	      assert.arrayEqual(bufferToArray(copy), array, 'resizable-ab-2');
	      assert.true(copy.resizable, 'resizable-ab-2');
	      buffer = new ArrayBuffer(8);
	      tarray = new Int8Array(buffer);
	      tarray.set(array);
	      copy = structuredClone(tarray).buffer;
	      assert.arrayEqual(bufferToArray(copy), array, 'non-resizable-ab-2');
	      assert.false(copy.resizable, 'non-resizable-ab-2');
	    });
	  }
	}

	// Map
	QUnit.test('structuredClone#Map', assert => {
	  cloneObjectTest(assert, new Map([[1, 2], [3, 4]]), (orig, clone) => {
	    assert.deepEqual(from(orig.keys()), from(clone.keys()));
	    assert.deepEqual(from(orig.values()), from(clone.values()));
	  });
	});

	// Set
	QUnit.test('structuredClone#Set', assert => {
	  cloneObjectTest(assert, new Set([1, 2, 3, 4]), (orig, clone) => {
	    assert.deepEqual(from(orig.values()), from(clone.values()));
	  });
	});

	// Error
	QUnit.test('structuredClone#Error', assert => {
	  const errors = [['Error', new Error()], ['Error', new Error('msg', {
	    cause: 42
	  })], ['EvalError', new EvalError()], ['EvalError', new EvalError('msg', {
	    cause: 42
	  })], ['RangeError', new RangeError()], ['RangeError', new RangeError('msg', {
	    cause: 42
	  })], ['ReferenceError', new ReferenceError()], ['ReferenceError', new ReferenceError('msg', {
	    cause: 42
	  })], ['SyntaxError', new SyntaxError()], ['SyntaxError', new SyntaxError('msg', {
	    cause: 42
	  })], ['TypeError', new TypeError()], ['TypeError', new TypeError('msg', {
	    cause: 42
	  })], ['URIError', new URIError()], ['URIError', new URIError('msg', {
	    cause: 42
	  })], ['AggregateError', new AggregateError([1, 2])], ['AggregateError', new AggregateError([1, 2], 'msg', {
	    cause: 42
	  })]];
	  const compile = fromSource('WebAssembly.CompileError()');
	  const link = fromSource('WebAssembly.LinkError()');
	  const runtime = fromSource('WebAssembly.RuntimeError()');
	  if (compile && compile.name === 'CompileError') errors.push(['CompileError', compile]);
	  if (link && link.name === 'LinkError') errors.push(['LinkError', link]);
	  if (runtime && runtime.name === 'RuntimeError') errors.push(['RuntimeError', runtime]);
	  for (const [name, error] of errors) cloneObjectTest(assert, error, (orig, clone) => {
	    assert.same(orig.constructor, clone.constructor, `${name}#constructor`);
	    assert.same(orig.name, clone.name, `${name}#name`);
	    assert.same(orig.message, clone.message, `${name}#message`);
	    assert.same(orig.stack, clone.stack, `${name}#stack`);
	    assert.same(orig.cause, clone.cause, `${name}#cause`);
	    assert.deepEqual(orig.errors, clone.errors, `${name}#errors`);
	  });
	});

	// Arrays
	QUnit.test('structuredClone#Array', assert => {
	  const arrays = [[], [1, 2, 3], Array(1), assign(['foo', 'bar'], {
	    10: true,
	    11: false,
	    20: 123,
	    21: 456,
	    30: null
	  }), assign(['foo', 'bar'], {
	    a: true,
	    b: false,
	    foo: 123,
	    bar: 456,
	    '': null
	  })];
	  for (const array of arrays) cloneObjectTest(assert, array, (orig, clone) => {
	    assert.deepEqual(orig, clone, `array content should be same: ${array}`);
	    assert.deepEqual(orig.length, clone.length, `array length should be same: ${array}`);
	    assert.deepEqual(keys(orig), keys(clone), `array key should be same: ${array}`);
	    for (const key of keys(orig)) {
	      assert.same(orig[key], clone[key], `Property ${key}`);
	    }
	  });
	});

	// Objects
	QUnit.test('Object', assert => {
	  cloneObjectTest(assert, {
	    foo: true,
	    bar: false
	  }, (orig, clone) => {
	    assert.deepEqual(keys(orig), keys(clone));
	    for (const key of keys(orig)) {
	      assert.same(orig[key], clone[key], `Property ${key}`);
	    }
	  });
	});

	// [Serializable] Platform objects

	// Geometry types
	// if(typeof DOMMatrix == 'function') {
	// 	QUnit.test('Geometry types, DOMMatrix', assert => {
	// 		cloneObjectTest(assert, new DOMMatrix(), (orig, clone) => {
	// 			for(const key of keys(getPrototypeOf(orig))) {
	// 				assert.same(orig[key], clone[key], `Property ${key}`);
	// 			}
	// 		});
	// 	});
	// }

	// if(typeof DOMMatrixReadOnly == 'function' && typeof DOMMatrixReadOnly.fromMatrix == 'function') {
	// 	QUnit.test('Geometry types, DOMMatrixReadOnly', assert => {
	// 		cloneObjectTest(assert, new DOMMatrixReadOnly(), (orig, clone) => {
	// 			for(const key of keys(getPrototypeOf(orig))) {
	// 				assert.same(orig[key], clone[key], `Property ${key}`);
	// 			}
	// 		});
	// 	});
	// }

	if (typeof DOMPoint == 'function') {
	  QUnit.test('Geometry types, DOMPoint', assert => {
	    cloneObjectTest(assert, new DOMPoint(1, 2, 3, 4), (orig, clone) => {
	      for (const key of keys(getPrototypeOf(orig))) {
	        assert.same(orig[key], clone[key], `Property ${key}`);
	      }
	    });
	  });
	}
	if (typeof DOMPointReadOnly == 'function' && typeof DOMPointReadOnly.fromPoint == 'function') {
	  QUnit.test('Geometry types, DOMPointReadOnly', assert => {
	    cloneObjectTest(assert, new DOMPointReadOnly(1, 2, 3, 4), (orig, clone) => {
	      for (const key of keys(getPrototypeOf(orig))) {
	        assert.same(orig[key], clone[key], `Property ${key}`);
	      }
	    });
	  });
	}
	if (typeof DOMQuad == 'function' && typeof DOMPoint == 'function') {
	  QUnit.test('Geometry types, DOMQuad', assert => {
	    cloneObjectTest(assert, new DOMQuad(new DOMPoint(1, 2, 3, 4), new DOMPoint(2, 2, 3, 4), new DOMPoint(1, 3, 3, 4), new DOMPoint(1, 2, 4, 4)), (orig, clone) => {
	      for (const key of keys(getPrototypeOf(orig))) {
	        assert.deepEqual(orig[key], clone[key], `Property ${key}`);
	      }
	    });
	  });
	}
	if (fromSource('new DOMRect(1, 2, 3, 4)')) {
	  QUnit.test('Geometry types, DOMRect', assert => {
	    cloneObjectTest(assert, new DOMRect(1, 2, 3, 4), (orig, clone) => {
	      for (const key of keys(getPrototypeOf(orig))) {
	        assert.same(orig[key], clone[key], `Property ${key}`);
	      }
	    });
	  });
	}
	if (typeof DOMRectReadOnly == 'function' && typeof DOMRectReadOnly.fromRect == 'function') {
	  QUnit.test('Geometry types, DOMRectReadOnly', assert => {
	    cloneObjectTest(assert, new DOMRectReadOnly(1, 2, 3, 4), (orig, clone) => {
	      for (const key of keys(getPrototypeOf(orig))) {
	        assert.same(orig[key], clone[key], `Property ${key}`);
	      }
	    });
	  });
	}

	// Safari 8- does not support `{ colorSpace }` option
	// if(fromSource('new ImageData(new ImageData(8, 8).data, 8, 8, { colorSpace: new ImageData(8, 8).colorSpace })')) {
	// 	QUnit.test('ImageData', assert => {
	// 		const imageData = new ImageData(8, 8);
	// 		for(let i = 0; i < 256; ++i) {
	// 			imageData.data[i] = i;
	// 		}
	// 		cloneObjectTest(assert, imageData, (orig, clone) => {
	// 			assert.same(orig.width, clone.width);
	// 			assert.same(orig.height, clone.height);
	// 			assert.same(orig.colorSpace, clone.colorSpace);
	// 			assert.arrayEqual(orig.data, clone.data);
	// 		});
	// 	});
	// }

	if (window.Blob) QUnit.test('Blob', assert => {
	  cloneObjectTest(assert, new Blob(['This is a test.'], {
	    type: 'a/b'
	  }), (orig, clone) => {
	    assert.same(orig.size, clone.size);
	    assert.same(orig.type, clone.type);
	    // TODO: async
	    // assert.same(await orig.text(), await clone.text());
	  });
	});

	// QUnit.test('structuredClone#DOMException', assert => {
	// 	const errors = [
	// 		new DOMException(),
	// 		new DOMException('foo', 'DataCloneError'),
	// 	];

	// 	for(const error of errors) cloneObjectTest(assert, error, (orig, clone) => {
	// 		assert.same(orig.name, clone.name);
	// 		assert.same(orig.message, clone.message);
	// 		assert.same(orig.code, clone.code);
	// 		assert.same(orig.stack, clone.stack);
	// 	});
	// });

	// https://github.com/oven-sh/bun/issues/11696
	if (typeof window.File === "function") QUnit.test('File', assert => {
	  cloneObjectTest(assert, new File(['This is a test.'], 'foo.txt', {
	    type: 'c/d'
	  }), (orig, clone) => {
	    assert.same(orig.size, clone.size);
	    assert.same(orig.type, clone.type);
	    assert.same(orig.name, clone.name);
	    assert.same(orig.lastModified, clone.lastModified);
	    // TODO: async
	    // assert.same(await orig.text(), await clone.text());
	  });
	});

	// FileList
	if (typeof window.File === "function" && fromSource('new DataTransfer()')) QUnit.test('FileList', assert => {
	  const transfer = new DataTransfer();
	  transfer.items.add(new File(['test'], 'foo.txt'));
	  cloneObjectTest(assert, transfer.files, (orig, clone) => {
	    assert.same(1, clone.length);
	    assert.same(orig[0].size, clone[0].size);
	    assert.same(orig[0].type, clone[0].type);
	    assert.same(orig[0].name, clone[0].name);
	    assert.same(orig[0].lastModified, clone[0].lastModified);
	  });
	});

	// Non-serializable types
	QUnit.test('structuredClone#Non-serializable types', assert => {
	  const nons = [function () {
	    return 1;
	  }, Symbol('desc'), GLOBAL];
	  const event = new Event("");
	  // NodeJS events are simple objects
	  if (event) nons.push(event);
	  if (window.MessageChannel) {
	    const port = new MessageChannel().port1;
	    if (port) nons.push(port);
	  }
	  for (const it of nons) {
	    // native NodeJS `structuredClone` throws a `TypeError` on transferable non-serializable instead of `DOMException`
	    // https://github.com/nodejs/node/issues/40841
	    assert.throws(() => structuredClone(it));
	  }
	});

	function toReversed() {
		var arr = Array.from(this);
		arr.reverse();
		return arr;
	}

	definePrototype(Array, 'toReversed', toReversed);

	QUnit.test('Array#toReversed', assert => {
	  const toReversed = Array.prototype.toReversed;
	  assert.isFunction(toReversed);
	  assert.arity(toReversed, 0);
	  assert.name(toReversed, 'toReversed');
	  assert.looksNative(toReversed);
	  assert.nonEnumerable(Array.prototype, 'toReversed');
	  let array = [1, 2];
	  assert.ok(array.toReversed() !== array, 'immutable');
	  assert.deepEqual([1, 2.2, 3.3].toReversed(), [3.3, 2.2, 1], 'basic');
	  const object = {};
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
	  const expected = [Infinity, undefined, NaN, object, true, 'a', -1, 'X', 1, 2, undefined];
	  assert.deepEqual(toReversed.call(array), expected, 'non-array target');
	  array = [1];
	  // eslint-disable-next-line object-shorthand -- constructor
	  array.constructor = {
	    [Symbol.species]: function () {
	      return {
	        foo: 1
	      };
	    }
	  };
	  assert.equal(true, array.toReversed() instanceof Array, 'non-generic');
	  if (STRICT) {
	    assert.throws(() => toReversed.call(null, () => {/* empty */}, 1), TypeError);
	    assert.throws(() => toReversed.call(undefined, () => {/* empty */}, 1), TypeError);
	  }

	  // assert.equal(true, 'toReversed' in Array.prototype[Symbol.unscopables], 'In Array#@@unscopables');
	});

	function toSorted(fn) {
		var arr = Array.from(this);
		arr.sort.apply(arr, arguments);
		return arr;
	}

	definePrototype(Array, 'toSorted', toSorted);

	QUnit.test('Array#toSorted', assert => {
	  const toSorted = Array.prototype.toSorted;
	  assert.isFunction(toSorted);
	  assert.arity(toSorted, 1);
	  assert.name(toSorted, 'toSorted');
	  assert.looksNative(toSorted);
	  assert.nonEnumerable(Array.prototype, 'toSorted');
	  let array = [1];
	  assert.ok(array.toSorted() !== array, 'immutable');
	  assert.deepEqual([1, 3, 2].toSorted(), [1, 2, 3], '#1');
	  assert.deepEqual([1, 3, 2, 11].toSorted(), [1, 11, 2, 3], '#2');
	  assert.deepEqual([1, -1, 3, NaN, 2, 0, 11, -0].toSorted(), [-1, 0, -0, 1, 11, 2, 3, NaN], '#1');
	  array = Array(5);
	  array[0] = 1;
	  array[2] = 3;
	  array[4] = 2;
	  let expected = Array(5);
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
	  assert.notThrows(() => array = array.toSorted(() => {
	    throw 1;
	  }), 'undefined #1');
	  assert.deepEqual(array, [1, undefined], 'undefined #2');
	  const object = {
	    valueOf: () => 1,
	    toString: () => -1
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

	  let index, mod, code, chr, value;
	  expected = Array(516);
	  array = Array(516);
	  for (index = 0; index < 516; index++) {
	    mod = index % 4;
	    array[index] = 515 - index;
	    expected[index] = index - 2 * mod + 3;
	  }

	  // assert.arrayEqual(array.toSorted((a, b) => (a / 4 | 0) - (b / 4 | 0)), expected, 'stable #1');

	  // assert.equal(true, 1 / [0, -0].toSorted()[0] > 0, '-0');

	  let result = '';
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
	  array = array.toSorted((a, b) => b.v - a.v);
	  for (index = 0; index < array.length; index++) {
	    chr = array[index].k.charAt(0);
	    if (result.charAt(result.length - 1) !== chr) result += chr;
	  }

	  // assert.same(result, 'DGBEFHACIJK', 'stable #2');

	  // assert.notThrows(() => [1, 2, 3].toSorted(undefined).length === 3, 'works with undefined');
	  // assert.throws(() => [1, 2, 3].toSorted(null), 'throws on null');
	  // assert.throws(() => [1, 2, 3].toSorted({}), 'throws on {}');

	  if (typeof Symbol == 'function' && !Symbol.sham) {
	    assert.throws(() => [Symbol(1), Symbol(2)].toSorted(), 'w/o cmp throws on symbols');
	  }
	  array = [1];
	  // eslint-disable-next-line object-shorthand -- constructor
	  array.constructor = {
	    [Symbol.species]: function () {
	      return {
	        foo: 1
	      };
	    }
	  };
	  assert.equal(true, array.toSorted() instanceof Array, 'non-generic');
	  if (STRICT) {
	    assert.throws(() => toSorted.call(null), TypeError, 'ToObject(this)');
	    assert.throws(() => toSorted.call(undefined), TypeError, 'ToObject(this)');
	  }

	  // assert.equal(true, 'toSorted' in Array.prototype[Symbol.unscopables], 'In Array#@@unscopables');
	});

	function toSpliced(a1, a2) {
		var arr = Array.from(this);
		arr.splice.apply(arr, arguments);
		return arr;
	}

	definePrototype(Array, 'toSpliced', toSpliced);

	QUnit.test('Array#toSpliced', assert => {
	  const toSpliced = Array.prototype.toSpliced;
	  assert.isFunction(toSpliced);
	  assert.arity(toSpliced, 2);
	  assert.name(toSpliced, 'toSpliced');
	  assert.looksNative(toSpliced);
	  assert.nonEnumerable(Array.prototype, 'toSpliced');
	  let array = [1, 2, 3, 4, 5];
	  assert.ok(array.toSpliced(2) !== array, 'immutable');

	  // assert.deepEqual([1, 2, 3, 4, 5].toSpliced(2), [1, 2]);
	  // assert.deepEqual([1, 2, 3, 4, 5].toSpliced(-2), [1, 2, 3]);
	  assert.deepEqual([1, 2, 3, 4, 5].toSpliced(2, 2), [1, 2, 5]);
	  assert.deepEqual([1, 2, 3, 4, 5].toSpliced(2, -2), [1, 2, 3, 4, 5]);
	  assert.deepEqual([1, 2, 3, 4, 5].toSpliced(2, 2, 6, 7), [1, 2, 6, 7, 5]);
	  if (STRICT) {
	    assert.throws(() => toSpliced.call(null), TypeError);
	    assert.throws(() => toSpliced.call(undefined), TypeError);
	  }
	  array = [];
	  // eslint-disable-next-line object-shorthand -- constructor
	  array.constructor = {
	    [Symbol.species]: function () {
	      return {
	        foo: 1
	      };
	    }
	  };
	  assert.equal(true, array.toSpliced() instanceof Array, 'non-generic');

	  // assert.equal(true, 'toSpliced' in Array.prototype[Symbol.unscopables], 'In Array#@@unscopables');
	});

	function withAt(index, value) {
		if(this == null) {
			throw new TypeError("Cannot convert undefined or null to object");
		}
		if(index < 0) {
			index += this.length;
		}
		if(index < 0 || index >= this.length) {
			throw new RangeError("Invalid index: " + index);
		}
		var arr = Array.from(this);
		arr[index] = value;
		return arr;
	}

	definePrototype(Array, 'with', withAt);

	QUnit.test('Array#with', assert => {
	  const {
	    with: withAt
	  } = Array.prototype;
	  assert.isFunction(withAt);
	  assert.arity(withAt, 2);
	  // assert.name(withAt, 'with');
	  assert.looksNative(withAt);
	  assert.nonEnumerable(Array.prototype, 'with');
	  let array = [1, 2, 3, 4, 5];
	  assert.ok(array.with(2, 1) !== array, 'immutable');
	  assert.deepEqual([1, 2, 3, 4, 5].with(2, 6), [1, 2, 6, 4, 5]);
	  assert.deepEqual([1, 2, 3, 4, 5].with(-2, 6), [1, 2, 3, 6, 5]);
	  assert.deepEqual([1, 2, 3, 4, 5].with('1', 6), [1, 6, 3, 4, 5]);
	  assert.throws(() => [1, 2, 3, 4, 5].with(5, 6), RangeError);
	  assert.throws(() => [1, 2, 3, 4, 5].with(-6, 6), RangeError);
	  if (STRICT) {
	    assert.throws(() => withAt.call(null, 1, 2), TypeError);
	    assert.throws(() => withAt.call(undefined, 1, 2), TypeError);
	  }
	  array = [1, 2];
	  // eslint-disable-next-line object-shorthand -- constructor
	  array.constructor = {
	    [Symbol.species]: function () {
	      return {
	        foo: 1
	      };
	    }
	  };
	  // assert.true(array.with(1, 2) instanceof Array, 'non-generic');
	});

	function isSymbol(obj) {
		if(typeof obj === "symbol") {
			return true;
		}
		return false;
	};

	function isWellFormed() {
		if(this == null) {
			throw new TypeError("isWellFormed called on null or undefined");
		}
		if(isSymbol(this)) {
			throw new TypeError("Cannot convert a Symbol value to a string");
		}
		var str = String(this);
		// https://github.com/tc39/proposal-is-usv-string
		for(var i = 0; i < str.length; ++i) {
			var isSurrogate = (str.charCodeAt(i) & 0xF800) == 0xD800;
			if(!isSurrogate) {
				continue;
			}
			var isLeadingSurrogate = str.charCodeAt(i) < 0xDC00;
			if(!isLeadingSurrogate) {
				return false; // unpaired trailing surrogate
			}
			var isFollowedByTrailingSurrogate = i + 1 < str.length && (str.charCodeAt(i + 1) & 0xFC00) == 0xDC00;
			if(!isFollowedByTrailingSurrogate) {
				return false; // unpaired leading surrogate
			}
			++i;
		}
		return true;
	}

	definePrototype(String, 'isWellFormed', isWellFormed);

	QUnit.test('String#isWellFormed', assert => {
	  const isWellFormed = String.prototype.isWellFormed;
	  assert.isFunction(isWellFormed);
	  assert.arity(isWellFormed, 0);
	  assert.name(isWellFormed, 'isWellFormed');
	  assert.looksNative(isWellFormed);
	  assert.nonEnumerable(String.prototype, 'isWellFormed');
	  assert.ok(isWellFormed.call('a'), 'a');
	  assert.ok(isWellFormed.call('abc'), 'abc');
	  assert.ok(isWellFormed.call('💩'), '💩');
	  assert.ok(isWellFormed.call('💩b'), '💩b');
	  assert.ok(isWellFormed.call('a💩'), '💩');
	  assert.ok(isWellFormed.call('a💩b'), 'a💩b');
	  assert.ok(isWellFormed.call('💩a💩'), '💩a💩');
	  assert.ok(!isWellFormed.call('\uD83D'), '\uD83D');
	  assert.ok(!isWellFormed.call('\uDCA9'), '\uDCA9');
	  assert.ok(!isWellFormed.call('\uDCA9\uD83D'), '\uDCA9\uD83D');
	  assert.ok(!isWellFormed.call('a\uD83D'), 'a\uD83D');
	  assert.ok(!isWellFormed.call('\uDCA9a'), '\uDCA9a');
	  assert.ok(!isWellFormed.call('a\uD83Da'), 'a\uD83Da');
	  assert.ok(!isWellFormed.call('a\uDCA9a'), 'a\uDCA9a');
	  assert.ok(isWellFormed.call({
	    toString() {
	      return 'abc';
	    }
	  }), 'conversion #1');
	  assert.ok(!isWellFormed.call({
	    toString() {
	      return '\uD83D';
	    }
	  }), 'conversion #2');
	  if (STRICT) {
	    assert.throws(() => isWellFormed.call(null), TypeError, 'coercible #1');
	    assert.throws(() => isWellFormed.call(undefined), TypeError, 'coercible #2');
	  }
	  assert.throws(() => isWellFormed.call(Symbol$4('isWellFormed test')), 'throws on symbol context');
	});

	function toWellFormed() {
		if(this == null) {
			throw new TypeError("toWellFormed called on null or undefined");
		}
		if(isSymbol(this)) {
			throw new TypeError("Cannot convert a Symbol value to a string");
		}
		var S = String(this);
		var len = S.length;
		var r = new Array(S.length);
		// https://tc39.es/ecma262/#sec-string.prototype.towellformed
		for(var i = 0; i < len; i++) {
			var charCode = S.charCodeAt(i);
			// single UTF-16 code unit
			if((charCode & 0xF800) !== 0xD800) r[i] = S.charAt(i);
			// unpaired surrogate
			else if(charCode >= 0xDC00 || i + 1 >= len || (S.charCodeAt(i + 1) & 0xFC00) !== 0xDC00) r[i] = "\uFFFD";
			// surrogate pair
			else {
				r[i] = S.charAt(i);
				r[++i] = S.charAt(i);
			}
		}
		return r.join('');
	}

	definePrototype(String, 'toWellFormed', toWellFormed);

	QUnit.test('String#toWellFormed', assert => {
	  const toWellFormed = String.prototype.toWellFormed;
	  assert.isFunction(toWellFormed);
	  assert.arity(toWellFormed, 0);
	  assert.name(toWellFormed, 'toWellFormed');
	  assert.looksNative(toWellFormed);
	  assert.nonEnumerable(String.prototype, 'toWellFormed');
	  assert.same(toWellFormed.call('a'), 'a', 'a');
	  assert.same(toWellFormed.call('abc'), 'abc', 'abc');
	  assert.same(toWellFormed.call('💩'), '💩', '💩');
	  assert.same(toWellFormed.call('💩b'), '💩b', '💩b');
	  assert.same(toWellFormed.call('a💩'), 'a💩', '💩');
	  assert.same(toWellFormed.call('a💩b'), 'a💩b', 'a💩b');
	  assert.same(toWellFormed.call('💩a💩'), '💩a💩');
	  assert.same(toWellFormed.call('\uD83D'), '\uFFFD', '\uD83D');
	  assert.same(toWellFormed.call('\uDCA9'), '\uFFFD', '\uDCA9');
	  assert.same(toWellFormed.call('\uDCA9\uD83D'), '\uFFFD\uFFFD', '\uDCA9\uD83D');
	  assert.same(toWellFormed.call('a\uD83D'), 'a\uFFFD', 'a\uFFFD');
	  assert.same(toWellFormed.call('\uDCA9a'), '\uFFFDa', '\uDCA9a');
	  assert.same(toWellFormed.call('a\uD83Da'), 'a\uFFFDa', 'a\uD83Da');
	  assert.same(toWellFormed.call('a\uDCA9a'), 'a\uFFFDa', 'a\uDCA9a');
	  assert.same(toWellFormed.call({
	    toString() {
	      return 'abc';
	    }
	  }), 'abc', 'conversion #1');
	  assert.same(toWellFormed.call(1), '1', 'conversion #2');
	  if (STRICT) {
	    assert.throws(() => toWellFormed.call(null), TypeError, 'coercible #1');
	    assert.throws(() => toWellFormed.call(undefined), TypeError, 'coercible #2');
	  }
	  assert.throws(() => toWellFormed.call(Symbol('toWellFormed test')), 'throws on symbol context');
	});

	var defineProperty = Object$1.defineProperty;

	var nonEnumerable = !!defineProperties;

	var iterator = (function() {
		if(!Symbol$6) {
			if(nonEnumerable) {
				defineProperty(Object.prototype, '@@iterator', { enumerable: false, configurable: false, writable: true });
			}
			return '@@iterator';
		} else {
			return Symbol$6.iterator || Symbol$6('iterator');
		}
	})();

	function groupBy$1(iterable, keySelector) {
		var entries = iterable[iterator];
		if(!entries) {
			throw new TypeError("object is not iterable");
		}
		var it = entries.call(iterable);
		var r = Object.create(null);
		var i = 0;
		var key, value, arr;
		while(true) {
			var next = it.next();
			if(next.done) break;
			try {
				value = next.value;
				key = keySelector(value, i++);
				if(key in r) {
					arr = r[key];
				} else {
					arr = r[key] = [];
				}
				arr.push(value);
			} catch(e) {
				if(it.return) {
					try {
						it.return();
					} catch(e) { }
				}
				throw e;
			}
		}
		return r;
	}

	if(!Object$1.groupBy) {
		Object$1.groupBy = groupBy$1;
	}

	QUnit.test('Object.groupBy', assert => {
	  const groupBy = Object.groupBy;
	  const getPrototypeOf = Object.getPrototypeOf;
	  const entries = Object.entries;
	  assert.isFunction(groupBy);
	  assert.arity(groupBy, 2);
	  assert.name(groupBy, 'groupBy');
	  assert.same(getPrototypeOf(groupBy([], it => it)), null);
	  assert.deepEqual(entries(groupBy([], it => it)), []);
	  assert.deepEqual(entries(groupBy([1, 2], it => it ** 2)), [['1', [1]], ['4', [2]]]);
	  assert.deepEqual(entries(groupBy([1, 2, 1], it => it ** 2)), [['1', [1, 1]], ['4', [2]]]);
	  assert.deepEqual(entries(groupBy(createIterable([1, 2]), it => it ** 2)), [['1', [1]], ['4', [2]]]);
	  assert.deepEqual(entries(groupBy('qwe', it => it)), [['q', ['q']], ['w', ['w']], ['e', ['e']]], 'iterable string');
	  const element = {};
	  groupBy([element], function (it, i) {
	    assert.same(arguments.length, 2);
	    assert.same(it, element);
	    assert.same(i, 0);
	  });
	});

	function groupBy(iterable, keySelector) {
		var entries = iterable[iterator];
		if(!entries) {
			throw new TypeError("object is not iterable");
		}
		var it = entries.call(iterable);
		var r = new Map();
		var i = 0;
		var key, value, arr;
		while(true) {
			var next = it.next();
			if(next.done) break;
			try {
				value = next.value;
				key = keySelector(value, i++);
				if(r.has(key)) {
					arr = r.get(key);
				} else {
					arr = [];
					r.set(key, arr);
				}
				arr.push(value);
			} catch(e) {
				if(it.return) {
					try {
						it.return();
					} catch(e) { }
				}
				throw e;
			}
		}
		return r;
	}

	var Map$1 = globalThis.Map;
	if(!Map$1.groupBy) {
		Map$1.groupBy = groupBy;
	}

	QUnit.test('Map.groupBy', assert => {
	  const groupBy = Map.groupBy;
	  const from = Array.from;
	  assert.isFunction(groupBy);
	  assert.arity(groupBy, 2);
	  assert.name(groupBy, 'groupBy');
	  assert.ok(groupBy([], it => it) instanceof Map);
	  assert.deepEqual(from(groupBy([], it => it)), []);
	  assert.deepEqual(from(groupBy([1, 2], it => it ** 2)), [[1, [1]], [4, [2]]]);
	  assert.deepEqual(from(groupBy([1, 2, 1], it => it ** 2)), [[1, [1, 1]], [4, [2]]]);
	  assert.deepEqual(from(groupBy(createIterable([1, 2]), it => it ** 2)), [[1, [1]], [4, [2]]]);
	  assert.deepEqual(from(groupBy('qwe', it => it)), [['q', ['q']], ['w', ['w']], ['e', ['e']]], 'iterable string');
	  const element = {};
	  groupBy([element], function (it, i) {
	    assert.same(arguments.length, 2);
	    assert.same(it, element);
	    assert.same(i, 0);
	  });
	});

	function withResolvers() {
		var resolve, reject, promise = new Promise(function(res, rej) {
			resolve = res;
			reject = rej;
		});
		return {
			resolve: resolve,
			reject: reject,
			promise: promise
		};
	}

	if(!Promise$3.withResolvers) {
		Promise$3.withResolvers = withResolvers;
	}

	QUnit.test('Promise.withResolvers', assert => {
	  const withResolvers = Promise.withResolvers;
	  assert.isFunction(withResolvers);
	  assert.arity(withResolvers, 0);
	  assert.name(withResolvers, 'withResolvers');
	  const d1 = Promise.withResolvers();
	  assert.same(Object.getPrototypeOf(d1), Object.prototype, 'proto is Object.prototype');
	  assert.ok(d1.promise instanceof Promise === true, 'promise is promise');
	  assert.isFunction(d1.resolve, 'resolve is function');
	  assert.isFunction(d1.reject, 'reject is function');

	  // const promise = {};
	  // const resolve = () => { /* empty */ };
	  // let reject = () => { /* empty */ };

	  // function P(exec) {
	  // 	exec(resolve, reject);
	  // 	return promise;
	  // }

	  // const d2 = withResolvers.call(P);
	  // assert.same(d2.promise, promise, 'promise is promise #2');
	  // assert.same(d2.resolve, resolve, 'resolve is resolve #2');
	  // assert.same(d2.reject, reject, 'reject is reject #2');

	  // reject = {};

	  // assert.throws(() => withResolvers.call(P), TypeError, 'broken resolver');
	  // assert.throws(() => withResolvers.call({}), TypeError, 'broken constructor #1');
	  // assert.throws(() => withResolvers.call(null), TypeError, 'broken constructor #2');
	});
	QUnit.asyncTest('Promise.withResolvers, resolve', assert => {
	  expect(1);
	  const d = Promise.withResolvers();
	  d.resolve(42);
	  return d.promise.then(it => {
	    assert.same(it, 42, 'resolved as expected');
	    start();
	  }, () => {
	    assert.avoid();
	  });
	});
	QUnit.asyncTest('Promise.withResolvers, reject', assert => {
	  expect(1);
	  const d = Promise.withResolvers();
	  d.reject(42);
	  return d.promise.then(() => {
	    assert.avoid();
	  }, error => {
	    assert.same(error, 42, 'rejected as expected');
	    start();
	  });
	});

	// /* Chrome126+ Firefox126+ Safari18+ */
	// import "./web.url-parse";

})();
