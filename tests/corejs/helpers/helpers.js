export function createIterator(elements, methods) {
	let index = 0;
	const iterator = {
		called: false,
		next: function() {
			iterator.called = true;
			return {
				value: elements[index++],
				done: index > elements.length,
			};
		},
	};
	if(methods) for(const key in methods) iterator[key] = methods[key];
	return iterator;
}

export function createIterable(elements, methods) {
	const iterable = {
		called: false,
		received: false,
		[Symbol.iterator]() {
			iterable.received = true;
			let index = 0;
			const iterator = {
				next: function() {
					iterable.called = true;
					return {
						value: elements[index++],
						done: index > elements.length,
					};
				},
			};
			if(methods) for(const key in methods) iterator[key] = methods[key];
			return iterator;
		},
	};
	return iterable;
}

export function includes(target, wanted) {
	for(const element of target) if(wanted === element) return true;
	return false;
}

export function is(a, b) {
	// eslint-disable-next-line no-self-compare -- NaN check
	return a === b ? a !== 0 || 1 / a === 1 / b : a != a && b != b;
}

export const nativeSubclass = (() => {
	try {
		if(Function(`
'use strict';
class Subclass extends Object { /* empty */ };
return new Subclass() instanceof Subclass;
		`)()) return Function('Parent', `
'use strict';
return class extends Parent { /* empty */ };
		`);
	} catch { /* empty */ }
})();

export function timeLimitedPromise(time, promise) {
	return Promise.race([
		promise, new Promise((resolve, reject) => {
			setTimeout(reject, time);
		}),
	]);
}

// // This function is used to force RegExp.prototype[Symbol.*] methods
// // to not use the native implementation.
// export function patchRegExp$exec(run) {
// 	return assert => {
// 		const originalExec = RegExp.prototype.exec;
// 		// eslint-disable-next-line no-extend-native -- required for testing
// 		RegExp.prototype.exec = function() {
// 			return originalExec.apply(this, arguments);
// 		};
// 		try {
// 			return run(assert);
// 			// eslint-disable-next-line no-useless-catch -- in very old IE try / finally does not work without catch
// 		} catch(error) {
// 			throw error;
// 		} finally {
// 			// eslint-disable-next-line no-extend-native -- required for testing
// 			RegExp.prototype.exec = originalExec;
// 		}
// 	};
// }

export function fromSource(source) {
	try {
		return Function(`return ${source}`)();
	} catch { /* empty */ }
}

export function bufferToArray(buffer) {
	const array = [];
	const view = new DataView(buffer);
	for(let i = 0, { byteLength } = view; i < byteLength; ++i) {
		array.push(view.getUint8(i));
	}
	return array;
}