import {nativeSymbol} from "../../native/Symbol";
import {nativeKeys} from "../../native/Object/keys";
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
export var keys=!nativeKeys?ie_keys:(nativeSymbol?nativeKeys:nie_keys);