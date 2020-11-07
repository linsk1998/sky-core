export function attachEvent(ele, evt, func, useCapture){
	ele.addEventListener(evt, func, !!useCapture);
};