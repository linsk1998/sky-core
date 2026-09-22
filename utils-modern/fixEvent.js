export function fixEvent(ele,type,e){
	var related;
	switch(type){
		case 'wheel':
			if(e.type==='DOMMouseScroll'){
				e.wheelDelta=-e.detail*40;
			}
			return e;
		case 'mouseenter':
			if(e.type==='mouseover'){
				if(e.polyfill){
					return e;
				}
				ele=e.currentTarget;
				related=e.relatedTarget;
				if(e.target===ele && related!==ele && !ele.contains(related)){
					return e;
				}
			}else{
				return e;
			}
			break;
		case 'mouseleave':
			if(e.type==='mouseout'){
				if(e.polyfill){
					return e;
				}
				ele=e.currentTarget;
				related=e.relatedTarget;
				if(e.target===ele && related!==ele && !ele.contains(related) ){
					return e;
				}
			}else{
				return e;
			}
			break;
		default:
			if(!e.polyfill) return e;
	}
	throw new Error();
};