import {getOwnPropertyDescriptor as compat_getOwnPropertyDescriptor} from "../../impl-compat/Object/getOwnPropertyDescriptor";
import {getOwnPropertyDescriptor as modern_getOwnPropertyDescriptor} from "../../impl-modern/Object/getOwnPropertyDescriptor";
if(!Object.getOwnPropertyDescriptor){
	if(Object.prototype.__defineSetter__){
		Object.getOwnPropertyDescriptor=modern_getOwnPropertyDescriptor;
	}else{
		Object.getOwnPropertyDescriptor=compat_getOwnPropertyDescriptor;
	}
}