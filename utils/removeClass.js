import { escapeRegExp } from "./escapeRegExp";
import { hasClass } from "./hasClass";

export function removeClass(obj, cls) {
	if(hasClass(obj, cls)) {
		var reg = new RegExp('(\\s+|^)' + escapeRegExp(cls) + '(\\s+|$)');
		obj.className = obj.className.replace(reg, ' ');
	}
};