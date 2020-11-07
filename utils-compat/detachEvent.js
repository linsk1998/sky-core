export function detachEvent(ele, evt, func){
	ele.detachEvent('on'+evt, func);
};