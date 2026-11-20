// GetSetRecord (ES2025)，仅校验，直接使用原对象
export function checkSetLike(obj) {
	if(obj === null || (typeof obj !== 'object' && typeof obj !== 'function')) {
		throw new TypeError('Set-like object must be an object');
	}
	var size = +obj.size;
	if(size !== size) {
		throw new TypeError('Set-like object size must not be NaN');
	}
	if(size < 0) {
		throw new RangeError('Set-like object size must be non-negative');
	}
	if(typeof obj.has !== 'function') {
		throw new TypeError('Set-like object must have a has method');
	}
	if(typeof obj.keys !== 'function') {
		throw new TypeError('Set-like object must have a keys method');
	}
}
