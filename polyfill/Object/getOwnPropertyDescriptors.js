import "../String/prototype/startsWith";
import {compat_getOwnPropertyDescriptors} from "../../impl-compat/Object/object-property";
import {modern_getOwnPropertyDescriptors} from "../../impl-modern/Object/object-property";
if(!Object.getOwnPropertyDescriptors){
	if(Object.prototype.__defineSetter__){
		Object.getOwnPropertyDescriptors=modern_getOwnPropertyDescriptors;
	}else{
		Object.getOwnPropertyDescriptors=compat_getOwnPropertyDescriptors;
	}
}