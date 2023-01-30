QUnit.test('Object.entries', assert => {
  assert.isFunction(Object.entries);
  assert.arity(Object.entries, 1);
  assert.name(Object.entries, 'entries');
  assert.deepEqual(Object.entries({ q: 1, w: 2, e: 3 }), [['q', 1], ['w', 2], ['e', 3]]);
  assert.deepEqual(Object.entries(new String('qwe')), [['0', 'q'], ['1', 'w'], ['2', 'e']]);
  assert.deepEqual(Object.entries(Object.assign(Object.create({ q: 1, w: 2, e: 3 }), { a: 4, s: 5, d: 6 })), [['a', 4], ['s', 5], ['d', 6]]);
  assert.deepEqual(Object.entries({ valueOf: 42 }), [['valueOf', 42]], 'IE enum keys bug');
  try {
    assert.deepEqual(Function('entries', `
      return entries({
        a: 1,
        get b() {
          delete this.c;
          return 2;
        },
        c: 3
      });
    `)(Object.entries), [['a', 1], ['b', 2]]);
  } catch { /* empty */ }
  try {
    assert.deepEqual(Function('entries', `
      return entries({
        a: 1,
        get b() {
          Object.defineProperty(this, "c", {
            value: 4,
            enumerable: false
          });
          return 2;
        },
        c: 3
      });
    `)(Object.entries), [['a', 1], ['b', 2]]);
  } catch { /* empty */ }
});
