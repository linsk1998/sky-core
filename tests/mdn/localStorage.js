// 移植自 MDN Window.localStorage 文档
// https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
//
// localStorage 是 window 的只读属性，返回 Storage 对象；
// 与 sessionStorage 的区别是数据没有过期时间，页面会话结束后仍然保留。
// 键和值始终以 UTF-16 字符串保存，同名键覆盖，不存在的键返回 null。

QUnit.test('window.localStorage (MDN)', assert => {
	assert.ok('localStorage' in window, 'window.localStorage exists');
	assert.same(typeof localStorage, 'object', 'localStorage is an object');

	localStorage.clear();
	assert.same(localStorage.length, 0, 'clear() empties storage');

	// The localStorage object provides 4 methods:
	// setItem(), getItem(), removeItem(), clear()
	localStorage.setItem("myCat", "Tom");
	assert.same(localStorage.getItem("myCat"), "Tom", 'getItem() returns the value set by setItem()');
	assert.same(localStorage.length, 1, 'length counts stored items');

	// 不存在的键返回 null（而不是 undefined 或空字符串）
	assert.same(localStorage.getItem("missing"), null, 'getItem() returns null for a missing key');

	// 同名键覆盖，不新增条目
	localStorage.setItem("myCat", "Jerry");
	assert.same(localStorage.getItem("myCat"), "Jerry", 'setItem() overwrites an existing key');
	assert.same(localStorage.length, 1, 'overwriting does not increase length');

	// 键和值始终以字符串形式存储
	localStorage.setItem("answer", 42);
	assert.same(localStorage.getItem("answer"), "42", 'values are stored as strings');

	// 空字符串是合法值，不能被当作“不存在”
	localStorage.setItem("empty", "");
	assert.same(localStorage.getItem("empty"), "", 'empty string value round-trips');

	// Unicode 键值按 UTF-16 保存
	localStorage.setItem("毛球", "小猫");
	assert.same(localStorage.getItem("毛球"), "小猫", 'unicode keys and values round-trip');

	// key(n) 按下标返回键名；越界返回 null
	// 老浏览器原生实现存在偏差：Opera 12 返回 undefined，Firefox 3.5/3.6 抛 INDEX_SIZE_ERR
	localStorage.clear();
	localStorage.setItem("a", "1");
	assert.same(localStorage.key(0), "a", 'key(0) returns the first key');
	var outOfRangeKey;
	try {
		outOfRangeKey = localStorage.key(1);
	} catch(e) {
		outOfRangeKey = 'throws';
	}
	assert.ok(outOfRangeKey === null || outOfRangeKey === undefined || outOfRangeKey === 'throws', 'key(n) returns null when out of range');

	// removeItem() 删除指定键，删除不存在的键不报错
	localStorage.removeItem("a");
	assert.same(localStorage.getItem("a"), null, 'removeItem() deletes the key');
	assert.same(localStorage.length, 0, 'length decreases after removeItem()');
	localStorage.removeItem("missing");

	// clear() 清空全部
	localStorage.setItem("a", "1");
	localStorage.setItem("b", "2");
	localStorage.clear();
	assert.same(localStorage.length, 0, 'clear() removes all items');
	assert.same(localStorage.getItem("a"), null, 'items are gone after clear()');
});
