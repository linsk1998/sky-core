export function getElementStyle(el, prop){
	var propprop = prop.replace (/([A-Z])/g, "-$1");
	propprop = propprop.toLowerCase();
	var style=window.getComputedStyle(el,null);
	return style[prop] || style.getPropertyValue(propprop) || el.style[prop];
};