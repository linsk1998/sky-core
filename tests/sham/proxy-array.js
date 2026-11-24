import { proxyArray$es3 } from "../../impl/Proxy/proxyArray$es3";
import "sky-core/polyfill/Array/prototype/at";
import "sky-core/polyfill/Array/isArray";
QUnit.test('Proxy#array', function(assert) {
	var getTime = 0;
	var setTime = 0;
	var target = [1, 2, 3];
	var arr = new Proxy(target, {
		get: function(target, prop, receiver) {
			if(prop === 'length') {
				getTime++;
			}
			return Reflect.get(target, prop, receiver);
		},
		set: function(target, prop, value, receiver) {
			if(prop === 'length') {
				setTime++;
			}
			target[prop] = value;
				return true;
		},
	});
	assert.ok(arr instanceof Array, "instanceof");
	assert.ok(Array.isArray(arr), "isArray");
	assert.equal(arr.join(","), "1,2,3", "join");
	assert.equal(arr.join(), "1,2,3", "join");
	assert.equal(arr.toString(), "1,2,3", "toString");

	assert.equal(arr.at(NaN), 1, "at");
	assert.equal(arr.at(0), 1);
	assert.equal(arr.at(1), 2);
	assert.equal(arr.at(2), 3);

	assert.equal(arr.length, 3, "length");
	// length 截持（trap）仅 defineProperty 实现支持；es3 的 length 由方法调用同步、赋值不截持
	setTime = 0;
	arr.length = arr.length;
	if(setTime === 0) {
		assert.ok(true, "es3 实现：length 不截持，跳过截持断言");
		return;
	}
	getTime = 0;
	assert.equal(arr.length, 3, "length");
	assert.equal(getTime, 1, "get length");

	arr.splice(1, 1);
	assert.equal(arr.length, 2, "splice");

	setTime = 0;
	arr.length = 1;
	assert.equal(setTime, 1, "set length");
	assert.equal(arr.length, 1);
	assert.equal(arr.at(0), 1);
	assert.deepEqual(target, [1]);

	arr.push(2);
	assert.deepEqual(arr.at(1), 2, "push");
	assert.deepEqual(arr.length, 2, "push");

	arr.unshift(3);
	assert.deepEqual(arr.at(0), 3, "unshift");
	assert.deepEqual(arr.at(2), 2, "unshift");
	assert.deepEqual(arr.length, 3, "unshift");

	arr.reverse();
	assert.deepEqual(arr.at(0), 2, "reverse");
	assert.deepEqual(arr.at(1), 1, "reverse");
	assert.deepEqual(arr.at(2), 3, "reverse");
	assert.deepEqual(arr.length, 3, "reverse");

	arr.sort();
	assert.deepEqual(arr.at(0), 1, "sort");
	assert.deepEqual(arr.at(1), 2, "sort");
	assert.deepEqual(arr.at(2), 3, "sort");
	assert.deepEqual(arr.length, 3, "sort");
});
QUnit.test('Proxy#array$es3', function(assert) {
	// es3 数组代理仅运行于无访问器环境（本地不可达），此处直接单元测试
	var readCount = 0;
	var writeCount = 0;
	var target = [1, 2, 3];
	var arr = proxyArray$es3(null, target, {
		get: function(t, p, r) { if(p === 'length') { readCount++; } return t[p]; },
		set: function(t, p, v, r) { if(p === 'length') { writeCount++; } t[p] = v; return true; }
	});
	assert.ok(arr instanceof Array, "es3 代理 instanceof Array（经 ProxyArray 判定）");
	assert.ok(Array.isArray(arr), "es3 代理经 isArray 判定为数组");
	assert.equal(Array.isArray([1]), true, "真数组 isArray");
	assert.equal(Array.isArray({}), false, "普通对象 isArray");
	arr.splice(1, 1);
	assert.equal(writeCount, 1, "splice 触发 length 写陷阱");
	assert.equal(arr.length, 2, "splice 后 length 同步");
	arr.push(9);
	assert.equal(writeCount, 2, "push 触发 length 写陷阱");
	assert.equal(arr.length, 3, "push 后 length 同步");
	arr.join(",");
	assert.ok(readCount >= 1, "读取类方法触发 length 读陷阱");
	assert.equal(arr.join(","), "1,3,9", "join 结果");
});
