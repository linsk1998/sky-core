import {create} from "./create";
import {dontEnums} from "../../utils-compat/dontEnums";
export function setPrototypeOf(obj,proto){
	console.warn("ES3 do NOT support setPrototypeOf.");
	var o=create(proto);
	var key;
	for(key in obj){
		if(Object.prototype.hasOwnProperty.call(obj,key)){
			o[key]=obj[key];
		}
	}
	var i=dontEnums.length;
	while(i-->0){
		key=dontEnums[i];
		if(Object.prototype.hasOwnProperty.call(obj,key)){
			o[key]=obj[key];
		}
	}
	return o; 
}