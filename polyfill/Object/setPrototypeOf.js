import {modern_setPrototypeOf} from "../impl-modern/Object/object-inherits";
if(!Object.setPrototypeOf){
	if('__proto__' in Object.prototype){
		Object.setPrototypeOf=modern_setPrototypeOf;
	}
}