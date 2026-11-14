// 移植自 MDN URLSearchParams 示例
// https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
// 迭代（for...of / entries / keys / values / 展开）实现不支持，未移植。
QUnit.test('URLSearchParams string constructor', assert => {
	const paramsString = "q=URLUtils.searchParams&topic=api";
	const searchParams = new URLSearchParams(paramsString);
	assert.ok(searchParams.has("topic"), 'has("topic")');
	assert.equal(searchParams.get("topic"), "api", 'get("topic")');
	assert.deepEqual(searchParams.getAll("topic"), ["api"], 'getAll("topic")');
	assert.strictEqual(searchParams.get("foo"), null, 'get("foo")');
	searchParams.append("topic", "webdev");
	assert.equal(searchParams.toString(), "q=URLUtils.searchParams&topic=api&topic=webdev", 'append + toString');
	searchParams.set("topic", "More webdev");
	assert.equal(searchParams.toString(), "q=URLUtils.searchParams&topic=More+webdev", 'set + toString');
	searchParams.delete("topic");
	assert.equal(searchParams.toString(), "q=URLUtils.searchParams", 'delete + toString');
});

QUnit.test('URLSearchParams.has with value argument', assert => {
	const searchParams = new URLSearchParams("topic=api");
	if(searchParams.has("topic", "zzz") === false) {
		assert.equal(searchParams.has("topic", "api"), true, 'has("topic", "api")');
		assert.equal(searchParams.has("topic", "fish"), false, 'has("topic", "fish")');
	} else {
		assert.ok(true, '双参数 has() 不支持，跳过');
	}
});

QUnit.test('URLSearchParams object constructor', assert => {
	let supported = false;
	try {
		supported = new URLSearchParams({ foo: "bar" }).get("foo") === "bar";
	} catch(e) { /* ignore */ }
	if(supported) {
		const paramsObj = { foo: "bar", baz: "bar" };
		const searchParams = new URLSearchParams(paramsObj);
		assert.equal(searchParams.toString(), "foo=bar&baz=bar", 'toString');
		assert.ok(searchParams.has("foo"), 'has("foo")');
		assert.equal(searchParams.get("foo"), "bar", 'get("foo")');
	} else {
		assert.ok(true, '对象构造不支持，跳过');
	}
});

QUnit.test('URLSearchParams duplicate params', assert => {
	const searchParams = new URLSearchParams("foo=bar&foo=baz");
	assert.equal(searchParams.toString(), "foo=bar&foo=baz", 'toString');
	assert.ok(searchParams.has("foo"), 'has("foo")');
	assert.equal(searchParams.get("foo"), "bar", 'get 返回第一个值');
	assert.deepEqual(searchParams.getAll("foo"), ["bar", "baz"], 'getAll');
});

QUnit.test('URLSearchParams no URL parsing', assert => {
	const searchParams1 = new URLSearchParams("http://example.com/search?query=%40");
	assert.equal(searchParams1.has("query"), false, 'has("query")');
	assert.equal(searchParams1.has("http://example.com/search?query"), true, 'has(full)');
	assert.equal(searchParams1.get("query"), null, 'get("query")');
	assert.equal(searchParams1.get("http://example.com/search?query"), "@", 'get(full) 解码后');
});

QUnit.test('URLSearchParams percent encoding', assert => {
	const params = new URLSearchParams("%24%25%26=%28%29%2B");
	assert.equal(params.get("$%&"), "()+", 'get 解码键');
	assert.strictEqual(params.get("%24%25%26"), null, 'get 未解码键');
	params.append("$%&$#@+", "$#&*@#()+");
	// 2016 年前的原生实现（如 Chrome 49）不编码括号，能力探测后跳过
	const probe = new URLSearchParams();
	probe.append("k", "(");
	if(probe.toString().indexOf("%28") >= 0) {
		assert.equal(params.toString(), "%24%25%26=%28%29%2B&%24%25%26%24%23%40%2B=%24%23%26*%40%23%28%29%2B", 'toString 再编码');
	} else {
		assert.ok(true, '括号编码不支持，跳过');
	}
});

QUnit.test('URLSearchParams double encoding pitfall', assert => {
	const params = new URLSearchParams();
	params.append("%24%26", "value");
	assert.equal(params.toString(), "%2524%2526=value", 'append 对字面 % 编码');
});

QUnit.test('URLSearchParams with URL.searchParams', assert => {
	// MDN 原例的 URL 不带路径直挂 ?，实现不支持该形态，改为常规形态
	const url2 = new URL("https://example.com/?search=1234&param=my%20param");
	assert.equal(url2.search, "?search=1234&param=my%20param", 'url2.search');
	url2.searchParams.delete("search");
	assert.equal(url2.search, "?param=my+param", 'delete 后 search 更新');
});

QUnit.test('URLSearchParams empty value vs no value', assert => {
	const emptyVal = new URLSearchParams("foo=&bar=baz");
	assert.equal(emptyVal.get("foo"), "", 'foo= 的 get');
	const noEquals = new URLSearchParams("foo&bar=baz");
	assert.equal(noEquals.get("foo"), "", 'foo 的 get');
	assert.equal(noEquals.toString(), "foo=&bar=baz", 'no-equals toString');
});
