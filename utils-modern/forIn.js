import {Symbol as nativeSymbol} from "../native/Symbol";
export function nosymbol_forIn(obj,fn,thisArg){
	for(var key in obj) {
		if(key.startsWith("@@")){
			continue ;
		}
		if(fn.call(thisArg,obj[key],key)===false){
			return false;
		}
	}
	return true;
};
export function symbol_forIn(obj,fn,thisArg){
	for(var key in obj) {
		if(fn.call(thisArg,obj[key],key)===false){
			return false;
		}
	}
	return true;
};
export var forIn=nativeSymbol?symbol_forIn:nosymbol_forIn;