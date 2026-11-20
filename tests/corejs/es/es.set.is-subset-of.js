// 移植自 core-js tests/unit-global/es.set.is-subset-of.js（MIT）
import { createIterable, createSetLike } from '../helpers/helpers.js';

QUnit.test('Set#isSubsetOf', assert => {
  // core-js 原文为 `const { isSubsetOf } = Set.prototype;`，这里改为成员表达式以配合 impl-inject 的裸名注入
  const isSubsetOf = Set.prototype.isSubsetOf;

  assert.isFunction(isSubsetOf);
  assert.arity(isSubsetOf, 1);
  assert.name(isSubsetOf, 'isSubsetOf');
  assert.looksNative(isSubsetOf);
  assert.nonEnumerable(Set.prototype, 'isSubsetOf');

  assert.ok(new Set([1]).isSubsetOf(new Set([1, 2, 3])));
  assert.ok(!new Set([1]).isSubsetOf(new Set([2, 3, 4])));
  assert.ok(new Set([1, 2, 3]).isSubsetOf(new Set([5, 4, 3, 2, 1])));
  assert.ok(!new Set([1, 2, 3]).isSubsetOf(new Set([5, 4, 3, 2])));
  assert.ok(new Set([1]).isSubsetOf(createSetLike([1, 2, 3])));
  assert.ok(!new Set([1]).isSubsetOf(createSetLike([2, 3, 4])));
  assert.ok(new Set([1, 2, 3]).isSubsetOf(createSetLike([5, 4, 3, 2, 1])));
  assert.ok(!new Set([1, 2, 3]).isSubsetOf(createSetLike([5, 4, 3, 2])));

  // core-js@4 将移除对数组 / 可迭代参数的支持；本实现按 ES2025 只接受 set-like 参数，故注释保留
  // assert.ok(new Set([1]).isSubsetOf([1, 2, 3]));
  // assert.ok(!new Set([1]).isSubsetOf([2, 3, 4]));
  // assert.ok(new Set([1, 2, 3]).isSubsetOf([5, 4, 3, 2, 1]));
  // assert.ok(!new Set([1, 2, 3]).isSubsetOf([5, 4, 3, 2]));
  // assert.ok(new Set([1]).isSubsetOf(createIterable([1, 2, 3])));
  // assert.ok(!new Set([1]).isSubsetOf(createIterable([2, 3, 4])));

  assert.ok(new Set([42, 43]).isSubsetOf({
    size: Infinity,
    has() {
      return true;
    },
    keys() {
      throw new Error('Unexpected call to |keys| method');
    },
  }));

  assert.throws(() => new Set().isSubsetOf({
    size: -Infinity,
    has() {
      return true;
    },
    keys() {
      throw new Error('Unexpected call to |keys| method');
    },
  }));

  assert.throws(() => new Set([1, 2, 3]).isSubsetOf(), TypeError);
  assert.throws(() => isSubsetOf.call({}, [1, 2, 3]), TypeError);
  assert.throws(() => isSubsetOf.call(undefined, [1, 2, 3]), TypeError);
  assert.throws(() => isSubsetOf.call(null, [1, 2, 3]), TypeError);
});
