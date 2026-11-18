// GetIteratorFromMethod (ES2025)，会先读取 next 方法
export function getIteratorRecord(record) {
	var iterator = record.keys.call(record.set);
	if(iterator === null || (typeof iterator !== 'object' && typeof iterator !== 'function')) {
		throw new TypeError('Set-like object keys method must return an object');
	}
	return {
		iterator: iterator,
		next: iterator.next
	};
}

// IteratorStepValue (ES2025)，迭代结果的非对象值会抛 TypeError
export function iteratorStepValue(record) {
	var result = record.next.call(record.iterator);
	if(result === null || (typeof result !== 'object' && typeof result !== 'function')) {
		throw new TypeError('Iterator result is not an object');
	}
	if(result.done) {
		return {
			done: true
		};
	}
	return {
		done: false,
		value: result.value
	};
}
