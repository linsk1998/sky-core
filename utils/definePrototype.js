export function definePrototype(target, property, value) {
	var prototype = target.prototype;
	if(!(property in prototype)) prototype[property] = value;
}