import {compat_getOwnPropertyDescriptor} from "../impl-compat/Object/object-property";
import {modern_getOwnPropertyDescriptor} from "../impl-modern/Object/object-property";
if(!Object.getOwnPropertyDescriptor){
	if(Object.prototype.__defineSetter__){
		Object.getOwnPropertyDescriptor=modern_getOwnPropertyDescriptor;
	}else{
		Object.getOwnPropertyDescriptor=compat_getOwnPropertyDescriptor;
	}
}