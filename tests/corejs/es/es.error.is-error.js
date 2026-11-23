// 移植自 core-js tests/unit-global/es.error.is-error.js（MIT）

// compat/modern/legacy 分层的 Error cause 修复会把 window.Error 换成普通函数，它 new 出来的实例连 constructor 都对不上全局
// 这些分层里的实例没有 [[ErrorData]]，isError 判 false 是正确的，所以这几条只在原生 Error 构造函数下断言
const isNativeErrorCtor = new Error('probe').constructor === Error;

QUnit.test('Error.isError', assert => {
  let engineError;
  try {
    null.foo;
  } catch(e) {
    engineError = e;
  }

  assert.isFunction(Error.isError);
  assert.arity(Error.isError, 1);
  assert.name(Error.isError, 'isError');
  assert.looksNative(Error.isError);
  // core-js 用 defineProperty 安装不可枚举静态方法，本仓库静态方法一律赋值安装（可枚举），同 Object.hasOwn
  // assert.nonEnumerable(Error, 'isError');

  assert.ok(Error.isError(engineError), 'caught error');
  assert.ok(Error.isError(new TypeError('error')), 'TypeError instance');
  if(isNativeErrorCtor) {
    assert.ok(Error.isError(new Error('error')), 'Error instance');
    // 分层里的 AggregateError / SuppressedError 由本库补上时，实例同样没有 [[ErrorData]]
    if(typeof AggregateError === 'function') {
      assert.ok(Error.isError(new AggregateError([1, 2, 3], 'error')), 'AggregateError instance');
    }
    if(typeof SuppressedError === 'function') {
      assert.ok(Error.isError(new SuppressedError(1, 2, 'error')), 'SuppressedError instance');
    }
  }
  // 规范要求 DOMException 带 [[ErrorData]]；老浏览器要么没有它，要么禁止构造（Chrome30 抛 Illegal constructor）
  try {
    assert.ok(Error.isError(new DOMException('error')), 'DOMException instance');
  } catch(e) { /* 跳过 */ }

  assert.ok(!Error.isError(), 'no arguments');
  assert.ok(!Error.isError(null), 'null');
  assert.ok(!Error.isError(undefined), 'undefined');
  assert.ok(!Error.isError(17), 'number');
  assert.ok(!Error.isError('Error'), 'string');
  assert.ok(!Error.isError(true), 'true');
  assert.ok(!Error.isError(false), 'false');
  assert.ok(!Error.isError({}), 'plain object');
  assert.ok(!Error.isError({ message: 'fake', name: 'FakeError' }), 'duck-typed object');
  assert.ok(!Error.isError(Object.create(Error.prototype)), 'Object.create(Error.prototype)');
  assert.ok(!Error.isError(Error.prototype), 'Error.prototype');
});
