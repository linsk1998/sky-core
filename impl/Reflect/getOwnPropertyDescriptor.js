export function getOwnPropertyDescriptor(target, propertyKey) {
	return Object.getOwnPropertyDescriptor(Object(target), propertyKey);
}