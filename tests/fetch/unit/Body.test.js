module('Body');

QUnit.test('Body - text()', function() {
	QUnit.stop();
	var res = new Response('hello world');
	res.text().then(function(text) {
		QUnit.equal(text, 'hello world', 'text() resolves');
		QUnit.ok(res.bodyUsed, 'bodyUsed true after text');
		QUnit.start();
	});
});

QUnit.test('Body - json()', function() {
	QUnit.stop();
	var obj = { foo: 'bar' };
	var res = new Response(JSON.stringify(obj), { headers: { 'content-type': 'application/json' } });
	res.json().then(function(data) {
		QUnit.deepEqual(data, obj, 'json() parses');
		QUnit.start();
	}).catch(function(e) {
		QUnit.ok(false, 'json failed: ' + e);
		QUnit.start();
	});
});

QUnit.test('Body - json() invalid', function() {
	QUnit.stop();
	var res = new Response('not json');
	res.json().then(function() {
		QUnit.ok(false, 'should reject');
		QUnit.start();
	}).catch(function(e) {
		QUnit.ok(e instanceof SyntaxError, 'rejects with SyntaxError');
		QUnit.start();
	});
});

QUnit.test('Body - blob()', function() {
	if(typeof Blob === 'undefined') {
		QUnit.ok(true, 'Blob not supported, skipping');
		return;
	}
	QUnit.stop();
	var blob = new Blob(['hello'], { type: 'text/plain' });
	var res = new Response(blob);
	res.blob().then(function(b) {
		QUnit.ok(b instanceof Blob, 'returns Blob');
		QUnit.equal(b.size, blob.size, 'size matches');
		QUnit.start();
	});
});

// QUnit.test('Body - arrayBuffer()', function() {
// 	if(typeof ArrayBuffer === 'undefined' || typeof TextEncoder === 'undefined') {
// 		QUnit.ok(true, 'ArrayBuffer not supported, skipping');
// 		return;
// 	}
// 	QUnit.stop();
// 	var text = 'hello';
// 	var encoder = new TextEncoder();
// 	var buffer = encoder.encode(text).buffer;
// 	var res = new Response(buffer);
// 	res.arrayBuffer().then(function(ab) {
// 		QUnit.ok(ab instanceof ArrayBuffer, 'returns ArrayBuffer');
// 		var view = new Uint8Array(ab);
// 		var str = String.fromCharCode.apply(null, view);
// 		QUnit.equal(str, text, 'content matches');
// 		QUnit.start();
// 	});
// });

// QUnit.test('Body - formData()', function() {
// 	if(typeof FormData === 'undefined') {
// 		QUnit.ok(true, 'FormData not supported, skipping');
// 		return;
// 	}
// 	// 简单的 form data 解析可能复杂，可以测试抛出或不实现
// 	// 假设 fetch polyfill 可能未实现，这里仅测试调用不崩溃
// 	QUnit.stop();
// 	var form = new FormData();
// 	form.append('key', 'value');
// 	var res = new Response(form);
// 	res.formData().then(function(fd) {
// 		QUnit.ok(fd instanceof FormData, 'returns FormData');
// 		QUnit.equal(fd.get('key'), 'value', 'content matches');
// 		QUnit.start();
// 	}).catch(function() {
// 		// 如果未实现，应 reject 并说明
// 		QUnit.ok(true, 'formData() not implemented, reject expected');
// 		QUnit.start();
// 	});
// });

QUnit.test('Body - consume twice throws', function() {
	QUnit.stop();
	var res = new Response('test');
	res.text().then(function() {
		res.text().then(function() {
			QUnit.ok(false, 'second text should reject');
			QUnit.start();
		}).catch(function(e) {
			QUnit.ok(e instanceof TypeError, 'second consume rejects');
			QUnit.start();
		});
	});
});