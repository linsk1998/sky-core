import { hasClass } from "./hasClass";
export function getElementsByClassName(className,e){
	e=e||document;
	if(e.getElementsByClassName){
		return Array.prototype.slice.call(e.getElementsByClassName(className));
	}
	var result=[];
	var nodes= e.getElementsByTagName("*");
	for(var i=0;i<nodes.length;i++){
		if(hasClass(nodes[i],className)){
			result.push(nodes[i]);
		}
	}
	return result;
};