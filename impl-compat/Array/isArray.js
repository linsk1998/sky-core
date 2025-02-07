export function isArray(obj) {
	if(obj == null) return false;
	var p = obj.__proto__;
	return p ?
		p === Array.prototype || p instanceof Array :
		Object.prototype.toString.call(obj) === '[object Array]';
}