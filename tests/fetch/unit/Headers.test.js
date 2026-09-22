module('Headers');

QUnit.test('Headers constructor - from object', function() {
	var h = new Headers({ 'Content-Type': 'text/plain', 'X-Custom': 'foo' });
	QUnit.equal(h.get('Content-Type'), 'text/plain', 'get existing');
	QUnit.equal(h.get('X-Custom'), 'foo', 'get custom');
	QUnit.equal(h.get('content-type'), 'text/plain', 'case-insensitive');
});

QUnit.test('Headers constructor - from Headers instance', function() {
	var h1 = new Headers({ 'X-Foo': 'bar' });
	var h2 = new Headers(h1);
	QUnit.equal(h2.get('X-Foo'), 'bar', 'copy from other Headers');
});

QUnit.test('Headers constructor - from array', function() {
	var h = new Headers([['Content-Type', 'text/html'], ['X-Foo', 'bar']]);
	QUnit.equal(h.get('Content-Type'), 'text/html', 'array works');
	QUnit.equal(h.get('X-Foo'), 'bar', 'array works');
});

QUnit.test('Headers methods - append, set, delete, has', function() {
	var h = new Headers();
	h.append('Accept', 'application/json');
	h.append('Accept', 'text/plain');
	QUnit.equal(h.get('Accept'), 'application/json, text/plain', 'append with multiple values');

	h.set('Accept', 'text/html');
	QUnit.equal(h.get('Accept'), 'text/html', 'set overwrites');

	h.append('X-Foo', 'bar');
	QUnit.ok(h.has('X-Foo'), 'has returns true');

	h['delete']('X-Foo');
	QUnit.ok(!h.has('X-Foo'), 'delete removes');

	h['delete']('non-existent'); // should not throw
	QUnit.ok(true, 'delete on missing header does not throw');
});

QUnit.test('Headers forEach', function() {
	var h = new Headers({ a: '1', b: '2', c: '3' });
	var keys = [];
	h.forEach(function(value, key) {
		keys.push(key);
	});
	QUnit.deepEqual(keys.sort(), ['a', 'b', 'c'], 'forEach iterates all headers');
});

QUnit.test('Headers keys/values/entries', function() {
	if(typeof Headers.prototype.keys !== 'function') {
		QUnit.ok(true, 'keys method not available, skipping');
		return;
	}
	var h = new Headers({ a: '1', b: '2' });
	var keys = Array.from(h.keys());
	QUnit.deepEqual(keys.sort(), ['a', 'b'], 'keys() works');
	var values = Array.from(h.values());
	QUnit.deepEqual(values.sort(), ['1', '2'], 'values() works');
	var entries = Array.from(h.entries());
	QUnit.deepEqual(entries.sort(), [['a', '1'], ['b', '2']], 'entries() works');
});
