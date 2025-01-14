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
