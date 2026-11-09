// 移植自 MDN Window.sessionStorage 文档
// https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
//
// sessionStorage 是 window 的只读属性，返回 Storage 对象；
// 页面会话结束时（关闭标签页/窗口）数据被清除，
// 页面重新加载、恢复时数据仍然存在。与 localStorage 相互独立。

QUnit.test('window.sessionStorage (MDN)', assert => {
	assert.ok('sessionStorage' in window, 'window.sessionStorage exists');
	assert.same(typeof sessionStorage, 'object', 'sessionStorage is an object');

	sessionStorage.clear();
	assert.same(sessionStorage.length, 0, 'clear() empties storage');

	// The sessionStorage object provides 4 methods:
	// setItem(), getItem(), removeItem(), clear()
	sessionStorage.setItem("key", "value");
	assert.same(sessionStorage.getItem("key"), "value", 'getItem() returns the value set by setItem()');
	assert.same(sessionStorage.length, 1, 'length counts stored items');

	// 不存在的键返回 null
	assert.same(sessionStorage.getItem("missing"), null, 'getItem() returns null for a missing key');

	// 同名键覆盖，不新增条目
	sessionStorage.setItem("key", "new value");
	assert.same(sessionStorage.getItem("key"), "new value", 'setItem() overwrites an existing key');
	assert.same(sessionStorage.length, 1, 'overwriting does not increase length');

	// 键和值始终以字符串形式存储
	sessionStorage.setItem("answer", 42);
	assert.same(sessionStorage.getItem("answer"), "42", 'values are stored as strings');

	// key(n) 按下标返回键名；越界返回 null
	// 老浏览器原生实现存在偏差：Opera 12 返回 undefined，Firefox 3.5/3.6 抛 INDEX_SIZE_ERR
	sessionStorage.clear();
	sessionStorage.setItem("a", "1");
	assert.same(sessionStorage.key(0), "a", 'key(0) returns the first key');
	var outOfRangeKey;
	try {
		outOfRangeKey = sessionStorage.key(1);
	} catch(e) {
		outOfRangeKey = 'throws';
	}
	assert.ok(outOfRangeKey === null || outOfRangeKey === undefined || outOfRangeKey === 'throws', 'key(n) returns null when out of range');

	// removeItem() 删除指定键，删除不存在的键不报错
	sessionStorage.removeItem("a");
	assert.same(sessionStorage.getItem("a"), null, 'removeItem() deletes the key');
	assert.same(sessionStorage.length, 0, 'length decreases after removeItem()');
	sessionStorage.removeItem("missing");

	// clear() 清空全部
	sessionStorage.setItem("a", "1");
	sessionStorage.setItem("b", "2");
	sessionStorage.clear();
	assert.same(sessionStorage.length, 0, 'clear() removes all items');
	assert.same(sessionStorage.getItem("a"), null, 'items are gone after clear()');

	// sessionStorage 与 localStorage 相互独立，同名键互不影响
	localStorage.clear();
	sessionStorage.clear();
	localStorage.setItem("shared", "local");
	sessionStorage.setItem("shared", "session");
	assert.same(localStorage.getItem("shared"), "local", 'localStorage keeps its own value');
	assert.same(sessionStorage.getItem("shared"), "session", 'sessionStorage keeps its own value');
	localStorage.removeItem("shared");
	sessionStorage.removeItem("shared");
});
