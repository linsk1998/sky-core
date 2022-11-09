
export function defineProperties(obj, properties) {
	var ownKeys = Object.keys(properties);
	var len = ownKeys.length;
	for(var i = 0; i < len; i++) {
		var key = ownKeys[i];
		Object.defineProperty(obj, key, properties[key]);
	}
	return obj;
};