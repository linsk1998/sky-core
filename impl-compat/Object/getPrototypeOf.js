export function getPrototypeOf(obj){
	if(typeof obj!=="object"){
		obj=Object(obj);
	}
	if(!('constructor' in obj)){
		return null;
	}
	if(Object.prototype.hasOwnProperty.call(obj,'constructor')){
		if('__proto__' in obj.constructor){
			return obj.constructor.__proto__.prototype;
		}
	}
	return obj.constructor.prototype;
};