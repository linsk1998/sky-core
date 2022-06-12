export { querySelectorAll } from "../impl-compat/document/querySelectorAll";
export function querySelector(selector,ancestor){
	var a=querySelectorAll(selector,ancestor);
	if(a.length){
		return a[0];
	}
	return null;
};