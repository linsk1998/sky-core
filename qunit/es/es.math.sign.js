QUnit.test('Math.sign', assert => {
  assert.isFunction(Math.sign);
  assert.name(Math.sign, 'sign');
  assert.arity(Math.sign, 1);
  assert.looksNative(Math.sign);
  assert.nonEnumerable(Math, 'sign');
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
