export { querySelectorAll as compat_querySelectorAll } from "../impl-compat/document/querySelectorAll";
export function querySelectorAll(selector,ancestor){
	if(!ancestor){
		ancestor=document;
	}
	if(ancestor.querySelectorAll){
		return ancestor.querySelectorAll(selector);
	}
	var a=compat_querySelectorAll(selector,ancestor);
	if(a.length){
		return a[0];
	}
	return null;
};