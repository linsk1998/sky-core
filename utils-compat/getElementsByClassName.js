import { hasClass } from "sky-core";
export function getElementsByClassName(className,e){
	e=e||document;
	var result=[];
	var nodes= e.getElementsByTagName("*");
	for(var i=0;i<nodes.length;i++){
		if(hasClass(nodes[i],className)){
			result.push(nodes[i]);
		}
	}
	return result;
};