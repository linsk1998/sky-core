import "sky-core/polyfill/Symbol";

QUnit.test('Array#keys', assert => {
	const keys = Array.prototype.keys;
	assert.isFunction(keys);
	assert.arity(keys, 0);
	assert.name(keys, 'keys');
	const iterator = ['q', 'w', 'e'].keys();
	assert.isIterator(iterator);
	assert.isIterable(iterator);
	assert.deepEqual(iterator.next(), {
		value: 0,
		done: false,
	});
	assert.deepEqual(iterator.next(), {
		value: 1,
		done: false,
	});
	assert.deepEqual(iterator.next(), {
		value: 2,
		done: false,
	});
	assert.deepEqual(iterator.next(), {
		value: undefined,
		done: true,
	});
	// has native not support
	// assert.deepEqual(keys.call({
	// 	length: -1,
	// }).next(), {
	// 	value: undefined,
	// 	done: true,
	// }, 'uses ToLength');
});

QUnit.test('Array#values', assert => {
	const values = Array.prototype.values;
	assert.isFunction(values);
	assert.arity(values, 0);
	// assert.name(values, 'values');
	const iterator = ['q', 'w', 'e'].values();
	assert.isIterator(iterator);
	assert.isIterable(iterator);
	assert.deepEqual(iterator.next(), {
		value: 'q',
		done: false,
	});
	assert.deepEqual(iterator.next(), {
		value: 'w',
		done: false,
	});
	assert.deepEqual(iterator.next(), {
		value: 'e',
		done: false,
	});
	assert.deepEqual(iterator.next(), {
		value: undefined,
		done: true,
	});
	// assert.deepEqual(values.call({
	// 	length: -1,
	// }).next(), {
	// 	value: undefined,
	// 	done: true,
	// }, 'uses ToLength');
});

QUnit.test('Array#entries', assert => {
	const entries = Array.prototype.entries;
	assert.isFunction(entries);
	assert.arity(entries, 0);
	assert.name(entries, 'entries');
	const iterator = ['q', 'w', 'e'].entries();
	assert.isIterator(iterator);
	assert.isIterable(iterator);
	assert.deepEqual(iterator.next(), {
		value: [0, 'q'],
		done: false,
	});
	assert.deepEqual(iterator.next(), {
		value: [1, 'w'],
		done: false,
	});
	assert.deepEqual(iterator.next(), {
		value: [2, 'e'],
		done: false,
	});
	assert.deepEqual(iterator.next(), {
		value: undefined,
		done: true,
	});
	// assert.deepEqual(entries.call({
	// 	length: -1,
	// }).next(), {
	// 	value: undefined,
	// 	done: true,
	// }, 'uses ToLength');
});

QUnit.test('Array#@@iterator', assert => {
	assert.isIterable(Array.prototype);
	assert.arity(Array.prototype[Symbol.iterator], 0);
	// assert.name(Array.prototype[Symbol.iterator], 'values');
	assert.strictEqual(Array.prototype[Symbol.iterator], Array.prototype.values);
	const iterator = ['q', 'w', 'e'][Symbol.iterator]();
	assert.isIterator(iterator);
	assert.isIterable(iterator);
	assert.deepEqual(iterator.next(), {
		value: 'q',
		done: false,
	});
	assert.deepEqual(iterator.next(), {
		value: 'w',
		done: false,
	});
	assert.deepEqual(iterator.next(), {
		value: 'e',
		done: false,
	});
	assert.deepEqual(iterator.next(), {
		value: undefined,
		done: true,
	});
	// assert.deepEqual(Array.prototype[Symbol.iterator].call({
	// 	length: -1,
	// }).next(), {
	// 	value: undefined,
	// 	done: true,
	// }, 'uses ToLength');
});
