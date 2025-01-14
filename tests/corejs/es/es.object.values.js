QUnit.test('Object.values', assert => {
  assert.isFunction(Object.values);
  assert.arity(Object.values, 1);
  assert.name(Object.values, 'values');
  assert.looksNative(Object.values);
  // assert.nonEnumerable(Object, 'values');
  assert.deepEqual(Object.values({ q: 1, w: 2, e: 3 }), [1, 2, 3]);
  assert.deepEqual(Object.values(new String('qwe')), ['q', 'w', 'e']);
  assert.deepEqual(Object.values(Object.assign(Object.create({ q: 1, w: 2, e: 3 }), { a: 4, s: 5, d: 6 })), [4, 5, 6]);
  assert.deepEqual(Object.values({ valueOf: 42 }), [42], 'IE enum keys bug');
  // try {
  //   assert.deepEqual(Function('values', `
  //     return values({ a: 1, get b() {
  //       delete this.c;
  //       return 2;
  //     }, c: 3 });
  //   `)(Object.values), [1, 2]);
  // } catch { /* empty */ }
  // try {
  //   assert.deepEqual(Function('values', `
  //     return values({ a: 1, get b() {
  //       Object.defineProperty(this, "c", {
  //         value: 4,
  //         enumerable: false
  //       });
  //       return 2;
  //     }, c: 3 });
  //   `)(Object.values), [1, 2]);
  // } catch { /* empty */ }
});
