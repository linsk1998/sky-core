export var dontEnums=["toString","toLocaleString","valueOf","hasOwnProperty", "isPrototypeOf","propertyIsEnumerable"];
export function hasOwn(obj,key){
	if(typeof obj!=="object"){
		return false;
	}
	if(!(key in obj)){
		return false;
	}
	var value=obj[key];
	if(!(obj instanceof Object)){
		var constructor=obj.constructor;
		if(constructor){
			var proto=constructor.prototype;
			return proto[key]!==value;
		}
	}
	return Object.prototype.hasOwnProperty.call(obj,key);
};
export function compat_forIn(obj,fn,thisArg){
	if(typeof obj!=="object"){
		return false;
	}
	var isJsObject=obj instanceof Object;
	for(var key in obj) {
		if(!isJsObject){
			if(key.startsWith("__") || key==="constructor"){
				continue ;
			}
		}
		if(key.startsWith("@@")){
			continue ;
		}
		if(fn.call(thisArg,obj[key],key)===false){
			return false;
		}
	}
	var i=dontEnums.length;
	var proto=Object.getPrototypeOf(obj);
	//遍历nonEnumerableProps数组
	while(i--){
		var prop=dontEnums[i];
		if(prop in obj && obj[prop]!==proto[prop]){
			if(fn.call(thisArg,obj[prop],prop)===false){
				return false;
			}
		}
	}
	return true;
};

export function compat_keys(obj){
	var result=[],key;
	var isJsObject=obj instanceof Object;
	if(!isJsObject){
		var proto=Object.getPrototypeOf(obj);
		if(proto){
			for(key in obj){
				if(!key.startsWith("@@") && !key.startsWith("__") && proto[key]!==obj[key]){
					result.push(key);
				}
			}
			return result;
		}
	}
	for(key in obj){
		if(Object.prototype.hasOwnProperty.call(obj,key) && !key.startsWith("@@") && !key.startsWith("__")){
			result.push(key);
		}
	}
	var i=dontEnums.length;
	while(i-->0){
		key=dontEnums[i];
		if(hasOwn(obj,key)){
			result.push(key);
		}
	}
	return result;
}