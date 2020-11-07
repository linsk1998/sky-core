export function isPlainObject(obj){
	if(obj===null){
		return true;
	}
	if(typeof obj!=="object" || obj.nodeType || isWindow(obj)){
		return false;
	}
	return Object.getPrototypeOf(obj)===Object.prototype;
};