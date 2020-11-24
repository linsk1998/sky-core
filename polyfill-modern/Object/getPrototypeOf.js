import {getPrototypeOf} from "../../impl-modern/Object/getPrototypeOf";
if(!Object.getPrototypeOf){
	if('__proto__' in Object.prototype){
		Object.getPrototypeOf=getPrototypeOf;
	}
}