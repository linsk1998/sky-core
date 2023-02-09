QUnit.test('Math.log1p', assert => {
  assert.isFunction(Math.log1p);
  assert.name(Math.log1p, 'log1p');
  assert.arity(Math.log1p, 1);
  assert.looksNative(Math.log1p);
  assert.nonEnumerable(Math, 'log1p');
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
