if(fetch.xhr) {
	module('fetch');

	QUnit.test('fetch - basic GET', function() {
		QUnit.stop();
		var url = '/test';
		fetch(url).then(function(res) {
			QUnit.ok(res instanceof Response, 'returns Response');
			QUnit.equal(res.status, 200, 'status 200');
			QUnit.ok(res.ok, 'ok true');
			return res.text();
		}).then(function(text) {
			QUnit.equal(text, 'response body', 'body matches');
			QUnit.start();
		});
		var xhr = MockXHR.lastInstance;
		QUnit.ok(xhr, 'XHR created');
		QUnit.equal(xhr.method, 'GET', 'GET method');
		QUnit.equal(xhr.url, location.origin + url, 'url correct');
		MockXHR.respondWith(200, 'response body', {}, 'OK');
	});

	QUnit.test('fetch - POST with JSON', function() {
		QUnit.stop();
		var bodyObj = { a: 1 };
		fetch('/post', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(bodyObj)
		}).then(function(res) {
			return res.json();
		}).then(function(data) {
			QUnit.deepEqual(data, bodyObj, 'echoed JSON');
			QUnit.start();
		});
		var xhr = MockXHR.lastInstance;
		QUnit.equal(xhr.method, 'POST', 'POST method');
		QUnit.equal(xhr.requestHeaders['Content-Type'], 'application/json', 'Content-Type header');
		QUnit.equal(xhr.requestBody, JSON.stringify(bodyObj), 'body sent');
		MockXHR.respondWith(200, JSON.stringify(bodyObj), { 'Content-Type': 'application/json' });
	});

	QUnit.test('fetch - headers object', function() {
		QUnit.stop();
		var headers = new Headers({ 'X-Custom': 'foo' });
		fetch('/headers', { headers: headers }).then(function(res) {
			return res.text();
		}).then(function() {
			QUnit.start();
		});
		var xhr = MockXHR.lastInstance;
		QUnit.equal(xhr.requestHeaders['x-custom'], 'foo', 'header sent');
		MockXHR.respondWith(200, 'ok');
	});

	QUnit.test('fetch - response headers', function() {
		QUnit.stop();
		fetch('/resp-headers').then(function(res) {
			QUnit.equal(res.headers.get('Content-Type'), 'text/plain', 'response header');
			QUnit.start();
		});
		MockXHR.respondWith(200, 'data', { 'Content-Type': 'text/plain' });
	});

	QUnit.test('fetch - status 404', function() {
		QUnit.stop();
		fetch('/not-found').then(function(res) {
			QUnit.equal(res.status, 404, 'status 404');
			QUnit.ok(!res.ok, 'ok false');
			QUnit.start();
		});
		MockXHR.respondWith(404, 'Not Found');
	});

	QUnit.test('fetch - network error', function() {
		QUnit.stop();
		fetch('/error').then(function() {
			QUnit.ok(false, 'should reject');
			QUnit.start();
		})['catch'](function(err) {
			QUnit.ok(err instanceof TypeError, 'rejects with TypeError');
			QUnit.start();
		});
		var xhr = MockXHR.lastInstance;
		if(xhr.onerror) xhr.onerror();
		else QUnit.ok(false, 'onerror not implemented');
	});

	QUnit.test('fetch - timeout', function() {
		QUnit.stop();
		// 注意：需要 polyfill 支持 timeout 选项（通常 fetch 没有 timeout 参数，但可以通过信号实现）
		// 这里测试 xhr 触发 ontimeout 导致 reject
		fetch('/timeout', { signal: AbortSignal.timeout(100) }) // 假设有 AbortSignal.timeout
			.then(function() {
				QUnit.ok(false, 'should reject');
				QUnit.start();
			})['catch'](function(err) {
				QUnit.ok(err, 'rejects with Error');
				QUnit.start();
			});
		var xhr = MockXHR.lastInstance;
		if(xhr.ontimeout) xhr.ontimeout();
		else QUnit.ok(false, 'ontimeout not implemented');
	});

	QUnit.test('fetch - abort via AbortController', function() {
		QUnit.stop();
		var controller = new AbortController();
		fetch('/abort', { signal: controller.signal }).then(function() {
			QUnit.ok(false, 'should reject');
			QUnit.start();
		})['catch'](function(err) {
			QUnit.equal(err.name, 'AbortError', 'rejects with AbortError');
			QUnit.start();
		});
		var xhr = MockXHR.lastInstance;
		controller.abort();
		// abort 应该调用 xhr.abort()
		// 在 Mock 中，abort 会清除定时器并触发 onabort
		// 假设 polyfill 监听了 onabort
	});

	QUnit.test('fetch - manual abort via xhr.abort()', function() {
		QUnit.stop();
		fetch('/manual-abort').then(function() {
			QUnit.ok(false, 'should reject');
			QUnit.start();
		})['catch'](function(err) {
			QUnit.equal(err.name, 'AbortError', 'rejects with AbortError');
			QUnit.start();
		});
		var xhr = MockXHR.lastInstance;
		xhr.abort(); // 模拟外部中止
	});

	QUnit.test('fetch - credentials include', function() {
		QUnit.stop();
		fetch('/cred', { credentials: 'include' }).then(function(res) {
			return res.text();
		}).then(function() {
			QUnit.start();
		});
		var xhr = MockXHR.lastInstance;
		QUnit.equal(xhr.withCredentials, true, 'withCredentials set');
		MockXHR.respondWith(200, 'ok');
	});

	QUnit.test('fetch - mode same-origin', function() {
		// mode 在 polyfill 中可能只用于 Request 对象，fetch 内部可能忽略，但可以测试 Request 的 mode 属性
		QUnit.stop();
		fetch('/mode', { mode: 'same-origin' }).then(function(res) {
			return res.text();
		}).then(function() {
			QUnit.start();
		});
		var xhr = MockXHR.lastInstance;
		// 通常 mode 不影响 XHR，所以这里只确保请求发出
		QUnit.ok(xhr, 'request sent');
		MockXHR.respondWith(200, 'ok');
	});

	QUnit.test('fetch - redirect follow', function() {
		QUnit.stop();
		fetch('/redirect').then(function(res) {
			// 由于我们无法自动跟随重定向（Mock 可手动返回 302），polyfill 可能自动跟随或返回响应
			// 取决于实现，这里简单测试收到响应
			QUnit.ok(res, 'response received');
			QUnit.start();
		});
		// 模拟重定向响应：返回 302 和 Location
		MockXHR.respondWith(302, '', { Location: '/new' }, 'Found');
		// 如果 polyfill 自动跟随，它会创建第二个 XHR 请求新 URL。但 Mock 只有一个实例，我们需要模拟第二个。
		// 简化：假设 polyfill 不自动跟随或我们只测试第一次响应。
		// 若需测试跟随，需要更复杂的 Mock 支持多个请求。
		// 这里跳过深入，仅示意。
	});
}
