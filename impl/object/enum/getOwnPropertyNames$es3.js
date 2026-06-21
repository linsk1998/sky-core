export function getOwnPropertyNames$es3(obj) {
	if(obj == null) {
		throw new TypeError("Cannot convert undefined or null to object");
	}
	var result = [];
	for(var key in obj) {
		if(key.substring(0, 2) !== "@@" && Object.hasOwn(obj, key)) {
			result.push(key);
		}
	}
	return result;
}
