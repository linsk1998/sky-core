import { DESCRIPTORS } from '../helpers/constants';

QUnit.test('Object.assign', assert => {
  assert.isFunction(Object.assign);
  assert.arity(Object.assign, 2);
  assert.name(Object.assign, 'assign');
  assert.looksNative(Object.assign);
  // assert.nonEnumerable(Object, 'assign');
  let object = { q: 1 };
  assert.strictEqual(object, Object.assign(object, { bar: 2 }), 'assign return target');
  assert.strictEqual(object.bar, 2, 'assign define properties');
  assert.deepEqual(Object.assign({}, { q: 1 }, { w: 2 }), { q: 1, w: 2 });
  assert.deepEqual(Object.assign({}, 'qwe'), { 0: 'q', 1: 'w', 2: 'e' });
  assert.throws(() => Object.assign(null, { q: 1 }), TypeError);
  assert.throws(() => Object.assign(undefined, { q: 1 }), TypeError);
  let string = Object.assign('qwe', { q: 1 });
  assert.strictEqual(typeof string, 'object');
  assert.strictEqual(String(string), 'qwe');
  assert.strictEqual(string.q, 1);
  assert.same(Object.assign({}, { valueOf: 42 }).valueOf, 42, 'IE enum keys bug');
  if(DESCRIPTORS) {
    object = { baz: 1 };
    Object.assign(object, Object.defineProperty({}, 'bar', {
      get() {
        return this.baz + 1;
      },
    }));
    assert.ok(object.bar === undefined, "assign don't copy descriptors");
    object = { a: 'a' };
    const c = Symbol('c');
    const d = Symbol('d');
    object[c] = 'c';
    Object.defineProperty(object, 'b', { value: 'b' });
    Object.defineProperty(object, d, { value: 'd' });
    const object2 = Object.assign({}, object);
    assert.strictEqual(object2.a, 'a', 'a');
    assert.strictEqual(object2.b, undefined, 'b');
    assert.strictEqual(object2[c], 'c', 'c');
    // assert.strictEqual(object2[d], undefined, 'defineProperty 不允许使用Symbol');
    // try {
    //   assert.strictEqual(Function('assign', `
    //     return assign({ b: 1 }, { get a() {
    //       delete this.b;
    //     }, b: 2 });
    //   `)(Object.assign).b, 1);
    // } catch { /* empty */ }
    // try {
    //   assert.strictEqual(Function('assign', `
    //     return assign({ b: 1 }, { get a() {
    //       Object.defineProperty(this, "b", {
    //         value: 3,
    //         enumerable: false
    //       });
    //     }, b: 2 });
    //   `)(Object.assign).b, 1);
    // } catch { /* empty */ }
  }
  // 不保证对象遍历的顺序
  // string = 'abcdefghijklmnopqrst';
  // const result = {};
  // for(let i = 0, { length } = string; i < length; ++i) {
  //   const char = string.charAt(i);
  //   result[char] = char;
  // }
  // assert.strictEqual(Object.keys(Object.assign({}, result)).join(''), string);
});

