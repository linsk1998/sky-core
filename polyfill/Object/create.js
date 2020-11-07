import {compat_createObject} from "../impl-compat/Object/object-inherits";
import {modern_createObject} from "../impl-modern/Object/object-inherits";
if(!Object.create){
	if('__proto__' in Object.prototype){
		Object.create=modern_createObject;
	}else{
		Object.create=compat_createObject;
	}
}