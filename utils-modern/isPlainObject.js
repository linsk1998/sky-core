export function isPlainObject(obj) {
	if(typeof obj === "object" && obj !== null) {
		var proto = Object.getPrototypeOf(obj);
		if(proto === null || proto === Object.prototype) return true;
	}
	return false;
};
