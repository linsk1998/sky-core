module('Response');

QUnit.test('Response constructor - basic', function() {
	var res = new Response('hello', { status: 201, statusText: 'Created', headers: { 'X-Foo': 'bar' } });
	QUnit.equal(res.status, 201, 'status set');
	QUnit.equal(res.statusText, 'Created', 'statusText set');
	QUnit.equal(res.ok, true, 'ok should be false for 201'); // 根据规范，200-299 为 true
	QUnit.ok(res.headers instanceof Headers, 'headers present');
	QUnit.equal(res.headers.get('X-Foo'), 'bar', 'headers set');
	QUnit.equal(res.type, 'default', 'type default');
	QUnit.equal(res.url, '', 'url default');
});

QUnit.test('Response static error', function() {
	var errRes = Response.error();
	QUnit.equal(errRes.status, 0, 'error response status 0');
	QUnit.equal(errRes.statusText, '', 'error statusText empty');
	QUnit.equal(errRes.type, 'error', 'type error');
});

QUnit.test('Response clone', function() {
	var res = new Response('body', { headers: { a: 'b' } });
	var clone = res.clone();
	QUnit.notEqual(res, clone, 'different objects');
	QUnit.equal(clone.headers.get('a'), 'b', 'headers cloned');
	res.text(); // consume original
	QUnit.ok(res.bodyUsed, 'original body used');
	QUnit.ok(!clone.bodyUsed, 'clone body not used');
});

QUnit.test('Response clone - body already used', function() {
	var res = new Response('data');
	res.text(); // consume
	QUnit.throws(function() {
		res.clone();
	}, TypeError, 'cannot clone if body used');
});