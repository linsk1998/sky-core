export function detachEvent(ele, type, func, useCapture){
	switch(type){
		case "wheel":
			if(!("onwheel" in document)){
				if('onmousewheel' in document){
					type='mousewheel';
				}else{
					type='DOMMouseScroll';
				}
			}
			break;
		case "mouseenter":
			if(!('onmouseenter' in document)){
				type='mouseover';
			}
			break;
		case "mouseleave":
			if(!('onmouseleave' in document)){
				type='mouseout';
			}
			break;
	}
	ele.removeEventListener(type, func, !!useCapture);
};