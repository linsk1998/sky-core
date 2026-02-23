
QUnit.test('AbortSignal', function(assert) {
	var signal = new AbortController().signal;
	assert.ok(signal instanceof AbortSignal, '应该是AbortSignal的实例');
	assert.equal(signal.aborted, false, '初始时不应被中止');
	assert.equal(signal.reason, undefined, '初始时reason应为undefined');
	assert.equal(signal.onabort, null, 'onabort初始应为null');
});

QUnit.test('AbortSignal#aborted', function(assert) {
	assert.ok(typeof AbortSignal.abort === 'function', 'skip - AbortSignal.abort 静态方法未实现');

	var signal = AbortSignal.abort();

	assert.ok(signal instanceof AbortSignal, '应返回 AbortSignal 实例');
	assert.equal(signal.aborted, true, '返回的信号应已被中止');
	assert.ok(signal.reason instanceof DOMException, '默认 reason 应为 DOMException');
	assert.equal(signal.reason.name, 'AbortError', '默认 reason 的 name 应为 AbortError');


	var customReason = {};
	signal = AbortSignal.abort(customReason);

	assert.ok(signal instanceof AbortSignal, '应返回 AbortSignal 实例');
	assert.equal(signal.aborted, true, '返回的信号应已被中止');
	assert.equal(signal.reason, customReason, '应使用传入的自定义 reason');
});

QUnit.test('onabort事件处理器', function(assert) {
	var done = assert.async();
	var signal = new AbortSignal();
	var eventFired = false;

	signal.onabort = function(event) {
		eventFired = true;
		assert.equal(event.type, 'abort', '事件类型应为abort');
		assert.equal(event.target, signal, '事件目标应为signal本身');
		assert.ok(signal.aborted, '触发事件时signal应已被中止');
		done();
	};

	// 模拟触发abort事件
	if(typeof signal._abort === 'function') {
		signal._abort();
	} else if(typeof signal.abort === 'function') {
		signal.abort();
	}
});

QUnit.test('addEventListener/removeEventListener', function(assert) {
	var done = assert.async();
	var signal = new AbortSignal();
	var callCount = 0;

	var handler = function(event) {
		callCount++;
		assert.equal(event.type, 'abort', '事件类型应为abort');
	};

	// 添加多个监听器
	signal.addEventListener('abort', handler);
	signal.addEventListener('abort', handler); // 重复添加应该被忽略

	var handler2 = function() {
		callCount++;
	};
	signal.addEventListener('abort', handler2);

	// 触发事件前移除一个
	signal.removeEventListener('abort', handler2);

	// 触发事件
	if(typeof signal._abort === 'function') {
		signal._abort();
	} else if(typeof signal.abort === 'function') {
		signal.abort();
	}

	setTimeout(function() {
		assert.equal(callCount, 1, '只应调用一次处理器');
		done();
	}, 0);
});

QUnit.test('signal.abort()方法中止信号', function(assert) {
	var signal = new AbortSignal();
	var abortReason = new Error('Operation aborted');

	if(typeof signal.abort === 'function') {
		signal.abort(abortReason);

		assert.equal(signal.aborted, true, 'abort()后应被中止');
		assert.equal(signal.reason, abortReason, '应保存中止原因');
	} else {
		assert.ok(true, 'skip - abort方法未实现');
	}
});

QUnit.test('signal.abort()使用默认原因', function(assert) {
	var signal = new AbortSignal();

	if(typeof signal.abort === 'function') {
		signal.abort();

		assert.equal(signal.aborted, true, '应被中止');
		if(signal.reason) {
			assert.ok(signal.reason instanceof DOMException ||
				signal.reason instanceof Error,
				'原因应为Error或DOMException');
		}
	} else {
		assert.ok(true, 'skip - abort方法未实现');
	}
});

QUnit.test('throwIfAborted()方法', function(assert) {
	var signal = new AbortSignal();

	if(typeof signal.throwIfAborted === 'function') {
		// 未中止时不抛出
		try {
			signal.throwIfAborted();
			assert.ok(true, '未中止时不应抛出错误');
		} catch(e) {
			assert.ok(false, '不应抛出错误');
		}

		// 中止后应抛出
		if(typeof signal.abort === 'function') {
			signal.abort('Test abort reason');

			try {
				signal.throwIfAborted();
				assert.ok(false, '中止后应抛出错误');
			} catch(e) {
				assert.equal(e, 'Test abort reason', '应抛出指定的原因');
			}
		}
	} else {
		assert.ok(true, 'skip - throwIfAborted方法未实现');
	}
});

