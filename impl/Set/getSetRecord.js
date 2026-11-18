// GetSetRecord (ES2025)
export function getSetRecord(obj) {
	if(obj === null || (typeof obj !== 'object' && typeof obj !== 'function')) {
		throw new TypeError('Set-like object must be an object');
	}
	var size = +obj.size;
	if(size !== size) {
		throw new TypeError('Set-like object size must not be NaN');
	}
	var intSize = size > 0 ? Math.floor(size) : size < 0 ? Math.ceil(size) : 0;
	if(intSize < 0) {
		throw new RangeError('Set-like object size must be non-negative');
	}
	var has = obj.has;
	if(typeof has !== 'function') {
		throw new TypeError('Set-like object must have a has method');
	}
	var keys = obj.keys;
	if(typeof keys !== 'function') {
		throw new TypeError('Set-like object must have a keys method');
	}
	return {
		size: intSize,
		has: has,
		keys: keys,
		set: obj
	};
}
