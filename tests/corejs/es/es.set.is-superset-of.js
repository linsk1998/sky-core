// 移植自 core-js tests/unit-global/es.set.is-superset-of.js（MIT）
import { createIterable, createSetLike } from '../helpers/helpers.js';

QUnit.test('Set#isSupersetOf', assert => {
  // core-js 原文为 `const { isSupersetOf } = Set.prototype;`，这里改为成员表达式以配合 impl-inject 的裸名注入
  const isSupersetOf = Set.prototype.isSupersetOf;

  assert.isFunction(isSupersetOf);
  assert.arity(isSupersetOf, 1);
  assert.name(isSupersetOf, 'isSupersetOf');
  assert.looksNative(isSupersetOf);
  assert.nonEnumerable(Set.prototype, 'isSupersetOf');

  assert.ok(new Set([1, 2, 3]).isSupersetOf(new Set([1])));
  assert.ok(!new Set([2, 3, 4]).isSupersetOf(new Set([1])));
  assert.ok(new Set([5, 4, 3, 2, 1]).isSupersetOf(new Set([1, 2, 3])));
  assert.ok(!new Set([5, 4, 3, 2]).isSupersetOf(new Set([1, 2, 3])));
  assert.ok(new Set([1, 2, 3]).isSupersetOf(createSetLike([1])));
  assert.ok(!new Set([2, 3, 4]).isSupersetOf(createSetLike([1])));
  assert.ok(new Set([5, 4, 3, 2, 1]).isSupersetOf(createSetLike([1, 2, 3])));
  assert.ok(!new Set([5, 4, 3, 2]).isSupersetOf(createSetLike([1, 2, 3])));

  // core-js@4 将移除对数组 / 可迭代参数的支持；本实现按 ES2025 只接受 set-like 参数，故注释保留
  // assert.ok(new Set([1, 2, 3]).isSupersetOf([1]));
  // assert.ok(!new Set([2, 3, 4]).isSupersetOf([1]));
  // assert.ok(new Set([5, 4, 3, 2, 1]).isSupersetOf([1, 2, 3]));
  // assert.ok(!new Set([5, 4, 3, 2]).isSupersetOf([1, 2, 3]));
  // assert.ok(new Set([1, 2, 3]).isSupersetOf(createIterable([1])));
  // assert.ok(!new Set([2, 3, 4]).isSupersetOf(createIterable([1])));

  assert.ok(!new Set([42, 43]).isSupersetOf({
    size: Infinity,
    has() {
      return true;
    },
    keys() {
      throw new Error('Unexpected call to |keys| method');
    },
  }));

  assert.throws(() => new Set().isSupersetOf({
    size: -Infinity,
    has() {
      return true;
    },
    keys() {
      throw new Error('Unexpected call to |keys| method');
    },
  }));

  let closed = false;
  assert.ok(!new Set([1, 2, 3, 4]).isSupersetOf({
    size: 3,
    has() {
      return true;
    },
    keys() {
      let index = 0;
      return {
        next() {
          return {
            value: [1, 5, 3][index++],
            done: index > 3
          };
        },
        return() {
          closed = true;
          return {
            done: true
          };
        },
      };
    },
  }));
  assert.ok(closed, 'iterator is closed on early exit');

  assert.throws(() => new Set([1, 2, 3]).isSupersetOf(), TypeError);
  assert.throws(() => isSupersetOf.call({}, [1, 2, 3]), TypeError);
  assert.throws(() => isSupersetOf.call(undefined, [1, 2, 3]), TypeError);
  assert.throws(() => isSupersetOf.call(null, [1, 2, 3]), TypeError);
});
