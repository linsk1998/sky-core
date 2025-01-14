import { DESCRIPTORS } from '../helpers/constants';

QUnit.test('Object.create', assert => {
  function getPropertyNames(object) {
    let result = [];
    do {
      result = result.concat(Object.getOwnPropertyNames(object));
    } while(object = Object.getPrototypeOf(object));
    return result;
  }
  assert.isFunction(Object.create);
  assert.arity(Object.create, 2);
  assert.name(Object.create, 'create');
  let object = { q: 1 };
  assert.ok({}.isPrototypeOf.call(object, Object.create(object)));
  assert.ok(Object.create(object).q === 1);
  function F() {
    return this.a = 1;
  }
  assert.ok(Object.create(new F()) instanceof F, "Object.create(new F())");
  assert.ok(F.prototype === Object.getPrototypeOf(Object.getPrototypeOf(Object.create(new F()))));
  assert.ok(Object.create(new F()).a === 1);
  assert.ok(Object.create({}, { a: { value: 42 } }).a === 42);
  object = Object.create(null, { w: { value: 2 } });
  assert.same(object, Object(object));
  assert.ok(!('toString' in object), "toString");
  assert.ok(object.w === 2);
  assert.throws(() => String(object), "throws String({__proto__:null})");
  assert.deepEqual(getPropertyNames(Object.create(null)), []);
});

QUnit.test('Object.create.sham flag', assert => {
  assert.same(Object.create.sham, DESCRIPTORS ? undefined : true);
});
