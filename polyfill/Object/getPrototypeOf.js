import {getPrototypeOf as compat_getPrototypeOf} from "../impl-compat/Object/getPrototypeOf";
import {getPrototypeOf as modern_getPrototypeOf} from "../impl-modern/Object/getPrototypeOf";
if(!Object.getPrototypeOf){
	if('__proto__' in Object.prototype){
		Object.getPrototypeOf=modern_getPrototypeOf;
	}else{
		Object.getPrototypeOf=compat_getPrototypeOf;
	}
}