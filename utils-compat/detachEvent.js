export function detachEvent(ele, type, func){
	switch(type){
		case "load":
			if(ele.tagName=="SCRIPT"){
				type='readystatechange';
			}
			break;
		case "wheel":
			type='mousewheel';
			break;
		case "DOMContentLoaded":
			if(ele===document){
				type='readystatechange';
			}
			break;
		case "input":
			type='propertychange';
			break;
		case "mouseenter":
			if(!('Screen' in window)){
				//IE低版本监视是否短时间内突然移出再进入
				ele.detachEvent( 'onmouseleave', func);
			}
			break;
	}
	ele.detachEvent('on'+type, func);
};