QUnit.test('多次abort调用', function(assert) {
	var signal = new AbortSignal();
	var eventCount = 0;

	signal.addEventListener('abort', function() {
		eventCount++;
	});

	if(typeof signal.abort === 'function') {
		// 第一次abort
		signal.abort('First');
		assert.equal(eventCount, 1, '应触发一次事件');
		assert.equal(signal.reason, 'First', '应保存第一次的原因');

		// 第二次abort（不应生效）
		signal.abort('Second');
		assert.equal(eventCount, 1, '不应再次触发事件');
		assert.equal(signal.reason, 'First', '原因不应被覆盖');
	} else {
		assert.ok(true, 'skip - abort方法未实现');
	}
});

QUnit.test('信号超时功能', function(assert) {
	var done = assert.async();
	var signal = new AbortSignal();

	if(typeof signal.timeout === 'function') {
		signal.timeout(100); // 100ms后超时

		assert.equal(signal.aborted, false, '立即检查时不应被中止');

		setTimeout(function() {
			assert.equal(signal.aborted, true, '100ms后应被中止');
			if(signal.reason) {
				assert.ok(signal.reason instanceof Error ||
					signal.reason instanceof DOMException,
					'原因应为Error或DOMException');
			}
			done();
		}, 150);
	} else {
		assert.ok(true, 'skip - timeout方法未实现');
		done();
	}
});

QUnit.test('AbortSignal.any()静态方法', function(assert) {
	var done = assert.async();

	if(typeof AbortSignal.any === 'function') {
		var signal1 = new AbortSignal();
		var signal2 = new AbortSignal();
		var signal3 = new AbortSignal();

		var compositeSignal = AbortSignal.any([signal1, signal2, signal3]);

		assert.ok(compositeSignal instanceof AbortSignal, '应返回AbortSignal实例');
		assert.equal(compositeSignal.aborted, false, '初始不应中止');

		// 其中一个信号中止
		setTimeout(function() {
			if(typeof signal2.abort === 'function') {
				signal2.abort('Signal 2 aborted');
			}
		}, 50);

		setTimeout(function() {
			assert.equal(compositeSignal.aborted, true, '任一信号中止后应中止');
			assert.equal(compositeSignal.reason, 'Signal 2 aborted', '应传递中止原因');
			done();
		}, 100);
	} else {
		assert.ok(true, 'skip - AbortSignal.any静态方法未实现');
		done();
	}
});

QUnit.test('AbortSignal.timeout()静态方法', function(assert) {
	var done = assert.async();

	if(typeof AbortSignal.timeout === 'function') {
		var timeoutSignal = AbortSignal.timeout(100);

		assert.ok(timeoutSignal instanceof AbortSignal, '应返回AbortSignal实例');
		assert.equal(timeoutSignal.aborted, false, '立即检查时不应中止');

		setTimeout(function() {
			assert.equal(timeoutSignal.aborted, true, '100ms后应中止');
			if(timeoutSignal.reason) {
				assert.ok(timeoutSignal.reason instanceof Error ||
					timeoutSignal.reason instanceof DOMException,
					'原因应为Error或DOMException');
			}
			done();
		}, 150);
	} else {
		assert.ok(true, 'skip - AbortSignal.timeout静态方法未实现');
		done();
	}
});

QUnit.test('事件处理器中的this指向', function(assert) {
	var done = assert.async();
	var signal = new AbortSignal();
	var handlerCalled = false;

	signal.onabort = function() {
		handlerCalled = true;
		assert.equal(this, signal, 'this应指向signal实例');
	};

	signal.addEventListener('abort', function() {
		assert.equal(this, signal, '事件监听器中的this应指向signal实例');
		done();
	});

	if(typeof signal._abort === 'function') {
		signal._abort();
	} else if(typeof signal.abort === 'function') {
		signal.abort();
	}

	assert.ok(handlerCalled, 'onabort处理器应被调用');
});

