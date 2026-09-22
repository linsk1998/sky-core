export function getOwnPropertyDescriptors(obj) {
	var keys = Object.getOwnPropertyNames(obj);
	keys = keys.concat(Object.getOwnPropertySymbols(obj));
	var o = {};
	var i, key;
	for(i = 0; i < keys.length; i++) {
		key = keys[i];
		var desc = obj["@@desc:" + key];
		if(desc) {
			o[key] = desc;
		} else {
			o[key] = {
				value: obj[key],
				writable: true,
				enumerable: String(key).substring(0, 2) !== "__",
				configurable: true
			};
		}
	}
	return o;
};
getOwnPropertyDescriptors.sham = true;