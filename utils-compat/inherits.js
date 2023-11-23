import { forIn } from "./forIn";
export function inherits(subClass, superClass) {
	forIn(superClass, setKey, subClass);
	subClass.prototype = Object.create(superClass.prototype);
	subClass.prototype.constructor = subClass;
	subClass.__proto__ = superClass.prototype;
};
function setKey(value, key) {
	this[key] = value;
}