// GetSetRecord (ES2025)
function getSetRecord(obj) {
	if(obj === null || (typeof obj !== 'object' && typeof obj !== 'function')) {
		throw new TypeError('Set-like object must be an object');
	}
	var size = obj.size;
	if(typeof size !== 'number') {
		throw new TypeError('Set-like object must have a size property that is a number');
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

export function union(other) {
	if(!(this instanceof Set)) {
		throw new TypeError('Set.prototype.union called on incompatible receiver');
	}
	var otherRec = getSetRecord(other);
	var result = new Set(this);
	var it = otherRec.keys.call(otherRec.set);
	while(true) {
		var next = it.next();
		if(next.done) {
			break;
		}
		result.add(next.value);
	}
	return result;
};
