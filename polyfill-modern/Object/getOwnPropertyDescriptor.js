import {modern_getOwnPropertyDescriptor} from "../../impl-modern/Object/object-property";
if(!Object.getOwnPropertyDescriptor){
	if(Object.prototype.__defineSetter__){
		Object.getOwnPropertyDescriptor=modern_getOwnPropertyDescriptor;
	}
}