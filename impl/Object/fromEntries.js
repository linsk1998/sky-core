import {from} from "sky-core/pure/Array/from";
import {isArray} from "sky-core/pure/Array/isArray";
export function fromEntries(obj) {
	var arr=from(obj);
	var len=arr.length;
	var o={};
	for(var i=0;i<len;i++){
		var item=arr[i];
		if(isArray(item)){
			o[item[0]]=item[1];
		}else{
			throw new TypeError("Iterator value 1 is not an entry object");
		}
	}
	return o;
}