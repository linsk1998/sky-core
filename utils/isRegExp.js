
export function isRegExp(obj){
	return Object.prototype.toString.call(obj)==='[object RegExp]';
};