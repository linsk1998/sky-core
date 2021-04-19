export function getElementStyle(el, prop){
	return el.currentStyle[prop] || el.style[prop];
};