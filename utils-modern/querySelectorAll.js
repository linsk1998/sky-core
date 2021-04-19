export function querySelectorAll(selector,e){
	if(!e){
		e=document;
	}
	return Array.prototype.slice.call(document.querySelectorAll(selector));
};