import { STRICT } from '../helpers/constants';

QUnit.test('String#replaceAll', assert => {
	const replaceAll = String.prototype.replaceAll;
	assert.isFunction(replaceAll);
	assert.arity(replaceAll, 2);
	assert.name(replaceAll, 'replaceAll');
	assert.looksNative(replaceAll);
	assert.nonEnumerable(String.prototype, 'replaceAll');
	assert.same('q=query+string+parameters'.replaceAll('+', ' '), 'q=query string parameters');
	assert.same('foo'.replaceAll('o', {}), 'f[object Object][object Object]');
	assert.same('[object Object]x[object Object]'.replaceAll({}, 'y'), 'yxy');
	assert.same(replaceAll.call({}, 'bject', 'lolo'), '[ololo Ololo]');
	assert.same('aba'.replaceAll('b', (search, i, string) => {
		assert.same(search, 'b', '`search` is `b`');
		assert.same(i, 1, '`i` is 1');
		assert.same(String(string), 'aba', '`string` is `aba`');
		return 'c';
	}), 'aca');
	assert.same('aba'.replaceAll('b'), 'aundefineda');
	assert.same('xxx'.replaceAll('', '_'), '_x_x_x_');
	assert.same('121314'.replaceAll('1', '$$'), '$2$3$4', '$$');
	assert.same('121314'.replaceAll('1', '$&'), '121314', '$&');
	assert.same('121314'.replaceAll('1', '$`'), '212312134', '$`');
	assert.same('121314'.replaceAll('1', '$\''), '213142314344', '$\'');
	if(STRICT) {
		assert.throws(() => replaceAll.call(null, 'a', 'b'), TypeError);
		assert.throws(() => replaceAll.call(undefined, 'a', 'b'), TypeError);
	}
	assert.throws(() => 'b.b.b.b.b'.replaceAll(/\./, 'a'), TypeError);
	assert.same('b.b.b.b.b'.replaceAll(/\./g, 'a'), 'babababab');
	const object = {};
	assert.same('[object Object]'.replaceAll(object, 'a'), 'a');
});
