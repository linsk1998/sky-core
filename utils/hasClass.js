export function hasClass(obj,cls){
	if(!obj) return false;
	return obj.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
};