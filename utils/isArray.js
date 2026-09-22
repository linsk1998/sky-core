export function isArray(obj) {
	if(obj == null) return false;
	return obj instanceof Array || Array.isArray(obj);
}