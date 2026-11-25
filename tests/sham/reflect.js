// Reflect 自测。断言须同时满足三类实现：
// - modern/es2015 有原生 Reflect 的浏览器（原生语义）
// - compat 的 @@desc: 描述符存储版（get$es3/set$es3 等）
// - legacy 按访问器有无二选一
// 各方法的引用由 conditional-* 的 pure 注入按 tier 解析（sky-core/pure/Reflect/*），
// es2015 不配置注入，直接走原生全局。

QUnit.test('Reflect.apply', function(assert) {
	function add(a, b) {
		return this.v + a + b;
	}
	assert.equal(Reflect.apply(add, { v: 1 }, [2, 3]), 6, '绑定 this 与传参');
});

QUnit.test('Reflect.construct', function(assert) {
	function F(a) {
		this.a = a;
	}
	var o = Reflect.construct(F, [7]);
	assert.ok(o instanceof F, 'instanceof 构造器');
	assert.equal(o.a, 7, '参数传入构造函数');
});

QUnit.test('Reflect.defineProperty', function(assert) {
	var o = {};
	assert.equal(Reflect.defineProperty(o, 'x', { value: 1, writable: true, enumerable: true, configurable: true }), true, '返回 true');
	assert.equal(Reflect.get(o, 'x'), 1, '定义后可读');
});

QUnit.test('Reflect.get', function(assert) {
	var base = { b: 2 };
	var o = Object.create(base);
	o.a = 1;
	assert.equal(Reflect.get(o, 'a'), 1, '自有属性');
	assert.equal(Reflect.get(o, 'b'), 2, '沿原型链读取');
	assert.equal(Reflect.get(o, 'c'), undefined, '不存在的属性');
});

QUnit.test('Reflect.get receiver', function(assert) {
	var holder = {};
	var o = {};
	Object.defineProperty(o, 'g', {
		get: function() {
			return this === holder ? 'holder' : 'target';
		}
	});
	assert.equal(Reflect.get(o, 'g', holder), 'holder', 'getter 以 receiver 为 this');
});

QUnit.test('Reflect.set', function(assert) {
	var o = { a: 0 };
	assert.equal(Reflect.set(o, 'a', 5), true, '返回 true');
	assert.equal(o.a, 5, '赋值生效');
});

QUnit.test('Reflect.set receiver', function(assert) {
	var holder = {};
	var got = '';
	var o = {};
	Object.defineProperty(o, 's', {
		set: function(v) {
			got = (this === holder ? 'holder' : 'other') + ':' + v;
		}
	});
	assert.equal(Reflect.set(o, 's', 42, holder), true, '返回 true');
	assert.equal(got, 'holder:42', 'setter 以 receiver 为 this 并收到值');
});

QUnit.test('Reflect.deleteProperty', function(assert) {
	var o = { x: 1 };
	assert.equal(Reflect.deleteProperty(o, 'x'), true, '返回 true');
	assert.ok(!('x' in o), '属性已删除');

	// 回归：经 Object.defineProperty 定义的属性删除后，不应再从描述符记录读到旧值
	// （compat 的 @@desc: 存储，或注入 gOPD 的 es3 版）
	var o2 = {};
	Object.defineProperty(o2, 'x', { value: 1, writable: true, enumerable: true, configurable: true });
	Reflect.deleteProperty(o2, 'x');
	assert.equal(Reflect.get(o2, 'x'), undefined, '描述符记录一并清除');
});

QUnit.test('Reflect.has', function(assert) {
	var base = { b: 1 };
	var o = Object.create(base);
	o.a = 1;
	assert.equal(Reflect.has(o, 'a'), true, '自有');
	assert.equal(Reflect.has(o, 'b'), true, '继承');
	assert.equal(Reflect.has(o, 'c'), false, '不存在');
});

QUnit.test('Reflect.getOwnPropertyDescriptor', function(assert) {
	var o = {};
	Object.defineProperty(o, 'x', { value: 1, writable: true, enumerable: false, configurable: true });
	var d = Reflect.getOwnPropertyDescriptor(o, 'x');
	assert.ok(d, '返回描述符');
	if('value' in d) {
		assert.equal(d.value, 1, 'value');
		assert.equal(d.writable, true, 'writable');
	} else {
		// v8 defineProperty bug 环境（如 Chrome 5）经 defineProperty$v8 把可写数据属性
		// 转成访问器实现，gOPD 返回访问器形状；按读值等价断言
		assert.equal(typeof d.get, 'function', '访问器等价实现');
		assert.equal(o.x, 1, '读值等价');
	}
	// es3 版描述符记录的 enumerable 恒为 true，不断言
});

QUnit.test('Reflect.getPrototypeOf', function(assert) {
	var proto = { m: 1 };
	var o = Object.create(proto);
	assert.strictEqual(Reflect.getPrototypeOf(o), proto, '返回原型');
});

QUnit.test('Reflect.setPrototypeOf', function(assert) {
	var o = {};
	var np = { x: 1 };
	assert.equal(Reflect.setPrototypeOf(o, np), true, '返回 true');
	assert.equal(o.x, 1, '设置后可读到新原型的属性');
	// compat 的 jscript 实现是复制语义，原型 identity 不保持，不做 === 断言
});

QUnit.test('Reflect.ownKeys', function(assert) {
	var o = { a: 1 };
	o.b = 2;
	var keys = Reflect.ownKeys(o);
	assert.equal(keys.length, 2, '自有键数量');
	var hasA = false, hasB = false;
	for(var i = 0; i < keys.length; i++) {
		if(keys[i] === 'a') { hasA = true; }
		if(keys[i] === 'b') { hasB = true; }
	}
	assert.ok(hasA, '包含 a');
	assert.ok(hasB, '包含 b');
});

QUnit.test('Reflect.ownKeys symbol', function(assert) {
	if(typeof Symbol !== 'function') {
		assert.ok(true, '无 Symbol 环境，跳过');
		return;
	}
	var sym = Symbol('x');
	var o = { a: 1 };
	o[sym] = 2;
	var keys = Reflect.ownKeys(o);
	assert.equal(keys.length, 2, '字符串键 + 符号键');
	var hasA = false, hasSym = false;
	for(var i = 0; i < keys.length; i++) {
		if(keys[i] === 'a') { hasA = true; }
		if(keys[i] === sym) { hasSym = true; }
	}
	assert.ok(hasA, '包含字符串键');
	assert.ok(hasSym, '包含符号键');
});

QUnit.test('Reflect.isExtensible', function(assert) {
	assert.equal(Reflect.isExtensible({}), true, '普通对象返回 true');
	assert.equal(Reflect.isExtensible([]), true, '数组返回 true');
});

QUnit.test('Reflect.preventExtensions', function(assert) {
	// 无原生 preventExtensions 的环境（compat/部分 legacy）实现为 no-op 成功，
	// 有原生时真实阻止扩展；这里只断言返回值，不断言语义
	assert.equal(Reflect.preventExtensions({}), true, '返回 true');
});
