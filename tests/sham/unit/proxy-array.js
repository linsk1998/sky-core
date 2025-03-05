QUnit.test('Proxy#array', function(assert) {
	var getTime = 0;
	var setTime = 0;
	var target = [1, 2, 3];
	var arr = new Proxy(target, {
		get: function(target, prop, receiver) {
			if(prop === 'length') {
				getTime++;
			}
			return Reflect.get(...arguments);
		},
		set: function(target, prop, value, receiver) {
			if(prop === 'length') {
				setTime++;
			}
			return Reflect.set(...arguments);
		},
	});
	assert.ok(arr instanceof Array, "instanceof");
	// assert.ok(Array.isArray(arr), "isArray");
	assert.equal(arr.join(","), "1,2,3", "join");
	assert.equal(arr.join(), "1,2,3", "join");
	assert.equal(arr.toString(), "1,2,3", "toString");

	assert.equal(arr.at(NaN), 1, "at");
	assert.equal(arr.at(0), 1);
	assert.equal(arr.at(1), 2);
	assert.equal(arr.at(2), 3);

	getTime = 0;
	assert.equal(arr.length, 3, "length");
	assert.equal(getTime, 1, "get length");

	arr.splice(1, 1);
	assert.equal(arr.length, 2, "splice");

	setTime = 0;
	arr.length = 1;
	assert.equal(setTime, 1, "set length");
	assert.equal(arr.length, 1);
	assert.equal(arr.at(0), 1);
	assert.deepEqual(target, [1]);

	arr.push(2);
	assert.deepEqual(arr.at(1), 2, "push");
	assert.deepEqual(arr.length, 2, "push");

	arr.unshift(3);
	assert.deepEqual(arr.at(0), 3, "unshift");
	assert.deepEqual(arr.at(2), 2, "unshift");
	assert.deepEqual(arr.length, 3, "unshift");

	arr.reverse();
	assert.deepEqual(arr.at(0), 2, "reverse");
	assert.deepEqual(arr.at(1), 1, "reverse");
	assert.deepEqual(arr.at(2), 3, "reverse");
	assert.deepEqual(arr.length, 3, "reverse");

	arr.sort();
	assert.deepEqual(arr.at(0), 1, "sort");
	assert.deepEqual(arr.at(1), 2, "sort");
	assert.deepEqual(arr.at(2), 3, "sort");
	assert.deepEqual(arr.length, 3, "sort");
});