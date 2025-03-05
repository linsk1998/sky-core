import { forIn } from "./forIn";
export function inherits(subClass, superClass) {
	forIn(superClass, setKey, subClass);
	var prototype = Object.create(superClass.prototype);
	prototype.constructor = subClass;
	prototype.__proto__ = prototype;
	subClass.prototype = prototype;
	subClass.__proto__ = superClass.prototype;
};
function setKey(value, key) {
	this[key] = value;
}