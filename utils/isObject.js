
export function isObject(obj){
	var type=typeof obj;
	if(type!=="object"){
		return false;
	}
	type=Object.prototype.toString.call(obj);
	switch(type){
		case '[object String]':
		case '[object Number]':
		case '[object Function]':
		case '[object Boolean]':
			return false;
	}
	if(typeof obj.toString==="function" && obj.toString().indexOf("@@")===0){
		return false;//symbol polyfill
	}
	return true;
};