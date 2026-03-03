export function definePrototype(target, property, value) {
	var prototype = target.prototype;
	if(!(property in prototype)) {
		Object.defineProperty(prototype, property, {
			configurable: true,
			writable: true,
			enumerable: false,
			value: value
		});
	}
}