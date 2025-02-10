
export function isArrayLike(obj) {
	if(obj == null) return false;
	var length = obj.length;
	if(typeof length != "number" || length < 0 || isNaN(length) || Math.ceil(length) != length) {
		return false;
	}
	return true;
};