import "../../polyfill/String/prototype/startsWith";
import {Symbol as nativeSymbol} from "../../native/Symbol";
import {keys as nativeKeys} from "../../native/Object/keys";
export function nie_keys(obj){
	return nativeKeys.call(Object,obj).filter(checkSymbolKey);
};
function checkSymbolKey(key){
	return !key.startsWith("@@");
}
export function ie_keys(obj){
	var result=[];
	for(var key in obj){
		if(!key.startsWith("@@") && Object.prototype.hasOwnProperty.call(obj,key)){
			result.push(key);
		}
	}
	return result;
};
export function keys(obj){
	if(!nativeKeys){
		return ie_keys(obj);
	}else if(nativeSymbol){
		return nativeKeys(obj);
	}else{
		return nie_keys(obj);
	}
}