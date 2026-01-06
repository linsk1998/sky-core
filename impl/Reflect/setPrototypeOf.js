
export function setPrototypeOf(target, proto) {
	try {
		Object.setPrototypeOf(Object(target), proto);
		return true;
	} catch(e) {
		console.error(e);
	}
	return false;
}