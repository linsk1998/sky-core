
QUnit.test('AbortSignal', function(assert) {
	var signal = new AbortController().signal;
	assert.ok(signal instanceof AbortSignal, '应该是AbortSignal的实例');
	assert.equal(signal.aborted, false, '初始时不应被中止');
	assert.equal(signal.reason, undefined, '初始时reason应为undefined');
	assert.equal(signal.onabort, null, 'onabort初始应为null');
});

QUnit.test('AbortSignal#aborted', function(assert) {
	assert.ok(typeof AbortSignal.abort === 'function', 'AbortSignal.abort 静态方法未实现');

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

QUnit.test('AbortSignal#any', function(assert) {
	assert.ok(typeof AbortSignal.any === 'function', 'AbortSignal.any 静态方法未实现');

	var ac1 = new AbortController();
	var ac2 = new AbortController();
	var ac3 = new AbortController();

	var signal1 = ac1.signal;
	var signal2 = ac2.signal;
	var signal3 = ac3.signal;

	var compositeSignal = AbortSignal.any([signal1, signal2, signal3]);

	assert.ok(compositeSignal instanceof AbortSignal, '应返回AbortSignal实例');
	assert.equal(compositeSignal.aborted, false, '初始不应中止');

	// 其中一个信号中止
	ac2.abort('Signal 2 aborted');

	assert.equal(compositeSignal.aborted, true, '任一信号中止后应中止');
	assert.equal(compositeSignal.reason, 'Signal 2 aborted', '应传递中止原因');

	var compositeSignal2 = AbortSignal.any([signal1, signal2, signal3]);
	assert.equal(compositeSignal2.aborted, true, '初始不应中止');

	var listeners = signal1.listeners;
	if(listeners) {
		assert.deepEqual(listeners.abort, [], '清除监听');
	}
	listeners = signal2.listeners;
	if(listeners) {
		assert.deepEqual(listeners.abort, [], '清除监听');
	}
});

QUnit.test('AbortSignal#throwIfAborted', function(assert) {
	var ac = new AbortController();
	var signal = ac.signal;
	assert.ok(typeof signal.throwIfAborted === 'function', 'AbortSignal.throwIfAborted 方法未实现');
	signal.throwIfAborted();
	ac.abort();
	assert.throws(function() {
		signal.throwIfAborted();
	});
});

QUnit.asyncTest('AbortSignal#timeout', function(assert) {
	expect(3);
	assert.ok(typeof AbortSignal.timeout === 'function', 'AbortSignal.timeout 静态方法未实现');
	var signal = AbortSignal.timeout(100);
	assert.equal(signal.aborted, false, '立即检查时不应被中止');

	setTimeout(function() {
		assert.equal(signal.aborted, true, '100ms后应被中止');
		start();
	}, 150);
});
