
export function getElementsByClassName(className,e){
	e=e||document;
	return Array.prototype.slice.call(e.getElementsByClassName(className));
};