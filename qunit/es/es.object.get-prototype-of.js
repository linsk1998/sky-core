import { CORRECT_PROTOTYPE_GETTER } from '../helpers/constants';

QUnit.test('Object.getPrototypeOf', assert => {
  assert.isFunction(Object.getPrototypeOf);
  assert.arity(Object.getPrototypeOf, 1);
  assert.name(Object.getPrototypeOf, 'getPrototypeOf');
  assert.looksNative(Object.getPrototypeOf);
  assert.nonEnumerable(Object, 'getPrototypeOf');
  assert.ok(Object.getPrototypeOf({}) === Object.prototype);
  assert.ok(Object.getPrototypeOf([]) === Array.prototype);
  function F() { /* empty */ }
  assert.ok(Object.getPrototypeOf(new F()) === F.prototype);
  const object = { q: 1 };
  assert.ok(Object.getPrototypeOf(Object.create(object)) === object);
  assert.ok(Object.getPrototypeOf(Object.create(null)) === null);
  assert.ok(Object.getPrototypeOf(Object.getPrototypeOf({})) === null);
  function Foo() { /* empty */ }
  Foo.prototype.foo = 'foo';
  function Bar() { /* empty */ }
  Bar.prototype = Object.create(Foo.prototype);
  Bar.prototype.constructor = Bar;
  assert.strictEqual(Object.getPrototypeOf(Bar.prototype).foo, 'foo');
  const primitives = [42, 'foo', false];
  for(const value of primitives) {
    assert.notThrows(() => Object.getPrototypeOf(value), `accept ${typeof value} 不支持`);
  }
  assert.throws(() => Object.getPrototypeOf(null), TypeError, 'throws on null');
  assert.throws(() => Object.getPrototypeOf(undefined), TypeError, 'throws on undefined');
  assert.strictEqual(Object.getPrototypeOf(Object('foo')), String.prototype);
});

QUnit.test('Object.getPrototypeOf.sham flag', assert => {
  assert.same(Object.getPrototypeOf.sham, CORRECT_PROTOTYPE_GETTER ? undefined : true);
});
