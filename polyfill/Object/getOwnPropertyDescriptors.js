
import {getOwnPropertyDescriptors as compat_getOwnPropertyDescriptors} from "../../impl-compat/Object/getOwnPropertyDescriptors";
import {getOwnPropertyDescriptors as modern_getOwnPropertyDescriptors} from "../../impl-modern/Object/getOwnPropertyDescriptors";
if(!Object.getOwnPropertyDescriptors){
	if(Object.prototype.__defineSetter__){
		Object.getOwnPropertyDescriptors=modern_getOwnPropertyDescriptors;
	}else{
		Object.getOwnPropertyDescriptors=compat_getOwnPropertyDescriptors;
	}
}