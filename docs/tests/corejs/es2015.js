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
	function includes(target, wanted) {
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
	function timeLimitedPromise(time, promise) {
	  return Promise.race([promise, new Promise((resolve, reject) => {
	    setTimeout(reject, time);
	  })]);
	}

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
	  toString,
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

	var URL$1 = window.URL || window.webkitURL;

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

	definePrototype(URL$1, 'toJSON', function toJSON() {
		return this.href;
	});

	var Date = window.Date;

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

	definePrototype(Date, 'toISOString', function() {
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

	var k = 'toJSON', p = Date.prototype;
	if(!(k in p) || new Date(0)[k]() !== '1970-01-01T00:00:00.000Z') {
		p[k] = function(_) {
			if(this.getTime && isNaN(this.getTime())) {
				return null;
			}
			return this.toISOString();
		};
	}

	const {
	  hasOwnProperty
	} = Object.prototype;
	QUnit.test('URL constructor', assert => {
	  assert.isFunction(URL);
	  assert.arity(URL, 1);
	  // assert.name(URL, 'URL');
	  assert.looksNative(URL);
	  assert.same(new URL('http://www.domain.com/a/b').href, 'http://www.domain.com/a/b');
	  assert.same(new URL('/c/d', 'http://www.domain.com/a/b').href, 'http://www.domain.com/c/d');
	  assert.same(new URL('b/c', 'http://www.domain.com/a/b').href, 'http://www.domain.com/a/b/c');
	  assert.same(new URL('b/c', new URL('http://www.domain.com/a/b')).href, 'http://www.domain.com/a/b/c');
	  assert.same(new URL({
	    toString: () => 'https://example.org/'
	  }).href, 'https://example.org/');
	  assert.same(new URL('nonspecial://example.com/').href, 'nonspecial://example.com/');

	  // assert.same(new URL('https://測試').href, 'https://xn--g6w251d/', 'unicode parsing');
	  // assert.same(new URL('https://xxпривет.тест').href, 'https://xn--xx-flcmn5bht.xn--e1aybc/', 'unicode parsing');
	  // assert.same(new URL('https://xxПРИВЕТ.тест').href, 'https://xn--xx-flcmn5bht.xn--e1aybc/', 'unicode parsing');
	  assert.same(new URL('http://example.com/', 'https://example.org/').href, 'http://example.com/');
	  assert.same(new URL('https://example.com/', 'https://example.org/').href, 'https://example.com/');
	  assert.same(new URL('nonspecial://Example.com/', 'https://example.org/').href, 'nonspecial://Example.com/');
	  // assert.same(new URL('http:Example.com/', 'https://example.org/').href, 'http://example.com/');
	  // assert.same(new URL('https:Example.com/', 'https://example.org/').href, 'https://example.org/Example.com/');
	  // assert.same(new URL('nonspecial:Example.com/', 'https://example.org/').href, 'nonspecial:Example.com/');

	  // assert.same(new URL('http://0300.168.0xF0').href, 'http://192.168.0.240/');
	  // assert.same(new URL('http://[20:0:0:1:0:0:0:ff]').href, 'http://[20:0:0:1::ff]/');
	  // assert.same(new URL('http://257.168.0xF0').href, 'http://257.168.0xf0/', 'incorrect IPv4 parsed as host'); // TypeError in Chrome and Safari
	  // assert.same(new URL('http://0300.168.0xG0').href, 'http://0300.168.0xg0/', 'incorrect IPv4 parsed as host');

	  assert.same(new URL('file:///var/log/system.log').href, 'file:///var/log/system.log', 'file scheme');
	  // assert.same(new URL('file://nnsc.nsf.net/bar/baz').href, 'file://nnsc.nsf.net/bar/baz', 'file scheme'); // 'file:///bar/baz' in FF
	  // assert.same(new URL('file://localhost/bar/baz').href, 'file:///bar/baz', 'file scheme'); // 'file://localhost/bar/baz' in Chrome

	  assert.throws(() => new URL(), 'TypeError: Failed to construct \'URL\': 1 argument required, but only 0 present.');
	  // assert.throws(() => new URL(''), 'TypeError: Failed to construct \'URL\': Invalid URL');
	  // assert.throws(() => new URL('', 'about:blank'), 'TypeError: Failed to construct \'URL\': Invalid URL');
	  assert.throws(() => new URL('abc'), 'TypeError: Failed to construct \'URL\': Invalid URL');
	  assert.throws(() => new URL('//abc'), 'TypeError: Failed to construct \'URL\': Invalid URL');
	  assert.throws(() => new URL('http:///www.domain.com/', 'abc'), 'TypeError: Failed to construct \'URL\': Invalid base URL');
	  assert.throws(() => new URL('http:///www.domain.com/', null), 'TypeError: Failed to construct \'URL\': Invalid base URL');
	  assert.throws(() => new URL('//abc', null), 'TypeError: Failed to construct \'URL\': Invalid base URL');
	  // assert.throws(() => new URL('http://[20:0:0:1:0:0:0:ff'), 'incorrect IPv6');
	  // assert.throws(() => new URL('http://[20:0:0:1:0:0:0:fg]'), 'incorrect IPv6');
	  // assert.throws(() => new URL('http://a%b'), 'forbidden host code point'); // no error in FF
	  // assert.throws(() => new URL('1http://zloirock.ru'), 'incorrect scheme');
	});
	QUnit.test('URL#href', assert => {
	  let url = new URL('http://zloirock.ru/');

	  // if(DESCRIPTORS) {
	  //   assert.ok(!hasOwnProperty.call(url, 'href'));
	  //   // const descriptor = Object.getOwnPropertyDescriptor(URL.prototype, 'href');
	  //   // assert.same(descriptor.enumerable, true);
	  //   // // assert.same(descriptor.configurable, true);
	  //   // assert.same(typeof descriptor.get, 'function');
	  //   // assert.same(typeof descriptor.set, 'function');
	  // }

	  assert.same(url.href, 'http://zloirock.ru/');
	  if (DESCRIPTORS) {
	    url.searchParams.append('foo', 'bar');
	    assert.same(url.href, 'http://zloirock.ru/?foo=bar');

	    // url = new URL('http://zloirock.ru/foo');
	    // url.href = 'https://測試';
	    // assert.same(url.href, 'https://xn--g6w251d/', 'unicode parsing');
	    // assert.same(url.href, 'https://xn--g6w251d/', 'unicode parsing');

	    // url = new URL('http://zloirock.ru/foo');
	    // url.href = 'https://xxпривет.тест';
	    // assert.same(url.href, 'https://xn--xx-flcmn5bht.xn--e1aybc/', 'unicode parsing');
	    // assert.same(url.href, 'https://xn--xx-flcmn5bht.xn--e1aybc/', 'unicode parsing');

	    // url = new URL('http://zloirock.ru/foo');
	    // url.href = 'https://xxПРИВЕТ.тест';
	    // assert.same(url.href, 'https://xn--xx-flcmn5bht.xn--e1aybc/', 'unicode parsing');
	    // assert.same(url.href, 'https://xn--xx-flcmn5bht.xn--e1aybc/', 'unicode parsing');

	    // url = new URL('http://zloirock.ru/');
	    // url.href = 'http://0300.168.0xF0';
	    // assert.same(url.href, 'http://192.168.0.240/');
	    // assert.same(url.href, 'http://192.168.0.240/');

	    // url = new URL('http://zloirock.ru/');
	    // url.href = 'http://[20:0:0:1:0:0:0:ff]';
	    // assert.same(url.href, 'http://[20:0:0:1::ff]/');
	    // assert.same(url.href, 'http://[20:0:0:1::ff]/');

	    // url = new URL('http://zloirock.ru/');
	    // url.href = 'http://257.168.0xF0'; // TypeError and Safari
	    // assert.same(url.href, 'http://257.168.0xf0/', 'incorrect IPv4 parsed as host'); // `F` instead of `f` in Chrome
	    // assert.same(url.href, 'http://257.168.0xf0/', 'incorrect IPv4 parsed as host'); // `F` instead of `f` in Chrome

	    // url = new URL('http://zloirock.ru/');
	    // url.href = 'http://0300.168.0xG0';
	    // assert.same(url.href, 'http://0300.168.0xg0/', 'incorrect IPv4 parsed as host');
	    // assert.same(url.href, 'http://0300.168.0xg0/', 'incorrect IPv4 parsed as host');

	    url = new URL('http://192.168.0.240/');
	    url.href = 'file:///var/log/system.log';
	    assert.same(url.href, 'file:///var/log/system.log', 'file -> ip');
	    assert.same(url.href, 'file:///var/log/system.log', 'file -> ip');

	    // url = new URL('file:///var/log/system.log');
	    // url.href = 'http://0300.168.0xF0';
	    // assert.same(url.href, 'http://192.168.0.240/', 'file -> http');
	    // assert.same(url.href, 'http://192.168.0.240/', 'file -> http');

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
	QUnit.test('URL#origin', assert => {
	  const url = new URL('http://es6.zloirock.ru/tests.html');

	  // if(DESCRIPTORS) {
	  //   assert.ok(!hasOwnProperty.call(url, 'origin'));
	  //   // const descriptor = Object.getOwnPropertyDescriptor(URL.prototype, 'origin');
	  //   // assert.same(descriptor.enumerable, true);
	  //   // // assert.same(descriptor.configurable, true);
	  //   // assert.same(typeof descriptor.get, 'function');
	  // }

	  assert.same(url.origin, 'http://es6.zloirock.ru');

	  // assert.same(new URL('https://測試/tests').origin, 'https://xn--g6w251d');
	});
	QUnit.test('URL#protocol', assert => {
	  let url = new URL('http://zloirock.ru/');

	  // if(DESCRIPTORS) {
	  //   assert.ok(!hasOwnProperty.call(url, 'protocol'));
	  //   const descriptor = Object.getOwnPropertyDescriptor(URL.prototype, 'protocol');
	  //   assert.same(descriptor.enumerable, true);
	  //   // assert.same(descriptor.configurable, true);
	  //   assert.same(typeof descriptor.get, 'function');
	  //   assert.same(typeof descriptor.set, 'function');
	  // }

	  assert.same(url.protocol, 'http:');
	  if (DESCRIPTORS) {
	    // url = new URL('http://zloirock.ru/');
	    // url.protocol = 'https';
	    // assert.same(url.protocol, 'https:');
	    // assert.same(url.href, 'https://zloirock.ru/');

	    // https://nodejs.org/api/url.html#url_special_schemes
	    // url = new URL('http://zloirock.ru/');
	    // url.protocol = 'fish';
	    // assert.same(url.protocol, 'http:');
	    // assert.same(url.href, 'http://zloirock.ru/');
	    // assert.same(url.href, 'http://zloirock.ru/');

	    // url = new URL('http://zloirock.ru/');
	    // url.protocol = '1http';
	    // assert.same(url.protocol, 'http:');
	    // assert.same(url.href, 'http://zloirock.ru/', 'incorrect scheme');
	    // assert.same(url.href, 'http://zloirock.ru/', 'incorrect scheme');
	  }
	});
	QUnit.test('URL#username', assert => {
	  let url = new URL('http://zloirock.ru/');

	  // if(DESCRIPTORS) {
	  //   assert.ok(!hasOwnProperty.call(url, 'username'));
	  //   const descriptor = Object.getOwnPropertyDescriptor(URL.prototype, 'username');
	  //   assert.same(descriptor.enumerable, true);
	  //   // assert.same(descriptor.configurable, true);
	  //   assert.same(typeof descriptor.get, 'function');
	  //   assert.same(typeof descriptor.set, 'function');
	  // }

	  assert.same(url.username, '');
	  url = new URL('http://username@zloirock.ru/');
	  assert.same(url.username, 'username');
	  if (DESCRIPTORS) {
	    url = new URL('http://zloirock.ru/');
	    url.username = 'username';
	    assert.same(url.username, 'username');
	    assert.same(url.href, 'http://username@zloirock.ru/');
	  }
	});
	QUnit.test('URL#password', assert => {
	  let url = new URL('http://zloirock.ru/');

	  // if(DESCRIPTORS) {
	  //   assert.ok(!hasOwnProperty.call(url, 'password'));
	  //   const descriptor = Object.getOwnPropertyDescriptor(URL.prototype, 'password');
	  //   assert.same(descriptor.enumerable, true);
	  //   // assert.same(descriptor.configurable, true);
	  //   assert.same(typeof descriptor.get, 'function');
	  //   assert.same(typeof descriptor.set, 'function');
	  // }

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
	    assert.same(url.href, 'http://username:password@zloirock.ru/');

	    // url = new URL('http://zloirock.ru/');
	    // url.password = 'password';
	    // assert.same(url.password, 'password'); // '' in FF
	    // assert.same(url.href, 'http://:password@zloirock.ru/'); // 'http://zloirock.ru/' in FF
	  }
	});
	QUnit.test('URL#host', assert => {
	  let url = new URL('http://zloirock.ru:81/path');

	  // if(DESCRIPTORS) {
	  //   assert.ok(!hasOwnProperty.call(url, 'host'));
	  //   // const descriptor = Object.getOwnPropertyDescriptor(URL.prototype, 'host');
	  //   // assert.same(descriptor.enumerable, true);
	  //   // // assert.same(descriptor.configurable, true);
	  //   // assert.same(typeof descriptor.get, 'function');
	  //   // assert.same(typeof descriptor.set, 'function');
	  // }

	  assert.same(url.host, 'zloirock.ru:81');
	  if (DESCRIPTORS) {
	    url = new URL('http://zloirock.ru:81/path');
	    url.host = 'example.com:82';
	    assert.same(url.host, 'example.com:82');
	    assert.same(url.href, 'http://example.com:82/path');

	    // url = new URL('http://zloirock.ru:81/path');
	    // url.host = 'other?domain.com';
	    // assert.same(url.href, 'http://other:81/path'); // 'http://other/?domain.com/path' in Safari

	    url = new URL('https://www.mydomain.com:8080/path/');
	    url.host = 'www.otherdomain.com:80';
	    assert.same(url.href, 'https://www.otherdomain.com:80/path/', 'set default port for another protocol');

	    // url = new URL('https://www.mydomain.com:8080/path/');
	    // url.host = 'www.otherdomain.com:443';
	    // assert.same(url.href, 'https://www.otherdomain.com/path/', 'set default port');

	    // url = new URL('http://zloirock.ru/foo');
	    // url.host = '測試';
	    // assert.same(url.host, 'xn--g6w251d', 'unicode parsing');
	    // assert.same(url.href, 'http://xn--g6w251d/foo', 'unicode parsing');

	    // url = new URL('http://zloirock.ru/foo');
	    // url.host = 'xxпривет.тест';
	    // assert.same(url.host, 'xn--xx-flcmn5bht.xn--e1aybc', 'unicode parsing');
	    // assert.same(url.href, 'http://xn--xx-flcmn5bht.xn--e1aybc/foo', 'unicode parsing');

	    // url = new URL('http://zloirock.ru/foo');
	    // url.host = 'xxПРИВЕТ.тест';
	    // assert.same(url.host, 'xn--xx-flcmn5bht.xn--e1aybc', 'unicode parsing');
	    // assert.same(url.href, 'http://xn--xx-flcmn5bht.xn--e1aybc/foo', 'unicode parsing');

	    // url = new URL('http://zloirock.ru/foo');
	    // url.host = '0300.168.0xF0';
	    // assert.same(url.host, '192.168.0.240');
	    // assert.same(url.href, 'http://192.168.0.240/foo');

	    // url = new URL('http://zloirock.ru/foo');
	    // url.host = '[20:0:0:1:0:0:0:ff]';
	    // assert.same(url.host, '[20:0:0:1::ff]'); // ':0' in Chrome, 'zloirock.ru' in Safari
	    // assert.same(url.href, 'http://[20:0:0:1::ff]/foo'); // 'http://[20:0/foo' in Chrome, 'http://zloirock.ru/foo' in Safari

	    // url = new URL('file:///var/log/system.log');
	    // url.host = 'nnsc.nsf.net'; // does not work in FF
	    // assert.same(url.hostname, 'nnsc.nsf.net', 'file');
	    // assert.same(url.href, 'file://nnsc.nsf.net/var/log/system.log', 'file');

	    // url = new URL('http://zloirock.ru/');
	    // url.host = '[20:0:0:1:0:0:0:ff';
	    // assert.same(url.host, 'zloirock.ru', 'incorrect IPv6'); // ':0' in Chrome
	    // assert.same(url.href, 'http://zloirock.ru/', 'incorrect IPv6'); // 'http://[20:0/' in Chrome

	    // url = new URL('http://zloirock.ru/');
	    // url.host = '[20:0:0:1:0:0:0:fg]';
	    // assert.same(url.host, 'zloirock.ru', 'incorrect IPv6'); // ':0' in Chrome
	    // assert.same(url.href, 'http://zloirock.ru/', 'incorrect IPv6'); // 'http://[20:0/' in Chrome

	    // url = new URL('http://zloirock.ru/');
	    // url.host = 'a%b';
	    // assert.same(url.host, 'zloirock.ru', 'forbidden host code point'); // '' in Chrome, 'a%b' in FF
	    // assert.same(url.href, 'http://zloirock.ru/', 'forbidden host code point'); // 'http://a%25b/' in Chrome, 'http://a%b/' in FF
	  }
	});
	QUnit.test('URL#hostname', assert => {
	  let url = new URL('http://zloirock.ru:81/');

	  // if(DESCRIPTORS) {
	  //   assert.ok(!hasOwnProperty.call(url, 'hostname'));
	  //   const descriptor = Object.getOwnPropertyDescriptor(URL.prototype, 'hostname');
	  //   assert.same(descriptor.enumerable, true);
	  //   // assert.same(descriptor.configurable, true);
	  //   assert.same(typeof descriptor.get, 'function');
	  //   assert.same(typeof descriptor.set, 'function');
	  // }

	  assert.same(url.hostname, 'zloirock.ru');
	  if (DESCRIPTORS) {
	    url = new URL('http://zloirock.ru:81/');
	    url.hostname = 'example.com';
	    assert.same(url.hostname, 'example.com');
	    assert.same(url.href, 'http://example.com:81/');

	    // url = new URL('http://zloirock.ru:81/');
	    // url.hostname = 'example.com:82';
	    // assert.same(url.hostname, 'example.com'); // '' in Chrome
	    // assert.same(url.href, 'http://example.com:81/'); // 'ttp://example.com:82:81/' in Chrome

	    // url = new URL('http://zloirock.ru/foo');
	    // url.hostname = '測試';
	    // assert.same(url.hostname, 'xn--g6w251d', 'unicode parsing');
	    // assert.same(url.href, 'http://xn--g6w251d/foo', 'unicode parsing');

	    // url = new URL('http://zloirock.ru/foo');
	    // url.hostname = 'xxпривет.тест';
	    // assert.same(url.hostname, 'xn--xx-flcmn5bht.xn--e1aybc', 'unicode parsing');
	    // assert.same(url.href, 'http://xn--xx-flcmn5bht.xn--e1aybc/foo', 'unicode parsing');

	    // url = new URL('http://zloirock.ru/foo');
	    // url.hostname = 'xxПРИВЕТ.тест';
	    // assert.same(url.hostname, 'xn--xx-flcmn5bht.xn--e1aybc', 'unicode parsing');
	    // assert.same(url.href, 'http://xn--xx-flcmn5bht.xn--e1aybc/foo', 'unicode parsing');

	    // url = new URL('http://zloirock.ru/foo');
	    // url.hostname = '0300.168.0xF0';
	    // assert.same(url.hostname, '192.168.0.240');
	    // assert.same(url.href, 'http://192.168.0.240/foo');

	    // url = new URL('http://zloirock.ru/foo');
	    // url.hostname = '[20:0:0:1:0:0:0:ff]';
	    // assert.same(url.hostname, '[20:0:0:1::ff]'); // 'zloirock.ru' in Safari
	    // assert.same(url.href, 'http://[20:0:0:1::ff]/foo'); // 'http://zloirock.ru/foo' in Safari

	    // url = new URL('file:///var/log/system.log');
	    // url.hostname = 'nnsc.nsf.net'; // does not work in FF
	    // assert.same(url.hostname, 'nnsc.nsf.net', 'file');
	    // assert.same(url.href, 'file://nnsc.nsf.net/var/log/system.log', 'file');

	    // url = new URL('http://zloirock.ru/');
	    // url.hostname = '[20:0:0:1:0:0:0:ff';
	    // assert.same(url.hostname, 'zloirock.ru', 'incorrect IPv6'); // '' in Chrome
	    // assert.same(url.href, 'http://zloirock.ru/', 'incorrect IPv6'); // 'http://[20:0:0:1:0:0:0:ff' in Chrome

	    // url = new URL('http://zloirock.ru/');
	    // url.hostname = '[20:0:0:1:0:0:0:fg]';
	    // assert.same(url.hostname, 'zloirock.ru', 'incorrect IPv6'); // '' in Chrome
	    // assert.same(url.href, 'http://zloirock.ru/', 'incorrect IPv6'); // 'http://[20:0:0:1:0:0:0:ff/' in Chrome

	    // url = new URL('http://zloirock.ru/');
	    // url.hostname = 'a%b';
	    // assert.same(url.hostname, 'zloirock.ru', 'forbidden host code point'); // '' in Chrome, 'a%b' in FF
	    // assert.same(url.href, 'http://zloirock.ru/', 'forbidden host code point'); // 'http://a%25b/' in Chrome, 'http://a%b/' in FF
	  }
	});
	QUnit.test('URL#port', assert => {
	  let url = new URL('http://zloirock.ru:1337/');

	  // if(DESCRIPTORS) {
	  //   assert.ok(!hasOwnProperty.call(url, 'port'));
	  //   const descriptor = Object.getOwnPropertyDescriptor(URL.prototype, 'port');
	  //   assert.same(descriptor.enumerable, true);
	  //   // assert.same(descriptor.configurable, true);
	  //   assert.same(typeof descriptor.get, 'function');
	  //   assert.same(typeof descriptor.set, 'function');
	  // }

	  assert.same(url.port, '1337');
	  if (DESCRIPTORS) {
	    url = new URL('http://zloirock.ru/');
	    url.port = '';
	    assert.same(url.port, '');
	    assert.same(url.href, 'http://zloirock.ru/');
	    url.port = '1337';
	    assert.same(url.port, '1337');
	    assert.same(url.href, 'http://zloirock.ru:1337/');
	    // url.port = 'abcd';
	    // assert.same(url.port, '1337'); // '0' in Chrome
	    // assert.same(url.href, 'http://zloirock.ru:1337/'); // 'http://zloirock.ru:0/' in Chrome
	    // url.port = '5678abcd';
	    // assert.same(url.port, '5678'); // '1337' in FF
	    // assert.same(url.href, 'http://zloirock.ru:5678/'); // 'http://zloirock.ru:1337/"' in FF
	    url.port = '1234';
	    assert.same(url.port, '1234');
	    assert.same(url.href, 'http://zloirock.ru:1234/');
	    // url.port = 1e10;
	    // assert.same(url.port, '1234'); // '0' in Chrome
	    // assert.same(url.href, 'http://zloirock.ru:1234/'); // 'http://zloirock.ru:0/' in Chrome
	  }
	});
	QUnit.test('URL#pathname', assert => {
	  let url = new URL('http://zloirock.ru/foo/bar');

	  // if(DESCRIPTORS) {
	  //   assert.ok(!hasOwnProperty.call(url, 'pathname'));
	  //   const descriptor = Object.getOwnPropertyDescriptor(URL.prototype, 'pathname');
	  //   assert.same(descriptor.enumerable, true);
	  //   // assert.same(descriptor.configurable, true);
	  //   assert.same(typeof descriptor.get, 'function');
	  //   assert.same(typeof descriptor.set, 'function');
	  // }

	  assert.same(url.pathname, '/foo/bar');
	  if (DESCRIPTORS) {
	    url = new URL('http://zloirock.ru/');
	    url.pathname = '/bar/baz';
	    assert.same(url.pathname, '/bar/baz');
	    assert.same(url.href, 'http://zloirock.ru/bar/baz');
	  }
	});
	QUnit.test('URL#search', assert => {
	  let url = new URL('http://zloirock.ru/');

	  // if(DESCRIPTORS) {
	  //   assert.ok(!hasOwnProperty.call(url, 'search'));
	  //   const descriptor = Object.getOwnPropertyDescriptor(URL.prototype, 'search');
	  //   assert.same(descriptor.enumerable, true);
	  //   // assert.same(descriptor.configurable, true);
	  //   assert.same(typeof descriptor.get, 'function');
	  //   assert.same(typeof descriptor.set, 'function');
	  // }

	  assert.same(url.search, '');
	  url = new URL('http://zloirock.ru/?foo=bar');
	  assert.same(url.search, '?foo=bar');
	  if (DESCRIPTORS) {
	    url = new URL('http://zloirock.ru/?');
	    // assert.same(url.search, '');
	    assert.same(url.href, 'http://zloirock.ru/?');
	    url.search = '?foo=bar';
	    assert.same(url.search, '?foo=bar');
	    assert.same(url.href, 'http://zloirock.ru/?foo=bar');
	    url.search = '?bar=baz';
	    assert.same(url.search, '?bar=baz');
	    assert.same(url.href, 'http://zloirock.ru/?bar=baz');
	    url.search = '';
	    assert.same(url.search, '');
	    assert.same(url.href, 'http://zloirock.ru/');
	  }
	});
	QUnit.test('URL#searchParams', assert => {
	  let url = new URL('http://zloirock.ru/?foo=bar&bar=baz');

	  // if(DESCRIPTORS) {
	  //   assert.ok(!hasOwnProperty.call(url, 'searchParams'));
	  //   const descriptor = Object.getOwnPropertyDescriptor(URL.prototype, 'searchParams');
	  //   assert.same(descriptor.enumerable, true);
	  //   // assert.same(descriptor.configurable, true);
	  //   assert.same(typeof descriptor.get, 'function');
	  // }

	  assert.ok(url.searchParams instanceof URLSearchParams);
	  assert.same(url.searchParams.get('foo'), 'bar');
	  assert.same(url.searchParams.get('bar'), 'baz');
	  if (DESCRIPTORS) {
	    url = new URL('http://zloirock.ru/');
	    url.searchParams.append('foo', 'bar');
	    assert.same(url.href, 'http://zloirock.ru/?foo=bar');
	    url = new URL('http://zloirock.ru/');
	    url.search = 'foo=bar';
	    assert.same(url.searchParams.get('foo'), 'bar');
	    url = new URL('http://zloirock.ru/?foo=bar&bar=baz');
	    url.search = '';
	    assert.same(url.searchParams.has('foo'), false);
	  }
	});
	QUnit.test('URL#hash', assert => {
	  let url = new URL('http://zloirock.ru/');

	  // if(DESCRIPTORS) {
	  //   assert.ok(!hasOwnProperty.call(url, 'hash'));
	  //   const descriptor = Object.getOwnPropertyDescriptor(URL.prototype, 'hash');
	  //   assert.same(descriptor.enumerable, true);
	  //   // assert.same(descriptor.configurable, true);
	  //   assert.same(typeof descriptor.get, 'function');
	  //   assert.same(typeof descriptor.set, 'function');
	  // }

	  assert.same(url.hash, '');
	  url = new URL('http://zloirock.ru/#foo');
	  assert.same(url.hash, '#foo');
	  url = new URL('http://zloirock.ru/#');
	  // assert.same(url.hash, '');
	  assert.same(url.href, 'http://zloirock.ru/#');
	  if (DESCRIPTORS) {
	    url = new URL('http://zloirock.ru/#');
	    url.hash = '#foo';
	    assert.same(url.hash, '#foo');
	    assert.same(url.href, 'http://zloirock.ru/#foo');
	    url.hash = '';
	    assert.same(url.hash, '');
	    assert.same(url.href, 'http://zloirock.ru/');
	    // url.hash = '#';
	    // assert.same(url.hash, '');
	    // assert.same(url.href, 'http://zloirock.ru/'); // 'http://zloirock.ru/#' in FF
	    url.hash = '#foo';
	    assert.same(url.hash, '#foo');
	    assert.same(url.href, 'http://zloirock.ru/#foo');
	    url.hash = '#foo#bar';
	    assert.same(url.hash, '#foo#bar');
	    assert.same(url.href, 'http://zloirock.ru/#foo#bar');

	    // url = new URL('http://zloirock.ru/');
	    // url.hash = 'абa';
	    // assert.same(url.hash, '#%D0%B0%D0%B1a');

	    // url = new URL('http://zloirock.ru/');
	    // url.hash = '\udc01\ud802a';
	    // assert.same(url.hash, '#%EF%BF%BD%EF%BF%BDa', 'unmatched surrogates');
	  }
	});
	QUnit.test('URL#toJSON', assert => {
	  const {
	    toJSON
	  } = URL.prototype;
	  assert.isFunction(toJSON);
	  assert.arity(toJSON, 0);
	  // assert.name(toJSON, 'toJSON');
	  assert.enumerable(URL.prototype, 'toJSON');
	  assert.looksNative(toJSON);
	  const url = new URL('http://zloirock.ru/');
	  assert.same(url.toJSON(), 'http://zloirock.ru/');
	  if (DESCRIPTORS) {
	    url.searchParams.append('foo', 'bar');
	    assert.same(url.toJSON(), 'http://zloirock.ru/?foo=bar');
	  }
	});

	// QUnit.test('URL#toString', assert => {
	//   const { toString } = URL.prototype;
	//   assert.isFunction(toString);
	//   assert.arity(toString, 0);
	//   // assert.name(toString, 'toString');
	//   // assert.enumerable(URL.prototype, 'toString');
	//   assert.looksNative(toString);

	//   const url = new URL('http://zloirock.ru/');
	//   assert.same(url.toString(), 'http://zloirock.ru/');

	//   if(DESCRIPTORS) {
	//     url.searchParams.append('foo', 'bar');
	//     assert.same(url.toString(), 'http://zloirock.ru/?foo=bar');
	//   }
	// });

	// QUnit.test('URL#@@toStringTag', assert => {
	//   const url = new URL('http://zloirock.ru/');
	//   assert.same(({}).toString.call(url), '[object URL]');
	// });

	QUnit.test('URL.sham', assert => {
	  assert.same(URL.sham, DESCRIPTORS ? undefined : true);
	});

	// /* Edge12+ Chrome32 Firefox27+ Safari7+ */
	// import "./es/es.promise";

	// /* Edge12+ Chrome19+ Firefox16+ Safari9+ */
	// import "./es/es.number.is-nan";
	// import "./es/es.number.is-finite";
	// /* Edge12+ Chrome34+ Firefox16+ Safari9+ */
	// import "./es/es.number.is-integer";
	// /* Edge12+ Chrome34+ Firefox25+ Safari9+ */
	// import "./es/es.number.epsilon";
	// import "./es/es.number.parse-float";
	// import "./es/es.number.parse-int";
	// /* Edge12+ Chrome34+ Firefox31+ Safari9+ */
	// import "./es/es.number.is-safe-integer";
	// /* Edge12+ Chrome34+ Firefox32+ Safari9+ */
	// import "./es/es.number.max-safe-integer";
	// import "./es/es.number.min-safe-integer";

	// /* Edge12+ Chrome34+ Firefox31+ Safari10+ */
	// /* import "./es.string.normalize";*/

	// /* IE11+ Chrome36 Firefox6+ Safari8+ */
	// import "./es/es.weak-map";
	// /* IE11+ Chrome36 Firefox34+ Safari9+ */
	// import "./es/es.weak-set";

	// /* IE11+ Chrome38 Firefox13+ Safari8+ */
	// import "./es/es.map";
	// /* IE11+ Chrome38 Firefox13+ Safari8+ */
	// import "./es/es.set";

	// /* Edge12+ Chrome38 Firefox17+ Safari9+ */
	// import "./es/es.string.iterator";
	// /* Edge12+ Chrome38 Firefox17+ Safari10+ */
	// import "./es/es.array.iterator";
	// /* Edge12+ Chrome38 Firefox36+ Safari9+ */
	// import "./es/es.symbol";

	// /* Edge12+ Chrome28 Firefox20+ Safari7+ */
	// import "./es/es.math.imul";
	// /* Edge12+ Chrome38 Firefox25+ Safari8+ */
	// import "./es/es.math.acosh";
	// import "./es/es.math.asinh";
	// import "./es/es.math.atanh";
	// import "./es/es.math.cbrt";
	// import "./es/es.math.cosh";
	// import "./es/es.math.expm1";
	// import "./es/es.math.log10";
	// import "./es/es.math.log1p";
	// import "./es/es.math.log2";
	// import "./es/es.math.sinh";
	// import "./es/es.math.tanh";
	// import "./es/es.math.trunc";
	// /* Edge12+ Chrome38 Firefox25+ Safari9+ */
	// import "./es/es.math.sign";
	// /* Edge12+ Chrome38 Firefox26+ Safari8+ */
	// import "./es/es.math.fround";
	// /* Edge12+ Chrome38 Firefox27+ Safari8+ */
	// import "./es/es.math.hypot";
	// /* Edge12+ Chrome38 Firefox31+ Safari7+ */
	// import "./es/es.math.clz32";

	// /* Edge15+ Chrome41 Firefox17+ Safari9+ */
	// import "./es/es.string.starts-with";
	// import "./es/es.string.ends-with";
	// /* Edge12+ Chrome41 Firefox24+ Safari9+ */
	// import "./es/es.string.repeat";
	// /* Edge12+ Chrome41 Firefox29+ Safari9+ */
	// import "./es/es.string.code-point-at";
	// import "./es/es.string.from-code-point";
	// /* Edge12+ Chrome41 Firefox34+ Safari9+ */
	// import "./es/es.string.raw";
	// /* Edge12+ Chrome41 Firefox40+ Safari9+ */
	// import "./es/es.string.includes";

	// /* Edge12+ Chrome45 Firefox25+ Safari7.1+ */
	// import "./es/es.array.find-index";
	// import "./es/es.array.find";
	// /* Edge12+ Chrome45 Firefox25+ Safari9+ */
	// import "./es/es.array.of";
	// /* Edge12+ Chrome45 Firefox31+ Safari8+ */
	// import "./es/es.array.fill";
	// /* Edge12+ Chrome45 Firefox32+ Safari9+ */
	// import "./es/es.array.from";
	// /* Edge12+ Chrome45 Firefox32+ Safari9+ */
	// import "./es/es.array.copy-within";

	// /* Edge12+ Chrome45 Firefox34+ Safari9+ */
	// import "./es/es.object.assign";

	// /* Edge12+ Chrome46 Firefox34+ Safari9.1+ */
	// import "./es/es.function.name";

	// /* ES2016 */
	// /* Chrome47 Firefox43+ Safari9+ Edge14+ */
	// import "./es/es.array.includes";
	// /* ES2017 */
	// /* Chrome54+ Firefox47+ Safari10.1+ Edge14+ */
	// import "./es/es.object.entries";
	// import "./es/es.object.values";
	// /* Chrome54+ Firefox50+ Safari10+ Edge15+ */
	// import "./es/es.object.get-own-property-descriptors";
	// /* Chrome57+ Firefox40+ Safari9+ Edge15+ */
	// import "./es/es.string.pad-start";
	// import "./es/es.string.pad-end";
	// /* Chrome61+ Firefox60+ Safari10.1+ Edge16+ */
	// /* ==================== module ==================== */
	// /* ES2018 */
	// /* Chrome63+ Firefox57+ Safari11.1+ */
	// import "./es/es.symbol.async-iterator";
	// /* Chrome63+ Firefox58+ Safari11.1+ Edge18+ */
	// import "./es/es.promise.finally";
	// /* ES2019 */
	// /* Chrome66+ Firefox61+ Safari12+ */
	// import "./es/es.string.trim-start";
	// import "./es/es.string.trim-end";
	// /* Chrome69+ Firefox62+ Safari12+*/
	// import "./es/es.array.flat";
	// import "./es/es.array.flat-map";
	// /* Chrome70+ Firefox63+ Safari12+*/
	// import "./es/es.symbol.description";
	// /* Chrome73+ Firefox63+ Safari12.1+ */
	// import "./es/es.object.from-entries";
	// /* ES2020 */
	// /* Chrome71+ Firefox65+ Safari12.1+*/
	// import "./es/es.global-this";
	// /* Chrome73+ Firefox67+ Safari13+*/
	// import "./es/es.string.match-all";
	// /* Chrome76+ Firefox71+ Safari13+*/
	// import "./es/es.promise.all-settled";
	// /* ES2021 */
	// /* Chrome84+ Firefox79+ Safari14.1+*/
	// /* WeakRef FinalizationRegistry */
	// /* Intl */
	// /* Chrome85+ Firefox77+ Safari13.1+*/
	// import "./es/es.string.replace-all";
	// /* Chrome85+ Firefox79+ Safari14+*/
	// import "./es/es.promise.any";
	// import "./es/es.aggregate-error";
	// /* ES2022 */
	// /* Chrome92+ Firefox90+ Safari15.4+*/
	// import "./es/es.array.at";
	// import "./es/es.string.at";
	// /* Chrome93+ Firefox92+ Safari15.4+*/
	// import "./es/es.object.has-own";
	// /* ES2023 */
	// /* Chrome97+ Firefox104+ Safari15.4+*/
	// import "./es/es.array.find-last-index";
	// import "./es/es.array.find-last";
	// /* Chrome98+ Firefox94+ Safari15.4+*/
	// import "./web/web.structured-clone";
	// /* Chrome110+ Firefox115+ Safari16+*/
	// import "./es/es.array.to-reversed";
	// import "./es/es.array.to-sorted";
	// import "./es/es.array.to-spliced";
	// import "./es/es.array.with";
	// /* ES2024 */
	// /* Chrome111+ Firefox119+ Safari16.4+ */
	// import "./es/es.string.is-well-formed";
	// import "./es/es.string.to-well-formed";
	// /* Chrome117+ Firefox119+ Safari17.4+ */
	// import "./es/es.object.group-by";
	// import "./es/es.map.group-by";
	// /* Chrome119+ Firefox121+ Safari17.4+ */
	// import "./es/es.promise.with-resolvers";
	// // /* Chrome126+ Firefox126+ Safari18+ */
	// // import "./web.url-parse";

})();
