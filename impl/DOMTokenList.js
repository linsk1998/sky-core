import { addClass } from "../utils/addClass";
import { removeClass } from "../utils/removeClass";
import { toggleClass } from "../utils/toggleClass";
import { hasClass } from "../utils/hasClass";

export function DOMTokenList(element) {
	this.element = element;
}

DOMTokenList.prototype.add = function(cls) {
	addClass(this.element, cls);
};
DOMTokenList.prototype.remove = function(cls) {
	removeClass(this.element, cls);
};
DOMTokenList.prototype.toggle = function(cls) {
	toggleClass(this.element, cls);
};
DOMTokenList.prototype.contains = function(cls) {
	hasClass(this.element, cls);
};