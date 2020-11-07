import {modern_defineProperty} from "../../impl-modern/Obcject/object-property";
if(!Object.defineProperty) {
	if(Object.prototype.__defineSetter__){
		Object.defineProperty=modern_defineProperty;
	}
}