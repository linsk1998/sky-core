QUnit.test('Date.now', assert => {
  const now = Date.now;
  assert.isFunction(now);
  assert.arity(now, 0);
  assert.name(now, 'now');
  assert.looksNative(now);
  assert.same(typeof now(), 'number', 'typeof');
});
