export function getPrevElement(element){
	var e = element.previousSibling;
	if(e == null){ return null;}
	if(e.nodeType==1){
		return e;
	}else{
		return getPrevElement(e);
	}
};