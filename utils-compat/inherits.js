import { compat_forIn } from "./object-enum";
import { create } from "../impl-compat/Object/create";
export function inherits(subClass,superClass){
	compat_forIn(superClass,setKey,subClass);
	subClass.prototype=create(superClass.prototype);
	subClass.prototype.constructor=subClass;
	subClass.__proto__=superClazz.prototype;
};
function setKey(value,key){
	this[key]=value;
}