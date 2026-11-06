// 移植自 MDN Node.contains() 文档（Document 从 Node 继承 contains）
// https://developer.mozilla.org/en-US/docs/Web/API/Node/contains
//
// contains() 返回布尔值，表示一个节点是否为给定节点的后代——
// 即该节点自身、直接子节点（childNodes）、子节点的子节点……依此类推。
// 注意：节点包含在自身内部；otherNode 为 null 时恒返回 false。

QUnit.test('document.contains (MDN)', assert => {
	const fixture = document.getElementById('qunit-fixture');
	const outer = document.createElement('div');
	const inner = document.createElement('div');
	const text = document.createTextNode('inner text');
	inner.appendChild(text);
	outer.appendChild(inner);
	fixture.appendChild(outer);
	const detached = document.createElement('div');

	// Note: A node is contained inside itself.
	assert.same(document.contains(document), true, 'contains itself');
	// 文档树的各层后代：documentElement / body / #outer / #inner / 文本节点
	assert.same(document.contains(document.documentElement), true, 'contains documentElement');
	assert.same(document.contains(document.body), true, 'contains body');
	assert.same(document.contains(outer), true, 'contains descendant element');
	assert.same(document.contains(inner), true, 'contains deeper descendant element');
	assert.same(document.contains(text), true, 'contains descendant text node');
	// 不在文档树中的节点
	assert.same(document.contains(detached), false, 'detached node');
	// otherNode 为 null 时恒为 false
	assert.same(document.contains(null), false, 'null argument');
});
