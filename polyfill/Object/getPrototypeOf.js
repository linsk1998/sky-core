import {compat_getPrototypeOf} from "../impl-compat/Object/object-inherits";
import {modern_getPrototypeOf} from "../impl-modern/Object/object-inherits";
if(!Object.getPrototypeOf){
	if('__proto__' in Object.prototype){
		Object.getPrototypeOf=modern_getPrototypeOf;
	}else{
		Object.getPrototypeOf=compat_getPrototypeOf;
	}
}import "../polyfill/Object/getOwnPropertyDescriptors";