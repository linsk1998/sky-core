
export function isSymbol(obj){
	if(typeof obj==="symbol"){
		return true;
	}
	if(typeof obj.toString==="function" && obj.toString().indexOf("@@")===0){
		return true;//symbol polyfill
	}
	return false;
};