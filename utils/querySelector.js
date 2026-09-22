export { querySelectorAll } from "../impl-compat/document/querySelectorAll";
export function querySelector(selector,ancestor){
	if(!ancestor){
		ancestor=document;
	}
	if(ancestor.querySelector){
		return ancestor.querySelector(selector);
	}
	var a=querySelectorAll(selector,ancestor);
	if(a.length){
		return a[0];
	}
	return null;
};