QUnit.test('Function#bind', assert => {
  const bind = Function.prototype.bind;
  assert.isFunction(bind);
  assert.arity(bind, 1);
  assert.name(bind, 'bind');
  assert.looksNative(bind);
  assert.nonEnumerable(Function.prototype, 'bind');
  assert.same(function() {
    return this.a;
  }.bind({ a: 42 })(), 42);
  assert.same(new (function() { /* empty */ })().a, undefined);
  // new 用法MDN上说不建议使用，就不支持了，
  // function A() {
  // }
  // const a = new A();
  // const B = A.bind(a);
  // assert.ok(B.call(a) === undefined, "not allow new");

  // assert.same((it => it).bind(null, 42)(), 42);
  // const regExpTest = RegExp.prototype.test.bind(/a/);
  // assert.ok(regExpTest('a'));
  // const Date2017 = Date.bind(null, 2017);
  // const date = new Date2017(11);
  // assert.ok(date instanceof Date);
  // assert.strictEqual(date.getFullYear(), 2017);
  // assert.strictEqual(date.getMonth(), 11);
});
