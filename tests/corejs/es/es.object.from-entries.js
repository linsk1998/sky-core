import { createIterable } from '../helpers/helpers';

QUnit.test('Object.fromEntries', assert => {
  assert.isFunction(Object.fromEntries);
  assert.arity(Object.fromEntries, 1);
  assert.name(Object.fromEntries, 'fromEntries');
  assert.looksNative(Object.fromEntries);
  // assert.nonEnumerable(Object, 'fromEntries');

  assert.ok(Object.fromEntries([]) instanceof Object);
  assert.same(Object.fromEntries([['foo', 1]]).foo, 1);
  assert.same(Object.fromEntries(createIterable([['bar', 2]])).bar, 2);

  class Unit {
    constructor(id) {
      this.id = id;
    }
    toString() {
      return `unit${this.id}`;
    }
  }
  const units = new Set([new Unit(101), new Unit(102), new Unit(103)]);
  const object = Object.fromEntries(units.entries());
  assert.same(object.unit101.id, 101);
  assert.same(object.unit102.id, 102);
  assert.same(object.unit103.id, 103);
});
