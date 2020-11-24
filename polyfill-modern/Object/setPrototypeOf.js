import {setPrototypeOf} from "../impl-modern/Object/setPrototypeOf";
if(!Object.setPrototypeOf){
	if('__proto__' in Object.prototype){
		Object.setPrototypeOf=setPrototypeOf;
	}
}