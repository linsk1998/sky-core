import {isArrayLike} from "./isArrayLike";
export function isArrayLikeObject(obj){
	if(typeof obj==="object" && isArrayLike(obj)){
		return true;
	}
	return false;
};