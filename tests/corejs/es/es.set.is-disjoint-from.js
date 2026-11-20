// 移植自 core-js tests/unit-global/es.set.is-disjoint-from.js（MIT）
import { createIterable, createSetLike } from '../helpers/helpers.js';

QUnit.test('Set#isDisjointFrom', assert => {
  // core-js 原文为 `const { isDisjointFrom } = Set.prototype;`，这里改为成员表达式以配合 impl-inject 的裸名注入
  const isDisjointFrom = Set.prototype.isDisjointFrom;

  assert.isFunction(isDisjointFrom);
  assert.arity(isDisjointFrom, 1);
  assert.name(isDisjointFrom, 'isDisjointFrom');
  assert.looksNative(isDisjointFrom);
  assert.nonEnumerable(Set.prototype, 'isDisjointFrom');

  assert.ok(new Set([1]).isDisjointFrom(new Set([2])));
  assert.ok(!new Set([1]).isDisjointFrom(new Set([1])));
  assert.ok(new Set([1, 2, 3]).isDisjointFrom(new Set([4, 5, 6])));
  assert.ok(!new Set([1, 2, 3]).isDisjointFrom(new Set([5, 4, 3])));
  assert.ok(new Set([1]).isDisjointFrom(createSetLike([2])));
  assert.ok(!new Set([1]).isDisjointFrom(createSetLike([1])));
  assert.ok(new Set([1, 2, 3]).isDisjointFrom(createSetLike([4, 5, 6])));
  assert.ok(!new Set([1, 2, 3]).isDisjointFrom(createSetLike([5, 4, 3])));

  // core-js@4 将移除对数组 / 可迭代参数的支持；本实现按 ES2025 只接受 set-like 参数，故注释保留
  // assert.ok(new Set([1]).isDisjointFrom([2]));
  // assert.ok(!new Set([1]).isDisjointFrom([1]));
  // assert.ok(new Set([1, 2, 3]).isDisjointFrom([4, 5, 6]));
  // assert.ok(!new Set([1, 2, 3]).isDisjointFrom([5, 4, 3]));
  // assert.ok(new Set([1]).isDisjointFrom(createIterable([2])));
  // assert.ok(!new Set([1]).isDisjointFrom(createIterable([1])));

  assert.ok(!new Set([42, 43]).isDisjointFrom({
    size: Infinity,
    has() {
      return true;
    },
    keys() {
      throw new Error('Unexpected call to |keys| method');
    },
  }));

  assert.throws(() => new Set().isDisjointFrom({
    size: -Infinity,
    has() {
      return true;
    },
    keys() {
      throw new Error('Unexpected call to |keys| method');
    },
  }));

  let closed = false;
  assert.ok(!new Set([1, 2, 3, 4]).isDisjointFrom({
    size: 3,
    has() {
      return true;
    },
    keys() {
      let index = 0;
      return {
        next() {
          return {
            value: [5, 1, 6][index++],
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

  assert.throws(() => new Set([1, 2, 3]).isDisjointFrom(), TypeError);
  assert.throws(() => isDisjointFrom.call({}, [1, 2, 3]), TypeError);
  assert.throws(() => isDisjointFrom.call(undefined, [1, 2, 3]), TypeError);
  assert.throws(() => isDisjointFrom.call(null, [1, 2, 3]), TypeError);
});
