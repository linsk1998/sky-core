import { compat_forIn } from "./object-enum";
export function compat_createObject(proto){
	function F(){}
	F.prototype = proto;
	return new F();
};
export function compat_inherits(subClass,superClass){
	compat_forIn(superClass,setKey,subClass);
	subClass.prototype=Object.create(superClass.prototype);
	subClass.prototype.constructor=subClass;
	subClass.__proto__=superClazz.prototype;
};
function setKey(value,key){
	this[key]=value;
}
export function compat_getPrototypeOf(obj){
	if(typeof obj!=="object"){
		obj=Object(obj);
	}
	if(!('constructor' in obj)){
		return null;
	}
	if(Object.prototype.hasOwnProperty.call(obj,'constructor')){
		if('__proto__' in obj.constructor){
			return obj.constructor.__proto__.prototype;
		}
	}
	return obj.constructor.prototype;
};