// 移植自 MDN Error.isError 示例
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/isError

// compat/modern/legacy 分层的 Error cause 修复会把 window.Error 换成普通函数，它 new 出来的实例连 constructor 都对不上全局
// 这些分层里的实例没有 [[ErrorData]]，isError 判 false 是正确的，所以这条只在原生 Error 构造函数下断言
const isNativeErrorCtor = new Error('probe').constructor === Error;

QUnit.test('Error.isError (MDN)', assert => {
	// Using Error.isError()
	if(isNativeErrorCtor) {
		assert.ok(Error.isError(new Error()), 'new Error()');
	}
	assert.ok(Error.isError(new TypeError()), 'new TypeError()');
	// 老浏览器要么没有 DOMException，要么禁止构造（Chrome30 抛 Illegal constructor）
	try {
		assert.ok(Error.isError(new DOMException()), 'new DOMException()');
	} catch(e) { /* 跳过 */ }
	try {
		// MDN 原文用 `1 + 1n` 触发 TypeError，BigInt 字面量在低版本浏览器是语法错误，这里改用等价的空引用
		null.foo;
	} catch(e) {
		assert.ok(Error.isError(e), 'caught TypeError');
	}

	assert.ok(!Error.isError(), 'Error.isError()');
	assert.ok(!Error.isError({}), 'Error.isError({})');
	assert.ok(!Error.isError(null), 'Error.isError(null)');
	assert.ok(!Error.isError(undefined), 'Error.isError(undefined)');
	assert.ok(!Error.isError(17), 'Error.isError(17)');
	assert.ok(!Error.isError('Error'), "Error.isError('Error')");
	assert.ok(!Error.isError(true), 'Error.isError(true)');
	assert.ok(!Error.isError(false), 'Error.isError(false)');
	// 只把 Error.prototype 挂到原型链上，没有 Error 构造函数写入的品牌字段
	assert.ok(!Error.isError(Object.create(Error.prototype)), 'Error.isError({ __proto__: Error.prototype })');
});

QUnit.test('Error.isError cross-realm (MDN)', assert => {
	// instanceof 跨 realm 会失效，isError 依赖品牌字段仍然正确
	let iframe;
	try {
		iframe = document.createElement('iframe');
		document.body.appendChild(iframe);
	} catch(e) { /* 没有 document，或禁止创建 iframe */ }
	if(!iframe || !iframe.contentWindow || !iframe.contentWindow.Error) {
		assert.ok(true, 'cross-realm is not available in this environment');
		return;
	}
	const error = new iframe.contentWindow.Error('cross-realm');
	// iframe 里是干净的 realm，我们的 polyfill 只装在父窗口，这里用父窗口的 isError 判它的实例
	assert.ok(Error.isError(error), 'error from another realm');
	// IE10- 的空白 iframe 会复用父窗口的原型，此时两个 realm 其实是同一个
	if(iframe.contentWindow.Error !== Error) {
		assert.ok(!(error instanceof Error), 'instanceof fails cross-realm');
	}
	document.body.removeChild(iframe);
});
