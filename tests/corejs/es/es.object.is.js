QUnit.test('Object.is', assert => {
  assert.isFunction(Object.is);
  assert.arity(Object.is, 2);
  assert.name(Object.is, 'is');
  assert.looksNative(Object.is);
  // assert.nonEnumerable(Object, 'is');
  assert.ok(Object.is(1, 1), '1 is 1');
  assert.ok(Object.is(NaN, NaN), '1 is 1');
  assert.ok(!Object.is(0, -0), '0 isnt -0');
  assert.ok(!Object.is({}, {}), '{} isnt {}');
});
