
export function defineProperty(target, propertyKey, attributes) {
	try {
		Object.defineProperty(target, propertyKey, attributes);
		return true;
	} catch(e) {
		console.error(e);
	}
	return false;
};