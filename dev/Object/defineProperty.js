var defineProperty = Object.defineProperty;
Object.defineProperty = function defineProperty(obj, prop, descriptor) {
	if(typeof prop === 'symbol') {
		if(descriptor.enumerable) {
			throw new Error('Symbol is not enumerable');
		}
		console.warn('Attempt to use Symbol as property key');
	}
	return defineProperty(obj, prop, descriptor);
};