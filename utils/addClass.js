import {hasClass} from "./hasClass";
export function addClass(obj,cls){
	if(!hasClass(obj,cls)) obj.className=obj.className.trim()+" "+cls;
};