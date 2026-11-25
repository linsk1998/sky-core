export function deleteProperty(target, propertyKey) {
	delete target[propertyKey];
	return true;
};
