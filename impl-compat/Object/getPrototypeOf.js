export function getPrototypeOf(obj) {
	if(obj == null) {
		throw new TypeError("Cannot convert undefined or null to object");
	}
	if(typeof obj !== "object" && typeof obj !== "function") {
		obj = Object(obj);
	}
	if('__proto__' in obj) {
		return obj.__proto__;
	}
	if(!('constructor' in obj)) {
		return null;
	}
	if(Object.prototype.hasOwnProperty.call(obj, 'constructor')) {
		if('__proto__' in obj.constructor) {
			return obj.constructor.__proto__.prototype;
		} else if(obj === Object.prototype) {
			return null;
		} else {
			return Object.prototype;
		}
	}
	return obj.constructor.prototype;
};
getPrototypeOf.sham = true;