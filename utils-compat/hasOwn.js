export default function hasOwn(obj,key){
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