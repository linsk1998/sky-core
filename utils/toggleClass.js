import { hasClass } from "./hasClass";
export function toggleClass(obj, cls) {
	if(hasClass(obj, cls)) {
		var reg = new RegExp('(\\s+|^)' + cls + '(\\s+|$)');
		obj.className = obj.className.replace(reg, ' ');
		return false;
	} else {
		obj.className = obj.className.trim() + " " + cls;
		return true;
	}
};