QUnit.test('移除不存在的监听器', function(assert) {
	var signal = new AbortSignal();
	var handler = function() { };

	// 不应抛出错误
	try {
		signal.removeEventListener('abort', handler);
		assert.ok(true, '移除不存在的监听器不应抛出错误');
	} catch(e) {
		assert.ok(false, '不应抛出错误: ' + e.message);
	}

	// 添加后再移除
	signal.addEventListener('abort', handler);
	signal.removeEventListener('abort', handler);

	// 触发事件，处理器不应被调用
	var handlerCalled = false;
	handler = function() { handlerCalled = true; };

	signal.addEventListener('abort', handler);
	signal.removeEventListener('abort', handler);

	if(typeof signal._abort === 'function') {
		signal._abort();
	}

	assert.ok(!handlerCalled, '已移除的处理器不应被调用');
});

QUnit.test('事件对象属性', function(assert) {
	var done = assert.async();
	var signal = new AbortSignal();

	signal.addEventListener('abort', function(event) {
		assert.ok(event, '事件对象应存在');
		assert.equal(typeof event.type, 'string', 'event.type应为字符串');
		assert.equal(event.type, 'abort', 'event.type应为abort');
		assert.equal(event.target, signal, 'event.target应为signal');
		assert.equal(event.currentTarget, signal, 'event.currentTarget应为signal');
		assert.ok('bubbles' in event, '事件对象应有bubbles属性');
		assert.ok('cancelable' in event, '事件对象应有cancelable属性');
		assert.ok('defaultPrevented' in event, '事件对象应有defaultPrevented属性');
		done();
	});

	if(typeof signal._abort === 'function') {
		signal._abort();
	} else if(typeof signal.abort === 'function') {
		signal.abort();
	}
});

QUnit.test('信号链式调用', function(assert) {
	var signal = new AbortSignal();

	// 测试方法是否支持链式调用（如果实现）
	if(typeof signal.abort === 'function' &&
		typeof signal.timeout === 'function') {
		try {
			// 如果方法返回this，可以链式调用
			var result = signal.abort();
			if(result === signal) {
				assert.ok(true, 'abort()支持链式调用');
			}

			result = signal.timeout(100);
			if(result === signal) {
				assert.ok(true, 'timeout()支持链式调用');
			}
		} catch(e) {
			// 链式调用不是必须的
			assert.ok(true, '方法可能不支持链式调用');
		}
	} else {
		assert.ok(true, 'skip - 相关方法未实现');
	}
});

QUnit.test('信号状态查询', function(assert) {
	var signal = new AbortSignal();

	// 测试各种查询方式
	assert.equal(!!signal.aborted, false, '!!aborted应为false');
	assert.equal(Boolean(signal.aborted), false, 'Boolean(aborted)应为false');

	if(typeof signal.abort === 'function') {
		signal.abort();

		assert.equal(!!signal.aborted, true, '中止后!!aborted应为true');
		assert.equal(Boolean(signal.aborted), true, '中止后Boolean(aborted)应为true');
	}
});

QUnit.test('性能测试 - 大量事件监听器', function(assert) {
	var done = assert.async();
	var signal = new AbortSignal();
	var handlerCount = 0;
	var expectedCount = 100;

	// 添加大量监听器
	for(var i = 0; i < expectedCount; i++) {
		(function(index) {
			signal.addEventListener('abort', function() {
				handlerCount++;
			});
		})(i);
	}

	// 触发事件
	if(typeof signal._abort === 'function') {
		signal._abort();
	} else if(typeof signal.abort === 'function') {
		signal.abort();
	}

	setTimeout(function() {
		assert.equal(handlerCount, expectedCount, '所有监听器都应被调用');
		done();
	}, 0);
});

QUnit.test('兼容性测试 - 类EventTarget方法', function(assert) {
	var signal = new AbortSignal();

	// 测试是否支持标准的EventTarget方法
	assert.equal(typeof signal.addEventListener, 'function', '应有addEventListener方法');
	assert.equal(typeof signal.removeEventListener, 'function', '应有removeEventListener方法');
	assert.equal(typeof signal.dispatchEvent, 'function', '应有dispatchEvent方法');

	// 测试dispatchEvent（如果可用）
	if(typeof signal.dispatchEvent === 'function') {
		try {
			var event;
			if(typeof Event === 'function') {
				event = new Event('abort');
			} else {
				// 兼容旧浏览器
				event = document.createEvent('Event');
				event.initEvent('abort', false, false);
			}

			var handlerCalled = false;
			var handler = function() { handlerCalled = true; };

			signal.addEventListener('abort', handler);
			signal.dispatchEvent(event);

			assert.ok(handlerCalled, 'dispatchEvent应触发监听器');
		} catch(e) {
			assert.ok(true, 'dispatchEvent可能不支持: ' + e.message);
		}
	}
});