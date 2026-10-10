export function getOwnPropertyDescriptor$es3(obj, prop) {
	if(obj == null) {
		throw new TypeError("Cannot convert undefined or null to object");
	}
	if(typeof obj !== "object" && typeof obj !== "function") {
		return;
	}
	var key = '@@desc:' + prop;
	if(key in obj) {
		var descriptor = obj[key];
		if('value' in descriptor) {
			descriptor.value = obj[prop];
		}
		return descriptor;
	}
	if(Object.hasOwn(obj, prop)) {
		return {
			value: obj[prop],
			writable: true,
			enumerable: String(prop).substring(0, 2) !== "__",
			configurable: true
		};
	}
}
getOwnPropertyDescriptor$es3.sham = true;
