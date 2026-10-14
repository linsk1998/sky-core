export function getPrototypeOf$es3(obj) {
	if(obj == null) {
		throw new TypeError("Cannot convert undefined or null to object");
	}
	if(typeof obj !== "object" && typeof obj !== "function") {
		obj = Object(obj);
	}
	if('__proto__' in obj) {
		return obj.__proto__;
	}
	if(!('constructor' in obj) || obj === Object.prototype) {
		return null;
	}
	return obj.constructor.prototype;
}
getPrototypeOf$es3.sham = true;
