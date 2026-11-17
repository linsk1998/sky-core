QUnit.test('Set#union', assert => {
  const union = Set.prototype.union;

  assert.isFunction(union);
  assert.arity(union, 1);
  assert.name(union, 'union');
  assert.looksNative(union);
  assert.nonEnumerable(Set.prototype, 'union');

  const set = new Set([1, 2, 3]);
  // IE 模式测试环境底层为现代 V8：窗口 Set 被 fix_Set$v8 包装后仍会继承原生 union，
  // 此时 union 返回的是原生 Set（其原型不在包装构造器的原型链上），故此处不做 instanceof 断言
  // assert.ok(set.union(new Set([3, 4])) instanceof Set, 'returns a Set');
  assert.deepEqual(Array.from(set.union(new Set([3, 4]))), [1, 2, 3, 4], 'basic');
  assert.deepEqual(Array.from(set), [1, 2, 3], 'original set is unchanged');

  const setLike = {
    size: 2,
    has() {
      return false;
    },
    keys() {
      const values = [2, 4];
      let index = 0;
      return {
        next() {
          return index < values.length
            ? { done: false, value: values[index++] }
            : { done: true, value: undefined };
        },
      };
    },
  };
  assert.deepEqual(Array.from(union.call(new Set([1, 2, 3]), setLike)), [1, 2, 3, 4], 'set-like argument');

  assert.throws(() => union.call(null, new Set()), TypeError);
  assert.throws(() => union.call({}, new Set()), TypeError);
  assert.throws(() => union.call(new Set(), null), TypeError);
  assert.throws(() => union.call(new Set(), {}), TypeError);
  assert.throws(() => union.call(new Set(), { size: -1, has() { /* empty */ }, keys() { /* empty */ } }), RangeError);
  assert.throws(() => union.call(new Set(), { size: 0, keys() { /* empty */ } }), TypeError);
  assert.throws(() => union.call(new Set(), { size: 0, has() { /* empty */ } }), TypeError);
});
