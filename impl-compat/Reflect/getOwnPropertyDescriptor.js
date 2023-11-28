
export function getOwnPropertyDescriptor(obj, prop) {
	var key = '@@desc:' + prop;
	if(Object.hasOwn(obj, key)) {
		return obj[key];
	}
	if(Object.hasOwn(obj, prop)) {
		return { value: obj[prop], writable: true, enumerable: true, configurable: true };
	}
};