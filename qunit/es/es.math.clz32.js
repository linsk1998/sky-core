QUnit.test('Math.clz32', assert => {
  assert.isFunction(Math.clz32);
  assert.name(Math.clz32, 'clz32');
  assert.arity(Math.clz32, 1);
  assert.looksNative(Math.clz32);
  assert.nonEnumerable(Math, 'clz32');
  assert.strictEqual(Math.clz32(0), 32);
  assert.strictEqual(Math.clz32(1), 31);
  assert.same(Math.clz32(-1), 0);
  assert.strictEqual(Math.clz32(0.6), 32);
  assert.same(Math.clz32(2 ** 32 - 1), 0);
  assert.strictEqual(Math.clz32(2 ** 32), 32);
});
