// 移植自 MDN URL 示例
// https://developer.mozilla.org/en-US/docs/Web/API/URL
// 实现不转化解析所得的组件（如中文域名、unicode 路径编码），相关示例未移植。
QUnit.test('URL constructor with base', assert => {
	const url = new URL("cats", "http://www.example.com/animals/dogs");
	assert.equal(url.hostname, "www.example.com", 'url.hostname');
	assert.equal(url.pathname, "/animals/cats", 'url.pathname');
});

QUnit.test('URL.canParse', assert => {
	if(typeof URL.canParse === "function") {
		assert.equal(URL.canParse("cats", "http://www.example.com/animals/dogs"), true, 'canParse with base');
		assert.equal(URL.canParse("/dogs"), false, 'canParse invalid');
	} else {
		assert.ok(true, 'URL.canParse 不支持，跳过');
	}
});

QUnit.test('URL set hash to build the url', assert => {
	const url = new URL("cats", "http://www.example.com/animals/dogs");
	url.hash = "#tabby";
	assert.equal(url.href, "http://www.example.com/animals/cats#tabby", 'url.href');
});

QUnit.test('URL set host keeps port', assert => {
	const url = new URL("http://zloirock.ru:1337/");
	url.host = "other.com";
	assert.equal(url.port, "1337", 'host 不带端口时保留 port');
	assert.equal(url.href, "http://other.com:1337/", 'href');
	url.host = "other.com:";
	assert.equal(url.port, "1337", 'host 显式空端口时保留 port');
	assert.equal(url.href, "http://other.com:1337/", 'href');
});

QUnit.test('URL search params of the url', assert => {
	// MDN 原例取 window.location.href，此处用同形固定 URL
	const parsedUrl = new URL("https://some.site/?id=123");
	assert.equal(parsedUrl.searchParams.get("id"), "123", 'searchParams.get');
});
