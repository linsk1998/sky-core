module('Request');

QUnit.test('Request constructor - basic', function() {
	var req = new Request('/path');
	QUnit.equal(req.method, 'GET', 'default method');
	QUnit.equal(req.url, location.origin + '/path', 'url is string');
	QUnit.ok(req.headers instanceof Headers, 'has headers');
	QUnit.equal(req.referrer, 'about:client', 'default referrer');
	QUnit.equal(req.mode, 'cors', 'default mode'); // 可能不同 polyfill 默认值不同，根据实现调整
	QUnit.equal(req.credentials, 'same-origin', 'default credentials');
	QUnit.equal(req.cache, 'default', 'cache set');
});

QUnit.test('Request constructor - with options', function() {
	var req = new Request('/path', {
		method: 'POST',
		headers: { 'X-Test': 'foo' },
		body: 'hello',
		mode: 'same-origin',
		credentials: 'include',
		cache: 'no-cache'
	});
	QUnit.equal(req.method, 'POST', 'method set');
	QUnit.equal(req.headers.get('X-Test'), 'foo', 'headers from object');
	QUnit.equal(req.mode, 'same-origin', 'mode set');
	QUnit.equal(req.credentials, 'include', 'credentials set');
	QUnit.equal(req.cache, 'no-cache', 'cache set');
	// body 测试在 Body 模块进行
});

QUnit.test('Request constructor - from another Request', function() {
	var req1 = new Request('/path', { method: 'PUT', headers: { a: 'b' } });
	var req2 = new Request(req1);
	QUnit.equal(req2.method, 'PUT', 'method inherited');
	QUnit.equal(req2.url, location.origin + '/path', 'url inherited');
	QUnit.equal(req2.headers.get('a'), 'b', 'headers inherited');
	// 修改原请求不应影响新请求
	req1.headers.set('a', 'c');
	QUnit.equal(req2.headers.get('a'), 'b', 'cloned headers independent');
});

QUnit.test('Request clone', function() {
	var req1 = new Request('/path', { method: 'DELETE', body: 'data' });
	var req2 = req1.clone();
	QUnit.equal(req2.method, 'DELETE', 'method cloned');
	QUnit.equal(req2.url, location.origin + '/path', 'url cloned');
	QUnit.notEqual(req1, req2, 'different objects');
	// bodyUsed 测试
	QUnit.ok(!req1.bodyUsed, 'body not used');
});

QUnit.test('Request clone - body already used', function() {
	var req = new Request('/', { method: 'POST', body: 'test' });
	req.text(); // consume body
	QUnit.throws(function() {
		req.clone();
	}, TypeError, 'clone throws if body used');
});