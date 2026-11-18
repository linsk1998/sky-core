// GetIteratorFromMethod (ES2025)，仅用于有 keys 的 set-like
export function getIteratorRecord(record) {
	if(!record.keys) {
		throw new TypeError('Set-like object must have keys method');
	}
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
