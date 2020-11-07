
export function forOwn(obj,fn,thisArg){
	if(obj){
		thisArg=thisArg || undefined;
		var keys=Object.keys(obj);
		for(var i=0;i<keys.length;i++){
			var key=keys[i];
			if(fn.call(thisArg,obj[key],key)===false){
				return false;
			}
		}
		return true;
	}
	return false;
};