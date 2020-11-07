import {modern_getOwnPropertyDescriptors} from "../../impl-modern/Object/object-property";
if(!Object.getOwnPropertyDescriptors){
	if(Object.prototype.__defineSetter__){
		Object.getOwnPropertyDescriptors=modern_getOwnPropertyDescriptors;
	}
}