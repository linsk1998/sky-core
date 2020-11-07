import "../../polyfill/String/prototype/startsWith";
import "../../polyfill/Array/prototype/includes";
import {compat_getOwnPropertyDescriptors} from "../../impl-compat/Object/object-property";
if(!Object.getOwnPropertyDescriptors){
	if(!Object.prototype.__defineSetter__){
		Object.getOwnPropertyDescriptors=compat_getOwnPropertyDescriptors;
	}
}